const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });

    if (user) {
        res.status(201).json({ 
            _id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            token: generateToken(user.id) 
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({ 
            _id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            token: generateToken(user.id) 
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { registerUser, loginUser };