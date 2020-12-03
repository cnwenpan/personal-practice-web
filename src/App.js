import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Layout from './layout'

export default function BasicExample() {
  return (
      <Router>
        <Layout>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
            </Switch>
        </Layout>
      </Router>
  );
}


function Home() {
  return (
      <div>
        <h2>Home</h2>
      </div>
  );
}

function About() {
  return (
      <div>
        <h2>About</h2>
      </div>
  );
}

function Dashboard() {
  return (
      <div>
        <h2>Dashboard</h2>
      </div>
  );
}
