import { type } from "os";
import { string } from "yup";

export interface Authentication {
  token: string;
}
export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  mobile_no: string;
  password: string;
  role: string;
};

export type UserDetail = {
  Merchant_Name: string;

  Merchant_Address: string;
  TypesOf_Bussiness: string;

  SubTypeOf_bussiness: string;
  Merchant_Designation: string;
  Merchant_City: string;
  Merchant_ServiceArea_Pincodes: string;
  Year_of_establishment: string;
  GST_No: string;
  PAN_No: string;
};

export type UserDetailType = {
  Merchant_Name: string;

  Merchant_Address: string;
  TypesOf_Bussiness: string;

  SubTypeOf_bussiness: string;
  Merchant_Designation: string;
  Merchant_City: string;
  Merchant_ServiceArea_Pincodes: string;
  Year_of_establishment: string;
  GST_No: string;
  PAN_No: string;
  _id:string;
};
export type UpdateServices={
  isUpload:boolean,
  
  _id:string 
}

export type UpdateEmailServiceType={
  isEmail:boolean,
  
  _id:string
 
  
}
export type UpdateCallServiceType={
  isCall:boolean,
  
  _id:string
 }
 export type UpdateLeadServiceType={
  isLead:boolean,
  
  _id:string
 }

export type userProfile = {
  company_Name: string;
  description: string;
};

export type UserProduct = {

  product_name: string;

  manufacturer_phone_no: string;
  manufacturer_address: string;
  brand: string;
  additionalSpecification: any;
  isApproved: boolean;

  product_image1: Blob;
  product_image2: Blob;
  product_image3: Blob;
  product_image4: Blob;
  product_image5: Blob;
  category: string;
  sub_category: string;
  price: string;
  product_Specification: string;
  product_description: string;
  capacity: string;
  product_code: string;
  delivery_time: string;
  made_in: string;
  model_no: string;
  source: string;
  source_type: string;
  image_source: Blob;
  image_source_url: string;
  image_source_image: Blob;
  image_source_pdf: Blob;
  image_source_other: string;
  videos: string;
};

export type UserProductType = {
  // Vendor_Id: string;
  auther_Id: string;
  // vendors_name: string;

  product_name: string;
  // TypesOf_Bussiness: string;
  manufacturer_phone_no: string;
  manufacturer_address: string;
  brand: string;
  additionalSpecification: Blob;
  isApproved: boolean;

  product_image1: Blob;
  product_image2: Blob;
  product_image3: Blob;
  product_image4: Blob;
  product_image5: Blob;
  category: string;
  sub_category: string;
  price: string;
  product_Specification: string;
  product_description: string;
  capacity: string;
  product_code: string;
  delivery_time: string;
  made_in: string;
  source: string;
  source_type: string;
  model_no: string;
  videos: string;
  id: string;
};
export type userProductForUpdate = {
  isApproved: boolean;
  id: string;
};

export type userProductForDeclined = {
  isDeclined: boolean;
  status: String;

  id: string;
};

export type productCategory = {
  category_name: string;
  category_image: Blob;
};
export type updateCategoryType = {
  category_name: string;
  category_image: Blob;
  id: string;
};
export type hideShowCategoryType = {
  id: string;
  isHide: boolean;
};
export type categorydeleteType = {
  id: string;
};
export type productSubCategory = {
  category_Id: string;
  category_name: string;

  sub_category_name: string;
  sub_category_image: Blob;
};

export type additionalSpecification = {
  atribute: string;
  Values: string;
};

export type productUpdateSubCategoryType = {
  // category_Id: string;
  // category_name: string;

  sub_category_name: string;
  sub_category_image: Blob;
  id: string;
};
export type hideShowSubCategoryType = {
  id: string;
  isHide: boolean;
};

export type bannerImages = {
  banner_name: string;
  type: string;
  product: string;

  banner_image1: Blob;
  banner_image2: Blob;
  banner_image3: Blob;
  banner_image4: Blob;
  banner_image5: Blob;
};
export type bannerImagesUpdate = {
  id: string;
  product: string;
  banner_image1: Blob;
  banner_image2: Blob;
  banner_image3: Blob;
  banner_image4: Blob;
  banner_image5: Blob;
};

export type CustomerQueryType = {
  merchant_Id: string;
  product_Id: string;

  product_name: string;
  buyer_Email: string;
  buyer_Mob: string;
  buyer_Message: string;
  type: string;
};

