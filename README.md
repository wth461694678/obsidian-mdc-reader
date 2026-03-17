# MDC File Support

An [Obsidian](https://obsidian.md) plugin that enables browsing, viewing, and editing `.mdc` files just like regular Markdown files.

## What are `.mdc` files?

`.mdc` files are Markdown-based configuration files commonly used by AI coding tools like [Cursor](https://cursor.com) for defining project rules and conventions. They follow standard Markdown syntax with YAML frontmatter.

## Features

- **Native `.mdc` support** — Open and edit `.mdc` files directly in Obsidian with full Markdown rendering (reading view, editing view, and live preview).
- **File explorer integration** — `.mdc` files appear in the file explorer and can be browsed like any other note.
- **Create new `.mdc` files** — Quickly create new `.mdc` files with a default template via the command palette.
- **Convert between `.md` and `.mdc`** — Easily convert files between `.md` and `.mdc` formats using commands or right-click context menu.

## Installation

### From Community Plugins (Recommended)

1. Open **Settings** → **Community Plugins** in Obsidian.
2. Click **Browse** and search for **MDC File Support**.
3. Click **Install**, then **Enable**.

### Manual Installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/wth461694678/obsidian-mdc-reader/releases).
2. Create a folder named `mdc-reader` in your vault's `.obsidian/plugins/` directory.
3. Copy the downloaded files into the `mdc-reader` folder.
4. Restart Obsidian and enable the plugin in **Settings** → **Community Plugins**.

## Usage

Once the plugin is enabled, `.mdc` files in your vault are automatically recognized and rendered as Markdown.

### Commands

Open the command palette (`Ctrl/Cmd + P`) and search for:

| Command | Description |
|---|---|
| **MDC File Support: Create new .mdc file** | Create a new `.mdc` file with a default frontmatter template. |
| **MDC File Support: Convert current .md file to .mdc** | Rename the active `.md` file to `.mdc`. |
| **MDC File Support: Convert current .mdc file to .md** | Rename the active `.mdc` file to `.md`. |

### Context Menu

Right-click any `.md` or `.mdc` file in the file explorer to see conversion options.

## License

[MIT](LICENSE)
