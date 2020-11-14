const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        // Stores User Token
        const token = req.header("x-auth-token");

        // If user is not logged in/has no token, they cannot delete any account
        if(!token) {
            return res.status(401).json({ msg: 'No authentication token, authorisation denied' });
        }

        // If user is logged in/has verified token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if(!verified) return res.status(401).json({ msg: 'Token verification failed, authorisation denied' });

        req.user = verified.id;
        next();


    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = auth;
