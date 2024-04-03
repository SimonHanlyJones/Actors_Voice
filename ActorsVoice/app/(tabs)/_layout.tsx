import React, {useEffect, useState} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';


import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

import { useAppContext } from '@/context/AppContext'; 
import { Button } from 'react-native-elements';
import { useNavigate } from 'expo-router';





// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  const { toggleNewSceneOverlay, toggleNewProjectOverlay } = useAppContext();
  
  
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      {/* <Tabs.Screen
        name="index"
        options={{
          title: 'Scripts',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <View>
              <Pressable onPress={toggleNewProjectOverlay}>
                {({ pressed }) => (
                  <Text
                  style={{
                    color: Colors[colorScheme ?? 'light'].text,
                    opacity: pressed ? 0.5 : 1,
                    marginRight: 15,
                    fontSize: 18, // Adjust font size as needed
                  }}
                >
                Add New Project
                </Text>
                  )}
              </Pressable>
              <Pressable onPress={toggleNewSceneOverlay}>
                {({ pressed }) => (
                  <Text
                  style={{
                    color: Colors[colorScheme ?? 'light'].text,
                    opacity: pressed ? 0.5 : 1,
                    marginRight: 15,
                    fontSize: 18, // Adjust font size as needed
                  }}
                >
                Add New Scene
                </Text>
                  )}
              </Pressable>
            </View>
          ),
        }
      }
      /> */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Prepare',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerLeft:() => (
            <View>
              <Link href="/ScriptManager" style={{ padding: 10 }}>
              <FontAwesome name="arrow-left" size={24} color="white" />
              </Link>
            </View>
            

          )
        }}
      />
      <Tabs.Screen
          name="edit"
          options={{
            title: 'Edit',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
      />
      <Tabs.Screen
        name="perform"
        options={{
          title: 'Perform',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
