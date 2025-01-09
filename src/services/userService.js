const User = require('../models/user');

const createUser = async (userData) => {
    console.log(userData)
  return await User.create(userData);
};

const getAllUsers = async (role) => {
  const query = role ? { where: { role } } : {};
  return await User.findAll(query);
};

const deleteUser = async (id) => {
  const result = await User.destroy({ where: { id } });
  if (result === 0) throw new Error('User not found');
};

module.exports = { createUser, getAllUsers, deleteUser };