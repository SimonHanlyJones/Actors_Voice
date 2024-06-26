import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import STTButton from '@/components/STTButton'; // Adjust the import path based on your file structure

export default function EditScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab Two</Text> */}
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