import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Alert,
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../auth/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Login = ({ navigation }) => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        Alert.alert("Login feito com sucesso");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Home");
      })
      .catch((err) => {
        switch (err.message) {
          case "Firebase: Error (auth/wrong-password).":
            Alert.alert("Senha incorreta");
            break;
          case "Firebase: Error (auth/user-not-found).":
            Alert.alert("Usuário não encontrado");
            break;
          case "Firebase: Error (auth/invalid-email).":
            Alert.alert("Email inválido");
            break;
          default:
            Alert.alert(err.message);
        }
      });
  };

  const handleCadastrar = async () => {
    await createUserWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        Alert.alert("Conta criada");
        const user = userCredential.user;
        console.log(user);
      })
      .catch((err) => {
        switch (err.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            Alert.alert("Esse email já está cadastrado");
            break;
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            Alert.alert("A senha deve ser maior que 5 caracteres");
            break;
          case "Firebase: Error (auth/invalid-email).":
            Alert.alert("Email inválido");
            break;
          default:
            Alert.alert(err.message);
            break;
        }
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.body}>
        <Text style={styles.text}>Usuário</Text>
        <TextInput
          style={styles.input}
          testID='user'
          placeholder='Digite seu email ou nome de usuário'
          onChangeText={(text) => setUser(text)}
        />
        <Text style={styles.text}>Senha</Text>
        <TextInput
          style={styles.input}
          testID='password'
          placeholder='Digite sua senha'
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.footer}>
        <Pressable onPress={() => handleLogin()} style={styles.button}>
          <Text>Login</Text>
        </Pressable>
        <Pressable onPress={() => handleCadastrar()} style={styles.button}>
          <Text>Cadastrar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6e5494',
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 65,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 15,
  },
});

export default Login;
