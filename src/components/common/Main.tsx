import React from "react";
import { useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { EnumView } from "../core/enums/EnumView";
import { ItemsView } from "../views/ItemsView";
import { UsersView } from "../views/UsersView";
import { EnumAccessType } from "../core/enums/EnumAccessType";

const MainComponent = () => {
  const store = useAppSelector(
    (state) => ({
      view: state.UI.view,
      personalData: state.UI.personalData,
    }),
    shallowEqual
  );
  return <>{store.view === EnumView.ItemView || store.personalData?.accessType === EnumAccessType.User ? <ItemsView /> : <UsersView />}</>;
};

export const Main = React.memo(MainComponent);
