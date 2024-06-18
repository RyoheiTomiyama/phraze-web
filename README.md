# Phraze

## Development

```bash
yarn
yarn dev
```

## Tips

### pathpida拡張

pathpidaで生成されたファイルを利用して、さらに静的なコードを生成しています。
実装内容は `./script/pathpida-extend.ts` をご覧ください。

tsファイルで作成しているので、esbuildでビルドしたものを実行するようにpackage.jsonでscriptsを書いています。
