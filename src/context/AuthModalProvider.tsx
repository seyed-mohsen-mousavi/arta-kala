"use client"
import { useDisclosure } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthModalContext = createContext(null);

export const AuthModalProvider = ({ children }: any) => {
  const { isOpen, onOpen, onOpenChange, onClose }: any = useDisclosure();
  const searchParams = useSearchParams();
  const authRequired = searchParams.get("authRequired");

  useEffect(() => {
    if (authRequired === "1") {
      onOpen();
    }
  }, [authRequired, onOpen]);

  return (
    <AuthModalContext.Provider
      value={{ isOpen, onOpen, onOpenChange, onClose }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
