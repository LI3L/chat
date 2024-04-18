import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useUser } from "./UserContext";

const SignUpScreen = ({ navigation }) => {
  const { userData, setUserData } = useUser();

  const handleSignUp = () => {
    navigation.navigate("Messages");
    console.log("User Data:", userData);
  };

  return (
    userData && (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Sign Up</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            margin: 10,
            padding: 5,
          }}
          placeholder="Name"
          value={userData.name}
          onChangeText={(text) =>
            setUserData((prevData) => ({
              ...prevData,
              name: text,
              id: Math.random().toString(36).substring(7),
            }))
          }
        />

        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    )
  );
};

export default SignUpScreen;
