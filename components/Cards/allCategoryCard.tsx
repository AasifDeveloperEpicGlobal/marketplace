import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Merchant/allcategorycard.module.scss";
import { string } from "yup";

interface Props {
  title: string;
  data: any;
  category: any;
}
function AllCategoryItem({ title, data, category }: Props) {
  const router = useRouter();
  return (
    <React.Fragment>
      <div className="containerr3">
        {category ? (
          <div key={""} className={styles.box_height}>
            <h2 className={styles.heading_section3}>
              {title} ({category?.length || 0})
            </h2>

            <div className={styles.Flex_Section}>
              {category?.map((item3: any, index: any) => {
               
                return (
                  <div
                    key={index}
                    onClick={() =>
                      router.push(
                        `subcategory?id=${encodeURI(
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
        ) : (
          "Item Not Found"
        )}
      </div>
    </React.Fragment>
  );
}

export default AllCategoryItem;
