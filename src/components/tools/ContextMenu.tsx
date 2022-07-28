import React from "react";
import useRemoveDefaultContextMenu from "@/hooks/useRemoveDefaultContextMenu";

interface Props {}

const ContextMenu: React.FC<Props> = () => {
  useRemoveDefaultContextMenu();

  return <></>;
};

export default ContextMenu;
