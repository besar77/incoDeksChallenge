import axiosClient from "@/axios";
import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data.user);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data.user);
        return data;
      });
    },
  },
  mutations: {
    setUser: (state, userData) => {
      sessionStorage.setItem("TOKEN", userData.token);
      state.user.token = userData.token;
      state.user.data = userData.data;
    },
  },
  modules: {},
});

export default store;
