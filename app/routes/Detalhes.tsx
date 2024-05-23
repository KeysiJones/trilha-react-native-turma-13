import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

const Detalhes = ({ navigation, route }) => {
  const [image, setImage] = useState({});

  useEffect(() => {
    function getData() {
        axios
          .get(`https://picsum.photos/id/${route.params.id}/info`)
          .then((response) => {
            console.log(response.data);
            setImage(response.data);
          })
      }

    getData();
  }, [])
  
  return (
    <View
      style={{
        backgroundColor: 'black',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={{ uri: image.download_url }}
        resizeMode='contain'
        style={{
        borderRadius: 2,
        width: 300,
        height: 250,
      }}
      />
      <Text style={{ color: 'white', fontSize: 25 }}>{image.author}</Text>
      <Text style={{ color: 'white', fontSize: 25 }}>Largura da imagem: {image.width}</Text>
      <Text style={{ color: 'white', fontSize: 25 }}>Altura da imagem: {image.height}</Text>
    </View>
  );
};

export default Detalhes;
  