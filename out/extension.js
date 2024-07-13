const vscode = require("vscode");
const { exec } = require("child_process");
const { createHTMLFromResponse } = require("./render.js");

function activate(context) {
  // Command to set the path to the do executable
  let setExecutablePath = vscode.commands.registerCommand(
    "extension.setDoExecutablePath",
    async function () {
      const executablePath = await vscode.window.showInputBox({
        placeHolder: "Enter the path to the 'do' executable",
      });

      if (executablePath) {
        await vscode.workspace
          .getConfiguration()
          .update(
            "doLanguageSyntaxHighlighting.doExecutablePath",
            executablePath,
            vscode.ConfigurationTarget.Global
          );
        vscode.window.showInformationMessage(
          `Path to 'do' executable set to: ${executablePath}`
        );
      }
    }
  );

  // Command to set the path to the environment variables file
  let setEnvPath = vscode.commands.registerCommand(
    "extension.setDoEnvironmentVariablesPath",
    async function () {
      const envPath = await vscode.window.showInputBox({
        placeHolder: "Enter the path to the environment variables file",
      });

      if (envPath) {
        await vscode.workspace
          .getConfiguration()
          .update(
            "doLanguageSyntaxHighlighting.environmentVariablesPath",
            envPath,
            vscode.ConfigurationTarget.Global
          );
        vscode.window.showInformationMessage(
          `Path to environment variables file set to: ${envPath}`
        );
      }
    }
  );

  // Command to run the .do file
  let runDoFile = vscode.commands.registerCommand(
    "extension.runDoFile",
    async function () {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const filePath = document.fileName;
        const panel = vscode.window.createWebviewPanel(
          "doOutput",
          "Do: " + filePath,
          vscode.ViewColumn.Beside,
          {}
        );
        const statusBarMessage = vscode.window.setStatusBarMessage(
          "Running: " + filePath
        );

        const doExecutablePath = vscode.workspace
          .getConfiguration()
          .get("doLanguageSyntaxHighlighting.doExecutablePath");
        const envPath = vscode.workspace
          .getConfiguration()
          .get("doLanguageSyntaxHighlighting.environmentVariablesPath");

        if (!doExecutablePath) {
          vscode.window.showErrorMessage(
            "Path to 'do' executable is not set. Please set it using the command palette."
          );
          statusBarMessage.dispose();
          return;
        }

        let doCommand = `${doExecutablePath} -f ${filePath}`;

        if (envPath) {
          doCommand += ` -e ${envPath}`;
        }

        exec(doCommand, async (error, stdout, stderr) => {
          const jsonData = JSON.parse(stdout);
          panel.webview.html = createHTMLFromResponse(jsonData);
          statusBarMessage.dispose();
        });
      }
    }
  );

  context.subscriptions.push(setEnvPath);
  context.subscriptions.push(setExecutablePath);
  context.subscriptions.push(runDoFile);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
