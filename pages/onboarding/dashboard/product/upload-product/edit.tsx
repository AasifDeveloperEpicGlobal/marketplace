import React, { useEffect, useState } from "react";
import {
  useGetBussinessDetails,
  useGetCategory,
  usePublicProduct,
  useSubCatByCategory,
} from "networkAPI/queries";
import { NextPage } from "next";
import Image from "next/image";
import { Col, FormGroup, Input, Row } from "reactstrap";
import styles from "styles/Merchant/uploadproduct.module.scss";
import useEdit from "hooks/useedit";
import AdminLayout from "components/AdminLayout";
import CountryFlagDropdown from "pages/countryflagdropdown";

interface InputWithLabelProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}
interface SelectWithLabelProps
  extends React.ComponentPropsWithoutRef<"select"> {
  label: string;
  data: {
    name: any;
    value: any;
  }[];
}

interface TextAreaWithLabelProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  label: string;
}

const Upload_Product: NextPage = () => {
  // const {
  //   error: err,
  //   user,
  //   isAuthenticated,
  // } = useAppSelector((state) => state);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (user.role === "Admin") {
  //       return;
  //     }
  //   } else {
  //     Router.push(`/`);
  //   }
  // }, [user, isAuthenticated]);

  const { error: err1, data: data1 } = usePublicProduct();
  const { error: err2, data: bussinesName } = useGetBussinessDetails();

  const companyName = bussinesName?.data?.user?.company_Name;
  const {
    state,
    onChangeTextField,
    additionalSpecification,
    handleAddClick,
    handleInputChange,
    handleRemoveClick,
    handleUpdateProduct,
    onChangeImage,
    currentProduct,
  } = useEdit();

  const { data: catData } = useGetCategory();
  const { data: subCat } = useSubCatByCategory(state?.category);

  const field_color = {
    color: "red",
  };
  const source_data = [
    { name: "WhatsApp", value: "WhatsApp" },
    { name: "Website", value: "Website" },
    { name: "PDF", value: "PDF" },
  ];
  const testing = state?.additionalSpecification;

  const [country, setCountry] = useState([]);
  const [countryid, setCountryid] = useState("");
  useEffect(() => {
    const getcountry = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const getcon = await res.json();

      setCountry(await getcon);
    };
    getcountry();
  }, []);

  return (
    <div className={styles.container_width}>
      <AdminLayout>
        <div className={styles.mov}>
          <h1>Welcome to {companyName} </h1>
          <ul className={styles.box345}>
            <li>
              <div className={styles.prevpic}>
                <div>
                  {(state?.image[0] || currentProduct?.product_image[0]) && (
                    <Image
                      src={
                        state?.image[0]
                          ? URL.createObjectURL(state?.image[0])
                          : currentProduct.product_image[0]
                      }
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  {(state?.image1[0] || currentProduct?.product_image1[0]) && (
                    <Image
                      src={
                        state?.image1[0]
                          ? URL.createObjectURL(state?.image1[0])
                          : currentProduct.product_image1[0]
                      }
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  {(state?.image2[0] || currentProduct?.product_image2[0]) && (
                    <Image
                      src={
                        state?.image2[0]
                          ? URL.createObjectURL(state?.image2[0])
                          : currentProduct.product_image2[0]
                      }
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  {(state?.image3[0] || currentProduct?.product_image3[0]) && (
                    <Image
                      src={
                        state?.image3[0]
                          ? URL.createObjectURL(state?.image3[0])
                          : currentProduct.product_image3[0]
                      }
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  {(state?.image4[0] || currentProduct?.product_image4[0]) && (
                    <Image
                      src={
                        state?.image4[0]
                          ? URL.createObjectURL(state?.image4[0])
                          : currentProduct.product_image4[0]
                      }
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </li>
            <form onSubmit={handleUpdateProduct}>
              <li>
                <label htmlFor="product_image" className={styles.Omra_Lael}>
                  Product Image:
                </label>
                <div className={styles.row}>
                  <div className="col-md-4">
                    <input type="file" name="image" onChange={onChangeImage} />
                  </div>
                  <div className="col-md-4">
                    <input type="file" name="image1" onChange={onChangeImage} />
                  </div>
                  <div className="col-md-4">
                    <input type="file" name="image2" onChange={onChangeImage} />
                  </div>
                  <div className="col-md-4">
                    <input type="file" name="image3" onChange={onChangeImage} />
                  </div>
                  <div className="col-md-4">
                    <input type="file" name="image4" onChange={onChangeImage} />
                  </div>
                  {/* YOUTUBE LINK */}
                  <div className="col-md-4">
                    <input type="link" placeholder="Youtube Link" />
                  </div>
                </div>
              </li>
              <InputWithLabel
                label="Product Name *:"
                type="text"
                name="name"
                id="productname"
                required
                value={state?.name}
                onChange={onChangeTextField}
              />
              {/* Source */}

              <li>
                <SelectWithLabel1
                  label={"Source Type *:"}
                  data={source_data?.map((d: { name: any }) => {
                    return {
                      name: d?.name,
                      value: d?.name,
                    };
                  })}
                  name="source_type"
                  id="source_type"
                  className={styles.dropdown}
                  value={state?.source_type}
                  //@ignore-ts
                  onChange={onChangeTextField as any}
                />
              </li>
              <InputWithLabel
                label="Source:"
                type="text"
                name="source"
                id="source"
                required
                value={state?.source}
                onChange={onChangeTextField}
              />
              {/*  CATEGORY */}
              <li>
                <SelectWithLabel
                  label={"Product Category *:"}
                  data={catData?.data?.map((d: { category_name: any }) => {
                    return {
                      name: d?.category_name,
                      value: d?.category_name,
                    };
                  })}
                  name="category"
                  className={styles.dropdown}
                  value={state?.category}
                  required
                  onChange={onChangeTextField as any}
                />
              </li>

              {/* Sub CATEGORY */}
              <li>
                <SelectWithLabel
                  label={"Subcategory"}
                  data={subCat?.data?.map((d: { sub_category_name: any }) => {
                    return {
                      name: d?.sub_category_name,
                      value: d?.sub_category_name,
                    };
                  })}
                  name="subCategory"
                  className={styles.dropdown}
                  value={state?.subCategory}
                  // required
                  onChange={onChangeTextField as any}
                />
              </li>
              {/* BRAND NAME */}
              <InputWithLabel
                label="Brand:"
                type="text"
                name="brand"
                id="brandname"
                placeholder=" "
                value={state?.brand}
                onChange={onChangeTextField}
              />
              {/* PRICE */}
              <InputWithLabel
                label="Price:"
                type="number"
                name="price"
                id="price"
                className="box-input-section"
                value={state?.price}
                onChange={onChangeTextField}
              />
              <InputWithLabel
                label="Quantity:"
                type="text"
                name="quantity"
                id="brand_name"
                placeholder=" "
              />
              <TextAreaWithLabel
                label="Description:"
                rows={12}
                cols={300}
                required={true}
                // required

                id="description"
                name="productDescription"
                placeholder="Enter Product Description"
                value={state?.productDescription}
                onChange={onChangeTextField as any}
              />

              <TextAreaWithLabel
                label="Specifications:"
                rows={9}
                cols={200}
                id="specification"
                name="productSpecification"
                placeholder=" Product Specifications "
                value={state?.productSpecification}
                onChange={onChangeTextField as any}
              />
              <InputWithLabel
                label="Capacity:"
                type="text"
                name="capacity"
                id="capacity_"
                placeholder=""
                className="box-input-textarea"
                value={state?.capacity}
                onChange={onChangeTextField}
              />
              <InputWithLabel
                label="Model No.:"
                type="number"
                name="modelNumber"
                id="model_no"
                placeholder=" "
                className="box-input-textarea"
                value={state?.modelNumber}
                onChange={onChangeTextField}
              />

              <InputWithLabel
                label="Product Code:"
                type="text"
                name="productCode"
                id="productCode"
                placeholder=" "
                className="box-input-textarea"
                value={state?.productCode}
                onChange={onChangeTextField}
              />
              <InputWithLabel
                label="Delivery Time:"
                type="text"
                name="deliveryTime"
                id="deliveryTime"
                value={state?.deliveryTime}
                className="box-input-textarea"
                onChange={onChangeTextField}
              />
              {/* <InputWithLabel
                label="Country:"
                type="text"
                name="madeIn"
                id="madeIn"
                value={state?.madeIn}
                className="box-input-textarea"
                onChange={onChangeTextField}
              /> */}
              <li>
                <SelectWithLabel
                  label="Country:"
                  data={country?.map((d: any) => {
                    console.log(d.madeIn);
                    return {
                      name: d?.name?.common,
                      value: d?.name?.common,
                    };
                  })}
                  name="madeIn"
                  className={styles.dropdown}
                  value={state?.madeIn}
                  required
                  onChange={onChangeTextField as any}
                />
              </li>

              <h4> Additional Specifications</h4>
              {additionalSpecification?.map((PreviewData: any, index: any) => {
                return (
                  <div key={index} style={{ display: "flex" }}>
                    <Row key={index}>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            className="inputValuesAttibute"
                            id="atribute"
                            placeholder="Add Atributes"
                            name="atribute"
                            type="text"
                            value={PreviewData?.atribute}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            className="inputValuesForm"
                            id="Values"
                            placeholder="Add Value"
                            type="text"
                            style={field_color}
                            name="Values"
                            value={PreviewData?.Values}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <div className="btn-box mt-4">
                          {PreviewData?.length !== 1 && (
                            <a
                              href={""}
                              className="inputValueCancel"
                              onClick={(e) => handleRemoveClick(e, index)}
                            >
                              ⨉
                            </a>
                          )}
                          {additionalSpecification?.length - 1 === index && (
                            <a
                              href={""}
                              className="btn btn-warning mt-2"
                              onClick={handleAddClick}
                            >
                              <div className="inputValueAddMore">
                                {" "}
                                + Add more
                              </div>
                            </a>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {/* );
                      }
                    )} */}
                  </div>
                );
              })}
              <li>
                <div>
                  <button className={styles.UploadButton}>Submit</button>
                </div>
              </li>
            </form>
          </ul>
          <ul className="formstyle"></ul>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Upload_Product;

const InputWithLabel = (props: InputWithLabelProps) => {
  return (
    <li>
      <label htmlFor={props.id} className={styles.Omra_Lael}>
        {props.label}
      </label>
      <input {...props} />
    </li>
  );
};

const TextAreaWithLabel = (props: TextAreaWithLabelProps) => {
  return (
    <li>
      <label htmlFor={props.id} className={styles.Omra_Lael}>
        {props.label}
      </label>
      <textarea {...props}></textarea>
    </li>
  );
};
const SelectWithLabel = (props: SelectWithLabelProps) => {
  return (
    <React.Fragment>
      <label htmlFor={props.id} className={styles.Omra_Lael}>
        {props.label}
      </label>
      <select {...props}>
        <option>Select Subcategory</option>
        {props?.data?.map((item: any, index: any) => {
          return (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

const SelectWithLabel1 = (props: SelectWithLabelProps) => {
  return (
    <React.Fragment>
      <label htmlFor={props.id} className={styles.Omra_Lael}>
        {props.label}
      </label>
      <select {...props}>
        <option disabled>Select source</option>
        {props?.data?.map((item: any, index: any) => {
          return (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

const data = [
  {
    id: "",
    type: "text",
    label: "Delivery Time",
    name: "Delivery Time",
  },
];
