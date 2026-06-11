import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Ayırdığımız bağımsız ekran dosyalarını ana köprüye (App.js) import ediyoruz
import Giris from './Sayfalar/Giris';
import HavaDurumu from './Sayfalar/HavaDurumu';
import ToDoList from './Sayfalar/ToDoList';

const Stack = createNativeStackNavigator();
//Ana navigasyon yapısı
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Profil Oluştur"
        screenOptions={{
          headerStyle: { backgroundColor: '#3182ce' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShadowVisible: false
        }}
      >
        {/* 1. Ekran */}
        <Stack.Screen name="Profil Oluştur" component={Giris} options={{ title: 'Giriş Yap' }} />
        
        {/* 2. Ekran */}
        <Stack.Screen name="Hava Durumu" component={HavaDurumu} options={{ title: 'Canlı Hava Durumu' }} />
        
        {/* 3. Ekran*/}
        <Stack.Screen name="Seyahat Notları" component={ToDoList} options={{ title: 'Planlarım' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}