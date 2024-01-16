import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';

export default function App() {

  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState(`${AudioUtils.DocumentDirectoryPath}/test.aac`);
  const [hasRecorded, setHasRecorded] = useState(false);

  const prepareRecordingPath = () => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
    });
  };

  const startRecording = async () => {
    if (isRecording) {
      await AudioRecorder.stopRecording();
      setIsRecording(false);
      setHasRecorded(true);
    } else {
      prepareRecordingPath();
      try {
        await AudioRecorder.startRecording();
        setIsRecording(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const playRecording = () => {
    const sound = new Sound(audioPath, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      sound.play();
    });
  };

  return (
    <View style={styles.container}>
      <Text>This is a test</Text>
      <View>
        <Button title={isRecording ? 'Stop Recording' : 'Start Recording'} onPress={startRecording} />
        {hasRecorded && (
        <View>
          <Text>Play your recording:</Text>
          <Button title="Play" onPress={playRecording} />
        </View>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
