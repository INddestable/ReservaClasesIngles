import react, { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useResponsive from "../hooks/useResponsive";
import { colors, spacing, radius, typography, sombra } from "../theme";
import { formatearPrecio } from "../data/classes";
import LabelLevel from "../components/LabelLevel";

export default function DetalleClasesScreen({ route }) {
  const insets = useSafeAreaInsets();
  //otra manera de desestructurar objectos
  const { clase } = route.params;
  const { paddingHorizantal, esTablet } = useResponsive();

  return (
    <View>
      <ScrollView
        contenteContainerStyle={{ paddingBottom: 10 }}
        showVerticalScrollIndicator={false}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          style={{
            flexGrow: 1,
          }}
          horizontal
          scrollEnabled={false}
        >
          <Text style={estilos.profesor}>{clase.profesor.nombre}</Text>
          <Image
            source={{ uri: clase.profesor.foto }}
            resizeMethod="cover"
            style={[estilos.avatar]}
          />
        </ScrollView>
        {/* <Image
          source={{ uri: clase.imagen }}
          resizeMethod="cover"
          style={[estilos.portada, { height: esTablet ? 300 : 220 }]}
        /> */}
      </ScrollView>
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
  profesor: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.borde,
  },
  profesorNombre: { fontSize: 15, fontWeight: "700", color: colors.texto },
  descripcion: {
    ...typography.cuerpo,
    color: colors.textoSuave,
    lineHeight: 22,
    marginTop: spacing.sm,
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
  },
  precio: { fontSize: 18, fontWeight: "800", color: colors.primario },
});
