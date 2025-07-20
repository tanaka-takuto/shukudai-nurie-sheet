import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  QuestionMarkCircleIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  ChartBarIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const steps = [
    {
      title: '① 夏休みの期間を入力',
      description:
        '開始日と終了日を設定して、宿題スケジュールの基準を作ります。自動で期間が表示されるので、計画が立てやすくなります。',
      icon: CalendarDaysIcon,
    },
    {
      title: '② ガイドライン設定',
      description:
        '理想的な進捗ペースを設定します。余裕を持って完了したい場合は「理想線」を、最低限のペースを知りたい場合は「ぎりぎり線」を表示できます。',
      icon: Cog6ToothIcon,
    },
    {
      title: '③ 宿題を登録する',
      description:
        'よくある宿題から選ぶか、自分で作成できます。それぞれにポイントを設定して、全体の宿題量を把握しましょう。',
      icon: PencilSquareIcon,
    },
    {
      title: '④ プレビューで確認',
      description:
        'チャートで進捗を確認し、印刷して壁に貼りましょう。宿題が終わったらマスを塗って、達成感を味わいましょう！',
      icon: ChartBarIcon,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <QuestionMarkCircleIcon className="w-8 h-8 text-blue-500" />
                このツールの使い方
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 text-center">
                  チャートが完成するまでの4つのステップを説明します
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <step.icon className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <LightBulbIcon className="w-5 h-5" />
                  使い方のコツ
                </h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• 宿題の量に応じてポイントを調整しましょう</li>
                  <li>• 理想線より早めに進めると余裕が生まれます</li>
                  <li>• 印刷して見えるところに貼ると効果的です</li>
                  <li>• 家族みんなで進捗を確認しましょう</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                理解しました！
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function HelpButton() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors z-40 flex items-center gap-2 text-sm font-medium"
      >
        <QuestionMarkCircleIcon className="w-5 h-5" />
        <span className="hidden sm:inline">このツールの使い方</span>
      </motion.button>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
}
