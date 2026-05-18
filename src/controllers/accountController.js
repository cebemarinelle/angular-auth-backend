const bcrypt = require('bcryptjs');
const User = require('../models/User');

const getAccounts = async (req, res) => {
  try {
    const accounts = await User.getAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAccountById = async (req, res) => {
  try {
    const account = await User.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createAccount = async (req, res) => {
  try {
    const { title, firstName, lastName, email, password, role } = req.body;
    
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      title, firstName, lastName, email,
      password: hashedPassword,
      role: role || 'User',
      verificationToken: null,
      isVerified: true
    });

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { title, firstName, lastName, email, role, password } = req.body;
    const updateData = { title, firstName, lastName, email, role };
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await User.updateUser(req.params.id, updateData);
    
    const updatedUser = await User.findById(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount
};