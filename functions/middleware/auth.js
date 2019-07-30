const admin = require('firebase-admin');
require('dotenv').config();

const auth = async (req, res, next) => {
	try {
		if (req.headers.authorization) {
			const decodedToken = await admin
				.auth()
				.verifyIdToken(req.headers.authorization);
			res.locals.uid = decodedToken.uid;
			next();
			return;
		} else {
			res.status(403).json({ message: 'No authentication token' });
		}
	} catch (err) {
		console.log('error: ', err);
	}
};
module.exports = auth;
