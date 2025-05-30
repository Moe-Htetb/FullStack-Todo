import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}
function Protected({ children }: Props) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);
  return <div>{children}</div>;
}

export default Protected;
