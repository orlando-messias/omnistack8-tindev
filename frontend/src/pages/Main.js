import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import api from '../services/api';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import './Main.css';
import itsamatch from '../assets/itsamatch.png';

function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

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

  useEffect(() => {
    const socket = io("http://localhost:3333", {
      withCredentials: true,
      query: { user: id }
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    })

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

      { matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="its a match" />
          <img className="avatar" src={matchDev.avatar} alt="Avatar" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
        </div>
      )}
    </div>
  );
};

export default Main;