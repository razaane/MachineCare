const User = require('../models/User');

async function findByEmail(email) {
  return User.findOne({ email });
}

async function create(userData) {
  const user = new User(userData);
  return user.save();
}

async function updateById(id, updates) {
  return User.findByIdAndUpdate(id, updates, { new: true });
}

module.exports = { findByEmail, create, updateById };