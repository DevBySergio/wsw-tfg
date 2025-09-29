# Decisiones de Arquitectura de "Wall Street Wars"

Este documento describe las decisiones arquitectónicas clave que definen la estructura y el comportamiento del sistema, según lo establecido en el roadmap del proyecto.

## 1. API GraphQL

Para la comunicación entre el cliente (React) y el servidor (NestJS), se ha elegido **GraphQL** en lugar de una API REST tradicional.

### Justificación

- **Eficiencia y Flexibilidad**: GraphQL permite al cliente solicitar exactamente los datos que necesita y nada más. Esto soluciona los problemas inherentes de las APIs REST de _over-fetching_ (recibir más datos de los necesarios) y _under-fetching_ (tener que hacer múltiples peticiones para obtener todos los datos).
- **Contrato Fuertemente Tipado**: El esquema de GraphQL sirve como un contrato robusto entre el frontend y el backend, lo que facilita el desarrollo y la detección de errores en una fase temprana.
- **Unificación de Operaciones**: La especificación unifica la obtención de datos (Queries), la modificación de datos (Mutations) y las actualizaciones en tiempo real (Subscriptions) bajo un mismo lenguaje y esquema.

## 2. Arquitectura Orientada a Eventos (EDA) en el Backend

El backend se ha diseñado siguiendo un patrón de **Arquitectura Orientada a Eventos (EDA)**.

### Justificación

- **Desacoplamiento de Servicios**: EDA nos permite desacoplar la lógica de negocio en módulos independientes. En lugar de que un servicio llame directamente a otro, emite un evento, y otros servicios escuchan y reaccionan a ese evento.
- **Escalabilidad y Mantenibilidad**: Al estar los servicios desacoplados, es mucho más sencillo mantener, modificar o escalar una parte del sistema sin afectar a las demás.
- **Resiliencia Mejorada**: Si un servicio secundario (por ejemplo, el que otorga logros) falla, no interrumpe el flujo principal (por ejemplo, la ejecución de una orden de compra).

### Ejemplo Práctico: Ejecución de una Orden

1.  Un usuario ejecuta una `executeTrade` (mutación de GraphQL).
2.  El servicio principal tiene una única responsabilidad: ejecutar la transacción de forma atómica en la base de datos (verificar saldo, actualizar holdings).
3.  Una vez la transacción se confirma en la base de datos, el servicio emite un evento, por ejemplo, `order.executed`.
4.  Módulos completamente separados escuchan este evento:
    - `GamificationService`: Comprueba si la orden cumple los requisitos para un nuevo logro.
    - `SocialService`: Si el usuario es copiado, genera las órdenes para sus seguidores.
    - `LeaderboardService`: Invalida la caché del ranking para que se recalcule con los nuevos datos.

Este enfoque hace que el sistema sea mucho más robusto y fácil de extender en el futuro.
