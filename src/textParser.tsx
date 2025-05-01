import React from 'react'

export type TagRendererProps = {
  tag: string
  attrs: Record<string, string>
  children: React.ReactNode[]
}

export type TagRenderers = Record<
  string,
  (props: TagRendererProps) => React.ReactNode
>

export const textParser = (
  input: string,
  renderers: TagRenderers
): React.ReactNode[] => {
  const output: React.ReactNode[] = []
  const tagRegex = /<(bold|color|theme|link)(?:\s+([^>]*?))?>(.*?)<\/\1>/g
  let lastIndex = 0
  let match

  while ((match = tagRegex.exec(input)) !== null) {
    const [fullMatch, tagType, attrString, innerText] = match

    if (match.index > lastIndex) {
      output.push(input.slice(lastIndex, match.index))
    }

    const parsedChildren = textParser(innerText, renderers)
    const attrs: Record<string, string> = {}

    attrString?.replace(/(\w+)=["']([^"']*)["']/g, (_, key, value) => {
      attrs[key] = value
      return ''
    })

    const renderer = renderers[tagType]
    if (renderer) {
      output.push(
        renderer({
          tag: tagType,
          attrs,
          children: parsedChildren,
        })
      )
    } else {
      // fallback: render raw text
      output.push(fullMatch)
    }

    lastIndex = match.index + fullMatch.length
  }

  if (lastIndex < input.length) {
    output.push(input.slice(lastIndex))
  }

  return output
}
