import { CONVERSATIONS, ConversationType } from "@/data/conversations";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const MessageScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState<string>("");
  const [conversationsList, setConversationsList] = useState(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const deleteConversation = (conversationID: number) => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure you want to delete this conversation",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setConversationsList((prev) =>
              prev.filter((conv) => conv.id !== conversationID),
            );
          },
        },
      ],
    );
  };

  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };

  const closeConversation = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      setConversationsList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv,
        ),
      );
      setNewMessage("");
      Alert.alert(
        "Message Sent!",
        `Your message has been sent to ${selectedConversation.user.name}`,
      );
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Messages</Text>
        <Feather name="edit" size={20} color={"#5999FF"} />
      </View>
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="bg-gray-100 rounded-full px-4 py-3 flex-row items-center">
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            placeholder="Search for people and groups"
            className="flex-1 ml-3 text-base"
            placeholderTextColor={"#657786"}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {conversationsList &&
          conversationsList.length > 0 &&
          conversationsList.map((conv) => (
            <TouchableOpacity
              key={conv.id}
              className="flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50"
              onPress={() => openConversation(conv)}
              onLongPress={() => deleteConversation(conv.id)}
            >
              <Image
                source={{ uri: conv.user.avatar }}
                className="size-12 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row gap-1 items-center">
                    <Text className="text-md font-bold text-gray-900">
                      {conv.user.name}
                    </Text>
                    {conv.user.verified && (
                      <Feather
                        name="check-circle"
                        color={"#5999FF"}
                        size={15}
                      />
                    )}
                    <Text className="text-sm text-gray-500">
                      @{conv.user.username}
                    </Text>
                  </View>
                  <Text className="text-gray-500 text-sm">{conv.time}</Text>
                </View>
                <Text className="text-gray-500 text-sm" numberOfLines={1}>
                  {conv.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View className="px-4 py-2 flex-row justify-center items-center border-t border-gray-100 bg-gray-50">
        <Text className="text-gray-500 text-sm">
          Tap to open - Long press to delete
        </Text>
      </View>

      {/* Chat Modal */}
      <Modal
        visible={isChatOpen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedConversation && (
          <SafeAreaView className="flex-1">
            {/* Chat Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
              <TouchableOpacity onPress={closeConversation} className="mr-3">
                <Feather name="arrow-left" size={24} color="#1DA1F2" />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedConversation.user.avatar }}
                className="size-10 rounded-full mr-3"
              />
              <View className="flex-1 ">
                <View className="flex-row items-center">
                  <Text className="font-semibold text-gray-900 mr-1">
                    {selectedConversation.user.name}
                  </Text>
                  {selectedConversation.user.verified && (
                    <Feather name="check-circle" size={16} color="#1DA1F2" />
                  )}
                </View>
                <Text className="text-gray-500 text-sm">
                  @{selectedConversation.user.username}
                </Text>
              </View>
            </View>

            {/* Chat Message Area */}
            <ScrollView className="flex-1 p-4">
              <View className="mb-4">
                <Text className="text-center text-gray-400 text-sm mb-4">
                  This is the beginning of your conversation with{" "}
                  {selectedConversation.user.name}
                </Text>
                {/* Conversation Messages */}
                {selectedConversation.messages.map((message) => (
                  <View
                    key={message.id}
                    className={`flex-row mb-3 ${message.fromUser ? "justify-end" : ""}`}
                  >
                    {!message.fromUser && (
                      <Image
                        source={{ uri: selectedConversation.user.avatar }}
                        className="size-8 rounded-full mr-2"
                      />
                    )}
                    <View
                      className={`flex-1 ${message.fromUser ? "items-end" : ""}`}
                    >
                      <View
                        className={`rounded-2xl px-4 py-3 max-w-xs ${message.fromUser ? "bg-blue-500" : "bg-gray-100"}`}
                      >
                        <Text
                          className={`${message.fromUser ? " text-white" : "text-gray-900"}`}
                        >
                          {message.text}
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-400 mt-1">
                        {message.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Message Input */}
            <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
              <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3 mr-3">
                <TextInput
                  className="flex-1 text-base"
                  placeholder="Start a message..."
                  placeholderTextColor="#657786"
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
              </View>
              <TouchableOpacity
                onPress={sendMessage}
                className={`size-10 rounded-full items-center justify-center ${
                  newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
                }`}
                disabled={!newMessage.trim()}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default MessageScreen;
