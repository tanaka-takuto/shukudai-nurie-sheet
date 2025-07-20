import type { Route } from './+types/home';
import { Link } from 'react-router';
import {
  ChartBarIcon,
  PaintBrushIcon,
  PrinterIcon,
  LightBulbIcon,
  StarIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  BookmarkIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'しゅくだいぬりえシート - 小学生の宿題をぬりえで楽しく進めよう！' },
    {
      name: 'description',
      content:
        '小学生の宿題をぬりえで楽しく進めよう！塗って達成感、見て進捗。宿題の進み具合が一目でわかる、A4印刷OK・完全無料・登録不要の親子で使える宿題管理ツールです。',
    },
    {
      property: 'og:title',
      content: 'しゅくだいぬりえシート - 小学生の宿題をぬりえで楽しく進めよう！',
    },
    {
      property: 'og:description',
      content:
        '小学生の宿題をぬりえで楽しく進めよう！塗って達成感、見て進捗。宿題の進み具合が一目でわかる、A4印刷OK・完全無料・登録不要の親子で使える宿題管理ツールです。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/chart-example.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'しゅくだいぬりえシート' },
    {
      name: 'twitter:description',
      content: '小学生の宿題をぬりえで楽しく進めよう！完全無料・登録不要の宿題管理ツール',
    },
    { name: 'twitter:image', content: '/chart-example.png' },
    { name: 'keywords', content: '宿題,小学生,夏休み,ぬりえ,進捗管理,無料,印刷,バーンダウンチャート' },
    { name: 'icon', href: '/icon.svg' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/icon.png' },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-yellow-50 to-white text-gray-900">
      {/* 1. ファーストビュー */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <img
                  src="/icon.svg"
                  alt="しゅくだいぬりえシート ロゴ"
                  className="w-16 h-16 lg:w-20 lg:h-20"
                />
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  しゅくだいぬりえシート
                </h1>
              </div>
              <p className="text-xl lg:text-2xl text-gray-700 mb-4 font-medium leading-relaxed">
                小学生の宿題をぬりえで楽しく進めよう！
                <br />
                塗って達成感、見て進捗。親も子も嬉しい無料ツール
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                宿題の進み具合が一目でわかる、A4印刷OK・完全無料・登録不要
              </p>
              <Link
                to="/app"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 lg:py-5 lg:px-10 rounded-xl text-xl lg:text-2xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                今すぐ作成する
              </Link>
            </div>
            <div className="mt-12 lg:mt-0 flex justify-center">
              <div className="bg-white rounded-xl shadow-xl p-4 max-w-lg">
                <img
                  src="/chart-example.png"
                  alt="しゅくだいぬりえシート プレビュー - バーンダウンチャートと宿題一覧表"
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-3 text-center font-medium">
                  実際のチャートイメージ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. サービスの特長 */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center gap-3">
            <StarIcon className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-500" />
            サービスの特長
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <div className="mb-4 flex justify-center">
                <ChartBarIcon className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">宿題の進み具合が一目でわかる</h3>
              <p className="text-gray-600 leading-relaxed">
                バーンダウンチャートで残り宿題が視覚的に分かり、計画的に進められます
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <div className="mb-4 flex justify-center">
                <PaintBrushIcon className="w-12 h-12 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">楽しく達成感を味わえる</h3>
              <p className="text-gray-600 leading-relaxed">
                塗り絵感覚で宿題をチェック。完成していく様子で達成感もアップ！
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <div className="mb-4 flex justify-center">
                <PrinterIcon className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">A4印刷で今すぐ使える</h3>
              <p className="text-gray-600 leading-relaxed">
                家庭のプリンターでA4用紙に印刷するだけ。壁に貼って家族みんなで確認
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <div className="mb-4 flex justify-center">
                <LightBulbIcon className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">登録なし・完全無料</h3>
              <p className="text-gray-600 leading-relaxed">
                面倒な会員登録は一切不要。今すぐ使える完全無料サービスです
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 使い方ステップ */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center gap-3">
            <WrenchScrewdriverIcon className="w-8 h-8 lg:w-10 lg:h-10 text-gray-600" />
            使い方ステップ
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">夏休みの期間を入力</h3>
                <p className="text-gray-600 leading-relaxed">
                  開始日と終了日を設定して、宿題スケジュールの基準を作ります
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">宿題をポイント化</h3>
                <p className="text-gray-600 leading-relaxed">
                  自由研究20pt、漢字ドリル30ptなど、宿題の量に応じてポイントを設定
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">チャートを印刷</h3>
                <p className="text-gray-600 leading-relaxed">
                  A4用紙にぬりえチャートを印刷して、見えるところに貼り出そう
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                4
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">宿題が終わったら塗る</h3>
                <p className="text-gray-600 leading-relaxed">
                  宿題を終えるたびにマスを塗って、達成感を視覚的に味わおう
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 完成イメージ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center gap-3">
            <SparklesIcon className="w-8 h-8 lg:w-10 lg:h-10 text-purple-500" />
            完成イメージ
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
              <img
                src="/chart-example.png"
                alt="しゅくだいぬりえシート - バーンダウンチャートの完成例"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center justify-center gap-2">
                  <ChartBarIcon className="w-5 h-5 text-green-600" />
                  バーンダウンチャート
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  理想線（緑の点線）と実績線（赤の点線）で進捗を視覚化。
                  遅れても追いつけるよう計画的に進められます。
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center justify-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-orange-600" />
                  宿題一覧表
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  各宿題のポイントと完了チェック欄付き。 終わったらチェックして達成感を味わおう！
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-xl text-gray-700 font-medium mt-12">
            塗って達成感が見える！
          </p>
        </div>
      </section>

      {/* 5. よくある質問 */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center gap-3">
            <QuestionMarkCircleIcon className="w-8 h-8 lg:w-10 lg:h-10 text-blue-500" />
            よくある質問
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Q. 本当に無料で使えるのですか？
              </h3>
              <p className="text-gray-700">
                A. はい、完全無料です。会員登録も不要で、今すぐお使いいただけます。
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Q. 印刷はA4用紙以外でも大丈夫ですか？
              </h3>
              <p className="text-gray-700">
                A.
                A4サイズに最適化されていますが、B5やA3でも印刷可能です。サイズに応じて調整してください。
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Q. 兄弟姉妹分も作れますか？</h3>
              <p className="text-gray-700">
                A.
                もちろんです！何人分でも作成いただけます。それぞれの宿題内容に合わせてカスタマイズしてください。
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Q. 夏休み以外でも使えますか？
              </h3>
              <p className="text-gray-700">
                A.
                はい！冬休み、春休み、普段の宿題管理にもお使いいただけます。期間は自由に設定できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. フッターCTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center justify-center gap-3">
            <BookmarkIcon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
            今すぐ無料でぬりえチャートを作ろう！
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            完全無料・登録不要・ダウンロード形式
            <br />
            子どもの宿題を楽しく管理して、夏休みを有意義に過ごしましょう
          </p>
          <Link
            to="/app"
            className="inline-block bg-white text-blue-600 font-bold py-4 px-8 lg:py-5 lg:px-10 rounded-xl text-xl lg:text-2xl shadow-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
          >
            今すぐ作成する
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/icon.svg" alt="しゅくだいぬりえシート ロゴ" className="w-8 h-8" />
            <span className="text-lg font-bold">しゅくだいぬりえシート</span>
          </div>
          <p className="text-gray-400 text-sm">子どもの宿題を楽しく管理する無料ツール</p>
        </div>
      </footer>
    </div>
  );
}
