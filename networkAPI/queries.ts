import { type } from "os";
import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
} from "react-query";

import {
  AddBanner,
  AddBlogs,
  AddCategoryBanner,
  AddDiscountBanner,
  addPackage,
  addService,
  addSubscription,
  AddTeaserBanner,
  bannersImages,
  Category,
  companyProfle,
  CustomerQuery,
  CustomerQueryUpdate,
  CustomerQueryUpdate1,
  DeactivateUser,
  deleteCategory,
  deleteSubCategory,
  getApprovalProduct,
  getApprovalProductCount,
  getApprovedProductSearch,
  getBannerImages,
  getBrand,
  getBussinessDetails,
  getbussinessDetaisById,
  getBuyerLeadsCount,
  getBuyerQuery,
  getCategory,
  getCategoryBanner,
  getCategoryBySearch,
  getCategoryForUploadProduct,
  getCityBySearch,
  getCompnyProfile,
  getDiscountBanner,
  getHomeCategory,
  getMerchantById,
  getMerchantCredentials,
  getMerchantDetails,
  getNotification,
  getPackage,
  getUserDetails,
  getPostionCat,
  getProductById,
  getProductBySearch,
  getProductFilterByDate,
  getProductForApproval,
  getProducts,
  getProductsBycategory,
  getProductsforApproved,
  getProductWithPaginate,
  getPublicProduct,
  getPublishedProduct,
  getService,
  getSubCategory,
  getSubCategoryByCat,
  getSubCategoryForUploadProduct,
  getSubCategoryLazy,
  getSubscription,
  getTeaser,
  getUserById,
  getUserBySearch,
  getUserDetailsById,
  getwaitApprovalSearch,
  getWaitingProductFilterByDate,
  hideShowCategory,
  hideShowSubCategory,
  login,
  register,
  sellProduct,
  sendEmail,
  subCategory,
  updateBanner,
  updateBannerImage,
  updateBlogs,
  updateCategory,
  updateCategoryBanner,
  updateDeclineProduct,
  updateDiscountBanner,
  updatePackage,
  updateProduct,
  updateSellerProduct,
  updateService,
  updatesubCategory,
  updateSubscription,
  updateTeaserBanner,
  UserDetails,
  getUserLogOut,
  addMRPRate,
  updateMRPRate,
  getMRPRate,
  deleteMrpRate,
  deleteService,
  deletePackage,
  deleteSubscription,
  activatePayment,
  sendSms,
  getBuyerQueryFor,
  getInvoice,
  sendSmsForPayment,
  SendEmailForContactEnquary,
  bookDemo,
  getbookDemo,
  bulksEnquiry,
  forgotpassword,
  resendPayLink,
  getProductBy_Id,
  PayMentLink,
  getProductByMerchant,
  getProductsByCategory,
  SuppliersEnquiry,
  updateSuppliersEnquiry,
  getsuppliers,
  sendSmsForSubscribed,
  getcallingApi,
  getUserService,
  getUpdateServices,
  getUpdateCallServices,
  getUpdateEmailServices,
  getUpdateLeadServices,
  UpdateUserDetails,
} from "./api";
import {
  AddBannerType,
  AddBlogsType,
  AddCategoryBannerType,
  AddDiscountBannerType,
  addMRPType,
  addPackageType,
  addPaymentType,
  addServiceType,
  addSubscriptionType,
  AddTeaserBannerType,
  bannerImages,
  bannerImagesUpdate,
  BookDemoType,
  bulkEnquiryType,
  categorydeleteType,
  CustomerQueryType,
  CustomerQueryUpdateType,
  CustomerQueryUpdateType2,
  hideShowCategoryType,
  Login,
  paymentdetailsType,
  productCategory,
  productSubCategory,
  productUpdateSubCategoryType,
  Register,
  suppliersEnquiryType,
  UpdateBannerType,
  UpdateBlogsType,
  UpdateCallServiceType,
  UpdateCategoryBannerType,
  updateCategoryType,
  UpdateDiscountBannerType,
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
  UserDetailType,
  UserProduct,
  userProductForDeclined,
  userProductForUpdate,
  UserProductType,
  userProfile,
} from "./types";

