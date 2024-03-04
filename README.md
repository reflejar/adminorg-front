![Header](docs/logo-as.png)

# AdminOrg Front

[![GitHub license](https://img.shields.io/github/license/reflejar/adminorg-front)](https://github.com/reflejar/adminorg-front/blob/main/LICENSE)

Sistema web creado para la administración, gestión, comunicación y contabilidad de comunidades.

## Setup

Hay 2 maneras de preparar el entorno para desarrollo. A a través de Docker o a través de NPM.

### 1 - Docker

> #### ⚠️ Prerequisitos
> 
> Este entorno virtual requiere de:
> - [Docker](https://docs.docker.com/engine/install/_) y (docker) compose (que en las nuevas versiones ya viene en la instalación de docker)

#### Instalación

Abrí una terminal del sistema en el directorio raiz del proyecto y construí la imagen de docker

```bash
$ docker compose build
```

#### Ejecución

Abrí una terminal del sistema en el directorio raiz del proyecto y ejecutá la imagen en un contenedor

```bash
$ docker compose up
```


### 2 - NPM

> #### ⚠️ Prerequisito
> 
> Este entorno requiere de [Node y Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 
> 


#### Instalación

Abrí una terminal del sistema en el directorio raiz del proyecto, instalá las dependencias del proyecto y ejecutá la plataforma

```bash
npm install
# o
yarn install
```

#### Ejecución

Abrí una terminal del sistema en el directorio raiz del proyecto, activá el entorno virtual y ejecutá la plataforma


```bash
npm run dev
# o
yarn dev
```

## Licencia

El siguiente repositorio es un desarrollo de codigo abierto bajo la licencia GNU General Public License v3.0. Pueden acceder a la haciendo [click aqui](./LICENSE).


---
⌨️ con ❤️ por [reflejar](https://github.com/reflejar/) 😊
