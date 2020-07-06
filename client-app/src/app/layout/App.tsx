import React, { useState, useEffect, SyntheticEvent } from "react";
import Axios from "axios";
import { Header, Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import Navbar from "../../features/nav/navbar";
import "./styles.css";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [Activities, setActivities] = useState<IActivity[]>([]);
  const [SelectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [submiting, setSubmiting] = useState(false);

  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(Activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmiting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...Activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmiting(false));
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmiting(true);

    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...Activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmiting(false));
  };

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmiting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...Activities.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmiting(false));
  };

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        response.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          Activities.push(activity);
        });
        setActivities(response);
      })
      .then(() => setLoading(false));
    return () => {
      setActivities([]);
    };
  }, []);

  if (loading) return <LoadingComponent content="Loading Activities" />;

  return (
    <React.Fragment>
      <Header as="h2">
        <Navbar openCreateForm={handleOpenCreateForm} />
      </Header>
      <Container style={{ marginTop: "70px" }}>
        <ActivityDashboard
          Activities={Activities}
          selectActivity={handleSelectActivity}
          SelectedActivity={SelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submiting={submiting}
          target= {target}
        />
      </Container>
    </React.Fragment>
  );
};

export default App;
