"use client";

import { User } from "@/types/user";
import { createContext, useContext, useState } from "react";

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: User;
}) => {
  const [user] = useState<User | null>(initialUser || null);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
