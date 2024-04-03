import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { useEffect, useState } from 'react'
import { Text, View } from '@/components/Themed';
import STTButton from '@/components/STTButton'; // Adjust the import path based on your file structure
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, ListItem, Icon } from 'react-native-elements';

export default function PrepareScreen() {
  // const [sceneId, setSceneId] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();
  const { projectId, sceneId } = params;
  useEffect(() => {
    console.log(sceneId)
    
  }, [sceneId])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Lines for { sceneId }</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <STTButton /> 
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
    </View>
  );
}

// Your existing styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});