function createHTMLFromResponse(data) {
  let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Do execution</title>
        </head>
        <body>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                vertical-align: top;
            }
            .row-title {
              font-weight: bold;
            }
            .json-content {
              white-space: pre-wrap;
            }
        </style>
    `;

  if (data.error) {
    htmlContent += `<h1>Error</h1><p>${data.error}</p>`;
  } else {
    htmlContent += `<h2>Do Execution</h2>`;
    htmlContent += createTable("Variables", data.do_file.let.variables);
    htmlContent += createTable("Request", data.do_file.do);

    // Request information
    let body = null;
    if (data.response.body) {
      // is json:
      try {
        body = JSON.parse(data.response.body);
        body = JSON.stringify(body, null, 2);
      } catch (error) {
        body = data.response.body;
      }
    }

    htmlContent += createTable("Response", {
      code: data.response.status_code,
      body: body,
      headers: data.response.headers,
    });
  }

  htmlContent += `</body></html>`;

  return htmlContent;
}

function createTable(title, obj) {
  let table = `<table>
        <thead>
            <tr><th colspan="2">${title}</th></tr>
        </thead>
        <tbody>`;

  for (const [key, value] of Object.entries(obj)) {
    let content = value;
    let isJson = false;
    if (typeof value === "string") {
      try {
        content = JSON.parse(value);
        content = JSON.stringify(content, null, 2);
        isJson = true;
      } catch (error) {
        // is no json
      }
    }

    if (typeof value === "object") {
      content = JSON.stringify(value, null, 2);
      isJson = true;
    }

    table += `<tr>
        <td class="row-title">${key}</td>
        <td class="${isJson ? "json-content" : ""}">${content}</td>
      </tr>`;
  }

  table += `</tbody></table>`;
  return table;
}

module.exports = {
  createHTMLFromResponse,
};
