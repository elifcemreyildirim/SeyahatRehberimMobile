import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles, COLORS } from '../Styles';

export default function Giris({ navigation }) {
  // Kullanıcının input alanlarına yazdığı verileri anlık olarak hafızada tutmak
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');

  // Veri tabanı kayıt fonksiyonuve veri validasyonu
  const handleSaveProfile = async () => {
    if (!username.trim() || !city.trim()) {
      alert('Lütfen seyahat planı için tüm alanları doldurun! 📑');
      return;
    }
    try {
      await AsyncStorage.setItem('@username', username.trim());
      await AsyncStorage.setItem('@target_city', city.trim());
      navigation.navigate('Hava Durumu');
    } catch (error) {
      console.log('Veri kaydedilirken hata oluştu:', error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* klavye açıldığında input alanları yukarı kaydırır. */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={globalStyles.innerContainer}
      >
        <View style={localStyles.circleTop} />
        
        <View style={globalStyles.card}>
          <View style={localStyles.headerArea}>
            <Text style={localStyles.logoIcon}>✈️</Text>
            <Text style={globalStyles.mainTitle}>Seyahat Rehberim</Text>
            <Text style={globalStyles.subtitle}>Macerana başlamak için profilini oluştur</Text>
          </View>
{/* 1. INPUT GRUBU: AD SOYAD */}
          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.inputLabel}>Adınız Soyadınız</Text>
            <TextInput 
              style={globalStyles.input} 
              placeholder="Örn: Elif Cemre Yıldırım" 
              placeholderTextColor={COLORS.textMuted}
              value={username}// Inputun içindekini username state'ine bağlar
              onChangeText={setUsername}
            />
          </View>
{/* 2. INPUT GRUBU: Hedef Şehir */}
          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.inputLabel}>Hedef Şehir</Text>
            <TextInput 
              style={globalStyles.input} 
              placeholder="Örn: Tokyo" 
              placeholderTextColor={COLORS.textMuted}
              value={city}// Inputun içindekini city state'ine bağlar
              onChangeText={setCity}
            />
          </View>

          <TouchableOpacity  
            style={globalStyles.button} 
            onPress={handleSaveProfile}// Butona basıldığında veri tabanı kayıt fonksiyonu çalışır.
            activeOpacity={0.8}
          >
            <Text style={globalStyles.buttonText}>Profili Kaydet ve Keşfet ✨</Text>
          </TouchableOpacity>
        </View>

        <View style={localStyles.circleBottom} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// StyleSheet kullanarak stilleri optimize ettik
const localStyles = StyleSheet.create({
  circleTop: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ebf8ff',
    zIndex: -1 // Arkada kalmasını sağlar
  },
  circleBottom: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#feebc8',
    opacity: 0.5,
    zIndex: -1
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: 30
  },
  logoIcon: {
    fontSize: 44,
    marginBottom: 10
  }
});