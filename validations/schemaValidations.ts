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

export const emailValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Required"),
});

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .matches(/^[a-zA-Z0-9]*$/, "Space bar should not be count as character")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password doesn't match")
    .required("Required"),
  avatar: Yup.mixed()
    .nullable()
    .notRequired()
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format.",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    )
    .test(
      "FILE_SIZE",
      "Max 2MB file size is allowed.",
      (value) => !value || (value && value.size <= FILE_SIZE)
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
    country: Yup.string()
    .min(1, "Country must be at least 3 characters")
    .max(50, "Country must be less than 50 characters")
    .required("Required"),
    city: Yup.string()
    .min(1, "City must be at least 3 characters")
    .max(50, "City must be less than 50 characters")
    .required("Required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const socialSignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password doesn't match")
    .required("Required"),
});
