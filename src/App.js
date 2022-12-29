import "./App.css";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
//import Welcome from "./pages/Welcome.tsx";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: '#22AA6F'
    },
    secondary: {
      main: '#212529'
    }
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Routes>
            {/* <Route path="/" element={<Welcome />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Register />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
