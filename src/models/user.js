const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Editor', 'Viewer'),
    allowNull: false
  }
});

sequelize.sync({ alter: true }) // Will create the table if it does not exist
  .then(() => {
    console.log('Database synced successfully!');
  })
  .catch(err => {
    console.error('Error syncing the database:', err);
  });

module.exports = User;