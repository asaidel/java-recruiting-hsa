<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<a href="https://concrete.com.br/"><img src=".github/concrete_symbol.png" width="180px" align="right" /></a>

# Desafio Java Concrete

Desafio técnico para evaluar el conocimiento de los aspirantes a unirse al equipo de **Backend**.

## Contenido
- [El Desafio](#el-desafio)
    - [Escenario](#escenario)
    - [APIs](#apis)
    - [Features](#features)
    - [Puntos a Considerar](#puntos-a-considerar)
- [¿Qué nos Gustaría Ver?](#qué-nos-gustaría-ver)
    - [Deseables](#deseables)
    - [Stack/Pool de Tecnologías](#stackpool-de-tecnologías)
- [Forma de Entrega](#forma-de-entrega)
- [Importante](#importante)

## El Desafio

### Escenario
Recientemente te has unido a un equipo que esta desarrollando una aplicación mobile para una gran compañía de e-commerce.  
Esta aplicación esta dirigida a dispositivos de **bajo rendimiento** hasta dispositivos con **gran poder de procesamiento**.  
El cliente ya cuenta con un backend establecido que contiene todas las reglas e información de negocio, pero algunos sistemas dependen de **tecnologías legadas** que pueden ser **inestables**.    
**Tu** eres responsable de construir la **API** que integrará con estos servicios y proveerá todas las informaciones que Mobile necesita.  
Para las próximas iteraciones, el equipo va a trabajar en la **Pantalla de Início** y tu debes construir todo(s) los **endpoint(s)** que se requieran para integrar con los servicios y proveer la información para la pantalla.

### APIs
Necesitarás consumir los siguientes servicios:
- **Categorias**: [https://cs-hsa-api-categories-rest.herokuapp.com/docs](https://cs-hsa-api-categories-rest.herokuapp.com/docs)
- **Cupones**: [https://cs-hsa-api-coupons-rest.herokuapp.com/docs](https://cs-hsa-api-coupons-rest.herokuapp.com/docs)

### Features
El equipo Mobile necesita construir una pantalla de inicio que debe mostrar:

- Carrusel con **Top 5** categorias.
- Carrusel con cupones que no han expirado.
- Tabla (Grid) con las categorias **restantes**.
- Mobile **no** necesita de todas las imagenes del modelo de subcategorías, solamente la **imagen más pequeña**. Tu podrías tener que filtrar la respuesta, si tu quieres.

### Puntos a Considerar
- La API de Cupones es **inestable** y a veces demora en responder. ¿Qué podemos hacer para que este problema no se replique en otras capas? ¿Habrá algún patrón que nos ayude?
- La API de Categorias responde un modelo complejo de manejar. ¿Qué podríamos hacer para simplificar este modelo y que las integraciones con su aplicación sean más sencillas?

## ¿Qué nos Gustaría Ver? 
Eres libre para implementar la solución de la forma que consideres mejor, 
pero debes considerar el escenario, objetivo, implicaciones de performance y stack/pool de tecnología propuesta abajo.
- Nos enfocamos mucho en la **calidad** de nuestros proyectos y nos gustaría ver alguna estrategia aplicada. Puedes usar, por ejemplo, **Pruebas Unitárias**.
- No queremos que la experiencia de usuario se vea afectada por el rendimiento de los servicios;
- **Usted tiene 1 semana para completar el desafio**. Si necesitas mas tiempo, no hay problema, puede hablar con nosotros y veremos que podemos hacer :)
- Documentación de como configurar y ejecutar el proyecto. Puede sobrescribir el **README.md** para eso.

### Deseables
- Podría ser bueno una documentación de API. Sugerencia: [Swagger](https://swagger.io/).
- Ejecutando con [Docker](https://www.docker.com/).

### Stack/Pool de Tecnologías
- **Java 8** o **superiores**.
- Cualquier Framework Web. Sugerencia: [Spring Boot](https://spring.io/projects/spring-boot).
- Cualquier API Client. Sugerencia: [Feign](https://github.com/OpenFeign/feign).
- De preferencia [Gradle](https://gradle.org/) como sistema de compilación.
- Tu eres libre para escoger librerias y frameworks de pruebas que mas te guste. Nuestra sugerencia es: [JUnit](https://junit.org/junit5/), [Mockito](https://site.mockito.org/).

---

## Forma de Entrega
Siga los siguientes pasos para implementar y enviar este desafío:
- Haga un **Fork** a este repositorio. Puedes mirar esta guía para mayores informaciones: [Como hacer fork de un repositorio](https://help.github.com/en/articles/fork-a-repo).
- Implemente el desafío.
- Después de completar el desafío, realice un **Pull Request** a este repositorio, utilizando la interface de **Github**. [Creando un Pull Request](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork).
- Si es posible, deja tu repositorio publico para hacer la revisión de código más sencilla.

## Importante
**No** intente hacer un PUSH directo a ESTE repositorio!

---
