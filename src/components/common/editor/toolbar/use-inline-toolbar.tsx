// 参考： https://github.com/facebook/lexical/blob/main/packages/lexical-playground/src/plugins/FloatingTextFormatToolbarPlugin/index.tsx
import {
  VirtualElement,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import { $getSelection, $isRangeSelection } from 'lexical'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelectionChangeListener } from './use-selection-change-listener'

// 選択範囲のBoundingClientRectを取得
const getDOMRangeRect = (
  nativeSelection: Selection,
  rootElement: HTMLElement,
) => {
  if (nativeSelection.anchorNode === rootElement) {
    let inner = rootElement
    while (inner.firstElementChild !== null) {
      inner = inner.firstElementChild as HTMLElement
    }
    return inner
  }

  const domRange = nativeSelection.getRangeAt(0)
  if (domRange.startContainer instanceof HTMLElement) {
    // 選択しているElementがinline要素だとツールバーの表示位置がずれるので、中のblock要素まで辿る 例： a > img
    let inner: Element = domRange.startContainer
    while (
      inner.firstElementChild !== null &&
      getComputedStyle(inner).display === 'inline'
    ) {
      inner = inner.firstElementChild
    }
    return inner
  }

  return domRange
}

export const useInlineToolbar = () => {
  const { open, anchorEl } = useOpenableInlineToolbar()

  const { refs, floatingStyles, placement } = useFloating({
    open,
    middleware: [offset(10), flip(), shift()],
    placement: 'bottom',
    strategy: 'absolute',
  })

  useEffect(() => {
    if (anchorEl) {
      const virtualElement: VirtualElement = {
        // getBoundingClientRect: anchorEl.getBoundingClientRect,
        getBoundingClientRect() {
          const { x, y, top, left, bottom, right, width, height } =
            anchorEl.getBoundingClientRect()
          return { x, y, top, left, bottom, right, width, height }
        },
      }
      refs.setPositionReference(virtualElement)
    }
  }, [anchorEl, refs])

  return useMemo(() => {
    return {
      refs,
      floatingStyles,
      placement,
      open,
    }
  }, [floatingStyles, open, placement, refs])
}

/** editorの状態からインラインツールバーを開くか */
const useOpenableInlineToolbar = (): {
  open: boolean
  anchorEl: Element | Range | undefined
} => {
  const [editor] = useLexicalComposerContext()
  const [anchorEl, setAnchorEl] = useState<Element | Range>()
  const [open, setOpen] = useState(false)

  // 表示位置を計算
  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection()
    const nativeSelection = window.getSelection()
    const rootElement = editor.getRootElement()
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement)

      setAnchorEl(rangeRect)
    }
  }, [editor])
  useSelectionChangeListener(updateTextFormatFloatingToolbar)

  // InlineToolbarの表示非表示制御
  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection()
      const nativeSelection = window.getSelection()
      const rootElement = editor.getRootElement()

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setOpen(false)
        return
      }

      if (!$isRangeSelection(selection)) {
        return
      }

      setOpen(selection?.getTextContent() !== '')
    })
  }, [editor])

  useEffect(() => {
    document.addEventListener('selectionchange', updatePopup)
    return () => {
      document.removeEventListener('selectionchange', updatePopup)
    }
  }, [updatePopup])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup()
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          updatePopup()
        }
      }),
    )
  }, [editor, updatePopup])

  return useMemo(() => {
    return {
      open,
      anchorEl,
    }
  }, [anchorEl, open])
}
