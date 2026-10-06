import React from 'react'
import { View, Button, Text,  Pressable,  StyleSheet,  Image,  TextInput,  ScrollView,  FlatList} from "react-native";
import { colors, spacing, radius, typography, sombra } from "../../theme";
import { useLogin } from "../../context/LoginContext"

const UserProfile = () => {
    const { logout } = useLogin();
  
    const singout = () => {
        logout()
    }

    return (
    <View style={{
            margin: "5%",
            width: '90%',
            backgroundColor: colors.superficie,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: "#000000" ,
            padding: 20
        }}>
        <Text style={style.titulo}>
                    Información personal
                </Text>
                <TextInput
                    placeholder='Nombre Completo'
                    style={style.textInputs}
                >
                </TextInput>
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
                <TextInput
                    placeholder='Nivel de ingles'
                    style={style.textInputs}
                >
                </TextInput>
                <TextInput
                    placeholder='Telefono'
                    style={style.textInputs}
                >
                </TextInput>
                <Pressable
                    onPress={() => {
                        //Funcion para Registrarse
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
                    Actualizar informacion
                 </Text>
                </Pressable>

                                <Pressable
                    onPress={() => {
                        //Funcion para Registrarse
                        singout()
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
                    Cerrar sesion                 
                </Text>
                </Pressable>
    </View>
  )
}

export default UserProfile

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

