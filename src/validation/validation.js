import * as Yup from "yup";
import moment from "moment";

const rqdmsg = "Required!";

export const validateItemForm = Yup.object().shape({
  code: Yup.string()
    .when(["mother", "origCode"], (mother, origCode, schema) => {
      if (mother) {
        const countMother = mother.length;

        return schema
          .test(
            "checkFormatOfCode",
            `First ${countMother} should be equals to ${mother}`,
            (value) => {
              let val = value ? value : "";
              return val.substring(0, countMother) === mother;
            }
          )
          .test(
            "countDash",
            `Children code should look like ${mother}-01`,
            (value) => {
              let val = value ? value : "";
              return val.charAt(countMother) === "-";
            }
          )
          .test(
            "checkChildSuffix",
            "Child code suffix should be 01 or A",
            (value) => {
              let val = value ? value : "";
              let lastVal = val ? val.split("-").pop() : "";
              if (!isNaN(lastVal)) {
                return (
                  lastVal === lastVal.padStart(2, "0") && lastVal.length === 2
                );
              } else {
                return /^[a-zA-Z]+$/.test(lastVal) && lastVal.length === 1;
              }
            }
          );
      }

      if (origCode) {
        return schema.test(
          "checkEditFormat",
          "Format should look like " + origCode,
          (value) => {
            let val = value ? value : "";
            const countOrigCode = origCode.length;
            const origFormat = origCode.substring(
              0,
              origCode.lastIndexOf("-") + 1
            );
            const countOrigSuffix = origCode.split("-").pop().length;
            const getLastIndex = val ? val.lastIndexOf("-") : "";
            const lastVal = val ? val.split("-").pop() : "";

            const valPrefix = val ? val.substring(0, getLastIndex + 1) : "";
            const suffixCount = lastVal.length;
            let paddedVal = lastVal;
            if (countOrigSuffix !== 1) {
              paddedVal = parseInt(lastVal)
                .toString()
                .padStart(countOrigSuffix, "0");
            }

            return (
              suffixCount === countOrigSuffix &&
              paddedVal === lastVal &&
              origFormat === valPrefix &&
              countOrigCode === val.length
            );
          }
        );
      }

      return schema.test(
        "checkCode",
        "Format should be CODE-0001(five digits)",
        (value) => {
          const val = value ? value : "";

          const lastVal = val ? value.split("-")[1] : "";
          const countDash = val ? val.split("-").length - 1 : 0;
          const format =
            lastVal === parseInt(lastVal).toString().padStart(5, "0");

          return countDash === 1 && lastVal.length === 5 && format;
        }
      );
    })
    .test("checkUpperCase", "Only uppercase letters are allowed", (value) => {
      const val = value ? value : "";
      return val === val.toUpperCase();
    })
    .max(50)
    .min(7)
    .required(rqdmsg)
    .matches(/^[a-zA-Z0-9-_]*$/, "Special characters are not allowed")
    .label("Code"),
  mspecs: Yup.string()
    .max(255)
    .required(rqdmsg)
    .trim()
    // .matches(/^[a-zA-Z0-9-_ (),#.*/"+]*$/, 'Special characters are not allowed')
    .label("Matl specification"),
  itemdesc: Yup.string()
    .max(255)
    .required(rqdmsg)
    .trim()
    // .matches(/^[a-zA-Z0-9-_ (),#.*/"+]*$/, 'Special characters are not allowed')
    .label("Item description"),
  partnum: Yup.string()
    .max(150)
    .trim()
    // .matches(/^[a-zA-Z0-9-_ ()]*$/, 'Special characters are not allowed')
    .label("Part number"),
  regisdate: Yup.date()
    .max(moment().format("Y-M-D"))
    .label("Registration date")
    .nullable(),
  effectdate: Yup.date()
    .max(moment().format("Y-M-D"))
    .label("Effectivity date")
    .nullable(),
  outs: Yup.number()
    .positive()
    .transform((cv) => (cv ? cv : undefined))
    .label("No. of outs")
    .required(rqdmsg),
  requiredqty: Yup.number()
    .positive()
    .transform((cv) => (cv ? cv : undefined))
    .label("Required quantity")
    .required(rqdmsg),
  unit: Yup.string()
    .max(50)
    .transform((cv) => (cv ? cv : undefined))
    .required()
    .label("Unit"),
  unitprice: Yup.number()
    .when("mother", (mother, schema) =>
      !mother ? schema.required(rqdmsg) : schema
    )
    .positive()
    .nullable()
    .label("Unit price"),
  budgetprice: Yup.number()
    .required(rqdmsg)
    .positive()
    .nullable()
    .label("Budget price"),
  supplierprice: Yup.string().nullable().max(100),
  remarks: Yup.string().nullable().max(150),
  customer: Yup.number().required(rqdmsg),
  conversions: Yup.array().of(Yup.string().required(rqdmsg)),
});
