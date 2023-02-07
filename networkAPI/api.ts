import { BlobOptions } from "buffer";
import ProductCard from "components/ProductCard";
import { string } from "yup";
import axios from "./axios";
import {
  AddBannerType,
  AddBlogsType,
  addMRPType,
  addPackageType,
  addPaymentType,
  addServiceType,
  addSubscriptionType,
  AddTeaserBannerType,
  Authentication,
  bannerImages,
  BookDemoType,
  bulkEnquiryType,
  categorydeleteType,
  CustomerQueryType,
  CustomerQueryUpdateType,
  CustomerQueryUpdateType2,
  hideShowCategoryType,
  hideShowSubCategoryType,
  Login,
  paymentdetailsType,
  productSubCategory,
  productUpdateSubCategoryType,
  Register,
  suppliersEnquiryType,
  UpdateBannerType,
  UpdateCallServiceType,
  UpdateCategoryBannerType,
  UpdateEmailServiceType,
  UpdateLeadServiceType,
  updateMRPType,
  updatePackageType,
  updatepayLinkType,
  UpdateServices,
  updateServiceType,
  updateSubscriptionType,
  updateSuppliersEnquiryType,
  UpdateTeaserBannerType,
  UserDeactivate,
  UserDetail,
  UserProduct,
  userProductForDeclined,
  userProductForUpdate,
  userProfile,
} from "./types";

export const login = (email: string, password: string): Promise<any> =>
  axios
    .post<Login>("/api/login", { email, password })
    .then((response) => response.data);

export const register = (
  email: string,
  mobile_no: string,
  password: string,
  role: string
) =>
  axios
    .post<Register>("/api/signup", {
      email,
      mobile_no,
      password,
      role,
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });

