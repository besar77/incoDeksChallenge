<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          All Tasks
        </h1>

        <router-link
          :to="{ name: 'createTask' }"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >Create task</router-link
        >
      </div>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <KanbanComponent
        id="kanban"
        :dataSource="allTasks"
        keyField="Status"
        :cardSettings="cardSettings"
        :swimlaneSettings="swimLaneSettings"
        @cardClick="handleCardClick"
      >
        <ColumnsDirective>
          <ColumnDirective
            headerText="Pending"
            keyField="pending"
          ></ColumnDirective>
          <ColumnDirective
            headerText="Completed"
            keyField="completed"
          ></ColumnDirective>
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  </main>
</template>

<script setup>
import axiosClient from "@/axios";
import store from "@/store";
import { computed, onMounted, ref } from "vue";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-vue-kanban";

import { useRouter } from "vue-router";
const router = useRouter();

const cardSettings = {
  contentField: "Summary",
  headerField: "Id",
};

const swimLaneSettings = {
  keyField: "Assignee",
};

const allTasks = ref([]);

function transformTasks(originalTasks) {
  return originalTasks.map((task) => ({
    Id: task.id,
    Status: task.status,
    Summary: task.name,
    Description: task.description,
    EndDate: task.due_date,
    UserId: task.user_id,
    Assignee: task.user.name,
  }));
}

onMounted(async () => {
  try {
    const tasks = await fetchAllTasks();
    allTasks.value = transformTasks(tasks.data.allTasks);
    console.log(allTasks.value);
  } catch (err) {
    console.log(err);
  }
});

const fetchAllTasks = async () => {
  try {
    const allTasks = await axiosClient.get("/allTasks");
    return allTasks;
  } catch (err) {
    console.log(err);
  }
};

const handleCardClick = (args) => {
  const taskId = args.data.Id;
  router.push({
    name: "deleteUpdateTask",
    params: { id: taskId },
  });
};
</script>

<style>
@import "@syncfusion/ej2-bootstrap5-theme/styles/bootstrap5.css";
</style>
