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
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (authedUser === null) {
    return (
      <div className={`app-container ${theme} min-h-screen bg-gray-100 dark:bg-gray-900`}>
        <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 shadow-md text-white text-center rounded-b-lg">
          <h1 className="text-3xl font-extrabold">Reyy Library</h1>
        </header>
        <main className="p-6 flex justify-center items-center">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
            <Routes>
              <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            </Routes>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`app-container ${theme} min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 shadow-md text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">Reyy Library</h1>
          <nav className="space-x-6 text-lg">
            <Link to="/" className="text-white hover:text-gray-300 transition">Home</Link>
            <Link to="/new" className="text-white hover:text-gray-300 transition">Add Note</Link>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
            >
              Logout
            </button>
            <button
              onClick={toggleTheme}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
            >
              Toggle Theme
            </button>
          </nav>
        </div>
      </header>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/notes/:noteId" element={<NoteDetailPage />} />
          <Route path="/new" element={<NewNotePage />} />
          <Route path="*" element={<NoteList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
