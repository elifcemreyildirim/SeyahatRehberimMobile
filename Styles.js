import { StyleSheet, Dimensions } from 'react-native';

// Ekran genişliğini ve yüksekliğini alarak tasarımları tüm cihazlara uyumlu hale getiriyoruz
const { width } = Dimensions.get('window');


export const COLORS = {
  primary: '#3182ce',      
  secondary: '#2ecc71', 
  background: '#f7fafc', 
  cardBg: '#ffffff',
  textDark: '#2d3748',
  textMuted: '#718096',
  border: '#e2e8f0',
  inputBg: '#f8fafc',
  accent: '#e74c3c',
  shadow: '#1a202c',
};

// Ortak kullanılacak stiller

export const globalStyles = StyleSheet.create({
  // Tüm ekranların ana kapsayıcısı
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  
  // İçerikleri ortalamak ve nizami padding vermek için iç kapsayıcı
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  // gölgeli kart yapısı
  card: { 
    backgroundColor: COLORS.cardBg, 
    borderRadius: 24, 
    padding: 25, 
    width: width * 0.90,
    shadowColor: COLORS.shadow, 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.06, 
    shadowRadius: 20, 
    elevation: 6, //gölge görüntüsü için
    justifyContent: 'center'
  },

  // Sayfaların en üstündeki büyük başlıklar
  mainTitle: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: COLORS.textDark, 
    textAlign: 'center',
    letterSpacing: 0.5
  },

  //Başlıkların altındaki açıklama metinleri
  subtitle: { 
    fontSize: 14, 
    color: COLORS.textMuted, 
    textAlign: 'center', 
    marginTop: 6,
    lineHeight: 20
  },

  // Formlar için dikey boşluk hizalama
  inputGroup: {
    marginBottom: 20
  },

  // İnput kutularının hemen üstündeki küçük başlıklar
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
    paddingLeft: 4
  },

  //input kutusu
  input: { 
    borderWidth: 1.5, 
    borderColor: COLORS.border, 
    padding: 16, 
    borderRadius: 14, 
    fontSize: 16, 
    backgroundColor: COLORS.inputBg, 
    color: COLORS.textDark
  },

  //ana buton
  button: { 
    backgroundColor: COLORS.primary, 
    paddingVertical: 16, 
    borderRadius: 14, 
    alignItems: 'center', 
    marginTop: 15,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4
  },

  // Butonların içindeki metinler
  buttonText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '700' 
  },

  // API veri kutuları için bilgi alanı
  infoBox: { 
    backgroundColor: '#f1f2f6', 
    borderLeftWidth: 5, 
    borderLeftColor: COLORS.primary, 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 25 
  }
});