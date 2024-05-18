/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigator from './BottomNavigator'; // Ensure the path is correct

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
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const scores = {
    'Question 1': 35,
    'Question 2': 10,
    'Question 3': 35,
    'Question 4': 15,
    'Question 5': 5,
  };

  const questions = [
    '1. Do any of your immediate family members (parents, siblings) have a history of cancer?',
    '2. Do you engage in regular physical activity or exercise?',
    '3. Do you currently smoke or have you smoked in the past?',
    '4. Do you frequently expose your skin to sunlight without protection?',
    '5. Do you often feel fatigued or weak?',
  ];

  const handleResponse = (question, answer) => {
    setResponses({ ...responses, [question]: answer });
  };

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

  const calculateTotalScore = () => {
    let totalScore = 0;
    for (const [question, answer] of Object.entries(responses)) {
      if (question === 'Question 2') {
        if (answer === 'No') {
          totalScore += scores[question];
        }
      } else {
        if (answer === 'Yes') {
          totalScore += scores[question];
        }
      }
    }
    return totalScore;
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();
    setTotalScore(totalScore);
    setShowResult(true);
  };

  const renderResult = () => {
    if (totalScore < 60) {
      return (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Based on your answers you may be less predisposed to Cancer.</Text>
          <TouchableOpacity style={styles.resultButton} onPress={() => navigation.navigate('Main')}>
            <Text style={styles.resultButtonText}>Go to Main Page</Text>
          </TouchableOpacity>
          <Text style={styles.articleLinksHeader}>Recommended Articles:</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CancerDefinitions')}>
            <Text style={styles.articleLink}>What is Cancer?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CancerTypes')}>
            <Text style={styles.articleLink}>Types of Cancer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Causes')}>
            <Text style={styles.articleLink}>Causes of Cancer</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Based on your answers you may be predisposed to Cancer.</Text>
          <TouchableOpacity style={styles.resultButton} onPress={() => navigation.navigate('NearByClinic')}>
            <Text style={styles.resultButtonText}>Find Nearby Clinic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resultButton} onPress={() => navigation.navigate('Main')}>
            <Text style={styles.resultButtonText}>Go to Main Page</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {showResult ? (
        renderResult()
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Health Survey</Text>
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
      )}
      <View style={styles.bottomNavigatorContainer}>
        <BottomNavigator />
      </View>
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
    paddingBottom: 80, // Ensure there is space for the bottom navigator
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
  resultContainer: {
    padding: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#335e90',
    textAlign: 'center',
  },
  resultButton: {
    backgroundColor: '#ff914d',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  resultButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleLinksHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#335e90',
    textAlign: 'center',
  },
  articleLink: {
    color: '#D37506',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomNavigatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SurveyScreen;
