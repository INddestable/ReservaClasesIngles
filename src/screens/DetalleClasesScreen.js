import { useState, useContext } from "react";
import {View, Text, StyleSheet, ScrollView, Alert, Image, Pressable} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useResponsive from "../hooks/useResponsive";
import { colors, spacing, radius, typography, sombra } from "../theme";
import { formatearPrecio } from "../data/classes";
import LabelLevel from "../components/LabelLevel";
import { useLogin } from "../context/LoginContext";
import { ReservaContext } from "../context/ReservasContext";

export default function DetalleClasesScreen({ route }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { clase } = route.params;// otra manera de desestructurar objetos
  const { paddingHorizantal, esTablet } = useResponsive();
  const [cupos, setCupos] = useState(clase.cupos);
  const [horarioElegido, setHorarioElegido] = useState(null);
  const { isLogged } = useLogin();
  const { agregarReserva } = useContext(ReservaContext);
  const restarCupos = () => {
    // 1. Para reservar es obligatorio haber iniciado sesión
    if (!isLogged) {
      Alert.alert(
        "Reservar Clases",
        "Debes iniciar sesión para reservar una clase.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Ir a Perfil", onPress: () => navigation.navigate("Perfil") },
        ],
      );
      return;
    }

    // 2. Hay que elegir un horario
    if (!horarioElegido) {
      Alert.alert("Reservar Clases", "Elige un horario antes de reservar.");
      return;
    }

    // 3. Debe haber cupos
    if (cupos < 1) {
      Alert.alert(
        "Reservar Clases",
        `La clase ${clase.titulo} no cuenta con más cupos`,
      );
      return;
    }

    // 4. Guardar la reserva (devuelve ok:false si ya existe)
    const { ok } = agregarReserva(clase, horarioElegido);

    if (!ok) {
      Alert.alert("Reservar Clases", "Ya reservaste esta clase en ese horario.");
      return;
    }

    setCupos((cupoRestante) => cupoRestante - 1);
    Alert.alert(
      "Reservar Clases",
      `Has reservado ${clase.titulo} - ${horarioElegido}`,
    );
  };
  return (
    <View style={estilos.pantalla}>
      <Pressable style={{
        margin: 10,
      }} onPress={() => navigation.goBack() }>
        <Ionicons name="arrow-back" size={28} 
        style={{
          color: colors.exito,
          borderWidth: 0, //DONT REMOVE - NO QUITAR (It looks like it's not doing anything, but it actually is doing something. PARECE QUE NO HACE NADA, PERO SI HACE ALGO)
          borderRadius: 100,
          width: 30,
        }}
        />
      </Pressable>
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

          <View style={estilos.horarios}>
            {clase.horarios.map((h) => {
              const elegido = h === horarioElegido;
              return (
                <Pressable
                  key={h}
                  onPress={() => setHorarioElegido(h)}
                  style={[estilos.horario, elegido && estilos.horarioSeleccionado]}
                >
                  <Text
                    style={[
                      estilos.horarioTexto,
                      elegido && estilos.horarioTextoSeleccionado,
                    ]}
                  >
                    {h}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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