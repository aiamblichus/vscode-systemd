import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionItem, CompletionList, CompletionItemKind, Range } from 'vscode';
import { completionMetadata, SettingInfo, SectionInfo } from "./data";
import { List, Map } from 'immutable';

export class ProviderBase {
    protected allSections = completionMetadata.toArray();

    protected sectionsMap = Map<string, Map<string, SettingInfo>>(completionMetadata.map(s => {
        let settings = Map<string, SettingInfo>(s.settings.map(st => [st.name, st]));
        return [s.name, settings];
    }));

    protected findContainingSection(document: TextDocument, position: Position): Map<string, SettingInfo> {
        let line = position.line;
        while (--line >= 0) {
            let sectionMatch = document.lineAt(line).text.match(/^\s*\[(\w+)\]\s*$/);
            if (sectionMatch) {
                return this.sectionsMap.get(sectionMatch[1]);
            }
        }
    }

}