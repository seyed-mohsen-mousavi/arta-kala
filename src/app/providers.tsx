// app/providers.tsx
"use client";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export default function Providers({ children } : { children: React.ReactNode }) {
  return (
    <HeroUIProvider className="flex flex-col h-full flex-1">
      <ToastProvider placement="top-center" />
      {children}
    </HeroUIProvider>
  );
}
