import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import PostsList from "@/components/PostsList";
import { useProfile } from "@/hooks/useProfile";
import EditProfileModal from "@/components/EditProfileModal";
import { usePost } from "@/hooks/usePosts";

const ProfileScreen = () => {
  const { currentUser, isLoading } = useCurrentUser();
  const insets = useSafeAreaInsets();

  const {
    posts: userPosts,
    isLoading: isRefetching,
    refetch: refetchPosts,
  } = usePost(currentUser?.username);

  const {
    closeEditModal,
    formData,
    isEditModalVisible,
    isUpdating,
    openEditModal,
    refetch: refetchProfile,
    saveProfile,
    updateFormField,
  } = useProfile();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
      </View>
    );
  }

  if (!currentUser) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-8">
        <Text className="text-gray-500">Unable to load profile</Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="bg-white flex-1" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View>
          <Text className="text-xl font-bold text-gray-900">
            {currentUser.firstName} {currentUser.lastName}
          </Text>
          <Text className="text-sm text-gray-500">
            {userPosts.length} Posts
          </Text>
        </View>
        <SignOutButton />
      </View>
      {/* User Information */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetchProfile();
              refetchPosts();
            }}
            tintColor={"#1DA1F2"}
          />
        }
      >
        <Image
          source={{
            uri:
              currentUser.bannerImage ||
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
          }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="px-4 pb-4 border-b border-gray-100">
          <View className="flex-row justify-between items-end mb-4 -mt-16">
            <Image
              source={{ uri: currentUser.profilePicture }}
              className="size-32 rounded-full border-4 border-white"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="border border-gray-200 px-6 py-2 rounded-full"
              onPress={openEditModal}
            >
              <Text className="text-gray-900 font-semibold">Edit profile</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-col gap-1">
            <View className="flex-row items-center gap-1">
              <Text className="text-lg font-bold text-gray-900">
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              <Feather name="check-circle" size={20} color={"#1DA1F2"} />
            </View>
            <Text className="text-gray-500 mb-1">@{currentUser.username}</Text>
            <Text className="mb-1">{currentUser.bio}</Text>
            <View className="flex-row items-center gap-1 mb-1">
              <Feather name="map-pin" size={16} color={"#657786"} />
              <Text className="text-gray-500">{currentUser.location}</Text>
            </View>
            <View className="flex-row items-center gap-1 mb-1">
              <Feather name="calendar" size={16} color={"#657786"} />
              <Text className="text-gray-500">
                Joined {format(new Date(currentUser.createdAt), "MMMM yyyy")}
              </Text>
            </View>
            <View className="flex-row items-center gap-6 mb-1">
              <View className="flex-row items-center gap-1">
                <Text className="font-bold text-gray-900">
                  {currentUser.following?.length || 0}
                </Text>
                <Text className="text-gray-500">Following</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="font-bold text-gray-900">
                  {currentUser.followers?.length || 0}
                </Text>
                <Text className="text-gray-500">Followers</Text>
              </View>
            </View>
          </View>
        </View>

        <PostsList username={currentUser?.username} />
      </ScrollView>

      <EditProfileModal
        isVisible={isEditModalVisible}
        onClose={closeEditModal}
        formData={formData}
        saveProfile={saveProfile}
        updateFormField={updateFormField}
        isUpdating={isUpdating}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
