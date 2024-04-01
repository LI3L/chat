import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Button, Input } from "@rneui/base";
import socket from "../utils/socket";
import SignUpScreen from "./signUp";

function signUpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SignUpScreen navigation={navigation} />
    </View>
  );
}

function MessagesScreen({ message, setMessage }) {
  return (
    <View style={styles.container}>
      <Input value={message} onChangeText={setMessage} />
      <Button onPress={() => socket.emit("message", message)}>Send</Button>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNav() {
  const [messagesList, setMessagesList] = useState("");
  const [message, setMessage] = useState("");

  console.log(messagesList);

  socket.on("message", (message) => {
    setMessagesList([...messagesList, message]);
  });

  return (
    <Tab.Navigator>
      <Tab.Screen name="SignUp" component={() => signUpScreen()} />
      <Tab.Screen
        name="Messages"
        component={() => MessagesScreen(message, setMessage)}
      />
    </Tab.Navigator>
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
