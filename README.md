# Nodejs-login

Este es un login sencillo con Nodejs, Express, Passport y MongoDB.

## Requisitos:

- Node.js
- Una base de datos de MongoDB

## Instalación & Configuración

Descarga o clona este repositorio en tu computadora o PC.

```
git clone https://github.com/Yumiko0828/nodejs-login.git
```

Ahora abre una terminal dentro de la carpeta del proyecto y ejecutas el siguiente comando para instalar las dependencias.

```
npm i
```

Ahora para iniciar la aplicación tienes que correr el siguiente comando:

```
npm start
```

> Antes de esto hay que configurar unas cosas o tendras errores.

- Busca el archivo `.env.example` y remueve el `.example` de tal forma que solo quede `.env`
- Abre el archivo y dentro de `URI` reemplaza `mongodb://*****:27017/database` por la URI de tu base de datos de MongoDB

Ahora si una vez hecho eso, ejecuta el comando:

```
npm start
```

> El Servidor de Express iniciará en el puerto `3000`

Esto se puede cambiar yendo al archivo `./src/index.js` y cambiando en la linea `14:37` el puerto de `3000` al puerto que usted quiera.

## Eso es todo :D

Este es un proyecto de hace 9 meses (a la fecha actual 27 de agosto 2022) pero estoy actualizando el código y sus dependencias.
