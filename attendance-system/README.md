# Sistema de Gestión de Asistencia

## Descripción General
Este proyecto es un sistema web para la gestión de asistencia y control de jornada laboral, desarrollado con React, Vite y TailwindCSS. Permite a empleados y administradores registrar entradas/salidas, consultar métricas, y gestionar usuarios.

## Artefactos del ciclo de software
Para la codificación del módulo se han tenido en cuenta los siguientes artefactos previos:
- **Diagrama de clases:** Define la estructura de datos y relaciones entre entidades (usuarios, asistencias, roles).
- **Diagramas de casos de uso:** Especifican los escenarios principales: registro, login, marcar asistencia, consultar métricas, administración.
- **Historias de usuario:** Describen las necesidades de los usuarios (empleado/admin) y los flujos de interacción.
- **Diseños y prototipos:** Mockups y wireframes para la interfaz, asegurando usabilidad y experiencia.
- **Informe técnico de plan de trabajo:** Documenta la planificación, tecnologías seleccionadas (React, Vite, TailwindCSS, ESLint), y criterios de calidad.

## Estructura del Proyecto
- `src/components/layout/AppShell.jsx`: Layout principal con sidebar y navegación.
- `src/components/auth/ProtectedRoute.jsx`: Control de acceso por roles.
- `src/pages/Home.jsx`: Página de inicio con navbar y acceso rápido.
- `src/pages/Login.jsx`, `src/pages/Register.jsx`, `src/pages/Recover.jsx`: Autenticación y registro.
- `src/pages/DashboardEmployee.jsx`, `src/pages/DashboardAdmin.jsx`: Paneles diferenciados para empleados y administradores.
- `src/contexts/AuthContext.jsx`: Contexto global de autenticación.
- `src/services/authService.js`: Lógica de autenticación y gestión de usuarios.

## Versionamiento
El proyecto utiliza **Git** para el control de versiones. El archivo `.gitignore` excluye dependencias y archivos temporales. Se recomienda trabajar en ramas para nuevas funcionalidades y documentar los cambios en cada commit.

## Tecnologías seleccionadas
- **React**: Librería principal para la interfaz.
- **Vite**: Herramienta de build y desarrollo rápido.
- **TailwindCSS**: Framework de estilos utilitario.
- **ESLint**: Linter para asegurar calidad de código.
- **react-router-dom**: Enrutamiento.
- **react-hook-form** y **yup**: Formularios y validación.
- **lucide-react**: Iconografía.

## Instalación y ejecución
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

## Consideraciones
- El diseño modular facilita la escalabilidad y el mantenimiento.
- Los artefactos previos guían la implementación y aseguran alineación con los requisitos.
- El versionamiento permite trazabilidad y colaboración.

## Documentación adicional
Se recomienda adjuntar los diagramas, historias de usuario y prototipos en la carpeta `/docs` o como enlaces en este README.

---
**Autor:** Equipo de desarrollo SENA
**Fecha:** 22 de febrero de 2026
