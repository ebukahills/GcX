var router = require('express').Router();

// Newsletter email Mongoose Model
var Email = require('../models/email');

router.post('/newsletter', function(req, res) {
  // Newsletter Logic Here
  var newContact = new Email({ email: req.body.email });
  newContact.save(function(err, contact) {
    if(err) {
      console.error(err);
      res.send(err);
    }
    res.status(200).json({
      status: 'OK'
    });
  })
})

module.exports = router;