import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { v4 as uuid } from "uuid";

interface IProps {
  Activities: IActivity[];
  selectActivity: (id: string) => void;
  SelectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({ Activities, selectActivity, SelectedActivity, editMode, setEditMode, setSelectedActivity, createActivity, editActivity, deleteActivity }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList Activities={Activities}
          deleteActivity = {deleteActivity}
          selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectActivity && !editMode && <ActivityDetails
          SelectedActivity={SelectedActivity}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
        />}
        {editMode &&
          <ActivityForm
            setEditMode={setEditMode}
          SelectedActivity={SelectedActivity}
          createActivity={createActivity}
          editActivity={editActivity}
          key={SelectedActivity? SelectedActivity.id : uuid()}
          />}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
