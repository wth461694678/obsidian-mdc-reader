import {
	Plugin,
	TFile,
	Notice,
} from "obsidian";

// MDC extension constant
const MDC_EXTENSION = "mdc";

export default class MDCReaderPlugin extends Plugin {
	onload() {

		// Register the .mdc extension so Obsidian treats it as markdown
		this.registerExtensions([MDC_EXTENSION], "markdown");

		// Add a ribbon icon for quick access info
		this.addRibbonIcon("file-text", "MDC file support", () => {
			new Notice("MDC file support is active. You can now open .mdc files as Markdown.");
		});

		// Add command to create a new .mdc file
		this.addCommand({
			id: "create-new-mdc-file",
			name: "Create new .mdc file",
			callback: async () => {
				await this.createNewMdcFile();
			},
		});

		// Add command to convert current .md file to .mdc
		this.addCommand({
			id: "convert-md-to-mdc",
			name: "Convert current .md file to .mdc",
			checkCallback: (checking: boolean) => {
				const activeFile = this.app.workspace.getActiveFile();
				if (activeFile && activeFile.extension === "md") {
					if (!checking) {
						void this.convertFile(activeFile, "md", "mdc");
					}
					return true;
				}
				return false;
			},
		});

		// Add command to convert current .mdc file to .md
		this.addCommand({
			id: "convert-mdc-to-md",
			name: "Convert current .mdc file to .md",
			checkCallback: (checking: boolean) => {
				const activeFile = this.app.workspace.getActiveFile();
				if (activeFile && activeFile.extension === "mdc") {
					if (!checking) {
						void this.convertFile(activeFile, "mdc", "md");
					}
					return true;
				}
				return false;
			},
		});

		// Register context menu items for .mdc files in file explorer
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				if (file instanceof TFile && file.extension === "mdc") {
					menu.addItem((item) => {
						item
							.setTitle("Convert to .md")
							.setIcon("file-text")
							.onClick(async () => {
								await this.convertFile(file, "mdc", "md");
							});
					});
				}
				if (file instanceof TFile && file.extension === "md") {
					menu.addItem((item) => {
						item
							.setTitle("Convert to .mdc")
							.setIcon("file-text")
							.onClick(async () => {
								await this.convertFile(file, "md", "mdc");
							});
					});
				}
			})
		);

	}

	onunload() {
		// cleanup
	}

	/**
	 * Create a new .mdc file with a default template
	 */
	async createNewMdcFile(): Promise<void> {
		const defaultContent = `---
description: 
globs: 
alwaysApply: false
---

# New MDC Rule

`;
		try {
			// Determine the folder to create the file in
			const activeFile = this.app.workspace.getActiveFile();
			let folderPath = "";
			if (activeFile) {
				const parts = activeFile.path.split("/");
				parts.pop();
				folderPath = parts.join("/");
			}

			// Generate a unique filename
			let fileName = "Untitled.mdc";
			let counter = 1;
			let fullPath = folderPath ? `${folderPath}/${fileName}` : fileName;

			while (this.app.vault.getAbstractFileByPath(fullPath)) {
				fileName = `Untitled ${counter}.mdc`;
				fullPath = folderPath ? `${folderPath}/${fileName}` : fileName;
				counter++;
			}

			const file = await this.app.vault.create(fullPath, defaultContent);
			// Open the newly created file
			const leaf = this.app.workspace.getLeaf(false);
			await leaf.openFile(file);
			new Notice(`Created ${fileName}`);
		} catch (error) {
			console.error("Failed to create .mdc file:", error);
			new Notice("Failed to create .mdc file.");
		}
	}

	/**
	 * Convert a file from one extension to another by renaming it
	 */
	async convertFile(file: TFile, fromExt: string, toExt: string): Promise<void> {
		try {
			const newPath = file.path.replace(new RegExp(`\\.${fromExt}$`), `.${toExt}`);

			// Check if target file already exists
			if (this.app.vault.getAbstractFileByPath(newPath)) {
				new Notice(`A file with the name ${newPath} already exists.`);
				return;
			}

			await this.app.fileManager.renameFile(file, newPath);
			new Notice(`Converted ${file.name} to .${toExt}`);
		} catch (error) {
			console.error(`Failed to convert file:`, error);
			new Notice(`Failed to convert file to .${toExt}`);
		}
	}
}
