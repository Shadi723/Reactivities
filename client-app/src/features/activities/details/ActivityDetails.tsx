import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import activityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDetails: React.FC = () => {
  const ActivityStore = useContext(activityStore);
  const { selectedActivity } = ActivityStore;
  return selectedActivity !== undefined ? (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => ActivityStore.openEditForm()}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => ActivityStore.selectActivity("")}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  ) : null;
};
export default observer(ActivityDetails);
