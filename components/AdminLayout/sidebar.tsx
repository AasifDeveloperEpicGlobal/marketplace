import React, { useState } from "react";
import Link from "next/link";
import styles from "styles/order.module.scss";
import { SVGICONPROPS } from "../typings/icon";

import AppsIcon from "../constants/icons/AppsIcon";
import DatabaseIcon from "../constants/icons/DatabaseIcon";
import { useRouter } from "next/router";
import Image from "next/image";
import Pricing from "components/constants/icons/pricing";
import Leads from "components/constants/icons/leads";
import RemoveIcon from "components/constants/icons/remove";
import Completed from "components/constants/icons/completed";
import AllProducts from "components/constants/icons/allproducts";
import MenuBar from "components/svg-icons/menu-bar";
import { useGetUserServices } from "networkAPI/queries";

interface CommerceSidebarProps {
  active?: boolean;
}

const toLower = (text: string) => text.toLocaleLowerCase();

const Sidebar = ({ active }: CommerceSidebarProps) => {
  const router = useRouter();
  const [test,setTest] = useState(false)
  const {data} = useGetUserServices()
  console.log(data?.data)

  const paths = router.pathname.split(/[/]/g);
  return (
    <div className={`${styles.sidebar} ${!active ? styles.active : ""}`}>
      <div className="sidebarinner">
        <div className={styles.brandlogo}>
          {/* <div className={styles.logoFlex}> */}
          {/* <div> */}
          <Image
            src="/omratrade/el.png"
            width={135}
            height={60}
            alt="logo"
            className={styles.logo}
          />
          {/* </div> */}
          {/* <div onClick={onClick}>
              <MenuBar height={22} width={22} />
            </div> */}
          {/* </div> */}
        </div>
        <div className={styles.sidenav}>
          <ul className={styles.nav}>
            {navigationArray.filter((show:any)=>data?.data?.isUpload==show.isUpload || data?.data?.isLead==show.isLead ||show.isVisible==false ).map((item, index) => {
              const isActive = paths.includes(toLower(item.title));
              return (
              
                <li key={index} className={isActive ? styles.active : ""} >
                   <Link href={item.href}>
                    <a>
                      <div className={styles.ianimg}>
                        <item.icon />
                      </div>
                     
                      <span>{item.title}</span>
                     
                    </a>
                  </Link>
                  
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const navigationArray = [
  {
    title: `Upload Product`,
    href: `/onboarding/dashboard/product/upload-product`,
    icon: (props: SVGICONPROPS) => <AppsIcon {...props} />,
    isUpload:false,
  },
  {
    title: `All Product`,
    href: `/onboarding/dashboard/product/all-product`,
    icon: (props: SVGICONPROPS) => <AllProducts {...props} />,
    isVisible:false,
    
  },
 
  {
    title: `Approved Product`,
    href: `/onboarding/dashboard/product/all-product/approved`,
    icon: (props: SVGICONPROPS) => <DatabaseIcon {...props} />,
    isVisible:false

  },
  {
    title: `Declined Products`,
    href: `/onboarding/dashboard/product/all-product/declined`,
    icon: (props: SVGICONPROPS) => <RemoveIcon {...props} />,
    isVisible:false
  },
  {
    title: `Completed Leads
    `,
    href: `/onboarding/dashboard/product/all-product/completed-leads`,
    icon: (props: SVGICONPROPS) => <Completed {...props} />,
    isCall:false
  },
  {
    title: `Leads`,
    href: `/onboarding/dashboard/product/all-product/leads`,
    icon: (props: SVGICONPROPS) => <Leads {...props} />,

    isLead:false
  },

  {
    title: `Live Subscription`,
    href: `/onboarding/dashboard/product/pricing`,
    icon: (props: SVGICONPROPS) => <Pricing {...props} />,
  },
  // {
  //   title: `Invoice`,
  //   href: `/onboarding/dashboard/product/pricing/invoice`,
  //   icon: (props: SVGICONPROPS) => <Pricing {...props} />,
  // },

  {
    title: `My Subscriptions`,
    href: `/onboarding/dashboard/product/pricing/my-subscriptions`,
    icon: (props: SVGICONPROPS) => <Pricing {...props} />,
    isVisible:false
  },
];
