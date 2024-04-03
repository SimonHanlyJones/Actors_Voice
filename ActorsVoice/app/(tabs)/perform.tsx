// STTButton.js
import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import Voice from '@react-native-voice/voice';

export default function PerformScreen() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    // Function to handle the result of voice recognition
    const onSpeechResults = (event) => {
      setText(event.value[0]); // Update the text with the first result
      console.log(event.value[0]);
    };

    Voice.onSpeechResults = onSpeechResults;

    return () => {
      // Clean up the listener when the component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US'); // Start voice recognition
      setIsListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop(); // Stop voice recognition
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
        <Text>I am a recording device</Text>
        <Button title={isListening ? "Stop Listening" : "Start Listening"} onPress={isListening ? stopListening : startListening} />
        <Text>{text}</Text>
    </View>
  );
};


