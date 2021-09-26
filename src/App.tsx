import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Content } from "./components/Content/Content";
import { Nav } from "./components/Nav/Nav";
import { MatchDetails } from "./pages/matches/MatchDetails/MatchDetails";
import { MatchList } from "./pages/matches/MatchList/MatchList";
import { PlayerList } from "./pages/players/PlayerList/PlayerList";
import { ServerList } from "./pages/servers/ServerList/ServerList";
import { LeaderList } from "./pages/leaders/LeaderList/LeaderList";
import RegiontypeState from './context/regiontype/RegiontypeState';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
  <RegiontypeState>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <>
          <Nav />
          <Content>
            <Switch>
              <Route path="/matches/all" component={MatchList} />
			  <Route exact path="/matches/server/:serverId" component={MatchList} />
			  <Route path="/matches/:matchId/:map" component={MatchDetails} />
              <Route path="/players" component={PlayerList} />
              <Route path="/servers" component={ServerList} />
			  <Route path="/leaders" component={LeaderList} />
            </Switch>
          </Content>
        </>
      </BrowserRouter>
    </QueryClientProvider>
  </RegiontypeState>
  );
};
