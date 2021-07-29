import React, {useContext, useState} from 'react';
import {baseUrl} from "../Utils/Links";

const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const userApi = baseUrl + 'api/v1/users/';
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const login = async (token) => {
    localStorage.setItem('token', token)
    setToken(token)
  }

  const logout = async () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  const getUser = async () => {
    await fetch(userApi, {
      headers: {
        'Authorization': `Token ${token}`
      },
    }).then(response => response.json())
      .then(async data => setUser(data))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const event = useContext(AuthContext);
  if (event == null) {
    throw new Error('useAuth() called outside of a AuthProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {AuthProvider, useAuth};
