import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Post } from "@/types";
import { useComments } from "@/hooks/useComments";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { formatDate } from "@/utils/formatters";

interface CommentModalProps {
  selectedPost: Post;
  onClose: () => void;
}

const CommentModal = ({ selectedPost, onClose }: CommentModalProps) => {
  const { contentText, setContentText, createComment, isCreatingComment } =
    useComments();
  const { currentUser } = useCurrentUser();

  const handleClose = () => {
    onClose();
    setContentText("");
  };

  return (
    <Modal
      visible={!!selectedPost}
      animationType="slide"
      presentationStyle="pageSheet"
      className="bg-white"
    >
      {/* Modal Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={handleClose}>
          <Text className="text-lg text-blue-500">Close</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Comments</Text>
        <View className="w-12" />
      </View>

      {/* Selected Post UI */}
      {selectedPost && (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="border-b border-gray-100">
            <View className="flex-row p-4">
              <Image
                source={{ uri: selectedPost.user.profilePicture }}
                resizeMode="cover"
                className="size-12 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-gray-900 font-bold">
                      {selectedPost.user.firstName} {selectedPost.user.lastName}
                    </Text>
                    <Text className="text-gray-500">
                      @{selectedPost.user.username} •{" "}
                      {formatDate(selectedPost.createdAt)}
                    </Text>
                  </View>
                </View>

                {selectedPost.content && (
                  <Text className="leading-5 text-base text-gray-900 mb-3">
                    {selectedPost.content}
                  </Text>
                )}
                {selectedPost.image && (
                  <Image
                    source={{ uri: selectedPost.image }}
                    className="w-full h-48 rounded-xl mb-3"
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          </View>

          {/* Comments List */}
          {selectedPost.comments && selectedPost.comments.length > 0 ? (
            selectedPost.comments.map((comment) => (
              <View key={comment._id} className="border-b border-gray-100">
                <View className="p-4 flex-row">
                  <Image
                    source={{ uri: comment.user.profilePicture }}
                    resizeMode="cover"
                    className="size-10 rounded-full mr-3"
                  />
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-gray-900 font-bold">
                        {comment.user.firstName} {comment.user.lastName}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        @{comment.user.username}
                      </Text>
                    </View>
                    <Text className="text-base text-gray-900 mt-1 leading-5 mb-2">
                      {comment.content}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="p-4 text-center">
              <Text className="text-gray-500">No comments yet</Text>
            </View>
          )}

          {/* Comment Input */}
          <View className="p-4 flex-row">
            <Image
              className="size-10 rounded-full mr-3"
              resizeMode="cover"
              source={{ uri: currentUser?.profilePicture }}
            />
            <View className="flex-1">
              <TextInput
                className="border border-gray-200 rounded-lg p-3 text-base mb-3"
                value={contentText}
                onChangeText={setContentText}
                multiline
                placeholder="Write a comment"
                numberOfLines={3}
                textAlignVertical="top"
              />
              <TouchableOpacity
                onPress={() => createComment(selectedPost._id)}
                disabled={isCreatingComment || !contentText.trim()}
                className={`px-4 py-2 rounded-lg ${contentText.trim() ? "bg-blue-500" : "bg-gray-300"}`}
              >
                {isCreatingComment ? (
                  <ActivityIndicator size={"small"} color={"white"} />
                ) : (
                  <Text
                    className={`font-semibold ${contentText.trim() ? "text-white" : "text-gray-500"}`}
                  >
                    Reply
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </Modal>
  );
};

export default CommentModal;
