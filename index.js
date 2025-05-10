'use strict';

const path = require('path');
const http = require('http');
const oas3Tools = require('oas3-tools');
const jwt = require('jsonwebtoken'); // For JWT
const express = require('express');

const serverPort = 8081;

// swaggerRouter configuration
const options = {
  routing: {
    controllers: path.join(__dirname, './controllers'),
  },
};

const expressAppConfig = oas3Tools.expressAppConfig(
  path.join(__dirname, 'api/openapi.yaml'),
  options
);

const app = expressAppConfig.getApp();

// Add body parsing
app.use(express.json());

// 2. Basic Auth
app.use('/basic-auth', (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic');
    return res.status(401).send('Basic Auth required');
  }
  const base64 = auth.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString('ascii');
  const [username, password] = decoded.split(':');
  if (username === 'admin' && password === '1234') {
    next();
  } else {
    res.status(403).send('Invalid Basic Auth credentials');
  }
});

// 3. API Key Auth (x-api-key header)
app.use('/api-key', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'my-secret-key') {
    next();
  } else {
    res.status(403).send('Forbidden: Invalid API Key');
  }
});

// 4.Bearer Token / JWT Auth
app.use('/jwt', (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'jwt_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // add user data to request
    next();
  });
});

// 5. OAuth 2.0 Simulation (simple bearer check)
app.use('/oauth', (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token === 'valid-oauth-token') {
    next();
  } else {
    res.status(401).send('Invalid OAuth Token');
  }
});

http.createServer(app).listen(serverPort, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
