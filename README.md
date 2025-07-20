# 🖍️ しゅくだいぬりえシート

夏休みの宿題を「見える化」して、子どもが楽しく塗って達成感を味わえる印刷シート作成システム

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🧭 システム概要

「しゅくだいぬりえシート」は、子どもの夏休みの宿題進捗をバーンダウンチャートで可視化し、親が印刷して子どもと一緒に活用できる無料ツールです。
宿題の達成を「塗り絵」で楽しく管理し、やる気と達成感を引き出すことを目的とします。

## ✨ 特徴・運用方法

- 🌐 **ブラウザ上のフロントエンドのみで完結**（オフライン OK）
- 🖨️ **A4サイズ1枚のPDF**（または印刷用画面）が出力される
- 🎨 **印刷したチャートと宿題リストを子どもが鉛筆や色鉛筆で塗りながら進捗管理**
- ✏️ **実際の進捗入力などの「運用」はシートに手書きで行う**
- 🆓 **完全無料・登録不要**

## 🖨️ 印刷レイアウト（A4縦1枚）

### 📊 上半分：バーンダウンチャート
- **X軸**：日付（夏休み全日分）
- **Y軸**：残りポイント数
- **線**：理想線・ぎりぎり線
- **背景**：マス目（1ポイント＝1マス）を敷き詰め、塗り絵エリアとして活用

### 📋 下半分：宿題リスト（チェック表付き）
```
✅ 宿題名          内容              pt    終わった日
☐ 漢字ドリル      1ページ × 30回    30pt  ______
☐ 自由研究        -                20pt  ______
☐ 工作           -                15pt  ______
```

## 🚀 はじめに

### 前提条件

- Node.js 18+ 
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/tanaka-takuto/shukudai-nurie-sheet.git
cd shukudai-nurie-sheet

# 依存関係をインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは `http://localhost:5173` で利用可能です。

## 📝 入力項目

### 1. 夏休みの期間
- 開始日
- 終了日

### 2. 宿題の内容（ポイント化）

**2つの入力形式に対応：**

#### 自由形式
- 宿題名 + ポイント数
- 例：自由研究（20pt）

#### 繰り返し形式  
- 宿題名 + 単位あたりのポイント × 数量
- 例：漢字ドリル（1pt × 30ページ = 30pt）

### 3. ガイドライン線（進捗線）設定
- **理想線**：余裕を持って終わらせる目標日
- **ぎりぎり線**：最終日に終わらせる線
- **チャレンジ線**：任意追加可能（将来的に）

## 🏗️ プロジェクト構造

```
app/
├── components/           # Reactコンポーネント
│   ├── BurndownChart.tsx      # バーンダウンチャート
│   ├── GuidelineSettings.tsx  # ガイドライン設定
│   ├── HelpModal.tsx          # ヘルプモーダル
│   ├── HomeworkForm.tsx       # 宿題入力フォーム
│   ├── HomeworkList.tsx       # 宿題一覧表示
│   ├── PrintLayout.tsx        # 印刷レイアウト
│   ├── ShareButton.tsx        # シェアボタン
│   └── VacationPeriodForm.tsx # 休暇期間フォーム
├── hooks/               # カスタムフック
│   └── useShare.ts           # シェア機能フック
├── routes/              # React Routerルート
│   ├── app.tsx              # メインアプリケーション
│   └── home.tsx             # ランディングページ
├── types/               # TypeScript型定義
│   └── homework.ts          # 宿題関連の型
├── utils/               # ユーティリティ関数
├── app.css              # グローバルスタイル
├── root.tsx             # ルートコンポーネント
└── routes.ts            # ルート設定
```

## 🛠️ 技術スタック

### コア技術
- **React 19** - UIライブラリ
- **React Router v7** - ルーティング（SSR対応）
- **TypeScript** - 型安全性
- **Vite** - ビルドツール

### UI・スタイリング
- **TailwindCSS** - CSSフレームワーク
- **Heroicons** - アイコンライブラリ
- **Framer Motion** - アニメーション

### データ可視化・ユーティリティ
- **Chart.js + react-chartjs-2** - チャート描画
- **date-fns** - 日付処理
- **React Hook Form** - フォーム管理

### データ処理・共有
- **pako** - 圧縮ライブラリ（シェア機能用）

## 📱 利用の流れ（親目線）

1. **Webページにアクセス**して宿題情報を入力
2. **チャートと宿題一覧が自動生成**される
3. **PDFとして保存 or 印刷**
4. **子どもに渡して「宿題やったら塗ってね！」と運用開始！**

## 🔧 開発・ビルド

### 開発
```bash
npm run dev          # 開発サーバー起動
npm run typecheck    # 型チェック
npm run lint         # ESLint実行
npm run format       # Prettier実行
```

### プロダクションビルド
```bash
npm run build        # プロダクションビルド
npm run start        # プロダクションサーバー起動
```

### ビルド出力
```
build/
├── client/    # 静的アセット
└── server/    # サーバーサイドコード
```

## 🚀 デプロイメント

### 対応プラットフォーム
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- その他の静的ホスティングサービス

## 🔜 今後の拡張アイデア

- **デザインテーマ変更**（海・星・夏祭りなど）
- **シール風アイコンの貼り付け領域**
- **お手伝い・生活習慣なども含めた拡張版**（応用用途）
- **PDFダウンロード機能の強化**
- **モバイル最適化**

## 🤝 コントリビューション

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 お問い合わせ

プロジェクトに関するご質問やフィードバックは、[Issues](https://github.com/tanaka-takuto/shukudai-nurie-sheet/issues) ページからお気軽にお寄せください。

---

**Built with ❤️ for parents and children**