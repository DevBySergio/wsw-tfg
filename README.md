# Wall Street Wars (WSW) - TFG

Este repositorio contiene el código fuente del proyecto "Wall Street Wars", una plataforma de inversión simulada de alto rendimiento construida con un stack tecnológico moderno. El objetivo es permitir a los usuarios invertir dinero ficticio en activos financieros reales, competir en rankings y aprender sobre el mercado en un entorno gamificado.

## Principios Arquitectónicos Clave

La plataforma se construye sobre cuatro pilares fundamentales para garantizar su escalabilidad, mantenibilidad y robustez:

1.  **API GraphQL:** Para una comunicación cliente-servidor optimizada y flexible, eliminando los problemas de _over-fetching_ y _under-fetching_.
2.  **Arquitectura Orientada a Eventos (EDA):** El backend utiliza un enfoque basado en eventos para desacoplar los servicios, mejorar la resiliencia y facilitar la escalabilidad.
3.  **Seguridad de Grado Profesional:** Se implementa un modelo de seguridad robusto, incluyendo JWT con rotación de tokens de refresco y protección contra ataques comunes.
4.  **Manejo de Errores Centrado en el Usuario:** La interfaz proporciona feedback claro y accionable en todo momento para mejorar la experiencia de usuario.

## Características Principales

- **Trading Simulado:** Compra y venta de activos financieros con dinero ficticio y precios de mercado reales.
- **Visualización de Gráficas Profesional:** Integración con `TradingView Lightweight Charts` para un análisis técnico avanzado.
- **Gamificación y Competencia:**
  - Rankings de rendimiento para competir contra otros usuarios.
  - Sistema de logros para recompensar hitos de inversión.
  - Torneos periódicos con saldos reiniciados.
- **Panel de Administración:** Una interfaz exclusiva para administradores que permite la gestión de usuarios, activos y el monitoreo de la plataforma a través de un log de auditoría.
- **Funcionalidades Sociales:** Posibilidad de seguir a otros usuarios y replicar sus operaciones automáticamente (Copy Trading).
- **Módulo Educativo:** Contenido y artículos sobre conceptos clave de inversión para guiar a los usuarios principiantes.

## Tech Stack Seleccionado

| Área                | Tecnología                                                                   |
| ------------------- | ---------------------------------------------------------------------------- |
| **Frontend**        | React, React Router, Zustand, React Query.                                   |
| **Gráficas**        | TradingView Lightweight Charts.                                              |
| **Backend**         | Node.js con el framework NestJS.                                             |
| **API**             | GraphQL sobre HTTP.                                                          |
| **Base de Datos**   | PostgreSQL (con posible uso de TimescaleDB).                                 |
| **ORM**             | Prisma.                                                                      |
| **Caché y Colas**   | Redis para caché y BullMQ para trabajos en segundo plano.                    |
| **Testing**         | Jest (Backend), React Testing Library (Frontend), Cypress (E2E), k6 (Carga). |
| **Infraestructura** | Docker y Docker Compose.                                                     |
| **CI/CD**           | GitHub Actions.                                                              |

## Levantar el Entorno Local

_Próximamente, podrás levantar todo el entorno de desarrollo (backend, frontend, base de datos y Redis) con un simple comando._

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```
