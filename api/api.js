var Db = require('./dboperations');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
var expressIp = require('express-ip'); // Import the express-ip middleware

//for profpics
var fs = require('fs');
var path = require('path');


app.use(expressIp().getIpInfoMiddleware); // Use express-ip middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
  // logger.info('Request');
  const authHeader = request.headers['authentication'];
  // const authToken = '123'; 
  const authToken = '3856aed2-34ca-405b-9eb5-a7295b1b3291'; 

  if (!authHeader || authHeader !== authToken) {
    // return response.status(401).json({ error: 'Unauthorized' });
  }

  // Log the API request
  const logData = {
    req_method: request.method || null,
    req_path: request.path || null,
    req_query_parameters: request.query ? JSON.stringify(request.query) : null,
    req_request_body: request.body ? JSON.stringify(request.body) : null,
    req_user_agent: request.get('User-Agent') || null,
    req_remote_ip: request.ipInfo ? request.ipInfo.ip : null,
    req_user_id: request.headers['userID'],
  };

  Db.insertAPILog(logData)
    .then(() => {
      next();
    })
    .catch((error) => {
      console.error('Error logging API request:', error);
      next();
    });

  next();
});

router.route('/').get((request, response) => {
  response.json({ Status: 'Up' });
});

router.route('/getBFamMembers').get((request, response) => {
  const bfamParam = request.query.bfam;
  console.log(bfamParam);
  if (!bfamParam) {
    return response.status(400).json({ error: 'Missing parameters' });
  }

  Db.getBFamMembers(bfamParam) // Use bfamParam as a parameter in your database operation
    .then((data) => {
      // console.log(data);
      response.json(data);
    })
    .catch((error) => {
      console.error('Error in getFeed:', error);
      response.status(500).json({ error: 'Internal server error' });
    });
});

router.route('/getFeed').get((request, response) => {
  const bfamParam = request.query.bfam;
  if (!bfamParam) {
    return response.status(400).json({ error: 'Missing parameters' });
  }
  Db.getFeed(bfamParam) // Use bfamParam as a parameter in your database operation
    .then((data) => {
      // console.log(data);
      response.json(data);
    })
    .catch((error) => {
      console.error('Error in getFeed:', error);
      response.status(500).json({ error: 'Internal server error' });
    });
});

router.route('/getMyBFams').get((request, response) => {
  const userID = request.query.user;
  if (!userID) {
    return response.status(400).json({ error: 'Missing parameters' });
  }
  Db.getMyBFams(userID) // Use bfamParam as a parameter in your database operation
    .then((data) => {
      // console.log(data);
      response.json(data);
    })
    .catch((error) => {
      console.error('Error in getFeed:', error);
      response.status(500).json({ error: 'Internal server error' });
    });
});

router.route('/getUserInfo').get((request, response) => {
  const userID = request.query.user;
  if (!userID) {
    return response.status(400).json({ error: 'Missing parameters' });
  }
  Db.getUserInfo(userID) // Use bfamParam as a parameter in your database operation
    .then((data) => {
      // console.log(data);
      response.json(data);
    })
    .catch((error) => {
      console.error('Error in getFeed:', error);
      response.status(500).json({ error: 'Internal server error' });
    });
});

router.route('/getMemberInfo').get((request, response) => {
  console.log(request.query.user);
  const userID = request.query.user;
  if (!userID) {
    return response.status(400).json({ error: 'Missing parameters' });
  }
  Db.getMemberInfo(userID)
    .then((data) => {
      // console.log(data);
      response.json(data);
    })
    .catch((error) => {
      console.error('Error in getFeed:', error);
      response.status(500).json({ error: 'Internal server error' });
    });
});

//POSTS

router.route('/postNewBFam').post((request, response) => {
  const { userID, bfamName, isDefault } = request.body;

  if (!userID || !bfamName || isDefault === undefined) {
    return response.status(400).json({ error: 'Missing parameters' });
  }
  Db.postNewBFam(userID, bfamName, isDefault)
    .then((data) => {
      // console.log(data);
      response.json(data);
    })
    .catch((error) => {
      console.error('Error in getFeed:', error);
      response.status(500).json({ error: 'Internal server error' });
    });
});


var port = process.env.PORT || 8090;
app.listen(port);
console.log('bFam API running on: ' + port);
