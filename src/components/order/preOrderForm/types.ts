export interface PreOrderData {
  point_1: PreOrderPointItem;
  point_2: PreOrderPointItem;
  type: string;
}

export interface PreOrderPointItem {
  value: string;
  isDirty?: boolean;
  isEmptyError?: boolean;
  errorMessage?: string;
  lat: number | undefined;
  lng: number | undefined;
}
