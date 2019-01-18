
export interface User {
  id: string,
  created_at: number,
  email: string;
  first_name: string | null,
  last_name: string | null,
  admin: boolean,
  account: {
    id: string;
    created_at: string;
    livemode: boolean;
    name: string;
    balance: string;
    card_number: string;
    status: 'active' | string;
  }
}
