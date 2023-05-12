import React from "react";
import { useAppDispatch } from "../core/redux/reduxStore";

const GlassmorphismBackgroundComponent = (props: React.PropsWithChildren) => {
  const dispatch = useAppDispatch();
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
