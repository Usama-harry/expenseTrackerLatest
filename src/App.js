import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import classes from "./App.module.css";

function App() {
  const location = useLocation();
  return (
    <div className={`container ${classes.app}`}>
      <AnimatePresence>
        <Routes location={location} key={location.path}>
          <Route path="/" element={<Landing></Landing>} />
          <Route path="/auth" element={<Auth></Auth>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
