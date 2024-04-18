import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Button, Input } from "@rneui/base";
import socket from "../utils/socket";
import { useUser } from "./UserContext";

function MessagesScreen({ navigation }) {
  const { userData: user } = useUser();
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState({
    m: "",
    id: "",
  });

  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ height: "80%", borderColor: "black", borderWidth: 1 }}
      >
        {messagesList?.map((msg, index) => {
          console.log(msg);
          console.log(user);
          return msg.id === user.id ? (
            <View
              key={index}
              style={{
                width: "100%",
                flexDirection: "row-reverse",
              }}
            >
              <Text style={{ fontSize: 20, backgroundColor: "#DAF7A6" }}>
                {msg.m}
              </Text>
            </View>
          ) : (
            <View
              key={index}
              style={{
                width: "100%",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#FFC300",
                }}
              >
                {msg.m}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={{ height: "20%", alignItems: "center" }}>
        <View
          style={{
            width: "30%",
            flexDirection: "row",
          }}
        >
          <Input
            value={message.m}
            onChangeText={(newtext) => {
              console.log(message);
              console.log(user);
              setMessage({ m: newtext, id: user.id });
            }}
            style={styles.TI}
          />
          <Button onPress={() => socket.emit("message", message)}>Send</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  TI: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "lightgrey",
  },
});

export default MessagesScreen;
