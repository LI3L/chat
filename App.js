import { StyleSheet, Text, View } from "react-native";
import StackNav from "./components/StackNav";
import { UserProvider } from "./components/UserContext";

export default function App() {
  return (
    <UserProvider>
      <StackNav />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
