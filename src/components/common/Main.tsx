import React from "react";
import { useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { EnumView } from "../core/enums/EnumView";
import { ItemsView } from "../views/ItemsView";
import { UsersView } from "../views/UsersView";

const MainComponent = () => {
  const store = useAppSelector(
    (state) => ({
      view: state.UI.view,
    }),
    shallowEqual
  );
  return <>{store.view === EnumView.ItemView ? <ItemsView /> : <UsersView />}</>;
};

export const Main = React.memo(MainComponent);
