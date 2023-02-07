import type { NextPage } from "next";
import styles from "../styles/Merchant/aboutus.module.scss";
import Image from "next/image";
import TopHeader from "pages/topheader";
import NewFooter from "./newwfooter";

const AboutUs: NextPage = () => {
  return (
    <div className={styles.container_width}>
      <TopHeader />
      <div className={styles.imageBox}>
        {/* <div className={styles.bannerTop}>
          <Image
            src="/omratrade/aboutbanner.png"
            width={1700}
            height={600}
            priority
            alt="jfgg"
          />
          <h1 className={styles.topHeading}>
            Making Your Laundry better with the Best E-Laundry Management!
          </h1>

          <p className={styles.topHeading1}>
            We believe in helping people and businesses to take charge of their
            online reputation and present the best version of them online.
          </p>
        </div> */}
      </div>
      <div className={styles.main}>
        <div className={styles.aboutBox1}>
          <div className={styles.leftside}>
            <h1>Our Vision</h1>
            <h3>Let{"'"}s get connected with million+ people and explore</h3>
            <p>
              Our vision is to address the challenges faced by laundry
              organizations by creating a setting where all laundry operations,
              including placing orders, keeping track of various records,
              planning deliveries, and pickups, and managing payment options,
              will be completely automated.
            </p>
            <p>
              We also offer technical solutions that can address common
              management issues in the laundry industry, enabling a laundry or
              dry-cleaning business to increase revenue while reducing costs, as
              well as to deliver dry-cleaning and laundry services to customers
              in a timely, efficient and affordable manner.
            </p>
          </div>
          <div className={styles.rightside}>
            {" "}
            <Image
              src="/omratrade/boy.png"
              width={500}
              height={400}
              priority
              alt="jfgg"
            />
          </div>
        </div>

        <div className={styles.aboutBox2}>
          <div className={styles.leftside2}>
            {" "}
            <Image
              src="/omratrade/aim.png"
              width={600}
              height={550}
              priority
              alt="jfgg"
            />
          </div>
          <div className={styles.leftside}>
            <h1>Our Mission</h1>

            <p>
              Our mission is to improves the lives and bring conviences to our
              customers by providing them lots of different facilities to their
              clients which includes chemical and detergent cleaning, washing
              machine, dyeing machine, hydro extractor, dryer, ironer, dry
              cleaning, wet cleaning, finishing equipment, boiler, and many
              others where we use different kinds of detergents and types of
              machinery and methods to clean the cloths and prevent them from
              any harm.
            </p>
            <p>
              These services are flexible in terms of time laundry management to
              use, which also keeps them managing their time.
            </p>
          </div>
        </div>
        <div className={styles.heading}>
          {" "}
          <h1>Core Values</h1>
        </div>
        <div className={styles.aboutBox1}>
          <div className={styles.leftside}>
            <h2>By the Customers.</h2>
            <h2> For the Customers.</h2>
            <p>
              For us, maintaining a commitment to our clients is essential. We
              collaborate with the shared goal of developing long-term
              relationships to have an influence that goes beyond our customers{" "}
              {"'"}
              requirements and touches their lives while giving them access to
              the greatest facilities possible.
            </p>
          </div>
          <div className={styles.rightside}>
            {" "}
            <Image
              src="/omratrade/about.png"
              width={600}
              height={400}
              priority
              alt="jfgg"
            />
          </div>
        </div>

        <div className={styles.aboutBox2}>
          <div className={styles.leftside2}>
            {" "}
            <Image
              src="/omratrade/about33.png"
              width={600}
              height={450}
              priority
              alt="jfgg"
            />
          </div>
          <div className={styles.leftside}>
            <h2>Customer Service</h2>

            <p>
              We are committed to providing timely, helpful, and interactive
              service to our customers by providing them different kinds and
              more convenient facilities. Which includes chemical and detergent
              cleaning, washing machine, hydro extractor, dryer, ironers, dry
              cleaning, wet cleaning, boiler, and many others with placing
              orders, pickups, keeping track of various records, and many
              others.
            </p>
          </div>
        </div>
        <div className={styles.aboutBox1}>
          <div className={styles.leftside}>
            <h2>Integrity</h2>
            <p>
              Integrity has always been the cornerstone of our business culture.
              Because of our dedication to integrity, reliability, and honesty,
              we are admired and respected. We act morally upright even when no
              one is looking.
            </p>
          </div>
          <div className={styles.rightside}>
            {" "}
            <Image
              src="/omratrade/aim33.png"
              width={550}
              height={500}
              priority
              alt="jfgg"
            />
          </div>
        </div>
      </div>
      <div>
        <NewFooter />
      </div>
    </div>
  );
};

export default AboutUs;
