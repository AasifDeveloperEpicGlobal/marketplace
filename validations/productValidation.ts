import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  product_description: Yup.string()
    .min(500, "Name must be at least 500 characters")
    .max(1000, "Name must be less than 1000 characters")
    .required("Required"),
});
