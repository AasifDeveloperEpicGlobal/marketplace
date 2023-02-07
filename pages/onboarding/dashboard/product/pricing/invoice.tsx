import { NextPage } from "next";
import React, { useState } from "react";

import styles from "../../../../../styles/Merchant/invoice.module.scss";
import Image from "next/image";
import { useGetSubscription, useGetUserDetail } from "networkAPI/queries";
import { useAppSelector } from "redux/hooks";
import { UserDetails } from "networkAPI/api";
import Print from "components/svg-icons/print";

const Invoice: NextPage = () => {
  const user = useAppSelector((state: any) => state);
  const { data: merchantData, refetch, isSuccess } = useGetUserDetail();
const { data, isLoading } = useGetSubscription();
 
  const USerData = data?.data?.data?.find(
    (item: any) => item.auther_Id == merchantData?._id
  );
 

  const handleInvoicePrint = () => {
    window.print();
  };

  const [mousehover, setMousehover] = useState(false);

  const modalbutton = () => {
    setMousehover(true);
  };

  return (
    <>
      <div className={styles.maincontainer}>
        <div className={styles.topinvoice}>
          <div>
            <Image
              src="/omratrade/el.png"
              width={200}
              height={90}
              alt="elaundry"
            />
          </div>
          <div className={styles.printpart}>
            <div
              className={styles.noprint}
              onClick={handleInvoicePrint}
              onMouseEnter={() => setMousehover(true)}
              onMouseLeave={() => setMousehover(false)}
            >
              <Print />
              {mousehover ? (
                <span>
                  <p className={styles.printtext}>Print</p>
                </span>
              ) : null}
            </div>{" "}
            <div className={styles.addresspart}>
              <h4>Marketplace Elaundry</h4>
              <p>A-105, Sector 65, Noida, UP, Pin: 201301</p>
              <p>
                <b>PAN:</b> AAFCD8404R
              </p>
              <p>
                <b>GST Number:</b> 9917USA29005OS9
              </p>{" "}
              <p>
                <b>Mobile:</b> 9667264383
              </p>
              <p>https://marketplace.elaundry.co.in/</p>
            </div>{" "}
          </div>
        </div>
        <div className={styles.invoicetop}>
          <div className={styles.invoicebackground}>
            <div className={styles.invoicetext}>
              <h1>INVOICE </h1>
            </div>
          </div>
        </div>

        <div className={styles.invoicebox}>
          <div className={styles.addresssection}>
            <div className={styles.addresspart}>
              <h4>For </h4>

              <p>{USerData?.vendors_name}</p>

              <p>{USerData?.address}</p>

              <p>
                {" "}
                <b>GST: </b>
                {USerData?.gst}
              </p>
              <p>
                <b>Email id: </b>
                {USerData?.email}
              </p>
              <p>
                <b>Phone No.</b> {USerData?.mobile_no}
              </p>
            </div>
          </div>

          <div className={styles.invoicerightside}>
            <h4>Details </h4>
            <div className={styles.invoice}>
              <div>
                <b>
                  <p>Invoice number:</p>
                </b>
              </div>
              <div>
                <p>448786750</p>
              </div>
            </div>
            <div className={styles.invoice}>
              <div>
                <b>
                  <p>Order No.:</p>
                </b>
              </div>
              <div>
                <p>448786750</p>
              </div>
            </div>
            <div className={styles.invoice}>
              <div>
                <b>
                  <p>Date of Issue:</p>
                </b>
              </div>
              <div>
                <p>{USerData?.start_date.slice(0, 10)}</p>{" "}
              </div>
            </div>
            <div className={styles.invoice}>
              <div>
                <b>
                  {" "}
                  <p>Payment due on</p>{" "}
                </b>
              </div>
              <div>
                <p>{USerData?.end_date.slice(0, 10)}</p>
              </div>
            </div>
          </div>
        </div>

        <table className={styles.tablebox}>
          <thead>
            <tr>
              {" "}
              <th>Sno.</th>
              <th>Services</th>
              <th>Month</th>
              <th>Price</th>
              <th>GST</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {" "}
              <td>
                <p>1.</p>
              </td>
              <td>
                <p>{USerData?.plan}</p>
              </td>
              <td>
                <p>{USerData?.start_date.slice(0, 10)} </p>
              </td>
              <td>
                <p>&#x20b9; {USerData?.price}</p>
              </td>
              <td>
                <p>&#x20b9;20.00 </p>
              </td>
              <td>
                <p>&#x20b9; {USerData?.Amount}</p>
              </td>
            </tr>

            <tr>
              {" "}
              <td>
                <p>2.</p>
              </td>
              <td>
                <p>{USerData?.plan}</p>
              </td>
              <td>
                <p>{USerData?.start_date.slice(0, 10)}</p>
              </td>
              <td>
                <p>&#x20b9; {USerData?.price}</p>
              </td>
              <td>
                <p>&#x20b9;20.00 </p>
              </td>
              <td>
                <p>&#x20b9; {USerData?.Amount}</p>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          {" "}
          <h3 className={styles.summary}>Summary</h3>
          <hr />
          <div className={styles.invoice}>
            <div>
              <p className={styles.invoicepara}>Total usage charges </p>
            </div>
            <div>
              <p className={styles.invoicepara}>&#x20b9;80.00</p>
            </div>
          </div>
          <hr />
          <div className={styles.subtotalinvoice}>
            <div>
              <p className={styles.invoicepara}>Subtotal</p>
            </div>
            <div>
              <p className={styles.invoicepara}> &#x20b9; {USerData?.price}</p>
            </div>
          </div>
          <div className={styles.invoice}>
            <div>
              <p className={styles.invoicepara}>GST India (18.00%)</p>
            </div>
            <div>
              <p className={styles.invoicepara}>&#x20b9;18.00</p>
            </div>
          </div>{" "}
          <hr />
          <div className={styles.invoice}>
            <div>
              <h3>Total due</h3>
            </div>
            <div>
              <h3>&#x20b9; {USerData?.Amount}</h3>
            </div>
          </div>{" "}
          <p className={styles.para}>
            If you have a credit card on file, it will be automatically charged
            within 24 hours
          </p>{" "}
          <hr />
          <div className={styles.productcharges}>
            <h5>Product usage charges</h5>
            <p>
              Detailed usage information is available via the API or can be
              downloaded from the billing section of your account
            </p>
          </div>
          <div className={styles.productcharges}>
            <h5>Terms & Conditions</h5>
            <ul>
              <li>
                <p>
                  1. Invoice should be paid within 07 days from the date of
                  presentation.
                </p>
              </li>
              <li>
                <p>
                  2. Invoice should be paid within 07 days from the date of
                  presentation.
                </p>
              </li>
              <li>
                <p>
                  3. The invoice shall be deemed to be accepted unless otherwise
                  specifically intimated to us within five (5) working days of
                  the receipt.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Invoice;
