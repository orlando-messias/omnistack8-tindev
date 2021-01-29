import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    });

    setUsers(users.filter(user => user._id !== id));
  };

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>

      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt="Avatar" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))};
        </ul>
      ) : (
          <div className="empty">Não há Devs :(</div>
        )}
    </div>
  );
};

export default Main;