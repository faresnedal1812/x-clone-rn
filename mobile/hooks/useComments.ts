import { useApiClient, commentApi } from "@/utils/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";

export const useComments = () => {
  const [contentText, setContentText] = useState<string>("");

  const api = useApiClient();
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      const response = await commentApi.createComment(api, postId, content);
      return response.data;
    },
    onSuccess: () => {
      setContentText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      Alert.alert("Comment Failed", "Failed to post comment, please try again");
    },
  });

  const createComment = (postId: string) => {
    if (!contentText.trim()) {
      Alert.alert("Empty Comment", "Please write something before posting!");
      return;
    }

    createCommentMutation.mutate({ postId, content: contentText.trim() });
  };

  return {
    contentText,
    setContentText,
    isCreatingComment: createCommentMutation.isPending,
    createComment,
  };
};
