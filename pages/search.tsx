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

import {parseCookies} from "nookies"
import { dehydrate, QueryClient } from "react-query";
import FilterSearchGridItem from "components/Subcategory/FilterSearchGridItem";
import FilterSearchItem from "components/Subcategory/FilterSearchItem";

const Search: NextPage = () => {
    const [currentPage, setCurrentPage] = useState<number>();
    const [totalPages, setTotalPage] = useState<number>();
    const { data: brandData } = useGetBrand();
    const { data: category, error } = useGetCategory();
    const { data: productWithPaginate } = useGetProductWithPaginate(currentPage);
    const router = useRouter();
    const activeSubcategory = router.query.subCategory as string;
    const activeCategory = router.query.id as string;
    const keyword = router.query.keyword as string;
    const subcategory = router.query.subcategory as string;
    const brand = router.query.brand as string;
    const [categoryChecked, setCategoryChecked] = useState<boolean>(false);
    const { data: productData, status: status2 } =
      useProductsByCategory(activeCategory);
    const ProductData = productData;
    const [checkedData, setCheckedData] = useState<any>([]);
    const [checkedBrand, setCheckedBrand] = useState<any>([]);
  
    const filterByCategory = () => {};
  
    const handleFilterCategory = (e: any) => {
      const { name, checked } = e.target;
      const list = checkedData?.map((category: any) =>
        category.category_name == name
          ? { ...category, isChecked: checked }
          : category
      );
      setCheckedData(list);
      // list[index][name] = checkbox;
      // setadditionalSpecification(list);
    };
  
    const handleFilterBrand = (e: any) => {
      const { name, checked } = e.target;
      const list1 = checkedBrand?.map((brand: any) =>
        brand?.brand == name ? { ...brand, isChecked: checked } : brand
      );
      setCheckedBrand(list1);
      // list[index][name] = checkbox;
      // setadditionalSpecification(list);
    };
    const checkedCategory = checkedData?.find((item: any) => item.isChecked);
  
    useEffect(() => {
      setCheckedData(category?.data);
      const jsondata = brandData?.data?.data?.map(JSON.stringify);
      const uniqueData = new Set(jsondata);
      // @ts-ignore
      const uniqueArray = Array.from(uniqueData).map(JSON.parse);
      setCheckedBrand(uniqueArray);
    }, [category]);
    const [listType, setListType] = useState<"LIST" | "GRID" | string>("LIST");
    useEffect(() => {
      // setCurrentPage(data?.currentPage);
      setTotalPage(productWithPaginate?.totalPages);
    }, [productWithPaginate]);
  
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
                  {" "}
                  <Image
                    onClick={() => onListType("LIST")}
                    src="/svg/list.svg"
                    width={20}
                    height={20}
                    priority={true}
                    alt=""
                    className={styles.passwordshowiconn}
                  ></Image>{" "}
                  <Image
                    onClick={() => onListType("GRID")}
                    src="/svg/grid.svg"
                    width={20}
                    priority={true}
                    height={20}
                    alt=""
                    className={styles.passwordshowiconn}
                  ></Image>
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
                    const queryCheck =
                      item.category_name == activeCategory ? true : false;
                  

                    return (
                      <div key={index}>
                        <li>
                          <input
                            type="checkbox"
                            name={item.category_name}
                            value={item._id}
                            defaultChecked={queryCheck}
                            checked={item?.isChecked || false}
                            onChange={handleFilterCategory}
                          />
                          <span> {item.category_name}</span>
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
                <FilterSearchGridItem
                  data={keyword}
                  data2={checkedData}
                  data3={productWithPaginate}
                />
              </div>
            ) : (
              <div className={styles.columnbox}>
                <FilterSearchItem
                  data={keyword}
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

export default Search;



// export const getServerSideProps = async (context: any) => {
//   const req=context.req
//   const access_token = parseCookies({ req: context.req });


 

//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(
//     "category",
//     async () =>
//       await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/get_category`).then((response) => response.json())
//   );

//   // Pass data to the page via props
//   return { props: { dehydratedState: dehydrate(queryClient) } };
//   }
