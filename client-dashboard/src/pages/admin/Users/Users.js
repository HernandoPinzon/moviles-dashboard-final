import React, { useEffect, useState } from "react";
import { UsersApi } from "../../../api/usersapi";
import { Auth } from "../../../api/auth";
import Modal from "react-modal";
import "./Users.scss";
import UserDetails from "./UserDetails/UserDetails";
import { RegisterForm } from "../../../components/Admin/Auth";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);



  const auth = new Auth();
  const usersApi = new UsersApi();
  const fetchUsers = async () => {
    const accessToken = auth.getAccessToken();
    const fetchedUsers = await usersApi.getAllUsers(accessToken);
    setUsers(fetchedUsers.reverse());
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (e, user) => {
    e.stopPropagation(); // Evita que el evento se propague al abrir el modal
    console.log(user);
    setUserToDelete(user);
    setShowConfirmationModal(true);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };
  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };
  
  const handleEditUser = (userId, user) => {
    setSelectedUser(user);
    setSelectedUserId(userId);
    setModalIsOpen(true);
    console.log(selectedUser);
    console.log(selectedUserId);
  };
  
  const confirmDeleteUser = async () => {
    const accessToken = auth.getAccessToken();
    await usersApi.deleteUser(userToDelete._id, accessToken);
    setUsers(users.filter(user => user._id !== userToDelete._id));
    closeModal();
    
  };
  

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setSelectedUserId(null);
    setModalIsOpen(false);
    fetchUsers();
  };
  return (
    <div>
      <div>
      <h1>Lista de Usuarios</h1>
      <div className="user-list">
        {users.map((user, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <div className="user-name">{user.firstname} {user.lastname}</div>
              <div className="user-email">{user.email}</div>
              <div className="user-status">{user.active ? "Activo" : "Inactivo"}</div>
              <div className="user-role">Rol: {user.role}</div>
            </div>
            <button className="delete-button" onClick={(e) => handleDeleteUser(e, user)}>
              Eliminar
            </button>
            <button className="edit-button" onClick={() => handleEditUser(user._id, user)}>Editar</button>
            <button className="details-button" onClick={() => openModal(user)}>
              Detalles
            </button>

          </div>
          
        ))}
        <button className="add-user-button" onClick={openRegisterModal}>
          Agregar Usuario
        </button>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Usuario"
      >
        {selectedUser && (
          <UserDetails userId={selectedUser._id} closeModal={closeModal} />
        )}
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Usuario"
      >
        {selectedUserId ? (
          <div>
            <h1>Actualizar Usuario</h1>
            <button className="close-button" onClick={closeModal}>
              X
            </button>
            <RegisterForm user={selectedUser} />
          </div>
        ) : (
          selectedUser && <UserDetails userId={selectedUser._id} closeModal={closeModal} />
        )}
      </Modal>

      <Modal
        isOpen={showRegisterModal}
        onRequestClose={closeRegisterModal}
        contentLabel="Agregar Usuario"
      >
        <h3>Agregar Usuario</h3>
        <RegisterForm />
      </Modal>
      <Modal
        className="confirmation-modal"
        isOpen={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
        contentLabel="Confirmar Eliminación"
      >
        <h3>Confirmar Eliminación</h3>
        {userToDelete && (
          <p>¿Estás seguro de que deseas eliminar a {userToDelete.firstname} {userToDelete.lastname}?</p>
        )}
        <div>
          <button onClick={confirmDeleteUser}>Eliminar</button>
          <button onClick={() => setShowConfirmationModal(false)}>Cancelar</button>
        </div>
      </Modal>
      </div>
    </div>
    </div>
  );
};
