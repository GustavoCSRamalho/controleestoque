import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Button, Image, Text } from 'react-native';

import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

import { useNavigation, useRoute } from '@react-navigation/native';

import Axios from 'axios';

const openImagePicker = () => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  });
};

const Editar = () => {


  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState();
  const [image, setImage] = useState('');
  const [id, setId] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {

    const product = route.params.product;

    setDescricao(product.descricao);
    setCategoria(product.categoria);
    setPreco(product.preco.toString());
    setImage(product.image);
    setId(product.id);
  }, [])

  const saveProduct = () => {

    if (descricao.trim() === "") {
      alert("Descricao não pode estar vazio")
    } else {
      Axios.patch('http://10.0.2.2:3000/products/' + id, {
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

  const deleteProduct = () => {

    Axios.delete('http://10.0.2.2:3000/products/' + id).then((res) => {
      alert("Deletado com sucesso!")
      navigation.navigate('Home', { res })
    }).catch(() => alert("Erro ao salvar"))

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

      <Button title="Salvar" onPress={saveProduct} />
      <Button title="Deletar" onPress={deleteProduct} />

    </View>
  )
}

export default Editar;