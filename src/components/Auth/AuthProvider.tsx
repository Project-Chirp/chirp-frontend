import { Auth0Provider } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: PropsWithChildren<any>;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const redirectUri = window.location.origin;

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    console.log("Authorization Provider Error!");
    return null;
  }

  return (
    <Auth0Provider
      audience={audience}
      clientId={clientId}
      domain={domain}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
