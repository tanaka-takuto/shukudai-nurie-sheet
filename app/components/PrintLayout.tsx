import { useRef, useEffect } from 'react';
import {
  InformationCircleIcon,
  PaintBrushIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import type { VacationPeriod, Homework, GuidelineSettings } from '../types/homework';
import { BurndownChart } from './BurndownChart';

interface PrintLayoutProps {
  vacationPeriod: VacationPeriod;
  homeworks: Homework[];
  guidelineSettings: GuidelineSettings;
  onBack: () => void;
}

export function PrintLayout({
  vacationPeriod,
  homeworks,
  guidelineSettings,
  onBack,
}: PrintLayoutProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const getPoints = (homework: Homework) => {
    if (homework.type === 'fixed') {
      return homework.points;
    } else {
      return homework.pointsPerUnit * homework.units;
    }
  };

  const getDescription = (homework: Homework) => {
    if (homework.type === 'fixed') {
      return '-';
    } else {
      return `${homework.pointsPerUnit}pt × ${homework.units}${homework.unitName}`;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    // 印刷用のスタイルを追加
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #print-area, #print-area * {
          visibility: visible;
        }
        #print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="no-print bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="text-blue-500 hover:text-blue-600 transition-colors">
            ← 編集に戻る
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            印刷
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white shadow-lg">
          <div
            ref={printRef}
            id="print-area"
            className="bg-white"
            style={{
              width: '210mm',
              minHeight: '297mm',
              padding: '10mm',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="flex-1">
              <BurndownChart
                vacationPeriod={vacationPeriod}
                homeworks={homeworks}
                guidelineSettings={guidelineSettings}
              />
            </div>

            <div className="mt-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-800">
                    <th className="text-left py-1 px-2">宿題名</th>
                    <th className="text-left py-1 px-2">内容</th>
                    <th className="text-center py-1 px-2 w-12">pt</th>
                    <th className="text-center py-1 px-2 w-24">終わった日</th>
                  </tr>
                </thead>
                <tbody>
                  {homeworks.map((homework) => (
                    <tr key={homework.id} className="border-b border-gray-300">
                      <td className="py-1 px-2 font-medium">{homework.name}</td>
                      <td className="py-1 px-2 text-xs">{getDescription(homework)}</td>
                      <td className="py-1 px-2 text-center font-bold">{getPoints(homework)}</td>
                      <td className="py-1 px-2 text-center">□ ___ / ___</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-800">
                    <td colSpan={2} className="py-1 px-2 font-bold text-right">
                      合計
                    </td>
                    <td className="py-1 px-2 text-center font-bold">
                      {homeworks.reduce((sum, hw) => sum + getPoints(hw), 0)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>

              {/* チャートの使い方ガイド */}
              <div className="mt-2 p-2 border border-gray-300 rounded bg-gray-50">
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="w-3 h-3 text-gray-600 flex-shrink-0" />
                  <div className="text-xs text-gray-700">
                    <span className="font-semibold">チャートの使い方:</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-700">
                    <div className="flex items-center gap-1">
                      <PaintBrushIcon className="w-3 h-3 text-blue-600" />
                      <span>宿題完了時に上（最大値）から塗る</span>
                    </div>
                    <span className="text-gray-400">/</span>
                    <div className="flex items-center gap-1">
                      <ChartBarIcon className="w-3 h-3 text-green-600" />
                      <span>線より下なら順調</span>
                    </div>
                    <span className="text-gray-400">/</span>
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon className="w-3 h-3 text-purple-600" />
                      <span>全て塗れたら完了</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
