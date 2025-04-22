export interface User {
  _id: string;
  name: string;
  email: string;
  /*se deben cambiar los nombres de los types created_at y updated_at a
createdAt
Type:string
Format:date-time
the date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z

updatedAt
Type:string
Format:date-time
the date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z

ya que son los que espera la api
  */
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  user: User;
  /*se deben cambiar los nombres de los types created_at y updated_at a
createdAt
Type:string
Format:date-time
the date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z

updatedAt
Type:string
Format:date-time
the date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z

ya que son los que espera la api
  */
  createdAt: string;
  updatedAt: string;
}

/*se deben cambiar los string del enum, antes estaban así
export enum TaskStatus {
TODO = "todo",
IN_PROGRESS = "in_progress",
DONE = "done",
}
y la api los espera asi
pending
in_progress
completed
*/
export enum TaskStatus {
  TODO = "pending",
  IN_PROGRESS = "in_progress",
  DONE = "completed",
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status?: TaskStatus;
  user: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  user?: string;
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

export interface MoveTaskRequest {
  userId: string;
}
