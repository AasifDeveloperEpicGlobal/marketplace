import { NextPage } from "next";
import React, { useState } from "react";
import styles from "../../../../../styles/Merchant/invoice.module.scss";

import Image from "next/image";
import { useGetInvoice, useGetSubscription } from "networkAPI/queries";
import Print from "components/svg-icons/print";
import AdminLayout from "components/AdminLayout";
interface itemProps {
 
    userData:any;
  
}

const Invoice2 = ({userData }: itemProps) => {
  const [testNumber, setTestNumber] = useState<number>();
  console.log(userData)
  const [currentId,setCurrentId] = useState<any>([])
  const { data, refetch, isLoading } = useGetInvoice();
  const invoice = data?.data?.data[0];
  console.log(invoice);
  const date = new Date();

  console.log(currentId );

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
            </div>
            <div className={styles.addresspart}>
              <h4>Marketplace Elaundry</h4>
              <p>A-105, Sector 65, Noida, UP, Pin: 201301</p>
              <p>
                <b>PAN:</b> AAFCD8404R
              </p>
              <p>
                <b>GST Number:</b> 9917USA29005OS9
              </p>
              <p>
                <b>Mobile:</b> 9667264383
              </p>
              <p>
                <u>
                  <a href="https://marketplace.elaundry.co.in/">
                    https://marketplace.elaundry.co.in/
                  </a>
                </u>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.invoicetop}>
          <div className={styles.invoicebackground}>
            <div className={styles.invoicetext}>
              <h1>TEXT INVOICE </h1>
            </div>
          </div>
        </div>

        <div className={styles.invoicebox}>
          <div className={styles.addresssection}>
            <div className={styles.addresspart}>
              <h4>For </h4>
              <p>
                <b>Party Name: </b>
                {currentId?.vendors_name}
              </p>
              <p>{currentId?.address}</p>
              <p>
                <b>Email id: </b>
                {currentId?.email}
              </p>
              <p>
                <b>Phone No.</b> {currentId?.mobile_no}
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
                <p>{date.getTime()}</p>
              </div>
            </div>
            <div className={styles.invoice}>
              <div>
                <b>
                  <p>Invoice Date:</p>
                </b>
              </div>
              <div>
                <p>{currentId?.updatedAt.slice(0, 10)}</p>{" "}
              </div>
            </div>
            <div className={styles.invoice}>
              <div>
                <b>
                  <p>Payment due on</p>
                </b>
              </div>
              <div>
                <p>{currentId?.end_date?.slice(0, 10)}</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className={styles.summary}>Summary</h3>
        <table className={styles.tablebox}>
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Services</th>
              <th>Validity</th>
              <th>Rate</th>
              <th>Tax</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>1.</p>
              </td>
              <td>
                <p>{currentId?.plan?.map((plan:any,index:any)=>{
                    return(<div key={index}>
                        <span>{plan.label}</span>

                    </div>)
                })}</p>
              </td>
              <td>
                <p>{currentId?.validity}</p>
              </td>
              <td>
                <p>&#x20b9;{currentId?.price} </p>
              </td>
              <td>
                <p>&#x20b9;{currentId?.Amount - currentId?.price}</p>
              </td>
              <td>
                <p>&#x20b9;{currentId?.Amount}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.toptotal}>
          <hr />
          <div className={styles.invoice}>
            <div>
              <p className={styles.invoicepara}>Total usage charges </p>
            </div>
            <div>
              <p className={styles.invoicepara}>&#x20b9;{currentId?.price}</p>
            </div>
          </div>
          <hr />
          <div className={styles.subtotalinvoice}>
            <div>
              <p className={styles.invoicepara}>Subtotal</p>
            </div>
            <div>
              <p className={styles.invoicepara}> &#x20b9;{currentId?.price}</p>
            </div>
          </div>
          <div className={styles.invoice}>
            <div>
              <p className={styles.invoicepara}>GST India (18.00%)</p>
            </div>
            <div>
              <p className={styles.invoicepara}>
                &#x20b9;{currentId?.Amount - currentId?.price}
              </p>
            </div>
          </div>
          <hr />
          <div className={styles.invoice}>
            <div>
              <h3>Total due</h3>
            </div>
            <div>
              <h3>&#x20b9;{currentId?.Amount}</h3>
            </div>
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
export default Invoice2;
