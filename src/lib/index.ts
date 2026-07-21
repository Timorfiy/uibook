/**
 * UIBook — public API.
 *
 * Importing this entry pulls in the base styles and every *available* theme.
 * (Themes self-register their CSS as a side effect of the themes module.)
 */

import './styles/base.css';

export {
  themes,
  availableThemes,
  applyTheme,
  applyMode,
  resolveMode,
  getStoredTheme,
  getStoredMode,
} from './themes';
export type { ThemeMeta, ThemeMode, ThemeStatus } from './themes';

export { cn } from './utils/cn';

export { Button } from './components/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button/Button';

export { Card } from './components/Card/Card';
export type { CardProps, CardMaterial } from './components/Card/Card';

export { TextField } from './components/TextField/TextField';
export type { TextFieldProps } from './components/TextField/TextField';

export { Switch } from './components/Switch/Switch';
export type { SwitchProps } from './components/Switch/Switch';

export { Slider } from './components/Slider/Slider';
export type { SliderProps } from './components/Slider/Slider';

export { SegmentedControl } from './components/SegmentedControl/SegmentedControl';
export type {
  SegmentedControlProps,
  SegmentedOption,
} from './components/SegmentedControl/SegmentedControl';

export { Tabs } from './components/Tabs/Tabs';
export type { TabsProps, TabItem } from './components/Tabs/Tabs';

export { Menu } from './components/Menu/Menu';
export type { MenuProps, MenuItem } from './components/Menu/Menu';

export { Modal } from './components/Modal/Modal';
export type { ModalProps } from './components/Modal/Modal';

export { ToastProvider, useToast } from './components/Toast/Toast';
export type { ToastOptions, ToastTone } from './components/Toast/Toast';

export { Tooltip } from './components/Tooltip/Tooltip';
export type { TooltipProps } from './components/Tooltip/Tooltip';

export { Badge } from './components/Badge/Badge';
export type { BadgeProps, BadgeTone } from './components/Badge/Badge';

export { Spinner } from './components/Spinner/Spinner';
export type { SpinnerProps } from './components/Spinner/Spinner';
