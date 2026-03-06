import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePost } from "@/hooks/usePosts";
import { Post } from "@/types";
import PostCard from "./PostCard";

const PostsList = () => {
  const { currentUser } = useCurrentUser();
  const {
    posts,
    isLoading,
    error,
    refetch,
    deletePost,
    toggleLike,
    checkIsLiked,
  } = usePost();

  if (isLoading) {
    return (
      <View className="p-8 items-center">
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
        <Text className="mt-2 text-gray-500">Loading Posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-8 items-center">
        <Text className="text-gray-500 mb-4">Failed to load posts</Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (posts?.length === 0) {
    return (
      <View className="p-8 items-center">
        <Text className="text-gray-500">No posts yet</Text>
      </View>
    );
  }

  return (
    <>
      {posts.map((post: Post) => (
        <PostCard
          key={post._id}
          post={post}
          currentUser={currentUser}
          onDelete={deletePost}
          onLike={toggleLike}
          isLike={checkIsLiked(post?.likes, currentUser)}
        />
      ))}
    </>
  );
};

export default PostsList;
