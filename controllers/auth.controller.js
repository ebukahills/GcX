var router = require('express').Router()

var User = require('../models/User')
var mongoose = require('mongoose')
var passport = require('passport')

router.post('/login', login)
router.post('/signup', signup)
router.post('/forgot', forgot)

/*
* Auth Controller Functions
*/

function login(req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(401).json({
				status: false,
				message: 'Authentication Error',
				data: err
			})
		}
		if (!user) {
			return res.status(401).json({
				status: false,
				message: 'User Not Found'
			})
		}
		req.login(user, (err) => {
			if (err) {
				return res.status(401).json({
					status: false,
					message: 'Authentication Error',
					data: err
				})
			}
			return res.status(200).json({
				status: true,
				message: 'Authentication Successful',
				data: user
			})
		})
	})(req, res, next)
}

function signup(req, res, next) {
	var newUser = new User({
		username: req.body.username,
		name: req.body.name,
		phone: req.body.phone,
		country: req.body.country,
		transactions: []
	})
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			return res.status(401).json({
				status: false,
				message: 'Signup Error',
				data: err
			})
		}
		return login(req, res, next)
	})
}

// TODO: Forgot Password Reset Route
function forgot(req, res) {
	res.end()
}

module.exports = router