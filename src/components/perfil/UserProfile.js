import React, { useState, useEffect } from 'react'
import { View, Button, Text,  Pressable,  StyleSheet,  Image,  TextInput,  ScrollView,  FlatList, Alert} from "react-native";
import { colors, spacing, radius, typography, sombra } from "../../theme";
import { useLogin } from "../../context/LoginContext"

const UserProfile = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nivelIngles, setNivelIngles] = useState('')
    const [telefono, setTelefono] = useState('')
    const { user, logout, update, login } = useLogin();

    const singout = () => {
        logout()
    }

    useEffect(() => {
        if (user) {
            setNombre(user.nombre);
            setEmail(user.email);
            setPassword(user.password);
            setNivelIngles(user.nivelIngles);
            setTelefono(user.telefono);
        }
    }, []);

        const handleUpdate = () => {
    
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
            Alert.alert('Success', 'Información actualizada correctamente!')
            console.log("Actualizo el usuario")
            update(newUser)
    
    }

    /*
    //desconocimiento
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        nivelIngles: "",
        telefono: ""
    });

    useEffect(() => {
        if (user) {
            setForm(user);
        }
    }, [user]);
    */

    return (
    <View style={{
            margin: "5%",
            width: '90%',
            backgroundColor: colors.superficie,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: "#000000" ,
            padding: 20,
            flexDirection: "column",
            justifyContent: "center",
        }}>
        <Text style={style.titulo}>
                    Información personal
                </Text>
                {/*
                
                <TextInput
                    placeholder='Nombre Completo *'
                    style={style.textInputs}
                    value={form.nombre}
                    onChangeText={(text) =>
                        setForm({ ...form, nombre: text })
                    }
                >
                </TextInput>
                <TextInput
                    placeholder='Email *'
                    style={style.textInputs}
                    value={form.email}
                    onChangeText={(text) =>
                        setForm({ ...form, email: text })}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                >
                </TextInput>
                <TextInput
                    placeholder='Password *'
                    style={style.textInputs}
                    value={form.password}
                    onChangeText={(text) =>
                        setForm({ ...form, password: text })}
                    secureTextEntry={true}
                >
                </TextInput>
                <TextInput
                    placeholder='Nivel de ingles *'
                    style={style.textInputs}
                    value={form.nivelIngles}
                    onChangeText={(text) =>
                        setForm({ ...form, nivelIngles: text })}
                >
                </TextInput>
                <TextInput
                    placeholder='Telefono'
                    style={style.textInputs}
                    value={form.telefono}
                    onChangeText={(text) => { //GENIOOOOOOO
                        const soloNumeros = text.replace(/[^0-9]/g, '');
                        setForm({ ...form, telefono: soloNumeros})
                    }}
                    keyboardType="phone-pad"
                >
                </TextInput>
                {*/}
                
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
                        handleUpdate()
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
                    Actualizar informacion
                 </Text>
                </Pressable>

                                <Pressable
                    onPress={() => {
                        //Funcion para Registrarse
                        singout()
                  }}
                style={({ pressed }) => ({
                    paddingVertical: 12,
                    width: 200,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                    marginVertical: 5,
                    marginLeft: "21%",
                  })}
                >
                 <Text style={style.textoBotonSingOut}>
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
        marginLeft: "16%",
    },
    textoBoton: {
        color: colors.primarioSuave,
        fontSize: 16,
        fontWeight: "600",
    },
    textoBotonSingOut: {
        color: "#0000009f",
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

