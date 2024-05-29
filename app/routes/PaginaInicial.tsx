import ParallaxScrollView from '@/components/ParallaxScrollView';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const PaginaInicial = ({ navigation, route }) => {
    const [imageList, setImageList] = useState([]);
    const [search, setSearch] = useState('');

    const username = route.params.userName

  useEffect(() => {
    const getImageList = async () => {

      axios.get('https://picsum.photos/v2/list?limit=10').then((response) => {
        console.log(response.data);
        setImageList(response.data);
      });
    }

    getImageList()
  }, [])

    return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <Text style={{fontSize: 20, color: 'black', paddingHorizontal: 20, marginTop: 20}}>Email Logado: {username}</Text>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder='Digite o nome da imagem que voce procura'
          onChangeText={(search) => setSearch(search)}
        />
        <Pressable onPress={() => Alert.alert(`Sua pesquisa: ${search}`)} style={styles.button}>
          <Text>Pesquisar</Text>
        </Pressable>
      </View>
      {/* <View style={styles.contentContainer}>
        {imageList.map((image) => {
          console.log({ image })
          return (
            <View key={image.id} style={{ height: 230, width: 300, borderRadius: 5, justifyContent: 'center' }}>
              <Pressable onPress={() => navigation.navigate('Details', {id: image.id})}>
              <Image
                source={{ uri: image.download_url }}
                resizeMode='contain'
                style={{
                  borderRadius: 2,
                  width: 300,
                  height: 250,
                }}
              />
              </Pressable>
            </View>
          );
        })}
      </View> */}
    </ParallaxScrollView>
  )};

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    footer: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: 'black',
      backgroundColor: '#4c4c4c',
    },
    button: {
      height: 50,
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 1,
      marginBottom: 15,
      width: 300,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      width: '100%',
      minHeight: '90%',
      backgroundColor: 'white',
      rowGap: 20
    }
  });

  export default PaginaInicial;
  