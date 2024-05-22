import { Image, StyleSheet, Platform, View, Text, Pressable, Alert, SafeAreaView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import axios from 'axios'
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [imageList, setImageList] = useState([]);

  const showAlert = () => {
    Alert.alert(
      'TITULO TESTE',
      'MENSAGEM TESTE',
      [
        {
          text: 'SIM',
          onPress: () => console.log('OK Pressed'),
        },
        {
          text: 'NÂO',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const getGithubUser = async () => {

      axios.get('https://picsum.photos/v2/list?limit=10').then((response) => {
        console.log(response.data);
        setImageList(response.data);
      });
    }

    getGithubUser()
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
      <View style={styles.contentContainer}>
        {imageList.map((image) => {
          console.log({ image })
          return (
            <View key={image.id} style={{ height: 230, width: 300, borderRadius: 5, justifyContent: 'center' }}>
              <Image
                source={{ uri: image.download_url }}
                resizeMode='contain'
                style={{
                  borderRadius: 2,
                  width: 300,
                  height: 250,
                }}
              />
            </View>
          );
        })}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    minHeight: '100%',
    backgroundColor: 'white',
    rowGap: 20
  }
});
