/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useOnClickOutside } from "usehooks-ts";
import styles from "styles/Merchant/Header.module.scss";
import Link from "next/link";
import * as gtag from "lib/gtag";

interface SearchProps {
  citySearch: string;
  productSearch: string;
}
interface ActionTypes {
  type: string;
  payload: string;
}

/**
 *
 * Header
 */
const Header: NextPage = () => {
  const CITYSEACRH = "CITYSEACRH";
  const PRODUCTSEACRH = "PRODUCTSEACRH";

  const router = useRouter();

  const searchSlice = {
    initialState: {
      citySearch: "",
      productSearch: "",
    } as SearchProps,
    reducer: (state: SearchProps, action: ActionTypes) => {
      switch (action.type) {
        case CITYSEACRH:
          return {
            ...state,
            citySearch: action.payload,
          };
        case PRODUCTSEACRH:
          return {
            ...state,
            productSearch: action.payload,
          };

        default:
          return state;
      }
    },
    actions: {
      onFilterCity: (payload: string) => ({
        type: CITYSEACRH,
        payload: payload,
      }),
      onFilterProduct: (payload: string) => ({
        type: PRODUCTSEACRH,
        payload: payload,
      }),
    },
  };

  const { actions, initialState, reducer } = searchSlice;
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const cityInputRef = React.useRef<HTMLDivElement>(null);
  const productInputRef = React.useRef<HTMLDivElement>(null);
  const [cityDropDown, setCityDropDown] = React.useState(false);
  const [productsDropDown, setProductsDropDown] = React.useState(false);
  const [headerNotification, setHeaderNotification] = useState<string>("");

  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    if (router?.query?.keyword) {
      setSearchText(router?.query?.keyword as string);
    }
  }, [router]);

  useOnClickOutside(cityInputRef, () => setCityDropDown(false));
  useOnClickOutside(productInputRef, () => setProductsDropDown(false));

  // For City input
  const openCityDropDownHandler = React.useCallback(() => {
    setCityDropDown(true);
  }, []);

  const onFilterCity = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.onFilterCity(e.target.value));
    },
    [actions]
  );
  const onSelectCity = React.useCallback(
    (value: string) => {
      dispatch(actions.onFilterCity(value));
    },
    [actions]
  );

  const uniqArray = Array.from(
    // Filter Duplicates from array
    new Set(
      suggestionArray.filter((data) => {
        return data.text
          .toLowerCase()
          .includes(state.citySearch.toLocaleLowerCase());
      })
    )
  );

  // For Product and Merchant input
  const openProductDropDownHandler = React.useCallback(() => {
    setProductsDropDown(true);
  }, []);

  const _onFilterProduct = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.onFilterProduct(e.target.value));
    },
    [actions]
  );

  const onFilterProduct = debounce((e:React.ChangeEvent<HTMLInputElement>) => _onFilterProduct(e), 800);
  const [productID, setproductID] = useState("");
  const [searchcategory, setSearchCategory] = useState("");

  const onSelectProduct = React.useCallback(
    (data: any) => {
      setproductID(data?._id);

      dispatch(actions.onFilterProduct(data?.product_name));
    },
    [actions]
  );

  const [productName, setProductName] = useState<any>([]);

  const endpoint = `https://merchantapi.elaundry.co.in/api/homepageSearch/${state.productSearch}`;

  React.useEffect(() => {
    const getProductNameAndVendorName = async () => {
      try {
        const res = await axios(endpoint);
        const data = await res.data;
        setProductName(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductNameAndVendorName();
  }, [endpoint]);

  const onSubmit = () => {
    router.push(`India First laundry & Dry-Clean Marketplace
    ?id=${productID}`);
  };

  // MUSIC PLAYER FUNCTIONS

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const onPlay = () => {
    audioRef.current?.play();
  };
  const [color, setColor] = useState("");
  const style = {
    backgroundColor: color,
  };

  const handleSearch = (product: any, text: string) => {
    router.push(
      `/search?id=${encodeURIComponent(
        product?.category
      )}&subCategory=${encodeURIComponent(
        product?.sub_category
      )}&brand=${encodeURIComponent(
        product?.brand
      )}&keyword=${encodeURIComponent(text)}`
    );
    // gtag.event({
    //   action: "search",
    //   params : {
    //     search_term: text
    //   }
    // })
  };

  const handleKeywordSearch = (text: string) => {
    if (text.length > 0) {
      router.push(`/search?keyword=${encodeURIComponent(text)}`);
    } else {
      setHeaderNotification("Enter your Keyword");
    }
  };
  return (
    <>
      <div className={styles.flex_box}>
        <div>
          <Image
            data-lazyloaded="1"
            src="/omratrade/el.png"
            height={70}
            priority
            width={150}
            alt="Logo Image"
            className={styles.imageLogo}
            onClick={() => router.push(`/`)}
          />
        </div>

        <ul className={styles.flex_box1}>
          <span className={styles.phone_none}>
            <li className={styles.button_box1}>
              <span className={styles.phone_icon}>
                <i className="fa fa-phone"></i>
              </span>

              <audio
                ref={audioRef}
                src="/music/click-music.mp3"
                controls={false}
              ></audio>
              <span onClick={onPlay}>9667264383</span>
            </li>
          </span>

          <li
            onClick={() => router.push("/login")}
            className={styles.button_box}
          >
            <i className="fas fa-user"></i>
            <span onClick={onPlay}>
              <Link href={"/login"}>Sign In</Link>
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.flex_section}>
        <h1 className={styles.heading_section}>
          India{"'"}s First laundry & Dry-Clean Marketplace
        </h1>
      </div>
      <div className={styles.searchbar}>
        <span className={styles.phone_none}>
          <div ref={cityInputRef} className={styles.citylist}>
            <span className={styles.map_icon}>
              <Image
                src="/omratrade/location.png"
                width={16}
                height={20}
                priority
                className={styles.passwordshowiconn}
              ></Image>
            </span>
            <input
              type="text"
              placeholder="All Cities"
              value={state.citySearch}
              className={styles.cityinputt}
              onChange={onFilterCity}
              onFocus={openCityDropDownHandler}
            />
            {cityDropDown ? (
              <ul className={styles.city_list}>
                {uniqArray.length <= 0 ? (
                  <li>Not Found</li>
                ) : (
                  uniqArray.map((data, index) => (
                    <li onClick={() => onSelectCity(data.text)} key={index}>
                      {data.text}
                    </li>
                  ))
                )}
              </ul>
            ) : null}
          </div>
        </span>
        <div ref={productInputRef} className={styles.searchbox}>
          <span className={styles.searchproducttext}>{headerNotification}</span>
          <input
            type="text"
            placeholder={
              state.productSearch
                ? state.productSearch
                : "Product, Brand, and Category"
            }
            className={styles.input_sectionn}
            onChange={(e) => {
              onFilterProduct(e);
              setSearchText(e?.target?.value);
            }}
            value={searchText}
            onInput={openProductDropDownHandler}
            onKeyPress={(event: any) => {
              if (event.key === "Enter") {
                handleKeywordSearch(
                  // productName[0],
                  // productName[0]?.sub_category,
                  searchText
                );
              }
            }}
          />

          {productsDropDown ? (
            <ul className={styles.productSearchList}>
              <li
                onClick={() =>
                  handleSearch(productName[0], productName[0]?.brand)
                }
              >
                {productName[0]?.brand}
              </li>
              {productName[0]?.sub_category && (
                <li
                  onClick={() =>
                    handleSearch(productName[0], productName[0]?.sub_category)
                  }
                >
                  {productName[0]?.sub_category}
                </li>
              )}
              {productName.length > 0 ? (
                productName
                  ?.sort((a: any, b: any) =>
                    a?.sub_category?.localeCompare(b.sub_category)
                  )
                  ?.slice(0, 8)
                  ?.map((data: any, index: number) => (
                    <li
                      key={index}
                      style={style}
                      onMouseLeave={() => setColor("")}
                      onClick={() => handleSearch(data, data?.product_name)}
                    >
                      {data?.product_name + "-" + data?.brand}
                    </li>
                  ))
              ) : (
                <li>Not Found</li>
              )}
            </ul>
          ) : null}
          <button
            // onClick={}

            onClick={() =>
              handleKeywordSearch(
                // productName[0],
                // productName[0]?.sub_category,
                searchText
              )
            }
            type="submit"
            className={styles.input_section1r}
          >
            <span className={styles.search_flexbox}>
              <i className="fa fa-search"></i>
              <span className={styles.phone_none}>Search</span>
            </span>
          </button>
        </div>
      </div>
      <div className=""></div>
    </>
  );
};
export default Header;

const suggestionArray = [
  {
    text: "Agra",
    id: 0,
  },
  {
    text: "Delhi",
    id: 1,
  },
  {
    text: "Mumbai",
    id: 2,
  },
  {
    text: "Banglore",
    id: 3,
  },
  {
    text: "Pune",
    id: 4,
  },
];
