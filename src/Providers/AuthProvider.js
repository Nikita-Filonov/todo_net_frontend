import React, {useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Links";

const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const userApi = baseUrl + 'api/v1/users/';
  const [userIdentity, setUserIdentity] = useState(null)
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const storageToken = localStorage.getItem('token')
      const storageUserIdentity = localStorage.getItem('userIdentity')
      setToken(storageToken)
      setUserIdentity(storageUserIdentity)

      token && await getUser();
    })()
  }, [token, userIdentity])

  const login = async ({access_token, userIdentity}) => {
    localStorage.setItem('token', access_token)
    localStorage.setItem('userIdentity', userIdentity)
    setToken(token)
    setUserIdentity(userIdentity)
  }

  const logout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userIdentity')
    setToken(null)
  }

  const getUser = async () => {
    await fetch(userApi + `${userIdentity}`, {
      headers: {
        'Authorization': `Bearer ${token}`
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
