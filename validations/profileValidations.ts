import * as Yup from "yup";

export const messageMe1Validations = Yup.object().shape({
  Merchant_Name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(200, "Name must be less than 50 characters")
    .required("Required"),

  Merchant_City: Yup.string().min(3, "Must be AtLeast 3 Char"),

  Merchant_Address: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(500, "Name must be less than 500 characters")
    .required("Required"),
  Merchant_ServiceArea_Pincodes: Yup.string()
    .min(6, "pincode must be at least 6 characters")
    .max(6, "pincode must be at least 6 characters"),

  TypesOf_Bussiness: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(200, "Name must be less than 50 characters")
    .required("Required"),

  SubTypeOf_bussiness: Yup.string()
    .min(3, "Bussiness Name must be at least 3 characters")
    .max(500, "Bussiness Name must be less than 500 characters")
    .required("Required"),

  Merchant_Designation: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(200, "Name must be less than 50 characters")
    .required("Required"),

  Year_of_establishment: Yup.string()
    // .positive().integer()
    .min(4, "Year must be 4- digit")
    .max(4, "Year must be 4- digit")

    .required("Required"),

  GST_No: Yup.string()
    .matches(/^([a-zA-Z0-9 _-]+)$/, "enter Alpha Numneric value")
    .min(15, "GST must be  15 Alpha Numneric value")
    .max(15, "GST must be 15 Alpha Numneric value"),
  // .required("Required"),

  PAN_No: Yup.string()
    .matches(/^([a-zA-Z0-9 _-]+)$/, "enter Alpha Numneric value")
    .min(10, "PAN must be  10 Alpha Numneric value")
    .max(10, "PAN must be 10 Alpha Numneric value"),
});

export const companyProfileValidationSchema = Yup.object().shape({
  company_Name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Required"),
  //@ts-ignore
  description: Yup.string()

    .min(300, "Description must be at least 300 characters")
    .max(5000, "Description must be less than 5000 characters")
    .required("Required"),
});
