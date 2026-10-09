const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

// خواندن دیتا از فایل‌های txt (محتوا JSON است)
const readData = (fileName) => {
  const filePath = path.join(__dirname, 'api', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// فقط برای نمایش: توکنی که آکسیوس فرستاده را لاگ می‌کنیم (اعتبارسنجی نمی‌شود)
const logToken = (req) => {
  console.log(`${req.method} ${req.originalUrl} | token: ${req.headers.authorization || 'none'}`);
};

app.get('/api/users', (req, res) => {
  logToken(req);
  res.json(readData('users.json'));
});

app.get('/api/products', (req, res) => {
  logToken(req);
  res.json(readData('products.json'));
});

app.get('/api/orders', (req, res) => {
  logToken(req);
  res.json(readData('order.json'));
});

const startServer = () =>
  new Promise((resolve) => {
    const server = app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });

// اگر مستقیم اجرا شد (node api.js) سرور بالا بیاید
if (require.main === module) startServer();

module.exports = { app, startServer };
