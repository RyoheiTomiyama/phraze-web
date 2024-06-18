/** pathpidaで生成されたファイルからpathnameのリストを生成する */
import fs from 'fs/promises'
import minimist from 'minimist'
import path from 'path'
import { PagesPath, pagesPath } from '@/lib/pathpida/$path'
import * as prettier from 'prettier'

const outDir = 'src/lib/pathpida'
const generateComment = '// NO EDIT. this is generated file.'

const writeFile = async ({
  filePath,
  text,
}: {
  text: string
  filePath: string
}) => {
  await fs.writeFile(filePath, text, 'utf-8')
  console.log(`${filePath} was built successfully.`)
}

// 再帰的に $url の return 値を配列で取得する関数
function createPathnames(pagesPathObj: PagesPath): string[] {
  const urls: string[] = []

  function traverse(obj: any) {
    for (const key in obj) {
      if (key === '$url') {
        urls.push(obj[key]().pathname)
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        traverse(obj[key])
      } else if (typeof obj[key] === 'function') {
        const result = obj[key]('123') // 例として '123' を渡す
        traverse(result)
      }
    }
  }

  traverse(pagesPathObj)
  return urls
}

const generate = async () => {
  const pathnames = createPathnames(pagesPath)

  const template = `${generateComment}
export const pathnames = [${pathnames
    .map((p) => {
      return `'${p}'`
    })
    .join(',\n')}] as const

export type Pathname = typeof pathnames[number]`

  const filePath = path.posix.join(outDir, 'pathnames.ts')
  const prettierOpt = (await prettier.resolveConfig(filePath)) ?? undefined
  const text = await prettier.format(template, {
    ...prettierOpt,
    filepath: filePath,
  })

  writeFile({ filePath, text })
}

const main = () => {
  const argv = minimist(process.argv, {
    string: ['watch'],
    alias: { w: 'watch' },
  })

  if ('watch' in argv) {
    console.log('runwatch mode')
  }

  generate()
}

main()
