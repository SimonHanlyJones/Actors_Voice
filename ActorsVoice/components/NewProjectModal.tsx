import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button, Overlay, Input } from 'react-native-elements';
import { useAppContext } from '@/context/AppContext';
import { fetchProjects, addProject, addScene } from '@/services/databaseService';
import { Picker } from '@react-native-picker/picker';


export default function NewProjectModal() {
  const { newProjectVisible, setNewProjectVisible, toggleNewSceneOverlay, activeProject, setActiveProject, toggleNewProjectOverlay } = useAppContext();
  const [newProject, setNewProject] = useState('');


  const addProjecttoDatabase = (newProject) => {
    addProject(newProject)
      .then((projectId) => {
        console.log("added: ", newProject, "with ID:", projectId);
        setActiveProject(projectId);
      })
      .catch(error => console.error("Error adding project:", error));
  
    setNewProjectVisible(false);
  }


  
  return (
    <View style={styles.container}>
      <Overlay isVisible={newProjectVisible} onBackdropPress={toggleNewProjectOverlay}>
        <Text style={styles.title}>New Project</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Input
          placeholder="New Project Name"
          leftIcon={{ type: 'font-awesome', name: 'plus' }}
          // style={styles}
          onChangeText={(value) => setNewProject(value)}
        />

        <Button
          title = "Add Project"
          onPress={() => addProjecttoDatabase(newProject)}
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
