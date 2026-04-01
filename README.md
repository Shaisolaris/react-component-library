# @solaris/ui — React Component Library

Production-ready, headless React component library with 15 composable components, 7 custom hooks, TypeScript-first APIs, full ARIA accessibility, and CSS class-based styling that works with any CSS framework.

## Stack

- **React 18** with hooks-only API (no class components)
- **TypeScript 5** strict mode with full type exports
- **tsup** for dual ESM/CJS builds with tree-shaking
- **Zero runtime CSS** — BYO styles via CSS classes (works with Tailwind, CSS Modules, vanilla CSS)
- **Accessible by default** — ARIA roles, keyboard navigation, focus trapping, screen reader support

## Components (15)

| Component | Description | Key Features |
|---|---|---|
| `Button` | Polymorphic button | 6 variants, 5 sizes, loading state, icons, full-width |
| `Input` | Text input with addons | Label, error/hint, left/right addons, ARIA binding |
| `Select` | Native select wrapper | Label, error, option groups, placeholder |
| `Modal` | Dialog overlay | Focus trap, click-outside, escape close, body scroll lock, size variants |
| `Tabs` | Tab navigation | Keyboard nav (arrow keys, Home/End), underline/pills/enclosed variants |
| `Accordion` | Collapsible sections | Single/multiple mode, keyboard accessible, animated chevron |
| `Toast` | Notification system | Context-based API, auto-dismiss, 5 status variants, position config |
| `Avatar` | User avatar | Image with initials fallback, circle/square, 5 sizes |
| `Badge` | Status indicator | 6 variants, dot indicator, removable with callback |
| `Tooltip` | Hover tooltip | 4 positions, configurable delay, arrow indicator |
| `Dropdown` | Menu dropdown | Keyboard navigation, danger items, separators, icons |
| `Switch` | Toggle switch | Controlled/uncontrolled, label + description, role="switch" |
| `Checkbox` | Checkbox input | Indeterminate state, label + description, error state |
| `Skeleton` | Loading placeholder | Text/circular/rectangular/rounded variants, multi-line support |
| `Pagination` | Page navigation | Sibling count, first/last buttons, ellipsis, aria-current |

## Hooks (7)

| Hook | Description |
|---|---|
| `useControllable` | Supports both controlled and uncontrolled component patterns |
| `useClickOutside` | Detects clicks outside a referenced element |
| `useKeyboard` | Global keyboard event listener with key mapping |
| `useMediaQuery` | Reactive CSS media query matching |
| `useDisclosure` | Boolean state with open/close/toggle helpers |
| `useFocusTrap` | Traps focus within a container (for modals, popovers) |
| `useComponentId` | Generates stable, unique IDs for ARIA attributes |

## Utilities

| Utility | Description |
|---|---|
| `cn()` | Class name merger (wraps clsx) |
| `KEYS` | Keyboard key constants for event handling |
| `generateId()` | Incremental unique ID generator |
| `mergeRefs()` | Combines multiple React refs into one callback ref |
| `callAll()` | Composes multiple event handlers into one |

## Installation

```bash
npm install @solaris/ui
```

### Peer Dependencies

```bash
npm install react react-dom
```

## Usage

```tsx
import { Button, Input, Modal, Tabs, useDisclosure, useToast } from "@solaris/ui";

function App() {
  const modal = useDisclosure();

  return (
    <>
      <Button variant="primary" size="lg" onClick={modal.open}>
        Open Modal
      </Button>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Settings">
        <Input label="Name" placeholder="Enter your name" />
        <Button onClick={modal.close}>Save</Button>
      </Modal>
    </>
  );
}
```

### Toast System

```tsx
import { ToastProvider, useToast } from "@solaris/ui";

function App() {
  return (
    <ToastProvider position="bottom-right">
      <Dashboard />
    </ToastProvider>
  );
}

function Dashboard() {
  const { toast } = useToast();

  return (
    <Button onClick={() => toast({ title: "Saved!", status: "success" })}>
      Save
    </Button>
  );
}
```

### Controlled vs Uncontrolled

