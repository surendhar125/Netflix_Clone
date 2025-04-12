
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify'
import TvShows from './pages/TvShows/TvShows'
import Movies from './pages/Movies/Movies'
import ByLanguage from './pages/ByLanguage/ByLanguage'
import Children from './pages/Children/Children'

function App() {

  const navigate = useNavigate();
  const location =useLocation();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        if (location.pathname === '/login' || location.pathname === '/') {
          navigate('/');
        }
      } else {
        if (location.pathname !== '/login') {
          navigate('/login');
        }
        navigate('/')
      }
    })
  },[])
  return (
    <>
      <ToastContainer theme='dark'/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/player/:id" element={<Player/>} />
      <Route path="/tvshows" element={<TvShows/>} />
      <Route path="/movies" element={<Movies/>} />
      <Route path="/language" element={<ByLanguage/>} />
      <Route path="/children" element={<Children/>} />
      <Route path="*" element={<NotFound/>} />

    </Routes>
    </>
  )
}

export default App
