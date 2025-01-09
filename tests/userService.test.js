const { createUser, getAllUsers, deleteUser } = require('../src/services/userService');
const User = require('../src/models/user');

jest.mock('../src/models/user');

describe('User Service', () => {
  test('createUser - should create a new user', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com', role: 'Admin' };
    User.create.mockResolvedValue(mockUser);

    const result = await createUser(mockUser);
    expect(result).toEqual(mockUser);
  });

  test('getAllUsers - should return all users', async () => {
    const mockUsers = [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Doe', email: 'jane@example.com', role: 'Viewer' }
    ];
    User.findAll.mockResolvedValue(mockUsers);

    const result = await getAllUsers();
    expect(result).toEqual(mockUsers);
  });

  test('deleteUser - should delete a user by ID', async () => {
    User.destroy.mockResolvedValue(1);

    await expect(deleteUser('123')).resolves.not.toThrow();
  });

  test('deleteUser - should throw an error if user not found', async () => {
    User.destroy.mockResolvedValue(0);

    await expect(deleteUser('123')).rejects.toThrow('User not found');
  });
});

