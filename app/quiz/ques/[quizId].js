import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

const QuizQuestions = () => {
  const { quizId } = useLocalSearchParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const quizDoc = await getDoc(doc(FIREBASE_DB, "quiz", quizId));
        if (quizDoc.exists()) {
          setQuestions(quizDoc.data().questions || []);
          setLoading(false);
        } else {
          console.log("Quiz not found");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching quiz: ", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const deleteQuestion = async (questionId) => {
    try {
      const updatedQuestions = questions.filter(
        (question) => question.id !== questionId
      );
      await updateDoc(doc(FIREBASE_DB, "quiz", quizId), {
        questions: updatedQuestions,
      });
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };

  const deleteOption = async (questionId, optionIndex) => {
    try {
      const updatedQuestions = [...questions];
      updatedQuestions.forEach((question) => {
        if (question.id === questionId) {
          question.options.splice(optionIndex, 1);
        }
      });
      await updateDoc(doc(FIREBASE_DB, "quiz", quizId), {
        questions: updatedQuestions,
      });
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error deleting option: ", error);
    }
  };

  const addQuestion = async () => {
    router.push(`quiz/${quizId}`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionItem}>
            <Text style={styles.questionText}>{item.prompt}</Text>
            <FlatList
              data={item.options}
              keyExtractor={(option, index) => `${item.id}-${index}`}
              renderItem={({ item: option, index }) => (
                <View style={styles.optionRow}>
                  <Text style={styles.optionText}>{option.answer}</Text>
                  <TouchableOpacity
                    onPress={() => deleteOption(item.id, index)}
                  >
                    <Text style={styles.deleteButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity onPress={() => deleteQuestion(item.id)}>
              <Text style={styles.deleteButton}>Delete Question</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
        <Text style={styles.addButtonText}>Add More Questions</Text>
      </TouchableOpacity>
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
  questionItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  optionText: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 5,
    flex: 1,
  },
  deleteButton: {
    color: "red",
  },
  addButton: {
    backgroundColor: "#004643",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default QuizQuestions;
