Sistema de Gestión de Asistencia

Descripción General
Este proyecto del SENA es un sistema web para la gestión de asistencia y control de jornada laboral, desarrollado con React, Vite y TailwindCSS.

Artefactos del ciclos de software
Para la codificación del módulo se han tenido en cuenta los siguientes artefactos previos:

Diagrama de clases: Define la estructura de datos y relaciones entre entidades (usuarios, asistencias, roles) conforme a la documentacion del proyecto.
Diagramas de casos de uso: Especifican los escenarios principales: registro, login, marcar asistencia, consultar métricas, administración conforme a la documentacion del proyecto..
Historias de usuario: Describen las necesidades de los usuarios (empleado/admin) y los flujos de interacción.
Diseños y prototipos: Usabilidad y experiencia.
Informe técnico de plan de trabajo: Documenta la planificación, y la tecnologías seleccionada conforme a la guia GA7-AA4-EV03 (React, Vite, TailwindCSS)
Versionamiento

El proyecto utiliza Git para el control de versiones.

Tecnologías seleccionadas segun la guia.
React: Librería principal para la interfaz.
Vite: Herramienta de build y desarrollo rápido.
TailwindCSS: Framework de estilos utilitario.
ESLint: Linter para asegurar calidad de código.
Instalación y ejecución
Clonar el repositorio.

Instalar dependencias:
npm install
Ejecutar en modo desarrollo:
npm run dev
Documentación adicional
El proyecto es desarrollado conforme a los diagramas, historias de usuario.

GA7-220501096-AA5-EV01 diseño y desarrollo de servicios web - caso

1.	Analizar los formularios y componentes del frontend en React para identificar los campos, rutas y estructuras de datos que el backend debe soportar, evitando inconsistencias entre ambas capas.
2.	Instalar y configurar todas las dependencias necesarias del proyecto backend: Express, Mongoose, nodemon, dotenv, cors, bcryptjs, jsonwebtoken y express-validator.
3.	Diseñar los modelos de base de datos en MongoDB considerando la información de los formularios de registro, inicio de sesión y los dashboards del frontend.
4.	Implementar la API REST con endpoints de registro (/api/auth/register), inicio de sesión (/api/auth/login) y recuperación de contraseña (/api/auth/forgot), aplicando validaciones y respuestas claras al usuario.
5.	Aplicar manejo de errores mediante try/catch/throw en todos los controladores y middlewares, capturando excepciones y devolviendo mensajes precisos para evitar la finalización abrupta del programa.
6.	Cumplir con los estándares de código establecidos: líneas de máximo 120 caracteres, indentación de 4 espacios, bloques de código relacionados agrupados sin espacios innecesarios, y comentarios que documenten la lógica del código.
7.	Utilizar herramientas de versionamiento (Git y GitHub) para el control de cambios durante todo el proceso de desarrollo del proyec


