import { history } from "./../../index";
import { RootStore } from "./rootStore";
import { action, computed, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFromValues } from "./../models/user";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFromValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction("login user", () => {
        this.user = user;
        this.rootStore.commonStore.setToken(user.token);
        this.rootStore.modalStore.closeModal();

        history.push("activities");
      });
    } catch (err) {
      throw err;
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };

  @action register = async (values: IUserFromValues) => {
    console.log("hello");
    try {
      this.user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(this.user.token);
      this.rootStore.modalStore.closeModal();
      history.push("activities");
    } catch (err) {
      throw err;
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction("get current user", () => {
        this.user = user;
      });
    } catch (err) {
      console.log(err);
    }
  };
}
