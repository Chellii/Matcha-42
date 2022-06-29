var express = require('express');
var router = express.Router();
const pool = require('../db');
const validation_form = require('./validation');
const bcrypt = require('bcryptjs');
const transporter = require('./email_sender');
const jwt = require('jsonwebtoken');
// user registration
router.post('/register', async (req, res) => {
	try {
		const valid = validation_form(req.body);
		if (valid.error) {
		//temporary
			res.send(valid.message);
			return;
		}
		const { 
			first_name,
			last_name,
			username,
			email,
			password } = req.body;
		const user_exists = await pool.query(
			"Select * From users WHERE username = $1 OR email = $2 limit 1",
			[username, email]);
		if (user_exists.rowCount != 0) {
			res.status(403).send("Username or email already in use");
			return;
		}
		const hashed_password = await bcrypt.hash(password,10);
		const new_user = await pool.query(
			"INSERT INTO users (first_name, last_name, username, email, password, active) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
			[first_name, last_name, username, email, hashed_password, '0']);
		const payload = {name : username};
		let token = jwt.sign(payload, "9145f6854bda2cd1875708993ac3e655a76d3c527aae7c67bc44fa29093cca9cb5166fbf8be378b742f2bab9861c2a56f594e17985cd3813d8a7009971c5a74d");
		console.log(token);
		let info = await transporter.sendMail({
			from: '"Matcha Team" <jalalium@hotmail.fr>',
			to: email,
			subject: "CONFIRM YOUR ACCOUNT",
			text: 'Mal ZZIN?',
			html: '<p>Click <a href="http://localhost:3000/users/verify?jwt=' + token + '">here</a> to activate your account</p>'
		});
		res.status(200).json(new_user.rows[0]);
	} catch (err) {
		console.error(err);
	}
});

// user login
router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const new_user = await pool.query(
			"Select * From users WHERE username = $1 limit 1",
			[username])
		if (new_user.rowCount != 1) {
			res.status(400).json("user does not exist");	
			return ;
		}
		const valid = await bcrypt.compare(password, new_user.rows[0].password);
		if (valid)
			res.status(200).json("SUCCESS");
		else
			res.status(400).json("FAIL");
	} catch (err) {
		console.error(err);
	}
});

//user verification
router.get('/verify', async (req,res) =>{
	let to_verify = req.url.replace(/^\/verify\?jwt=/,"");
	let payload = jwt.verify(to_verify,"9145f6854bda2cd1875708993ac3e655a76d3c527aae7c67bc44fa29093cca9cb5166fbf8be378b742f2bab9861c2a56f594e17985cd3813d8a7009971c5a74d");
	console.log(payload);
	const inactive_user = await pool.query(
		"Select * From users WHERE username = $1 limit 1",
		[payload.name]);
	console.log(inactive_user);
	if (inactive_user){
		await pool.query(
			"UPDATE users SET active = $1 WHERE username = $2",
			["1", payload.name]);
		res.status(200).json("user account activated");
	}
	else
		res.status(200).json("you did not activate your account, please register again");
});
module.exports = router;
