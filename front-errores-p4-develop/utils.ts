import {
  CreateTaskRequest,
  CreateUserRequest,
  MoveTaskRequest,
  Task,
  TaskStatus,
  UpdateTaskRequest,
  UpdateTaskStatusRequest,
  UpdateUserRequest,
  User,
} from "./types.ts";
import { API_URL } from "./config.ts";

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error (${response.status}): ${errorText}`);
  }
  return await response.json() as T;
}

/*se deben añadir las lineas de  const data = await handleResponse<{ success: boolean; data: User[] }>(
  response,
);
return Array.isArray(data.data) ? data.data : [];

debido a que en la plantilla de handleResponse se debe especificar lo que devuelve la api que es un campo success para comprobar si la petición ha ido bien y un campo data con los datos recibidos y en el return comprobar con Array.isArray si el array de data es un array para acceder a la propiedad data que es un array de User o de lo contrario devolver un array vacio*/
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/api/users/`);
  const data = await handleResponse<{ success: boolean; data: User[] }>(
    response,
  );
  return Array.isArray(data.data) ? data.data : [];
}

export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/${id}`);
  return handleResponse<User>(response);
}

export async function createUser(userData: CreateUserRequest): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse<User>(response);
}

/*para esta llamada a la api se debe pasar el method:"PUT" antes estaba el method:"DELETE"*/
export async function updateUser(
  id: string,
  userData: UpdateUserRequest,
): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse<User>(response);
}

/*para esta llamada a la api se debe pasar el method:"DELETE" antes estaba el method:"PUT"*/
export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: "DELETE",
  });
  await handleResponse<void>(response);
}

/*se deben añadir las lineas de const data = await handleResponse<{ success: boolean; data: Task[] }>(
  response,
);

return Array.isArray(data.data) ? data.data : [];

debido a que en la plantilla de handleResponse se debe especificar lo que devuelve la api que es un campo success para comprobar si la petición ha ido bien y un campo data con los datos recibidos y en el return comprobar con Array.isArray si el array de data es un array para acceder a la propiedad data que es un array de Task o de lo contrario devolver un array vacio*/
export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/api/tasks/`);
  const data = await handleResponse<{ success: boolean; data: Task[] }>(
    response,
  );

  return Array.isArray(data.data) ? data.data : [];
}

export async function fetchTask(id: string): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`);
  return handleResponse<Task>(response);
}

export async function createTask(taskData: CreateTaskRequest): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse<Task>(response);
}

/*para esta llamada a la api se debe pasar el method:"PUT" antes estaba el method:"DELETE"*/
export async function updateTask(
  id: string,
  taskData: UpdateTaskRequest,
): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse<Task>(response);
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });
  await handleResponse<void>(response);
}

export async function updateTaskStatus(
  id: string,
  status: UpdateTaskStatusRequest,
): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status),
  });
  return handleResponse<Task>(response);
}

export async function moveTask(id: string, userId: string): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}/move`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  return handleResponse<Task>(response);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString();
}

/*para esta llamada a la api se deben cambiar los nombres de los enums, ya que antes estaban asi
[TaskStatus.PENDING]: [],
[TaskStatus.IN_PROGRESS]: [],
[TaskStatus.COMPLETED]: [],
y segun los types del archivo deben ser TODO, IN_PROGRESS, DONE
*/
export function groupTasksByStatus(tasks: Task[]): Record<TaskStatus, Task[]> {
  const grouped: Record<TaskStatus, Task[]> = {
    [TaskStatus.TODO]: [],
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.DONE]: [],
  };

  for (const task of tasks) {
    grouped[task.status].push(task);
  }

  return grouped;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUserForm(data: CreateUserRequest): string | null {
  if (!data.name || data.name.trim() === "") {
    return "Name is required";
  }

  if (!data.email || data.email.trim() === "") {
    return "Email is required";
  }

  if (!isValidEmail(data.email)) {
    return "Email format is invalid";
  }

  return null;
}

export function validateTaskForm(data: CreateTaskRequest): string | null {
  if (!data.title || data.title.trim() === "") {
    return "Title is required";
  }

  if (!data.user) {
    return "User assignment is required";
  }

  return null;
}
