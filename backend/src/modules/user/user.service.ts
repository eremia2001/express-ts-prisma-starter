import userRepository from './user.repository';

const userService = {
  getAllUsers: async () => userRepository.getUsers(),

  registerUser: async (email: string, password: string) => {
    // z.B. Passworthash
    if (!email.includes('@')) {
      throw new Error('Ungültige Email-Adresse');
    }
    return userRepository.create(email, password);
  },

  // /**
  //  * Gibt alle User zurück.
  //  */
  // export const getAllUsers = async () => {
  //   // Hier könnte man noch Business-Logik einfügen,
  //   // z.B. Filter, Transformierungen etc.
  //   return userRepository.findAllUsers();
  // };

  // /**
  //  * Erstellt einen neuen User.
  //  */
  // export const createUser = async (email: string, password: string) => {
  //   // Beispiel: Passwort validieren oder hashen
  //   // (hier nur Stub ohne echte Hash-Funktion)
  //   if (!email.includes('@')) {
  //     throw new Error('Ungültige Email-Adresse');
  //   }

  //   return userRepository.createUser(email, password);
  // };
};

export default userService;
