import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { getUserLogged, putAccessToken } from './utils/api';
import LoginPage from './pages/login';
import SignUpPage from './pages/registration';
import NoteList from './components/NoteList';
import NoteDetailPage from './pages/detail';
import NewNotePage from './pages/new';
import { ThemeContext } from './context/theme';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      if (data) {
        setAuthedUser(data);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
    navigate('/');
  };

  const onLogout = () => {
    putAccessToken('');
    setAuthedUser(null);
    navigate('/login');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (authedUser === null) {
    return (
      <div className={`app-container ${theme}`}>
        <header>
          <h1>Reyy Library</h1>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="*" element={<LoginPage loginSuccess={onLoginSuccess} />} /> 
            {/* Redirect semua rute ke halaman login jika belum otentikasi */}
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1>Reyy Library</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new">Add Note</Link>
          <button onClick={onLogout}>Logout</button>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/notes/:noteId" element={<NoteDetailPage />} />
          <Route path="/new" element={<NewNotePage />} />
          <Route path="*" element={<NoteList />} /> 
          {/* Redirect ke home jika halaman tidak ditemukan */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
