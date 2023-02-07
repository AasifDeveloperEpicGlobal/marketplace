import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetHomeCategory, usePublicProduct } from "../../networkAPI/queries";
import styles from "../../styles/Merchant/view.module.scss";

function Category() {
  const { data, status } = usePublicProduct();
  const { data: data2 } = useGetHomeCategory();
  const [category_data, setCategory_data] = useState([]);

  const router = useRouter();
  useEffect(() => {
    setCategory_data(data2?.data);
  }, [data2]);


  return (
    <div className="containerr3">
      <div className={styles.newFlex}>
        <div>
          <h1 className={styles.heading_section}>All Category</h1>
        </div>
        <div className={styles.allCategoryButton}>
          <Link href={"/allcategory"}>View all</Link>
        </div>
      </div>
      <div>
        <div
          key={"index"}
          //  style={{ display: "flex" }}
        >
          <div className={styles.Flex_Section}>
            {category_data?.map((item3: any, index: any) => {
              
              return (
                <div
                  key={index}
                  onClick={() =>
                    router.push(
                      `subcategory?id=${encodeURIComponent(
                        item3.category_name
                      )}`
                    )
                  }
                >
                  <div
                    className={styles.img_box}
                    style={{
                      backgroundImage: `url(${
                        item3?.category_image[0]
                          ? item3?.category_image[0]
                          : "/"
                      })`,
                    }}
                  >
                    {item3.category_name}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Category;
