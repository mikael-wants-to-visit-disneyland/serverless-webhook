import * as yup from "yup";
import moment from "moment";

export interface IAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export const addressSchema = yup.object().shape({
  line1: yup.string().required(),
  line2: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  postcode: yup.string().required(),
  country: yup.string().required(),
});

export interface IItem {
  product: string;
  description: string;
  name: string;
  unitPrice: number;
  qty: number;
  totalPrice: number;
}

export const itemSchema = yup.object().shape({
  product: yup.string().required(),
  description: yup.string().required(),
  name: yup.string().required(),
  unitPrice: yup.number().required(),
  qty: yup.number().required(),
  totalPrice: yup.number().required(),
});

export interface IOrder {
  orderId: string;
  dateCreated: string;
  sellerId: string;
  address: IAddress;
  items: IItem[];
}

export const orderSchema = yup.object().shape({
  orderId: yup.string().required(),
  dateCreated: yup
    .string()
    .test(
      "date-format",
      "dateCreated is not in the format YYYY-MM-DD, as required for DynamoDB filtering.",
      (date) => moment(date, "YYYY-MM-DD", true).isValid()
    )
    .required(),
  sellerId: yup.string().required(),
  address: addressSchema.required(),
  items: yup.array().of(itemSchema).required(),
});
