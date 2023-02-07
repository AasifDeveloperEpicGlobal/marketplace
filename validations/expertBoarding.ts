import * as Yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024; //2MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

export const checkDimensions = (value: any) => {
  if (value) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = function (value) {
        const img = new Image() as any;
        img.src = value?.target?.result;
        img.onload = function () {
          const width = this.width;
          const height = this.height;
          resolve({ width, height });
        };
      };
    });
  }
};

export const yourCompanyValidation = Yup.object().shape({
  companyName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Required"),
  companyWebsite: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Invalid URL format"
    )
    .required("Required"),
  numberOFEmployees: Yup.number()
    .min(1, "Number of employees must be at least 1")
    .max(99999, "Number of employees must be less than 99999")
    .typeError("Must be a number")
    .required("Required"),
  linkedIn: Yup.string()
    .matches(
      /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
      "Please Enter a valid LinkedIn URL"
    )
    .required("Required"),

  attachment: Yup.mixed()
    .nullable()
    .notRequired()
    .test(
      "FILE_SIZE",
      "Max 2MB file size is allowed.",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format.",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    )
    .test(
      "FILE_DIMENSIONS",
      "Dimensions for the logo should be between 150X150 px and 500X500 px",
      (value) => {
        return (
          !value ||
          (value &&
            value.dimensions.width >= 125 &&
            value.dimensions.height >= 125 &&
            value.dimensions.width <= 500 &&
            value.dimensions.height <= 500)
        );
      }
    ),
});

export const areaOfExpertiseValidation = Yup.object().shape({
  name: Yup.array().of(
    Yup.object().shape({
      text: Yup.string()
        .min(2, "An example needs to be between 2-and 255 characters.")
        .max(255, "An example needs to be between 2-and 255 characters.")
        .required("Required"),
    })
  ),
});

export const chargeForTimeValidation = Yup.object().shape({
  hourlyRate: Yup.number()
    .min(1, "Rate must be at least 1")
    .max(999, "Rate must be less than 999")
    .typeError("Rate must be an integer")
    .required("Required"),
  dailyRate: Yup.number()
    .min(1, "Rate must be at least 1")
    .max(999, "Rate must be less than 999")
    .typeError("Rate must be an integer")
    .required("Required"),
  monthlyRate: Yup.number()
    .min(1, "Rate must be at least 1")
    .max(999, "Rate must be less than 999")
    .typeError("Rate must be an integer")
    .required("Required"),
});

export const addExperienceValidation = Yup.object().shape({
  title: Yup.string()
    .min(3, "Min 3 and Max 255 characters are allowed")
    .max(255, "Min 3 and Max 255 characters are allowed")
    .required("Required")
    .matches(/^[a-zA-Z0-9\s]+$/, "Special characters * % , dot(.) not allowed"),

  companyName: Yup.string()
    .min(1, "Rate must be at least 1")
    .max(999, "Rate must be less than 999")
    .required("Required")
    .matches(/^[a-zA-Z0-9\s]+$/, "Special characters * % , dot(.) not allowed"),

  startDate: Yup.date()
    .max(new Date(), "Start date must be less than todays date")
    .required("Required"),

  endDate: Yup.date()
    .min(new Date(), "End date must be in the past")
    .when("startDate", (startDate, schema) => {
      return startDate
        ? schema.min(startDate, "End date must be greater than start date")
        : schema;
    })
    .required("Required"),

  description: Yup.string()
    .min(1, "Rate must be at least 1")
    .max(999, "Rate must be less than 999")
    .required("Required")
    .matches(/^[a-zA-Z0-9\s]+$/, "Special characters * % , dot(.) not allowed"),
});
