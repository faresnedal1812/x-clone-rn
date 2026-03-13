import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useApiClient, userApi } from "@/utils/api";
import { useState } from "react";
import { Alert } from "react-native";
import { useCurrentUser } from "./useCurrentUser";

interface ProfileUpdateData {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
}

export const useProfile = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const { currentUser } = useCurrentUser();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
  });

  const updateProfileMutation = useMutation({
    mutationFn: (profileData: ProfileUpdateData) =>
      userApi.updateProfile(api, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsEditModalVisible(false);
      Alert.alert("Success", "Profile updated successfully");
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update profile",
      );
    },
  });

  const openEditModal = () => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        bio: currentUser.bio || "",
        location: currentUser.location || "",
      });
      setIsEditModalVisible(true);
    } else {
      Alert.alert("Error", "Unable to load profile data");
    }
  };

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    updateFormField,
    isEditModalVisible,
    openEditModal,
    closeEditModal: () => setIsEditModalVisible(false),
    saveProfile: () => updateProfileMutation.mutate(formData),
    isUpdating: updateProfileMutation.isPending,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  };
};
