export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }

  export type Order = "asc" | "desc";

  export interface OneUserSortProps {
    user: User;
  }

  export interface MyButtonProps {
    applyFilter: () => void;
    filterValue: string;
}

export interface MyModalProps {
  open: boolean;
  onClose: () => void;
}