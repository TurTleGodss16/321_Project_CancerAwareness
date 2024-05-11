import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const SurveyScreen = ({navigation}) => {
  const [responses, setResponses] = useState({});

  // Function to handle user response for a question
  const handleResponse = (question, answer) => {
    setResponses({...responses, [question]: answer});
  };

  // Function to handle submit button press
  const handleSubmit = () => {
    console.log('User Responses:', responses);

    // navigation.navigate('Result', {responses});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Question 1:</Text>
      {/* Yes and No buttons for Question 1 */}
      <Button title="Yes" onPress={() => handleResponse('Question 1', 'Yes')} />
      <Button title="No" onPress={() => handleResponse('Question 1', 'No')} />

      <Text style={styles.question}>Question 2:</Text>
      <Button title="Yes" onPress={() => handleResponse('Question 2', 'Yes')} />
      <Button title="No" onPress={() => handleResponse('Question 2', 'No')} />

      <Text style={styles.question}>Question 3:</Text>
      <Button title="Yes" onPress={() => handleResponse('Question 3', 'Yes')} />
      <Button title="No" onPress={() => handleResponse('Question 3', 'No')} />

      {/* Submit button */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
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
});

export default SurveyScreen;
