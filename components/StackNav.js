import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Button, Input } from "@rneui/base";
import socket from "../utils/socket";
import SignUpScreen from "./signUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



function MessagesScreen({ message, setMessage }) {
  return (
    <View style={styles.container}>
      <Input value={message} onChangeText={setMessage} />
      <Button onPress={() => socket.emit("message", message)}>Send</Button>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function StackNav() {
  const [messagesList, setMessagesList] = useState("");
  const [message, setMessage] = useState("");

  console.log(messagesList);

  socket.on("message", (message) => {
    setMessagesList([...messagesList, message]);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign Up">
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
