Aquí tienes el README actualizado sin la sección "Cómo usar la aplicación". Puedes copiar y pegar el siguiente contenido:

---

# Proyecto 3: Mejoras y Ampliación de un Proyecto Web

En este proyecto realizaremos mejoras e implementaremos nuevas funcionalidades al proyecto clima utilizando [The OpenWeather API](https://openweathermap.org/current), con el objetivo de hacer una aplicación web como la que tenemos en nuestros dispositivos móviles en la que podemos ver el tiempo y guardar nuestras ubicaciones favoritas para tenerlas a mano siempre.

Por lo tanto implementaremos las siguientes cosas:
- Implementación de la información más completa y en forma de **tarjeta agregable a una sección de favoritos**, para almacenar, como comentamos anteriormente.
- Implementación de un nuevo **modo de búsqueda** a través del código postal de tu ciudad, en el que se podrá poner tu código postal junto al país y que te muestre dicho país.
- Y darle persistencia en el navegador utilizando **IndexedDB**.

## Muestreo de información con agregación a favoritos

### Descripción de la funcionalidad

La funcionalidad principal de la aplicación es mostrar información del clima de una ciudad seleccionada por el usuario y permitir la posibilidad de agregar esa ciudad a una lista de favoritos. La aplicación se basa en la API de OpenWeather, que proporciona datos meteorológicos en tiempo real.

### Implementación de la tarjeta de clima

Cada vez que se realiza una búsqueda de clima, la aplicación genera una tarjeta que muestra información detallada sobre las condiciones actuales, que incluye:

- Nombre de la ciudad
- Icono representativo del clima
- Temperatura actual
- Temperaturas mínima y máxima
- Estado del clima (descripción)
- Porcentaje de humedad

Esta tarjeta también incluye un botón que permite al usuario agregar o eliminar la ciudad de su lista de "Mis Climas". La información se almacena en **IndexedDB**, lo que permite que los datos persistan entre sesiones de usuario.

### Estructura de la base de datos

La base de datos se llama `WeatherAPI`, y contiene un objeto llamado `weathers`. Este objeto almacena información relevante sobre cada ciudad, incluyendo:

- `nameid`: identificador único basado en el nombre de la ciudad en minúsculas
- `name`: nombre de la ciudad
- `weather`: un objeto que contiene el estado del clima, con sus propiedades `main`, `description` e `icon`.
- `main`: un objeto que contiene las temperaturas actuales, mínimas, máximas y la humedad.

### Proceso de búsqueda

El usuario puede buscar el clima de una ciudad utilizando dos métodos: ingresando el nombre de la ciudad junto con su país, o ingresando el código postal. Si se proporciona un código postal, la aplicación verifica que sea numérico antes de realizar la solicitud a la API. Al buscar, la aplicación maneja diferentes casos de error, como ciudades no encontradas o campos vacíos, mostrando alertas correspondientes.

### Funcionalidad de favoritos

Cuando el usuario visualiza una tarjeta de clima, se ejecuta la función `checkWeatherDatabase`, que comprueba si la ciudad ya se encuentra en la base de datos. Si es así, el texto del botón cambia a "Eliminar de mis Climas"; de lo contrario, se muestra "Agregar a Mis Climas". Al hacer clic en el botón, la aplicación agregará la ciudad a la base de datos o la eliminará, según corresponda.

### Persistencia de datos con IndexedDB

La aplicación utiliza IndexedDB para almacenar los datos de las ciudades favoritas de manera eficiente. Esto permite que el usuario pueda acceder a su lista de favoritos en cualquier momento. La estructura de IndexedDB se inicializa en el evento `onupgradeneeded`, donde se crea el objeto `weathers`.

---

Se podría implementar un toast para mejorar la experiencia de agregación y eliminación del usuario, pero por mala 
suerte no dispongo de más tiempo.