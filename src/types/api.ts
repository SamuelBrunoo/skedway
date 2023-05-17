export type GetUserInfo = {
  items: Item[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }
}

export type Item = {
  id: number;
  companyId: number;
  name: string;
  email: string;
  customUid: string;
  pictureUrl: string;
  pin: number;
  removed: boolean;
  createdDate: string;
  updatedDate: string;
}