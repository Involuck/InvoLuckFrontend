# Mobile Responsive Design - InvoLuck Frontend

## Overview
This skill covers mobile-first responsive design patterns, breakpoint strategies, and touch-friendly interactions.

## Breakpoint System

```typescript
// Tailwind CSS Breakpoints
// sm: 640px  - Small phones (landscape)
// md: 768px  - Tablets
// lg: 1024px - Laptops
// xl: 1280px - Desktops
// 2xl: 1536px - Large screens

// Mobile-first approach: Base styles are for mobile, add breakpoint modifiers for larger screens
```

## Responsive Patterns

### 1. Responsive Typography

```typescript
// Headings
className="text-xl sm:text-2xl lg:text-3xl font-bold"

// Body text
className="text-sm sm:text-base lg:text-lg"

// Small text
className="text-xs sm:text-sm"

// Very small (labels, badges)
className="text-[10px] sm:text-xs"
```

### 2. Responsive Spacing

```typescript
// Padding
className="p-3 sm:p-4 lg:p-6 xl:p-8"

// Margin
className="m-2 sm:m-3 lg:m-4"

// Gap in flex/grid
className="gap-2 sm:gap-3 lg:gap-4 xl:gap-6"

// Vertical spacing (sections)
className="space-y-4 sm:space-y-6 lg:space-y-8"
```

### 3. Responsive Grid Layouts

```typescript
// 2 columns on mobile, 4 on desktop
className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"

// 1 column on mobile, 2 on tablet, 3 on desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"

// Sidebar layout
className="grid grid-cols-1 lg:grid-cols-3 gap-4"
// Main content
className="lg:col-span-2"
```

### 4. Responsive Visibility

```typescript
// Hide on mobile, show on desktop
className="hidden md:block"
className="hidden lg:flex"

// Show on mobile, hide on desktop
className="md:hidden"
className="block lg:hidden"

// Show inline text only on larger screens
<span className="hidden sm:inline">descripción completa</span>
```

### 5. Responsive Sizing

```typescript
// Icons
className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"

// Buttons
className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"

// Cards/containers
className="rounded-lg sm:rounded-xl lg:rounded-2xl"
```

## Mobile Navigation (Sidebar)

### Desktop vs Mobile Sidebar
Location: `src/components/layout/Sidebar.tsx`

```typescript
// Mobile: Slide-in drawer from left
<AnimatePresence>
  {isMobile && isMobileOpen && (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      exit={{ x: -280 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen w-[280px] bg-white dark:bg-gray-800 z-50"
    >
      {/* Mobile navigation content */}
    </motion.div>
  )}
</AnimatePresence>

// Desktop: Fixed sidebar with collapse
<motion.div
  animate={{ width: isCollapsed ? 64 : 256 }}
  className="hidden md:block fixed left-0 top-0 h-screen"
>
  {/* Desktop navigation content */}
</motion.div>
```

### Mobile Menu Overlay
```typescript
// Overlay behind mobile menu
<AnimatePresence>
  {mobileMenuOpen && isMobile && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
      onClick={() => setMobileMenuOpen(false)}
    />
  )}
</AnimatePresence>
```

### Body Scroll Lock
```typescript
useEffect(() => {
  if (mobileMenuOpen && isMobile) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [mobileMenuOpen, isMobile]);
```

## Responsive Header

```typescript
<header className="sticky top-0 z-20 flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
  {/* Mobile menu button - only on mobile */}
  <button
    onClick={() => setMobileMenuOpen(true)}
    className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
  >
    <Bars3Icon className="h-5 w-5" />
  </button>

  {/* Desktop sidebar toggle - only on desktop */}
  <button
    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
    className="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
  >
    <Bars3Icon className="h-5 w-5" />
  </button>

  {/* Rest of header content */}
</header>
```

## Responsive Cards

### MetricCard Example
```typescript
<div className="
  relative overflow-hidden
  rounded-xl sm:rounded-2xl
  border-2
  p-3 sm:p-4 lg:p-6
  shadow-lg
">
  <div className="flex items-start sm:items-center justify-between">
    <div className="flex-1 min-w-0">
      <p className="text-xs sm:text-sm font-medium truncate">
        {title}
      </p>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">
        {value}
      </p>
      <div className="flex items-center mt-1 sm:mt-2 text-xs sm:text-sm">
        {change}
      </div>
    </div>
    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 ml-2">
      {icon}
    </div>
  </div>
</div>
```

## Touch-Friendly Interactions

### Tap Areas
```typescript
// Minimum tap area: 44x44px
className="p-2.5 sm:p-2"  // Mobile needs larger tap area

// Full-width buttons on mobile
className="w-full sm:w-auto"
```

### Active States
```typescript
<motion.button
  whileTap={{ scale: 0.98 }}  // Visual feedback for touch
  className="active:scale-[0.98]"  // CSS fallback
>
```

### Removing Hover Effects on Touch
```typescript
// Use @media (hover: hover) for hover-only effects
// Or use Tailwind's hover: which handles this
className="hover:bg-gray-100"  // Only applies on devices with hover
```

## Responsive Form Layouts

```typescript
// Stacked on mobile, side-by-side on desktop
<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
  <input className="w-full sm:flex-1" />
  <button className="w-full sm:w-auto">Submit</button>
</div>

// Full-width inputs on mobile
<input className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm" />
```

## Responsive Tables

```typescript
// Hide table headers on mobile, show on tablet+
<div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 text-sm font-medium">
  <div className="col-span-3">Factura</div>
  <div className="col-span-3">Cliente</div>
  <div className="col-span-2">Fecha</div>
  <div className="col-span-2">Monto</div>
  <div className="col-span-2">Estado</div>
</div>

// Card-style rows on mobile
<div className="md:hidden p-4 space-y-2 border-b">
  <div className="flex justify-between">
    <span className="font-medium">{invoiceNumber}</span>
    <span>{status}</span>
  </div>
  <div className="text-sm text-gray-500">{clientName}</div>
  <div className="text-sm">{amount}</div>
</div>
```

## Mobile Detection Hook

```typescript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);
```

## Best Practices

1. **Mobile-first**: Write base styles for mobile, add breakpoint modifiers for larger screens
2. **Touch targets**: Minimum 44x44px for interactive elements
3. **Readable text**: Minimum 16px (1rem) for body text on mobile
4. **No horizontal scroll**: Test on real devices to ensure no overflow
5. **Fast interactions**: Use `whileTap` for immediate touch feedback
6. **Simplified layouts**: 1-2 columns max on mobile
7. **Sticky navigation**: Keep important navigation accessible
8. **Truncate long text**: Use `truncate` class for overflowing text
9. **Test on real devices**: Emulators don't capture all touch behaviors
10. **Performance**: Minimize JavaScript on mobile for better performance
