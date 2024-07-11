/** pathpidaで生成されたファイルからpathnameのリストを生成する */
import chokidar from 'chokidar'
import fs from 'fs/promises'
import minimist from 'minimist'
import path from 'path'
import * as prettier from 'prettier'
import { PagesPath, pagesPath } from '@/lib/pathpida/$path'

const outDir = 'src/lib/pathpida'
const filename = 'pathnames.ts'
const generateComment = '// NO EDIT. this is generated file.'

const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const watch = (callback: (...args: unknown[]) => void) => {
  // 監視対象
  const inputPath = path.posix.join(outDir, '$path.ts')
  // 更新するファイルは無視する
  const ignorePath = path.join(outDir, filename)

  chokidar
    .watch(inputPath, {
      ignoreInitial: true,
      ignored: new RegExp(`${escapeRegExp(ignorePath)}`),
    })
    .on('all', callback)
}

const writeFile = async ({
  filePath,
  text,
}: {
  text: string
  filePath: string
}) => {
  await fs.writeFile(filePath, text, 'utf-8')
  // eslint-disable-next-line no-console
  console.log(`${filePath} was built successfully.`)
}

// 再帰的に $url の return 値を配列で取得する関数
function createPathnames(pagesPathObj: PagesPath): string[] {
  const urls: string[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const filePath = path.posix.join(outDir, filename)
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

  const watchMode = 'watch' in argv
  if (watchMode) {
    // eslint-disable-next-line no-console
    console.log('run watch mode...')
  }

  watchMode
    ? watch(() => {
        return generate()
      })
    : generate()
}

main()
