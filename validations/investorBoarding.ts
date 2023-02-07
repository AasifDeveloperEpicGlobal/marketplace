import * as Yup from "yup";

export const addExperienceValidation = Yup.object().shape({
  companyName: Yup.string()
    .min(1, "Rate must be at least 1")
    .max(100, "Rate must be less than 100")
    .required("Required"),
  // .matches(/^[a-zA-Z0-9\s]+$/, "Special characters * % , dot(.) not allowed"),

  amountInvested: Yup.number()
    .min(1, "Amount must be at least 1")
    .max(10000000, "Amount must be less than 10000000")
    .required("Required")
    .typeError("Amount must be an integer"),
  whenInvested: Yup.date()
    .max(new Date(), "Invested date must be less than todays date")
    .required("Required"),

  typeOfInvestment: Yup.string()
    .min(1, "Type of Investment must be at least 1")
    .max(999, "Type of Investment must be less than 999")
    .required("Required")
    .matches(/^[a-zA-Z0-9\s]+$/, "Special characters * % , dot(.) not allowed"),
  checkbox: Yup.boolean().oneOf([true], "You must accept the checkbox"),
});
