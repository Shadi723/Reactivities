import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import activityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityForm: React.FC = () => {
  const ActivityStore = useContext(activityStore);
  const { selectedActivity } = ActivityStore;
  const initForm = () => {
    if (selectedActivity) return selectedActivity;
    else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setActivity({
      ...activity,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      ActivityStore.createActivity(newActivity);
    } else ActivityStore.editActivity(activity);
  };

  const [activity, setActivity] = useState<IActivity>(initForm);

  return (
    <Segment clearing>
      <Form>
        <Form.Input
          placeholder="Title"
          name="title"
          value={activity.title}
          onChange={handleChange}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          value={activity.description}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={activity.category}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Date"
          name="date"
          type="datetime-local"
          value={activity.date}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={activity.city}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={activity.venue}
          onChange={handleChange}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          onClick={handleSubmit}
          loading={ActivityStore.submiting}
        />
        <Button
          floated="right"
          negative
          type="button"
          content="Cancel"
          onClick={() => ActivityStore.cancelForm()}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
