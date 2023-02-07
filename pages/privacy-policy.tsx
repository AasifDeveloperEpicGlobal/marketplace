import type { NextPage } from "next";
import styles from "../styles/Merchant/privacy.module.scss";
import Image from "next/image";
import TopHeader from "pages/topheader";

import Footer from "components/Footer/footer";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import Arrow from "components/svg-icons/arrow";
import NewFooter from "./newwfooter";

const PrivacyPolicy: NextPage = () => {
  return (
    <div className={styles.container_width}>
      <TopHeader />

      <div className={styles.bannerTop}>
        <Image
          src="/omratrade/privacypolicy (2).jpeg"
          width={1700}
          height={500}
          priority
          alt="jfgg"
        />
      </div>

      <div className={styles.blogSection}>
        <h2>OUR PRIVACY POLICY</h2>

        <p>
          This privacy statement explains how E-Laundry utilises and safeguards
          any information you provide by phone, website, or mobile app.
          E-Laundry is dedicated towards safeguarding your privacy. When using
          this website, if we ask you to supply any information by which you can
          be identified, you should be confident that it will only be used in
          ways that are described in this privacy statement. By frequently
          updating this website, E- Laundry may make changes to this policy. To
          make sure that any changes are acceptable to you, you should
          continually acess this page. We require this information to understand
          your needs and provide you with a better service, and in particular
          for the following reasons:
        </p>

        <ul className={styles.ulBox}>
          <li>
            <div className={styles.arrowBox}>
              <div>
                <Arrow />
              </div>

              <div>
                <p>
                  We may use the information to improve our products and
                  services.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.arrowBox}>
              <div>
                <Arrow />
              </div>

              <div>
                <p>Understand and analyze how you use our website</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.arrowBox}>
              <div>
                <Arrow />
              </div>

              <div>
                <p>
                  Develop new products, services, features, and functionality
                </p>
              </div>
            </div>
          </li>
        </ul>

        <h3>Information We Collect</h3>

        <p>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information. If you
          contact us directly, we may receive additional information about you
          such as your name, email address, phone number, the contents of the
          message and/or attachments you may send us, and any other information
          you may choose to provide. When you register for an Account, we may
          ask for your contact information, including items such as name,
          company name, address, email address, and telephone number.
          <h3>Security</h3>
          <p>
            We are devoted to protecting the security of your data. We have
            appropriate physical, technical, and management safeguards in place
            to restrict access to or disclosure of the information we collect
            online.
          </p>
          <h3>How we use cookies</h3>
          <p>
            <i className="ri-arrow-right-line"></i>A cookie is a small file that
            requests permission to be stored on the hard disc of your computer.
            Once you agree, the file is added, and the cookie either notifies
            you when you visit a specific website or assists in the analysis of
            web traffic. Web apps can respond to you specifically due to
            cookies. By obtaining and retaining information about your
            preferences, the web application can adjust its operations to meet
            your needs, likes, and dislikes. Overall, cookies enable us to track
            which pages you find useful and which you do not, allowing us to
            present you with a better website. Except for the information you
            choose to share with us, a cookie in no way provides us access to
            your computer or any other personal information about you.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have any queries regarding this policy or about the privacy
            practices of E-Laundry, please feel free to contact us by email at
            info@elaundry.co.in .
          </p>
        </p>
      </div>

      <div>
        <NewFooter />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
