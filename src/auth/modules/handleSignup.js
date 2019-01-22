'use strict';

const User = require('../models/users-model.js');


/**
 * @module handleSignup.js
 *
 * Handles the User Signup, sends the user to the auth middleware to aquire a token
 * 
 * @param {object} req Express request object
 * @param {object} res Express request object
 * @param {function} next Express middleware function
 */
module.exports = function(req, res, next){
  console.log('inside handleSingup');
  let user = new User(req.body);
  user.save()
    .then((user) => {
      console.log(user);
      User.findOne({_id: user._id})
        .then(user => {
          req.token = user.generateToken();
          req.user = user;
          res.set('token', req.token);
          res.cookie('auth', req.token);
          res.send(req.token);
        });
    })
    .catch(next);
};