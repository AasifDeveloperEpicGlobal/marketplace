import React, { useEffect, useMemo, useState } from "react";

import { AxiosError } from "axios";
import editSlice from "context/editslice";
import { usePublicProduct, useUpdateMerchantProduct } from "networkAPI/queries";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";

import delay from "utils/delay";

type E = React.ChangeEvent<HTMLInputElement>;

const useEdit = () => {
  // GLOBAL STATE
  const _user = (state: RootState) => state.user;
  const { user, isAuthenticated } = useAppSelector(_user);
  const router = useRouter();
  const _Id = router.query.id;

  const { error, data, mutate } = useUpdateMerchantProduct();
  const { data: ShowData, refetch } = usePublicProduct();

  // CHECKING USER
  useEffect(() => {
    // if (isAuthenticated) {
    //   if (user.role === "Admin") {
    //     return;
    //   }
    // } else {
    //   router.push(`/`);
    // }
  }, [user, isAuthenticated, router]);

  const {
    actions: { inputField },
    initialState,
    reducer,
  } = editSlice;
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const previousData = React.useMemo(() => {
    return ShowData?.data.find((updateData: any) => updateData._id === _Id);
  }, [ShowData, _Id]);

  // INITIALIZE VALUES
  React.useEffect(() => {
    dispatch(inputField("name", previousData?.product_name));
    dispatch(inputField("category", previousData?.category));
    dispatch(inputField("subCategory", previousData?.sub_category));
    dispatch(inputField("brand", previousData?.brand));
    dispatch(inputField("price", previousData?.price));
    dispatch(inputField("quantity", previousData?.brand));
    dispatch(
      inputField("productDescription", previousData?.product_description)
    );
    dispatch(
      inputField("productSpecification", previousData?.product_Specification)
    );
    dispatch(
      inputField(
        "additionalSpecification",
        previousData?.additionalSpecification
      )
    );
    dispatch(inputField("capacity", previousData?.capacity));
    dispatch(inputField("productCode", previousData?.product_code));
    dispatch(inputField("deliveryTime", previousData?.delivery_time));
    dispatch(inputField("madeIn", previousData?.made_in));
    dispatch(inputField("source_type", previousData?.source_type));
    dispatch(inputField("source", previousData?.source));
    dispatch(inputField("modelNumber", previousData?.model_no));
    dispatch(inputField("product_image", previousData?.product_image));

    dispatch(inputField("product_image1", previousData?.product_image1));
    dispatch(inputField("product_image2", previousData?.product_image2));
    dispatch(inputField("product_image3", previousData?.product_image3));
    dispatch(inputField("product_image4", previousData?.product_image4));
    dispatch(inputField("product_image5", previousData?.product_image5));

    // dispatch(inputField("image", previousData?.image));
    // dispatch(inputField('productCode', previousData?.brand));
    // dispatch(inputField('deliveryTime', previousData?.brand));
  }, [
    inputField,
    previousData?.brand,
    previousData?.capacity,
    previousData?.category,
    previousData?.sub_category,
    previousData?.model_no,
    previousData?.price,
    previousData?.product_Specification,
    previousData?.product_description,
    previousData?.additionalSpecification,
    previousData?.product_name,
    previousData?.product_code,
    previousData?.delivery_time,
    previousData?.made_in,
    previousData?.source,
    previousData?.source_type,
    previousData?.product_image,
    previousData?.product_image1,
    previousData?.product_image2,
    previousData?.product_image3,
    previousData?.product_image4,
    previousData?.product_image5,
  ]);

  const [additionalSpecification, setAdditionalSpecification] = useState<any>([
    {
      atribute: "",
      Values: "",
    },
  ]);

  useEffect(() => {
    if (previousData?.additionalSpecification?.length > 0) {
      setAdditionalSpecification(previousData.additionalSpecification);
    }
  }, [previousData]);

  const handleInputChange = (e: any, index: any) => {
    e.preventDefault();

    const { name, value } = e.target;
    const list = [...additionalSpecification];
    list[index][name] = value;
    setAdditionalSpecification(list);
  };

  const handleRemoveClick = (e: any, index: any) => {
    e.preventDefault();
    const list = [...additionalSpecification];
    list.splice(index, 1);
    setAdditionalSpecification(list);
  };

  const handleAddClick = (e: any) => {
    e.preventDefault();
    setAdditionalSpecification([
      ...additionalSpecification,
      { atribute: "", Values: "" },
    ]);
  };

  const handleUpdateProduct = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isConfirm = window.confirm("Are you sure to update this product");
      if (isConfirm) {
        mutate(
          {
            product_name: state.name,
            // TypesOf_Bussiness: state.typesOfBussiness,
            manufacturer_phone_no: state.manufacturerPhone,
            manufacturer_address: state.manufacturerAddress,
            brand: state.brand,
            product_image1: state.image[0] as any,
            product_image2: state.image1[0] as any,
            product_image3: state.image2[0] as any,
            product_image4: state.image3[0] as any,
            product_image5: state.image4[0] as any,
            category: state.category,
            sub_category: state.subCategory,
            price: state.price,
            additionalSpecification: additionalSpecification,
            product_Specification: state.productSpecification,
            product_description: state.productDescription,
            capacity: state.capacity,
            product_code: state.productCode,
            delivery_time: state.deliveryTime,
            made_in: state.madeIn,
            source: state.source,
            source_type: state.source_type,
            model_no: state.modelNumber,
            id: _Id as string,
            // LATER
            // Vendor_Id: "",
            auther_Id: "",
            // vendors_name: "",
            isApproved: false,
            videos: "",
          },
          {
            onSuccess: () => {
              toast.success("your data has been updated  Successfully");
              // router.push("/onboarding/dashboard/product/all-product");
              delay(1000);
              refetch();
            },
          }
        );
      }
    },
    [
      additionalSpecification,
      _Id,
      mutate,
      refetch,
      // state.additionalSpecification,
      state.brand,
      state.capacity,
      state.productCode,
      state.deliveryTime,
      state.madeIn,
      state.source,
      state.source_type,
      state.category,
      state.image,
      state.image1,
      state.image2,
      state.image3,
      state.image4,
      state.manufacturerAddress,
      state.manufacturerPhone,
      state.modelNumber,
      state.name,
      state.price,
      state.productDescription,
      state.productSpecification,
      state.subCategory,
      // state.typesOfBussiness,
    ]
  );

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [error, data, router, refetch]);

  const onChangeTextField = React.useCallback(
    (event: E) => {
      const limit = 5000;
      dispatch(inputField(event.target.name, event.target.value));
    },
    [inputField]
  );
  const onChangeImage = React.useCallback(
    (event: E) => {
      if (event.target) {
        const file = event.target.files;
        if (file) {
          // const objectURL = URL.createObjectURL(file[0])
         
          dispatch(inputField(event.target.name, file));
        }
      }
    },
    [inputField]
  );

  return {
    state,
    onChangeTextField,
    additionalSpecification,
    handleInputChange,
    handleRemoveClick,
    handleAddClick,
    handleUpdateProduct,
    onChangeImage,
    currentProduct: previousData,
  };
};
export default useEdit;

const dummy = {
  isApproved: false,
  _id: "62d79a5608372452c74bbe69",
  Vendor_Id: "dddddddddddds32",
  auther_Id: "62cd47c5a29f6fece41d354e",
  vendors_name: "Sahil mishra",
  TypesOf_Bussiness: "Retailer",
  SubTypeOf_bussiness: "dfdsf",
  Merchant_Address: "sdf",
  product_name: "NEERAJ KUMAR",
  manufacturer_phone_no: "undefined",
  manufacturer_address: "undefined",
  brand: "undefined",
  product_image: [],
  category: "Chemical & Detergent ",
  sub_category: "undefined",
  product_image1: [],
  product_image2: [],
  product_image3: [],
  product_image4: [],
  product_image5: [],
  price: "undefined",
  product_Specification: "undefined",
  additionalSpecification: [
    {
      atribute: "",
      Values: "",
    },
  ],
  product_description: "undefined",
  capacity: "undefined",
  model_no: "undefined",
  isDeclined: false,
  createdAt: "2022-07-20T06:01:58.536Z",
  updatedAt: "2022-07-21T15:00:39.360Z",
  __v: 0,
};