All stateful components support both patterns:

```tsx
// Uncontrolled — component manages its own state
<Tabs tabs={items} defaultTab="settings" />

// Controlled — you manage the state
<Tabs tabs={items} activeTab={activeTab} onChange={setActiveTab} />
```

## Architecture

```
src/
├── index.ts                    # Barrel export (components, hooks, utils, types)
├── components/
│   ├── Button/
│   │   ├── Button.tsx          # Component implementation
│   │   └── index.ts            # Re-export with types
│   ├── Input/
│   ├── Select/
│   ├── Modal/                  # Uses useFocusTrap + useClickOutside
│   ├── Tabs/                   # Full keyboard navigation (ARIA tabs pattern)
│   ├── Accordion/              # Single/multiple expand modes
│   ├── Toast/                  # Context + Provider pattern
│   ├── Avatar/                 # Image with initials fallback
│   ├── Badge/                  # Removable with dot indicator
│   ├── Tooltip/                # Hover/focus with delay
│   ├── Dropdown/               # Keyboard-navigable menu
│   ├── Switch/                 # role="switch" with aria-checked
│   ├── Checkbox/               # Indeterminate support
│   ├── Skeleton/               # Multi-line text skeleton
│   └── Pagination/             # Ellipsis algorithm
├── hooks/
│   └── index.ts                # 7 hooks
├── utils/
│   └── index.ts                # cn, KEYS, generateId, mergeRefs, callAll
└── types/
    └── index.ts                # Size, Variant, Status, BaseProps
```

## Build

```bash
# Type check
npm run typecheck

# Build ESM + CJS + declarations
npm run build
```

Output in `dist/`:
- `index.js` — ESM bundle
- `index.cjs` — CommonJS bundle
- `index.d.ts` — TypeScript declarations

## Key Design Decisions

**Headless with CSS class hooks.** Components emit semantic CSS classes (e.g., `sui-btn`, `sui-btn-primary`, `sui-modal-overlay`) rather than inline styles. This means zero CSS opinions — you style with Tailwind, CSS Modules, or plain CSS. The class prefix `sui-` prevents collisions.

**Hooks for cross-cutting behavior.** Focus trapping, click-outside detection, and keyboard navigation live in reusable hooks rather than being baked into individual components. `useControllable` standardizes the controlled/uncontrolled pattern across all stateful components.

**ARIA-first accessibility.** Every interactive component implements its ARIA pattern: tabs use `role="tablist"` with arrow key navigation and `aria-selected`, modals use `aria-modal` with focus trapping, accordions use `aria-expanded` with `aria-controls`, dropdowns use `role="menu"` with `role="menuitem"`.

**Per-component barrel exports.** Each component has its own `index.ts` re-exporting the component and its types. The root `index.ts` re-exports everything. This enables both `import { Button } from "@solaris/ui"` and deep imports when needed.

**Dual ESM/CJS output.** tsup produces both module formats with proper `exports` field in package.json. The `sideEffects: false` flag enables aggressive tree-shaking — importing `Button` alone does not bundle `Modal`.

**Context-based Toast system.** The Toast uses React Context + Provider rather than imperative DOM manipulation. `useToast()` returns a `toast()` function that queues notifications with auto-dismiss. The provider handles rendering, positioning, and lifecycle.

## CSS Class Reference

All components use the `sui-` prefix. Key classes:

- `sui-btn`, `sui-btn-primary`, `sui-btn-sm` — Button variants and sizes
- `sui-input`, `sui-input-error`, `sui-input-label` — Input states
- `sui-modal-overlay`, `sui-modal`, `sui-modal-close` — Modal structure
- `sui-tabs-list`, `sui-tab`, `sui-tab-active` — Tab navigation
- `sui-accordion-item`, `sui-accordion-trigger` — Accordion controls
- `sui-toast-container`, `sui-toast`, `sui-toast-success` — Toast system
- `sui-dropdown-menu`, `sui-dropdown-item` — Dropdown menu
- `sui-pagination-btn`, `sui-pagination-active` — Pagination

## License

MIT