export const forgotpassword = (
  email: string,
  password: string
): Promise<Object> => {
  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  return axios
    .patch<updateServiceType>(`/api/forgotpassword2`, {
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const UserDetails = (
  Merchant_Name: string,
  SubTypeOf_bussiness: string,
  TypesOf_Bussiness: string,
  Merchant_ServiceArea_Pincodes: string,
  Merchant_Designation: string,
  Merchant_City: string,
  Merchant_Address: string,
  Year_of_establishment: string,
  GST_No: string,
  PAN_No: string
): Promise<Object> =>
  axios
    .patch<UserDetail>("/api/user/details", {
      Merchant_Name,
      SubTypeOf_bussiness,
      TypesOf_Bussiness,
      Merchant_ServiceArea_Pincodes,
      Merchant_Designation,
      Merchant_City,
      Merchant_Address,
      Year_of_establishment,
      GST_No,
      PAN_No,
    })
    .then((response) => response.data);

export const UpdateUserDetails = (
  Merchant_Name: string,
  SubTypeOf_bussiness: string,
  TypesOf_Bussiness: string,
  Merchant_ServiceArea_Pincodes: string,
  Merchant_Designation: string,
  Merchant_City: string,
  Merchant_Address: string,
  Year_of_establishment: string,
  GST_No: string,
  PAN_No: string,
  _id: string
): Promise<Object> =>
  axios
    .patch<UserDetail>(`/api/user/update-user/${_id}`, {
      Merchant_Name,
      SubTypeOf_bussiness,
      TypesOf_Bussiness,
      Merchant_ServiceArea_Pincodes,
      Merchant_Designation,
      Merchant_City,
      Merchant_Address,
      Year_of_establishment,
      GST_No,
      PAN_No,
    })
    .then((response) => response.data);

export const getUpdateServices = (
  isUpload: boolean,

  _id: string
): Promise<Object> =>
  axios
    .patch<UpdateServices>(`/api/user/product-upload-services/${_id}`, {
      isUpload,
    })
    .then((response) => response.data);

export const getUpdateCallServices = (
  isCall: boolean,

  _id: string
): Promise<Object> =>
  axios
    .patch<UpdateCallServiceType>(`/api/user/activate-call-Service/${_id}`, {
      isCall,
    })
    .then((response) => response.data);

export const getUpdateEmailServices = (
  isEmail: boolean,

  _id: string
): Promise<Object> =>
  axios
    .patch<UpdateEmailServiceType>(`/api/user/activate-email-Service/${_id}`, {
      isEmail,
    })
    .then((response) => response.data);

/// Activate Leads Service api

export const getUpdateLeadServices = (
  isLead: boolean,

  _id: string
): Promise<Object> =>
  axios
    .patch<UpdateLeadServiceType>(`/api/user/activate-leads-Service/${_id}`, {
      isLead,
    })
    .then((response) => response.data);

export const companyProfle = (
  company_Name: string,
  description: string
): Promise<Object> =>
  axios
    .patch<userProfile>("/api/user/companyprofile", {
      company_Name,
      description,
    })
    .then((response) => response.data);

export const sellProduct = (
  // Vendor_Id: string,
  // auther_Id: string,
  // vendors_name: string,
  product_name: string,
  // TypesOf_Bussiness: string,
  manufacturer_phone_no: string,
  manufacturer_address: string,
  brand: string,
  product_image1: Blob,
  product_image2: Blob,
  product_image3: Blob,
  product_image4: Blob,
  product_image5: Blob,
  category: string,
  sub_category: string,
  price: string,
  product_Specification: string,
  additionalSpecification: any,
  product_description: string,
  capacity: string,
  product_code: string,
  delivery_time: string,
  made_in: string,
  source: string,
  source_type: string,
  model_no: string,
  videos: string,
  image_source: Blob,
  image_source_url: string,
  image_source_image: Blob,
  image_source_pdf: Blob,
  image_source_other: string
): Promise<Object> => {
  const formData = new FormData();
  // formData.append("Vendor_Id", Vendor_Id);
  // formData.append("auther_Id", auther_Id);
  // formData.append("vendors_name", vendors_name);
  formData.append("product_name", product_name);
  // formData.append("TypesOf_Bussiness", TypesOf_Bussiness);
  formData.append("manufacturer_phone_no", manufacturer_phone_no);
  formData.append("manufacturer_address", manufacturer_address);
  formData.append("brand", brand);
  formData.append("product_image1", product_image1);
  formData.append("product_image2", product_image2);
  formData.append("product_image3", product_image3);
  formData.append("product_image4", product_image4);
  formData.append("product_image5", product_image5);
  formData.append("category", category);
  formData.append("sub_category", sub_category);
  formData.append("price", price);
  formData.append("product_Specification", product_Specification);
  formData.append(
    "additionalSpecification",
    JSON.stringify(additionalSpecification)
  );
  formData.append("image_source", JSON.stringify(image_source));
  formData.append("product_description", product_description);
  formData.append("capacity", capacity);
  formData.append("product_code", product_code);
  formData.append("delivery_time", delivery_time);
  formData.append("made_in", made_in);
  formData.append("source_type", source_type);
  formData.append("source", source);

  formData.append("model_no", model_no);
  formData.append("videos", videos);
  formData.append("image_source_image", image_source_image);
  formData.append("image_source_pdf", image_source_pdf);
  formData.append("image_source_url", image_source_url);
  formData.append("image_source_other", image_source_other);

  return axios
    .post<UserProduct>("/api/user/upload_product", formData)
    .then((response) => response.data);
};
// Update  Product by All field============================
export const updateSellerProduct = (
  // Vendor_Id: string,
  auther_Id: string,
  // vendors_name: string,
  product_name: string,
  // TypesOf_Bussiness: string,
  manufacturer_phone_no: string,
  manufacturer_address: string,
  brand: string,
  product_image1: Blob,
  product_image2: Blob,
  product_image3: Blob,
  product_image4: Blob,
  product_image5: Blob,
  category: string,
  sub_category: string,
  price: string,
  product_Specification: string,
  additionalSpecification: Blob,

  product_description: string,
  capacity: string,
  product_code: string,
  delivery_time: string,
  made_in: string,
  source: string,
  source_type: string,
  model_no: string,
  videos: string,
  id: string
): Promise<Object> => {
  const formData = new FormData();
  // formData.append("Vendor_Id", Vendor_Id);
  formData.append("auther_Id", auther_Id);
  // formData.append("vendors_name", vendors_name);
  formData.append("product_name", product_name);
  // formData.append("TypesOf_Bussiness", TypesOf_Bussiness);
  formData.append("manufacturer_phone_no", manufacturer_phone_no);
  formData.append("manufacturer_address", manufacturer_address);
  formData.append("brand", brand);
  formData.append("product_image1", product_image1);
  formData.append("product_image2", product_image2);
  formData.append("product_image3", product_image3);
  formData.append("product_image4", product_image4);
  formData.append("product_image5", product_image5);
  formData.append("category", category);
  formData.append("sub_category", sub_category);
  formData.append("price", price);
  formData.append("product_Specification", product_Specification);
  formData.append(
    "additionalSpecification",
    JSON.stringify(additionalSpecification)
  );

  formData.append("product_description", product_description);
  formData.append("capacity", capacity);
  formData.append("product_code", product_code);
  formData.append("delivery_time", delivery_time);
  formData.append("made_in", made_in);
  formData.append("source", source);
  formData.append("source_type", source_type);

  formData.append("model_no", model_no);
  formData.append("videos", videos);

  return axios
    .patch<UserProduct>(`/api/user/update_product_By/${id}`, formData)
    .then((response) => response.data);
};

// for update method for Product Approval======================
export const updateProduct = (
  isApproved: boolean,
  id: string
): Promise<Object> =>
  axios
    .patch<userProductForUpdate>(`/api/user/approved_product/${id}`, {
      isApproved,
    })
    .then((response) => response.data);
//================================== for declined

export const updateDeclineProduct = (
  isDeclined: boolean,
  status: String,

  id: string
): Promise<Object> =>
  axios
    .patch<userProductForDeclined>(`/api/user/declined_product/${id}`, {
      isDeclined,
      status,
    })
    .then((response) => response.data);

// axios.get<UserProduct>("/api/user/upload_product",{

// })
// .then(
//   (response)=> response.data
// )

// export const getProductsBycategory = () => axios.get<any>("/api/getByCategory");

/// search user=====================
export const getUserBySearch = (key: string): Promise<any> =>
  axios
    .get<any>(`/api/searchUser/${key}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getProductByMerchant = (user: string): Promise<any> =>
  axios
    .get<any>(`/api/productByUserId/${user}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error.message;
    });

export const getProductsByCategory = (category: string): Promise<any> =>
  axios
    .get<any>(`/api/productByCategory/${category}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error.message;
    });

export const getCityBySearch = (key: string): Promise<any> =>
  axios
    .get<any>(`https://api.postalpincode.in/postoffice/${key}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getCategoryBySearch = (key: string): Promise<any> =>
  axios
    .get<any>(`/api/category/searchCategory/${key}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getProductFilterByDate = (key: string): Promise<any> =>
  axios
    .get<string>(`/api/user/ApprovedFilterByDate/${key}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getWaitingProductFilterByDate = (key: string): Promise<any> =>
  axios
    .get<string>(`/api/user/waitingproductFilterByDate/${key}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

///get-services

export const getUserService = (): Promise<any> =>
  axios
    .get<string>(`/api/user/get-services`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

///=================
export const getProductsBycategory = (category: string) =>
  axios.get<any>("/api/getByCategory?category=" + encodeURIComponent(category));

export const getUserById = (id: string) =>
  axios.get<any>("/api/user/get_user?_id=" + encodeURIComponent(id));

export const getMerchantById = (id: string) =>
  axios.get<any>("/api/get_user?_id=" + encodeURIComponent(id));

export const getProductBySearch = (key: string): Promise<any> =>
  axios
    .get<any>(`/api/homepageSearch/${key}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
export const getProductBy_Id = (id: string) =>
  axios
    .get<any>(`/api/get_product/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getApprovedProductSearch = (key: string): Promise<any> =>
  axios
    .get<any>(`/api/user/ApprovedSearch/${key}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getwaitApprovalSearch = (key: string): Promise<any> =>
  axios
    .get<any>(`/api/user/waitingApprovalSearch/${key}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

//  /ApprovedSearch/:key

// export const getProductBySearch = (key: string): Promise<any> =>
//   axios
//     .get<any>(`/api/autoCompleteSearch/${key}`)
//     .then((response) => response.data)
//     .catch((error) => {
//       throw error;
//     });

export const getProducts = () => axios.get<any>("/api/user/get_products");
export const getProductsforApproved = () =>
  axios.get<any>("/api/user/getproductForApproval");
export const getPublishedProduct = () =>
  axios.get<any>("/api/get_publish_product");

export const getProductForApproval = () =>
  axios.get<any>("/api/get_productforApproval");
export const getCompnyProfile = () =>
  axios.get<any>("/api/user/companyprofile");
export const getBussinessDetails = () => axios.get<any>("/api/user/details");

export const getMerchantCredentials = () =>
  axios.get<any>("/api/user/userDetails");
export const getUserLogOut: any = () => {
  axios.post<any>("/api/logout");
};

export const getMerchantDetails = (pageParams = 1): any =>
  axios
    .get<any>(`/api/user/userDetailsPaginate?page=${pageParams}`)
    .then((response) => response.data);

export const getProductWithPaginate = (pageParams = 1): any =>
  axios
    .get<any>(`/api/publishproductApi?page=${pageParams}`)
    .then((response) => response.data);

export const getPublicProduct = () => axios.get<any>("/api/get_products");
export const getApprovalProduct = () =>
  axios.get<any>("/api/get_products_count");

export const getProductById = (id: string): Promise<any> =>
  axios
    .get<any>(`/api/user/get_product/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getbussinessDetaisById = (id: string): Promise<any> =>
  axios
    .get<any>(`/api/user/details/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getUserDetailsById = (): Promise<any> =>
  axios
    .get<any>(`/api/user/get_user`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
export const getUserDetails = (): Promise<any> =>
  axios
    .get<any>(`/api/user/get_user`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const Category = (
  category_name: string,

  category_image: Blob
): Promise<Object> => {
  const formData = new FormData();
  formData.append("category_name", category_name);

  formData.append("category_image", category_image);

  return axios
    .post<UserProduct>("/api/category/upload", formData)
    .then((response) => response.data);
};

export const updateCategory = (
  category_name: string,

  category_image: Blob,
  id: string
): Promise<Object> => {
  const formData = new FormData();

  formData.append("category_name", category_name);

  formData.append("category_image", category_image);

  return axios
    .patch<UserProduct>(`/api/category/update_category/${id}`, formData)
    .then((response) => response.data);
};

export const hideShowCategory = (
  id: string,
  isHide: boolean
): Promise<object> => {
  const formData = new FormData();

  return axios
    .patch<hideShowCategoryType>(`/api/category/hide-category/${id}`, {
      isHide,
    })
    .then((response) => response.data);
};

export const getCategory = () => axios.get<any>("/api/category/get_category");
export const getCategoryForUploadProduct = () =>
  axios.get<any>("/api/category/product_category");
export const getPostionCat = () =>
  axios.get<any>("/api/category/get_postionCat");
export const getHomeCategory = () =>
  axios.get<any>("/api/category/get_home_cat");

export const deleteCategory = (id: string) => {
  const formData = new FormData();

  return axios
    .delete<categorydeleteType>(`/api/category/delete_category/${id}`)
    .then((response: any) => response.data);
};

export const deleteSubCategory = (id: string) => {
  const formData = new FormData();

  return axios
    .delete<categorydeleteType>(`/api/category/delete_subcategory/${id}`)
    .then((response: any) => response.data);
};

// Sub CAtegory Api caling ====================================

export const subCategory = (
  category_Id: string,
  category_name: string,

  sub_category_name: string,
  sub_category_image: Blob
): Promise<Object> => {
  const formData = new FormData();
  formData.append("category_Id", category_Id);

  formData.append("category_name", category_name);
  formData.append("sub_category_name", sub_category_name);

  formData.append("sub_category_image", sub_category_image);

  return axios
    .post<productSubCategory>("/api/category/add-subcategory", formData)
    .then((response) => response.data);
};

export const updatesubCategory = (
  // category_Id:string,
  // category_name:string,

  sub_category_name: string,
  sub_category_image: Blob,
  id: string
): Promise<Object> => {
  const formData = new FormData();

  // formData.append("category_Id", category_Id);

  // formData.append("category_name", category_name);
  formData.append("sub_category_name", sub_category_name);

  formData.append("sub_category_image", sub_category_image);

  return axios
    .patch<productUpdateSubCategoryType>(
      `/api/category/update_sub_category/${id}`,
      formData
    )
    .then((response) => response.data);
};

export const hideShowSubCategory = (
  id: string,
  isHide: boolean
): Promise<object> => {
  const formData = new FormData();

  return axios
    .patch<hideShowSubCategoryType>(`/api/category/hide-subcategory/${id}`, {
      isHide,
    })
    .then((response) => response.data);
};
export const getSubCategoryForUploadProduct = () =>
  axios.get<any>("/api/category/get_subcategory-for-upload");

export const getSubCategory = () =>
  axios.get<any>("/api/category/get_subcategory");
export const getBrand = () => axios.get<any>("/api/brand");

export const getNotification = () => axios.get<any>("/api/user/notification");

export const getSubCategoryLazy = (pageParam = 1) =>
  axios.get<any>("/api/category/get_subcategory-lazy?page=" + pageParam);

export const getSubCategoryByCat = (category_name: string) =>
  axios.get<any>(
    "/api/category/get_subcategoryByCat?category_name=" +
      encodeURIComponent(category_name)
  );
// export const getProductsBycategory = (category:string) => axios.get<any>("/api/getByCategory?category="+encodeURIComponent(category));
export const getHomeSubCategory = () =>
  axios.get<any>("/api/category/get_home_Subcat");

///   Customer Query========================================================
export const CustomerQuery = (
  merchant_Id: string,
  product_Id: string,
  product_name: string,
  buyer_Message: string,
  buyer_Email: string,

  buyer_Mob: string,
  type: string
): Promise<Object> => {
  return axios
    .post<CustomerQueryType>("/api/connect_to_buy", {
      merchant_Id,
      product_Id,
      product_name,
      buyer_Message,
      buyer_Email,
      buyer_Mob,
      type,
    })
    .then((response) => response.data);
};

///callingApi
export const getcallingApi = (Agent_Mob_No: string, buyer_Mob: string) => {
  return axios
    .post<string>("/api/callingApi", { Agent_Mob_No, buyer_Mob })
    .then((res) => res.data);
};

export const DeactivateUser = (
  isActive: boolean,

  id: string
): Promise<Object> => {
  return axios
    .patch<UserDeactivate>(`/api/user/deactivate/${id}`, { isActive })
    .then((response) => response.data);
};
export const CustomerQueryUpdate = (
  isCompleted: boolean,

  id: string
): Promise<Object> => {
  return axios
    .patch<CustomerQueryUpdateType>(`/api/leads_update/${id}`, {
      isCompleted,
    })
    .then((response) => response.data);
};

export const CustomerQueryUpdate1 = (
  isDeclined: boolean,
  id: string
): Promise<Object> => {
  return axios
    .patch<CustomerQueryUpdateType2>(`/api/declined_lead/${id}`, {
      isDeclined,
    })
    .then((response) => response.data);
};
// Book Demo Enquiry===============
export const bookDemo = (
  merchant_Id: string,
  name: string,
  email: string,
  mobile: string,
  business_name: string,
  process: string,
  date: string,
  type: string
): Promise<Object> => {
  return axios
    .post<BookDemoType>("/api/enquiry/book-demo", {
      merchant_Id,
      name,
      email,
      mobile,
      business_name,
      process,
      date,
      type,
    })
    .then((response) => response.data);
};
// bulk enquiry==============

export const bulksEnquiry = (
  merchant_Id: string,
  name: string,
  email: string,
  mobile: string,
  business_name: string,
  product_category: string,
  comment: string,

  date: string,
  type: string
): Promise<Object> => {
  return axios
    .post<bulkEnquiryType>("/api/enquiry/bulk-enquiry", {
      merchant_Id,
      name,
      email,
      mobile,
      business_name,
      product_category,
      comment,

      date,
      type,
    })
    .then((response) => response.data);
};

// Supplier Center=================

export const SuppliersEnquiry = (mobile: string): Promise<Object> => {
  return axios
    .post<suppliersEnquiryType>("/api/enquiry/suppliers", {
      mobile,
    })
    .then((response) => response.data);
};

export const updateSuppliersEnquiry = (
  email: string,
  business_name: string,
  id: string
): Promise<Object> => {
  return axios
    .patch<updateSuppliersEnquiryType>(`/api/enquiry/suppliers/${id}`, {
      email,
      business_name,
    })
    .then((response) => response.data);
};

// Banners Images calling api
export const bannersImages = (
  banner_name: string,
  product: string,
  type: string,
  banner_image1: Blob,
  banner_image2: Blob,
  banner_image3: Blob,
  banner_image4: Blob,
  banner_image5: Blob
): Promise<Object> => {
  const formData = new FormData();
  formData.append("banner_name", banner_name);
  formData.append("type", type);
  formData.append("product", product);

  formData.append("banner_image1", banner_image1);
  formData.append("banner_image2", banner_image2);
  formData.append("banner_image3", banner_image3);
  formData.append("banner_image4", banner_image4);
  formData.append("banner_image5", banner_image5);

  return axios
    .post<bannerImages>("/api/banner", formData)
    .then((response) => response.data);
};

export const updateBannerImage = (
  product: string,
  banner_image1: Blob,
  banner_image2: Blob,
  banner_image3: Blob,
  banner_image4: Blob,
  banner_image5: Blob,
  id: string
): Promise<Object> => {
  const formData = new FormData();
  formData.append("product", product);
  formData.append("banner_image1", banner_image1);
  formData.append("banner_image2", banner_image2);
  formData.append("banner_image3", banner_image3);
  formData.append("banner_image4", banner_image4);
  formData.append("banner_image5", banner_image5);

  return axios
    .patch<bannerImages>(`/api/update_banner/${id}`, formData)
    .then((response) => response.data);
};

export const getbookDemo = () => axios.get<any>("/api/enquiry/getDemo");
export const getsuppliers = () => axios.get<any>("/api/enquiry/getsuppliers");

export const getBannerImages = () => axios.get<any>("/api/get_banner");
export const getBuyerQuery = () => axios.get<any>("/api/user/getbuyerQuery");
export const getBuyerQueryFor = () =>
  axios.get<any>("/api/user/getbuyerQueryfor");
export const getApprovalProductCount = () =>
  axios.get<any>("/api/user/getApprovedCount");
export const getBuyerLeadsCount = () =>
  axios.get<any>("/api/getbuyerQueryCount");

//====================== Start Banners  Section ===================================>

// Teaser Bannner
export const AddTeaserBanner = (
  merchant_id: string,
  merchant_name: string,

  banner_image: Blob,
  type: string
): Promise<Object> => {
  const formData = new FormData();

  formData.append("merchant_id", merchant_id);
  formData.append("merchant_name", merchant_name);

  formData.append("banner_image", banner_image);
  formData.append("type", type);

  return axios
    .post<AddTeaserBannerType>("/api/banner/upload_data", formData)
    .then((response: any) => response);
};

export const updateTeaserBanner = (
  merchant_id: string,
  merchant_name: string,

  banner_image: Blob,

  id: string
): Promise<Object> => {
  const formData = new FormData();

  formData.append("merchant_id", merchant_id);
  formData.append("merchant_name", merchant_name);

  formData.append("banner_image", banner_image);

  return axios
    .patch<UpdateTeaserBannerType>(`/api/banner/update_data/${id}`, formData)
    .then((response: any) => response);
};

// Category Bannner
export const AddCategoryBanner = (
  category_id: string,
  category_name: string,

  banner_image: Blob,
  type: string
): Promise<Object> => {
  const formData = new FormData();

  formData.append("category_id", category_id);
  formData.append("category_name", category_name);

  formData.append("banner_image", banner_image);
  formData.append("type", type);

  return axios
    .post<AddTeaserBannerType>("/api/banner/showcase1", formData)
    .then((response: any) => response);
};

export const updateCategoryBanner = (
  category_id: string,
  category_name: string,

  banner_image: Blob,

  id: string
): Promise<Object> => {
  const formData = new FormData();

  formData.append("category_id", category_id);
  formData.append("category_name", category_name);

  formData.append("banner_image", banner_image);

  return axios
    .patch<UpdateCategoryBannerType>(
      `/api/banner/update_showcase1/${id}`,
      formData
    )
    .then((response: any) => response);
};

// Discount Bannner
export const AddDiscountBanner = (
  product_id: string,
  product_name: string,

  banner_image: Blob,
  type: string
): Promise<Object> => {
  const formData = new FormData();

  formData.append("product_id", product_id);
  formData.append("product_name", product_name);

  formData.append("banner_image", banner_image);
  formData.append("type", type);

  return axios
    .post<AddTeaserBannerType>("/api/banner/showcase2", formData)
    .then((response: any) => response);
};

export const updateDiscountBanner = (
  product_id: string,
  product_name: string,

  banner_image: Blob,

  id: string
): Promise<Object> => {
  const formData = new FormData();

  formData.append("product_id", product_id);
  formData.append("product_name", product_name);

  formData.append("banner_image", banner_image);

  return axios
    .patch<UpdateTeaserBannerType>(`/api/banner/showcase2/${id}`, formData)
    .then((response: any) => response);
};
export const AddBanner = (
  banner_name: string,
  product_id: string,
  merchant_id: string,
  category_id: string,

  banner_image: Blob,
  type: string
): Promise<Object> => {
  const formData = new FormData();
  formData.append("banner_name", banner_name);
  formData.append("product_id", product_id);
  formData.append("merchant_id", merchant_id);
  formData.append("category_id", category_id);
  formData.append("banner_image", banner_image);
  formData.append("type", type);

  return axios
    .post<AddBannerType>("/api/banner/upload_data", formData)
    .then((response: any) => response);
};

export const updateBanner = (
  id: string,
  banner_name: string,
  product_id: string,
  merchant_id: string,
  category_id: string,

  banner_image: Blob,
  type: string
): Promise<Object> => {
  const formData = new FormData();
  formData.append("banner_name", banner_name);
  formData.append("product_id", product_id);
  formData.append("merchant_id", merchant_id);
  formData.append("category_id", category_id);
  formData.append("banner_image", banner_image);
  formData.append("type", type);

  return axios
    .patch<UpdateBannerType>(`/api/banner/update_data/${id}`, formData)
    .then((response: any) => response);
};

export const getTeaser = () => axios.get<any>("/api/banner/get_teaser_banner");
export const getCategoryBanner = () =>
  axios.get<any>("/api/banner/get_category_banner");
export const getDiscountBanner = () =>
  axios.get<any>("/api/banner/get_discount_banner");
// /get_teaser_banner
//====================== End Banners  Section ===================================>

// Blogs
export const AddBlogs = (
  blog_heading: string,
  blog_paragraph: string,
  blog_image: string
): Promise<Object> => {
  const formData = new FormData();
  formData.append("blog_heading", blog_heading);
  formData.append("blog_paragraph", blog_paragraph);
  formData.append("blog_image", blog_image);

  return axios
    .post<AddBlogsType>("/api/user/blog/upload", formData)
    .then((response: any) => response);
};

export const updateBlogs = (
  blog_heading: string,
  blog_paragraph: string,
  blog_image: string,
  id: string
): Promise<Object> => {
  const formData = new FormData();
  formData.append("blog_heading", blog_heading);
  formData.append("blog_paragraph", blog_paragraph);
  formData.append("blog_image", blog_image);

  return axios
    .post<AddBlogsType>(`/api/user/blog/upload/${id}`, formData)
    .then((response: any) => response);
};
// Send
export const sendEmail = ({
  merchantId,
  email,
  phoneNumber,
  description,
}: any) =>
  axios.post("/api/send-mail", {
    merchantId,
    email,
    phoneNumber,
    description,
  });

export const SendEmailForContactEnquary = ({
  name,
  businessName,
  merchantId,
  email,
  phoneNumber,
  description,
}: any) =>
  axios.post("/api/send-mail-contact-us", {
    name,
    businessName,
    merchantId,
    email,
    phoneNumber,
    description,
  });

export const sendSms = ({ mobileno, vendors_name, type }: any) =>
  axios.post("/api/send-sms", {
    mobileno,
    vendors_name,
    type,
  });

export const sendSmsForPayment = ({
  mobileno,
  vendors_name,
  invoice_Id,
  price,
  refId,
  type,
}: any) =>
  axios.post("/api/send-sms", {
    mobileno,
    vendors_name,
    invoice_Id,
    price,
    refId,
    type,
  });

export const sendSmsForSubscribed = ({
  mobileno,
  vendors_name,

  plan,
  start_date,
  end_date,
  type,
}: any) =>
  axios.post("/api/send-sms", {
    mobileno,
    vendors_name,

    plan,
    start_date,
    end_date,
    type,
  });

///  sendSmsForSubscribed

//<<<<<<<<<<<================================>>>> Pricing <<<<===========================>>>>>>>>>>>>>>>

export const addMRPRate = (price: string, unit: string): Promise<Object> => {
  // const formdata= new FormData()

  // formdata.append("price1",price)
  // formdata.append("unit1",unit)

  return axios
    .post<addMRPType>(`/api/pricing/add_price`, { price, unit })
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const updateMRPRate = (
  price: string,
  unit: string,

  id: string
): Promise<Object> => {
  // const formdata= new FormData()
  // formdata.append("price",price)
  // formdata.append("unit",unit)

  return axios
    .patch<updateMRPType>(`/api/pricing/update_price/${id}`, { price, unit })
    .then((res) => res.data)
    .catch((err) => err.message);
};

///get_service
export const getMRPRate = () => axios.get<any>("/api/pricing/get_price");

// delete mrp rate

export const deleteMrpRate = (id: string) => {
  return axios
    .delete<categorydeleteType>(`/api/pricing/delete_price/${id}`)
    .then((response: any) => response.data);
};

export const addService = (
  name: string,
  mrp_id: string,
  rate: string,
  unit: string,
  quantity: string,
  price: string,
  benifits: string,

  type: string
): Promise<Object> => {
  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("mrp_id", mrp_id);
  formdata.append("rate", rate);
  formdata.append("unit", unit);
  formdata.append("quantity", quantity);
  formdata.append("price", price);

  formdata.append("benifits", benifits);
  formdata.append("type", type);

  return axios
    .post<addServiceType>(`/api/pricing/add_service`, formdata)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const updateService = (
  name: string,
  mrp_id: string,
  rate: string,
  unit: string,
  quantity: string,
  price: string,
  benifits: string,
  type: string,
  id: string
): Promise<Object> => {
  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("mrp_id", mrp_id);
  formdata.append("rate", rate);
  formdata.append("unit", unit);
  formdata.append("quantity", quantity);
  formdata.append("price", price);
  formdata.append("benifits", benifits);
  formdata.append("type", type);

  return axios
    .patch<updateServiceType>(`/api/pricing/update_service/${id}`, {
      name,
      mrp_id,
      rate,
      unit,
      quantity,
      price,
      benifits,
      type,
      id,
    })
    .then((res) => res.data)
    .catch((err) => err.message);
};

///get_service
export const getService = () => axios.get<any>("/api/pricing/get_service");

export const deleteService = (id: string) => {
  return axios
    .delete<categorydeleteType>(`/api/pricing/delete_service/${id}`)
    .then((response: any) => response.data);
};

//======================= start Package===============>

export const addPackage = (
  name: string,
  Services: string,
  price: any,
  benifits: string,

  Amount: string,
  type: string
): Promise<Object> => {
  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("Services", JSON.stringify(Services));

  formdata.append("price", price);
  formdata.append("benifits", benifits);
  // formdata.append("validity",validity)

  formdata.append("Amount", Amount);
  formdata.append("type", type);

  return axios
    .post<addPackageType>(`/api/pricing/package/add_package`, formdata)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const updatePackage = (
  name: string,
  Services: string,
  price: string,
  benifits: string,
  validity: string,
  gst: string,
  Amount: string,
  type: string,
  id: string
): Promise<Object> => {
  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("Services", JSON.stringify(Services));

  // formdata.append("price", price);
  formdata.append("benifits", benifits);
  formdata.append("validity", validity);
  formdata.append("gst", gst);
  formdata.append("Amount", Amount);
  formdata.append("type", type);

  return axios
    .patch<updatePackageType>(
      `/api/pricing/package/update_package/${id}`,
      formdata
    )
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getPackage = () =>
  axios.get<any>("/api/pricing/package/get_package");

export const deletePackage = (id: string) => {
  return axios
    .delete<categorydeleteType>(`/api/pricing/package/delete_package/${id}`)
    .then((response: any) => response.data);
};

//======================= start subscription===============>

export const addSubscription = (
  auther_Id: string,
  mobile_no: string,
  vendors_name: string,
  email: string,
  GST_No: string,
  address: string,
  name: string,
  plan: string,
  plan2: string,
  payment_mode: string,
  start_date: string,
  end_date: string,
  price: string,
  benifits: string,
  validity: string,
  gst: string,
  total: string,
  Amount: string,
  payment_status: boolean,
  payment_link: string
): Promise<Object> => {
  const formdata = new FormData();
  formdata.append("auther_Id", auther_Id);
  formdata.append("mobile_no", mobile_no);
  formdata.append("vendors_name", vendors_name);
  formdata.append("email", email);
  formdata.append("GST_No", GST_No);
  formdata.append("address", address);
  formdata.append("name", name);
  formdata.append("plan", JSON.stringify(plan));
  formdata.append("plan2", plan2);
  formdata.append("payment_mode", payment_mode);
  formdata.append("start_date", start_date);
  formdata.append("end_date", end_date);
  formdata.append("price", price);
  formdata.append("benifits", benifits);
  formdata.append("validity", validity);
  formdata.append("gst", gst);
  formdata.append("total", total);
  formdata.append("Amount", Amount);
  formdata.append("payment_link", payment_link);
  // formdata.append("payment_status",payment_status)

  return axios
    .post<addSubscriptionType>(`/api/pricing/add_subscribe`, formdata)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const updateSubscription = (
  auther_Id: string,
  mobile_no: string,
  vendors_name: string,
  email: string,
  GST_No: string,
  address: string,
  name: string,
  plan: string,
  plan2: string,
  payment_mode: string,
  start_date: string,
  end_date: string,
  price: string,
  benifits: string,
  validity: string,
  gst: string,
  total: string,
  Amount: string,
  id: string
): Promise<Object> => {
  const formdata = new FormData();
  formdata.append("auther_Id", auther_Id);
  formdata.append("mobile_no", mobile_no);
  formdata.append("vendors_name", vendors_name);
  formdata.append("email", email);
  formdata.append("GST_No", GST_No);
  formdata.append("address", address);
  formdata.append("name", name);
  formdata.append("plan", JSON.stringify(plan));
  formdata.append("plan2", plan2);
  formdata.append("payment_mode", payment_mode);
  formdata.append("start_date", start_date);
  formdata.append("end_date", end_date);
  formdata.append("price", price);
  formdata.append("benifits", benifits);
  formdata.append("validity", validity);
  formdata.append("gstt", gst);
  formdata.append("total", total);
  formdata.append("Amount", Amount);

  return axios
    .patch<updateSubscriptionType>(
      `/api/pricing/update_subscription/${id}`,
      formdata
    )
    .then((res) => res.data)
    .catch((err) => err.message);
};
// payment- link

export const PayMentLink = (
  email: string,
  mobile_no: string,
  name: string,
  link_id: string,
  Amount: string,
  purpose: string,

  payment_link: string
): Promise<Object> => {
  const formdata = new FormData();

  formdata.append("payment_link", payment_link);
  formdata.append("email", email);
  formdata.append("mobile_no", mobile_no);
  formdata.append("name", name);
  formdata.append("link_id", link_id);
  formdata.append("Amount", Amount);
  formdata.append("purpose", purpose);

  return axios
    .post<addPaymentType>(`/api/pricing/payment-link`, formdata)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const resendPayLink = (
  payment_link: string,

  id: string
): Promise<Object> => {
  const formdata = new FormData();

  formdata.append("payment_link", payment_link);

  return axios
    .patch<updatepayLinkType>(`/api/pricing/resend-pay-link/${id}`, formdata)
    .then((res) => res.data)
    .catch((err) => err.message);
};
///upload_payment_details/:_id

export const activatePayment = (
  payment_mode: string,
  payment_status: boolean,
  image: Blob,

  id: string
): Promise<Object> => {
  const formdata = new FormData();
  formdata.append("payment_mode", payment_mode);
  formdata.append("image", image);
  //@ts-ignore
  formdata.append("payment_status", payment_status);

  return axios
    .patch<paymentdetailsType>(
      `/api/pricing/upload_payment_details/${id}`,
      formdata
    )
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSubscription = () =>
  axios.get<any>("/api/pricing/get_subscribe");
export const getInvoice = () => axios.get<any>("/api/user/get_invoice");

export const deleteSubscription = (id: string) => {
  return axios
    .delete<categorydeleteType>(`/api/pricing/delete_subscription/${id}`)
    .then((response: any) => response.data);
};

//<<<<<<<<<<<================================>>>>end Pricing <<<<===========================>>>>>>>>>>>>>>>
