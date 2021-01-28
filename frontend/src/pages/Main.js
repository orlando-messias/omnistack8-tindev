import React, { useEffect, useState } from 'react';

import api from '../services/api';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import './Main.css';

function Main({ match }) {
  const [users, setUsers] = useState([]);

  const id = match.params.id;

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { user: id }
      });

      setUsers(response.data);
    };

    loadUsers();
  }, [id]);

  return (
    <div className="main-container">
      <img src={logo} alt="Tindev" />

      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt="Avatar" />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>
            <div className="buttons">
              <button type="button">
                <img src={dislike} alt="dislike" />
              </button>
              <button type="button">
                <img src={like} alt="like" />
              </button>
            </div>
          </li>
        ))};
      </ul>
    </div>
  );
};

export default Main;