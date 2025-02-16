// Adding server code to limit the number of requests from a single IP address

const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  // Limit is 15 minutes
  max: 100,
   // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

app.use('/api/', limiter);

