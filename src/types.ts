export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  rating: number;
  gender: 'male' | 'female';
  bvn: number;
  children: number;
  type_of_residence: 'Parent Apartment' | 'Own House' | 'Rented House';
  username: string;
  organization: string;
  phone: string;
  picture: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  education: {
    education_level: 'High School Diploma' | 'Bachelor Degree' | 'Master Degree' | 'PhD';
    employment_status: 'employed' | 'unemployed' | 'self-employed';
    sector: 'Technology' | 'Finance' | 'Healthcare' | 'Education';
    office_email: string;
    salary_from: number;
    salary_to: number;
    loan: number;
    duration_of_employment: number
  };
  bank: {
    account_number: string;
    bank_name: string;
  }
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullname: string;
    phone: string;
    email: string;
    relationship: 'spouse' | 'parent' | 'sibling' | 'friend';
  };
};

export interface Users {
    users: User[]
}