# kamiyama-math-apps

神山まるごと高専 基礎数学Ⅰ — 数学の世界を体験する6つのWebアプリ

> 「数学＝計算・苦行」という先入観を脱ぎ捨て、日常とのつながりを体験する初回授業用アプリ群

## アプリ一覧

| # | アプリ名 | テーマ | 数学の接続 | デプロイ |
|---|---------|--------|-----------|---------|
| 1 | [投資シミュレーター](./investment-sim/) | 毎月1,000円を積み立てると？ | 数列・複利・等比数列 | [▶ 開く](https://kamiyama-math-apps-yw3k.vercel.app/) |
| 2 | [席替え確率シミュレーター](./seat-shuffle/) | 好きな人の隣になる確率は？ | 確率・組み合わせ・順列 | [▶ 開く](https://kamiyama-math-apps-yk38.vercel.app/) |
| 3 | [関数グラフ・アニメーター](./function-grapher/) | グラフの形を動かして感じる | 一次・二次・冪関数 | [▶ 開く](https://kamiyama-math-apps-bn5d.vercel.app/) |
| 4 | [音波ビジュアライザー](./sound-visualizer/) | 声は sin と cos でできている | 三角関数・フーリエ解析 | [▶ 開く](https://kamiyama-math-apps.vercel.app/) |
| 5 | [面積パズル](./area-puzzle/) | 積分って何を足し算してる？ | 面積・極限・微積分 | [▶ 開く](https://kamiyama-math-apps-iiqk.vercel.app/) |
| 6 | [図形×地図スキャナー](./geometry-map/) | 地図の距離は三平方の定理 | 三平方・座標・ベクトル | [▶ 開く](https://kamiyama-math-apps-pdc8.vercel.app/) |

## 技術スタック

- React 18 + Vite
- GitHub + Vercel（各アプリ独立デプロイ）
- 外部ライブラリなし（Web APIs のみ）

## ローカル開発

```bash
cd <app-name>   # 例: cd sound-visualizer
npm install
npm run dev
```

## 対象

- 神山まるごと高専 1年生（44名）
- 中学数学まで習得済み・高校数学未習
- 3〜4名チームで6ステーションを巡回体験
