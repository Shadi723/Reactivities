import React, { useState, useEffect, SyntheticEvent, useContext } from "react";
import { Header, Container } from "semantic-ui-react";
import Navbar from "../../features/nav/navbar";
import "./styles.css";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import activityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {

  const ActivityStore = useContext(activityStore);








  useEffect(() => {
    ActivityStore.loadActivity();
    return () => {
      ActivityStore.unHookActivities();
    };
  }, [ActivityStore]);

  if (ActivityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities" />;

  return (
    <React.Fragment>
      <Header as="h2">
        <Navbar/>
      </Header>
      <Container style={{ marginTop: "70px" }}>
        <ActivityDashboard />
      </Container>
    </React.Fragment>
  );
};

export default observer(App);
