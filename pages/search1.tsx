import UserLayout from "components/User/Layout";
import {
  useGetBrand,
  useGetCategory,
  useGetProductWithPaginate,
  useProductsByCategory,
} from "networkAPI/queries";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import styles from "styles/Merchant/subcategory.module.scss";
import React, { useEffect, useState } from "react";
import FilterSearchItem from "components/Subcategory/FilterSearchItem";
import FilterSearchGridItem from "components/Subcategory/FilterSearchGridItem";
import NewFooter from "./newwfooter";

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
    <div className={styles.container_width}>
      <Toaster position="bottom-center" />
      <UserLayout>
        <div className={styles.container_width3}>
          <div className={styles.paracolor}>
            <div>
              <p>Home {`>`} {router.query?.id}</p>
            </div>
            <div className={styles.listbutton}>
              <span>
                {" "}
                <Image
                  onClick={() => onListType("LIST")}
                  src="/svg/list.svg"
                  width={20}
                  height={20}
                  alt="hhh"
                  className={styles.passwordshowiconn}
                ></Image>{" "}
                <Image
                  onClick={() => onListType("GRID")}
                  src="/svg/grid.svg"
                  width={20}
                  height={20}
                  alt="alt"
                  className={styles.passwordshowiconn}
                ></Image>
              </span>
            </div>

            {/* <h3>
              Hand Sanitizer Spray
              <span className={styles.sub_heading1}>
                (912 products available)
              </span>
            </h3> */}
          </div>
          {/* <h1 className={styles.sub_heading}>
            About 1453 results found for {`"Washing Machine"`}
          </h1> */}

          <div className={styles.main_box}>
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
                            name={item?.brand}
                            value={item?.brand}
                            // defaultChecked={queryCheck}
                            checked={
                              item?.isChecked
                              // || queryCheck || false
                            }
                            onChange={handleFilterBrand}
                          />
                          <span> {item.brand}</span>
                        </li>{" "}
                      </div>
                    );
                  })}
                </ul>
                {/* <li>
                  <input type="checkbox" value="Bike" />
                  <span> Samsung</span>
                </li>
                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Samsung</span>
                </li> */}

                <Link href={""} className={styles.seemore}>
                  See more
                </Link>
                <h3>Large Appliances Price</h3>

                <li>
                  <span className={styles.min_max_box}>
                    <input type="text" value="Min" />
                    <input type="text" value="Max" />
                    <button className={styles.go_button}>Go</button>
                  </span>
                </li>
                {/* <li>
                  <p>Under ₹ 10,000 -₹ 15,000</p>
                </li> */}
                <h3>Appliances Family Size</h3>

                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Single & Couple</span>
                </li>
                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Family of 3</span>
                </li>
                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Family of 4</span>
                </li>
                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Large Families</span>
                </li>
                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Samsung</span>
                </li>
                <h3>Colors</h3>
                <h3>Washing Machine Operation Type</h3>
                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Samsung</span>
                </li>
                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Samsung</span>
                </li>
                <h3>Colors</h3>

                <h3>Washing Machine Operation Type</h3>
                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Samsung</span>
                </li>
                <li>
                  <input type="checkbox" value="Bike" />
                  <span> Samsung</span>
                </li>
              </ul>
            </div>
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
        </div>

        <NewFooter />
      </UserLayout>
    </div>
  );
};

export default Search;
