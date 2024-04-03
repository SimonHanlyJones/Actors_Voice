import React, { createContext, useState, useEffect, useContext } from 'react';


const AppContext = createContext();
import { initialiseDatabase } from '@/services/databaseService'; // Adjust the path to your service file

export const AppProvider = ({ children }) => {
    // useEffect(() => {
    //   initialiseDatabase();
    // }, []);

    const [newSceneVisible, setNewSceneVisible] = useState(false);
    const [newProjectVisible, setNewProjectVisible] = useState(false);
    const toggleNewProjectOverlay = () => {
      console.log("new project modal", !newProjectVisible);
      setNewProjectVisible(!newProjectVisible);
    };
    const toggleNewSceneOverlay = () => {
      console.log("new scene modal", !newSceneVisible);
      setNewSceneVisible(!newSceneVisible);
    };
    

    const [activeProject, setActiveProject] = useState(null); // Store the active script
    const [activeScene, setActiveScene] = useState(null);  // Store the active scene
    const [isListening, setIsListening] = useState(false); 
    const [isSpeaking, setIsSpeaking] = useState(false); 
  
    const value = {
      newProjectVisible, setNewProjectVisible,
      toggleNewProjectOverlay,
      newSceneVisible, setNewSceneVisible,
      toggleNewSceneOverlay,
      activeProject, setActiveProject,
      activeScene, setActiveScene,
      isListening, setIsListening,
      isSpeaking, setIsSpeaking,
    };
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);