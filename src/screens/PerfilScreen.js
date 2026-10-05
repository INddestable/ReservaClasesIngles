import React, { useState, useMemo, useEffect } from "react";
import { View,  Text,  Pressable,  StyleSheet,  Image,  TextInput,  ScrollView,  FlatList} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useResponsive from "../hooks/useResponsive";
import { colors, radius, spacing, typography } from "../theme";
import { LoginProvider } from "../context/LoginContext";
import { useLogin } from '../context/LoginContext';
import AuthCard from '../components/perfil/AuthCard';
import UserProfile from '../components/perfil/UserProfile';

export default function PerfilScreen() {
  const { isLogged } = useLogin();

  return (
    <>
      {isLogged ? <UserProfile /> : <AuthCard />}
    </>
  );
}

/*
export default function PerfilScreen() {
  return (
    <View >
      <Text style={styles.text}>
        Aquí aparecerá la información del estudiante.
      </Text>
            <View style={styles.buscador}>
              <TextInput
                style={{ flex: 1 }}
                placeholder="Nombre"
                //value={busqueda}
                //onChangeText={setBusqueda}
                autoCorrect={false}
              />
            </View>
    </View>
  );
}
*/

/*
Crear variable booleana que demuestre que el usuario si esta con la sesion iniciada LISTO

Crear campos de inicio de sesion LISTO (email, password)
Crear context donde se guardaria la informacion
Se guarda en /data
nombre, nivel de ingles, telefono, email, password
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",

  },

  text: {
    fontSize: 16,
    margin: spacing.lg,
    marginBottom: spacing.xs
  },

  buscador: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    margin: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borde,
  },

  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
});