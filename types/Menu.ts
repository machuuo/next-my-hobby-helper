export interface MenuProps {
  id: string;
  path: string;
  label: string;
  searchValue: string;
  subMenus?: MenuProps[];
}
