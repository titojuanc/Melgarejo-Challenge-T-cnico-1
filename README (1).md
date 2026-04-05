# JuegoContador 🖱️

Challenge Técnico React — Desarrollador Frontend Junior

## Descripción

App web en React que permite al usuario competir contra sí mismo, intentando clickear la mayor cantidad de veces posible un botón durante 5 segundos.

## Cómo correr localmente

### Requisitos

- Node.js >= 18
- npm >= 9

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/juego-contador.git
cd juego-contador

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

## Scripts disponibles

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Previsualizar build de producción |

## Tecnologías utilizadas

- **React 18** con hooks funcionales (useState, useEffect, useRef, useCallback)
- **Vite** como bundler
- CSS puro (sin librerías de componentes)

## Supuestos y consideraciones

1. **Cuenta regresiva**: Los mensajes "Preparados", "Listos" y "Ya" se muestran con 1 segundo de intervalo. Al mostrarse "Ya" comienza el conteo de 5 segundos.
2. **Puntaje máximo**: Se inicializa en 0 y persiste durante la sesión (no se guarda en localStorage para mantener la simplicidad).
3. **Botón de inicio**: Luego de terminar el juego, el botón cambia su texto a "Jugar de nuevo" para mayor claridad UX.
4. **Accesibilidad**: Los botones tienen estados `disabled` semánticamente correctos.
5. **Animaciones**: Se usaron animaciones CSS simples para la cuenta regresiva y el anillo de tiempo restante.

---

## Análisis: Con IA vs Sin IA

Ver archivo [`ANALISIS_IA.md`](./ANALISIS_IA.md) para el análisis completo.
