<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function getAllUsers(){
        $allUsers = User::all(['name', 'last_name', 'id']);

        return response([
            'allUsers' => $allUsers
        ]);
    }

    public function createTask(CreateTaskRequest $request)
    {

        // return $request->all();

        $data = $request->validated();
        Task::create($data);
        return response()->json(['message' => 'Task created successfully'], 201);
    }

    public function getAllTasks()
    {
        $allTasks = Task::with('user')->get();
        return response([
            'allTasks' => $allTasks
        ]);
    }

    public function getTask(string $id){
        $task = Task::with('user')->findOrFail($id);
        $task->due_date = Carbon::parse($task->due_date)->format('Y-m-d');

        $allUsers = User::all(['name', 'last_name', 'id']);
        return response(['task' => $task, 'allUsers' => $allUsers]);
    }

    public function updateTask(CreateTaskRequest $request, string $id){

        $data = $request->validated();
        $task = Task::findOrFail($id);
        $task->update($data);
        return response()->json(['message' => 'Task updated successfully']);
    }

    public function deleteTask(string $id)
    {
        try {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
        }catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete task'], 500);
        }
    }

}
