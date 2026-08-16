export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;

  state?: string;
  address?: string;
  pincode?: string;

  farmName?: string;
  experience?: number;
  joined?: string;

  role: string;
  status: string | null;
}