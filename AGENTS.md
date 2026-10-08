# AGENTS.md --- AuditorIA del proyecto

## 1. Contexto del proyecto

-   Proyecto de desarrollo mÃ³vil hecho con **Expo + JavaScript + React /
    React Native**.
-   El objetivo del proyecto es una aplicaciÃ³n para **reservar clases de
    inglÃ©s**.
-   El dominio incluye informaciÃ³n como:
    -   nombre de la clase/profesor;
    -   detalles del profesor;
    -   nivel del curso;
    -   reservas realizadas;
    -   datos del formulario asociados a la reserva.
-   El proyecto tiene una restricciÃ³n importante: **no se deben instalar
    librerÃ­as adicionales**. Las soluciones deben construirse con las
    librerÃ­as que ya existen en el proyecto.

## 2. Hallazgos de los otros chats

### 2.1 NavegaciÃ³n y estructura inicial

En uno de los chats aparece una estructura similar a:

``` js
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigator from "./src/navigation/TabNavigator";
```

Esto indica que el proyecto utiliza:

-   `expo-status-bar`;
-   `@react-navigation/native`;
-   `react-native-safe-area-context`;
-   navegaciÃ³n mediante un `TabNavigator`;
-   una estructura organizada dentro de `src/navigation`.

### 2.2 Persistencia con AsyncStorage

Se trabajÃ³ el concepto de guardar las reservas utilizando
**AsyncStorage**.

Puntos importantes detectados:

-   AsyncStorage sirve para persistir informaciÃ³n localmente en el
    dispositivo.
-   Los datos almacenados son persistentes entre renders y normalmente
    entre aperturas de la aplicaciÃ³n.
-   AsyncStorage trabaja esencialmente con valores tipo string, por lo
    que objetos y arrays deben convertirse mediante
    serializaciÃ³n/deserializaciÃ³n:
    -   guardar: `JSON.stringify(...)`;
    -   recuperar: `JSON.parse(...)`.
-   Para una colecciÃ³n de reservas, el patrÃ³n conceptual es:
    1.  obtener las reservas actuales;
    2.  convertirlas desde JSON;
    3.  modificar el array;
    4.  volver a serializarlo;
    5.  guardar el nuevo valor bajo la misma clave.
-   Para borrar una reserva no necesariamente hay que borrar todo
    AsyncStorage. Lo normal es:
    1.  recuperar el array;
    2.  identificar la reserva que se quiere eliminar;
    3.  crear un nuevo array sin esa reserva;
    4.  guardar nuevamente el array actualizado.
-   `AsyncStorage.removeItem(...)` elimina completamente el valor
    asociado a una **clave**, por lo que no es la herramienta adecuada
    si se quiere eliminar solamente una reserva dentro de un array
    compartido.

### 2.3 Aprendizaje sobre formularios y `TextInput`

En otro chat se analizÃ³ un `TextInput` para telÃ©fono, con un patrÃ³n de
este estilo:

``` jsx
<TextInput
    placeholder="Telefono"
    style={style.textInputs}
    value={form.telefono}
    onChangeText={(text) => {
        const soloNumeros = text.replace(...)
    }}
/>
```

El punto pedagÃ³gico importante fue entender **por quÃ© sÃ­ se puede hacer
esa transformaciÃ³n dentro de `onChangeText`**.

La idea es:

1.  `TextInput` recibe lo que escribe el usuario mediante `text`.
2.  `text` representa el nuevo contenido escrito.
3.  `replace(...)` produce una nueva cadena filtrada.
4.  Esa cadena filtrada puede utilizarse para actualizar el estado del
    formulario.
5.  `value={form.telefono}` hace que el componente sea controlado por el
    estado.

Por tanto, no se trata de una "locura" o de modificar mÃ¡gicamente el
`TextInput`: es una transformaciÃ³n del dato de entrada antes de
almacenarlo en el estado.

## 3. Patrones que se deben mantener

### Estado de formularios

Cuando exista un formulario con varios campos, mantener un Ãºnico objeto
de estado puede ser una opciÃ³n vÃ¡lida:

``` js
const [form, setForm] = useState({
  nombre: "",
  telefono: "",
  // ...
});
```

Para actualizar un solo campo, hay que conservar los demÃ¡s valores:

``` js
setForm({
  ...form,
  telefono: nuevoTelefono,
});
```

TambiÃ©n puede utilizarse la forma funcional cuando la actualizaciÃ³n
depende del estado anterior:

``` js
setForm((prev) => ({
  ...prev,
  telefono: nuevoTelefono,
}));
```

### Filtrado de entrada

Si un campo debe aceptar Ãºnicamente ciertos caracteres, la
validaciÃ³n/normalizaciÃ³n puede realizarse en `onChangeText`.

Ejemplo conceptual para nÃºmeros:

``` js
const soloNumeros = text.replace(/[^0-9]/g, "");
```

Esto elimina los caracteres que no sean dÃ­gitos antes de guardar el
valor.

### AsyncStorage

Mantener separadas conceptualmente estas operaciones:

-   **leer** (`getItem`);
-   **guardar/actualizar** (`setItem`);
-   **eliminar una clave completa** (`removeItem`).

No confundir `removeItem` con eliminar un elemento de un array
almacenado.

## 4. Restricciones de implementaciÃ³n

Estas reglas deben considerarse obligatorias para futuras modificaciones
del proyecto:

1.  **No instalar nuevas librerÃ­as.**
2.  Trabajar con las dependencias que ya existen.
3.  Mantener la soluciÃ³n compatible con **Expo + React Native +
    JavaScript**.
