import React, { useState } from "react";
import styles from "../styles/Merchant/buttonmodel.module.scss";
const buttonmodal = () => {
  const [text, setText] = useState("thisuhxujskxkdjs i");

  // const words = () => {
  //   setText("");
  // };
  return (
    <div className={styles.inputFlex}>
      <div>
        {" "}
        <h3 className={styles.inputlabel}>Package Name</h3>
        <input
          type="text"
          placeholder="Enter Service Name"
          name="search2"
          className={styles.inputForm}
        />
      </div>
    </div>
  );
};

export default buttonmodal;

// import React, { useState } from "react";

// const buttonmodal = () => {
//   const [modal, setModal] = useState(false);

//   const modalbutton = () => {
//     setModal(true);
//   };
//   return (
//     <>
//       <div>
//         <button
//           onMouseEnter={() => setModal(true)}
//           onMouseLeave={() => setModal(false)}
//         >
//           paid
//         </button>
//       </div>
//       {modal ? <div>ujgdxjhxd</div> : null}
//     </>
//   );
// };

// export default buttonmodal;

// function App() {
//   const [isShown, setIsShown] = useState(false);

//   return (
//     <div className="App">
//       <button
//         onMouseEnter={() => setIsShown(true)}
//         onMouseLeave={() => setIsShown(false)}>
//         Hover over me!
//       </button>
//       {isShown && (
//         <div>
//           I'll appear when you hover over the button.
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
