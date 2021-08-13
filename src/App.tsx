import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Content } from "./components/Content/Content";
import { Nav } from "./components/Nav/Nav";
import { MatchDetails } from "./pages/matches/MatchDetails/MatchDetails";
import { MatchList } from "./pages/matches/MatchList/MatchList";
import { PlayerList } from "./pages/players/PlayerList/PlayerList";
import { ServerList } from "./pages/servers/ServerList/ServerList";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <>
          <Nav />
          <Content>
            <Switch>
              <Route path="/matches" component={MatchList} />
              <Route path="/matches/:matchIds" component={MatchDetails} />
              <Route path="/players" component={PlayerList} />
              <Route path="/servers" component={ServerList} />
            </Switch>
          </Content>
        </>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
