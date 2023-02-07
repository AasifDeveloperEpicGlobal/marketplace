// import React, { useState } from "react";
// import { validEmail, validPassword } from "./regex.js";


// const App = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailErr, setEmailErr] = useState(false);
//   const [pwdError, setPwdError] = useState(false);
//   const validate = () => {
//     if (!validEmail.test(email)) {
//       setEmailErr(true);
//     }
//     if (!validPassword.test(password)) {
//       setPwdError(true);
//     }
//   };
//   return (
//     <div>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <div>
//         <button onClick={validate}>Validate</button>
//       </div>
//       {emailErr && <p>Your email is invalid</p>}
//       {pwdError && <p>Your password is invalid</p>}
//     </div>
//   );
// };
// export default App;
import React from 'react'

function rejex() {
  return (
    <div>rejex</div>
  )
}

export default rejex
