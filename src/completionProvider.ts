import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionItem, CompletionList, CompletionItemKind, Range } from 'vscode';
import { completionMetadata, SettingInfo, SectionInfo } from "./data";
import * as fuzz from 'fuzzaldrin-plus';
import { List, Map } from 'immutable';
import { ProviderBase } from "./providerBase";
import { Option } from 'option.ts';

export class SystemdCompletionItemProvider extends ProviderBase implements CompletionItemProvider {

    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): CompletionItem[] {

        let range = document.getWordRangeAtPosition(position);
        let prefix = range ? document.getText(range) : "";
        let lineStart = range ?
            document.getText(new Range(new Position(position.line, 0), range.start)) :
            document.getText(new Range(new Position(position.line, 0), position));

        if (lineStart.trim() == "[") {
            let filtered = (prefix == "") ?
                ProviderBase.allSections :
                fuzz.filter(ProviderBase.allSections, prefix, { "key": "name" });
            return filtered.map(section => {
                let item = new CompletionItem(section.name, CompletionItemKind.Module);
                item.documentation = section.doc;
                item.detail = "Section";
                return item;
            });
        }
        else if (lineStart.trim() == "") {
            return this.findContainingSection(document, position).map(containingSection => {
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
            }).getOrElse([]);
        }
        else {
            let settingMatch = lineStart.match(/\s*(\w+)\s*(?:=|=-)\s*/)
            return Option(settingMatch).flatMap(([_, settingName]) => {
                return this.findContainingSection(document, position).flatMap(settingsMap => {
                    return Option(settingsMap.get(settingName)).map(setting => {
                        return setting.choices.map(c => new CompletionItem(c, CompletionItemKind.Keyword));
                    });
                });
            }).getOrElse([]);
        }
    }
}