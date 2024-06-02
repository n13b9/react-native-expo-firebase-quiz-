import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Option = ({ option, isSelected, setSelectedOption }) => {
  return (
    <TouchableOpacity
      onPress={setSelectedOption}
      activeOpacity={0.8}
      style={[
        styles.option,
        { backgroundColor: isSelected ? "#ABD1C6" : "#FFF" },
      ]}
    >
      <Text style={{ fontWeight: "500" }}>{option}</Text>
    </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
  option: {
    width: "100%",
    height: 45,
    borderRadius: 16,
    paddingHorizontal: 12,
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
});
