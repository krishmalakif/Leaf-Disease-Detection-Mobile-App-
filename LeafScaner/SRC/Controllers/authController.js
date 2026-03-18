import User from '../Models/userAuth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import env, { isEmailConfigured } from '../Config/env.js';
import { sendEmail } from '../Libs/emailService.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Name, email, and password are required' });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    const user = new User({ name, email, password: await bcrypt.hash(password, 10) });
    await user.save();
    res.status(201).json({ message: 'User successfully created' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User Not Registered' });

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const token = jwt.sign({ user: { id: user.id } }, env.jwtSecret, { expiresIn: 3600 });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const reset = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User Not Found');

    if (!(await bcrypt.compare(String(currentPassword), String(user.password)))) {
      return res.status(400).send('Current password is not correct');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).send('Password reset successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const sendPasswordResetEmail = async (req, res) => {
  try {
    if (!isEmailConfigured) {
      return res.status(503).json({ message: 'Password reset email is not configured on this deployment.' });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetCode = crypto.randomInt(100000, 999999).toString();
    user.resetCode = resetCode;
    user.resetCodeExpiration = Date.now() + 3600000;
    await user.save();

    await sendEmail(user.email, 'Password Reset Code', resetCode);
    res.status(200).json({ message: 'Password reset code sent' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetCode, newPassword } = req.body;
    const user = await User.findOne({ resetCode });

    if (!user) return res.status(400).json({ message: 'Invalid reset code' });
    if (Date.now() > user.resetCodeExpiration) {
      return res.status(400).json({ message: 'Reset code has expired' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetCode = undefined;
    user.resetCodeExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { register, login, reset, sendPasswordResetEmail, resetPassword };
