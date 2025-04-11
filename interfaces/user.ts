interface UserUnit {
  unit: string;
  status: string;
}

interface UserActivity {
  activity_id: string;
  status: string;
}

export default interface User {
  id?: string;
  email: string;
  fullName: string;
  activities?: UserActivity[];
  units?: UserUnit[];
  comments: string[];
}
