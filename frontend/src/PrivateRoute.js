import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";
import Profile from "./containers/Profile";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();

  return (
    
    <Route
      {...rest}
      render={props =>
        
        authTokens ? (
          authTokens.user.profile.bio.length==0?
          <Profile edit={true}/>
          :
          <Component {...props} />
          
          
        ) :(
          <Redirect
            to="/login"
          />
        )
      }
    />
  );
}

export default PrivateRoute;