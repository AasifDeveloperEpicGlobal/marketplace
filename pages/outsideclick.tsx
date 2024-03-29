import { useRef, useState } from "react";
import useClickOutside from "../components/svg-icons/outsideclick";

function OutsideClick() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsVisible(false));

  return (
    <div className="app">
      <div ref={ref} className="container">
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          <span>Toggle Modal</span>
        </button>
        {isVisible && <div className="modal">MODAL</div>}
      </div>
    </div>
  );
}

export default OutsideClick;
