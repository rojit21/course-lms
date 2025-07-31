export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: 'USER' | 'ADMIN' | 'LEARNER' | 'CREATOR';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  introVideo?: string;
  duration: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  instructor: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  lessons?: Lesson[];
  enrollments?: Enrollment[];
  rating?: number;
  students?: number;
  lessonsCount?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  duration: number; // in minutes
  order: number;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // percentage completed
  user?: User;
  course?: Course;
  lessonProgress?: Progress[];
  payment?: Payment;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  enrollmentId: string;
  isCompleted: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  courseId?: string;
  enrollmentId?: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paymentMethod: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: 'LEARNER' | 'CREATOR';
}

export interface CourseFilters {
  category?: string;
  difficulty?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  monthlyRevenue: number;
} 