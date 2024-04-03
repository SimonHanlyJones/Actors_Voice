import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ThemeProvider as ElementsThemeProvider } from 'react-native-elements';
import theme from '@/components/ElementsTheme'
import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

import { useAppContext } from '@/context/AppContext'; 

import { AppProvider } from '@/context/AppContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/ScriptManager',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
 

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <AppProvider>
        <RootLayoutNav />
        
      </AppProvider>  
    );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { toggleNewSceneOverlay, toggleNewProjectOverlay } = useAppContext();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ElementsThemeProvider theme={ theme }>
        <Stack>
          <Stack.Screen name="ScriptManager" 
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
          
          
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        </Stack>
      </ElementsThemeProvider>
    </ThemeProvider>
  );
}
