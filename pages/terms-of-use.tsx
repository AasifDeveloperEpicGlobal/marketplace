import type { NextPage } from "next";
import styles from "../styles/Merchant/termsofuse.module.scss";
import Image from "next/image";
import TopHeader from "pages/topheader";

import Footer from "components/Footer/footer";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import Arrow from "components/svg-icons/arrow";
import NewFooter from "./newwfooter";

const TermsOfUse: NextPage = () => {
  return (
    <div className={styles.container_width}>
      <TopHeader />

      <div className={styles.bannerTop}>
        <Image
          src="/omratrade/terms.jpeg"
          width={1700}
          height={500}
          priority
          alt="jfgg"
        />
      </div>

      <div className={styles.blogSection}>
        <h2>TERMS AND CONDITIONS</h2>

        <p>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements: {'"'}Client{'"'},
          {'"'}You{'"'} and {'"'}Your{'"'} refers to you, the person log on this website and
          compliance to the Company’s terms and conditions. {'"'}The Company{'"'},
          {'"'}Ourselves{'"'}, {'"'}We{'"'}, {'"'}Our{'"'} and {'"'}Us{'"'}, refers to our Company. {'"'}Party{'"'},
          {'"'}Parties{'"'}, or {'"'}Us{'"'}, refers to both the Client and ourselves. All terms
          refer to the offer, acceptance and consideration of payment necessary
          to undertake the process of our assistance to the Client in the most
          appropriate manner for the express purpose of meeting the client’s
          need in respect of provision of the company’s stated services, in
          accordance with and subject to, prevailing law of India. Any use of
          the above terminology or other words in the singular, plural,
          capitalization and/or he/she or they, are taken as interchangeable and
          therefore as referring to same.
        </p>

        <ul className={styles.ulBox}>
          <li>
            <div className={styles.arrowBox}>
              <div>
                <Arrow />
              </div>

              <div>
                <p>Read all the information and agree with the conditions</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.arrowBox}>
              <div>
                <Arrow />
              </div>

              <div>
                <p>Prices and payment clause</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.arrowBox}>
              <div>
                <Arrow />
              </div>

              <div>
                <p>Allowing for cookies</p>
              </div>
            </div>
          </li>
        </ul>

        <h3>Use of Cookies</h3>

        <p>
          We employ the use of cookies. By accessing
          https://marketplace.elaundry.co.in/, you agreed to use cookies in
          agreement with the e-laundry {"'"}s Privacy Policy. Most interactive
          websites use cookies to let us retrieve the user’s details for each
          visit. Cookies are used by our website to enable the functionality of
          certain areas to make it easier for people visiting our website. Some
          of our affiliate/advertising partners may also use cookies.
          <h3>Amendments to this Terms and Conditions</h3>
          <p>
            We reserve the right to request that you remove all links or any
            particular link to our Website if you find any irrelevant
            information or inappropriate content. You approve of immediately
            removing all links to our Website upon request. We also reserve the
            right to amend these terms and conditions and its linking policy at
            any time. By continuously linking to our Website, you agree to be
            bound to and follow these linking terms and conditions. If you find
            any link on our Website that is offensive for any reason, you are
            free to contact and inform us at any moment. We will consider
            requests to remove links but we are not obligated to or so or to
            respond to you directly.
          </p>
          <h3>Your Acceptance to these Policy and Terms</h3>
          <p>
            <i className="ri-arrow-right-line"></i>
            Please refer Terms and Conditions We shall not be hold responsible
            for any content that appears on your Website. You agree to protect
            and defend us against all claims that is rising on your Website. No
            link(s) should appear on any Website that may be interpreted as
            libelous, obscene or criminal, or which infringes, otherwise
            violates, or advocates the infringement or other violation of, any
            third party rights.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have queries regarding this Policy or about the privacy
            practices of E-laundry, please contact us by email at
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

export default TermsOfUse;
