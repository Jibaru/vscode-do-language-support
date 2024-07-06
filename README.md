# Do Language Support

This Visual Studio Code extension provides language support for `.do` files with the specific format outlined below. The extension highlights keywords, strings, numbers, booleans, assignment operators, and punctuation in distinct colors.

## Features

- Syntax highlighting for:
  - Keywords: `do`, `let`
  - Strings: `"text"`
  - Numbers: `123`
  - Booleans: `true`, `false`
  - Assignment operators: `=`
  - Punctuation: `{}`, `;`

## Example

Here is an example of a `.do` file with the syntax highlighting provided by this extension:

```do
// comment
let {
    var1 = 1;
    var2 = "hello";
    var3 = true;
    var4 = false; // another comment
    var5 = env("VAR_1", "default");
}

do {
    method = "GET";
    url = "http://example.com/:id";
    params = {
        "id": "$var1"
    };
    headers = {
        "Content-Type": "application/json",
        "X-Message": "$var2"
    };
    body = `{
        "var1": $var1,
        "var2": "$var2",
        "var3": $var3,
        "var4": $var4
    }`;
}
```

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking the Extensions icon in the Sidebar or pressing Ctrl+Shift+X.
3. Search for "Do Language Support".
4. Click Install to install the extension.
5. Reload VS Code to activate the extension.

## Usage

1. Open any .do file in Visual Studio Code.
2. The syntax highlighting will automatically be applied.
