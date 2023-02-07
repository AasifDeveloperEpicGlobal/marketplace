import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React from "react";

import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../styles/Merchant/newfooter.module.scss";

const NewFooter: NextPage = () => {
  const router = useRouter();

  const bottomToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };
  return (
    <div className={styles.footerBox}>
      <div className={styles.footertop}>
        <div className="col-md-12">
          <ul className={styles.footertoplist}>
            <li>
              <Image
                src="/omratrade/el.png"
                width={140}
                height={70}
                alt="logo"
                className={styles.facemask}
                onClick={() => router.push(`/`)}
              />
            </li>
            <li>
              <div className={styles.formsect}>
                <p className={styles.text}>
                  Get exclusive sneak peak to new launches & early access to
                  offers.
                </p>
                <input
                  type="email"
                  className={styles.inputfooter}
                  placeholder="Enter your email "
                />
                <button className={styles.emailbuttonfooter}>Submit</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerfont}>
        <div className={styles.footerBoxSection}>
          <div className={styles.bottom_box}>
            <Link href="">Top Categories : </Link>
            <Link href={`/subcategory?id=Laundry%20Accessories`}>
              Laundry Accessories |
            </Link>

            <Link href={`/subcategory?id=Dry%20Cleaning%09`}>Dryclean |</Link>
            <Link href={`/subcategory?id=Washing%20Machine`}>
              Washing Machine |
            </Link>
            <Link href={`/subcategory?id=Chemical%20%26%20Detergent`}>
              Chemical & Detergent |
            </Link>
            <Link href={`/subcategory?id=Printers`}>QR code printer |</Link>
            <Link href={`subcategory?id=Ironer`}>Ironer |</Link>
            <Link href={`/subcategory?id=Scanners`}>Scanner |</Link>
            <Link href={`/subcategory?id=Hangers%20`}>Hanger |</Link>
          </div>

          <div className={styles.bottom_box}>
            <Link href="">Top Categories : </Link>
            <Link href={`/subcategory?id=Spotting%20Machine`}>
              Spotting Machine |
            </Link>
            <Link href={`/subcategory?id=Dry%20Cleaning%09`}>Dryclean | </Link>
            <Link href={`/subcategory?id=Wet%20Cleaning`}>Wet Cleaning | </Link>
            <Link href={`/subcategory?id=Chemical%20%26%20Detergent`}>
              Chemical & Detergent |
            </Link>
            <Link href={`/subcategory?id=Printers`}>QR code printer |</Link>
            <Link href={`/subcategory?id=Industrial%20Washing%20Machines`}>
              Industrial Washing Machines |
            </Link>
            <Link href={`/subcategory?id=Scanners`}>Scanner |</Link>
            <Link href={`/subcategory?id=Hangers%20`}>Hanger |</Link>
          </div>
        </div>
        <div className={styles.Footer_Flex}>
          <div className={styles.footer_flexbox}>
            <ul>
              <li>
                {" "}
                <p>Need Help?</p>
              </li>
              <li>
                <p>Elaundry support id available everyday</p>
              </li>
              <li>
                <p>
                  E-Laundry “A Product of Omra Solutions.” The Perfect fit for
                  any kind of Laundry and Dry-Clean Business.
                </p>
              </li>
            </ul>
          </div>
          <div className={styles.footer_flexbox1}>
            <ul>
              <li>
                <p>Business Types</p>
              </li>
              <li>
                <Link href="">Dry Cleaners</Link>
              </li>
              <li>
                <Link href="">Laundromats</Link>
              </li>
              <li>
                <Link href="">Shoes Cleaning</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footer_flexbox2}>
            <ul>
              <li>
                <p>Services</p>
              </li>
              <li>
                <Link href="">Single Store</Link>
              </li>
              <li>
                <Link href="">Multi Store</Link>
              </li>
              <li>
                <Link href="">Institutional Business</Link>
              </li>
              <li>
                <Link href="">Customized Solution</Link>
              </li>
              <li>
                <Link href="">Customer mobile application</Link>
              </li>
              <li>
                <Link href="">Website Development</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footer_flexbox3}>
            <ul>
              <li>
                <p>Customer Care</p>
              </li>
              <li>
                <Link href="">Contact Us</Link>
              </li>
              <li>
                <Link href="">About Us</Link>
              </li>
              <li>
                <Link href="">Support And FAQ’s</Link>
              </li>
              {/* <li>
                <Link href="">Refund Policy</Link>
              </li>
              <li>
                <Link href="">Return Policy</Link>
              </li> */}
              <li>
                <Link href="">Book Your Demo</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.Footer_Flexsection}>
          <div>
            <ul>
              <li>
                <p>Get in Touch</p>
              </li>
              <li>
                <p>info@elaundry.co.in</p>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <li>
                <p>Office Location</p>
              </li>
              <li>
                <p>Noida, Mumbai, Hyderabad</p>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footer_background}>
          <hr />
          {/* <h3>Elaundry © 2022. All rights reserved </h3> */}
          <h3>Copyright © 2022 Elaundry. All Rights Reserved. </h3>
          <button onClick={bottomToTop} className={styles.bottomToTopButton}>
            <i className="fa fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFooter;
