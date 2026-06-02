export interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: string;
  enabled: boolean;
  subcategories: string[];
}
