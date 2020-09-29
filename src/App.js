import React, { useEffect, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

const Page1 = () => {
  const { handleSubmit, register } = useForm();
  const [formData, setFormData] = useState(undefined);
  const [isLoading, setLoading] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { user, setUser, setSession } = React.useContext(AuthContext);

  const onSubmit = async (data) => {
    console.log("data", data);
    setFormData(data);
  };
  useEffect(() => {
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function login() {
      if (formData) {
        setLoading(true);
        await timeout(1000);
        setSession({ id: 1 });
        await timeout(1000);
        setUser({ name: "Kevin" });
        setLoading(false);
      }
    }

    login();
  }, [setSession, setUser, formData]);

  if (user) {
    return <Redirect to={"/2"} />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" ref={register} />
        <input type="submit" />
      </form>
    </div>
  );
};

const Page2 = () => {
  return <div>Page 2</div>;
};

export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(undefined);
  const [session, setSession] = useState(undefined);

  return (
    <AuthContext.Provider value={{ user, setUser, session, setSession }}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Page1} />
            <Route path="/2" exact component={Page2} />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
