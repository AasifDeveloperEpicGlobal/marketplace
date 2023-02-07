import * as Yup from "yup";

const FILE_SIZE = 10 * 1024 * 1024; //10MB
const SUPPORTED_FORMATS = [
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "text/plain",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/rtf",
  " application/rtf",
  "text/richtext",
];

export const documentValidations = Yup.object().shape({
  attachment: Yup.mixed()
    .test(
      "FILE_SIZE",
      "File size too large - Max 10 MB allowed. ",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "FILE_FORMAT",
      "PDF, PPT, or Word files are allowed.",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    )
    .required("Pitch Deck document is required"),
});
