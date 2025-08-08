# 🏠 Homepage Template

A complete, reusable homepage template with interactive map, region selector, and modern UI components.

## 📁 Template Structure

```
homepage-template/
├── README.md                    # This file
├── package.json                 # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── page.tsx                    # Main homepage component
├── data/                       # Data files
│   ├── regions.ts             # Region configurations
│   └── polar-bear-data.ts     # Wildlife data
├── hooks/                      # Custom hooks
│   └── useNavigation.ts       # Navigation logic
├── ui-components/              # UI components
│   ├── button.tsx             # Button component
│   ├── card.tsx               # Card component
│   └── ...                    # Other UI components
├── public/                     # Static assets
│   └── assets/                # Images, 3D models, etc.
└── [Homepage Components]       # Core homepage components
    ├── DesktopHomepage.tsx    # Desktop layout
    ├── MobileHomepage.tsx     # Mobile layout
    ├── InteractiveMap.tsx     # Interactive map
    ├── RegionSelector.tsx     # Region selection
    ├── GlobalStatsBar.tsx     # Statistics bar
    ├── HeroSection.tsx        # Hero section
    ├── FeaturedWildlife.tsx   # Wildlife showcase
    ├── LearningPath.tsx       # Learning path
    ├── Footer.tsx             # Footer
    └── StatItem.tsx           # Stat item component
```

## 🚀 Quick Setup

### 1. Copy to Your Project
```bash
# Copy the entire template to your project
cp -r homepage-template/ your-project/

# Or copy specific components
cp homepage-template/DesktopHomepage.tsx your-project/components/
cp homepage-template/InteractiveMap.tsx your-project/components/
```

### 2. Install Dependencies
```bash
# Install required dependencies
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react clsx tailwind-merge
npm install @react-three/fiber @react-three/drei three
```

### 3. Configure Tailwind
```bash
# Copy Tailwind config
cp homepage-template/tailwind.config.ts your-project/
```

### 4. Update Imports
```typescript
// Update import paths in your components
// From: @/components/homepage/DesktopHomepage
// To: @/components/DesktopHomepage (or your preferred path)
```

## 🎨 Customization Guide

### 1. Update Region Data
```typescript
// Edit data/regions.ts
export const regions = [
  {
    id: "your-region",
    name: "Your Region",
    description: "Your region description",
    position: { x: 50, y: 50 },
    color: "from-blue-500 to-cyan-600",
    wildlife: ["Animal 1", "Animal 2"]
  }
]
```

### 2. Customize Colors
```typescript
// Update tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... your color palette
        }
      }
    }
  }
}
```

### 3. Update Assets
```bash
# Replace public/assets/ with your assets
cp your-assets/* homepage-template/public/assets/
```

### 4. Modify Interactions
```typescript
// Edit InteractiveMap.tsx for custom interactions
const handleRegionClick = (regionId: string) => {
  // Your custom logic
  console.log('Region clicked:', regionId)
}
```

## 🔧 Key Components

### InteractiveMap
- **Features**: Hover effects, click interactions, region highlighting
- **Customizable**: Region positions, colors, animations
- **Responsive**: Mobile and desktop layouts

### RegionSelector
- **Features**: Dropdown selection, region filtering
- **Customizable**: Region data, styling, interactions

### GlobalStatsBar
- **Features**: Animated statistics, progress indicators
- **Customizable**: Stats data, animations, styling

### DesktopHomepage
- **Features**: Full desktop layout with all components
- **Customizable**: Layout, components, styling

### MobileHomepage
- **Features**: Mobile-optimized layout
- **Customizable**: Mobile-specific components, touch interactions

## 🎯 Features Included

- ✅ **Interactive Map** with hover and click effects
- ✅ **Region Selector** with dropdown functionality
- ✅ **Global Stats Bar** with animated counters
- ✅ **Responsive Design** for mobile and desktop
- ✅ **Modern UI Components** with Radix UI
- ✅ **TypeScript Support** with full type safety
- ✅ **Tailwind CSS** for styling
- ✅ **3D Integration** ready for Three.js
- ✅ **Custom Hooks** for state management
- ✅ **Data Management** with structured data files

## 🔄 Migration Steps

### From Current Project to New Project:

1. **Copy Template Files**
   ```bash
   cp -r homepage-template/ new-project/
   ```

2. **Update Package.json**
   ```bash
   # Merge dependencies from template package.json
   npm install
   ```

3. **Update Import Paths**
   ```typescript
   // Update all @/ imports to match your project structure
   import { DesktopHomepage } from '@/components/DesktopHomepage'
   ```

4. **Customize Data**
   ```typescript
   // Update regions, wildlife, and other data
   // Edit data/regions.ts and other data files
   ```

5. **Test Components**
   ```bash
   npm run dev
   # Test each component individually
   ```

## 🐛 Troubleshooting

### Common Issues:

1. **Import Errors**
   ```bash
   # Check import paths match your project structure
   # Update tsconfig.json paths if needed
   ```

2. **Missing Dependencies**
   ```bash
   # Install missing packages
   npm install @radix-ui/react-* lucide-react
   ```

3. **Styling Issues**
   ```bash
   # Ensure Tailwind is properly configured
   # Check tailwind.config.ts and globals.css
   ```

4. **TypeScript Errors**
   ```bash
   # Update tsconfig.json paths
   # Check type definitions
   ```

## 📝 Notes

- All components are **fully typed** with TypeScript
- **Responsive design** included for mobile and desktop
- **Accessibility** features built-in with Radix UI
- **Performance optimized** with lazy loading and caching
- **Customizable** styling with Tailwind CSS
- **Modular architecture** for easy maintenance

## 🎨 Design System

The template includes a consistent design system with:
- **Color palette** with primary, secondary, and accent colors
- **Typography** with consistent font sizes and weights
- **Spacing** with Tailwind's spacing scale
- **Components** with consistent styling and behavior
- **Animations** with smooth transitions and effects

---

**Ready to use! Copy the template and customize for your project.** 