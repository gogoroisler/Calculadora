# Calculadora Web

**[Ver en vivo →](https://gogoroisler.github.io/Calculadora)**

Calculadora funcional desarrollada con HTML, CSS y JavaScript vanilla como proyecto de portfolio. Orientada a contextos de educación y contabilidad.

## Características

- Operaciones básicas: suma, resta, multiplicación y división
- Historial de las últimas 10 operaciones con persistencia en `localStorage`
- Exportar historial a `.csv` con fecha del día
- Formato numérico contable: separador de miles con `.` y decimales con `,` (convención Argentina)
- Soporte completo de teclado
- Manejo de errores (división por cero)
- Diseño responsive (mobile-first)
- Accesibilidad con atributos ARIA

## Teclado

| Tecla | Acción |
|-------|--------|
| `0–9` `.` | Ingresar número |
| `+` `-` `*` `/` | Operadores |
| `Enter` o `=` | Calcular |
| `Backspace` | Borrar último dígito |
| `Escape` | Limpiar todo |

## Tecnologías

- HTML5 semántico con meta tags Open Graph
- CSS3 (Grid, Flexbox, media queries, CSS custom layout)
- JavaScript ES6+ con ES Modules nativos (`import`/`export`)
- Web APIs: `localStorage`, `Blob`, `URL.createObjectURL`
- Fuente: [Fraunces](https://fonts.google.com/specimen/Fraunces) vía Google Fonts

## Estructura

```
├── index.html       # Estructura, markup y meta tags
├── style.css        # Estilos y diseño responsive
├── Calculadora.js   # Módulo con la lógica de operaciones matemáticas
├── Display.js       # Módulo que gestiona el estado, la UI y el historial
└── proceso.js       # Entry point: event listeners de botones y teclado
```

## Autor

Santiago González Roisler
