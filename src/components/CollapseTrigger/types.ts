export interface CollapseTriggerProps {
  collapsed: boolean;
  collapsedWidth?: number | string; // default: '3.75rem'
  expandedWidth?: number | string;  // default: '15rem'
  onToggle: () => void;
}