# 🧩 Homepage Components Reference

## Core Components

### 📱 DesktopHomepage.tsx
**Purpose**: Main desktop layout with all homepage sections
**Key Features**:
- Responsive grid layout
- Interactive map integration
- Stats bar with animations
- Hero section with call-to-action
- Featured wildlife showcase
- Learning path section

**Customization**:
```typescript
// Update layout sections
const sections = [
  { id: 'hero', component: HeroSection },
  { id: 'map', component: InteractiveMap },
  { id: 'stats', component: GlobalStatsBar },
  // Add your custom sections
]
```

### 📱 MobileHomepage.tsx
**Purpose**: Mobile-optimized homepage layout
**Key Features**:
- Touch-friendly interactions
- Swipe gestures
- Mobile-first design
- Collapsible sections

### 🗺️ InteractiveMap.tsx
**Purpose**: Interactive region map with hover and click effects
**Key Features**:
- Region hover effects
- Click interactions
- Responsive positioning
- Custom animations
- Wildlife information panels

**Customization**:
```typescript
// Update region data
const regions = [
  {
    id: "your-region",
    position: { x: 50, y: 50 },
    color: "from-blue-500 to-cyan-600",
    wildlife: ["Animal 1", "Animal 2"]
  }
]
```

### 🎯 RegionSelector.tsx
**Purpose**: Dropdown region selection component
**Key Features**:
- Dropdown menu
- Region filtering
- Search functionality
- Custom styling

### 📊 GlobalStatsBar.tsx
**Purpose**: Animated statistics display
**Key Features**:
- Animated counters
- Progress indicators
- Real-time updates
- Custom metrics

### 🎨 HeroSection.tsx
**Purpose**: Main hero section with call-to-action
**Key Features**:
- Gradient backgrounds
- Animated text
- Call-to-action buttons
- Responsive design

### 🦁 FeaturedWildlife.tsx
**Purpose**: Wildlife showcase section
**Key Features**:
- Animal cards
- Hover effects
- Information display
- Interactive elements

### 📚 LearningPath.tsx
**Purpose**: Educational content section
**Key Features**:
- Progress tracking
- Learning modules
- Interactive elements
- Achievement system

### 🦶 Footer.tsx
**Purpose**: Site footer with links and information
**Key Features**:
- Navigation links
- Social media
- Contact information
- Copyright notice

### 📈 StatItem.tsx
**Purpose**: Individual statistic display
**Key Features**:
- Animated numbers
- Icon support
- Custom styling
- Responsive design

## UI Components (ui-components/)

### 🎨 Button.tsx
**Purpose**: Reusable button component
**Variants**: Primary, Secondary, Outline, Ghost
**Features**: Loading states, disabled states, icons

### 🃏 Card.tsx
**Purpose**: Card container component
**Features**: Hover effects, shadows, borders

### 📋 Dialog.tsx
**Purpose**: Modal dialog component
**Features**: Backdrop, animations, focus management

### 🎛️ DropdownMenu.tsx
**Purpose**: Dropdown menu component
**Features**: Keyboard navigation, animations

### 🎨 Accordion.tsx
**Purpose**: Collapsible content sections
**Features**: Smooth animations, accessibility

## Data Files (data/)

### 📊 regions.ts
**Purpose**: Region configuration data
```typescript
export const regions = [
  {
    id: "arctic",
    name: "Arctic Life",
    description: "Explore polar wildlife",
    position: { x: 20, y: 35 },
    color: "from-blue-400 to-cyan-500",
    wildlife: ["Polar Bear", "Arctic Fox"]
  }
]
```

### 🦁 polar-bear-data.ts
**Purpose**: Wildlife information data
```typescript
export const wildlifeData = {
  polarBear: {
    name: "Polar Bear",
    scientificName: "Ursus maritimus",
    habitat: "Arctic regions",
    facts: ["Largest land carnivore", "Excellent swimmers"]
  }
}
```

## Hooks (hooks/)

### 🧭 useNavigation.ts
**Purpose**: Navigation state management
**Features**:
- Active region tracking
- Route management
- State persistence

## Quick Customization Guide

### 1. Update Colors
```typescript
// In tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* your colors */ },
        secondary: { /* your colors */ }
      }
    }
  }
}
```

### 2. Update Regions
```typescript
// In data/regions.ts
export const regions = [
  {
    id: "your-region",
    name: "Your Region Name",
    description: "Your region description",
    position: { x: 50, y: 50 },
    color: "from-your-color to-your-color",
    wildlife: ["Your Wildlife 1", "Your Wildlife 2"]
  }
]
```

### 3. Update Interactions
```typescript
// In InteractiveMap.tsx
const handleRegionClick = (regionId: string) => {
  // Your custom click logic
  console.log('Region clicked:', regionId)
}
```

### 4. Update Styling
```typescript
// In any component
const customStyles = {
  container: "bg-gradient-to-r from-blue-500 to-purple-600",
  button: "bg-white text-blue-600 hover:bg-blue-50"
}
```

## Component Dependencies

### Required Dependencies:
- `@radix-ui/react-*` - UI components
- `lucide-react` - Icons
- `clsx` - Class name utilities
- `tailwind-merge` - Tailwind class merging
- `@react-three/fiber` - 3D components (optional)
- `@react-three/drei` - 3D utilities (optional)

### Optional Dependencies:
- `framer-motion` - Advanced animations
- `react-spring` - Spring animations
- `react-intersection-observer` - Scroll animations

## Performance Tips

1. **Lazy Loading**: Use React.lazy() for large components
2. **Memoization**: Use React.memo() for expensive components
3. **Image Optimization**: Use Next.js Image component
4. **Code Splitting**: Split components by route
5. **Bundle Analysis**: Monitor bundle size

## Accessibility Features

- ✅ **Keyboard Navigation**: All interactive elements
- ✅ **Screen Reader Support**: ARIA labels and roles
- ✅ **Focus Management**: Proper focus handling
- ✅ **Color Contrast**: WCAG compliant colors
- ✅ **Touch Targets**: Mobile-friendly sizes

---

**All components are fully typed with TypeScript and include comprehensive documentation.** 