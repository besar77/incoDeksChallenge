<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Update or Delete Task
        </h1>
        <button
          class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          type="button"
          @click="toggleOpenShouldDelete"
        >
          Toggle modal
        </button>
      </div>
    </div>
  </header>
  <main>
    <div v-if="isOpenModal">
      <UpdateDeleteModal @closeModal="closeModal" @deleteTask="deleteTask" />
    </div>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <form @submit="update">
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
                    v-model="task.name"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <label
                    for="user"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select User
                  </label>
                  <select
                    id="user"
                    name="user"
                    required
                    autocomplete="user-name"
                    v-model="task.user_id"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option
                      v-for="user in allUsers"
                      :key="user.id"
                      :value="user.id"
                      :selected="user.id === task.user_id"
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
                    class="block p-2.5 w-full text-sm text-black-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-black-100 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    v-model="task.description"
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
                >
                  Status
                </label>
                <div class="mt-2">
                  <select
                    id="status"
                    name="status"
                    v-model="task.status"
                    autocomplete="user-name"
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
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axiosClient from "@/axios";
import store from "@/store";
import { useRouter } from "vue-router";

import UpdateDeleteModal from "@/components/UpdateDeleteModal.vue";

const router = useRouter();

const route = useRoute();

const allUsers = ref([]);
const task = ref({});

let isOpenModal = ref(false);

function toggleOpenShouldDelete() {
  isOpenModal.value = true;
}

const closeModal = () => {
  isOpenModal.value = false;
};

onMounted(async () => {
  try {
    const res = await fetchTaskAndUsers();
    allUsers.value = res.data.allUsers;
    task.value = res.data.task;
    console.log(res.data.task);
  } catch (err) {
    console.log(err);
  }
});

const fetchTaskAndUsers = async () => {
  try {
    const res = await axiosClient.get(`/getTask/${route.params.id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

function update(e) {
  e.preventDefault();
  const { id, user_id, name, description, due_date, status } = task.value;
  const taskData = {
    id,
    user_id,
    name,
    description,
    due_date,
    status,
  };

  //   console.log(taskData.id);

  store.dispatch("updateTask", taskData).then((res) => {
    window.location.reload();
  });
}

function deleteTask(e) {
  // console.log("We are on delete");

  e.preventDefault();
  const id = route.params.id;

  store.dispatch("deleteTask", id).then(() => {
    router.push({ name: "home" });
  });
}
</script>

<style lang="scss" scoped></style>
