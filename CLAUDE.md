# CLAUDE.md

## 応答言語

- ユーザーが別言語を指定しない限り、日本語で回答する。

## 基本ワークフロー

- 曖昧な点は推測せず、ファイルや実行結果を確認する。
- 破壊的、または巻き戻し困難な操作の前には、必ずユーザーの明示同意を取る。
- 最終報告では、変更点・確認内容・未検証事項を簡潔にまとめる。
- 指摘がゼロになるか、5ラウンドに達したら強制終了する

## マルチエージェント運用

- 並列調査や役割分担が有効な場合は、agent team を作成してよい。
- 調査・レビュー・比較検討のように独立して進められる作業では、複数の teammate に分担して進める。
- 実装を伴う大きな作業では、必要に応じて team の人数や役割を増やしてよい。
- team を作る場合は、各 teammate の役割が重複しないように分ける。
- split panes を使える環境では、team 作成時は split panes を優先する。

## 開発コマンド

- 依存関係のインストール: `pnpm`
- 開発サーバーの起動: `pnpm dev`（Next.js、pathpidaコードジェネレーション、pathpida拡張を並行して実行）
- Next.jsのみの起動: `pnpm dev:next`
- GraphQLスキーマの変更を監視し、型を再生成: `pnpm dev:path`
- pathpida拡張の変更を監視: `pnpm dev:path-ext`
- 本番用ビルド: `pnpm build`
- 本番サーバーの起動: `pnpm start`
- コードのLint: `pnpm lint`
- タイプチェック: `pnpm tslint`
- コードのフォーマット: `pnpm format`
- GraphQL型の生成: `pnpm codegen`
- pathpida型の一度だけの生成: `pnpm generate:path`
- pathpida拡張のビルドと実行: `pnpm script:path`

## プロジェクト構造

- `src/pages`: Next.jsのページディレクトリ（ページルーター）

  - `index.tsx`: ホームページ
  - `dashboard/index.tsx`: ダッシュボードページ
  - `signin.tsx`: サインインページ
  - `deck/[id]/index.tsx`: デッキビューぺージ
  - `deck/[id]/edit.tsx`: デッキ編集ページ
  - `deck/[id]/admin/index.tsx`: デッキ管理ページ
  - `404.tsx`: カスタム404ページ
  - `_app.tsx`: カスタムAppコンポーネント（プロバイダー、レイアウトを提供）
  - `_document.tsx`: カスタムDocumentコンポーネント
  - `_error.jsx`: カスタムエラーページ

- `src/components`: 機能別に整理されたReactコンポーネント

  - `template`: ページレベルコンポーネント（ホーム、ダッシュボード、エラー、サインイン、デッキ）
  - `common`: 共有UIコンポーネント（レイアウト、テーマ、アイコン、エディター、ツールチップなど）
  - `feature`: フィーチャー固有のコンポーネント（認証、デッキ、カード、グラフ、設定）
  - `ui`: Shadcn UIコンポーネント（あれば）
  - `magicui`: Magic UIコンポーネント（あれば）

- `src/lib`: ユーティリティモジュールとサービス

  - `gql`: GraphQLクライアントの設定（Urql）
  - `firebase`: Firebaseの初期化とサービス
  - `urql`: Urqlの交換設定
  - `env`: 環境変数のバリデーション
  - `logger`: カスタムロガー
  - `pathpida`: 生成されたpathpida型
  - `date-util`: 日付フォーマットユーティリティ
  - `sentry`: Sentryの設定
  - `webSpeech`: Web Speech APIラッパー

- `src/hooks`: カスタムReactフック

- `src/styles`: CSS/Tailwindスタイルシート

- `public`: 静的アセット

- `script`: コード生成のためのスクリプト（pathpida拡張）

## 主要技術

- **フレームワーク**: Next.js 15（ページルーター）
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4
- **状態管理**: Zustand（`src/lib`または`src/hooks`のストアを参照）
- **GraphQL**: Urqlとカスタム交換
- **認証**: Firebase認証（`src/lib/firebase`と`src/components/feature/auth`を参照）
- **フォーム処理**: React Hook FormとZodバリデーション
- **リッチテキストエディター**: Lexical
- **エラー追跡**: Sentry（`@sentry/nextjs`経由で統合）
- **コード生成**:
  - GraphQL TypeScript型のための`graphql-codegen`
  - Firebase Firestore用のPathpida型
- **Linting**: Next.jsとPrettierの設定を持つESLint
- **フォーマット**: Prettier

## アーキテクチャの注意点

- アプリはカスタムの`_app.tsx`を使用してグローバルプロバイダー（テーマ、認証、Lexicalなど）を提供します
- レイアウトは`src/components/common/layout`からの`AppBar`と`SideNav`で構成されます
- Firebaseは認証とFirestoreデータベースに使用されます
- GraphQLスキーマは`pnpm codegen`により`graphql.schema.json`が自動生成されます
- エディターはLexicalで構築され、カスタムプラグイン（Markdownショートカットなど）を含みます
- テーマの切り替えは`next-themes`とカスタムテーマプロバイダーによって処理されます
- Sentryは本番環境でのエラー報告とパフォーマンスモニタリングのために設定されます

## 一般的なタスク

- 新しいページの追加: `src/pages`（またはサブディレクトリ）にファイルを作成し、コンポーネントをエクスポートします。
- 新しいコンポーネントの追加: 適切なサブディレクトリの下の`src/components`に配置し、そのindex.tsからエクスポートします。
- GraphQL型の更新: `pnpm codegen`を実行します。
- Pathpida型の更新: `pnpm generate:path`を実行します。
- 環境変数: `.env.sample`を`.env.local`にコピーし、必要な変数（Firebase、Sentryなど）を追加します。
