# Componentes de Botones - Involuck

Esta carpeta contiene todos los componentes reutilizables de botones para la
aplicación Involuck.

## Componentes Disponibles

### 1. PrimaryButton

Botón principal con estilo azul.

```tsx
import PrimaryButton from './components/Button/PrimaryButton';

<PrimaryButton>Botón Principal</PrimaryButton>;
```

### 2. SecondaryButton

Botón secundario con estilo gris.

```tsx
import SecondaryButton from './components/Button/SecondaryButton';

<SecondaryButton>Botón Secundario</SecondaryButton>;
```

### 3. SuccessButton

Botón de éxito con estilo verde.

```tsx
import SuccessButton from './components/Button/SuccessButton';

<SuccessButton>Botón Éxito</SuccessButton>;
```

### 4. DangerButton

Botón de peligro con estilo rojo.

```tsx
import DangerButton from './components/Button/DangerButton';

<DangerButton>Botón Peligro</DangerButton>;
```

### 5. OutlineButton

Botón con borde y estilo outline.

```tsx
import OutlineButton from './components/Button/OutlineButton';

<OutlineButton>Botón Outline</OutlineButton>;
```

## Props Disponibles

Todos los componentes aceptan las mismas props que un botón HTML estándar:

- `children`: React.ReactNode - El contenido del botón
- `onClick`: () => void - Función que se ejecuta al hacer clic
- `disabled`: boolean - Deshabilita el botón
- `type`: 'button' | 'submit' | 'reset' - Tipo del botón
- `className`: string - Clases CSS adicionales
- Y todas las demás props de HTMLButtonElement

## Ejemplos de Uso

### Formulario de Login

```tsx
<div className="flex gap-4">
  <PrimaryButton type="submit">Iniciar Sesión</PrimaryButton>
  <SecondaryButton>Cancelar</SecondaryButton>
</div>
```

### Acciones de Usuario

```tsx
<div className="flex gap-4">
  <SuccessButton>Guardar</SuccessButton>
  <DangerButton>Eliminar</DangerButton>
  <OutlineButton>Editar</OutlineButton>
</div>
```

### Botón con Evento

```tsx
<PrimaryButton onClick={() => console.log('clicked')}>Hacer Clic</PrimaryButton>
```

### Botón Deshabilitado

```tsx
<DangerButton disabled>Eliminar</DangerButton>
```

## Estilos

Los componentes utilizan Tailwind CSS para los estilos y incluyen:

- **PrimaryButton**: Azul (`bg-blue-600 hover:bg-blue-700`)
- **SecondaryButton**: Gris (`bg-gray-600 hover:bg-gray-700`)
- **SuccessButton**: Verde (`bg-green-600 hover:bg-green-700`)
- **DangerButton**: Rojo (`bg-red-600 hover:bg-red-700`)
- **OutlineButton**: Borde azul con hover (`border-blue-600 hover:bg-blue-600`)

Todos incluyen:

- Transiciones suaves
- Estados de hover y focus
- Estilos para estados deshabilitados
- Responsive design

## Importación

Puedes importar todos los componentes desde el archivo index:

```tsx
import {
  PrimaryButton,
  SecondaryButton,
  SuccessButton,
  DangerButton,
  OutlineButton
} from './components/Button';
```

O importar individualmente:

```tsx
import PrimaryButton from './components/Button/PrimaryButton';
import SuccessButton from './components/Button/SuccessButton';
```

## Estructura de Archivos

```
frontend/src/components/Button/
├── Button.tsx          (ejemplo de componente)
├── PrimaryButton.tsx   (botón azul principal)
├── SecondaryButton.tsx (botón gris secundario)
├── SuccessButton.tsx   (botón verde éxito)
├── DangerButton.tsx    (botón rojo peligro)
├── OutlineButton.tsx   (botón con borde)
├── index.ts            (exportar todos)
└── README.md           (documentación)
```
