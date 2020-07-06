import React, { SyntheticEvent } from "react";
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
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submiting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  Activities,
  selectActivity,
  SelectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
  submiting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          submiting = {submiting}
          Activities={Activities}
          deleteActivity={deleteActivity}
          selectActivity={selectActivity}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectActivity && !editMode && (
          <ActivityDetails
            SelectedActivity={SelectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            submiting = {submiting}
            setEditMode={setEditMode}
            SelectedActivity={SelectedActivity}
            createActivity={createActivity}
            editActivity={editActivity}
            key={SelectedActivity ? SelectedActivity.id : uuid()}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
