import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import NoNotificationsFound from "@/components/NoNotificationsFound";
import NotificationCard from "@/components/NotificationCard";
import { Notification } from "@/types";

const NotificationsScreen = () => {
  const {
    notifications,
    error,
    isLoading,
    refetch,
    isRefetching,
    deleteNotification,
  } = useNotifications();

  const insets = useSafeAreaInsets();

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-gray-500 text-base mb-4">
          Failed to load notifications
        </Text>
        <TouchableOpacity
          className="px-4 py-2 bg-blue-500 rounded-lg"
          onPress={() => refetch()}
        >
          {isRefetching ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text className="text-white font-semibold">Retry</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* HEADER */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <Text className="font-black text-gray-900 text-lg">Notifications</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color={"#657786"} />
        </TouchableOpacity>
      </View>

      {/* SCROLL CONTENT */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={"#1DA1F2"}
          />
        }
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center p-8">
            <ActivityIndicator size={"large"} color={"#1DA1F2"} />
            <Text className="mt-4 text-gray-500">Loading notifications...</Text>
          </View>
        ) : notifications.length === 0 ? (
          <NoNotificationsFound />
        ) : (
          notifications.map((notification: Notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onDelete={deleteNotification}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
