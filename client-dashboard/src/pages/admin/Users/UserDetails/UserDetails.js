// components/UserDetails.js
import React, { useEffect, useState } from "react";
import { UsersApi } from "../../../../api/usersapi";
import { Auth } from "../../../../api/auth";
import "./UserDetails.scss";

const UserDetails = ({ userId, closeModal }) => {
  const [user, setUser] = useState(null);
  const auth = new Auth();
  const usersApi = new UsersApi();

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = auth.getAccessToken();
      const fetchedUser = await usersApi.getUser(userId, accessToken);
      setUser(fetchedUser);
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Cargando información del usuario...</div>;
  }

  return (
    
    <div className="user-details">
      <h1>Detalles del Usuario</h1>
      <p>Nombre: {user.firstname} {user.lastname}</p>
      <p>Correo electrónico: {user.email}</p>
      <p>Estado: {user.active ? "Activo" : "Inactivo"}</p>
      <p>Rol: {user.role}</p>
      <button className="close-button" onClick={closeModal}>
        X
      </button>
    </div>
  );
};

export default UserDetails;
