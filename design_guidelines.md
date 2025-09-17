# Design Guidelines: Advanced Data Entry System

## Design Approach
**Utility-Focused Design System Approach**: Material Design 3 with custom adaptations for data-intensive workflows. This system prioritizes efficiency, learnability, and reduced cognitive load for users managing complex data entry tasks.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 220 100% 50% (Professional blue)
- Surface: 0 0% 98% (Clean white-gray)
- On-surface: 220 10% 15% (Dark charcoal)
- Success: 120 60% 45% (Forest green)
- Warning: 35 85% 55% (Amber)
- Error: 0 75% 55% (Clear red)

**Dark Mode:**
- Primary: 220 80% 65% (Softer blue)
- Surface: 220 15% 8% (Deep charcoal)
- On-surface: 0 0% 92% (Off-white)
- Success: 120 40% 60% (Muted green)
- Warning: 35 70% 65% (Warm amber)
- Error: 0 60% 70% (Soft red)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono (for data display)
- **Hierarchy**: 
  - Headers: 600 weight, 1.5rem - 2.5rem
  - Body: 400/500 weight, 0.875rem - 1rem
  - Data labels: 500 weight, 0.75rem

### Layout System
**Tailwind Spacing Units**: Consistent use of 2, 4, 6, 8, 12, 16
- Form spacing: p-4, gap-6
- Card padding: p-6
- Section margins: mb-8, mt-12
- Grid gaps: gap-4 for dense layouts, gap-6 for breathing room

### Component Library

**Navigation & Structure:**
- **Top Navigation**: Fixed header with breadcrumbs, user profile, and system status
- **Sidebar Navigation**: Collapsible with clear icons and labels for different data types
- **Tabs**: Material-style tabs for switching between form sections

**Forms & Input:**
- **Input Fields**: Outlined style with floating labels, clear validation states
- **Multi-step Forms**: Progress indicator with clear completion status
- **Rich Text Editor**: Toolbar integration with consistent styling
- **File Upload**: Drag-and-drop zones with progress indicators

**Data Display:**
- **Tables**: Sortable headers, row selection, pagination controls
- **Cards**: Consistent padding, subtle shadows, clear hierarchy
- **Status Indicators**: Color-coded chips for workflow states
- **Search/Filter**: Prominent search bar with advanced filter toggles

**Feedback & Actions:**
- **Buttons**: Primary (filled), Secondary (outlined), Text-only for tertiary actions
- **Notifications**: Toast notifications for system feedback
- **Loading States**: Skeleton screens and progress indicators
- **Modals**: Centered overlays with backdrop blur for critical actions

### Responsive Design
- **Breakpoints**: Mobile-first approach with tablet and desktop optimizations
- **Form Adaptation**: Single-column mobile, multi-column desktop layouts
- **Navigation**: Hamburger menu on mobile, persistent sidebar on desktop

### Accessibility Features
- **High Contrast**: WCAG AA compliance in both light and dark modes
- **Keyboard Navigation**: Tab order optimization for complex forms
- **Screen Reader**: Proper ARIA labels and live regions for dynamic content
- **Focus Management**: Clear focus indicators and logical flow

### Performance Considerations
- **Progressive Loading**: Skeleton screens while data loads
- **Virtual Scrolling**: For large datasets in tables
- **Debounced Search**: 300ms delay for search inputs
- **Optimistic Updates**: Immediate UI feedback with rollback capability

This design system prioritizes data entry efficiency while maintaining visual clarity and professional aesthetics appropriate for business-critical applications.