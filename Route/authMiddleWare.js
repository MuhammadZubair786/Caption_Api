const jwt = require('jsonwebtoken');
const seckret_key = process.env.seckret_key;

exports.authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({
                message: "Unauthorized - Token not provided",
            });
        }

        jwt.verify(authorization, seckret_key, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }

            req.userId = decoded.userId;
            // console.log(req.userId);

            // const token = jwt.sign({ userId: req.userId}, seckret_key, { expiresIn: '1h' });
            // res.set("AuthToken", authorization);
            return next();

        });


    } catch (err) {
        console.error('Error in authMiddleware:', err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};
