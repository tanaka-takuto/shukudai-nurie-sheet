import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Homework } from '../types/homework';
import { HomeworkList } from './HomeworkList';
import {
  PencilIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { HOMEWORK_PRESETS, type HomeworkPreset } from '../constants/homeworkPresets';

interface HomeworkFormProps {
  onAddHomework: (homework: Homework) => void;
  homeworks: Homework[];
  onUpdateHomework: (id: string, updates: Partial<Homework>) => void;
  onDeleteHomework: (id: string) => void;
}

interface HomeworkFormData {
  name: string;
  type: 'fixed' | 'repeating';
  points?: string;
  pointsPerUnit?: string;
  units?: string;
  unitName?: string;
}


export function HomeworkForm({
  onAddHomework,
  homeworks,
  onUpdateHomework,
  onDeleteHomework,
}: HomeworkFormProps) {
  const [showHomeworkForm, setShowHomeworkForm] = useState(false);
  const [inputMode, setInputMode] = useState<'preset' | 'custom'>('preset');
  const [activeCategory, setActiveCategory] = useState('国語・算数');
  const [showAdvancedCustom, setShowAdvancedCustom] = useState(false);

  const homeworkForm = useForm<HomeworkFormData>({
    defaultValues: {
      type: 'fixed',
      unitName: 'ページ',
    },
  });

  const handleHomeworkSubmit = (data: HomeworkFormData) => {
    const id = `hw-${Date.now()}`;

    if (data.type === 'fixed') {
      onAddHomework({
        id,
        name: data.name,
        type: 'fixed',
        points: Number(data.points) || 0,
      });
    } else {
      onAddHomework({
        id,
        name: data.name,
        type: 'repeating',
        pointsPerUnit: Number(data.pointsPerUnit) || 0,
        units: Number(data.units) || 0,
        unitName: data.unitName || 'ページ',
      });
    }

    homeworkForm.reset();
    setShowHomeworkForm(false);
    setInputMode('preset');
  };

  const handlePresetSelect = (preset: HomeworkPreset) => {
    const id = `hw-${Date.now()}`;

    if (preset.type === 'fixed') {
      onAddHomework({
        id,
        name: preset.name,
        type: 'fixed',
        points: preset.points || 0,
      });
    } else {
      onAddHomework({
        id,
        name: preset.name,
        type: 'repeating',
        pointsPerUnit: preset.pointsPerUnit || 0,
        units: preset.units || 0,
        unitName: preset.unitName || 'ページ',
      });
    }

    setShowHomeworkForm(false);
    setInputMode('preset');
  };

  const categories = Array.from(new Set(HOMEWORK_PRESETS.map((preset) => preset.category)));

  const homeworkType = homeworkForm.watch('type');

  // 合計ポイントを計算
  const getTotalPoints = () => {
    return homeworks.reduce((total, hw) => {
      if (hw.type === 'fixed') {
        return total + hw.points;
      } else {
        return total + hw.pointsPerUnit * hw.units;
      }
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* 合計ポイント表示 */}
      {homeworks.length > 0 && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <AcademicCapIcon className="w-5 h-5 text-blue-100" />
                  <p className="text-blue-100 text-sm">現在の合計</p>
                </div>
                <p className="text-4xl font-bold">{getTotalPoints()}</p>
                <p className="text-blue-100 text-lg">ポイント</p>
              </div>
            </div>
          </div>

          {/* 100ポイント超過時の警告 */}
          {getTotalPoints() > 100 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-800 font-semibold text-sm mb-1">
                    ポイントが多すぎるかもしれません
                  </h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    100ポイント以下がおすすめです。ポイントが多いとチャートのマス目が小さくなり、お子さまが塗りにくくなります。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        {!showHomeworkForm ? (
          <button
            onClick={() => setShowHomeworkForm(true)}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            + 宿題を追加
          </button>
        ) : (
          <div className="space-y-4">
            {/* モード選択タブ */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setInputMode('preset')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                  inputMode === 'preset'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-700'
                }`}
              >
                <BookOpenIcon className="w-4 h-4" />
                よくある宿題から選ぶ
              </button>
              <button
                onClick={() => setInputMode('custom')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                  inputMode === 'custom'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-700'
                }`}
              >
                <PencilIcon className="w-4 h-4" />
                自分で作成
              </button>
            </div>

            {inputMode === 'preset' ? (
              /* プリセット選択画面 */
              <div className="space-y-4">
                {/* カテゴリタブ */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* 選択されたカテゴリの宿題リスト */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {HOMEWORK_PRESETS.filter((preset) => preset.category === activeCategory).map(
                    (preset) => (
                      <div
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset)}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <preset.icon className="w-8 h-8 text-blue-500" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{preset.name}</h4>
                            <p className="text-sm text-gray-600">{preset.description}</p>
                            <p className="text-xs text-blue-600 mt-1">
                              {preset.type === 'fixed'
                                ? `${preset.points}ポイント`
                                : `${preset.pointsPerUnit}pt × ${preset.units}${
                                    preset.unitName
                                  } = ${(preset.pointsPerUnit || 0) * (preset.units || 0)}ポイント`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              /* カスタム入力フォーム */
              <form
                onSubmit={homeworkForm.handleSubmit(handleHomeworkSubmit)}
                className="space-y-4"
              >
                {/* 基本入力フィールド */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">宿題名</label>
                    <input
                      type="text"
                      {...homeworkForm.register('name', { required: true })}
                      placeholder="例：自由研究、漢字ドリル"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {homeworkType === 'fixed' ? 'ポイント数' : '単位あたりポイント'}
                    </label>
                    <input
                      type="number"
                      {...homeworkForm.register(
                        homeworkType === 'fixed' ? 'points' : 'pointsPerUnit',
                        { required: true, min: 0 }
                      )}
                      placeholder={homeworkType === 'fixed' ? '20' : '1'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                {/* 詳細を開くボタン */}
                <button
                  type="button"
                  onClick={() => setShowAdvancedCustom(!showAdvancedCustom)}
                  className="text-blue-500 hover:text-blue-600 transition-colors text-sm flex items-center gap-1"
                >
                  {showAdvancedCustom ? '▼ 詳細を閉じる' : '▶ 詳細を開く'}
                </button>

                {/* 詳細フィールド（展開時のみ表示） */}
                {showAdvancedCustom && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">タイプ</label>
                      <select
                        {...homeworkForm.register('type')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      >
                        <option value="fixed">固定ポイント</option>
                        <option value="repeating">繰り返し（単位あり）</option>
                      </select>
                    </div>

                    {homeworkType === 'repeating' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            数量
                          </label>
                          <input
                            type="number"
                            {...homeworkForm.register('units', { required: true, min: 0 })}
                            placeholder="30"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            単位
                          </label>
                          <input
                            type="text"
                            {...homeworkForm.register('unitName')}
                            placeholder="ページ"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    追加
                  </button>
                </div>
              </form>
            )}

            <div className="pt-4 border-t">
              <button
                onClick={() => {
                  setShowHomeworkForm(false);
                  homeworkForm.reset();
                  setInputMode('preset');
                }}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← 戻る
              </button>
            </div>
          </div>
        )}

        {homeworks.length > 0 && (
          <div className="mt-6">
            <HomeworkList
              homeworks={homeworks}
              onUpdate={onUpdateHomework}
              onDelete={onDeleteHomework}
            />
          </div>
        )}
      </div>
    </div>
  );
}
