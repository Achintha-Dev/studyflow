import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
    let token;

    // check is header exist and start with 'Bearer' token
    if (req.headers.authorization && req.headers.authorization.startWith('Bearer')) {
        try {
            // Get token from header (split "Bearer <token>")
            token = req.headers.authorization.split(' ')[1]; 

            // Verify the token using your secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user ID to the request object
            req.user = { id: decoded.id };
            next(); // Move to the controller
            
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
}