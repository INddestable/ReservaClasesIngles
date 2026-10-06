import React, { useState, useMemo, useEffect } from "react";
import { View, Button, Text,  Pressable,  StyleSheet,  Image,  TextInput,  ScrollView,  FlatList} from "react-native";
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { colors, spacing, radius, typography, sombra } from "../../theme";


function AuthCard() {
  const [mode, setMode] = useState('register');

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
      {/* Selector */}
      <View style={
        estilos.portada
    }>
        
        <Pressable onPress={() => setMode('register')} style={estilos.botonArriba}>
            <Text style={estilos.tituloSecundario}>
                Registrarse
            </Text>
        </Pressable>

            <Text style={{
              paddingVertical: 10,     
              fontSize: 24,
              fontWeight: "800",
              color: colors.texto,
              marginTop: spacing.sm,
              marginBottom: spacing.lg,
              marginHorizontal: 10
              }}>
                |
            </Text>

        <Pressable onPress={() => setMode('login')} style={estilos.botonArriba}>
            <Text style={estilos.tituloSecundario}> 
             Iniciar sesión
            </Text>
        </Pressable>
      </View>

      {/* Contenido */}
      {mode === 'register' ? (
        <RegisterForm />
      ) : (
        <LoginForm />
      )}
    </View>
  );
}

export default AuthCard

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },

  portada: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.texto,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    marginHorizontal: 10,
  },

  tituloSecundario: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.texto,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    marginHorizontal: 10,
  },

  horarioTextoSeleccionado: {
    color: colors.primarioSuave,
  },

  barra: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },

  precioContenedor: {
    flex: 1,
  },

  precioLabel: {
    fontSize: 12,
    color: colors.textoSuave,
    marginHorizontal: 10,
    
  },

  textoBoton: {
    color: colors.primarioSuave,
    fontSize: 16,
    fontWeight: "600",
  },

  precio: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primario,
    marginHorizontal: 10,
  },
  botonArriba: {
    paddingVertical: 10,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginVertical: 5,
  }
});
