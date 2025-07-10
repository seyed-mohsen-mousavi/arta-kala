"use client";

import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

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
  // useEffect(() => {
  //   if (user) {
  //     const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  //     if (localCart.length > 0) {
  //       Promise.all(localCart.map((item) => addToServerCart(item))).then(() => {
  //         localStorage.removeItem("cart");
  //       });
  //     }
  //   }
  // }, [user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
