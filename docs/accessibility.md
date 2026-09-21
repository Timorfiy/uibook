# Accessibility and integration notes

[Back to the README](../README.md)

These notes describe the current implementation, not a WCAG conformance claim or a completed assistive-technology audit.

## Implemented support

| Area | Behavior and source |
| --- | --- |
| Shared styles | [Focus-visible rings](../src/lib/styles/base.css), reduced-motion durations and solid material fallbacks for reduced transparency or missing backdrop-filter support. |
| Text inputs | [TextField](../src/lib/components/TextField/TextField.tsx) connects its label and helper/error text to the input and sets `aria-invalid` for supplied errors. Validation rules belong to the caller. |
| Native and boolean inputs | [Slider](../src/lib/components/Slider/Slider.tsx) uses a native range input. [Switch](../src/lib/components/Switch/Switch.tsx) exposes `role="switch"` and its checked state. |
| Selection | [SegmentedControl](../src/lib/components/SegmentedControl/SegmentedControl.tsx) and [Tabs](../src/lib/components/Tabs/Tabs.tsx) support Left/Right arrows, move focus to the selection and skip disabled items. |
| Menus | [Menu](../src/lib/components/Menu/Menu.tsx) exposes menu/menuitemradio semantics, focuses an item on open and supports Up/Down, Home/End and Escape. Selection and Escape return focus to the trigger. |
| Dialogs | [Modal](../src/lib/components/Modal/Modal.tsx) supplies dialog semantics, a title association, initial panel focus, Escape dismissal and a Tab loop at the first/last focusable controls. |
| Notifications | [Toast](../src/lib/components/Toast/Toast.tsx) uses a polite live region, status semantics and a labeled dismiss button. |
| Hints | [Tooltip](../src/lib/components/Tooltip/Tooltip.tsx) opens on hover or focus and renders a portal with `role="tooltip"`. |

## Current limits

- **Tabs is a selector, not a panel system.** It renders no tab panels, IDs or `aria-controls` relationships. Consumers need panel composition, and the component needs further API work for a complete tab pattern.
- **Selectors have multiple tab stops.** Enabled tab and segmented-control buttons remain in the normal Tab order; the implementation does not use roving `tabIndex`. Only Left/Right arrows are handled by these selectors.
- **Modal focus handling is partial.** There is no restoration to the trigger on close, no background `inert` management and no dialog-stack manager. The initial focus target is the panel itself, while the wrap checks cover the first and last child controls; Shift+Tab from that initial panel is not contained.
- **Tooltip descriptions need attention.** `aria-describedby` is attached to the wrapper rather than directly to the focusable child. The tooltip has no Escape handler, touch-specific interaction or continuous scroll/resize positioning. Do not make it the only place for essential instructions.
- **Interactive Card is visual styling.** It remains a `div`; the `interactive` prop does not make it keyboard-operable or add link/button semantics. Use an appropriate native interactive element for the action.
- **Contrast depends on the scene.** Translucent surfaces inherit the visual complexity of their backdrop. Check text and focus indicators against the backgrounds used in your application, including both modes.
- **Preference fallbacks depend on browser support.** CSS includes reduced-transparency and reduced-motion handling; support for the media features varies. `material="solid"` provides an explicit opaque Card option.
- **Browser APIs are part of the current design.** Theme helpers, portals and measurements use `document`, `window` and `localStorage`. The documentation site is client-rendered; an SSR integration is not supplied.

## Verification boundary

The repository currently has a TypeScript check and production build, but no configured automated test or accessibility-audit suite. Keyboard paths, focus recovery, announcements and contrast need validation in the consuming app and its target browsers. The notes above are intentionally narrower than a claim that every ARIA pattern is complete.
