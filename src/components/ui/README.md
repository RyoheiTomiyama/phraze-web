# shadcn/ui

https://ui.shadcn.com/

> [!WARNING]
> src/components/ui ディレクトリは shadcn/ui によって生成されるファイル置き場です。
>
> 触らないようにお願いします。

## アップグレード

自動でインストールされたパッケージが古くなってきて、アップグレードしたいときのコマンド

```sh
for file in src/components/ui/*.tsx; do npx shadcn@latest add -y -o $(basename "$file" .tsx); done
```

ref: https://github.com/shadcn-ui/ui/discussions/790
