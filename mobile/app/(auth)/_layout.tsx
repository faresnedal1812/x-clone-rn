import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const AuthLayout = () => {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Redirect href={"/(tabs)/index"} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
