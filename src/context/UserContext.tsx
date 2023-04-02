import { createContext, useContext, useState } from "react";

type UserType = {
  isLoading: boolean;
  userId?: number;
  username?: string;
  displayName?: string;
};

type UserContextType = {
  user: UserType;
  setUser: (user: UserType) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserType>({
    isLoading: true,
    userId: undefined,
    username: undefined,
    displayName: undefined,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext) as UserContextType;
