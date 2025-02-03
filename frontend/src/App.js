import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import About from "./components/About/About.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Login from "./components/Login/Login.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadUser } from "./actions/user.js";
import AdminPanel from "./components/Admin/AdminPanel.jsx";
import Timeline from "./components/Admin/Timeline.jsx";
import Project from "./components/Admin/Project.jsx";
import Loader from "./components/Loader/Loader.jsx";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.login);
  const { loading, user } = useSelector((state) => state.user);

  // Load user and fetch data on component mount
  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch]);

  // Guard for conditional rendering and data checks
  const renderProtectedRoute = (component) =>
    isAuthenticated ? component : <Login />;

  return (
    <Router
      future={{
        v7_startTransition: true, // Opting into `startTransition` feature for smoother updates
        v7_relativeSplatPath: true, // Future-proofing relative path handling
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  timelines={user?.timeline || []} // Safeguard against `undefined` user
                  skills={user?.skills || []}
                />
              }
            />
            <Route
              path="/about"
              element={<About about={user?.about || "No information available"} />}
            />
            <Route
              path="/projects"
              element={<Projects projects={user?.projects || []} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={renderProtectedRoute(<AdminPanel />)} />
            <Route
              path="/admin/timeline"
              element={renderProtectedRoute(<Timeline />)}
            />
            <Route
              path="/admin/project"
              element={renderProtectedRoute(<Project />)}
            />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
