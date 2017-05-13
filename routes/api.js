var router = require('express').Router();

var authController = require('../controllers/auth.controller');

router.use('/auth', authController);

// Newsletter email Mongoose Model
var Email = require('../models/email');

router.post('/newsletter', function(req, res) {
  var newContact = new Email({
		email: req.body.email
	});
  newContact.save(function(err, contact) {
    if(err) {
      console.error(err);
      res.send(err);
    }
    res.status(200).json({
      status: 'OK'
    });
  });
});


module.exports = router;