# Axios API Practice

A small Node.js practice project: a reusable **Axios instance** (base URL, bearer token, custom headers, interceptors) talking to a tiny **Express** API that serves `users`, `products` and `orders`.

## Project structure

```
axios-api-practice/
├── api/
│   ├── users.json        # users data (JSON)
│   ├── products.json     # products data (JSON)
│   └── order.json        # orders data (JSON)
├── api.js               # Express server + routes
├── requestHandler.js    # Axios instance (baseURL, token, headers, interceptors)
├── index.js             # Imports the instance and sends requests
├── package.json
└── README.md
```

## Install the dependencies: 

```bash
npm install
```

Add these scripts to `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "server": "node api.js"
}
```

> The code uses CommonJS. Make sure `package.json` does **not** contain `"type": "module"`.

## Run

```bash
npm start        # starts the server and runs the demo requests
npm run server   # only starts the API server
```

## Configuration (optional env vars)

| Variable     | Default                     | Description               |
|--------------|-----------------------------|---------------------------|
| `PORT`       | `3000`                      | API server port           |
| `BASE_URL`   | `http://localhost:3000/api` | Axios base URL            |
| `AUTH_TOKEN` | `my-secret-token`           | Demo token sent by Axios  |

## Endpoints

| Method | Path            | Description   |
|--------|-----------------|---------------|
| GET    | `/api/users`    | List users    |
| GET    | `/api/products` | List products |
| GET    | `/api/orders`   | List orders   |

The server has no middleware and does **not** validate the token. The access token is only for demonstration: Axios sends it in the `Authorization` header and the server just logs it.

## How the Axios instance works

`requestHandler.js` creates one instance with `axios.create()`:

- `baseURL`, `timeout`, default headers (`Content-Type`, `Accept`, `X-Client-Name`)
- **Request interceptor**: adds `Authorization: Bearer <token>` and a unique `X-Request-Id`
- **Response interceptor**: logs errors in one place

Per-request headers can be added too:

```js
request.get('/orders', { headers: { 'X-Custom-Header': 'value' } });
```


