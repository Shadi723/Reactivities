import { IActivity } from "./../models/activity";
import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";

configure({ enforceActions: "always" });
class ActivityStore {
  @observable activitiesMap = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial: boolean = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode: boolean = false;
  @observable submiting: boolean = false;
  @observable target: string = "";

  @computed get activitiesByDate() {
    return Array.from(this.activitiesMap.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action unHookActivities = () => {
    this.activitiesMap = new Map();
  };

  @action loadActivity = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activitiesMap.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (e) {
      runInAction(() => {
        console.log(e);
        this.loadingInitial = false;
      });
    }
  };

  @action async createActivity(activity: IActivity) {
    this.submiting = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activitiesMap.set(activity, activity);
        this.editMode = false;
        this.submiting = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.submiting = false;
      });
    }
  }
  @action async editActivity(activity: IActivity) {
    this.submiting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activitiesMap.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submiting = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.submiting = false;
      });
    }
  }

  @action async deleteActivity(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    this.submiting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activitiesMap.delete(id);
        this.target = "";
        this.submiting = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.submiting = false;
        this.target = "";
      });
    }
  }

  @action openCreateForm() {
    this.editMode = true;
    this.selectedActivity = undefined;
  }

  @action openEditForm() {
    // this.selectedActivity = this.activities.find(e => e.id === id);
    this.editMode = true;
  }

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activitiesMap.get(id);
    this.editMode = false;
  };

  @action cancelForm = () => {
    this.editMode = false;
    this.selectedActivity = undefined;
  };
}

export default createContext(new ActivityStore());
