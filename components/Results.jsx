//TODO: add use router, go to homepage

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Results = ({ score, totalQuestions, restart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Quiz Complete</Text>

        <Text style={styles.subtitle}>You scored:</Text>

        <Text style={styles.score}>
          {score}/{totalQuestions}
        </Text>

        <TouchableOpacity
          onPress={restart}
          activeOpacity={0.8}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e4e4e4",
    padding: 20,
  },
  wrapper: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: "#004643",
  },
  subtitle: {
    marginVertical: 20,
    fontWeight: "500",
    fontSize: 16,
    color: "#333",
  },
  score: {
    fontWeight: "700",
    fontSize: 24,
    color: "#004643",
  },
  btn: {
    width: 120,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ABD1C6",
    marginTop: 20,
  },
  btnText: {
    color: "#004643",
    fontWeight: "600",
    fontSize: 16,
  },
});
