import {Routes, Route, Outlet, Navigate} from 'react-router';
import ExplorePage from './components/pages/ExplorePage';
import UserProfile from './components/pages/UserProfile';
import PostPage from './components/pages/PostPage'
import PostForm from './components/forms/PostForm'

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<ExplorePage/>}/>
      <Route path="/:username" element={<UserProfile/>}/>
      <Route path="/post/:id" element={<PostPage/>}/>

      <Route path="/post/create" element={<PostForm/>}/>
      <Route element={<ProtectedRoute/>}>

      </Route>

      <Route path="*" element={<NoPage/>}/>
    </Routes>
    </>
  );
}

const ProtectedRoute = () => {
   /* const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn ? <Outlet/> : <Navigate to="/sign-up/"/> */
}