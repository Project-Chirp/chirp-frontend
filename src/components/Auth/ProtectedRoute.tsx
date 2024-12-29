import { withAuthenticationRequired } from "@auth0/auth0-react";
import PageLoader from "../../pages/PageLoader";

type ProtectedRouteProps = {
  component: any;
};

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoader />,
  });

  return <Component />;
};

export default ProtectedRoute;
