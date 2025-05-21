import {Routes, Route, Outlet, Navigate} from 'react-router';
import ExplorePage from './components/pages/ExplorePage';
import UserProfile from './components/pages/UserProfile';
import PostPage from './components/pages/PostPage';
import PostForm from './components/pages/PostForm';
import NoPage from './components/pages/NoPage';
import LoginForm from './components/pages/authorization/LoginForm';
import SettingsPage from './components/pages/settings/SettingsPage';
import SignUpForm from './components/pages/authorization/SignUpForm';

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      <Route path="/search=:keyword" element={<ExplorePage />} />
      <Route path="/explore" element={<Navigate to="/" />} />

      <Route path="/login" element={<LoginForm />} />
      <Route path="/sign-up" element={<SignUpForm />} />

      <Route path="/user/:params" element={<UserProfile />} />
      <Route path="/post/:id" element={<PostPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/post/create" element={<PostForm />} />
        <Route path="/post/update/:id" element={<PostForm />} />
      </Route>

      <Route path="*" element={<NoPage />} />
    </Routes>
    </>
  );
}

const ProtectedRoute = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
}