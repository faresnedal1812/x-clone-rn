import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Post, User } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatters";
import { AntDesign, Feather } from "@expo/vector-icons";

interface PostCardProps {
  post: Post;
  currentUser: User;
  onDelete: (postId: string) => void;
  onLike: (postId: string) => void;
  isLike: boolean;
}

const PostCard = ({
  post,
  currentUser,
  onDelete,
  onLike,
  isLike,
}: PostCardProps) => {
  const isOwnPost = currentUser?._id === post.user._id;

  const handleDeletePost = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(post._id),
      },
    ]);
  };

  return (
    <View className="border-b border-gray-100">
      <View className="flex-row items-center">
        <Image
          source={{ uri: post.user.profilePicture }}
          resizeMode="cover"
          className="size-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="text-gray-900 font-bold">
                {post.user.firstName} {post.user.lastName}
              </Text>
              <Text className="text-gray-500">
                @{post.user.username} • {formatDate(post.createdAt)}
              </Text>
            </View>
            {isOwnPost && (
              <TouchableOpacity onPress={handleDeletePost}>
                <Feather name="trash" size={20} color="#657786" />
              </TouchableOpacity>
            )}
          </View>

          {post.content && (
            <Text className="leading-5 text-base text-gray-900 mb-3">
              {post.content}
            </Text>
          )}
          {post.image && (
            <Image
              source={{ uri: post.image }}
              className="w-full h-48 rounded-xl mb-3"
              resizeMode="cover"
            />
          )}

          <View className="flex-row items-center justify-between max-w-xs">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => {}}
            >
              <Feather name="message-circle" size={18} color={"#657786"} />
              <Text className="text-gray-500 ml-2 text-sm">
                {formatNumber(post.comments?.length || 0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Feather name="repeat" size={18} color="#657786" />
              <Text className="text-gray-500 text-sm ml-2">0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => onLike(post._id)}
            >
              {isLike ? (
                <AntDesign name="heart" size={18} color="#E0245E" />
              ) : (
                <Feather name="heart" size={18} color="#657786" />
              )}
              <Text
                className={`${isLike ? "text-red-500" : "text-gray-500"} text-sm ml-2`}
              >
                {formatNumber(post.likes?.length || 0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="share" size={18} color="#657786" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
