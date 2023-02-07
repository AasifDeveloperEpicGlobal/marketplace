import React, { useState } from "react";

const Validation = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailValidation = () => {
    const regEx = /^([a-zA-Z0-9\.-_]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (regEx.test(email)) {
      setMessage("Email is Valid");
    } else if (!regEx.test(email) && email !== "") {
      setMessage("Email is not Valid");
    } else {
      setMessage("");
    }
  };
  const handleOnChange = (e: any) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <div>
        <h1>Login Form</h1>

        <form action="">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleOnChange}
          />

          <button type="submit" onClick={emailValidation}>
            Login
          </button>
          {message}
        </form>
      </div>
    </>
  );
};

export default Validation;
