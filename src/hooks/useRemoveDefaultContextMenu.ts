import React from "react";

function useRemoveDefaultContextMenu() {
  React.useEffect(() => {
    const handleContextMenu = function (e: MouseEvent) {
      e.preventDefault();
      return false;
    };

    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
}

export default useRemoveDefaultContextMenu;
