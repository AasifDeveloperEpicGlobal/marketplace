import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  useGetMerchantDetailsData,
  useGetUserBySearch,
} from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import DiscountDataList from "./discount-list";
import AddDiscountBannerComponet from "./add";
import UpdateDiscountBanner from "./update";

const DiscountBannerHome: NextPage = () => {
  const [subTab,setSubTab] = useState<string>("list");
  const [currentId,setCurrentId] = useState<object>()
 //===========================testing for button disable====
  const ativebuttonsRefs = React.useMemo(() => {

    switch (subTab) {
      case "create": 
      return(
        <div className={styles.mov}>
          <div>
            <button onClick={()=>setSubTab("list")} className={styles.downloadButton3}>
              {subTab=="create" ? "All Services" : " "}
            </button>
          </div>
          
        </div>
       
      )
      
        
        break;
      case "update":
        return(
          <div className={styles.mov}>
            <div>
              <button onClick={()=>setSubTab("list")} className={styles.downloadButton3}>
                {subTab=="update" ? "All Services" : " "}
              </button>
            </div>
            
          </div>
         
        )
        
          break;
    
      default:
        return(
          <div className={styles.mov}>
            <div>
              <button onClick={()=>setSubTab("create")} className={styles.downloadButton3}>
                {subTab=="list" ? "Add New" : " "}
              </button>
            </div>
            <div>
              {subTab=="list" ? (
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className={styles.downloadButton3}
                  table="table-to-xls"
                  filename="MerchantDetails"
                  sheet="tablexls"
                  buttonText="Download"
                />
              ) : (
                ""
              )}
            </div>
          </div>
         
        )
        break;
    }
    
  }, [subTab])

  return (
    <div>
      
      {
        //   tabToggle==0 ? <TeaserDataList /> : <AddTeaserBannerComponent />

        ativebuttonsRefs
      }
       {subTab==="list" ? <DiscountDataList setSubTab={setSubTab} setCurrentId={setCurrentId} />:subTab=="update"?<UpdateDiscountBanner  setSubTab={setSubTab} currentId={currentId}/> : <AddDiscountBannerComponet setSubTab={setSubTab} />}
    </div>
  );
};
export default DiscountBannerHome;
