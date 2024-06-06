import ParallaxScrollView from '@/components/ParallaxScrollView';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const PaginaInicial = ({ navigation, route }) => {
  const [repoList, setRepoList] = useState([])
  const [query, setQuery] = useState('')

  //const movieId = route.params.movie_id

  function handleSearch() {
    console.log({ repoList });

    const url = `https://api.github.com/search/repositories?q=${query}}`;

    axios.get(url).then((response) => {
      console.log(response.data.items);
      setRepoList(response.data.items);
    });
  }

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
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder='Digite o nome do repositório que voce procura'
          onChangeText={(query) => setQuery(query)}
        />
        <Pressable onPress={() => handleSearch()} style={styles.button}>
          <Text>Pesquisar</Text>
        </Pressable>
      </View>
      <View style={{ rowGap: 25, justifyContent: 'center', alignItems: 'center' }}>
        {repoList.map((repo) => {
          console.log({ repo });
          return (
            <View key={repo.id} style={{ justifyContent: 'center', backgroundColor: 'green', padding: 10, borderRadius: 10, width: 600 }}>
              <Text>Descrição: {repo.description}</Text>
              <Text onPress={() => Linking.openURL(repo.clone_url)}>Clone URL: <Text style={{textDecorationLine: 'underline'}}>{repo.clone_url}</Text></Text>
            </View>
          );
        })}
      </View>
      {/* <View style={styles.contentContainer}>
        {repoList.map((repo) => {
          console.log({ repo })
          return (
            <View key={repo.id} style={{ height: 230, width: 300, borderRadius: 5, justifyContent: 'center' }}>
              <Pressable onPress={() => navigation.navigate('Details', {id: repo.id})}>
              <Image
                source={{ uri: repo.download_url }}
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
  );
};

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
  