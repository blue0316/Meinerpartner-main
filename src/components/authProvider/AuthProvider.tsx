"use client";

import { useState } from "react";

// Import Custom Components
import { AuthContext } from "@/components/context/AuthContext";

const AuthProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUser = (user: any) => {
    setUserData(user);
  };

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
