import React from "react";
import { useQuery } from "react-query";
import { StatsApi } from "../../api";
import { IEventItem } from "../../api/types";
import { EventListContent } from "./EventListContent";
import { Loading } from "../../components/Loading";
import { PageTitle } from "../../components/PageTitle";

export const EventList: React.FC = () => {
  
  const { isLoading, data } = useQuery<IEventItem[]>(
    [],
    StatsApi.Events.GetEvents
  );

  return (
    <>
      <PageTitle>Events</PageTitle>
      
      <div>
        {isLoading && <Loading />}
        {data && !("error" in data) && (
          <EventListContent data={data}/>
        )}
      </div>
    </>
  );
};
