import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { FIREBASE_DB } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const AllQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesCollection = await getDocs(
          collection(FIREBASE_DB, "quiz")
        );
        const quizzesList = quizzesCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizzes(quizzesList);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching quizzes: ", error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(quizzes, "quzzes");

  return (
    <View style={styles.container}>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.quizItem}
            onPress={() => router.push(`quiz/ques/${item.id}`)}
          >
            <View style={styles.quizDetails}>
              <Text style={styles.quizTitle}>{item.quizName}</Text>
              <Text>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push(`/quiz/ques/${item.id}`)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quizItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    width: 45,
    height: 30,
    backgroundColor: "#ABD1C6",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AllQuiz;
