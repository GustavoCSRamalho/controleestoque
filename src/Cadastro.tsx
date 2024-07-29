import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Button, Image, Text } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';

import Axios from 'axios';

const Cadastro = () => {


  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState(0);
  const [image, setImage] = useState('');

  const navigation = useNavigation();

  const saveProduct = () => {

    if (descricao.trim() === "") {
      alert("Descricao não pode estar vazio")
    } else {
      Axios.post('http://10.0.2.2:3000/products', {
        descricao,
        categoria,
        preco,
        image
      }).then((res) => {
        alert("Salvo com sucesso!")
        navigation.navigate('Home', { res })
      }).catch(() => alert("Erro ao salvar"))
    }


  }

  useEffect(() => { }, []);


  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Image source={{ uri: image ? image : null }} style={{ width: 100, height: 100, borderRadius: 50, borderColor: '#545454', borderWidth: 1 }} />

      <TouchableOpacity onPress={() => ImagePicker.showImagePicker({}, (res) => setImage(res.uri))}>
        <Text>Carregar imagem</Text>
      </TouchableOpacity>

      <TextInput
        value={descricao}
        onChangeText={(txt) => setDescricao(txt)}
        placeholder="Descricao"
        style={{ fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, borderRadius: 10, padding: 7, marginBottom: 10 }}
        placeholderTextColor="#5a5a5a" />


      <TextInput value={categoria} onChangeText={(txt) => setCategoria(txt)} placeholder="Categoria" style={{ fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, padding: 10, borderRadius: 7, marginBottom: 10 }} placeholderTextColor="#5a5a5a" />
      <TextInput value={preco} onChangeText={(txt) => setPreco(txt)} placeholder="Preco" style={{ marginBottom: 50, fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, padding: 10, borderRadius: 7 }} placeholderTextColor="#5a5a5a" />

      <Button title="Cadastrar" onPress={saveProduct} />

    </View>
  )
}

export default Cadastro;