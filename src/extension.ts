'use strict';

import * as vscode from 'vscode';
import { SystemdCompletionItemProvider } from "./completionProvider";
import { SystemdHoverProvider } from "./hoverProvider";

export function activate(context: vscode.ExtensionContext) {

    let completionProvider = new SystemdCompletionItemProvider();
    let hoverProvider = new SystemdHoverProvider();

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(['systemd'], completionProvider, "*"),
        vscode.languages.registerHoverProvider(['systemd'], hoverProvider)
    )
}

export function deactivate() {
}