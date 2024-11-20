import { useNavigation } from "@react-navigation/native";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { db } from "../configs/firebaseConfig";

const ListScreen = () => {
  // untuk melakukan perubahan halaman
  const navigation = useNavigation();

  // untuk menyimpan data atau state awal dari data firebase
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data);
    setTodos(data);
  };

  // ketika elemen atau screen ini di render, lakukan fetchTodos
  useEffect(() => {
    fetchTodos();
  }, [todos]);

  //   itulah kenapa ada param yang kita butuhkan atau key yang kita butuh
  const deleteTodos = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <View style={styles.container}>
      <Button
        title="Tambahkan todo"
        onPress={() => navigation.navigate("Todo")}
      />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoItem}
            onPress={() => navigation.navigate("Todo", { todo: item })}
          >
            <Text style={styles.todoText}>{item.title}</Text>
            <Button
              title="Hapus"
              onPress={() => deleteTodos(item.id)}
              color="red"
            />
          </TouchableOpacity>
        )}
      />
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
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddding: 15,
    borderWidth: 1,
  },
});

export default ListScreen;
