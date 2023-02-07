import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React from "react";

import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../styles/Merchant/newwfooter.module.scss";
import Facebook from "components/svg-icons/facebook";
import Instagram from "components/svg-icons/instagram";
import Twitter from "components/svg-icons/twitter";
import Youtube from "components/svg-icons/youtube";
import Email from "components/svg-icons/email";
import Phone from "components/svg-icons/phone";
import Linkedin from "components/svg-icons/linkedin";

const NewFooter: NextPage = () => {
  const router = useRouter();

  const bottomToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };
  return (
    <div className={styles.footerBox}>
      <div className={styles.footerfont}>
        <footer className={styles.footer_background33}>
          <div></div>
          <div className={styles.footerBox33}>
            <div>
              <ul style={{ padding: "0" }}>
                <li>
                  <h2>Need Help?</h2>
                </li>

                <li>
                  <p>Elaundry support available 24*7</p>

                  <div className={styles.displayBox}>
                    <div>
                      <Email />
                    </div>

                    <div>
                      <p> info@elaundry.co.in</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={styles.displayBox}>
                    <div>
                      <Phone />
                    </div>

                    <div>
                      <p>9667264383</p>
                    </div>
                  </div>
                </li>
                <li>
                  <p>
                    The connected B2B platform for consumer and Manufactures for
                    Laundry and Drycleaning Industry
                  </p>
                </li>
              </ul>
            </div>

            <div className={styles.footerlinkshover}>
              {" "}
              <ul>
                <li>
                  <h2>Marketplace</h2>
                </li>
                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link href="/aboutus">About Us</Link>
                </li>
                <li>
                  <Link href="/blog">Blogs</Link>
                </li>
                <li>
                  <Link href="/">Testimonials</Link>
                </li>
                <li>
                  <Link href="/book-you-demo">Book Your Demo</Link>
                </li>
              </ul>
            </div>

            {/* <div className={styles.footerlinkshover}>
              {" "}
              <ul>
                <li>
                  <h2>Business Types</h2>
                </li>
                <li>
                  <Link href="/">
                    <p>Dry Cleaners</p>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <p>Laundromats</p>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <p>Shoes Cleaning</p>
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className={styles.footerlinkshover}>
              {" "}
              <ul className={styles.importantlinks}>
                <li>
                  <h2>Important Links</h2>
                </li>
                <li>
                  <Link href="/bulk-enquiry">Bulk Enquiry</Link>
                </li>
                <li>
                  <Link href="/supplier-central">Supplier Central</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <h2>Office Location</h2>
                </li>
                <li>
                  <p className={styles.addressBox33}>
                    Noida, Mumbai, Hyderabad
                  </p>
                </li>
                <li>
                  <h2>Stay Connected</h2>
                  <div>
                    <ul className={styles.newFooter33}>
                      <li>
                        <Link href="https://www.facebook.com/elaundrymarketplace">
                          <a target="_blank">
                            <Facebook />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.instagram.com/elaundrymarketplace/">
                          <a target="_blank">
                            <Instagram />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.linkedin.com/company/elaundry-marketplace">
                          <a target="_blank">
                            <Linkedin />{" "}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.youtube.com/channel/UCF4GtaQAh1diq7vPxd21BFg">
                          <a target="_blank">
                            <Youtube />{" "}
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBoxSection}>
            <div className={styles.footertop}>
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
              </ul>
            </div>
            <div className={styles.bottom_box}>
              <h5>Top Categories : </h5>

              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Chemical & Detergent"
                )}`}
              >
                <a href=""> Chemical & Detergent|</a>
              </Link>
              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Laundry Accessories"
                )}`}
              >
                <a href="">Laundry Accessories |</a>
              </Link>
              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Hydro Extractor "
                )}`}
              >
                <a href="">Hydro Extractor |</a>
              </Link>

              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Washing Machine "
                )}`}
              >
                <a href="">Washing Machine |</a>
              </Link>
              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Industrial Washing Machines "
                )}`}
              >
                <a href="">Industrial Washing Machines|</a>
              </Link>

              <Link href={`/subcategory?id=${encodeURIComponent("Ironer")}`}>
                Ironer |
              </Link>
              <Link href={`/subcategory?id=${encodeURIComponent("Hangers")}`}>
                <a href=""> Hangers |</a>
              </Link>
            </div>

            <div className={styles.bottom_box}>
              <h5>Top Categories : </h5>

              <Link
                href={`/subcategory?id=${encodeURIComponent("Dry Cleaning")}`}
              >
                <a href=""> Dry Cleaning |</a>
              </Link>
              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Finishing Equipments"
                )}`}
              >
                <a href="">Finishing Equipments |</a>
              </Link>
              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Hydro Extractor "
                )}`}
              >
                <a href="">Hydro Extractor |</a>
              </Link>
              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Hospital Laundry Equipment"
                )}`}
              >
                <a href="">Hospital Laundry Equipment |</a>
              </Link>
              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Washing Machine "
                )}`}
              >
                <a href="">Washing Machine |</a>
              </Link>
              <Link
                href={`/subcategory?id=${encodeURIComponent(
                  "Spotting Machine "
                )}`}
              >
                <a href="">Spotting Machine|</a>
              </Link>

              <Link href={`/subcategory?id=${encodeURIComponent("Ironer")}`}>
                Ironer |
              </Link>
              <Link href={`/subcategory?id=${encodeURIComponent("Hangers")}`}>
                <a href=""> Hangers |</a>
              </Link>
            </div>
          </div>

          <div className={styles.footer_background}>
            <div className={styles.newFooter}>
              <div>
                <h3>Elaundry © 2022. All rights reserved</h3>
                <button
                  onClick={bottomToTop}
                  className={styles.bottomToTopButton}
                >
                  <i className="fa fa-arrow-up"></i>
                </button>
              </div>
              <div>
                <ul className={styles.newFooter33}>
                  <li>
                    <Link href="/terms-of-use">
                      <a>
                        <h3>Terms of use</h3>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a>
                        <h3>Privacy Policy</h3>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NewFooter;
