const { startServer } = require('./api');
const request = require('./requestHandler'); // import کردن instance

async function main() {
  const server = await startServer();

  try {
    
    const orders = await request.get('/users', {
      headers: { 'X-Custom-Header': 'orders-request' }, // header اختصاصی برای همین درخواست
    });
    console.log('Orders:', orders.data);
  } catch (err) {
    console.error('Request failed:', err.message);
  } finally {
    server.close();
  }
}

main();
