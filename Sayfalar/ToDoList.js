import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { globalStyles, COLORS } from '../Styles';


// To Do List sayfası
export default function ToDoList() {
  // Yeni not eklemek için kullanılan state
  const [note, setNote] = useState('');
  
  //Satır içi güncelleme için state
  const [editingTodoId, setEditingTodoId] = useState(null); 
  const [editText, setEditText] = useState('');

  // Örnek seyahat planı listesi
  const [notesList, setNotesList] = useState([
    { id: '1', text: 'Tarihi yerleri ve müzeleri ziyaret et.' },
    { id: '2', text: 'Meşhur yerel seyahat yemeklerinin tadına bak.' }
  ]);

  // Eleman ekleme fonksiyonu
    const addNote = () => {
    if (note.trim() === '') return;
    
    const newNote = {
      id: Date.now().toString(),
      text: note.trim()
    };
    
    setNotesList([...notesList, newNote]);
    setNote('');
  };

  //Satır içi güncelleme
  const startInlineEdit = (item) => {
    setEditingTodoId(item.id); // Tıklanan satırın ID'sini kaydederek paneli tetikler
    setEditText(item.text);    // Mevcut metni satır altındaki inputa doldurur
  };

  // Satır içi güncelleme kaydetme fonksiyonu
  const saveInlineUpdate = () => {
    if (editText.trim() === '') return;

    // Sadece düzenlenen elemanı bulup metnini güncelliyoruz
    const updatedList = notesList.map(item => {
      if (item.id === editingTodoId) {
        return { ...item, text: editText.trim() };
      }
      return item;
    });

    setNotesList(updatedList);
    setEditingTodoId(null); // Düzenleme panelini kapatır
    setEditText('');        // Düzenleme inputunu temizler
  };

  //Silme fonksiyonu
  const deleteNote = (id) => {
    if (editingTodoId === id) {
      setEditingTodoId(null);
      setEditText('');
    }
    const filteredList = notesList.filter(item => item.id !== id);
    setNotesList(filteredList);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.innerContainer}>
        
        <View style={[globalStyles.card, { flex: 1 }]}>
          
          <Text style={globalStyles.mainTitle}>📝 Yapılacaklar Listesi</Text>
          <Text style={globalStyles.subtitle}>Şehirde yapacağınız aktiviteleri planlayın</Text>
          
          {/* üstteki sabit alan */}
          <View style={localStyles.todoInputRow}>
            <TextInput 
              style={[globalStyles.input, { flex: 1, marginBottom: 0, marginRight: 10 }]} 
              placeholder="Yeni bir plan ekle..." 
              placeholderTextColor={COLORS.textMuted}
              value={note}
              onChangeText={setNote}
            />
            
            <TouchableOpacity 
              style={[globalStyles.button, { marginTop: 0, paddingVertical: 14, paddingHorizontal: 20, backgroundColor: COLORS.secondary }]} 
              onPress={addNote}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.buttonText}>Ekle</Text>
            </TouchableOpacity>
          </View>

          {/* Dinamik liste */}
          <FlatList
            data={notesList}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 15 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              // O anki satırın düzenlenip düzenlenmediğini kontrol
              const isThisItemEditing = editingTodoId === item.id;

              return (
                <View style={[localStyles.todoCardContainer, isThisItemEditing && localStyles.todoCardContainerEditing]}>
                  
                  {/* Üst Satır Metin ve Butonlar */}
                  <View style={localStyles.todoItemRow}>
                    {/* Görev Metni */}
                    <Text style={localStyles.todoText}>📌 {item.text}</Text>
                    
                    {/* Sağ Taraf: İşlem Butonları */}
                    <View style={localStyles.actionButtonsGroup}>
                      {/*  Güncelleme butonu */}
                      <TouchableOpacity 
                        onPress={() => startInlineEdit(item)}
                        activeOpacity={0.6}
                        style={localStyles.actionButton}
                      >
                        <Text style={localStyles.actionButtonText}>✏️</Text>
                      </TouchableOpacity>

                      {/*Silme butonu */}
                      <TouchableOpacity 
                        onPress={() => deleteNote(item.id)}
                        activeOpacity={0.6}
                        style={localStyles.actionButton}
                      >
                        <Text style={localStyles.actionButtonText}>❌</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* altta açılan düzenleme paneli */}
                  {isThisItemEditing && (
                    <View style={localStyles.inlineEditPanel}>
                      <TextInput 
                        style={[globalStyles.input, localStyles.inlineInput]}
                        value={editText}
                        onChangeText={setEditText}
                        placeholder="Planı düzenle..."
                        placeholderTextColor={COLORS.textMuted}
                      />
                      <View style={localStyles.inlineButtonRow}>
                        {/* Vazgeç butonu */}
                        <TouchableOpacity 
                          style={[localStyles.inlineButton, { backgroundColor: '#e2e8f0' }]} 
                          onPress={() => setEditingTodoId(null)}
                        >
                          <Text style={{ color: COLORS.textDark, fontWeight: '600' }}>İptal</Text>
                        </TouchableOpacity>
                        
                        {/* Onayla/Kaydet butonu */}
                        <TouchableOpacity 
                          style={[localStyles.inlineButton, { backgroundColor: COLORS.primary }]} 
                          onPress={saveInlineUpdate}
                        >
                          <Text style={{ color: '#ffffff', fontWeight: '600' }}>Kaydet ✅</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                </View>
              );
            }}
          />

        </View>

      </View>
    </SafeAreaView>
  );
}

// sadece bu sayfaya özel stiller
const localStyles = {
  todoInputRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20,
    marginBottom: 10 
  },
  todoCardContainer: {
    backgroundColor: '#f8fafc', 
    borderRadius: 14, 
    marginVertical: 6, 
    borderWidth: 1.5, 
    borderColor: COLORS.border,
    padding: 14,
  },
  todoCardContainerEditing: {
    borderColor: COLORS.primary, // Düzenlenen kartın etrafını mavi yaparak vurgular
    backgroundColor: '#f0f7ff'
  },
  todoItemRow: { 
    flexDirection: 'row',       
    justifyContent: 'space-between', 
    alignItems: 'center'        
  },
  todoText: { 
    fontSize: 15, 
    color: COLORS.textDark,
    fontWeight: '500',
    flex: 0.75 
  },
  actionButtonsGroup: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  actionButton: {
    padding: 6,
    marginLeft: 8, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButtonText: {
    fontSize: 16
  },
  // Satır altına açılan panel stilleri
  inlineEditPanel: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12
  },
  inlineInput: {
    padding: 10,
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: '#ffffff'
  },
  inlineButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8
  },
  inlineButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
};