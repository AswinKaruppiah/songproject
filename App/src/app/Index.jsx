import { View, Text } from "react-native";
import Home from "../components/Home";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Home />
    </SafeAreaView>
  );
};

export default Index;
