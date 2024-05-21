# ChallengeNewsletter

Este repositorio contiene un proyecto que consta de un backend y un frontend desarrollados para un desafío específico. El proyecto está diseñado utilizando tecnologías modernas y siguiendo prácticas de desarrollo recomendadas.

## Ejecución

- Local using:
  - `cd service && npm run dev`
  - `cd client && npm run dev`
- Docker using:
  - `docker-compose up`

# Verificación de Funcionalidad de Correo Electrónico

## Instrucciones

1. Visita el sitio web de [Ethereal](https://ethereal.email/).
2. Inicia sesión con las siguientes credenciales:
   - **Usuario**: leila.ortiz@ethereal.email
   - **Contraseña**: 7gmRYMk8yxE6byCXxh

## Descripción

Ethereal es un servicio SMTP falso diseñado para pruebas de correo electrónico. Permite enviar correos electrónicos simulados y verificar su contenido sin enviarlos realmente a los destinatarios.

## Enlaces

- [Ethereal](https://ethereal.email/)
- [Documentación de Ethereal](https://ethereal.email/docs/)

## Backend (Carpeta service)

El backend está desarrollado con node js y sigue una arquitectura limpia para mantener el código organizado y modular.

## Frontend (Carpeta client)

El frontend está desarrollado con Next.js y utiliza una variedad de tecnologías y herramientas para una experiencia de usuario óptima. A continuación se detallan:

- **Next.js**: Se utiliza el framework de React Next.js para proporcionar renderización del lado del servidor y otras características útiles.
- **UI**: Se utilizan componentes de shadcn/ui para agilizar el desarrollo de la interfaz de usuario.
- **Tecnologías Adicionales**: TypeScript para agregar tipado estático al código JavaScript, Tailwind CSS para el diseño y estilización, SWR para la gestión del estado de la caché y recuperación de datos, Zod para validaciones de esquema, Lucidme-react para iconos, react-hook-form para formularios controlados.
