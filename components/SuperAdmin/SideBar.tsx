import React, { useState } from "react";
import { useBuyerQuery } from "networkAPI/queries";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/hooks";
import styles from "../../styles/Merchant/superadmin.module.scss";
import MenuBar from "components/svg-icons/menu-bar";
import Category from "components/svg-icons/category";
import Merchant from "components/svg-icons/merchant";
import Banner from "components/svg-icons/banner";
import ApprovalListing from "components/svg-icons/approvalListing";
import Subcategory from "components/svg-icons/subcategory";
import ApprovedListing from "components/svg-icons/approvedListing";
import Dashboard from "components/svg-icons/dashboard";
import Blogicon from "components/svg-icons/blogicon";
import HalfArrow from "components/svg-icons/halfArrow";
import Home from "components/svg-icons/home";
import LeadIcon from "components/svg-icons/lead";
import Leads from "components/constants/icons/leads";
import UserService from "components/svg-icons/user-service";

interface SuperAdminSidebar {
  show: boolean;
  onClick?: () => void;
}

const SuperAdminSidebar = ({ onClick, show }: SuperAdminSidebar) => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { data } = useBuyerQuery();
  // FOR SIDEBAR COLLAPSE AND EXPAND
  const [isNav, setisNav] = useState(false);

  return (
    // <div className={styles.maincontainer}>
    <div className={styles.mobileSidebar}>
      <div className={styles.leftsidebarnav}>
        <div className={styles.innersidebar}>
          <div
            className={styles.nav}
            style={{
              maxWidth: show ? "70px" : "300px",
              transition: "all 200ms ease",
            }}
          >
            <ul>
              <li>
                <div className={styles.logo}>
                  <div className={styles.imgBx}>
                    <div className={styles.logoFlex}>
                      {!show && (
                        <div>
                          <Image
                            alt="logo"
                            width={135}
                            height={60}
                            src="/omratrade/el.png"
                            // onClick={() => router.push(`/`)}
                          />
                        </div>
                      )}
                      <div onClick={onClick}>
                        <MenuBar height={22} width={22} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul className={styles.sideScroll}>
              {sideBarArray.map((data, index) => {
                const isActive = data.text;

                return (
                  <NavigationList
                    // @ts-ignore
                    icon={<data.icon />}
                    navigation={!show}
                    text={data.text}
                    key={index}
                    // @ts-ignore
                    subMenu={show === false && data.submenu}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuperAdminSidebar;

interface SubMenuTypes {
  text: string;
  href: string;
}

interface NavigationListProps {
  navigation?: boolean;
  text: string;
  href?: string;
  icon?: () => any;
  subMenu: SubMenuTypes[];
}
const NavigationList = ({
  icon,
  text,
  navigation,
  subMenu,
}: NavigationListProps) => {
  const [dropdown, setDropdown] = useState(false);
  const [color, setColor] = useState("");
  const [background, setBackground] = useState("");

  const dropdownHandler = () => {
    if (navigation == true) {
      setDropdown(!dropdown);
    }
  };

  return (
    <li>
      <div className={styles.navFlex} onClick={dropdownHandler}>
        <div className={styles.sideBarBox}>
          <div className={styles.iconSection}>
            {/* <i className="fa fa-home"> </i> */}
            {/* @ts-ignore */}
            {icon}
          </div>
          {navigation && (
            <div
              style={
                dropdown
                  ? color === text
                    ? { color: "#00b0ee" }
                    : { color: "black" }
                  : { color: "black" }
              }
              onClick={() => setColor(text)}
            >
              {text}
            </div>
          )}
        </div>
        {navigation && (
          <>
            <div>
              <div
                style={{
                  transform: `rotate(${dropdown ? 90 : 0}deg)`,
                }}
              >
                <HalfArrow />
              </div>
              {/* <DownArrow /> */}
            </div>
          </>
        )}
      </div>
      {subMenu?.length >= 0 && <SubMenu menuList={subMenu} show={dropdown} />}
    </li>
  );
};

interface SubMenuProps {
  show?: boolean;
  menuList: SubMenuTypes[];
}

const SubMenu = ({ show, menuList }: SubMenuProps) => {
  const [active, setActive] = useState("");
  return (
    <div
      style={{
        maxHeight: !show ? "0px" : "100px",
        overflow: "hidden",
        transition: "all 200ms ease-in",
      }}
      className={styles.dropdownBox3}
    >
      <ul>
        {menuList.map((data, index) => (
          <li key={index}>
            {show ? (
              <Link href={data.href}>
                <a>
                  <span
                    onClick={() => setActive(data?.text)}
                    style={
                      active == data.text
                        ? { color: "#00b0ee" }
                        : { color: "black" }
                    }
                  >
                    {data.text}
                  </span>
                </a>
              </Link>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface Array {
  text: string;
  icon: () => JSX.Element;
  href: string;
  submenu?: SubMenuTypes[];
}

const sideBarArray: Array[] = [
  {
    text: "Dashboard",
    icon: () => <Home />,
    href: "/super-admin/all-merchant",
    submenu: [
      {
        text: "Notifications",
        href: "/super-admin/blogs/notification",
      },
    ],
  },

  {
    text: "Merchant",
    icon: () => <Merchant />,
    href: "/super-admin/all-merchant",
    submenu: [
      {
        text: "All Merchant",
        href: "/super-admin/all-merchant",
      },
      {
        text: "Edit Merchant",
        href: "/super-admin/all-merchant/edit",
      },
    ],
  },
  {
    text: "Users Service",
    icon: () => <UserService />,
    href: "/super-admin/user-services",
    submenu: [
      {
        text: "Users Service",
        href: "/super-admin/user-services",
      },
      {
        text: "Edit Service",
        href: "/super-admin/user-services/edit",
      },
    ],
  },
  {
    text: "Category",
    icon: () => <Category />,
    href: "/super-admin/category",
    submenu: [
      {
        text: "Add Category",
        href: "/super-admin/category/add-category",
      },
      {
        text: "Category List",
        href: "/super-admin/category",
      },
      {
        text: "Edit Category",
        href: "/super-admin/category/edit",
      },
    ],
  },
  {
    text: "Subcategory",
    icon: () => <Subcategory />,
    href: "/super-admin/all-merchant",
    submenu: [
      {
        text: "Add Subcategory",
        href: "/super-admin/SubCategory/add-subcategory",
      },
      {
        text: "All Subcategory",
        href: "/super-admin/SubCategory",
      },
    ],
  },
  {
    text: "Blogs",
    icon: () => <Blogicon />,
    href: "/super-admin/blog",
    submenu: [
      {
        text: "Add Blogs",
        href: "/super-admin/blogs/add",
      },

      // {
      //   text: "Demo Blogs",
      //   href: "/super-admin/blogs/demo",
      // },
    ],
  },

  {
    text: " Listings",
    icon: () => <ApprovalListing />,
    href: "/super-admin/approval-listing",
    submenu: [
      {
        text: "Approval Listing",
        href: "/super-admin/approval-listing",
      },
      {
        text: "Approved Listing",
        href: "/super-admin/approved-listing",
      },
    ],
  },
  {
    text: "Pricing",
    icon: () => <ApprovedListing />,
    href: "/super-admin/pricing",
    submenu: [
      //renewal
      {
        text: "Create Pricing",
        href: "/super-admin/pricing",
      },
      {
        text: "Active",
        href: "/super-admin/pricing/active-subscription",
      },

      {
        text: "Renewal",
        href: "/super-admin/renewal",
      },
    ],
  },

  {
    text: "Banner",
    icon: () => <Banner />,
    href: "/super-admin/banners",
    submenu: [
      {
        text: "Add Banners",
        href: "/super-admin/banners",
      },
    ],
  },
  {
    text: "Leads",
    icon: () => <Leads />,
    href: "/super-admin/leads",
    submenu: [
      {
        text: "Leads",
        href: "/super-admin/leads",
      },
    ],
  },
];
