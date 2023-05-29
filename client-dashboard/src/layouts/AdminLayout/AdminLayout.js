import React from "react";
import "./AdminLayout.scss";
import { image } from "../../assets";
import {AdminMenu} from "../../components/Admin/AdminLayout";
import { Auth } from "../../api/auth";

const auth = new Auth();

export const AdminLayout = (props) => {
  const { children } = props;
  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <img src={image.logo} alt="" className="logo" />
        <AdminMenu />
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <button onClick={auth.removeTokens}>Logout</button>
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
};
