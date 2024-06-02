import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { useForm } from "react-hook-form";
import {
  useLocalSearchParams,
  useGlobalSearchParams,
  router,
} from "expo-router";
import { FIREBASE_DB } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const QuizQuestionsForm = () => {
  const { id } = useLocalSearchParams();
  console.log("Quiz ID:", id);
  const [questions, setQuestions] = useState([
    {
      prompt: "",
      options: [{ answer: "", isCorrect: false }],
    },
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { prompt: "", options: [{ answer: "", isCorrect: false }] },
    ]);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ answer: "", isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleInputChange = (
    value,
    questionIndex,
    optionIndex = null,
    field
  ) => {
    const newQuestions = [...questions];
    if (optionIndex === null) {
      newQuestions[questionIndex][field] = value;
    } else {
      newQuestions[questionIndex].options[optionIndex][field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleFormSubmit = async () => {
    try {
      const quizDocRef = doc(FIREBASE_DB, "quiz", id);
      const quizDoc = await getDoc(quizDocRef);

      if (quizDoc.exists()) {
        const existingData = quizDoc.data();
        console.log("Existing Data: ", existingData);

        const existingQuestions = existingData.questions || [];
        console.log("Existing Questions: ", existingQuestions);

        const updatedQuestions = [...existingQuestions, ...questions];
        console.log("Updated Questions: ", updatedQuestions);

        await updateDoc(quizDocRef, { questions: updatedQuestions });

        Alert.alert(
          "Quiz Submitted",
          "Your quiz has been submitted successfully."
        );
        router.push("quiz/allQuiz");
      } else {
        Alert.alert("Error", "Quiz not found.");
      }
    } catch (e) {
      console.error("Error submitting quiz: ", e);
      Alert.alert(
        "Error",
        "There was an error submitting the quiz. Please try again."
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {questions.map((question, questionIndex) => (
          <View key={questionIndex} style={styles.questionContainer}>
            <Text>Question {questionIndex + 1}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                handleInputChange(value, questionIndex, null, "prompt")
              }
              value={question.prompt}
              placeholder="Enter question"
            />
            {errors.questions?.[questionIndex]?.prompt && (
              <Text style={styles.errorText}>This is required.</Text>
            )}
            <Text>Options:</Text>
            {question.options.map((option, optionIndex) => (
              <View key={optionIndex} style={styles.optionContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) =>
                    handleInputChange(
                      value,
                      questionIndex,
                      optionIndex,
                      "answer"
                    )
                  }
                  value={option.answer}
                  placeholder="Enter answer"
                />
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() =>
                    handleInputChange(
                      !option.isCorrect,
                      questionIndex,
                      optionIndex,
                      "isCorrect"
                    )
                  }
                >
                  <CheckBox
                    value={option.isCorrect}
                    onValueChange={() =>
                      handleInputChange(
                        !option.isCorrect,
                        questionIndex,
                        optionIndex,
                        "isCorrect"
                      )
                    }
                    style={styles.checkbox}
                  />
                  <Text>{option.isCorrect ? "Correct" : "Incorrect"}</Text>
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.buttonRow}>
              <Button
                title="Add Option"
                onPress={() => handleAddOption(questionIndex)}
                color="#004643"
              />
              <Button
                title="Add Question"
                onPress={handleAddQuestion}
                color="#004643"
              />
            </View>
          </View>
        ))}
        <Button
          title="Submit Quiz"
          onPress={handleSubmit(handleFormSubmit)}
          color="#004643"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  questionContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  errorText: {
    color: "red",
  },
});
export default QuizQuestionsForm;
