import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Link href={"/quiz/form"} asChild>
        <Pressable style={styles.link}>
          <Text style={styles.linkText}>Create Quiz</Text>
        </Pressable>
      </Link>
      <Link href="/quiz/allQuiz" asChild>
        <Pressable style={styles.link}>
          <Text style={styles.linkText}>View all Quiz</Text>
        </Pressable>
      </Link>
      <Link href="/quiz/take/showAllQuiz" asChild>
        <Pressable style={styles.link}>
          <Text style={styles.linkText}>Take Quiz</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e4e4",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 40,
    color: "#004643",
  },
  link: {
    width: "80%",
    height: 50,
    borderRadius: 16,
    backgroundColor: "#ABD1C6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  linkText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#004643",
  },
});
