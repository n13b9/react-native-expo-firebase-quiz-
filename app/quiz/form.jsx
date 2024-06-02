import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { FIREBASE_DB } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const QuizForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const quizData = { ...data, questions: [] };

    console.log(quizData);

    try {
      const docRef = await addDoc(collection(FIREBASE_DB, "quiz"), quizData);
      Alert.alert("Quiz Created", "Now add questions to your quiz.");
      router.push(`quiz/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert(
        "Error",
        "There was an error creating the quiz. Please try again."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create a New Quiz</Text>

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.quizName && { borderColor: "red" }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Quiz Name"
          />
        )}
        name="quizName"
        defaultValue=""
      />
      {errors.quizName && <Text style={styles.error}>This is required.</Text>}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.description && { borderColor: "red" }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Description"
          />
        )}
        name="description"
        defaultValue=""
      />
      {errors.description && (
        <Text style={styles.error}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.points && { borderColor: "red" }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Points/Grading System"
          />
        )}
        name="points"
        defaultValue=""
      />
      {errors.points && <Text style={styles.error}>This is required.</Text>}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.timeLimit && { borderColor: "red" }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Time Limit (minutes)"
            keyboardType="numeric"
          />
        )}
        name="timeLimit"
        defaultValue=""
      />
      {errors.timeLimit && <Text style={styles.error}>This is required.</Text>}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Create Quiz</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#004643",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default QuizForm;
