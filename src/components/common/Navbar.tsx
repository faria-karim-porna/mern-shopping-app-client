import React from "react";

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg site-nav glass-effect">
      <div className="d-flex align-items-center w-100 justify-content-between px-5">
        <div>Shopping App</div>
        <div className="">
          <div>Faria</div>
          <div className="d-none">dropdown</div>
        </div>
      </div>
    </nav>
  );
};

export const Navbar = React.memo(NavbarComponent);
