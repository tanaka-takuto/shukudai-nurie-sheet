import { useEffect, useState } from 'react';
import { format, differenceInDays, addDays } from 'date-fns';
import type { VacationPeriod } from '../types/homework';

interface VacationPeriodFormProps {
  vacationPeriod: VacationPeriod | null;
  onVacationPeriodChange: (period: VacationPeriod | null) => void;
}

export function VacationPeriodForm({
  vacationPeriod,
  onVacationPeriodChange,
}: VacationPeriodFormProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // 初期化とvacationPeriodが変更されたときにローカルstateを更新
  useEffect(() => {
    if (vacationPeriod) {
      setStartDate(format(vacationPeriod.startDate, 'yyyy-MM-dd'));
      setEndDate(format(vacationPeriod.endDate, 'yyyy-MM-dd'));
      setIsInitialized(true);
    } else if (!isInitialized) {
      // 初回ロード時のデフォルト値設定（今日から31日後）
      const today = new Date();
      const defaultEndDate = addDays(today, 31);
      const todayStr = format(today, 'yyyy-MM-dd');
      const endDateStr = format(defaultEndDate, 'yyyy-MM-dd');

      setStartDate(todayStr);
      setEndDate(endDateStr);
      setIsInitialized(true);

      // デフォルト値を自動設定
      onVacationPeriodChange({
        startDate: today,
        endDate: defaultEndDate,
      });
    }
  }, [vacationPeriod, isInitialized, onVacationPeriodChange]);

  // 日付が変更されたときの処理
  const handleDateChange = (start: string, end: string) => {
    if (start && end) {
      onVacationPeriodChange({
        startDate: new Date(start),
        endDate: new Date(end),
      });
    } else if (!start && !end) {
      onVacationPeriodChange(null);
    }
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    handleDateChange(value, endDate);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    handleDateChange(startDate, value);
  };

  // 期間の日数を計算
  const getDurationInDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = differenceInDays(end, start) + 1; // 開始日も含むので+1
      return days > 0 ? days : 0;
    }
    return 0;
  };

  const durationDays = getDurationInDays();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">開始日</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">終了日</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
      </div>

      {/* 期間表示 */}
      {startDate && endDate && durationDays > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">{durationDays}</span>
            <span className="text-lg text-blue-600 ml-1">日間の夏休みです</span>
          </div>
          <p className="text-sm text-blue-500 text-center mt-1">
            {format(new Date(startDate), 'M月d日')} 〜 {format(new Date(endDate), 'M月d日')}
          </p>
        </div>
      )}
    </div>
  );
}
