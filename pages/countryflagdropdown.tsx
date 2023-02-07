import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import styles from "../styles/Merchant/countryflag.module.scss";

interface dataProps {
  setCountryName: any;
  countryName: string;
}

const CountryFlagDropdown = ({ setCountryName, countryName }: dataProps) => {
  const [country, setCountry] = useState([]);
  const [countryid, setCountryid] = useState("");
  useEffect(() => {
    const getcountry = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const getcon = await res.json();

      setCountry(await getcon);
    };
    getcountry();
  }, []);

  const handlecountry = (event: any) => {
    const getcountryid = event.target.value;
    // setMade_in(getcountryid);
    event.preventDefault();
  };

  const dropdowndata = [
    { value: "flag", label: "flag" },
    { value: "country", label: "country" },
  ];
  return (
    <>
      <form action="">
        <select
          name="madeIn"
          value={countryName}
          className={styles.dropdown}
          onChange={(e) => setCountryName(e.target.value)}
        >
          <option>Select Country</option>
          {/* {dropdowndata.map((item: any, index: any) => { */}
          {country?.map((item: any, index: any) => {
            return (
              <option key={index} value={item?.name?.common}>
                {/* <img src={item?.flags.png} alt="" /> */}
                {item?.name?.common}
              </option>
            );
          })}
        </select>
      </form>
    </>
  );
};

export default CountryFlagDropdown;