export const useLogin = () =>
  useMutation(
    ({ email, password }: Login): Promise<Object> => login(email, password)
  );

export const useRegister = () =>
  useMutation(
    ({ email, mobile_no, password, role }: Register) =>
      register(email, mobile_no, password, role)
  );

export const useForgotPassword = () =>
  useMutation(
    ({ email, password }: Login): Promise<object> =>
      forgotpassword(email, password)
  );
  export const useUserDetails = () =>
  useMutation(
    ({
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
    }: UserDetail): Promise<Object> =>
      UserDetails(
        Merchant_Name,
        SubTypeOf_bussiness,
        TypesOf_Bussiness,
        Merchant_ServiceArea_Pincodes,
        Merchant_Designation,
        Merchant_City,
        Merchant_Address,
        Year_of_establishment,
        GST_No,
        PAN_No
      )
  );

export const useUpdateUserDetails = () =>
  useMutation(
    ({
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
      _id
    }: UserDetailType): Promise<Object> =>
    UpdateUserDetails(
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
        _id
      )
  );

  export const useUpdateServices = () =>
  useMutation(
    ({
    isUpload,
   _id
   }: UpdateServices): Promise<Object> =>
    getUpdateServices(
     isUpload,
      _id
     
      )
  );

  // activate Call Services
  export const useUpdateCallServices = () =>
  useMutation(
    ({
    
    isCall,
   
    _id
  
    }: UpdateCallServiceType): Promise<Object> =>
    getUpdateCallServices(
     
      isCall,
      
      _id
     
      )
  );

    // activate Email Services
    export const useUpdateEmailServices = () =>
    useMutation(
      ({
      
      isEmail,
     
      _id
    
      }: UpdateEmailServiceType): Promise<Object> =>
      getUpdateEmailServices(
       
        isEmail,
        
        _id
       
        )
    );

// activate Leads Services
export const useUpdateLeadServices = () =>
    useMutation(
      ({
      
      isLead,
     
      _id
    
      }: UpdateLeadServiceType): Promise<Object> =>
      getUpdateLeadServices(
       
        isLead,
        
        _id
       
        )
    );

export const useCompanyProfile = () =>
  useMutation(
    ({ company_Name, description }: userProfile): Promise<Object> =>
      companyProfle(company_Name, description)
  );

// eslint-disable-next-line react-hooks/rules-of-hooks
export const userProduct = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useMutation(
    ({
      // Vendor_Id,
      // auther_Id,
      // vendors_name,
      product_name,
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
      product_Specification,
      additionalSpecification,
      product_description,
      capacity,
      product_code,
      delivery_time,
      made_in,
      source,
      source_type,
      model_no,
      videos,
      image_source,
      image_source_url,
      image_source_image,
      image_source_pdf,
      image_source_other,
    }: UserProduct): Promise<Object> =>
      sellProduct(
        // Vendor_Id,
        // auther_Id,
        // vendors_name,
        product_name,
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
        product_Specification,
        additionalSpecification,
        product_description,
        capacity,
        product_code,
        delivery_time,
        made_in,
        source,
        source_type,

        model_no,
        videos,
        image_source,
        image_source_url,
        image_source_image,
        image_source_pdf,
        image_source_other
      )
  );
// for Update Product By Merchant
export const useUpdateMerchantProduct = () =>
  useMutation(
    ({
      // Vendor_Id,
      auther_Id,
      // vendors_name,
      product_name,
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
      product_Specification,
      additionalSpecification,
      product_description,
      capacity,
      product_code,
      delivery_time,
      made_in,
      source,
      source_type,

      model_no,
      videos,
      id,
    }: UserProductType): Promise<Object> =>
      updateSellerProduct(
        // Vendor_Id,
        auther_Id,
        // vendors_name,
        product_name,
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
        product_Specification,
        additionalSpecification,
        product_description,
        capacity,
        product_code,
        delivery_time,
        made_in,
        source,
        source_type,

        model_no,
        videos,
        id
      )
  );
//======= for Deactivate Users
export const useDeactivateUser = () =>
  useMutation(
    ({ isActive, id }: UserDeactivate): Promise<Object> =>
      DeactivateUser(isActive, id)
  );
