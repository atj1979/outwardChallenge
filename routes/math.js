var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
  res.render('math', { title: 'Express', requestCounter: res.get("requestCounter") })
});

module.exports = router;
