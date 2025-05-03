"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  user: { token: string } | null;
  login: (token: string) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const router = useRouter();
  const [pathname, setPathname] = useState(window.location.pathname);
  const [user, setUser] = useState<{ token: string } | null>(null);

  useEffect(() => {
    console.log("user: ", user, pathname);

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser({ token: storedToken });
    }
  }, [router]);

  useEffect(() => {
    console.log("user: ", user, pathname);
    if (user && pathname === "/") {
      router.push("/dashboard");
    }

    if (!user && pathname === "/dashboard") {
      router.push("/");
    }
  }, [user, router]);

  const login = (token: string) => {
    setUser({ token });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
