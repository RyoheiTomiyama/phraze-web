import { $convertToMarkdownString } from '@lexical/markdown'
import { EditorState } from 'lexical'

export const getMarkdownString = (editorState: EditorState): string => {
  return editorState.read(() => {
    return $convertToMarkdownString(undefined, undefined, true)
  })
}
