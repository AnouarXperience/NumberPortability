import React, { useState } from 'react';
import { useLocalState } from '../util/uselocalStorage';
import { Navigate } from 'react-router-dom';
import ajax from '../Services/fetchService';
import LoadingScreen from './LoadingScreen';

const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);


    if (jwt) {
        ajax(`/api/log/validate?token=${jwt}`, "get", jwt).then((isValid) => {
          setIsValid(isValid);
          setIsLoading(false);
        });
      } else {
        return <Navigate to="/login" />;
      }
    
      return isLoading ? (
        <div><LoadingScreen /></div>
      ) : isValid === true ? (
        children
      ) : (
        <Navigate to="/login" />
      );
    
    
    // return jwt ? children : <Navigate to="/login"/>
};

export default PrivateRoute;