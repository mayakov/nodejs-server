var express    = require('express');
var request    = require('request');
var querystring= require('querystring');
var app        = express();
var bodyParser = require('body-parser');
var port       = process.env.PORT || 9003;
var router     = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', router);

router.get('/api', function(req, res) {
    res.json({ message: 'Hello' });
});

router.get('/authInsta', function(req, res) {
  var postData={
    'client_id' : '70f82040cef74744a844b2e05ab178ec' ,
    'client_secret' : '882a978ca05b4bb58222cf3b171937e9' ,
    'grant_type' : 'authorization_code' ,
    'redirect_uri' : 'http://10.1.7.17:9003/authInsta' ,
    'code' : req.query.code
  };
  request.post(
    {
      uri:"https://api.instagram.com/oauth/access_token",
      headers:{'content-type': 'application/x-www-form-urlencoded'},
      body: querystring.stringify(postData)
    },
    function(err,response,body){
      console.log(body);
      console.log(res.statusCode);
      res.json({ message: JSON.stringify(body) });
    }
  );
});

app.listen(port);

