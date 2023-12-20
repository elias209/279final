import SignInSide from "./components/Login.jsx";
import PrimarySearchAppBar from "./components/Navbar";
import SignUp from "./components/Signup.jsx";
import Album from "./components/Card.jsx";
import Likedpage from "./components/Liked.jsx";
import Comments from "./components/Comments.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Paper } from "@mui/material";
import { UserProvider } from "./context/UserContext.jsx";
import UserProfile from "./components/userProfile.jsx";
import NewsComponent from "./components/news.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#E50914",
    },
  },
});

function App() {
  const handleSignUpSuccess = (data) => {
    console.log("Sign up successful:", data);
  };

  const handleSignUpError = (error) => {
    console.error("Sign up error:", error);
  };

  return (
    <Router>
      <UserProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Paper>
            <Routes>
              <Route path={"/"} element={<SignInSide />} />
              <Route
                path={"/dashboard"}
                element={
                  <>
                    <PrimarySearchAppBar />
                    <Album />
                  </>
                }
              />
              <Route
                path={"/signup"}
                element={
                  <SignUp
                    onSignUpSuccess={handleSignUpSuccess}
                    onSignUpError={handleSignUpError}
                  />
                }
              />
              <Route
                path={"/comments"}
                element={
                  <>
                    <PrimarySearchAppBar />
                    <Comments />
                  </>
                }
              />
              <Route
                path={"/liked"}
                element={
                  <>
                    <PrimarySearchAppBar />
                    <Likedpage />
                  </>
                }
              />
              <Route
                path={"/userprofile"}
                element={
                  <>
                    <PrimarySearchAppBar />
                    <UserProfile />
                  </>
                }
              />

              <Route
                path={"/news"}
                element={
                  <>
                    <PrimarySearchAppBar />
                    <NewsComponent />
                  </>
                }
              />
            </Routes>
          </Paper>
        </ThemeProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
