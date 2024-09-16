export interface userDTO {
  id: number;
  username: string;
  password: string;
  imageUrl: string;
  email: string;
  role: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  deleted_by?: Date;
  created_by?: Date;
  updated_by?: Date;
  last_login_attempt_time: string;
}



