export interface PageFilter {
  name: string;
  isDeleted: boolean;
}

export interface OrderByValue {
  colId: string;
  sort: string; // "asc" | "desc"
}

export interface PageRequest {
  pageNumber: number;
  pageSize: number;
  filter: PageFilter;
  orderByValue: OrderByValue[];
}
