
import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLogin } from "../context/LoginContext";
import { ReservaContext } from "../context/ReservasContext";
import EstadoVacio from "../components/EstadoVacio";
import { colors, spacing, radius } from "../theme";
import { formatearPrecio } from "../data/classes";
 
export default function ReservaScreen() {
  const { isLogged } = useLogin();
  const { reservas, cargando } = useContext(ReservaContext);
 
  // Sin sesión iniciada no se muestran las reservas
  if (!isLogged) {
    return (
      <EstadoVacio
        icono="lock-closed-outline"
        titulo="Inicia sesión"
        mensaje="Debes iniciar sesión en tu perfil para ver tus reservas."
      />
    );
  }
 
  if (cargando) return null;
 
  return (
    <FlatList
      data={reservas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: spacing.lg, flexGrow: 1 }}
      ListEmptyComponent={
        <EstadoVacio
          titulo="Aún no tienes reservas"
          mensaje="Reserva una clase desde la pestaña Inicio."
        />
      }
      renderItem={({ item }) => (
        <View style={styles.tarjeta}>
          <Text style={styles.tarjetaTitulo}>{item.titulo}</Text>
          <Text style={styles.text}>Profesor(a): {item.profesor}</Text>
          <Text style={styles.text}>Horario: {item.horario}</Text>
          <Text style={styles.text}>{formatearPrecio(item.precio)}</Text>
        </View>
      )}
    />
  );
}
 
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
 
  tarjeta: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borde,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
 
  tarjetaTitulo: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.texto,
    marginBottom: spacing.xs,
  },
});