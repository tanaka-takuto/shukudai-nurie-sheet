import { useState } from 'react';
import type { PrintData } from '../types/homework';
import { useShare } from '../hooks/useShare';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkIcon, CheckIcon, ChatBubbleLeftIcon, HashtagIcon } from '@heroicons/react/24/outline';

interface ShareButtonProps {
  printData: PrintData;
}

export function ShareButton({ printData }: ShareButtonProps) {
  const { shareToClipboard, shareToLine, shareToTwitter, isLoading } = useShare();
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopyLink = async () => {
    try {
      await shareToClipboard(printData);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleLineShare = () => {
    shareToLine(printData, 'しゅくだいぬりえシートを共有します！');
    setShowShareMenu(false);
  };

  const handleTwitterShare = () => {
    shareToTwitter(printData, 'しゅくだいぬりえシートを共有します！');
    setShowShareMenu(false);
  };

  // データが不完全な場合は表示しない
  if (!printData.vacationPeriod || printData.homeworks.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors flex items-center justify-center gap-2 min-h-[48px]"
        disabled={isLoading}
      >
        <LinkIcon className="w-4 h-4" />
        共有する
      </button>

      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
          >
            <div className="p-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyLink}
                disabled={isLoading}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2 transition-colors"
              >
                {copySuccess ? (
                  <CheckIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
                {copySuccess ? 'コピー完了！' : 'リンクをコピー'}
              </motion.button>

              <div className="border-t border-gray-100 my-1"></div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLineShare}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2 transition-colors"
              >
                <ChatBubbleLeftIcon className="w-4 h-4" />
                LINEで共有
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTwitterShare}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2 transition-colors"
              >
                <HashtagIcon className="w-4 h-4" />
                Xで共有
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 背景クリックで閉じる */}
      {showShareMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowShareMenu(false)} />
      )}
    </div>
  );
}