/// for Product Approval
export const useApprovedProduct = () =>
  useMutation(
    ({ isApproved, id }: userProductForUpdate): Promise<Object> =>
      updateProduct(isApproved, id)
  );

export const useDeclinedProduct = () =>
  useMutation(
    ({ isDeclined, status, id }: userProductForDeclined): Promise<Object> =>
      updateDeclineProduct(isDeclined, status, id)
  );

export const useCategory = () =>
  useMutation(
    ({ category_name, category_image }: productCategory): Promise<Object> =>
      Category(category_name, category_image)
  );

export const useUpdateCategory = () =>
  useMutation(
    ({
      category_name,
      category_image,
      id,
    }: updateCategoryType): Promise<Object> =>
      updateCategory(category_name, category_image, id)
  );
export const useHideShowCategory = () =>
  useMutation(
    ({ id, isHide }: hideShowCategoryType): Promise<object> =>
      hideShowCategory(id, isHide)
  );

export const useDeleteCategory = () =>
  useMutation(
    ({ id }: categorydeleteType): Promise<object> => deleteCategory(id)
  );

export const useDeleteSubCategory = () =>
  useMutation(
    ({ id }: categorydeleteType): Promise<object> => deleteSubCategory(id)
  );

// SubCategory ============================
export const useSubCategory = () =>
  useMutation(
    ({
      category_Id,
      category_name,

      sub_category_name,
      sub_category_image,
    }: productSubCategory): Promise<Object> =>
      subCategory(
        category_Id,
        category_name,

        sub_category_name,
        sub_category_image
      )
  );

export const useUpdateSubCategory = () =>
  useMutation(
    ({
      // category_Id,
      // category_name,

      sub_category_name,
      sub_category_image,
      id,
    }: productUpdateSubCategoryType): Promise<Object> =>
      updatesubCategory(
        // category_Id,
        // category_name,
        sub_category_name,
        sub_category_image,
        id
      )
  );

export const useHideShowSubCategory = () =>
  useMutation(
    ({ id, isHide }: hideShowCategoryType): Promise<object> =>
      hideShowSubCategory(id, isHide)
  );

export const useBanner = () =>
  useMutation(
    ({
      banner_name,
      product,
      type,
      banner_image1,
      banner_image2,
      banner_image3,
      banner_image4,
      banner_image5,
    }: bannerImages): Promise<Object> =>
      bannersImages(
        banner_name,
        product,
        type,
        banner_image1,
        banner_image2,
        banner_image3,
        banner_image4,
        banner_image5
      )
  );

export const useUpdateBanner = () =>
  useMutation(
    ({
      banner_image1,
      banner_image2,
      product,
      banner_image3,
      banner_image4,
      banner_image5,
      id,
    }: bannerImagesUpdate): Promise<Object> =>
      updateBannerImage(
        product,
        banner_image1,
        banner_image2,

        banner_image3,
        banner_image4,
        banner_image5,
        id
      )
  );

//  customer Query

export const useCustomerQuery = () =>
  useMutation(
    ({
      merchant_Id,
      product_Id,
      product_name,
      buyer_Message,
      buyer_Email,
      buyer_Mob,
      type,
    }: CustomerQueryType): Promise<Object> =>
      CustomerQuery(
        merchant_Id,
        product_Id,
        product_name,
        buyer_Message,
        buyer_Email,
        buyer_Mob,
        type
      )
  );

export const useCustomerQueryCompleted = () =>
  useMutation(
    ({
      isCompleted,

      id,
    }: CustomerQueryUpdateType): Promise<Object> =>
      CustomerQueryUpdate(isCompleted, id)
  );

export const useCustomerQueryDeclined = () =>
  useMutation(
    ({ isDeclined, id }: CustomerQueryUpdateType2): Promise<Object> =>
      CustomerQueryUpdate1(isDeclined, id)
  );

  /// /callingApi

  export const useCallingApi =()=>useMutation(({Agent_Mob_No,buyer_Mob}:any)=>getcallingApi(Agent_Mob_No,buyer_Mob))

// Book Demoo ====================

