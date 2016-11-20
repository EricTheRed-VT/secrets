const express = require('express');
const router = express.Router();
module.exports = router;

const models = require('../db/models');
const Secret = models.Secret;
const Comment = models.Comment;

router.get('/', function (req, res, next) {
	Secret.findAll()
	.then(function(arrayOfSecrets){
		res.render('index', {secrets: arrayOfSecrets});
	})
	.catch(next);
});

router.get('/add', function (req, res, next) {
	res.render('add');
});

router.get('/:secretId', function (req, res, next) {
	let thisSecret = Secret.findById(req.params.secretId);

	let itsComments = Comment.findAll({where: {secretId: req.params.secretId}});

	Promise.all([thisSecret, itsComments])
	.then(function([thisSecret, itsComments]){
		thisSecret.comments = itsComments;
		res.render('secret', {secret: thisSecret});
	})
	.catch(function(){
		res.redirect('/secrets/add')
	})
});

router.post('/', function (req, res, next) {
	Secret.create({text: req.body.text})
	.then(function(){
		res.redirect('/secrets');
	})
	.catch(next);
});

router.use('/:secretId/comments', require('./comments-subrouter'));