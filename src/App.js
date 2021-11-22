import { useState } from 'react';
import './App.css';
import api from './services/Api.js'

function App() {
  const [user, setUser] = useState({});
  const [textInput, setTextinput] = useState('');
  const [exiterUser, setExisteuser] = useState(false);

  const buscarDados = (e) => {
    e.preventDefault();

    if (textInput) {
      let url = 'users/' + textInput.trim();

      api.get(url)
        .then(
          (response) => {
            if (response.data.erro) {
              setUser({});
              setExisteuser(false);
            }
            else {
              let resultado = JSON.stringify(response.data);
              setUser(JSON.parse(resultado))
              setExisteuser(true);
            }
          }
        )
        .catch((erro) => {
          setUser({});
          setExisteuser(false);
        }
        );
    }
    else {
      setUser({});
      setExisteuser(false);
    }
  }
  return (
    <div className="App">
      <h1>Buscar usuário do Git</h1>
      <input type='text' onChange={(e) => setTextinput(e.target.value)} />
      <br />
      <button onClick={buscarDados}>Buscar</button>
      <br />
      <br />
      {exiterUser
        ? <div>
          Nome: {user?.name} <br />
          Biografia: {user?.bio} <br />
          <img src={user?.avatar_url} />
        </div>
        : ''
      }
    </div>


  );
}

export default App;
