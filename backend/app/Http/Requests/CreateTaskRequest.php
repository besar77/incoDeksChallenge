<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => [
                'required',
                'exists:users,id',
            ],
            'name' => 'required|string',
            'description' => 'nullable|string',
            'due_date' => [
                'required',
                'date',
                'after_or_equal:' . now()->toDateString(), // Ensure due_date is today or later
            ],
            'status' => [
                'required',
                Rule::in(['completed', 'pending']),
            ],
        ];
    }
}
