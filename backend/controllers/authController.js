const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');


dotenv.config();



const signToken = (user) => {
return jwt.sign(
{ id: user._id, role: user.role, name:user.name },
process.env.JWT_SECRET,
{ expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
);
};

exports.register = async (req, res) => {
try {
const { name, email, password, role } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Please provide name, email and password' });

const existinguname = await User.findOne({ name });
if (existinguname) return res.status(400).json({ message: 'Name already exists' });
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'Email already exists' });

const hashPassword=await bcrypt.hash(password,10);
const user = await User.create({ name, email, password:hashPassword, role });
const token = signToken(user);


res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};

exports.login = async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });


const user = await User.findOne({ email });
if (!user || !(await bcrypt.compare(password,user.password))) return res.status(400).json({ message: 'Invalid credentials' });


const token = signToken(user);
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
};
};

exports.me = async (req, res) => {
try {
const user = await User.findById(req.user.id).select('-password');
res.json({ user });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};