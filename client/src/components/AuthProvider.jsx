import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
const AuthProvider = ({ children }) => {
  const AuthContext = createContext();

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
