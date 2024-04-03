

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList,  } from 'react-native';
import { useAppContext } from '@/context/AppContext'; 
import { Button, ListItem, Icon } from 'react-native-elements';
import { fetchProjects, fetchScenes } from '@/services/databaseService'

import ModalContainer from '@/components/ModalContainer';


export default function ScriptScreen() {
  const { activeProject, setActiveProject, newProjectVisible, setActiveScene } = useAppContext();
  const [expandedProject, setExpandedProject] = useState('');
  const [projects, setProjects] = useState([]);  // Define projects state


  useEffect(() => {
    fetchProjects()
      .then(titles => {
        setProjects(titles.map(project => ({ ...project, scenes: [] }))); // Initialize projects with empty scenes
      })
      .catch(error => {
        console.error('Error fetching project titles:', error);
      });
  }, [newProjectVisible]);

  const handleScenePress = (projectId, sceneId) => {
    console.log("projectId", projectId, "sceneId", sceneId);
    setActiveProject(projectId);
    setActiveScene(sceneId);
    
  }

  const toggleExpand = (projectId) => {
    console.log("EXPAND! projectId", projectId, "activeProject", activeProject, "expandedProject", expandedProject);
    if (projectId !== expandedProject) {
      console.log("EXPANSION REQUIRED");
      setExpandedProject(projectId);
      if (projectId !== activeProject) {
        setActiveProject(projectId);
        fetchScenes(projectId)
          .then(fetchedProjects => {
            console.log("projects", fetchedProjects);
            setProjects(currentProjects =>
              currentProjects.map(project =>
                project.projectId === projectId ? { ...project, scenes: fetchedProjects } : project
              )
            );
          })
          .catch(error => {
            console.error('Error fetching projects:', error);
          });
      }
    } else {
      console.log("CONTRACTION REQUIRED");
      setExpandedProject('');
    }
  }
  

  return (
    <View style={styles.container}>
      <ModalContainer />

      <FlatList
        data={projects}
        keyExtractor={(item) => item.projectId.toString()}
        renderItem={({ item }) => (
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expandedProject === item.projectId}
            onPress={() => toggleExpand(item.projectId)}
          >
            {item.scenes && item.scenes.map((scene, index) => (
              <ListItem key={index} bottomDivider onPress = {() => handleScenePress(item.projectId, scene.sceneId)}>
                <ListItem.Content>
                  <ListItem.Title>{scene.title}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});