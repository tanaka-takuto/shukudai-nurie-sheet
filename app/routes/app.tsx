import type { Route } from './+types/app';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { PrintData, Homework, GuidelineSettings } from '../types/homework';
import { VacationPeriodForm } from '../components/VacationPeriodForm';
import { GuidelineSettingsForm } from '../components/GuidelineSettingsForm';
import { HomeworkForm } from '../components/HomeworkForm';
import { BurndownChart } from '../components/BurndownChart';
import { PrintLayout } from '../components/PrintLayout';
import { ShareButton } from '../components/ShareButton';
import { HelpButton } from '../components/HelpModal';
import { decodePrintData } from '../hooks/useShare';
import { SwatchIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'しゅくだいぬりえシート作成' },
    { name: 'description', content: '夏休みの宿題管理シートを作成します' },
  ];
}

export default function App() {
  const [printData, setPrintData] = useState<PrintData>({
    vacationPeriod: null,
    homeworks: [],
    guidelineSettings: {
      showIdealLine: true,
      showLastMinuteLine: true,
      idealDaysBeforeEnd: 7,
    },
  });
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // URLパラメータから共有データを復元
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('d');

    if (dataParam) {
      try {
        const decodedData = decodePrintData(dataParam);
        setPrintData(decodedData);

        // URLからパラメータを削除（履歴を汚さないため）
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      } catch (error) {
        console.error('Failed to load shared data:', error);
        setLoadError('共有データの読み込みに失敗しました');
      }
    }
  }, []);

  const handleVacationPeriodChange = (vacationPeriod: PrintData['vacationPeriod']) => {
    setPrintData((prev) => ({ ...prev, vacationPeriod }));
  };

  const handleAddHomework = (homework: Homework) => {
    setPrintData((prev) => ({
      ...prev,
      homeworks: [...prev.homeworks, homework],
    }));
  };

  const handleUpdateHomework = (id: string, updates: Partial<Homework>) => {
    setPrintData((prev) => ({
      ...prev,
      homeworks: prev.homeworks.map((hw) => 
        hw.id === id ? { ...hw, ...updates } as typeof hw : hw
      ),
    }));
  };

  const handleDeleteHomework = (id: string) => {
    setPrintData((prev) => ({
      ...prev,
      homeworks: prev.homeworks.filter((hw) => hw.id !== id),
    }));
  };

  const handleGuidelineSettingsChange = (guidelineSettings: GuidelineSettings) => {
    setPrintData((prev) => ({ ...prev, guidelineSettings }));
  };

  if (showPrintPreview && printData.vacationPeriod) {
    return (
      <PrintLayout
        vacationPeriod={printData.vacationPeriod}
        homeworks={printData.homeworks}
        guidelineSettings={printData.guidelineSettings}
        onBack={() => setShowPrintPreview(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <SwatchIcon className="w-8 h-8 text-blue-500" />
              しゅくだいぬりえシート作成
            </h1>
            <Link to="/" className="text-blue-500 hover:text-blue-600 transition-colors">
              ← トップに戻る
            </Link>
          </div>

          {loadError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{loadError}</p>
            </div>
          )}
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Step 1: Vacation Period */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-800">夏休みの期間を入力</h2>
              </div>
              <VacationPeriodForm
                vacationPeriod={printData.vacationPeriod}
                onVacationPeriodChange={handleVacationPeriodChange}
              />
            </motion.div>

            {/* Step Separator */}
            {printData.vacationPeriod && <div className="border-t-4 border-gray-200 my-8"></div>}

            {/* Step 2: Guidelines */}
            <AnimatePresence>
              {printData.vacationPeriod && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                      2
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">ガイドライン設定</h2>
                  </div>
                  <GuidelineSettingsForm
                    guidelineSettings={printData.guidelineSettings}
                    onGuidelineSettingsChange={handleGuidelineSettingsChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Separator */}
            {printData.vacationPeriod && <div className="border-t-4 border-gray-200 my-8"></div>}

            {/* Step 3: Homework Registration */}
            <AnimatePresence>
              {printData.vacationPeriod && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                      3
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">宿題を登録する</h2>
                  </div>
                  <HomeworkForm
                    onAddHomework={handleAddHomework}
                    homeworks={printData.homeworks}
                    onUpdateHomework={handleUpdateHomework}
                    onDeleteHomework={handleDeleteHomework}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {printData.vacationPeriod && printData.homeworks.length > 0 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                        4
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">プレビューで確認する</h2>
                    </div>
                    <BurndownChart
                      vacationPeriod={printData.vacationPeriod}
                      homeworks={printData.homeworks}
                      guidelineSettings={printData.guidelineSettings}
                    />

                    {/* 使い方ガイド */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        チャートの使い方
                      </h4>
                      <div className="space-y-2 text-blue-700 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="font-semibold min-w-[20px] text-blue-800">1.</span>
                          <span>印刷して壁や机に貼ります</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold min-w-[20px] text-blue-800">2.</span>
                          <span>
                            宿題が終わったら、その分だけ<strong>上からマス目を塗ります</strong>
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold min-w-[20px] text-blue-800">3.</span>
                          <span>
                            <strong>線より下まで塗れていれば</strong>順調に進んでいます
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold min-w-[20px] text-blue-800">4.</span>
                          <span>一番下まで塗り終わったら宿題完了です！</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPrintPreview(true)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors min-h-[48px] flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-9a2 2 0 00-2-2H9a2 2 0 00-2 2v9a2 2 0 002 2z"
                            />
                          </svg>
                          印刷する
                        </motion.button>

                        <div className="flex-1">
                          <ShareButton printData={printData} />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center mt-3">印刷画面が表示されます</p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <HelpButton />
    </div>
  );
}
