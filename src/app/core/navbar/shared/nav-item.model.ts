export interface NavItem {
  label: string;
  icon?: string;
  path: any[];
  action: () => void;
  admin?: boolean;
}
