import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { useAppContext } from '@/context/AppContext';
import NewSceneModal from '@/components/NewSceneModal';
import NewProjectModal from '@/components/NewProjectModal';

export default function ModalContainer() {
  const { newSceneVisible, newProjectVisible } = useAppContext();
  return (
    <View>
      {newProjectVisible && <NewProjectModal />}
      {newSceneVisible && <NewSceneModal />}
      
    </View>
  );
}

