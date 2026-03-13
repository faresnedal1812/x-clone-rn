import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React from "react";

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  formData: {
    firstName: string;
    lastName: string;
    bio: string;
    location: string;
  };
  saveProfile: () => void;
  updateFormField: (field: string, value: string) => void;
  isUpdating: boolean;
}

const EditProfileModal = ({
  isVisible,
  onClose,
  formData,
  saveProfile,
  updateFormField,
  isUpdating,
}: EditProfileModalProps) => {
  const handleSave = () => {
    saveProfile();
    onClose();
  };
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {/* Header */}
      <View className="border-b border-gray-100">
        <View className="px-4 py-3 flex-row justify-between items-center">
          <TouchableOpacity onPress={onClose}>
            <Text className="text-blue-500">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">
            Edit Profile
          </Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={isUpdating}
            className={`${isUpdating ? "opacity-50" : ""}`}
          >
            {isUpdating ? (
              <ActivityIndicator size="small" color="#1DA1F2" />
            ) : (
              <Text className="text-blue-500 text-lg font-semibold">Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Data */}
      <View className="px-4 py-6">
        <View className="flex-col gap-4">
          <View>
            <Text className="font-medium text-gray-500 mb-1">First Name</Text>
            <TextInput
              className="text-base px-3 py-2 border border-gray-200 rounded-lg"
              value={formData.firstName}
              onChangeText={(text) => updateFormField("firstName", text)}
              placeholder="Your first name"
            />
          </View>
          <View>
            <Text className="font-medium text-gray-500 mb-1">Last Name</Text>
            <TextInput
              className="text-base px-3 py-2 border border-gray-200 rounded-lg"
              value={formData.lastName}
              onChangeText={(text) => updateFormField("lastName", text)}
              placeholder="Your last name"
            />
          </View>
          <View>
            <Text className="font-medium text-gray-500 mb-1">Bio</Text>
            <TextInput
              className="text-base px-3 py-2 border border-gray-200 rounded-lg"
              value={formData.bio}
              onChangeText={(text) => updateFormField("bio", text)}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
          <View>
            <Text className="font-medium text-gray-500 mb-1">Location</Text>
            <TextInput
              className="text-base px-3 py-2 border border-gray-200 rounded-lg"
              value={formData.location}
              onChangeText={(text) => updateFormField("location", text)}
              placeholder="Where are you located?"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
