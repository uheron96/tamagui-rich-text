# 🧩 tamagui-rich-text

A lightweight and extensible rich text parser for React Native, React and Tamagui that allows you to define custom renderers for specific HTML-like tags.

---

## ✨ Features

- Parse custom tag strings like `<b>bold</b>` or `<link href="...">text</link>`, or even something made up like `<red>I am red!</red>`
- Fully typed with TypeScript
- Supports generic and custom Text components
- React-friendly: returns `React.ReactNode[]`
- Renderer-first: you define how each tag should render using plain React

---

## 📦 Installation

```bash
npm install tamagui-rich-text
# or
yarn add tamagui-rich-text
```

## 🔧 Usage

```bash
import { textParser, TagRendererProps } from 'tamagui-rich-text'
import { Text } from 'tamagui'
# or import { Text } from 'react-native'

# define and renderers you want, you can define name and how it should look like
const renderers: TagRenderers = {
  bold: ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>,
 # theme and color are something that is used by tamagui but you can also define it for your React components if you wish
  color: ({ children, attrs }) => <Text color={attrs.color}>{children}</Text>,
  theme: ({ children, attrs }) => <Text theme={attrs.theme}>{children}</Text>
  red: {{ children }} => <Text color='$color10' theme='red'>{children}</Text>
};

# Usage with your strings and your custom components
const input = 'here is some <bold>bold</bold> text. And here is some <red>red</red> text. I can also <theme theme="blue"><color color="$color7">nest if this is what I need</color></theme>.'

const parsed = textParser(input, renderers)

// Then render it:
return <Text>{parsed}</Text>
```
![Tamagui Rich Text](./assets/demo.png)

---

## ⚠️ Limitations

- Only supports simple tags (e.g. ```<tag tag="value">text</tag>```)
- No support for self-closing tags or nested attribute quotes
- No HTML sanitization — ensure your input is trusted if used with user-generated content
- Still in development
