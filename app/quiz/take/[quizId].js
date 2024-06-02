import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Option from "../../../components/Option";
import { useEffect, useState } from "react";
import Results from "../../../components/Results";
import { useLocalSearchParams } from "expo-router";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";

export default function Quiz() {
  const { quizId } = useLocalSearchParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkIfSelected, setCheckIfSelected] = useState([]);
  const [percentageComplete, setPercentageComplete] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const quizDoc = await getDoc(doc(FIREBASE_DB, "quiz", quizId));
        if (quizDoc.exists()) {
          const questionsData = quizDoc.data().questions || [];
          setQuestions(questionsData);
          setCheckIfSelected(
            new Array(questionsData[0]?.options.length).fill(false)
          );
        } else {
          console.log("Quiz not found");
        }
      } catch (error) {
        console.error("Error fetching quiz: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    if (questions.length > 0) {
      setPercentageComplete(
        ((currentQuestionIndex + 1) / questions.length) * 100
      );
      setCheckIfSelected(
        new Array(questions[currentQuestionIndex]?.options.length).fill(false)
      );
    }
  }, [currentQuestionIndex, questions.length]);

  const handleNext = () => {
    let correctAnswer = questions[currentQuestionIndex]?.options.find(
      (option) => option.isCorrect
    )?.answer;

    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevQuestion) => prevQuestion + 1);
      setCheckIfSelected(
        new Array(questions[currentQuestionIndex + 1]?.options.length).fill(
          false
        )
      );
    } else {
      setShowResult(true);
    }

    setSelectedOption("");
  };

  const handleOptionSelect = (option, index) => {
    setSelectedOption(option.answer);
    const newCheckIfSelected = new Array(
      questions[currentQuestionIndex]?.options.length
    ).fill(false);
    newCheckIfSelected[index] = true;
    setCheckIfSelected(newCheckIfSelected);
  };

  const restart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setCheckIfSelected(new Array(questions[0]?.options.length).fill(false));
  };

  if (loading) return <Text>Loading...</Text>;
  if (showResult) {
    return (
      <Results
        restart={restart}
        score={score}
        totalQuestions={questions.length}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View style={styles.countwrapper}>
          <Text style={{ fontWeight: "600" }}>
            {currentQuestionIndex + 1}/{questions.length}
          </Text>
        </View>

        <View style={styles.questionwrapper}>
          <View style={styles.progresswrapper}>
            <View
              style={[styles.progressBar, { width: `${percentageComplete}%` }]}
            ></View>
            <View style={styles.progresscount}>
              <Text style={styles.percentage}>{percentageComplete}%</Text>
            </View>
          </View>

          <Text style={{ fontWeight: "500", textAlign: "center" }}>
            {currentQuestion?.prompt}
          </Text>
        </View>

        <View style={styles.optionswrapper}>
          {currentQuestion?.options.map((option, index) => (
            <Option
              key={index}
              setSelectedOption={() => handleOptionSelect(option, index)}
              isSelected={checkIfSelected[index]}
              option={option.answer}
            />
          ))}
        </View>

        <Pressable onPress={handleNext} style={styles.btn}>
          <Text style={{ color: "white", fontWeight: "600" }}>Next</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e4e4",
    padding: 20,
  },
  countwrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  questionwrapper: {
    marginTop: 60,
    width: "100%",
    height: 180,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    alignItems: "center",
  },
  progresswrapper: {
    width: 70,
    height: 70,
    backgroundColor: "#ABD1C6",
    borderRadius: 50,
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    marginBottom: 30,
    marginTop: -50,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#004643",
    alignSelf: "flex-end",
  },
  progresscount: {
    height: 58,
    width: 58,
    borderRadius: 50,
    backgroundColor: "#fff",
    zIndex: 10,
    position: "absolute",
    top: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  percentage: {
    fontWeight: "600",
    fontSize: 18,
    color: "#004643",
  },
  optionswrapper: {
    marginTop: 40,
    width: "100%",
  },
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 16,
    backgroundColor: "#004643",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