export const useBookDemo = () =>
  useMutation(
    ({
      merchant_Id,
      name,
      email,
      mobile,
      business_name,
      process,
      date,
      type,
    }: BookDemoType): Promise<Object> =>
      bookDemo(
        merchant_Id,
        name,
        email,
        mobile,
        business_name,
        process,
        date,
        type
      )
  );

export const useBulkEnquiry = () =>
  useMutation(
    ({
      merchant_Id,
      name,
      email,
      mobile,
      business_name,
      product_category,
      comment,
      date,
      type,
    }: bulkEnquiryType): Promise<Object> =>
      bulksEnquiry(
        merchant_Id,
        name,
        email,
        mobile,
        business_name,
        product_category,
        comment,
        date,
        type
      )
  );

export const useSuppliersEnquiry = () =>
  useMutation(
    ({ mobile }: suppliersEnquiryType): Promise<Object> =>
      SuppliersEnquiry(mobile)
  );
export const useUpdateSupplierEnquiry = () =>
  useMutation(
    ({
      email,
      business_name,
      id,
    }: updateSuppliersEnquiryType): Promise<Object> =>
      updateSuppliersEnquiry(email, business_name,id)
  );

export const useGetDemoData = () => useQuery("getdemo", getbookDemo);
export const useGetSuppliers =()=>useQuery("suppliers",getsuppliers)

export const useBuyerQuery = () => useQuery("buyerQuery", getBuyerQuery);
export const useBuyerQuerySuperAdmin = () =>
  useQuery("buyerQuery1", getBuyerQueryFor);
export const useBuyerQueryCount = () => useQuery("leads", getBuyerLeadsCount);
export const useApprovedProductCount = () =>
  useQuery("approvedcount", getApprovalProductCount);

export const useProductForApprovals = () =>
  useQuery("getProductForApproval", getProductForApproval);
export const useProductsByCategory = (category: string) =>
  useQuery(["products", category], () => getProductsBycategory(category));

export const useUserById = (id: string) =>
  useQuery(["userbyId", id], () => getUserById(id));

export const useMerchantByID = (id: string) =>
  useQuery(["merchantbyId", id], () => getMerchantById(id));
export const useProducts = () => useQuery("products", getProducts);
export const useWaitingProduct = () =>
  useQuery("waitingsProducts", getProductsforApproved);
export const useGetCompanyProfile = () =>
  useQuery("companyprofile", getCompnyProfile);
export const useGetBussinessDetails = () =>
  useQuery("getBussinessDetails", getBussinessDetails);
export const useGetMerchantDetails = () =>
  useQuery("getUser", getMerchantCredentials);

export const useUserLogOut = () => useMutation(() => getUserLogOut());
export const useGetMerchantDetailsData = (pageParams: any) =>
  useQuery(["getUsers", pageParams], () => getMerchantDetails(pageParams), {
    staleTime: 10000,
  });

export const useGetProductWithPaginate = (pageParams: any) =>
  useQuery(
    ["getProducts", pageParams],
    () => getProductWithPaginate(pageParams),
    {
      staleTime: 10000,
    }
  );
export const usePublicProduct = () => useQuery("product", getPublicProduct);
export const usePublishedProduct = () =>
  useQuery("publish", getPublishedProduct);

export const useGetFilterProductByDate = (key: string) =>
  useQuery(
    ["getFilterProductBydate", key],
    (): Promise<any> => getProductFilterByDate(key)
  );

export const useGetWatingProductByDate = (key: string) =>
  useQuery(
    ["getwatingProductBydate", key],
    (): Promise<any> => getWaitingProductFilterByDate(key)
  );
export const useGetUserServices = () =>
  useQuery("useServices" , getUserService
  );

export const useProductForApproval = () =>
  useQuery("product", getApprovalProduct, { staleTime: 10000 });

export const useGetCategory = () => useQuery("category", getCategory);
export const useGetCategoryForUploadProduct = () =>
  useQuery("getCategoryForUploadProduct", getCategoryForUploadProduct);
export const useGetBrand = () => useQuery("brand", getBrand);
export const useGetSubCategory = () => useQuery("subcategory", getSubCategory);
export const useNotification = () =>
  useQuery("getNotification", getNotification);

