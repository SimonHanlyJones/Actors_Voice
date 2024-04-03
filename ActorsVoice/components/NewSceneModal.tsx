import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button, Overlay, Input } from 'react-native-elements';
import { useAppContext } from '@/context/AppContext';
import { fetchProjects, addScript, addScene } from '@/services/databaseService';
import { Picker } from '@react-native-picker/picker';


export default function NewSceneModal() {
  const { newSceneVisible, setNewSceneVisible, setNewProjectVisible, toggleNewSceneOverlay, activeProject, setActiveProject } = useAppContext();
  const [newProject, setNewProject] = useState('');
  const [newScene, setNewScene] = useState('');
  const [availableProjects, setAvailableProjects] = useState([]);

  useEffect(() => {
    if (newSceneVisible){

        setNewProject(activeProject)
        fetchProjects().then(setAvailableProjects);
        console.log("newSceneVisible", newSceneVisible);

    }
  }, [newSceneVisible])
  useEffect(() => {
    console.log("availableProjects", availableProjects);
    
  }, [availableProjects])


  const addScenetoDatabase = (newScene) => {
    if (newScene){
      console.log("activeProject", activeProject, "newScene", newScene);
      addScene(activeProject, newScene);
      setNewSceneVisible(false);

    }
    
  }
  
  return (
    <View style={styles.container}>
      <Overlay isVisible={newSceneVisible} onBackdropPress={toggleNewSceneOverlay}>
        <Text style={styles.title}>New Scene</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Picker
          selectedValue={activeProject ? activeProject.toString() : ''}
          onValueChange={(itemValue, itemIndex) => setActiveProject(itemValue)}
        >
          {availableProjects.map(({ projectId, title }) => (
            <Picker.Item label={title} value={ projectId.toString() } key={projectId} />
          ))}
        </Picker>
        <Button
          title = "Add Project"
          onPress={() => setNewProjectVisible(true)}
        />
        <Input
          placeholder="New Scene Name"
          leftIcon={{ type: 'font-awesome', name: 'plus' }}
          // style={styles}
          onChangeText={(value) => setNewScene(value)}
        />

        <Button
          title = "Add Scene"
          onPress={() => addScenetoDatabase(newScene)}
        />
        

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'left',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
