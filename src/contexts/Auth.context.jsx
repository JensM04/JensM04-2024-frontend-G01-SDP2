import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../api";
import { socket } from "../api/socket";

const AuthContext = createContext();
const JWT_TOKEN_KEY = "jwtToken";
const USER_ID_KEY = "UserId";
const USER_ROLE_KEY = "role";
const USER_COMPANY_KEY = "company";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [role, setRole] = useState(localStorage.getItem(USER_ROLE_KEY))
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const {
    isMutation: loading,
    error,
    trigger: doLogin,
  } = useSWRMutation("users/login", api.post);

  useMemo(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token));
    setReady(true);
  }, [token]);

  const login = useCallback(
    async (username, password) => {
      try {
        const { token, user } = await doLogin({ username, password });
        setToken(token);
        setUser(user);
        setRole(user.DTYPE)
        socket.connect({
          query: {
            userId: user.ID,
            role: user.DTYPE,
            bedrijfId: user.BEDRIJFID,
          },
        });
        localStorage.setItem(JWT_TOKEN_KEY, token);
        localStorage.setItem(USER_ID_KEY, user.ID);
        localStorage.setItem(USER_ROLE_KEY, user.DTYPE);
        localStorage.setItem(USER_COMPANY_KEY, user.BEDRIJFID);
        return true;
      } catch (error) {
        return false;
      }
    },
    [doLogin]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    socket.disconnect();
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(USER_COMPANY_KEY);
  }, []);

  const value = useMemo(
    () => ({ token, role, user, login, logout, loading, error, ready, isAuthed }),
    [token, user, login, role, logout, loading, error, isAuthed, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
