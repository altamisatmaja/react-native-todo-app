import { useNavigation, useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { db } from "../configs/firebaseConfig";

// ada 2 kemungkinan yang terjadi sini
// 1. penambahan sebuah data
// 2. pengubahan sebuah data
const TodoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { todo } = route.params || {};
  console.log(todo);

  const [title, setTitle] = useState(todo ? todo.title : "");

  const handleSave = async () => {
    try {
      if (todo) {
        // ketika ini adalah sebuah update
        const todoRef = doc(db, "todos", todo.id);
        await updateDoc(todoRef, { title });
      } else {
        // ketika ini adalah sebuah create
        await addDoc(collection(db, "todos"), { title });
      }
      navigation.goBack();
    } catch (error) {
      console.log(`Terjadi kesalahan -> ${error}`);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Masukkan todo anda"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Simpan" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  todoText: {
    fontSize: 16,
  },
  textInput: {
    marginBottom: 20,
    paddding: 15,
    borderWidth: 1,
  },
});

export default TodoScreen;
