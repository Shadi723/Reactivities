import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProp {
  SelectedActivity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}
const ActivityDetails: React.FC<IProp> = ({
  SelectedActivity,
  setEditMode,
  setSelectedActivity,
}) => {
  return SelectedActivity !== null ? (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${SelectedActivity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{SelectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{SelectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>{SelectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => setEditMode(true)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => setSelectedActivity(null)}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  ) : null;
};
export default ActivityDetails;
