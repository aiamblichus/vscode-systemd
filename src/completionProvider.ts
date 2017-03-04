import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionItem, CompletionList, CompletionItemKind, Range } from 'vscode';
import { completionMetadata, SettingInfo, SectionInfo } from "./data";
import * as fuzz from 'fuzzaldrin-plus';
import { List, Map } from 'immutable';
import { ProviderBase } from "./providerBase";

export class SystemdCompletionItemProvider extends ProviderBase implements CompletionItemProvider {

    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): CompletionItem[] {

        let range = document.getWordRangeAtPosition(position);
        let prefix = range ? document.getText(range) : "";
        let lineStart = range ?
            document.getText(new Range(new Position(position.line, 0), range.start)) :
            document.getText(new Range(new Position(position.line, 0), position));

        if (lineStart.trim() == "[") {
            let filtered = (prefix == "") ?
                this.allSections :
                fuzz.filter(this.allSections, prefix, { "key": "name" });
            return filtered.map(section => {
                let item = new CompletionItem(section.name, CompletionItemKind.Module);
                item.documentation = section.doc;
                item.detail = "Section";
                return item;
            });
        }
        else if (lineStart.trim() == "") {
            let containingSection = this.findContainingSection(document, position);
            let filtered = (prefix == "") ?
                containingSection.valueSeq().toArray() :
                fuzz.filter(containingSection.valueSeq().toArray(), prefix, { "key": "name" });
            return filtered.map(setting => {
                let item = new CompletionItem(setting.name, CompletionItemKind.Property);
                item.documentation = setting.doc;
                item.detail = "Setting";
                item.insertText = setting.name + "=";
                return item;
            });
        }
        else {
            let settingMatch = lineStart.match(/\s*(\w+)\s*(?:=|=-)\s*/)
            if (settingMatch) {
                let settingsMap = this.findContainingSection(document, position);
                if (settingsMap) {
                    let setting = settingsMap.get(settingMatch[1]);
                    if (setting) {
                        return setting.choices.map(c => new CompletionItem(c, CompletionItemKind.Keyword));
                    }
                }
            }
            return [];
        }
    }
}