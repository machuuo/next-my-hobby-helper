export interface MenuSignatures {
  [key: string]: React.ComponentType;
}

export interface SubMenuSignatures {
  [key: string]: { [key: string]: React.ComponentType };
}
