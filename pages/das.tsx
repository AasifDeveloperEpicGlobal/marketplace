import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Merchant/dashborad.module.scss";
export const Dashboard = () => {

  const [hide,setShow] = useState<boolean>(true)
  const cancelHandler=()=>{
    setShow(!hide)
  }
  return (
    <div className={styles.maincontainer}>
      <div className={styles.leftsidebarnav}>
        <div className={styles.innersidebar}>
          <div className={styles.logo}>Brand Name</div>
          <div className={styles.nav}>
            <ul className={styles.navmenu}>
              <li>Dashbnoard</li> <li>Dashbnoard</li> <li>Dashbnoard</li>
              <li>Dashbnoard</li>
              <li>Dashbnoard</li>
              <li>Dashbnoard</li>
              <li>Dashbnoard</li>
              <li>Dashbnoard</li>
              <li>Dashbnoard</li>
              <li>Dashbnoard</li>
              <li>Dashbnoard</li>
              <li>Dashbnoard</li>
              <li>Dashbnoard</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.rightside}>
        <div className={styles.topbar}>
          <div className={styles.innertopbar}>
            <div className={styles.bar}>
              <Image
                src="/svg/bar-chart-horizontal-line.svg"
                height={30}
                width={30}
                alt=""
              />
            </div>
            <div className={styles.author}>
              <ul>
                <li>Profile</li>
                <li>Notification</li>
                <li>Logout</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.contentbox}>
          {hide?<div className={styles.author}>
              <ul>
                <li>Profile</li>
                <li>Notification</li>
                <li>Logout</li>
              </ul>
            
           
            </div>:null


            
          }
          {!hide?<button onClick={cancelHandler}>show</button>:<button onClick={cancelHandler}>Delete</button>}

        
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
