import { useEffect } from "react";

export function useDetectClickOutsideComponent(ref, outsideHandler) {
  useEffect(() => {
    // Function to handle clicks outside the component
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        outsideHandler();
      }
    }

    // Attach event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Detach event listener when the component unmounts or when ref/outsideHandler changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, outsideHandler]); // Re-run effect when ref or outsideHandler changes
}
