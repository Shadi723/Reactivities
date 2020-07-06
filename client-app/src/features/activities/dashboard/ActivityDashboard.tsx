import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { v4 as uuid } from "uuid";
import activityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDashboard: React.FC = () => {
  const ActivityStore = useContext(activityStore);
  const { editMode, selectedActivity } = ActivityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm key={selectedActivity ? selectedActivity.id : uuid()} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
