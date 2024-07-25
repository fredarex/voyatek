export type User = {
    id: string;
    name: string;
    role: string;
    email: string;
    password: string;
    
  };
  
  export interface Users {
      users: User[]
  }