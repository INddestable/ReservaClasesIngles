import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import LabelLevel from "./LabelLevel";
import { colors, radius, spacing, typography } from "../theme";
import useResponsive from "../hooks/useResponsive";
import { formatearPrecio } from "../data/classes";

export default function Card({ clase, onPress }) {
  const { paddingHorizantal, esTablet } = useResponsive();
  return (
    <View style={{borderRadius: 10,paddingVertical: 8,
          paddingHorizontal: 15,}}>
      <Pressable onPress={onPress} style={{borderRadius: 10}}>
        <Image source={{ uri: clase.imagen }} />
        <View>
          <LabelLevel nivel={clase.nivel} />
        </View>
        {/*nombre profesor
      -- horario
      -- precio*/}
        <Image
          source={{ uri: clase.imagen }}
          resizeMethod="cover"
          style={[estilos.portada, { height: esTablet ? 300 : 220 }]}
        />
        <Text style={estilos.dato}>Profesor: {clase.profesor.nombre}</Text>
        <Text style={estilos.dato}>Horario: {clase.horarios.join("\n")}</Text>
        <Text style={estilos.precio}>Precio: {formatearPrecio(clase.precio)}</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#0369a1" : "#0ea5e9",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          width: 200,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        })}
      >
        <Text>Reservar clase</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: "100%", backgroundColor: colors.primarioSuave },
  datos: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: "center", gap: 2 },
  datoValor: { fontSize: 16, fontWeight: "800", color: colors.texto },
  precio: { fontSize: 18, fontWeight: "800", color: colors.primario },
  profesor: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
});
