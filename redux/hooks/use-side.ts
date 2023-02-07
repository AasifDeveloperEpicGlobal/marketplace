import React from "react";
import navbarSlice from "redux/slices/navbar";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const useSideNav = () => {
  const { isNav } = useAppSelector((state) => state.navbar);

  const dispatch = useAppDispatch();

  const onSideNav = React.useCallback(
    (payload: boolean) => {
      dispatch(navbarSlice.actions.setNavBar(payload));
    },
    [isNav]
  );

  return { isNav, onSideNav };
};

export default useSideNav;
