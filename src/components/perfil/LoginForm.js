import React, { useState } from 'react'
import { View, Text,  Pressable,  StyleSheet,  Image,  TextInput,  ScrollView,  FlatList, Alert} from "react-native";
import { colors, spacing, radius, typography, sombra } from "../../theme";
import { useLogin } from "../../context/LoginContext"

export const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useLogin();

    const handleLogin = () => {
        if (!email.trim()) {
            Alert.alert('Error', 'El email es obligatorio');
            return;
        }
        if (!email.trim().includes('@')) {
            Alert.alert('Error', 'El email no es valido');
            return;
        }
        if (!password.trim()) {
            Alert.alert('Error', 'La password es obligatoria');
            return;
        }
        login(email, password)
    }

    return (
    <View style={{
    }}>
        <Text style={style.titulo}>
            Iniciar sesion
        </Text>
        <TextInput
            placeholder='Email *'
            style={style.textInputs}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
        >
        </TextInput>
        <TextInput
            placeholder='Password *'
            style={style.textInputs}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        >
        </TextInput>
        <Pressable
            onPress={() => {
                //Funcion para Login
                handleLogin()
          }}
        style={({ pressed }) => ({
            backgroundColor: pressed ? colors.primarioOscuro : colors.primario,
            paddingVertical: 12,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            marginTop: 20,
            marginBottom: 5,
            marginLeft: "21%",
          })}
        >
         <Text style={style.textoBoton}>
            Ingresar
         </Text>
        </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
    titulo: {
        fontSize: 24,
        fontWeight: "800",
        color: colors.texto,
        marginTop: spacing.sm,
        marginBottom: spacing.lg,
        marginHorizontal: 10,
        marginLeft: "30%",
    },
    textoBoton: {
        color: colors.primarioSuave,
        fontSize: 16,
        fontWeight: "600",
    },
    textInputs: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        paddingHorizontal: spacing.lg,
        height: 46,
        margin: spacing.sm,
        borderWidth: 1,
        borderColor: "#000000",
    },
})