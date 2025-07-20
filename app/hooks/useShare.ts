import { useState, useCallback } from 'react';
import * as pako from 'pako';
import type { PrintData, Homework } from '../types/homework';

interface OptimizedData {
  d?: [number, number];
  h?: Array<(string | number)[]>;
  g?: Array<[string, number]>;
}

/**
 * PrintDataを最適化された形式に変換
 */
function optimizePrintData(printData: PrintData): OptimizedData {
  // 日付をタイムスタンプに変換（より短い）
  const startTime = printData.vacationPeriod?.startDate.getTime();
  const endTime = printData.vacationPeriod?.endDate.getTime();

  // 宿題データを最適化（デフォルト値省略）
  const hw = printData.homeworks.map((h) => {
    if (h.type === 'fixed') {
      return [0, h.name, h.points]; // [type(0=fixed), name, points]
    } else {
      const arr = [1, h.name, h.pointsPerUnit, h.units];
      // デフォルト値「ページ」以外の場合のみ追加
      if (h.unitName !== 'ページ') {
        arr.push(h.unitName);
      }
      return arr;
    }
  });

  // ガイドライン設定を最適化（デフォルト値省略）
  const g: Array<[string, number]> = [];
  // デフォルト値と異なる場合のみ設定
  if (!printData.guidelineSettings.showIdealLine) g.push(['si', 0]);
  if (!printData.guidelineSettings.showLastMinuteLine) g.push(['sl', 0]);
  if (printData.guidelineSettings.idealDaysBeforeEnd !== 7)
    g.push(['id', printData.guidelineSettings.idealDaysBeforeEnd]);

  const result: OptimizedData = {};

  // 必須フィールドのみ追加
  if (startTime && endTime) {
    result.d = [startTime, endTime];
  }
  if (hw.length > 0) {
    result.h = hw;
  }
  if (g.length > 0) {
    result.g = g;
  }

  return result;
}

/**
 * 最適化された形式からPrintDataに復元
 */
function restorePrintData(optimized: OptimizedData): PrintData {
  // デフォルト値設定
  const defaultGuidelineSettings = {
    showIdealLine: true,
    showLastMinuteLine: true,
    idealDaysBeforeEnd: 7,
  };

  // ガイドライン設定を復元（デフォルト値使用）
  const guidelineSettings = { ...defaultGuidelineSettings };
  if (optimized.g) {
    optimized.g.forEach(([key, value]) => {
      if (key === 'si') guidelineSettings.showIdealLine = value === 1;
      if (key === 'sl') guidelineSettings.showLastMinuteLine = value === 1;
      if (key === 'id') guidelineSettings.idealDaysBeforeEnd = value;
    });
  }

  const printData: PrintData = {
    vacationPeriod:
      optimized.d && optimized.d[0] && optimized.d[1]
        ? {
            startDate: new Date(optimized.d[0]),
            endDate: new Date(optimized.d[1]),
          }
        : null,
    homeworks: optimized.h
      ? optimized.h.map((h, index: number): Homework => {
          const id = `hw-${index}`;
          if (h[0] === 0) {
            // fixed
            return {
              id,
              name: h[1] as string,
              type: 'fixed',
              points: h[2] as number,
            };
          } else {
            // repeating
            return {
              id,
              name: h[1] as string,
              type: 'repeating',
              pointsPerUnit: h[2] as number,
              units: h[3] as number,
              unitName: (h[4] as string) || 'ページ', // デフォルト値使用
            };
          }
        })
      : [],
    guidelineSettings,
  };

  return printData;
}

/**
 * PrintDataをgzip圧縮してBase64エンコードされた文字列に変換
 */
function encodePrintData(printData: PrintData): string {
  try {
    // データを最適化
    const optimized = optimizePrintData(printData);

    const jsonString = JSON.stringify(optimized);

    // gzip圧縮
    const compressed = pako.gzip(jsonString);

    // Uint8ArrayをBase64URLに変換（URLセーフ）
    const base64 = btoa(String.fromCharCode(...compressed))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    return base64;
  } catch (error) {
    console.error('Failed to encode print data:', error);
    throw new Error('データのエンコードに失敗しました');
  }
}

/**
 * gzip圧縮されたBase64文字列からPrintDataを復元
 */
export function decodePrintData(encodedData: string): PrintData {
  try {

    // Base64URLをBase64に戻す
    let base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');

    // パディングを追加
    while (base64.length % 4) {
      base64 += '=';
    }

    // Base64をUint8Arrayに変換
    const binaryString = atob(base64);
    const compressed = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      compressed[i] = binaryString.charCodeAt(i);
    }

    // gzip解凍
    const decompressed = pako.ungzip(compressed, { to: 'string' });

    const optimized = JSON.parse(decompressed);

    // 最適化されたデータからPrintDataを復元
    const printData = restorePrintData(optimized);

    return printData;
  } catch (error) {
    console.error('Failed to decode print data:', error);
    throw new Error('データの復元に失敗しました');
  }
}

export function useShare() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 共有リンクを生成
   */
  const generateShareLink = useCallback((printData: PrintData): string => {
    const encodedData = encodePrintData(printData);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/app?d=${encodedData}`;
  }, []);

  /**
   * クリップボードにテキストをコピー
   */
  const copyToClipboard = useCallback(async (text: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // フォールバック: 古いブラウザ対応
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setError('クリップボードへのコピーに失敗しました');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 共有リンクを生成してクリップボードにコピー
   */
  const shareToClipboard = useCallback(
    async (printData: PrintData): Promise<string> => {
      const shareLink = generateShareLink(printData);
      await copyToClipboard(shareLink);
      return shareLink;
    },
    [generateShareLink, copyToClipboard]
  );

  /**
   * LINEで共有するためのURLを生成
   */
  const generateLineShareUrl = useCallback((shareLink: string, message: string = ''): string => {
    const text = message || 'しゅくだいぬりえシートを共有します！';
    const encodedText = encodeURIComponent(`${text}\n${shareLink}`);
    return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareLink
    )}&text=${encodedText}`;
  }, []);

  /**
   * X (Twitter) で共有するためのURLを生成
   */
  const generateTwitterShareUrl = useCallback((shareLink: string, message: string = ''): string => {
    const text = message || 'しゅくだいぬりえシートを共有します！';
    const encodedText = encodeURIComponent(`${text} ${shareLink}`);
    return `https://twitter.com/intent/tweet?text=${encodedText}`;
  }, []);

  /**
   * LINEで共有
   */
  const shareToLine = useCallback(
    (printData: PrintData, message?: string) => {
      const shareLink = generateShareLink(printData);
      const lineUrl = generateLineShareUrl(shareLink, message);
      window.open(lineUrl, '_blank');
    },
    [generateShareLink, generateLineShareUrl]
  );

  /**
   * Xで共有
   */
  const shareToTwitter = useCallback(
    (printData: PrintData, message?: string) => {
      const shareLink = generateShareLink(printData);
      const twitterUrl = generateTwitterShareUrl(shareLink, message);
      window.open(twitterUrl, '_blank');
    },
    [generateShareLink, generateTwitterShareUrl]
  );

  return {
    isLoading,
    error,
    generateShareLink,
    copyToClipboard,
    shareToClipboard,
    shareToLine,
    shareToTwitter,
  };
}
