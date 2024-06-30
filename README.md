# Phraze

## Development セットアップ

### FirebaseのConfigファイルを配置

`src/lib/firebase/config.ts`を設置する必要があります。Firebaseコンソールのプロジェクトの設定から下記の部分を埋めてファイルを作成してください

```ts
const firebaseConfig = {
  apiKey: 'xxxx',
  authDomain: 'phraze-xxxx.firebaseapp.com',
  projectId: 'phraze-xxxx',
  storageBucket: 'phraze-xxxx.appspot.com',
  messagingSenderId: 'xxxx',
  appId: 'xxx',
  measurementId: 'G-xxx',
}

export default firebaseConfig
```

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
