import { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import type { GuidelineSettings } from '../types/homework';

interface GuidelineSettingsProps {
  guidelineSettings: GuidelineSettings;
  onGuidelineSettingsChange: (settings: GuidelineSettings) => void;
  disabled?: boolean;
}

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 p-3 text-sm text-white bg-gray-800 rounded-lg shadow-lg -top-2 left-full ml-2">
          {content}
          <div className="absolute top-3 -left-1 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
}

export function GuidelineSettingsForm({
  guidelineSettings,
  onGuidelineSettingsChange,
  disabled = false,
}: GuidelineSettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="flex items-center flex-1">
            <input
              type="checkbox"
              checked={guidelineSettings.showIdealLine}
              onChange={(e) =>
                onGuidelineSettingsChange({
                  ...guidelineSettings,
                  showIdealLine: e.target.checked,
                })
              }
              disabled={disabled}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="ml-2">余裕をもって終わる進捗ライン（点線）を表示する</span>
          </label>
          <Tooltip content="宿題の理想的な進捗ペースをオレンジの点線で表示します。この線より下（進んでいる状態）をキープすることで、余裕を持って宿題を完了できます。">
            <InformationCircleIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 ml-2" />
          </Tooltip>
        </div>

        {guidelineSettings.showIdealLine && (
          <div className="ml-6 p-3 bg-gray-50 rounded-md">
            <label className="block text-sm text-gray-700 mb-2">終了日の何日前に完了？</label>
            <div className="flex items-center">
              <input
                type="number"
                value={guidelineSettings.idealDaysBeforeEnd}
                onChange={(e) =>
                  onGuidelineSettingsChange({
                    ...guidelineSettings,
                    idealDaysBeforeEnd: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                disabled={disabled}
                min="1"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <span className="ml-2 text-sm text-gray-600">日前</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              例：7日前なら、夏休み最後の1週間は余裕を持って過ごせます
            </p>
          </div>
        )}

        <div className="flex items-center">
          <label className="flex items-center flex-1">
            <input
              type="checkbox"
              checked={guidelineSettings.showLastMinuteLine}
              onChange={(e) =>
                onGuidelineSettingsChange({
                  ...guidelineSettings,
                  showLastMinuteLine: e.target.checked,
                })
              }
              disabled={disabled}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="ml-2">最終日までに終わる最低限の進捗ライン（実線）を表示</span>
          </label>
          <Tooltip content="夏休み最終日までに宿題を終える必要がある最低限のペースを濃い青の実線で表示します。この線より上にいる（遅れている状態）と、最終日までに宿題が終わらない可能性があります。">
            <InformationCircleIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 ml-2" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
