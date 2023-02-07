import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../styles/Merchant/Header.module.scss";

const TopHeader: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className={styles.flex_box}>
        <div>
          <Image
            data-lazyloaded="1"
            src="/omratrade/el.png"
            height={70}
            width={150}
            priority={true}
            alt="Logo Image"
            className={styles.imageLogo}
            onClick={() => router.push(`/`)}
          />
        </div>

        <ul className={styles.flex_box1}>
          <li className={styles.home_icon} onClick={() => router.push(`/`)}>
            <span className={styles.phone_icon3}>
              <i className="fa fa-home"></i>
            </span>

            <span
              className={styles.phone_none}
              onClick={() => router.push(`/`)}
            >
              Home
            </span>
          </li>
          <div className={styles.phone_none}>
            <li className={styles.button_box1}>
              <span className={styles.phone_icon}>
                <i className="fa fa-phone"></i>{" "}
              </span>

              <span className={styles.phone_none}>9667264383</span>
            </li>
          </div>
          <li className={styles.button_box}>
            <i className="fas fa-user"></i>
            <span className={styles.phone_none}>
              <Link href="/login">Sign In</Link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopHeader;
