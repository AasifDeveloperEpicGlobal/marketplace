import React, { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "styles/Merchant/pagination.module.scss";

const Pagination: NextPage = () => {
  return (
    <React.Fragment>
      <div className={styles.fontSize1}>
        <ul className={styles.paginationFlex}>
          <li className={styles.activeColor}>
            <Link href="#">1</Link>
          </li>
          <li>
            <Link href="#">2</Link>
          </li>
          <li>
            <Link href="#">3</Link>
          </li>
          <li>
            <Link href="#">4</Link>
          </li>

          <li>
            <Link href="#">&raquo;</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Pagination;
