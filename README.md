# Phraze

## Development セットアップ

### 環境変数

.env.sampleから.env.localを作成してください。

- firebaseプロジェクトから環境変数を追加する

### 起動

```bash
yarn
yarn dev
```

## Tips

### pathpida拡張

pathpidaで生成されたファイルを利用して、さらに静的なコードを生成しています。
実装内容は `./script/pathpida-extend.ts` をご覧ください。

tsファイルで作成しているので、esbuildでビルドしたものを実行するようにpackage.jsonでscriptsを書いています。
