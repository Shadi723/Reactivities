import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import activityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityList: React.FC = () => {
  const ActivityStore = useContext(activityStore);
  return (
    <Segment clearing>
      <Item.Group divided>
        {ActivityStore.activitiesByDate.map((activity) => (
          <Item>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => ActivityStore.selectActivity(activity.id)}
                />
                <Button
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={
                    ActivityStore.target === activity.id &&
                    ActivityStore.submiting
                  }
                  onClick={(e) => ActivityStore.deleteActivity(e, activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(ActivityList);
