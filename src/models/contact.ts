export interface ContactName {
  last: string;
  first: string;
}

export interface Contact {
  name: ContactName;
  age: number;
  phone: string;
  address: string;
  email: string;
  greeting: string;
  friends: object[];
  tags: string[];
  longitude: string;
  latitude: string;
  registered: string;
  about: string;
  company: string;
  eyeColor: string;
  picture: string;
  balance: string;
  guid: string;
  index: number;
  _id: string;
  isActive: boolean;
}