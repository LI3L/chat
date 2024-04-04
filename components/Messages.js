import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Button, Input } from "@rneui/base";
import socket from "../utils/socket";

function MessagesScreen({ navigation }) {
  const [messagesList, setMessagesList] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "80%" }}>
        {messagesList &&
          messagesList.map((msg, index) => <Text key={index}>{msg}</Text>)}
      </ScrollView>
      <View style={{ height: "20%", display: "flex", flexDirection: "row" }}>
        <Input value={message} onChangeText={setMessage} style={styles.TI} />
        <Button onPress={() => socket.emit("message", message)}>Send</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  TI: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "lightgrey",
  },
});

export default MessagesScreen;
