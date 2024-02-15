import axiosClient from "@/axios";
import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      data: localStorage.getItem("user"),
      token: sessionStorage.getItem("TOKEN"),
    },
    task: {},
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },
    createTask({ commit }, task) {
      return axiosClient.post("/createTask", task).then(({ data }) => {
        return data;
      });
    },
    getTask({ commit }, taskId) {
      return axiosClient.get(`/getTask/${taskId}`).then(({ data }) => {
        commit("setTask", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((res) => {
        commit("logout");
        return res;
      });
    },
    updateTask({ commit }, taskData) {
      return axiosClient
        .put(`/task/updateTask/${taskData.id}`, taskData)
        .then(({ data }) => {
          console.log(data);
          // return data;
        });
    },
    deleteTask({ commit }, id) {
      console.log(id);
      return axiosClient.delete(`/deleteTask/${id}`).then(({ data }) => {
        console.log(data);
        return data;
      });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      // console.log("We are on set User", userData);
      sessionStorage.setItem("TOKEN", userData.token);
      state.user.token = userData.token;
      state.user.data = userData.data;
      // localStorage.setItem("user", userData);
      localStorage.setItem("user", JSON.stringify(userData));
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem("TOKEN", token);
    },
    setTask: (state, data) => {
      state.task = data;
    },
  },
  modules: {},
});

export default store;
