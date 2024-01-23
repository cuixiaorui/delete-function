# [Delete-Function](https://marketplace.visualstudio.com/items?itemName=cuixiaorui.delete-function)

quick delete function that support javascript、typescript and rust

## Installation

- Click on the Extensions icon (usually on the left-hand side of your editor).
- Search for "Delete Function".
- Find the extension in the list and click the install button.

## Usage

1. Through the Command Palette.

![](https://images-1252602850.cos.ap-beijing.myqcloud.com/20221013222755.png)

2. Through the shortcut

- default shortcut
  - mac "cmd + r + f"
  - win "ctrl + r + f"

## With [Vim](https://github.com/VSCodeVim/Vim)

```json
// settings.json
 "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": [
        "<space>",
        "d",
        "f"
      ],
      "commands": [
        "delete-function.deleteFunction"
      ]
    }
 ]
```

you can config follow above

replace 'before' to you want
