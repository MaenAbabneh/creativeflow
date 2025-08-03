"use client";

import EditDeleteAction from "./editedelete";
import EditDeleteActionMobile from "./editedelete-mobile";

interface Props {
  type: string;
  itemId: string;
}

const ResponsiveEditDeleteAction = ({ type, itemId }: Props) => {
  return (
    <>
      {/* Desktop version - hidden on mobile */}
      <EditDeleteAction type={type} itemId={itemId} />

      {/* Mobile version - hidden on desktop */}
      <EditDeleteActionMobile type={type} itemId={itemId} />
    </>
  );
};

export default ResponsiveEditDeleteAction;
