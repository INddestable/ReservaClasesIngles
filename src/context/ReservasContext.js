import AsyncStorage from "@react-native-async-storage/async-storage";
import {createContext,useCallback,useEffect,useMemo,useState,} from "react";

const CLAVE_RESERVAS = "@reservas_ingles";

export const ReservaContext = createContext(null);

export function ReservaProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  //Cargar las reservas que tengo guardadas, sino tengo nada se devuelve un arreglo vacío
  useEffect(() => {
    const cargar = async () => {
      try {
        const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
        if (guardado !== null) {
          setReservas(JSON.parse(guardado));
        }
      } catch (error) {
        console.log("Error leyendo reservas:", error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);
  //Hacer el guardado
  useEffect(() => {
    if (cargando) return;
    AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch(
      (error) => console.log('Error al guardar la reserva', error)
    );
  }, [reservas, cargando]);

const agregarReserva = useCallback((clase, horario) => {
    const nueva = {
        id: clase.id + '-' + horario,
        titulo: clase.titulo,
        nivel: clase.nivel,
        profesor: clase.profesor.nombre,
        precio: clase.precio,
        horario, //Ojito, como ya lo traemos de arriba no necesitamos hacerlo clave valor    ~//w//~
        creadoEn: new Date().toISOString(),
    }

    if (reservas.some((r) => r.id === nueva.id)) {
      return { ok: false };
    }

    setReservas((previas) => [nueva, ...previas]);

    return { ok: true };
  }, [reservas]);

const valor = useMemo(
    () => ({cargando, agregarReserva, reservas}),
    [cargando, agregarReserva, reservas]
)

  return (
    <ReservaContext.Provider value={valor}>
      {children}
    </ReservaContext.Provider>
  );
} //Esta es la llave de cierre de ReservaProvider