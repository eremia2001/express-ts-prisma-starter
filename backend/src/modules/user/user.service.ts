import  userRepository  from './user.repository';

const userService = {
  getAllUsers: async () => userRepository.,

  registerUser: async (email: string, password: string) =>
    // z.B. Passworthash
    userRepository.create(email, password),
};

export default userService;
