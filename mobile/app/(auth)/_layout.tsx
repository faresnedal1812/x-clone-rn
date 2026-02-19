import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Layout = () => {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }
  return <Stack />;
};

export default Layout;
