<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          My Tasks
        </h1>
      </div>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <KanbanComponent
        id="kanban"
        :dataSource="myTasks"
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
import { computed, onMounted, ref } from "vue";
import store from "@/store";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-vue-kanban";

const user = computed(() => store.state.user.data);
const userParsed = JSON.parse(user.value);
const myTasks = ref([]);

const cardSettings = {
  contentField: "Summary",
  headerField: "Id",
};

const swimLaneSettings = {
  keyField: "Assignee",
};

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
  axiosClient.get(`/getMytasks/${userParsed.id}`).then((res) => {
    console.log(res.data.myTasks);
    myTasks.value = transformTasks(res.data.myTasks);
    console.log("From my tasks ref: ", myTasks.value);
  });
});
</script>
