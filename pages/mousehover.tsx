// import { NextPage } from "next";
// import React, { useState } from "react";

// const buttonmodal: NextPage = () => {
//   const [modal, setModal] = useState(false);

//   const modalbutton = () => {
//     setModal(true);
//   };
//   return (
//     <>
//       <div>
//         <button onClick={modalbutton}>paid</button>
//       </div>
//       {modal ? <div>ujgdxjhxd</div> : null}
//     </>
//   );
// };

// export default buttonmodal;

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
//         onMouseLeave={() => setIsShown(false)}
//       >
//         Hover over me!
//       </button>
//       {isShown && <div>l appear when you hover over the button.</div>}
//     </div>
//   );
// }

// export default App;

import React, { useRef, useState } from "react";

const BannerData = () => {
  const [name, setName] = useState("")
  const ref1 =useRef(null)
  const handleColor =()=>{
  //  ref1.current.focus()
  }
  return (<>
  <div>
   <h1> hello GThis is Test</h1>
   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aspernatur possimus aliquid officiis odit voluptatem fugiat vitae exercitationem amet. Ullam, ducimus ea. Quia laboriosam consequuntur vel, excepturi quidem laudantium corporis?</p>
  <form action="">
    <input type="text" ref={ref1}/>
    <button onClick={handleColor}>Change Color</button>
  </form>
  </div>
  </>
  );
};

export default BannerData;
