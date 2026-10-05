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
        
        <Pressable onPress={() => setMode('register')}>
            <Text>
                Registrarse
            </Text>
        </Pressable>

        <Pressable onPress={() => setMode('login')}>
            <Text>
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
    backgroundColor: colors.primarioSuave,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.texto,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    marginHorizontal: 10,
  },

  datos: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },

  dato: {
    alignItems: "center",
    gap: 2,
  },

  datoValor: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.texto,
    marginHorizontal: 10,
  },

  datoTexto: {
    fontSize: 12,
    color: colors.textoSuave,
  },

  profesor: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.borde,
  },

  profesorInfo: {
    flex: 1,
  },

  profesorNombre: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.texto,
  },

  profesorDetalle: {
    fontSize: 13,
    color: colors.textoSuave,
    marginTop: 2,
  },

  descripcion: {
    ...typography.cuerpo,
    color: colors.textoSuave,
    lineHeight: 22,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    marginHorizontal: 10,
  },

  horarios: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },

  horario: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginHorizontal: 10,
  },

  horarioSeleccionado: {
    backgroundColor: colors.primario,
    borderColor: colors.primario,
  },

  horarioTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.texto,
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
});
