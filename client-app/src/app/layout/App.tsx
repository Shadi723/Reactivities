import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Header, Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import Navbar from "../../features/nav/navbar";
import "./styles.css";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [Activities, setActivities] = useState<IActivity[]>([]);
  const [SelectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(Activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...Activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([
      ...Activities.filter((a) => a.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...Activities.filter((a) => a.id !== id)]);
  };

  useEffect(() => {
    Axios.get<IActivity[]>("http://localhost:5000/Activities").then(
      (response) => {
        response.data.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          Activities.push(activity);
        });
        setActivities(response.data);
      }
    );
    return () => {
      setActivities([]);
    };
  }, []);

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
        />
      </Container>
    </React.Fragment>
  );
};

export default App;
