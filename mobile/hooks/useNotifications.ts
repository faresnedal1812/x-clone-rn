import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/utils/api";
import { Notification } from "@/types";

interface NotificationResponse {
  notifications: Notification[];
}

export const useNotifications = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: notificationsData,
    error,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<NotificationResponse, Error, Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const response = await api.get("/notifications");
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch notifications: ${error}`);
      }
    },
    select: (response) => response.notifications,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      try {
        await api.delete(`/notifications/${notificationId}`);
      } catch (error) {
        throw new Error(`Failed to delete notification ${error}`);
      }
    },
    onMutate: async (notificationId: string) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previousNotifications =
        queryClient.getQueryData<NotificationResponse>(["notifications"]);
      queryClient.setQueryData<NotificationResponse>(
        ["notifications"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            notifications: old.notifications.filter(
              (notification) => notification._id !== notificationId,
            ),
          };
        },
      );
      return { previousNotifications };
    },
    onError: (_error, _notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications"],
          context.previousNotifications,
        );
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const deleteNotification = (notificationId: string) => {
    deleteNotificationMutation.mutate(notificationId);
  };

  return {
    notifications: notificationsData || [],
    error,
    isLoading,
    isRefetching,
    refetch,
    deleteNotification,
    isDeletingNotification: deleteNotificationMutation.isPending,
  };
};
