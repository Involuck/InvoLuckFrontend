# Tailwind CSS Styling - InvoLuck Frontend

## Overview

This skill covers Tailwind CSS v4 styling patterns, custom theme configuration,
and dark mode implementation in InvoLuck.

## Tailwind v4 Configuration

### Global CSS Setup

Location: `src/app/globals.css`

```css
@import 'tailwindcss';

/* Dark mode variant for Tailwind v4 */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Brand colors (purple) */
  --color-brand-50: #f5f3ff;
  --color-brand-100: #ede9fe;
  --color-brand-200: #ddd6fe;
  --color-brand-300: #c4b5fd;
  --color-brand-400: #a78bfa;
  --color-brand-500: #8b5cf6;
  --color-brand-600: #7c3aed;
  --color-brand-700: #6d28d9;
  --color-brand-800: #5b21b6;
  --color-brand-900: #4c1d95;
  --color-brand-950: #2e1065;
}
```

## Color Palette

### Primary Brand Colors (Purple)

```typescript
// Use for primary actions, highlights, and branding
'bg-purple-600'; // Primary buttons
'bg-purple-700'; // Hover state
'text-purple-600'; // Links, accents
'border-purple-500'; // Focus rings
'bg-purple-100'; // Light backgrounds
'bg-purple-900/30'; // Dark mode backgrounds
```

### Status Colors

```typescript
// Success (Green)
'bg-green-600 text-white'; // Success buttons
'text-green-600 dark:text-green-400'; // Success text
'bg-green-100 dark:bg-green-900/30'; // Success backgrounds

// Warning (Yellow/Orange)
'bg-yellow-500 text-white';
'text-yellow-600 dark:text-yellow-400';

// Error (Red)
'bg-red-600 text-white';
'text-red-600 dark:text-red-400';
'border-red-500';

// Info (Blue)
'bg-blue-600 text-white';
'text-blue-600 dark:text-blue-400';
```

### Neutral Colors

```typescript
// Backgrounds
'bg-white dark:bg-gray-800'; // Cards
'bg-gray-50 dark:bg-gray-900'; // Page backgrounds
'bg-gray-100 dark:bg-gray-700'; // Secondary backgrounds

// Text
'text-gray-900 dark:text-white'; // Primary text
'text-gray-600 dark:text-gray-400'; // Secondary text
'text-gray-500 dark:text-gray-500'; // Muted text

// Borders
'border-gray-200 dark:border-gray-700';
'border-gray-100 dark:border-gray-800';
```

## Dark Mode Implementation

### Theme Provider Usage

```typescript
import { useTheme } from '@/components/ui/ThemeProvider';

const { theme, setTheme, resolvedTheme } = useTheme();

// Toggle between themes
setTheme('light');
setTheme('dark');
setTheme('system');
```

### Dark Mode Classes Pattern

```typescript
// Always pair light and dark variants
className={`
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
  border-gray-200 dark:border-gray-700
  hover:bg-gray-50 dark:hover:bg-gray-700
`}
```

### Dark Mode for Cards

```typescript
<div className="
  bg-white dark:bg-gray-800
  rounded-xl
  border border-gray-200 dark:border-gray-700
  shadow-sm dark:shadow-gray-900/20
  p-6
">
  Content
</div>
```

## Responsive Design

### Breakpoints

```typescript
// sm: 640px  - Small devices
// md: 768px  - Tablets
// lg: 1024px - Laptops
// xl: 1280px - Desktops
// 2xl: 1536px - Large screens

// Mobile-first approach
className="
  text-sm sm:text-base lg:text-lg
  p-3 sm:p-4 lg:p-6
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
"
```

### Common Responsive Patterns

```typescript
// Hide on mobile, show on desktop
className = 'hidden md:block';

// Show on mobile, hide on desktop
className = 'md:hidden';

// Responsive grid
className = 'grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6';

// Responsive spacing
className = 'space-y-4 sm:space-y-6 lg:space-y-8';

// Responsive text
className = 'text-xl sm:text-2xl lg:text-3xl';

// Responsive padding
className = 'p-3 sm:p-4 lg:p-6 xl:p-8';
```

## Component Styling Patterns

### Buttons

