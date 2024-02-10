<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Models\Task;
use App\Models\User;
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
        $allTasks = Task::all();
        return response([
            'allTasks' => $allTasks
        ]);
    }

}