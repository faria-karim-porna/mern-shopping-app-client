import React from "react";

const UserModalComponent = () => {
  return <div className="text-danger">UserModal</div>;
};

export const UserModal = React.memo(UserModalComponent);
