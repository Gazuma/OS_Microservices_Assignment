const User = require('../models/user');
const crypto = require('crypto');

// Secret key for encryption (ensure it's exactly 32 bytes long)
const ENCRYPTION_KEY = crypto.createHash('sha256').update('your-secret-key').digest('hex').slice(0, 32); // SHA-256 to get a 32-byte key
const IV_LENGTH = 16; // Length of initialization vector (IV) used in AES encryption

/**
 * Encrypts a given text.
 * @param {string} text - The text to encrypt.
 * @returns {string} The encrypted text.
 */
const encryptText = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'utf-8'), iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

/**
 * Decrypts a given encrypted text.
 * @param {string} text - The encrypted text to decrypt.
 * @returns {string} The decrypted text.
 */
const decryptText = (text) => {
  const [ivHex, encrypted] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'utf-8'), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};


/**
 * Encrypts all attributes of a user data object except for the 'role' attribute.
 * @param {Object} userData - The user data to encrypt.
 * @returns {Object} The encrypted user data.
 */
const encryptUser = (userData) => {
  const encryptedUser = {};
  for (const key in userData) {
    if (userData.hasOwnProperty(key)) {
      if (key == 'role') {
        encryptedUser[key] = userData[key];
      }
      else {
        encryptedUser[key] = encryptText(userData[key].toString());
      }
    }
  }
  return encryptedUser;
};


/**
 * Decrypts all attributes of a user data object except for the 'role' attribute.
 * @param {Object} userData - The user data to decrypt.
 * @returns {Object} The decrypted user data.
 */
const decryptUser = (userData) => {
  const decryptedUser = {};
  for (const key in userData) {
    if (key == 'role') {
      continue;
    }
    if (userData.hasOwnProperty(key)) {
      decryptedUser[key] = decryptText(userData[key]);
    }
  }
  return decryptedUser;
};


/**
 * Creates a new user.
 * @param {Object} userData - The data of the user to create.
 * @returns {Promise<Object>} The created user.
 */
const createUser = async (userData) => {
  return await User.create(encryptUser(userData));
};

/**
 * Retrieves all users, optionally filtered by role.
 * @param {string} [role] - The role to filter users by.
 * @returns {Promise<Array>} The list of users.
 */
const getAllUsers = async (role) => {
  const query = role ? { where: { role } } : {};
  const users = await User.findAll(query);
  for (let i = 0; i < users.length; i++) {
    users[i].name = decryptText(users[i].name);
    users[i].email = decryptText(users[i].email);
  }
  return users;
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

/**
 * Splits a given data string into chunks of specified size.
 * @param {string} data - The data string to split.
 * @param {number} chunkSize - The size of each chunk.
 * @returns {Array<string>} An array of data chunks.
 */
function splitData(data, chunkSize) {
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Encrypts user data using RSA encryption.
 * @param {Array<Object>} users - The list of users to encrypt.
 * @param {string} publicKey - The RSA public key for encryption.
 * @returns {Array<string>} The list of RSA encrypted user data chunks in base64 format.
 */
const rsaEncryptUser = (users, publicKey) => {
  let responseString = "["
  for (i = 0; i < users.length; i++) {
    responseString += (JSON.stringify(users[i])) + ","
  }
  responseString = responseString.slice(0, -1);
  responseString += "]"
  const splittedData = splitData(responseString, 210);
  console.log(splittedData)
  const rsaSplittedData = [];
  for (i = 0; i < splittedData.length; i++) {
    rsaSplittedData.push(crypto.publicEncrypt(publicKey, Buffer.from(splittedData[i])).toString('base64'));
  }
  return (rsaSplittedData);
}



module.exports = { createUser, getAllUsers, deleteUser, encryptUser, decryptUser, encryptText, decryptText, splitData, rsaEncryptUser };