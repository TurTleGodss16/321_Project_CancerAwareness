/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom radio button component
const RadioButton = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onSelect}>
      <View style={[styles.radioButtonCircle, selected && styles.radioButtonSelected]} />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const SurveyScreen = ({ navigation }) => {
  const [responses, setResponses] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState([true, false, false, false, false]);

  // Define scores for each question
  const scores = {
    'Question 1': 35,
    'Question 2': 10,
    'Question 3': 35,
    'Question 4': 15,
    'Question 5': 5,
  };

  // Questions array
  const questions = [
    '1. Do any of your immediate family members (parents, siblings) have a history of cancer?',
    '2. Do you engage in regular physical activity or exercise?',
    '3. Do you currently smoke or have you smoked in the past?',
    '4. Do you frequently expose your skin to sunlight without protection?',
    '5. Do you often feel fatigued or weak?',
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
      if (question === 'Question 2') {
          if (answer === 'No') {
            totalScore += scores[question];
          }
        }
      else {
        if (answer === 'Yes') {
          totalScore += scores[question];
        }
      }
    }
    return totalScore;
  };

  // Function to handle submit button press
  const handleSubmit = () => {
    const totalScore = calculateTotalScore();
    navigation.navigate('Result', { totalScore });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {questions.map((question, index) => (
          visibleQuestions[index] && (
            <View key={index} style={styles.questionContainer}>
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#335e90',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    color: '#335e90',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bce08a',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#bce08a',
  },
  radioButtonLabel: {
    fontSize: 16,
    color: '#335e90',
  },
  submitButton: {
    backgroundColor: '#ff914d',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SurveyScreen;
