import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Content } from "./components/Content/Content";
import { Nav } from "./components/Nav/Nav";
import { MatchDetails } from "./pages/matches/MatchDetails/MatchDetails";
import { MatchList } from "./pages/matches/MatchList/MatchList";
import { Player } from "./pages/players/PlayerList/Player";
import { PlayerList } from "./pages/players/PlayerList/PlayerList";
import { ServerList } from "./pages/servers/ServerList/ServerList";
import { LeaderList } from "./pages/leaders/LeaderList/LeaderList";
import RegionTypeState from "./context/RegionTypeState";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <RegionTypeState>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <>
            <Nav />
            <Content>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/servers" />
                </Route>{" "}
                <Route exact path="/matches" component={MatchList} />
                <Route path="/matches/server/:serverId" component={MatchList} />
                <Route path="/matches/:matchId/:map" component={MatchDetails} />
                <Route exact path="/players" component={PlayerList} />
                <Route path="/player/:playerId" component={Player} />
                <Route exact path="/servers" component={ServerList} />
                <Route exact path="/leaders" component={LeaderList} />
              </Switch>
            </Content>
          </>
        </BrowserRouter>
      </QueryClientProvider>
    </RegionTypeState>
  );
};
