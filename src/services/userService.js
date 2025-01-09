const User = require('../models/user');
const crypto = require('crypto')

/**
 * Creates a new user.
 * @param {Object} userData - The data of the user to create.
 * @returns {Promise<Object>} The created user.
 */
const createUser = async (userData) => {
    console.log(userData)
  return await User.create(userData);
};

/**
 * Retrieves all users, optionally filtered by role.
 * @param {string} [role] - The role to filter users by.
 * @returns {Promise<Array>} The list of users.
 */
const getAllUsers = async (role) => {
  const query = role ? { where: { role } } : {};
  return await User.findAll(query);
};


/**
 * Deletes a user by ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the user is not found.
 */
const deleteUser = async (id) => {
  const result = await User.destroy({ where: { id } });
  if (result === 0) throw new Error('User not found');
};

module.exports = { createUser, getAllUsers, deleteUser };