import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Ortak tasarım havuzumuzu ve renk paletimizi içeri aktarıyoruz
import { globalStyles, COLORS } from '../Styles';

// 2. EKRAN: HAVA DURUMU VE ŞEHİR REHBERİ (API)
export default function HavaDurumu({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [savedUser, setSavedUser] = useState('');
  const [savedCity, setSavedCity] = useState('');
  const [apiData, setApiData] = useState(null);

  // useEffect hook, sayfa telefonda ilk açıldığında otomatik tetiklenir
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // 1. ADIM: Yerel veri tabanından giriş bilgilerini okuyor
        const user = await AsyncStorage.getItem('@username');
        const city = await AsyncStorage.getItem('@target_city');
        setSavedUser(user || 'Gezgin');
        setSavedCity(city || 'Bilinmeyen Şehir');

        // 2. ADIM: API entegrasyonu. 
        // Open-Meteo kamu API'sinden meteoroloji verilerini çekiyor
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current_weather=true`);
        const json = await response.json();
        
        // API'den gelen güncel hava durumunu state'e kaydediyoruz
        setApiData(json.current_weather);
        
        // Yükleniyor Loader kapatıyoruz
        setLoading(false);
      } catch (error) {
        console.log('Veri tabanı veya API hatası oluştu:', error);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // İnternetten veri çekilirken yükleniyor halkası
  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.textMuted }}>Canlı API Verileri Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.innerContainer}>
        
        {/* Ortak stilden gelen gölgeli kart yapısı */}
        <View style={globalStyles.card}>
          
          {/* Karşılama Alanı */}
          <Text style={localStyles.welcomeText}>Merhaba, {savedUser}! 👋</Text>
          <Text style={localStyles.infoText}>
            Hedef Şehriniz: <Text style={{ fontWeight: 'bold', color: COLORS.accent }}>{savedCity}</Text>
          </Text>
          
          {/* API Verilerinin Listelendiği Alan */}
          <View style={globalStyles.infoBox}>
            <Text style={localStyles.apiTitle}>🌤️ Bölgesel Anlık Hava Durumu (API)</Text>
            {apiData ? (
              <View style={{ marginTop: 5 }}>
                <Text style={localStyles.apiResult}>🌡️ Sıcaklık: {apiData.temperature}°C</Text>
                <Text style={localStyles.apiResult}>💨 Rüzgar Hızı: {apiData.windspeed} km/s</Text>
                <Text style={localStyles.apiResult}>🧭 Yön: {apiData.winddirection}°</Text>
              </View>
            ) : (
              <Text style={{ color: COLORS.accent }}>API bağlantısı başarısız oldu.</Text>
            )}
          </View>

          {/* İkincil aksiyon butonu */}
          <TouchableOpacity 
            style={[globalStyles.button, { backgroundColor: COLORS.secondary, shadowColor: COLORS.secondary }]} 
            onPress={() => navigation.navigate('Seyahat Notları')}
            activeOpacity={0.8}
          >
            <Text style={globalStyles.buttonText}>Seyahat Notlarıma Git 📝</Text>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

// Sadece bu sayfaya özel tasarım
const localStyles = {
  welcomeText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: COLORS.textDark, 
    marginBottom: 8 
  },
  infoText: { 
    fontSize: 16, 
    color: COLORS.textMuted, 
    marginBottom: 25 
  },
  apiTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: COLORS.textDark, 
    marginBottom: 10 
  },
  apiResult: { 
    fontSize: 15, 
    color: COLORS.textDark, 
    marginVertical: 4,
    fontWeight: '500'
  }
};