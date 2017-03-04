import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionItem, CompletionList, CompletionItemKind, Range, HoverProvider, Hover } from 'vscode';
import { completionMetadata, SettingInfo, SectionInfo } from "./data";
import * as fuzz from 'fuzzaldrin-plus';
import { List, Map } from 'immutable';
import { ProviderBase } from "./providerBase";
import { Option } from 'option.ts';

export class SystemdHoverProvider extends ProviderBase implements HoverProvider {
    provideHover(document: TextDocument, position: Position, token: CancellationToken): Hover {
        let range = document.getWordRangeAtPosition(position);
        let wordAtPoint = document.getText(range);
        let lineStart = document.getText(new Range(new Position(position.line, 0), range.start));
        if (lineStart.trim() == "") {
            let settingMatch = document.lineAt(position.line).text.match(/^\s*(\w+)\s*(?:=|=-)\s*/);
            return Option(settingMatch).flatMap(([_, settingName]) =>
                this.findContainingSection(document, position).flatMap(settingsMap =>
                    Option(settingsMap.get(settingName)).map(setting => new Hover(setting.doc))
                )
            ).getOrElse(null);
        }
    }
}