4.  Evitar introducir soluciones propias de una aplicaciÃ³n web si no son
    compatibles con React Native.
5.  Preferir APIs nativas y librerÃ­as ya presentes en el proyecto.
6.  No cambiar la arquitectura del proyecto sin necesidad.
7.  No agregar abstracciones complejas cuando una soluciÃ³n sencilla sea
    suficiente.
8.  Explicar el funcionamiento cuando el objetivo sea aprendizaje, en
    lugar de entregar solamente cÃ³digo terminado.

## 5. Enfoque pedagÃ³gico detectado

El usuario ha indicado explÃ­citamente que en determinadas ocasiones **no
quiere que se le entregue directamente la soluciÃ³n**, sino que quiere
entender cÃ³mo llegar a ella.

Por ello, cuando pida una explicaciÃ³n para aprender:

-   explicar primero el concepto;
-   descomponer el problema;
-   mostrar quÃ© hace cada parte;
-   explicar por quÃ© una aproximaciÃ³n funciona o no;
-   utilizar ejemplos pequeÃ±os;
-   evitar resolver todo el ejercicio de golpe si el usuario pidiÃ³
    orientaciÃ³n.

Cuando pida explÃ­citamente la implementaciÃ³n completa, sÃ­ se puede
proporcionar el cÃ³digo.

## 6. AsyncStorage: modelo mental recomendado

Para una reserva almacenada localmente, pensar en AsyncStorage como un
diccionario persistente:

``` text
clave â†’ valor string
```

Por ejemplo:

``` text
"reservas" â†’ '[{"id":1,"profesor":"..."}]'
```

El array real existe en JavaScript despuÃ©s de hacer:

``` js
JSON.parse(valor)
```

Y vuelve a convertirse en string para almacenarlo:

``` js
JSON.stringify(reservas)
```

### Agregar una reserva

Modelo mental:

``` text
AsyncStorage
    â†“
leer reservas
    â†“
JSON.parse
    â†“
array de reservas
    â†“
agregar nueva reserva
    â†“
JSON.stringify
    â†“
AsyncStorage
```

### Eliminar una reserva

Modelo mental:

``` text
AsyncStorage
    â†“
leer reservas
    â†“
JSON.parse
    â†“
filtrar la reserva que se quiere eliminar
    â†“
JSON.stringify
    â†“
AsyncStorage
```

Esto es preferible a intentar eliminar directamente una parte del string
almacenado.

## 7. Riesgos y puntos a vigilar

### IdentificaciÃ³n de reservas

Para borrar o modificar una reserva, cada reserva deberÃ­a tener una
forma confiable de identificarse.

No conviene depender Ãºnicamente del nombre del profesor o de un texto
que podrÃ­a repetirse.

Idealmente:

``` js
{
  id: "...",
  profesor: "...",
  nivel: "...",
  // ...
}
```

El `id` permite distinguir dos reservas que tengan otros datos iguales.

### Estado vs.Â almacenamiento

Hay que diferenciar:

-   **estado de React**: sirve para que la interfaz se actualice;
-   **AsyncStorage**: sirve para persistir los datos.

Actualizar AsyncStorage no hace automÃ¡ticamente que todos los
componentes de React se vuelvan a renderizar. Normalmente tambiÃ©n hay
que actualizar el estado correspondiente.

### Datos almacenados

No asumir que AsyncStorage es una base de datos relacional. Para el
alcance de este proyecto puede servir perfectamente para persistencia
local sencilla, pero la aplicaciÃ³n debe tratar los datos como
almacenamiento local serializado.

## 8. AuditorÃ­a de la informaciÃ³n disponible

Esta auditorÃ­a se basa Ãºnicamente en el contenido de los otros chats que
estÃ¡ disponible en el contexto compartido de este proyecto.

Se observa informaciÃ³n suficiente para establecer:

-   stack general;
-   restricciÃ³n de dependencias;
-   uso de React Navigation;
-   uso de Safe Area;
-   persistencia de reservas con AsyncStorage;
-   manipulaciÃ³n de formularios;
-   filtrado de entradas;
-   preferencia por explicaciones pedagÃ³gicas.

**No se debe asumir** que esta auditorÃ­a contiene el cÃ³digo completo de
la aplicaciÃ³n, todas las pantallas, todos los componentes, todas las
dependencias o todas las decisiones tomadas en conversaciones que no
estÃ©n disponibles en el contexto.

## 9. Reglas para futuros agentes

Antes de modificar cÃ³digo:

1.  Revisar la estructura existente.
2.  Reutilizar componentes y librerÃ­as ya presentes.
3.  No instalar dependencias nuevas.
4.  Verificar cÃ³mo se estÃ¡ manejando actualmente el estado.
5.  Verificar cÃ³mo se estÃ¡ persistiendo actualmente la informaciÃ³n.
6.  Mantener consistencia con `src/navigation` y la arquitectura
    existente.
7.  Si se modifica la persistencia, considerar tanto AsyncStorage como
    el estado de React.
8.  Si se modifica un formulario, conservar el patrÃ³n de estado
    controlado.
9.  Si el usuario pide aprender, explicar antes de resolver.
10. No inventar archivos, dependencias o decisiones que no hayan sido
    comprobadas.

## 10. Estado actual de la auditorÃ­a

**Nivel de confianza:** medio.

La informaciÃ³n disponible permite documentar los patrones y decisiones
mencionados, pero no constituye una revisiÃ³n exhaustiva del repositorio
completo. Para una auditorÃ­a real del cÃ³digo fuente habrÃ­a que revisar
el Ã¡rbol de archivos y los archivos actuales del proyecto.