import { View, Text, StyleSheet } from "react-native";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <Text style={styles.text}>
        Aquí aparecerá la información del estudiante.
      </Text>
    </View>
  );
}

/*
Crear variable booleana que demuestre que el usuario si esta con la sesion iniciada 

Crear campos de inicio de sesion
Crear context donde se guardaria la informacion
Se guarda en /data
nombre, apellido, nivel de ingles, telefono, cedula-opcional
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
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
  },
});