import React from "react";

const GlassmorphismBackgroundComponent = (props: React.PropsWithChildren) => {
  return (
    <>
      <div className="background-container">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>

        <div className="content-container">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="content">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export const GlassmorphismBackground = React.memo(GlassmorphismBackgroundComponent);
