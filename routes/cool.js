var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/users', function(req, res, next) {
  res.render('cool', { title: "You're so cool!" });
});

module.exports = router;