export const useGetSubCategoryLazy = () =>
  useInfiniteQuery(
    "subcategoryy",
    ({ pageParam = 1 }) => getSubCategoryLazy(pageParam),
    {
      getNextPageParam: (lastPage: any) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
      staleTime: 10000,
      enabled: false,
    }
  );

export const useSubCatByCategory = (category_name: string) =>
  useQuery(["subcatbycat", category_name], () =>
    getSubCategoryByCat(category_name)
  );
export const useGetSubCategoryForUploadProduct = () =>
  useQuery("getSubCategoryForUploadProduct", getSubCategoryForUploadProduct);
export const useGetHomeCategory = () =>
  useQuery("homecategory", getHomeCategory);
export const useGetPostionCategory = () =>
  useQuery("postioncat", getPostionCat);
export const useGetProductById = (id: string) =>
  useQuery("myself", (): Promise<any> => getProductById(id));
export const useGetProductBy_id = (id: string) =>
  useQuery(["getsingleproduct", id], () => getProductBy_Id(id));

export const useGetBussinessById = (id: string) =>
  useQuery("myself1", (): Promise<any> => getbussinessDetaisById(id));

export const useGetUserDetails = () =>
  useQuery("userdetailsss", (): Promise<any> => getUserDetailsById());

export const useGetUserDetail = () =>
  useQuery("userdetails1", (): Promise<any> => getUserDetails());

export const useGetUserBySearch = (key: string) =>
  useQuery(["usersss", key], (): Promise<any> => getUserBySearch(key));

export const useGetProductsByCategory = (category: string) =>
  useQuery(
    ["getProductsByCategory", category],
    (): Promise<any> => getProductsByCategory(category)
  );

export const useGetProductByMerchant = (user: string) =>
  useQuery(
    ["productByMerchant", user],
    (): Promise<any> => getProductByMerchant(user)
  );

export const useGetCityBySearch = (key: string) =>
  useQuery(["city-search", key], (): Promise<any> => getCityBySearch(key));

export const useGetCategoryBySearch = (key: string) =>
  useQuery(
    ["searchcategory", key],
    (): Promise<any> => getCategoryBySearch(key)
  );

export const useGetProductBySearch = (key: string) =>
  useQuery(
    ["productBySearch", key],
    (): Promise<any> => getProductBySearch(key)
  );

// for superAdmin
export const useGetApprovedProductBySearch = (key: string) =>
  useQuery(
    ["__approvedBySearch", key],
    (): Promise<any> => getApprovedProductSearch(key)
  );
export const useGetwaitingProductSearch = (key: string) =>
  useQuery(
    ["__waitBySearch", key],
    (): Promise<any> => getwaitApprovalSearch(key)
  );

export const useGetBanner = () => useQuery("banner", getBannerImages);

//===================Start Banner Section======================================
export const useAddTeaserBanner = () =>
  useMutation(
    ({
      merchant_id,
      merchant_name,

      banner_image,
      type,
    }: AddTeaserBannerType): Promise<Object> =>
      AddTeaserBanner(
        merchant_id,
        merchant_name,

        banner_image,
        type
      )
  );

export const useUpdateTeaserBanner = () =>
  useMutation(
    ({
      merchant_id,
      merchant_name,

      banner_image,

      id,
    }: UpdateTeaserBannerType): Promise<Object> =>
      updateTeaserBanner(merchant_id, merchant_name, banner_image, id)
  );

export const useAddCategoryBanner = () =>
  useMutation(
    ({
      category_id,
      category_name,

      banner_image,
      type,
    }: AddCategoryBannerType): Promise<Object> =>
      AddCategoryBanner(
        category_id,
        category_name,

        banner_image,
        type
      )
  );

export const useUpdateCategoryBanner = () =>
  useMutation(
    ({
      category_id,
      category_name,

      banner_image,

      id,
    }: UpdateCategoryBannerType): Promise<Object> =>
      updateCategoryBanner(category_id, category_name, banner_image, id)
  );

export const useAddDiscountBanner = () =>
  useMutation(
    ({
      product_id,
      product_name,

      banner_image,
      type,
    }: AddDiscountBannerType): Promise<Object> =>
      AddDiscountBanner(
        product_id,
        product_name,

        banner_image,
        type
      )
  );

