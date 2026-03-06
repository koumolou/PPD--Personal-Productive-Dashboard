import { createContext, useState, useEffect } from 'react';
import type { UserContextType, User } from '../types';
import type { ReactNode } from 'react';

const USERS_KEY = 'ppd_user';

const defaultUser : User = {
  username: 'Guest',
  email: 'guest@example.com',
  avatar: '',
  joinedDate: new Date().toLocaleDateString(),
};

export function loadUser() : User{
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return defaultUser;

    const parsed = JSON.parse(raw);

    if (parsed === null || typeof parsed !== 'object') {
      return defaultUser;
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load user:', error);
    return defaultUser;
  }
}

export const UserContext = createContext <UserContextType | null> (null);

interface UserProps {
  children : ReactNode 
}


function UserProvider({ children} : UserProps  ) {
  const [user, setUser] = useState(() => loadUser());

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(user));
  }, [user]);

  function updateUser(newuser : Partial<User>) {
    setUser((prev) => ({
      ...prev,
      ...newuser,
    }));
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
