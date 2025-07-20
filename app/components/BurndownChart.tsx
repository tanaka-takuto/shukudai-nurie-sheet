import { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, eachDayOfInterval } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { VacationPeriod, Homework, GuidelineSettings } from '../types/homework';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Chart.jsのデフォルト設定を上書き
ChartJS.defaults.scale.grid.display = true;
ChartJS.defaults.scale.grid.drawOnChartArea = true;
ChartJS.defaults.scale.grid.lineWidth = 1;

interface BurndownChartProps {
  vacationPeriod: VacationPeriod;
  homeworks: Homework[];
  guidelineSettings: GuidelineSettings;
  height?: number | string;
}

export function BurndownChart({
  vacationPeriod,
  homeworks,
  guidelineSettings,
  height = 400,
}: BurndownChartProps) {
  const chartRef = useRef<ChartJS<'line'>>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(typeof height === 'number' ? height : 400);

  useEffect(() => {
    const updateSize = () => {
      try {
        if (containerRef.current && containerRef.current.parentElement) {
          const parentHeight = containerRef.current.parentElement.offsetHeight;

          if (parentHeight > 0) {
            const calculatedHeight = Math.max(parentHeight - 20, 300);

            if (Math.abs(calculatedHeight - chartHeight) > 10) {
              setChartHeight(calculatedHeight);
            }
          }
        }
      } catch (error) {
        console.warn('Chart resize error:', error);
      }
    };

    // 遅延実行で初回サイズを設定
    const timeoutId = setTimeout(updateSize, 100);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  // Chart.jsのリサイズを別のuseEffectで処理
  useEffect(() => {
    if (chartRef.current) {
      const timeoutId = setTimeout(() => {
        try {
          chartRef.current?.resize();
        } catch (error) {
          console.warn('Chart resize method error:', error);
        }
      }, 150);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  const getTotalPoints = () => {
    return homeworks.reduce((total, hw) => {
      if (hw.type === 'fixed') {
        return total + hw.points;
      } else {
        return total + hw.pointsPerUnit * hw.units;
      }
    }, 0);
  };

  // Y軸のステップサイズを自動で計算
  const calculateStepSize = (totalPoints: number): number => {
    if (totalPoints <= 10) return 1;
    if (totalPoints <= 50) return 5;
    if (totalPoints <= 100) return 10;
    if (totalPoints <= 200) return 20;
    if (totalPoints <= 500) return 50;
    return 100;
  };

  const generateChartData = () => {
    const days = eachDayOfInterval({
      start: vacationPeriod.startDate,
      end: vacationPeriod.endDate,
    });

    // X軸のラベルを間引き（3日おきか週単位）
    const totalDays = days.length;
    const shouldShowEveryDay = totalDays <= 10;
    const showInterval = shouldShowEveryDay ? 1 : Math.max(3, Math.floor(totalDays / 10));

    const labels = days.map((day, index) => {
      if (index % showInterval === 0 || index === totalDays - 1) {
        return format(day, 'M/d', { locale: ja });
      }
      return '';
    });

    const totalPoints = getTotalPoints();
    const datasets = [];

    // 理想線（点線・オレンジ）- 余裕ライン
    if (guidelineSettings.showIdealLine) {
      const idealEndDay = Math.max(0, totalDays - guidelineSettings.idealDaysBeforeEnd - 1);
      const idealData = days.map((_, index) => {
        if (index >= idealEndDay) return 0;
        return totalPoints - (totalPoints / idealEndDay) * index;
      });

      datasets.push({
        label: '余裕をもって終わる進捗ライン',
        data: idealData,
        borderColor: 'rgb(251, 146, 60)', // オレンジ - 白黒印刷で中間グレーになる
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        borderDash: [10, 5], // 点線
        borderWidth: 3,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
      });
    }

    // 最終期限線（実線・濃い青）- 最低限ライン
    if (guidelineSettings.showLastMinuteLine) {
      const lastMinuteData = days.map((_, index) => {
        return totalPoints - (totalPoints / (totalDays - 1)) * index;
      });

      datasets.push({
        label: '最終日までに終わる最低限の進捗ライン',
        data: lastMinuteData,
        borderColor: 'rgb(30, 64, 175)', // 濃い青 - 白黒印刷で濃いグレーになる
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        borderDash: [], // 実線
        borderWidth: 3,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
      });
    }

    return {
      labels,
      datasets,
    };
  };

  const totalPoints = getTotalPoints();
  const stepSize = calculateStepSize(totalPoints);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '日付',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          autoSkip: false,
          callback: function (value) {
            const label = this.getLabelForValue(Number(value));
            return label || '';
          },
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.7)',
          lineWidth: 2,
          drawOnChartArea: true,
          drawTicks: true,
        },
        type: 'category',
      },
      y: {
        title: {
          display: true,
          text: '残りポイント（上から塗る →）',
        },
        min: 0,
        max: totalPoints,
        ticks: {
          stepSize: 1,
          maxTicksLimit: totalPoints + 1,
          autoSkip: false,
          callback: function (value) {
            const numValue = Math.floor(Number(value));
            // stepSizeの倍数のときだけラベルを表示
            if (numValue % stepSize === 0) {
              if (numValue === totalPoints) {
                return `${numValue}pt スタート`;
              } else if (numValue === 0) {
                return `${numValue}pt ゴール`;
              } else {
                return `${numValue}pt`;
              }
            }
            return '';
          },
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.7)',
          lineWidth: 2,
          drawOnChartArea: true,
          drawTicks: true,
        },
        type: 'linear',
        position: 'left',
      },
    },
  };

  const data = generateChartData();

  return (
    <div ref={containerRef} className="w-full" style={{ height: `${chartHeight}px` }}>
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
}
