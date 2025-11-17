export interface NavigationItem {
  id: number;
  label: string;
  route: string;
  icon?: string;
  children?: NavigationItem[];
  external?: boolean;
  fragment?: string;
  queryParams?: { [key: string]: any };
  isOpen?: boolean;
}

export interface HeaderData {
  logo: {
    url: string;
    alt: string;
    route: string;
  };
  navigation: NavigationItem[];
  languages: {
    code: string;
    name: string;
    flag: string;
  }[];
  searchEnabled: boolean;
}
