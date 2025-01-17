// require('dotenv').config();
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongodb = require('./db/connect');
// const port = process.env.PORT || 3000;
// const routes = require('./routes/index')
// const path = require('path');



// // Middleware to parse JSON
// app.use(bodyParser.json());

// // Serve static files from the "public" folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Default route to serve index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });




// // Middleware to parse JSON requests
// // app.use(bodyParser.json());

// // app.use('/', require('./routes'));
// // app
// //   .use(bodyParser.json())
// //   .use((req, res, next) => {
// //     res.setHeader('Access-Control-Allow-Origin', '*');
// //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
// //     next();
// //   })

  
// //   .use('/index', routes);

// //   app.use('/index', routes);
// //   // Serve static files from the public folder
// // app.use(express.static('public'));

// mongodb.initDb((err, mongodb) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on ${port}`);
//   }
// });

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongodb = require('./db/connect');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use routes for API endpoints
app.use('/index', routes);

// Initialize MongoDB and start the server
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on http://localhost:${port}`);
    });
  }
});
