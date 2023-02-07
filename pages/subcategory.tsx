import Footer from "components/Footer/footer";
import UserLayout from "components/User/Layout";
import {
  useGetBrand,
  useGetCategory,
  useGetHomeCategory,
  useGetProductWithPaginate,
  useProductsByCategory,
  usePublicProduct,
} from "networkAPI/queries";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import styles from "styles/Merchant/subcategory.module.scss";
import React, { useEffect, useRef, useState } from "react";
import SubCategoryItem from "components/Subcategory/SubCategoryItem";
import GridSubcategory from "components/Subcategory/GridSubcategory";
import ReactPaginate from "react-paginate";

import Header from "components/User/Header";
import NewFooter from "./newwfooter";

import { parseCookies } from "nookies";
import { dehydrate, QueryClient } from "react-query";
import BlueListView from "components/svg-icons/bluelistview";
import BlueGridView from "components/svg-icons/bluegridview";

const SubCategory: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPages, setTotalPage] = useState<number>();
  const { data: category, error } = useGetCategory();
  const { data: brand, error: err } = useGetBrand();
  const { data: productWithPaginate } = useGetProductWithPaginate(currentPage);
  const router = useRouter();
  const activeCategory = router.query.id as string;
  const [categoryChecked, setCategoryChecked] = useState<boolean>(false);
  const { data: productData, status: status2 } =
    useProductsByCategory(activeCategory);
  const ProductData = productData;
  const [checkedData, setCheckedData] = useState<any>([]);
  const [checkedBrand, setCheckedBrand] = useState<any>([]);
  const [checkedDataList, setCheckedDataList] = useState<any>([]);

  useEffect(() => {
    setTotalPage(productWithPaginate?.totalPages);
  }, [productWithPaginate]);

  const filterByCategory = () => {};

  const handleFilterCategory = (e: any) => {
    const { name, checked } = e.target;
    const list = checkedData?.map((category: any) =>
      category.category_name == name
        ? { ...category, isChecked: checked }
        : category
    );
    setCheckedData(list);
  };

  const handleFilterBrand = (e: any) => {
    const { name, checked } = e.target;
    const list1 = checkedBrand?.map((brand: any) =>
      brand?.brand == name ? { ...brand, isChecked: checked } : brand
    );
    setCheckedBrand(list1);
  };
  const checkedCategory = checkedData?.find((item: any) => item.isChecked);

  useEffect(() => {
    setCheckedData(category?.data);
    const jsonObject = brand?.data?.data.map(JSON.stringify);

    const uniqueSet = new Set(jsonObject);
    //@ts-ignore
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    setCheckedBrand(uniqueArray);
  }, [brand?.data?.data, category]);
  const [listType, setListType] = useState<"LIST" | "GRID" | string>("LIST");

  const onListType = (value: string) => {
    setListType(value);
  };
  return (
    <>
      <div className={styles.parent}>
        <div className={styles.headerSticky}>
          <Header />
          <div>
            <div className={styles.paracolor}>
              <div>
                <p>
                  <span
                    onClick={() => router.push(`/`)}
                    className={styles.breadcrumbs}
                  >
                    Home
                  </span>{" "}
                  {`>`}
                  <span
                    className={styles.breadcrumbs}
                    onClick={() =>
                      router.push(`/subcategory?id=${activeCategory}`)
                    }
                  >
                    {activeCategory}
                  </span>
                </p>
              </div>
              <div className={styles.listbutton}>
                <span>
                  {listType == "LIST" ? (
                    <BlueListView />
                  ) : (
                    <Image
                      onClick={() => onListType("LIST")}
                      src="/svg/list.svg"
                      width={20}
                      height={20}
                      className={styles.passwordshowiconn}
                    />
                  )}

                  <span>
                    {listType == "GRID" ? (
                      <BlueGridView />
                    ) : (
                      <Image
                        onClick={() => onListType("GRID")}
                        src="/svg/grid.svg"
                        width={20}
                        height={20}
                        className={styles.passwordshowiconn}
                      />
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.itemOne}>
            <div className={styles.Section1}>
              <ul className={styles.subUl}>
                <h3>Categories:</h3>
                <ul>
                  {checkedData?.map((item: any, index: any) => {
                    return (
                      <div key={index}>
                        <li>
                          <input
                            type="checkbox"
                            name={item.category_name}
                            value={item._id}
                            checked={item?.isChecked}
                            onChange={handleFilterCategory}
                          />
                          <span onClick={handleFilterCategory}>
                            {" "}
                            {item.category_name}
                          </span>
                        </li>{" "}
                      </div>
                    );
                  })}
                </ul>
                <h3> Brand</h3>
                <ul>
                  {checkedBrand?.map((item: any, index: any) => {
                    return (
                      <div key={index}>
                        <li>
                          <input
                            type="checkbox"
                            name={item.brand}
                            value={item?.brand}
                            checked={item?.isChecked}
                            onChange={handleFilterBrand}
                          />
                          <span> {item.brand}</span>
                        </li>{" "}
                      </div>
                    );
                  })}
                </ul>

                <a className={styles.seemore}>See more</a>
                <h3>Large Appliances Price</h3>
              </ul>
            </div>
          </div>
          <div className={styles.itemTwo}>
            <>
              {listType === "GRID" ? (
                <div className={styles.columnbox}>
                  <GridSubcategory
                    data={activeCategory}
                    data2={checkedData}
                    data3={productWithPaginate}
                  />
                </div>
              ) : (
                <div className={styles.columnbox}>
                  <SubCategoryItem
                    data={activeCategory}
                    data2={checkedData}
                    data3={productWithPaginate}
                  />
                </div>
              )}
            </>
          </div>
        </div>
      </div>
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={({ selected }) => setCurrentPage(selected)}
        pageRangeDisplayed={totalPages || 0}
        pageCount={totalPages as number}
        previousLabel="< Prev"
        activeLinkClassName={styles.Activepagiantion}
        className={styles.Pagination}
      /> */}
      <NewFooter />
    </>
  );
};

export default SubCategory;
