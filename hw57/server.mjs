import http from 'http';
import querystring from 'querystring';

const PORT = process.env.PORT || 3000;

const sanitizeXSS = (str) => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const generateHTML = (title, header, text) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>
</head>
<body>
<h1>${header}</h1>
<p>${text}</p>
</body>
</html>`;
};

const sendResponse = (res, statusCode, htmlContent) => {
  const body = Buffer.from(htmlContent, 'utf-8');
  res.writeHead(statusCode, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': body.length,
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
};

const server = http.createServer((req, res) => {
  try {
    const baseURL = `http://${req.headers.host || 'localhost'}`;
    const parsedUrl = new URL(req.url, baseURL);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    if (method === 'GET') {
      if (pathname === '/') {
        sendResponse(res, 200, generateHTML('Home', 'Home', 'Welcome to the Home Page.'));
      } else if (pathname === '/about') {
        sendResponse(res, 200, generateHTML('About', 'About', 'Learn more about us.'));
      } else if (pathname === '/contact') {
        sendResponse(res, 200, generateHTML('Contact', 'Contact', 'Get in touch.'));
      } else {
        sendResponse(res, 404, generateHTML('404 Not Found', '404 Not Found', 'Page Not Found'));
      }
    } else if (method === 'POST' && pathname === '/submit') {
      let body = '';
      let isTooLarge = false;

      req.on('data', (chunk) => {
        body += chunk.toString();
        if (Buffer.byteLength(body, 'utf-8') > 1024 * 1024) {
          isTooLarge = true;
          req.destroy();
        }
      });

      req.on('end', () => {
        if (isTooLarge) {
          sendResponse(res, 413, generateHTML('413 Payload Too Large', '413 Payload Too Large', 'Payload Too Large'));
          return;
        }

        const parsedData = querystring.parse(body);
        const name = parsedData.name ? parsedData.name.trim() : '';
        const email = parsedData.email ? parsedData.email.trim() : '';

        if (!name || !email) {
          sendResponse(res, 400, generateHTML('400 Bad Request', '400 Bad Request', 'Invalid form data'));
          return;
        }

        const safeName = sanitizeXSS(name);
        const safeEmail = sanitizeXSS(email);

        const successHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Form Submitted</title>
</head>
<body>
<h1>Form Submitted</h1>
<p>Name: ${safeName}</p>
<p>Email: ${safeEmail}</p>
</body>
</html>`;

        sendResponse(res, 200, successHTML);
      });
    } else {
      sendResponse(res, 404, generateHTML('404 Not Found', '404 Not Found', 'Page Not Found'));
    }
  } catch (error) {
    sendResponse(res, 500, generateHTML('500 Server Error', '500 Server Error', 'Server Error'));
  }
});

server.listen(PORT, () => {
  console.log(`[Сервер] Запущено успішно на порту ${PORT}`);
});
