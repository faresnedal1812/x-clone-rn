import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { isLoading, handleSocialAuth } = useSocialAuth();
  return (
    <View className="flex-1 bg-white items-center justify-center px-8 ">
      <Image
        source={require("../../assets/images/auth2.png")}
        className="size-96"
        resizeMode="contain"
      />
      <View className="flex-col gap-4 mt-4 w-full">
        <TouchableOpacity
          className="flex-row items-center justify-center px-6 py-3 rounded-full border border-gray-300 bg-white"
          onPress={() => handleSocialAuth("oauth_google")}
          disabled={isLoading}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2, // for android
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#4285F4" />
          ) : (
            <>
              <Image
                source={require("../../assets/images/google.png")}
                className="size-10 mr-3"
                resizeMode="contain"
              />
              <Text className="text-black font-medium text-base">
                Continue With Google
              </Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center px-6 py-3 rounded-full border border-gray-300 bg-white"
          onPress={() => {
            handleSocialAuth("oauth_apple");
          }}
          disabled={isLoading}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2, // for android
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <>
              <Image
                source={require("../../assets/images/apple.png")}
                className="size-10 mr-3"
                resizeMode="contain"
              />
              <Text className="text-black font-medium text-base">
                Continue With Apple
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
