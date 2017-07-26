import * as console from 'console';
import * as vscode from 'vscode';


export default class DefinitionProvider {
    provideDefinition(
        document:vscode.TextDocument,
		position:vscode.Position,
		token: vscode.CancellationToken,
    ): Promise<vscode.Location | vscode.Location[]> {
        const wordRange = document.getWordRangeAtPosition(position);
        const res = document.lineAt(position.line).text.match(/{% ?(?:extends|include) ["'](.*)["'] ?%}/);
        if (res.length > 1) {
            const uri = vscode.Uri.file(vscode.workspace.rootPath + "/templates/" + res[1]);
            const loc = new vscode.Location(uri, new vscode.Position(0,0));
            return Promise.resolve(loc);
        } else {
            return Promise.reject("Found nothing.");
        }
        
    }
}