export type CustomerQueryUpdateType = {
  id: string;
  isCompleted: boolean;
};
export type UserDeactivate = {
  id: string;
  isActive: boolean;
};
export type CustomerQueryUpdateType2 = {
  id: string;

  isDeclined: boolean;
};
// book demo=============

export type BookDemoType = {
  merchant_Id: string;
  name: string;
  email: string;
  mobile: string;
  business_name: string;
  process: string;
  date: string;
  type: string;
};

export type bulkEnquiryType = {
  merchant_Id: string;
  name: string;
  email: string;
  mobile: string;
  business_name: string;
  product_category: string;
  comment: string;

  date: string;
  type: string;
};

export type suppliersEnquiryType = {
  mobile: string;
};

export type updateSuppliersEnquiryType = {
  email: string;
  business_name: string;
  id: string;
};

//=================Start Banner Section ====================
export type AddTeaserBannerType = {
  merchant_id: string;
  merchant_name: string;

  banner_image: Blob;
  type: string;
};
export type UpdateTeaserBannerType = {
  merchant_id: string;
  merchant_name: string;

  banner_image: Blob;
  // type: string;
  id: string;
};

export type AddCategoryBannerType = {
  category_id: string;
  category_name: string;

  banner_image: Blob;
  type: string;
};
export type UpdateCategoryBannerType = {
  category_id: string;
  category_name: string;

  banner_image: Blob;
  // type: string;
  id: string;
};

export type AddDiscountBannerType = {
  product_id: string;
  product_name: string;

  banner_image: Blob;
  type: string;
};
export type UpdateDiscountBannerType = {
  product_id: string;
  product_name: string;

  banner_image: Blob;
  // type: string;
  id: string;
};
export type AddBannerType = {
  banner_name: string;
  product_id: string;
  merchant_id: string;
  category_id: string;

  banner_image: Blob;
  type: string;
};
export type UpdateBannerType = {
  id: string;
  banner_name: string;
  product_id: string;
  merchant_id: string;
  category_id: string;

  banner_image: Blob;
  type: string;
};

//=================End Banner Section ====================

// Blog Type
export type AddBlogsType = {
  blog_heading: string;
  blog_paragraph: string;
  blog_image: string;
};
export type UpdateBlogsType = {
  id: string;
  blog_heading: string;
  blog_paragraph: string;
  blog_image: string;
};

// ======== Pricing=======================>>>>>>>>>>>

export type addMRPType = {
  price: string;
  unit: string;
};

export type updateMRPType = {
  price: string;
  unit: string;
  type: string;
  id: string;
};

export type addServiceType = {
  name: string;
  mrp_id: string;
  rate: string;
  unit: string;
  quantity: string;
  price: string;
  benifits: string;
  type: string;
};

export type updateServiceType = {
  name: string;
  mrp_id: string;
  rate: string;
  unit: string;
  quantity: string;
  price: string;
  benifits: string;
  type: string;
  id: string;
};

export type addPackageType = {
  name: string;
  Services: any;
  price: string;
  benifits: string;
  // validity:string;
  // gst:string;
  Amount: string;
  type: string;
};

export type updatePackageType = {
  name: string;
  Services: any;
  price: string;
  benifits: string;
  validity: string;
  gst: string;
  Amount: string;
  type: string;
  id: string;
};

// Subscription =====================
export type addSubscriptionType = {
  auther_Id: string;
  mobile_no: string;
  vendors_name: string;
  email: string;
  GST_No: string;
  address: string;
  name: string;
  plan: string;
  plan2: string;
  payment_mode: string;
  start_date: string;
  end_date: string;
  price: string;
  benifits: string;
  validity: string;
  gst: string;
  total: string;
  Amount: string;
  payment_status: boolean;
  payment_link: string;
};

export type updateSubscriptionType = {
  auther_Id: string;
  mobile_no: string;
  vendors_name: string;

  email: string;
  GST_No: string;
  address: string;
  name: string;
  plan: string;
  plan2: string;
  payment_mode: string;
  start_date: string;
  end_date: string;
  price: string;
  benifits: string;
  validity: string;
  gst: string;
  total: string;
  Amount: string;
  id: string;
};

export type updatepayLinkType = {
  payment_link: string;

  id: string;
};

export type addPaymentType = {
  email: string;
  mobile_no: string;
  name: string;
  link_id: string;
  Amount: string;
  purpose: string;

  payment_link: string;
};

export type paymentdetailsType = {
  payment_mode: string;
  payment_status: boolean;
  image: Blob;

  id: string;
};

// ========end  Pricing=======================>>>>>>>>>>>
