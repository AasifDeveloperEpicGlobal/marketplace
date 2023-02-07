import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Merchant/invoice.module.scss";

import Image from "next/image";
import { useGetInvoice, useGetSubscription } from "networkAPI/queries";
import Print from "components/svg-icons/print";
import AdminLayout from "components/AdminLayout";

const Invoice: NextPage = () => {
  const [testNumber, setTestNumber] = useState<number>();
  const { data, refetch, isLoading } = useGetInvoice();
  const invoice = data?.data?.data[0];
  console.log(invoice);
  const date = new Date();

  const handleInvoicePrint = () => {
    window.print();
  };

  const [mousehover, setMousehover] = useState(false);

  const modalbutton = () => {
    setMousehover(true);
  };
  console.log(testNumber?.toFixed(0));

  useEffect(() => {
    const x = Math.random() * 100000000;
    setTestNumber(x);
  }, []);

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
              <p className={styles.websitelink}>
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
              <h1> INVOICE-RECEIPT</h1>
            </div>
          </div>
        </div>

        <div className={styles.invoicebox}>
          <div className={styles.addresssection}>
            <div className={styles.addresspart}>
              <h4>For </h4>

              <p>
                <b>Party Name: </b>
                {invoice?.vendors_name}
              </p>

              <p>{invoice?.address}</p>

              <p>
                <b>Email id: </b>
                {invoice?.email}
              </p>
              <p>
                <b>Phone No.</b> {invoice?.mobile_no}
              </p>
            </div>
          </div>

          <div className={styles.invoicerightside}>
            <h4>Details </h4>
            <div className={styles.invoice}>
              <div>
                <b>
                  <p>Invoice Number:</p>
                </b>
              </div>
              <div className={styles.invoice}>
                {/* <p>{x}</p> */}
                <p>{testNumber?.toFixed(0)}</p>
              </div>
            </div>

            <div className={styles.invoice}>
              <div>
                <b>
                  <p>Invoice Date:</p>
                </b>
              </div>
              <div>
                <p>{invoice?.updatedAt.slice(0, 10)}</p>
              </div>
            </div>
            <div className={styles.invoice}>
              <div>
                <b>
                  <p> Next Renewal Date:</p>
                </b>
              </div>
              <div>
                <p>{invoice?.end_date?.slice(0, 10)}</p>
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
              <th>Status</th>
              <th>Duration</th>
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
                <p>{invoice?.plan?.map((plan:any,index:number)=>{
                return(<div key={index}>
                  <span>{plan.label}</span>
                  

                </div>)})}</p>
              </td>
              <td>
                <p>{invoice?.validity}</p>
              </td>
              <td>
                <p>Paid</p>
              </td>
              <td>
                <p>
                  {invoice?.start_date.slice(0, 10)} to{" "}
                  {invoice?.end_date.slice(0, 10)}
                </p>
              </td>
              <td>
                <p>&#x20b9;{invoice?.price} </p>
              </td>
              <td>
                <p>&#x20b9;{invoice?.Amount - invoice?.price}</p>
              </td>
              <td>
                <p>&#x20b9;{invoice?.Amount}</p>
              </td>
            </tr>
          </tbody>
        </table>

        <div className={styles.toptotal}>
          <hr />
          <div className={styles.invoice}>
            <div>
              <p className={styles.invoicepara}>Total </p>
            </div>
            <div>
              <p className={styles.invoicepara}>&#x20b9;{invoice?.price}</p>
            </div>
          </div>
          <hr />
          <div className={styles.subtotalinvoice}>
            <div>
              <p className={styles.invoicepara}>Subtotal</p>
            </div>
            <div>
              <p className={styles.invoicepara}> &#x20b9;{invoice?.price}</p>
            </div>
          </div>
          <div className={styles.invoice}>
            <div>
              <p className={styles.invoicepara}>GST (18%)</p>
            </div>
            <div>
              <p className={styles.invoicepara}>
                &#x20b9;{invoice?.Amount - invoice?.price}
              </p>
            </div>
          </div>
          <hr />
          <div className={styles.invoice}>
            <div>
              <h3>Total Amount</h3>
            </div>
            <div>
              <h3>&#x20b9;{invoice?.Amount}</h3>
            </div>
          </div>

          <div className={styles.productcharges}>
            <h5>Terms & Conditions</h5>
            <ul className={styles.termpadding}>
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
