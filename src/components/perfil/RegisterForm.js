import React, { useState } from 'react'
import { View, Button, Text,  Pressable,  StyleSheet,  Image,  TextInput,  ScrollView,  FlatList, Alert} from "react-native";
import { colors, spacing, radius, typography, sombra } from "../../theme";
import { useLogin } from "../../context/LoginContext"

export const RegisterForm = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nivelIngles, setNivelIngles] = useState('')
    const [telefono, setTelefono] = useState('')

    const { register } = useLogin();

    const handleRegister = () => {

        if (!nombre.trim()) {
            Alert.alert('Error', 'El nombre es obligatorio');
            return;
        }
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
        if (!nivelIngles.trim()) {
            Alert.alert('Error', 'El Nivel de ingles es obligatorio');
            return;
        }



        const newUser = {
            nombre: nombre,
            email: email,
            password: password,
            nivelIngles: nivelIngles,
            telefono: telefono
        }

        register(newUser)

    }

    return (
    <View>
        <Text style={style.titulo}>
                    Registrarse
                </Text>
                <TextInput
                    placeholder='Nombre Completo *'
                    style={style.textInputs}
                    value={nombre}
                    onChangeText={setNombre}
                >
                </TextInput>
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
                <TextInput
                    placeholder='Nivel de ingles *'
                    style={style.textInputs}
                    value={nivelIngles}
                    onChangeText={setNivelIngles}
                >
                </TextInput>
                <TextInput
                    placeholder='Telefono'
                    style={style.textInputs}
                    value={telefono}
                    onChangeText={(text) => { //GENIOOOOOOO
                        const soloNumeros = text.replace(/[^0-9]/g, '');
                        setTelefono(soloNumeros);
                    }}
                    keyboardType="phone-pad"
                >
                </TextInput>
                <Pressable
                    onPress={() => {
                        //Funcion para Registrarse
                        handleRegister()
                  }}
                style={({ pressed }) => ({
                    backgroundColor: pressed ? colors.primarioOscuro : colors.primario,
                    paddingVertical: 12,
                    width: 200,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                    marginVertical: 5,
                  })}
                >
                 <Text style={style.textoBoton}>
                    Registrarse
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