import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Header from "./components/Header/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Landing from "./components/LandingPage/Landing";
// import Profile from "./components/ProfileScreen/Profile";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";
import Verify from "./components/Verification/Verify";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/verify" component={Verify} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
