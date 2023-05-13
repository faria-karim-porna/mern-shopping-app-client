import React from "react";

const SidebarComponent = () => {
  return (
    <div className="sidebar glass-effect">
      <div className="sidebar-option">Users</div>
      <div className="sidebar-option active">Items</div>
    </div>
  );
};

export const Sidebar = React.memo(SidebarComponent);
