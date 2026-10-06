import React, { useState } from 'react'
import { View, Text,  Pressable,  StyleSheet,  Image,  TextInput,  ScrollView,  FlatList} from "react-native";
import { colors, spacing, radius, typography, sombra } from "../../theme";

export const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (
    <View style={{
    }}>
        <Text style={style.titulo}>
            Iniciar sesion
        </Text>
        <TextInput
            placeholder='Email'
            style={style.textInputs}
        >
        </TextInput>
        <TextInput
            placeholder='Password'
            style={style.textInputs}
        >
        </TextInput>
        <Pressable
            onPress={() => {
                //Funcion para Login
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