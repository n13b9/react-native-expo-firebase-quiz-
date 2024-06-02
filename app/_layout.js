import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#004643" },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerBackTitleVisible: false, // Hide back button text
        headerBackVisible: true, // Show back button
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
      <Stack.Screen name="quiz/form" options={{ headerTitle: "Create Quiz" }} />
      <Stack.Screen name="quiz/allQuiz" options={{ headerTitle: "Quizzes" }} />

      <Stack.Screen
        name="quiz/ques/[quizId]"
        options={{ headerTitle: "Questions" }}
      />
      <Stack.Screen
        name="quiz/[id]"
        options={{ headerTitle: "Add Questions" }}
      />
      <Stack.Screen
        name="quiz/take/showAllQuiz"
        options={{ headerTitle: "All Quiz" }}
      />
      <Stack.Screen
        name="quiz/take/[quizId]"
        options={{ headerTitle: "Quiz" }}
      />
    </Stack>
  );
};

export default _layout;
