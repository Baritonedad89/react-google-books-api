
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/api/books" component={Books} />
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

