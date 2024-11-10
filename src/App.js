import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route } from 'react-router-dom'
import Register from "./components/Register";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Profile from "./components/Profile";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/write" element={<CreatePost />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
          <Route exact path="/posts/post/:id" element={<PostDetails />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
        <Footer/>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
