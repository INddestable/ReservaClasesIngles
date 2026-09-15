import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import LabelLevel from "./LabelLevel";
import { colors, radius, spacing, typography } from "../theme";
import useResponsive from "../hooks/useResponsive";
import { formatearPrecio } from "../data/classes";

export default function Card({ clase, onPress }) {
  const { paddingHorizantal, esTablet } = useResponsive();
  return (
    <View style={estilos.tarjeta}>
      <Pressable onPress={onPress} style={{ overflow: "hidden" }}>
        
        <Image
          source={{ uri: clase.imagen }}
          resizeMethod="cover"
          style={[
            estilos.portada,
            { height: esTablet ? 300 : 220, width: "auto" },
          ]}
        /><ScrollView
          contentContainerStyle={estilos.contenidoScroll}
          style={estilos.scroll}
          horizontal
          scrollEnabled={false}
        >
        <LabelLevel nivel={clase.nivel} />
        <Text style={[estilos.horario, estilos.margin]}>
            Cupos: {clase.cupos}
          </Text>
        </ScrollView>
        <ScrollView
          contentContainerStyle={[
            { justifyContent: "flex-start", display: "flex" },
            estilos.contenidoScroll,
          ]}
          style={estilos.scroll}
          horizontal
          scrollEnabled={false}
        >
          <Text style={[estilos.profesor, estilos.margin]}>{clase.titulo}</Text>
          <Text style={[estilos.horario, estilos.margin]}>
           {clase.duracion} minutos
          </Text>
          </ScrollView>
          
        <Text style={[estilos.profesor, estilos.margin]}>
          Profesor: {clase.profesor.nombre}
        </Text>
        
          <Text style={[estilos.horario, estilos.margin]}>
            {clase.horarios.join(" - ")}
          </Text>
          
        <Text style={[estilos.precio, estilos.margin]}>
          Precio: {formatearPrecio(clase.precio)}
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? colors.primarioOscuro : colors.primario,
          paddingVertical: 12,
          width: 200,
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          borderRadius: 25,
          marginVertical: 5,
        })}
      >
        <Text style={estilos.textoBoton}>Reservar clase</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  margin: {
    marginHorizontal: 5,
  },
  tarjeta: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: colors.tarjetas,
    borderRadius: 16,
    overflow: "hidden",
  },
  portada: {
    width: "100%",
    height: 180,
  },
  profesor: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.texto,
  },
  horario: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textoSuave,
  },
  precio: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primario,
  },
  textoBoton: {
    color: colors.primarioSuave,
    fontSize: 16,
    fontWeight: "600",
  },
  contenidoScroll: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  scroll: {
    flexGrow: 1,
  },
});
