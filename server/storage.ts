
interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
}

// Hardcoded users
const users: User[] = [
  {
    id: '1',
    username: 'sagor',
    password: '1234',
    role: 'admin'
  },
  {
    id: '2', 
    username: 'shohid',
    password: '1234',
    role: 'user'
  }
];

export class Storage {
  // User authentication
  authenticateUser(username: string, password: string): User | null {
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
  }

  getUserById(id: string): User | null {
    return users.find(u => u.id === id) || null;
  }

  getUserByUsername(username: string): User | null {
    return users.find(u => u.username === username) || null;
  }

  getAllUsers(): User[] {
    return users;
  }
}

export const storage = new Storage();
