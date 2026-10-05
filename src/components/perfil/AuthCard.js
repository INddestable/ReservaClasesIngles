import React, { useState, useMemo, useEffect } from "react";
import { View, Button, Text,  Pressable,  StyleSheet,  Image,  TextInput,  ScrollView,  FlatList} from "react-native";
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

function AuthCard() {
  const [mode, setMode] = useState('login');

  return (
    <View>
      {/* Selector */}
      <View>
        <Pressable onPress={() => setMode('login')}>
            <Text>
             Iniciar sesión
            </Text>
        </Pressable>

        <Pressable onPress={() => setMode('register')}>
            <Text>
                Registrarse
            </Text>
        </Pressable>
      </View>

      {/* Contenido */}
      {mode === 'login' ? (
        <LoginForm />
      ) : (
        <RegisterForm />
      )}
    </View>
  );
}

export default AuthCard