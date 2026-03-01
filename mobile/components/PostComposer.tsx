import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";

const PostComposer = () => {
  const {
    content,
    setContent,
    selectedImage,
    isCreating,
    pickImageFromGallery,
    takePhoto,
    removeImage,
    createPost,
  } = useCreatePost();

  const { user } = useUser();
  return (
    <View className="border-b border-gray-100 p-4">
      <View className="flex-row">
        <Image
          source={{
            uri:
              user?.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
          }}
          className="size-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <TextInput
            placeholder="What's happening?"
            className="text-lg text-gray-900"
            placeholderTextColor={"#657786"}
            value={content}
            onChangeText={setContent}
            maxLength={350}
            multiline
          />
        </View>
      </View>

      {selectedImage && (
        <View className="mt-4 ml-12">
          <View className="relative">
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-48 rounded-2xl"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-black/50 rounded-full w-8 h-8 items-center justify-center"
              onPress={removeImage}
            >
              <Feather name="x" size={16} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View className="flex-row items-center justify-between mt-4">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={pickImageFromGallery}>
            <Feather name="image" size={20} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
            <Feather name="camera" size={20} color="#1DA1F2" />
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-4 items-center">
          {content.length > 0 && (
            <Text
              className={`text-sm ${content.length > 350 ? "text-red-500" : "text-gray-500"}`}
            >
              {350 - content.length}
            </Text>
          )}
          <TouchableOpacity
            className={`px-6 py-2 rounded-full ${content.trim() || selectedImage ? "bg-blue-500" : "bg-gray-300 "}`}
            onPress={createPost}
            disabled={isCreating || (!content.trim() && !selectedImage)}
          >
            {isCreating ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <Text
                className={`font-semibold ${content.trim() || selectedImage ? "text-white" : "text-gray-500"}`}
              >
                Post
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostComposer;
