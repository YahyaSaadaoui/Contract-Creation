export interface AddressDTO {
  addressId?: number;
  isPrimary: boolean;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  faxNumber: string;
}