export const useUpdateDiscountBanner = () =>
  useMutation(
    ({
      product_id,
      product_name,

      banner_image,

      id,
    }: UpdateDiscountBannerType): Promise<Object> =>
      updateDiscountBanner(product_id, product_name, banner_image, id)
  );
export const useAddBanner = () =>
  useMutation(
    ({
      banner_name,
      product_id,
      merchant_id,
      category_id,
      banner_image,
      type,
    }: AddBannerType): Promise<Object> =>
      AddBanner(
        banner_name,
        product_id,
        merchant_id,
        category_id,
        banner_image,
        type
      )
  );

// export const useUpdateBanners = () =>
//   useMutation(
//     ({
//       banner_name,
//       product_id,
//       merchant_id,
//       category_id,
//       banner_image,
//       type,
//       id,
//     }: UpdateBannerType): Promise<object> =>
//       updateBanner(
//         banner_name,
//         product_id,
//         merchant_id,
//         category_id,
//         banner_image
//         type,
//         id
//       )
//   );

export const useGetTeaserBanner = () => useQuery(["teaser"], getTeaser,{
 cacheTime:0,
 staleTime:0,
});
export const useGetCategoryBanner = () =>useQuery("getCategoryBanner", getCategoryBanner);
export const useGetDiscountBanner = () =>
  useQuery("getDiscountBanner", getDiscountBanner);

//===================End Banner Section========================================
//Blogs
export const useAddBlogs = () =>
  useMutation(
    ({
      blog_heading,
      blog_paragraph,
      blog_image,
    }: AddBlogsType): Promise<object> =>
      AddBlogs(blog_heading, blog_paragraph, blog_image)
  );

export const useUpdateBlogs = () =>
  useMutation(
    ({
      blog_heading,
      blog_paragraph,
      blog_image,
      id,
    }: UpdateBlogsType): Promise<object> =>
      updateBlogs(blog_heading, blog_paragraph, blog_image, id)
  );

// ========================================= Pricing  =============================>>>>>>>
// pricing data=======================>>
export const useAddMRPRate = () =>
  useMutation(
    ({ price, unit }: addMRPType): Promise<object> => addMRPRate(price, unit)
  );
export const useUpdateAddMRPRate = () =>
  useMutation(
    ({ price, unit, id }: updateMRPType): Promise<object> =>
      updateMRPRate(price, unit, id)
  );

export const useGetMRPRate = () => useQuery("mrp-rate", getMRPRate);
export const useDeleteRate = () =>
  useMutation(
    ({ id }: categorydeleteType): Promise<object> => deleteMrpRate(id)
  );
//============>end Pricing

export const useAddService = () =>
  useMutation(
    ({
      name,
      mrp_id,
      rate,
      unit,
      quantity,
      price,
      benifits,
      type,
    }: addServiceType): Promise<object> =>
      addService(name, mrp_id, rate, unit, quantity, price, benifits, type)
  );
export const useUpdateService = () =>
  useMutation(
    ({
      name,
      mrp_id,
      rate,

      unit,
      quantity,
      price,
      benifits,
      type,
      id,
    }: updateServiceType): Promise<object> =>
      updateService(
        name,
        mrp_id,
        rate,
        unit,
        quantity,
        price,
        benifits,
        type,
        id
      )
  );

export const useGetService = () => useQuery("service", getService);
export const useDeleteService = () =>
  useMutation(
    ({ id }: categorydeleteType): Promise<object> => deleteService(id)
  );
//=====
// package==============
export const useAddPackage = () =>
  useMutation(
    ({
      name,
      Services,
      price,
      benifits,

      Amount,
      type,
    }: addPackageType): Promise<object> =>
      addPackage(name, Services, price, benifits, Amount, type)
  );

export const useUpdatePackage = () =>
  useMutation(
    ({
      name,
      Services,
      price,
      benifits,
      validity,
      gst,
      Amount,
      type,
      id,
    }: updatePackageType): Promise<object> =>
      updatePackage(
        name,
        Services,
        price,
        benifits,
        validity,
        gst,
        Amount,
        type,
        id
      )
  );

export const useGetPackage = () => useQuery("package", getPackage);
export const useDeletePackage = () =>
  useMutation(
    ({ id }: categorydeleteType): Promise<object> => deletePackage(id)
  );

