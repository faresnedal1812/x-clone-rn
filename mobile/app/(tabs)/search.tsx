import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

interface TrendingTopic {
  id: number;
  topic: string;
  tweets: string | number;
  category: string;
}

const TRENDING_TOPIC: TrendingTopic[] = [
  { id: 1, topic: "#Leo_Messi", tweets: "567K", category: "Sport" },
  { id: 2, topic: "#ReactNative", tweets: "89K", category: "Programming" },
  { id: 3, topic: "#Data_Analyst", tweets: "234K", category: "Technology" },
  { id: 4, topic: "#React", tweets: "125K", category: "Programming" },
  { id: 5, topic: "#Tramp_presdint", tweets: "98K", category: "Polyitic" },
];
const search = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center px-4 py-4 rounded-full bg-gray-100">
          <Feather name="search" size={20} color={"#657786"} />
          <TextInput
            placeholder="Search Twitter"
            className="ml-3 flex-1 text-base"
            placeholderTextColor={"#657786"}
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-xl font-black text-gray-900 mb-4">
            Trending for you
          </Text>
          {TRENDING_TOPIC.map((trend, index) => (
            <TouchableOpacity
              key={trend.id}
              className="border-b border-gray-100 py-3"
            >
              <Text className="text-sm text-gray-500">
                Trending in {trend.category}
              </Text>
              <Text className="text-lg font-bold text-gray-900">
                {trend.topic}
              </Text>
              <Text className="text-sm text-gray-500">{trend.tweets}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default search;
