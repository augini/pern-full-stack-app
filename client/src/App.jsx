import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetail from "./routes/RestaurantDetail";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/restaurants/:id/update"
              component={UpdatePage}
            />
            <Route exact path="/restaurants/:id" component={RestaurantDetail} />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
