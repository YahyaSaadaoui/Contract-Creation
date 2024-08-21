export interface AddressDTO {
  addressId?: number; // Optional for new addresses
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  faxNumber: string;
}
