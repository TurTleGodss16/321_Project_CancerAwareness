import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom radio button component
const RadioButton = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onSelect}>
      <View style={[styles.radioButtonCircle, selected && styles.radioButtonSelected]} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const SurveyScreen = ({ navigation }) => {
  const [responses, setResponses] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState([true, false, false, false, false]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Define scores for each question
  const scores = {
    'Question 1': 35,
    'Question 2': 10,
    'Question 3': 35,
    'Question 4': 15,
    'Question 5': 5
  };

  // Questions array
  const questions = [
    '1. Do any of your immediate family members (parents, siblings) have a history of cancer?',
    '2. Do you engage in regular physical activity or exercise?',
    '3. Do you currently smoke or have you smoked in the past?',
    '4. Do you frequently expose your skin to sunlight without protection?',
    '5. Do you often feel fatigued or weak?'
  ];

  // Function to handle user response for a question
  const handleResponse = (question, answer) => {
    setResponses({ ...responses, [question]: answer });
  };

  // Update visibility of questions based on responses
  useEffect(() => {
    const updatedVisibility = [true];
    for (let i = 1; i < questions.length; i++) {
      const prevQuestion = `Question ${i}`;
      const currQuestion = `Question ${i + 1}`;
      if (responses[prevQuestion] !== undefined) {
        updatedVisibility.push(true);
      } else {
        updatedVisibility.push(false);
      }
    }
    setVisibleQuestions(updatedVisibility);
  }, [responses]);

  // Function to calculate total score
  const calculateTotalScore = () => {
    let totalScore = 0;
    for (const [question, answer] of Object.entries(responses)) {
      if (answer === 'Yes') {
        totalScore += scores[question];
      }
    }
    return totalScore;
  };

  // Function to handle submit button press
  const handleSubmit = () => {
    console.log('User Responses:', responses);
    const totalScore = calculateTotalScore();
    if (totalScore >= 60) {
      navigation.navigate('BookingScreen'); // Navigate to booking screen if score is 60 or above
    } else {
      navigation.navigate('MainScreen'); // Navigate to main screen if score is below 60
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Render questions based on visibility */}
        {questions.map((question, index) => (
          visibleQuestions[index] && (
            <View key={index}>
              <Text style={styles.question}>{question}</Text>
              <View style={styles.buttonGroup}>
                <RadioButton
                  label="Yes"
                  selected={responses[`Question ${index + 1}`] === 'Yes'}
                  onSelect={() => handleResponse(`Question ${index + 1}`, 'Yes')}
                />
                <RadioButton
                  label="No"
                  selected={responses[`Question ${index + 1}`] === 'No'}
                  onSelect={() => handleResponse(`Question ${index + 1}`, 'No')}
                />
              </View>
            </View>
          )
        ))}

        {/* Submit button */}
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
  radioButtonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue', // Change border color as needed
    marginRight: 5,
  },
  radioButtonSelected: {
    backgroundColor: 'blue', // Change color as needed
  },
});

export default SurveyScreen;
