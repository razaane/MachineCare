const User = require('../models/User');
const { adminEmail, adminPassword } = require('../config/env');

async function seedAdmin() {
  const existingUser = await User.findOne({});

  if (existingUser) {
    console.log('User already exists, skipping seed');
    return;
  }

  await User.create({
    email: adminEmail,
    password: adminPassword,
  });

  console.log(`Default admin created: ${adminEmail}`);
}

module.exports = seedAdmin;