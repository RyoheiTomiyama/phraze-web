import { EditorThemeClasses } from 'lexical'

export const theme = {
  quote: 'border-l-4 border-l-border pl-3',
  heading: {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-bold',
    h4: 'text-lg font-bold',
    h5: 'font-bold',
  },
  list: {
    nested: {
      listitem: 'list-none',
    },
    ol: 'pl-4 list-decimal',
    ul: 'pl-4 list-disc',
    listitem: '',
  },
  // image: 'editor-image',
  link: 'underline text-accent-foreground cursor-pointer',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: '[text-decoration:underline_line-through]',
  },
} satisfies EditorThemeClasses
