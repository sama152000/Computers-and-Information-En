// export interface PageFilter {
//   name: string;
//   isDeleted: boolean;
// }

// export interface OrderByValue {
//   colId: string;
//   sort: string; // "asc" | "desc"
// }

// export interface PageRequest {
//   pageNumber: number;
//   pageSize: number;
//   filter: PageFilter;
//   orderByValue: OrderByValue[];
// }

export interface PageFilter {
  name?: string;
  isDeleted?: boolean;
  [key: string]: any; // Allow additional properties for different filters
}

export interface OrderByValue {
  colId: string;
  sort: string; // "asc" | "desc"
}

export interface PageRequest {
  pageNumber: number;
  pageSize: number;
  filter: PageFilter | Record<string, any>;
  orderByValue: OrderByValue[];
}
