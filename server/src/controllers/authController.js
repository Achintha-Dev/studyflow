import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function registerUser(req, res) {
    try {
        const {name, email, password} = req.body;
        // check if user already exist
        const userExist = await User.findOne({ email });
        if(userExist) return res.status(400).json({ message: 'This user already registered using this email.' });

        // Create the user (Password hashing is handled in the User Model)
        const user = await User.create({ name, email, password });
        return res.status(201).json({
            message: 'Registration Successful.',
            user: { id: user._id, name: user.name, email: user.email }
        });
        
    } catch (error) {
        console.log("Error occurred:", error);
        return res.status(500).json({message: 'Server Error!'});
    }
}

export async function loginUser(rea, res) {
    try {
        const {email, password} = req.body;
        // find user from email
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'Invalid Email!' });
        
        // compare provided password from hashed password in db
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid Password!' });
        
        // 3. Create and send JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
        
    } catch (error) {
        console.log("Error occurred:", error);
        return res.status(500).json({message: 'Server Error!'});
    }
}