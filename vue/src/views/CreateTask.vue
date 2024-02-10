<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Create Task
      </h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <form @submit="createTask">
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Create a tasks
            </h2>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Name of the task</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    autocomplete="given-name"
                    v-model="task.name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <label
                    for="user"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Select User</label
                  >
                  <select
                    v-model="task.user_id"
                    id="user"
                    name="user"
                    required
                    autocomplete="user-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option
                      v-for="user in allUsers"
                      :key="user.id"
                      :value="user.id"
                    >
                      {{ user.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="sm:col-span-6">
                <label
                  for="description"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Description</label
                >
                <div class="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    v-model="task.description"
                    class="block p-2.5 w-full text-sm text-black-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-black-100 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="dueDate"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Task Due Date</label
                >
                <div class="mt-2">
                  <input
                    id="task-date"
                    type="date"
                    name="dueDate"
                    required
                    v-model="task.due_date"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="status"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Status</label
                >
                <div class="mt-2">
                  <select
                    id="status"
                    name="status"
                    autocomplete="user-name"
                    v-model="task.status"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="completed">Complete</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import axiosClient from "@/axios";
import store from "@/store";
import { ref, onMounted } from "vue";

const allUsers = ref([]);
const selectedUser = ref(null);

const task = ref({
  name: "",
  user_id: null,
  description: "",
  due_date: "",
  status: "",
});

onMounted(async () => {
  try {
    const users = await fetchAllUsers();
    // console.log(users);
    allUsers.value = users.allUsers;
    console.log(allUsers.value);
  } catch (err) {
    console.log(err);
  }
});

const fetchAllUsers = async () => {
  try {
    const users = await axiosClient.get("/getAllUsers");
    return users.data;
  } catch (err) {
    console.log(err);
  }
};

function createTask(e) {
  e.preventDefault();

  const { user_id, name, description, due_date, status } = task.value;

  const taskData = {
    user_id,
    name,
    description,
    due_date,
    status,
  };

  console.log(taskData);

  store
    .dispatch("createTask", taskData)
    .then((res) => {
      console.log("a jemi npik");
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<style lang="scss" scoped></style>
