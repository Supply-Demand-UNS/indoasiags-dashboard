import $fetch from "@/lib/$fetch";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  profile: null,
  login: async () => {},
  logout: () => {},
  isLoading: true
});

export const AuthProvider = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function login(value) {
    const loginResponse = await $fetch.create("/api/login", value);
    localStorage.setItem("access_token", loginResponse.data.token);
    await getProfile();
    // navigate => dashboard
    navigate("/dashboard/setting");
  }

  async function getProfile() {
    try {
      const profileResponse = await $fetch.get("/api/user");
      setProfile(profileResponse.data);
    } catch {
      logout();
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    navigate("/");
  }

  useEffect(() => {
    // check access token exist?
    // get profile
    async function checkProfile() {
      setIsLoading(true);
      if (localStorage.getItem("access_token")) {
        await getProfile();
      }
      setIsLoading(false);
    }

    checkProfile();
  }, []);

  const store = {
    profile,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={store}>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        </div>
      ) : (
        <Outlet />
      )}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