```typescript
// Primary Button
className="
  bg-purple-600 hover:bg-purple-700
  text-white font-medium
  px-4 py-2 rounded-lg
  transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
"

// Secondary Button
className="
  bg-gray-100 dark:bg-gray-700
  hover:bg-gray-200 dark:hover:bg-gray-600
  text-gray-700 dark:text-gray-300
  px-4 py-2 rounded-lg
  transition-colors duration-200
"

// Outline Button
className="
  border-2 border-purple-600
  text-purple-600 dark:text-purple-400
  hover:bg-purple-50 dark:hover:bg-purple-900/20
  px-4 py-2 rounded-lg
  transition-colors duration-200
"
```

### Cards

```typescript
// Basic Card
className="
  bg-white dark:bg-gray-800
  rounded-xl
  border border-gray-200 dark:border-gray-700
  p-4 sm:p-6
  shadow-sm
"

// Hoverable Card
className="
  bg-white dark:bg-gray-800
  rounded-xl
  border border-gray-200 dark:border-gray-700
  p-6
  shadow-sm
  hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600
  transition-all duration-300
  cursor-pointer
"

// Gradient Card
className="
  bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800
  rounded-xl
  p-6
  text-white
  shadow-xl
"
```

### Form Inputs

```typescript
// Text Input
className="
  w-full
  px-4 py-2.5
  border border-gray-200 dark:border-gray-700
  rounded-lg
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
  placeholder-gray-400
  focus:ring-2 focus:ring-purple-500 focus:border-transparent
  transition-all
"

// Input with error state
className="
  border-red-500
  focus:ring-red-500
  bg-red-50 dark:bg-red-900/20
"

// Input with success state
className="
  border-green-500
  focus:ring-green-500
  bg-green-50 dark:bg-green-900/20
"
```

### Badges/Pills

```typescript
// Success Badge
className="
  inline-flex items-center
  px-2.5 py-0.5
  rounded-full
  text-xs font-medium
  bg-green-100 dark:bg-green-900/30
  text-green-800 dark:text-green-300
"

// Warning Badge
className="
  bg-yellow-100 dark:bg-yellow-900/30
  text-yellow-800 dark:text-yellow-300
"

// Error Badge
className="
  bg-red-100 dark:bg-red-900/30
  text-red-800 dark:text-red-300
"
```

## Custom Utilities

### InvoLuck Background (for auth pages)

```css
.involuck-bg {
  background-color: var(--color-brand-950);
  background-image:
    radial-gradient(
      60% 80% at 10% -10%,
      var(--color-brand-700) 0%,
      transparent 60%
    ),
    radial-gradient(
      50% 70% at 90% 0%,
      var(--color-brand-500) 0%,
      transparent 55%
    ),
    radial-gradient(
      80% 60% at 50% 110%,
      var(--color-brand-800) 0%,
      transparent 60%
    ),
    linear-gradient(180deg, var(--color-brand-900), var(--color-brand-950));
}

.involuck-grid {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.12) 1px,
    transparent 0
  );
  background-size: 28px 28px;
  opacity: 0.25;
}
```

### Gradient Text

```typescript
className="
  bg-gradient-to-r from-purple-600 to-purple-800
  bg-clip-text text-transparent
"
```

### Focus States

```typescript
// Always include visible focus states for accessibility
className="
  focus:outline-none
  focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
  dark:focus:ring-offset-gray-800
"
```

## Animation Classes

### Tailwind Config Animations

```javascript
// tailwind.config.js
animation: {
  'fade-in': 'fadeIn 0.3s ease-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'bounce-subtle': 'bounceSubtle 0.5s ease-in-out'
}
```

### Framer Motion Integration

```typescript
// Prefer Framer Motion for complex animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

## Best Practices

1. **Mobile-first**: Start with mobile styles, add breakpoint modifiers for
   larger screens
2. **Dark mode always**: Include `dark:` variants for all color classes
3. **Consistent spacing**: Use the spacing scale (2, 3, 4, 6, 8) consistently
4. **Semantic colors**: Use status colors appropriately (green=success,
   red=error)
5. **Focus states**: Always include visible focus indicators for accessibility
6. **Transitions**: Add `transition-all duration-200` for smooth state changes
