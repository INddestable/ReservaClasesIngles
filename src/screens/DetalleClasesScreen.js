import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useResponsive from "../hooks/useResponsive";
import { colors, spacing, radius, typography, sombra } from "../theme";
import { formatearPrecio } from "../data/classes";
import LabelLevel from "../components/LabelLevel";

export default function DetalleClasesScreen({ route }) {
  const insets = useSafeAreaInsets();
  // otra manera de desestructurar objetos
  const { clase } = route.params;
  const { paddingHorizantal, esTablet } = useResponsive();
  const [cupos, setCupos] = useState(clase.cupos);
  const restarCupos = () => {
    if (cupos >= 1) {
      setCupos((prevCupos) => prevCupos - 1);
      Alert.alert("Reservar Clases", `Has reservado ${clase.titulo}`);
    } else {
      Alert.alert(
        "Reservar Clases",
        `La clase ${clase.titulo} no cuenta con más cupos`,
      );
    }
  };
  return (
    <View style={estilos.pantalla}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 130 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: clase.imagen }}
          resizeMode="cover"
          style={[estilos.portada, { height: esTablet ? 300 : 220 }]}
        />

        <View
          style={{
            paddingHorizontal: paddingHorizantal,
            paddingTop: spacing.lg,
          }}
        >
          <LabelLevel nivel={clase.nivel} />

          <Text style={estilos.titulo}>{clase.titulo}</Text>

          <View style={estilos.datos}>
            <View style={estilos.dato}>
              <Ionicons name="time-outline" size={20} color={colors.primario} />

              <Text style={estilos.datoValor}>{clase.duracion} minutos</Text>

              <Text style={estilos.datoTexto}>Duración</Text>
            </View>

            <View style={estilos.dato}>
              <Ionicons
                name="people-outline"
                size={20}
                color={colors.primario}
              />

              <Text style={estilos.datoValor}>{cupos}</Text>

              <Text style={estilos.datoTexto}>Cupos</Text>
            </View>
          </View>

          <View style={estilos.profesor}>
            <Image
              source={{ uri: clase.profesor.foto }}
              resizeMode="cover"
              style={estilos.avatar}
            />

            <View style={estilos.profesorInfo}>
              <Text style={estilos.profesorNombre}>
                {clase.profesor.nombre}
              </Text>

              <Text style={estilos.profesorDetalle}>
                {clase.profesor.pais} - {clase.modalidad}
              </Text>
            </View>
          </View>

          <Text style={estilos.datoValor}>Sobre la clase</Text>

          <Text style={estilos.descripcion}>{clase.descripcion}</Text>

          <Text style={estilos.datoValor}>Elige tu horario</Text>

          <Text style={[estilos.horario, estilos.margin]}>
            {clase.horarios.join(" - ")}
          </Text>
        </View>
      </ScrollView>

      <View
        style={[
          estilos.barra,
          {
            paddingHorizontal: paddingHorizantal,
            paddingBottom: Math.max(insets.bottom, spacing.lg),
          },
        ]}
      >
        <View style={estilos.precioContenedor}>
          <Text style={estilos.precioLabel}>Precio por clase</Text>

          <Text style={estilos.precio}>{formatearPrecio(clase.precio)}</Text>
        </View>

        <Pressable
          onPress={() => {
            {
              /*setCupos((cupos) => cupos - 1);*/
            }
            restarCupos();
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
          <Text style={estilos.textoBoton}>Reservar</Text>
        </Pressable>
      </View>
    </View>
  );
}

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
  },
});
