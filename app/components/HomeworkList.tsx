import type { Homework } from '../types/homework';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeworkListProps {
  homeworks: Homework[];
  onUpdate: (id: string, updates: Partial<Homework>) => void;
  onDelete: (id: string) => void;
}

export function HomeworkList({ homeworks, onUpdate, onDelete }: HomeworkListProps) {
  const getPoints = (homework: Homework) => {
    if (homework.type === 'fixed') {
      return homework.points;
    } else {
      return homework.pointsPerUnit * homework.units;
    }
  };

  const handleNameChange = (id: string, name: string) => {
    onUpdate(id, { name });
  };

  const handlePointsChange = (homework: Homework, value: string) => {
    const numValue = Number(value) || 0;
    if (homework.type === 'fixed') {
      onUpdate(homework.id, { points: numValue });
    } else {
      onUpdate(homework.id, { pointsPerUnit: numValue });
    }
  };

  const handleUnitsChange = (homework: Homework, value: string) => {
    const numValue = Number(value) || 0;
    onUpdate(homework.id, { units: numValue });
  };

  const handleUnitNameChange = (homework: Homework, value: string) => {
    onUpdate(homework.id, { unitName: value });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">登録した宿題</h2>
      <div className="space-y-3">
        <AnimatePresence>
          {homeworks.map((homework) => (
            <motion.div
              key={homework.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="space-y-3">
                {/* 宿題名 */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">宿題名</label>
                  <input
                    type="text"
                    value={homework.name}
                    onChange={(e) => handleNameChange(homework.id, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* ポイント設定 */}
                {homework.type === 'fixed' ? (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      ポイント数
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={homework.points}
                        onChange={(e) => handlePointsChange(homework, e.target.value)}
                        className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                      />
                      <span className="text-sm text-gray-600">ポイント</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        単位あたり
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={homework.pointsPerUnit}
                          onChange={(e) => handlePointsChange(homework, e.target.value)}
                          className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                        />
                        <span className="text-xs text-gray-600">pt</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">数量</label>
                      <input
                        type="number"
                        value={homework.units}
                        onChange={(e) => handleUnitsChange(homework, e.target.value)}
                        className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">単位</label>
                      <input
                        type="text"
                        value={homework.unitName}
                        onChange={(e) => handleUnitNameChange(homework, e.target.value)}
                        className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* 合計ポイントと削除ボタン */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-sm">
                    <span className="text-gray-600">合計: </span>
                    <span className="font-bold text-blue-600">{getPoints(homework)}ポイント</span>
                  </div>
                  <button
                    onClick={() => onDelete(homework.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1 text-sm"
                    aria-label="削除"
                  >
                    削除
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
