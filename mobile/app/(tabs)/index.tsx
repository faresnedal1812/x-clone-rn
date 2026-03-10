import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";
import PostComposer from "@/components/PostComposer";
import PostsList from "@/components/PostsList";
import { usePost } from "@/hooks/usePosts";

const HomeScreen = () => {
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const { refetch: refetchPosts } = usePost();

  const handleToPullRefresh = async () => {
    setIsRefetching(true);
    await refetchPosts();
    setIsRefetching(false);
  };

  useUserSync();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <Ionicons name="logo-twitter" size={24} color={"#1DA1F2"} />
        <Text className="font-bold text-xl text-gray-900">Home</Text>
        <SignOutButton />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleToPullRefresh}
            tintColor={"#1DA1F2"}
          />
        }
      >
        <PostComposer />

        <PostsList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
