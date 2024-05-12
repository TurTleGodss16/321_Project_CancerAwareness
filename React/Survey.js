import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom radio button component
const RadioButton = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onSelect}>
      <Text>{label}</Text>
      {selected && <View style={styles.radioButtonSelected} />}
    </TouchableOpacity>
  );
};

const SurveyScreen = ({ navigation }) => {
  const [responses, setResponses] = useState({});

  // Function to handle user response for a question
  const handleResponse = (question, answer) => {
    setResponses({ ...responses, [question]: answer });
  };

  // Function to handle submit button press
  const handleSubmit = () => {
    console.log('User Responses:', responses);
    // navigation.navigate('Result', {responses});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.question}>
          1. Do any of your immediate family members (parents, siblings) have a history of cancer?{' '}
        </Text>
        {/* Yes and No buttons for Question 1 */}
        <View style={styles.buttonGroup}>
          <RadioButton
            label="Yes"
            selected={responses['Question 1'] === 'Yes'}
            onSelect={() => handleResponse('Question 1', 'Yes')}
          />
          <RadioButton
            label="No"
            selected={responses['Question 1'] === 'No'}
            onSelect={() => handleResponse('Question 1', 'No')}
          />
        </View>

        {/* Question 2 */}
        <Text style={styles.question}>
          2. Do you engage in regular physical activity or exercise?
        </Text>
        <View style={styles.buttonGroup}>
          <RadioButton
            label="Yes"
            selected={responses['Question 2'] === 'Yes'}
            onSelect={() => handleResponse('Question 2', 'Yes')}
          />
          <RadioButton
            label="No"
            selected={responses['Question 2'] === 'No'}
            onSelect={() => handleResponse('Question 2', 'No')}
          />
        </View>

        {/* Question 3 */}
        <Text style={styles.question}>
          3. Do you currently smoke or have you smoked in the past?{' '}
        </Text>
        <View style={styles.buttonGroup}>
          <RadioButton
            label="Yes"
            selected={responses['Question 3'] === 'Yes'}
            onSelect={() => handleResponse('Question 3', 'Yes')}
          />
          <RadioButton
            label="No"
            selected={responses['Question 3'] === 'No'}
            onSelect={() => handleResponse('Question 3', 'No')}
          />
        </View>

        <Text style={styles.question}>
          4. Do you frequently expose your skin to sunlight without protection?{' '}
        </Text>
        <View style={styles.buttonGroup}>
          <RadioButton
            label="Yes"
            selected={responses['Question 4'] === 'Yes'}
            onSelect={() => handleResponse('Question 4', 'Yes')}
          />
          <RadioButton
            label="No"
            selected={responses['Question 4'] === 'No'}
            onSelect={() => handleResponse('Question 4', 'No')}
          />
        </View>

        <Text style={styles.question}>
          5. Do you often feel fatigued or weak?{' '}
        </Text>
        <View style={styles.buttonGroup}>
          <RadioButton
            label="Yes"
            selected={responses['Question 5'] === 'Yes'}
            onSelect={() => handleResponse('Question 5', 'Yes')}
          />
          <RadioButton
            label="No"
            selected={responses['Question 5'] === 'No'}
            onSelect={() => handleResponse('Question 5', 'No')}
          />
        </View>

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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue', // Change color as needed
    marginLeft: 10,
  },
});

export default SurveyScreen;
