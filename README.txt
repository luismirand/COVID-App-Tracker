# COVID-App-Tracker
#Luis Alberto Miranda Díaz

## Descripción

La aplicación **COVID-19 Tracker USA** permite a los usuarios consultar estadísticas en tiempo real sobre la situación del COVID-19 en los diferentes estados de Estados Unidos. Utiliza los datos proporcionados por la **COVID Tracking API**, que recopila y publica datos actualizados sobre casos confirmados, hospitalizaciones, recuperaciones y muertes en cada estado.

La aplicación presenta los datos en un formato sencillo y visual, incluyendo gráficos interactivos que permiten comparar estadísticas clave de cada estado.

## Características

- Selección de estados: El usuario puede seleccionar un estado de la lista desplegable para obtener las estadísticas más recientes de ese estado.
- Visualización de datos: Se muestran los casos confirmados, hospitalizaciones, recuperaciones y muertes de manera clara y organizada.
- Gráfico interactivo: Los datos se presentan en un gráfico de pastel que permite visualizar las proporciones de cada métrica.
- Diseño adaptativo: La aplicación está optimizada para diferentes tamaños de pantalla y cuenta con un estilo moderno y limpio.
- Footer con créditos: Se da crédito a la fuente de datos de la API y se incluyen enlaces a la licencia de uso.

## Instrucciones de Uso

1. **Abrir la aplicación**: Abre el archivo `index.html` en tu navegador preferido o entra a https://luismirand.github.io/COVID-App-Tracker.
   
2. **Seleccionar un estado**: En la página principal, encontrarás un menú desplegable que contiene la lista de todos los estados de Estados Unidos. Selecciona el estado para el cual deseas consultar los datos.

3. **Consultar datos**: Después de seleccionar un estado, presiona el botón **"Consultar Datos"**. La aplicación consultará la **COVID Tracking API** y mostrará la información correspondiente del estado seleccionado.

4. **Visualizar estadísticas**: Los datos aparecerán en la pantalla mostrando las cifras de casos confirmados, hospitalizaciones, recuperaciones y muertes. Además, verás un gráfico interactivo que muestra la distribución de estos datos, además de otro gráfico que muestra la evolución de los casos de los ultimos 14 días disponibles en la API (hasta el 07 de Marzo 2021).

5. **Cambiar de estado**: Para ver la información de otro estado, simplemente selecciona un nuevo estado en el menú desplegable y presiona el botón **"Consultar Datos"** de nuevo.


## Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge, etc.)
- Conexión a Internet para acceder a los datos de la API

## Dependencias

- **Chart.js**: Se utiliza para crear los graficos interactivo.
- **COVID Tracking API**: Fuente de los datos de COVID-19 utilizados en la aplicación.

## Créditos

Los datos son proporcionados por **The COVID Tracking Project** en **The Atlantic**. Puedes encontrar más información sobre los datos y su licencia en el siguiente enlace: [COVID Tracking Project License](https://covidtracking.com/about-data/license).

## Licencia

Este proyecto se encuentra bajo la licencia **CC BY 4.0**.