//======= package==============
export const useAddSubscription = () =>
  useMutation(
    ({
      auther_Id,
      mobile_no,
      vendors_name,
      email,
      GST_No,
      address,
      name,
      plan,
      plan2,
      payment_mode,
      start_date,
      end_date,
      price,
      benifits,
      validity,
      gst,
      total,
      Amount,
      payment_status,
      payment_link,
    }: addSubscriptionType): Promise<object> =>
      addSubscription(
        auther_Id,
        mobile_no,
        vendors_name,
        email,
        GST_No,
        address,
        name,
        plan,
        plan2,
        payment_mode,
        start_date,
        end_date,
        price,
        benifits,
        validity,
        gst,
        total,
        Amount,
        payment_status,
        payment_link
      )
  );

export const useUpdateSubscription = () =>
  useMutation(
    ({
      auther_Id,
      mobile_no,
      vendors_name,
      email,
      GST_No,
      address,
      name,
      plan,
      plan2,
      payment_mode,
      start_date,
      end_date,
      price,
      benifits,
      validity,
      gst,
      total,
      Amount,
      id,
    }: updateSubscriptionType): Promise<object> =>
      updateSubscription(
        auther_Id,
        mobile_no,
        vendors_name,
        email,
        GST_No,
        address,
        name,
        plan,
        plan2,
        payment_mode,
        start_date,
        end_date,
        price,
        benifits,
        validity,
        gst,
        total,
        Amount,
        id
      )
  );
export const usePayLink = () =>
  useMutation(
    ({
      email,
      mobile_no,
      name,
      link_id,
      Amount,
      purpose,
      payment_link,
    }: addPaymentType): Promise<object> =>
      PayMentLink(
        email,
        mobile_no,
        name,
        link_id,
        Amount,
        purpose,
        payment_link
      )
  );

export const useResendPayLink = () =>
  useMutation(
    ({
      payment_link,

      id,
    }: updatepayLinkType): Promise<object> =>
      resendPayLink(
        payment_link,

        id
      )
  );
export const useUpdatePaymentDetails = () =>
  useMutation(
    ({
      payment_mode,

      payment_status,
      image,
      id,
    }: paymentdetailsType): Promise<object> =>
      activatePayment(
        payment_mode,

        payment_status,
        image,
        id
      )
  );

export const useGetSubscription = () =>
  useQuery("subscription", getSubscription);
export const useGetInvoice = () => useQuery("invoice", getInvoice);

export const useDeleteSubscription = () =>
  useMutation(
    ({ id }: categorydeleteType): Promise<object> => deleteSubscription(id)
  );

// ========================================= end  Pricing  =============================>>>>>>>

export const useSendEmail = () =>
  useMutation(({ merchantId, email, phoneNumber, description }: any) =>
    sendEmail({ merchantId, email, phoneNumber, description })
  );

export const useSendEmailForContact = () =>
  useMutation(
    ({
      name,
      businessName,
      merchantId,
      email,
      phoneNumber,
      description,
    }: any) =>
      SendEmailForContactEnquary({
        name,
        businessName,
        merchantId,
        email,
        phoneNumber,
        description,
      })
  );

export const useSendSms = () =>
  useMutation(({ mobileno, vendors_name, type }: any) =>
    sendSms({ mobileno, vendors_name, type })
  );
export const useSendSmsForPayment = () =>
  useMutation(
    ({ mobileno, vendors_name, invoice_Id, price, refId, type }: any) =>
      sendSmsForPayment({
        mobileno,
        vendors_name,
        invoice_Id,
        price,
        refId,
        type,
      })
  );

  export const useSendSmsSubscibed = () =>
  useMutation(
    ({  mobileno,
      vendors_name,
     
      plan,
      start_date,
      end_date,
      type, }: any) =>
    sendSmsForSubscribed({
      mobileno,
      vendors_name,
     
      plan,
      start_date,
      end_date,
      type,
      })
  );

  export const useSendSmsForRegistration = () =>
  useMutation(
    ({ mobileno, vendors_name,  type }: any) =>
      sendSmsForPayment({
        mobileno,
        vendors_name,
      
        type,
      })
  );

// product filter
// vendor filter
