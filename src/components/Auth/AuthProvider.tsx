import { Auth0Provider } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: PropsWithChildren<any>;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const redirectUri = window.location.origin;

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    throw new Error(
      "Authorization provider error, something is wrong with the authorization config!"
    );
  }

  return (
    <Auth0Provider
      authorizationParams={{ audience: audience, redirectUri: redirectUri }}
      clientId={clientId}
      domain={domain}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
