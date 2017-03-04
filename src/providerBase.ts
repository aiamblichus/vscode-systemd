import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionItem, CompletionList, CompletionItemKind } from 'vscode';
import { completionMetadata, SettingInfo, SectionInfo } from "./data";
import { List, Map, Range } from 'immutable';
import { Option, None } from 'option.ts';

export class ProviderBase {

    protected static allSections = completionMetadata.toArray();

    protected static sectionsMap = Map<string, Map<string, SettingInfo>>(completionMetadata.map(s => {
        let settings = Map<string, SettingInfo>(s.settings.map(st => [st.name, st]));
        return [s.name, settings];
    }));

    protected findContainingSection(document: TextDocument, position: Position): Option<Map<string, SettingInfo>> {
        return Range(position.line - 1, 0).toSeq()
            .take(100)
            .map(line => {
                let sectionMatch = document.lineAt(line).text.match(/^\s*\[(\w+)\]\s*$/)
                return Option(sectionMatch).map(([_, sectionName]) => {
                    return ProviderBase.sectionsMap.get(sectionName);
                });
            })
            .find(result => result.isDefined(), null, None);
    }

}