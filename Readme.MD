# Proyecto 3: Mejoras y Ampliación de un Proyecto Web

En este proyecto realizaremos mejoras e implementaremos nuevas funcionalidades al proyecto clima utlizando 
[The OpenWeather API](https://openweathermap.org/current), con el objetivo de hacer una aplicación web como la que 
tenemos en nuestros dispositivos móviles en la que podemos ver el tiempo y guardar nuestras ubicaciones favoritas
para tenerlas a mano siempre.

Por lo tanto implementaremos las siguientes cosas:
- Implementación de la información más completa y en forma de **tarjeta agregable a una sección de favoritos**, 
para almacenar, como comentamos anteriormente.
- Implementación de un nuevo **modo de búsqueda** a través del código postal de tu ciudad, en el que se podra poner tú 
código postal junto al páis y que te muestre dicho país.
- Y darle persistencia en el navegador utilizando **IndexedDB**

A continuación explicaremos un poco las funcionalidades implementadas y la forma en la que las se implementaron:

## Muestreo de información con agregación a favoritos.
