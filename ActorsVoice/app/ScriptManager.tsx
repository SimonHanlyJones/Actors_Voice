

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList,  } from 'react-native';
import { useAppContext } from '@/context/AppContext'; 
import { Button, ListItem, Icon } from 'react-native-elements';
import { fetchProjects, fetchScenes } from '@/services/databaseService'

import ModalContainer from '@/components/ModalContainer';

import { useNavigation  } from "expo-router";
import { Link, useLocalSearchParams } from "expo-router";




export default function ScriptManagerScreen() {
  const { activeProject, setActiveProject, newProjectVisible, newSceneVisible, setActiveScene } = useAppContext();
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

  useEffect(() => {
    setExpandedProject('')
    
  }, [newProjectVisible, newSceneVisible]);

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
              <Link href={{
                pathname: "/(tabs)",
                params: {projectIf: item.projectId,sceneId: scene.sceneId},
              }}
                onPress={() => handleScenePress(item.projectId, scene.sceneId)}>
                <ListItem key={index} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{scene.title}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </Link>
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