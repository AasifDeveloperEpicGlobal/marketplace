import React, {
  OptionHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import {
  useGetBussinessDetails,
  useGetCategory,
  useGetCategoryBySearch,
  useGetCategoryForUploadProduct,
  useGetSubCategory,
  useGetSubCategoryForUploadProduct,
  useGetUserDetail,
  useProducts,
  usePublicProduct,
  userProduct,
} from "networkAPI/queries";
import { NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Col, FormGroup, Input, Row } from "reactstrap";
import { useAppSelector } from "redux/hooks";
import styles from "styles/Merchant/uploadproduct.module.scss";
import { Cropper } from "react-cropper";
// import { delay } from "lodash";
import delay from "utils/delay";
import AdminLayout from "components/AdminLayout";
import { parseCookies } from "nookies";
import { dehydrate, QueryClient } from "react-query";
import axios from "axios";
import CountryFlagDropdown from "pages/countryflagdropdown";
interface SpecificationsBox {
  atribute: string;
  Values: string;
}
const Upload_Product: NextPage = () => {
  const countrydata = [
    { label: "India", value: "India" },
    { label: "usa", value: "USA" },
    { label: "Germany", value: "Germany" },
    { label: "Canada", value: "Canada" },
    { label: "Australia", value: "Australia" },
    { label: "France", value: "France" },
    { label: "Argentina", value: "Argentina" },
  ];
  const ref = useRef(null);
  // const user = useAppSelector((state)=>state.user)

  const { user } = useAppSelector((state) => state);
  const [additionalSpecification, setadditionalSpecification] = useState<any>([
    {
      atribute: "",
      Values: "",
    },
  ]);
  const [isApproved, setisApproved] = useState<boolean>(false);
  const [product_name, setProduct_name] = useState<string>("");
  const [product_description, setProduct_description] = useState<string>("");
  const [product_image1, setProduct_image1] = useState<any>("");
  const [product_image2, setProduct_image2] = useState<any>("");
  const [product_image3, setProduct_image3] = useState<any>("");
  const [product_image4, setProduct_image4] = useState<any>("");
  const [product_image5, setProduct_image5] = useState<any>("");
  const [message, setMessage] = useState<string>("");
  const [cropper, setCropper] = useState<any>(false); //To show cropper or not
  const [cropping, setCropping] = useState(false);
  const [croppedImage, setCroppedImage] = useState<any>(""); //To store cropped image
  const [searchItemName, setSearchItemName] = React.useState("");
  const categoryInitial = !searchItemName ? "" : searchItemName;
  const [category, setCategory] = useState<string>("");
  const [sub_category, setSub_Categoery] = useState<string>("");

  const [price, setPrice] = useState<string>("0");

  const [product_Specification, setProduct_Specification] =
    useState<string>("");

  const [videos, setVideos] = useState<string>("");
  const [manufacturer_phone_no, setManufacturer_phone_no] =
    useState<string>("");

  const [manufacturer_address, setManufacturer_address] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [product_code, setProduct_code] = useState<string>("");
  const [delivery_time, setDelivery_time] = useState<string>("");
  const [made_in, setMade_in] = useState<string>("");
  const [source_type, setSource_type] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [whatsApp, setWhatsApp] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [pDF, setPDF] = useState("");
  const [other, setOther] = useState("");
  const [model_no, setModel_no] = useState<string>("");
  const [image_source_image, setImage_source_image] = useState<any>("");
  const [image_source_pdf, setImage_source_pdf] = useState<any>("");
  const [image_source_other, setImage_source_other] = useState<string>("");
  const [image_source_url, setImage_source_url] = useState<string>("");
  const [image_source, setImage_source] = useState<any>();
  const [notificationData, setNotificationData] = useState<any>([]);
  const [product_image1Preview, setProduct_image1Preview] =
    useState<string>("");
  const [product_image2Preview, setProduct_image2Preview] =
    useState<string>("");
  const [product_image3Preview, setProduct_image3Preview] =
    useState<string>("");
  const [product_image4Preview, setProduct_image4Preview] =
    useState<string>("");
  const [product_image5Preview, setProduct_image5Preview] =
    useState<string>("");

  // const [product_name,setProduct_name] =useState<string>("")
  const router = useRouter();

  const { error, isLoading, data, mutate } = userProduct();
  const { data: getProduct, status, refetch } = useProducts();
  const { error: err1, data: data1 } = usePublicProduct();
  const { error: err2, data: bussinesName } = useGetBussinessDetails();
  const { data: merchantData } = useGetUserDetail();
  const { error: err3, data: subcategoryData } =
    useGetSubCategoryForUploadProduct();
  const [query, setQuery] = useState<string>("");

  const { data: searchCategory } = useGetCategoryBySearch(query);

  const [avatarPreview, setAvatarPreview] = useState<any>(""); //To store avatar preview

  const companyName = bussinesName?.data?.user?.company_Name;

  const [cityDropDown, setCityDropDown] = React.useState(false);

  // DYNAMIC SELECT INPUTS

  // const [source_type, setSourceType] = useState("");
  console.log("counry", data);
  const RenderInputs = React.useMemo(() => {
    switch (source_type) {
      case "WhatsApp":
        return (
          <li>
            <label htmlFor="whatsApp" className={styles.Omra_Lael}>
              {"Image"}
            </label>
            <input
              type="file"
              name="whatsApp"
              placeholder="Enter image"
              id="whatsApp"
              value={image_source_image}
              onChange={(e) => setImage_source_image(e.target.value)}
            />
          </li>
        );
      case "Other":
        return (
          <li>
            <label htmlFor="Other" className={styles.Omra_Lael}>
              {source_type}
            </label>
            <input
              type="text"
              name="Other"
              placeholder="Enter Other Details"
              id="Other"
              value={image_source_other}
              onChange={(e) => setImage_source_other(e.target.value)}
            />
          </li>
        );

      case "PDF":
        return (
          <li>
            <label htmlFor="pDF" className={styles.Omra_Lael}>
              {source_type}
            </label>
            <input
              type="file"
              name="pDF"
              placeholder="Enter PDF"
              id="pDF"
              value={pDF}
              onChange={(e) => setImage_source_pdf(e.target.value)}
            />
          </li>
        );

      default:
        return (
          <li>
            <label htmlFor="website" className={styles.Omra_Lael}>
              {source_type}
            </label>
            <input
              type="text"
              name="website"
              placeholder="Enter website url"
              id="website"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </li>
        );
    }
  }, [image_source_image, image_source_other, pDF, source, source_type]);

  const field_color = {
    color: "red",
  };
  const handlePopupClose = () => {
    setCropping(false);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleInputChange = (e: any, index: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    const list = [...additionalSpecification];
    list[index][name] = value;
    setadditionalSpecification(list);
  };

  const handleRemoveClick = (e: any, index: any) => {
    e.preventDefault();

    const list = [...additionalSpecification];
    list.splice(index, 1);
    setadditionalSpecification(list);
  };

  const handleAddClick = (e: any) => {
    e.preventDefault();
    setadditionalSpecification([
      ...additionalSpecification,
      { atribute: "", Values: "" },
    ]);
  };

  const handleSubmitProduct = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isConfirm = window.confirm("Are you sure to upload this product");
      if (isConfirm && product_name && category && product_image1) {
        mutate(
          {
            // Vendor_Id,
            // auther_Id,
            // vendors_name,
            product_name,
            isApproved,
            // TypesOf_Bussiness,
            manufacturer_phone_no,
            manufacturer_address,
            brand,
            product_image1,
            product_image2,
            product_image3,
            product_image4,
            product_image5,
            category,
            sub_category,
            price,
            additionalSpecification,
            product_Specification,
            product_description,
            capacity,
            product_code,
            delivery_time,
            made_in,

            model_no,
            videos,
            source,
            source_type,

            image_source,
            image_source_url,
            image_source_image,
            image_source_pdf,
            image_source_other,
          },
          {
            onSuccess: () => {
              // toast.success("your data has been uploaded  Successfully");
              // delay(5000);
              // router.push("/onboarding/dashboard/product/all-product");
            },
          }
        );
      } else {
        toast.success(
          `${!product_name ? "product name" : ""} ${
            !category ? "category" : ""
          }  ${!product_image1 ? "First Image" : ""} ${" "}field is compulsory`
        );
      }
    },
    [
      additionalSpecification,
      brand,
      capacity,
      category,
      delivery_time,
      image_source,
      image_source_image,
      image_source_other,
      image_source_pdf,
      image_source_url,
      isApproved,
      made_in,
      manufacturer_address,
      manufacturer_phone_no,
      model_no,
      mutate,
      price,
      product_Specification,
      product_code,
      product_description,
      product_image1,
      product_image2,
      product_image3,
      product_image4,
      product_image5,
      product_name,
      source,
      source_type,
      sub_category,
      videos,
    ]
  );

  const data3 = useGetCategory();
  const data2 = useGetCategoryForUploadProduct();
  console.log(data2)

  const category_data = data2.data?.data;


  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (data) {
      //@ts-ignore

      // refetch();
      //@ts-ignore
      if (data?.success == true) {
        refetch();
        //@ts-ignore
        toast.success(data ? data.message : "");
        router.push("/onboarding/dashboard/product/all-product");
      } else {
        //@ts-ignore
        toast.error(data ? data.message : "");
      }

      // delay(5000);
    }
    // router.push("/onboarding/dashboard/product/all-product")
    setNotificationData(data);
  }, [error, data, router, refetch]);

  useEffect(() => {
    // create the preview

    if (product_image1) {
      const objectUrl = URL.createObjectURL(product_image1);
      setProduct_image1Preview(objectUrl);
    }

    if (product_image2) {
      const objectUrl2 = URL.createObjectURL(product_image2);
      setProduct_image2Preview(objectUrl2);
    }
    if (product_image3) {
      const objectUrl3 = URL.createObjectURL(product_image3);
      setProduct_image3Preview(objectUrl3);
    }
    if (product_image4) {
      const objectUrl4 = URL.createObjectURL(product_image4);
      setProduct_image4Preview(objectUrl4);
    }
    if (product_image5) {
      const objectUrl5 = URL.createObjectURL(product_image5);
      setProduct_image5Preview(objectUrl5);
    }
  }, [
    product_image1,
    product_image2,
    product_image3,
    product_image4,
    product_image5,
  ]);
  const handleCategory = (e: any, item: any) => {
    setCategory(item.category_name);
  };
  const source_data = [
    { label: "Website", value: "Website" },
    { label: "WhatsApp", value: "WhatsApp" },
    { label: "PDF", value: "PDF" },
    { label: "Other", value: "Other" },
  ];
  const test = query ? searchCategory : category_data;

  useEffect(() => {}, [searchItemName, query, category]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const handleSelect = (selectedItems: any) => {
    setSelectedFlavors(selectedItems);
  };
  //Image validation starts
  useEffect(() => {
    if (product_image1) {
      setMessage("");
    }
  }, [product_image1]);

  const handleSubmit = () => {
    if (!product_image1) {
      setMessage("Upload aleast one image");
      // mutate(
      //   payment_mode,
      //   payment_status,
      //   image,
      // );
    } else {
      setMessage("");
    }
  };

  //Image validation ends

  return (
    <div className={styles.container_width}>
      <AdminLayout>
        <div className={styles.mov}>
          <h1 className={styles.heading_box}>
            Welcome to {merchantData?.company_Name}{" "}
          </h1>

          <ul className={styles.box345}>
            <li>
              <div className={styles.prevpic}>
                <div>
                  {product_image1Preview && (
                    <Image
                      src={product_image1Preview}
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  {product_image2Preview && (
                    <Image
                      src={product_image2Preview}
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  {product_image3Preview && (
                    <Image
                      src={product_image3Preview}
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  {product_image4Preview && (
                    <Image
                      src={product_image4Preview}
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  {product_image5Preview && (
                    <Image
                      src={product_image5Preview}
                      className={styles.imagestyle2}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </li>

            <form onSubmit={handleSubmitProduct}>
              <div
                className={`${styles.signupboxinnerbox}  coverBox ${styles.coverBox}`}
                style={{
                  display: !cropping ? "none" : "block",
                }}
              >
                <div className="coverboxinner">
                  <div className="signup-box-inner">
                    <div className={styles.logosection}>
                      {/* <Image
                        src="/svg/main-logo.svg"
                        width={180}
                        height={45}
                        className={styles.logoimg}
                        alt="main logo"
                      /> */}
                      <h1 className={` ${styles.heading}  cropheading `}>
                        Crop Your Avatar
                      </h1>
                    </div>
                  </div>
                  <Cropper
                    style={{ height: "400px", width: "100%" }}
                    zoomTo={0.5}
                    preview=".img-preview"
                    src={avatarPreview}
                    viewMode={3}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    initialAspectRatio={1 / 1}
                    aspectRatio={1 / 1}
                    // cropBoxResizable={false}
                    // cropBoxMovable={false}
                    dragMode="move"
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                    guides={true}
                  />
                  <div
                    className={styles.profilebtn}
                    style={{ marginTop: "30px" }}
                  >
                    <p
                      onClick={() => {
                        getCropData();
                        setCropping(false);
                      }}
                    >
                      <Link href={""} className="savebtn">
                        Save
                      </Link>
                    </p>
                    <p style={{ textAlign: "center", marginTop: "15px" }}>
                      <Link
                        href={""}
                        className="atext"
                        onClick={handlePopupClose}
                      >
                        Cancel
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <li>
                <label htmlFor="product_image" className={styles.Omra_Lael}>
                  Product Image:
                </label>

                <div className={styles.row}>
                  <div className="col-md-4">
                    <div className={styles.imagewarningtext}>
                      <span>
                        <input
                          type="file"
                          name="product_image"
                          onChange={(e: any) =>
                            setProduct_image1(e.target.files[0])
                          }
                        />
                      </span>
                      <span className={styles.spantext}>
                        {message ? <span>{message}</span> : null}
                      </span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <input
                      type="file"
                      name="product_image2"
                      onChange={(e: any) =>
                        setProduct_image2(e.target.files[0])
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="file"
                      name="product_image3"
                      onChange={(e: any) =>
                        setProduct_image3(e.target.files[0])
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="file"
                      name="product_image4"
                      onChange={(e: any) =>
                        setProduct_image4(e.target.files[0])
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="file"
                      name="product_image5"
                      onChange={(e: any) =>
                        setProduct_image5(e.target.files[0])
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <input type="link" placeholder="Youtube Link" />
                  </div>
                </div>
              </li>

              <li>
                <label htmlFor="source_type" className={styles.Omra_Lael}>
                  Source Type:
                </label>

                <select
                  style={{
                    maxHeight: "100px",
                  }}
                  name="source_type"
                  className={styles.dropdown}
                  value={source_type}
                  onChange={(e) =>
                    // setSource_type(e.target.value)
                    // handleSourceType(e)
                    setSource_type(e.target.value)
                  }
                >
                  <option disabled>Select Source</option>
                  {source_data?.map((item: any, index: any) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </li>
              {RenderInputs}

              {/* {<sourceTest />} */}

              <li>
                <label htmlFor="productname" className={styles.Omra_Lael}>
                  Product Name *:
                </label>

                <input
                  type="text"
                  name="productname"
                  placeholder="Enter Product Name"
                  id="productname"
                  required
                  onChange={(e) => setProduct_name(e.target.value)}
                />
              </li>

              <li>
                <label htmlFor="category" className={styles.Omra_Lael}>
                  Product Category *:
                </label>

                <select
                  style={{
                    maxHeight: "100px",
                  }}
                  name="category"
                  className={styles.dropdown}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  data-live-searrch="true"
                >
                  <option value="">Select Category</option>
                  {test?.map((item: any, index: any) => {
                    return (
                      <>
                        <option key={index} value={item.category_name}>
                          {item.category_name}
                        </option>
                      </>
                    );
                  })}
                </select>
                <div className="searchable" style={{ marginTop: "0px" }}>
                  {" "}
                  <input
                    type="text"
                    value={query}
                    placeholder="Search Category"
                    onKeyPress={(e) => setCategory("")}
                    // onMouseLeave={(e) => setQuery("")}
                    // onMouseLeave={(e) => setQuery("")}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </li>
              {query ? (
                !category ? (
                  <ul>
                    {searchCategory?.length < 1 ? (
                      <h2 className={styles.notfound}>Not Found</h2>
                    ) : (
                      searchCategory?.map((item: any, index: any) => {
                        return (
                          <ul
                            key={index}
                            className={styles.categeorydropdown}
                            // style={{
                            //   height: "30px",
                            //   overflowY: "scroll",
                            //   zIndex: 1,
                            // }}
                          >
                            <li
                              className={styles.categorySearch}
                              onClick={
                                (e) => handleCategory(e, item)
                                // setSearchItemName(item.category_name)
                              }
                            >
                              {item.category_name}
                            </li>
                          </ul>
                        );
                      })
                    )}
                  </ul>
                ) : null
              ) : null}

              <li>
                <label htmlFor="subcategory" className={styles.Omra_Lael}>
                  SubCategory *:
                </label>

                <select
                  style={{
                    maxHeight: "100px",
                  }}
                  name="subcategory"
                  className={styles.dropdown}
                  value={sub_category}
                  onChange={(e) => setSub_Categoery(e.target.value)}
                  required
                >
                  <option value="">Select SubCategory</option>
                  <option value={category}>{category}</option>
                  {subcategoryData?.data.map((item: any, index: any) => {
                    if (item.category_name == category) {
                      return (
                        <>
                          <option key={index} value={item.sub_category_name}>
                            {item.sub_category_name}
                          </option>
                        </>
                      );
                    }
                  })}
                </select>
              </li>

              <li>
                <label htmlFor="brand_name" className={styles.Omra_Lael}>
                  Brand:
                </label>

                <input
                  type="text"
                  name="brand_name"
                  id="brand_name"
                  placeholder="Brand Name "
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>

              <li className={`qtyproduct ${styles.qtyproduct} `}>
                <div className="row">
                  <div className={`col-md-6 ${styles.colbox} `}>
                    <label htmlFor="price" className={styles.Omra_Lael}>
                      Price(Per/Piece):
                    </label>

                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Price per piece"
                      className="box-input-section"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className={`col-md-6 ${styles.colbox} `}>
                    <label htmlFor="" className={styles.Omra_Lael}>
                      Qty:
                    </label>

                    <input
                      type="number"
                      name=""
                      id=""
                      className="box-input-section"
                    />
                  </div>
                </div>
              </li>

              <li>
                <label htmlFor="description" className={styles.Omra_Lael}>
                  Description:
                </label>
                <textarea
                  rows={9}
                  cols={200}
                  id="description"
                  name="description"
                  placeholder="Enter Product Description "
                  onChange={(e) => setProduct_description(e.target.value)}
                />
              </li>

              <li>
                <label htmlFor="description" className={styles.Omra_Lael}>
                  Product Specifications:
                </label>
                <textarea
                  rows={9}
                  cols={200}
                  id="product_specification"
                  name="product_specification"
                  placeholder="Enter Product Specifications "
                  onChange={(e) => setProduct_Specification(e.target.value)}
                />
              </li>

              <li>
                <label htmlFor="capacity" className={styles.Omra_Lael}>
                  Capacity:
                </label>
                <input
                  type="text"
                  name="capacity"
                  id="capacity"
                  placeholder="Enter capacity"
                  className="box-input-textarea"
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </li>

              <li>
                <label htmlFor="model_no" className={styles.Omra_Lael}>
                  Model No.:
                </label>
                <input
                  type="number"
                  name="model_no"
                  id="model_no"
                  placeholder="Enter model no "
                  className="box-input-textarea"
                  onChange={(e) => setModel_no(e.target.value)}
                />
              </li>

              <li>
                <label htmlFor="product_code" className={styles.Omra_Lael}>
                  Product Code:
                </label>
                <input
                  type="text"
                  name="product_code"
                  id="product_code"
                  placeholder="Enter product code "
                  className="box-input-textarea"
                  onChange={(e) => setProduct_code(e.target.value)}
                />
              </li>

              <li>
                <label htmlFor="delivery_time" className={styles.Omra_Lael}>
                  Delivery Time:
                </label>
                <input
                  type="text"
                  name="delivery_time"
                  id="delivery_time"
                  placeholder="Enter Delivery Time "
                  className="box-input-textarea"
                  onChange={(e) => setDelivery_time(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="made_in" className={styles.Omra_Lael}>
                  Country:
                </label>
                {/* <input
                  type="text"
                  name="made_in"
                  id="made_in"
                  placeholder="Enter Country Name"
                  className="box-input-textarea"
                  onChange={(e) => setMade_in(e.target.value)}
                /> */}

                <CountryFlagDropdown
                  setCountryName={setMade_in}
                  countryName={made_in}
                />
              </li>

              <h4> Additional Specifications</h4>
              {additionalSpecification.map((y: any, i: any) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    className={styles.footerboxstyle3}
                    style={{ display: "flex" }}
                  >
                    <Row key={i}>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            className="inputValuesAttibute"
                            id="atribute"
                            placeholder="Add Atributes"
                            name="atribute"
                            type="text"
                            value={y.atribute}
                            onChange={(e) => handleInputChange(e, i)}
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
                            value={y.Values}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <div className="btn-box mt-4">
                          {additionalSpecification.length !== 1 && (
                            <a
                              href={""}
                              className="inputValueCancel"
                              onClick={(e) => handleRemoveClick(e, i)}
                            >
                              ⨉
                            </a>
                          )}
                          {additionalSpecification.length - 1 === i && (
                            <a
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
                  </div>
                );
              })}

              <li>
                <div>
                  <button
                    className={styles.UploadButton}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
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

export const getServerSideProps = async (context: any) => {
  const access_token = parseCookies({ req: context.req });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "products",
    async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/get_products`,
        {
          headers: {
            //@ts-ignore
            authorization: `bearer ${access_token.access_token}`,
          },
        }
      ).then((response) => response.json())
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
