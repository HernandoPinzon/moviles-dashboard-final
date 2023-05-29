import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import "./AdminMenu.scss";

export const AdminMenu = () => {
  return (
    <Menu fluid vertical icon text className="admin-menu">
      <Menu.Item>
        <Icon name="user outline" >Usuarios</Icon>

      </Menu.Item>
    </Menu>
  );
};
