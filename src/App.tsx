import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Content } from "./components/Content/Content";
import { Nav } from "./components/Nav/Nav";
import { MatchList } from "./pages/matches/MatchList/MatchList";
import { PlayerList } from "./pages/players/PlayerList/PlayerList";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <>
        <Nav />
        <Content>
          <Switch>
            <Route path="/matches" component={MatchList} />
            <Route path="/players" component={PlayerList} />
          </Switch>
        </Content>
      </>
    </BrowserRouter>
  );
};
