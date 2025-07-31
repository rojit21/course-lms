'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Search,
  Filter,
  MoreVertical,
  Users,
  DollarSign,
  Star,
  Calendar,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  duration: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  instructor: string;
  isPublished: boolean;
  createdAt: Date;
  students: number;
  rating: number;
  revenue: number;
}

export default function CoursesManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'All Categories',
    'AI for Creators',
    'ChatGPT',
    'Generative AI',
    'Content Creation',
    'Digital Marketing',
    'Business Strategy'
  ];

  // Mock data - replace with API call
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'AI for Content Creators: From Zero to Hero',
        description: 'Master AI tools to create engaging content, automate workflows, and build a loyal audience.',
        price: 99,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
        duration: '8 hours',
        difficulty: 'BEGINNER',
        category: 'AI for Creators',
        instructor: 'Sarah Johnson',
        isPublished: true,
        createdAt: new Date('2024-01-15'),
        students: 1247,
        rating: 4.8,
        revenue: 124700
      },
      {
        id: '2',
        title: 'ChatGPT Mastery: Advanced Prompting Techniques',
        description: 'Learn advanced ChatGPT techniques to create compelling content, solve complex problems, and boost productivity.',
        price: 79,
        image: 'https://images.unsplash.com/photo-1676299251950-8d7593b9d6c6?w=400&h=250&fit=crop',
        duration: '6 hours',
        difficulty: 'INTERMEDIATE',
        category: 'ChatGPT',
        instructor: 'Mike Chen',
        isPublished: true,
        createdAt: new Date('2024-02-01'),
        students: 2156,
        rating: 4.9,
        revenue: 172480
      },
      {
        id: '3',
        title: 'Generative AI Fundamentals',
        description: 'Understand the core concepts of generative AI and how to leverage them for creative projects.',
        price: 129,
        image: 'https://images.unsplash.com/photo-1673187733777-4d8d7c0c8c8c?w=400&h=250&fit=crop',
        duration: '10 hours',
        difficulty: 'ADVANCED',
        category: 'Generative AI',
        instructor: 'Dr. Emily Rodriguez',
        isPublished: false,
        createdAt: new Date('2024-02-15'),
        students: 0,
        rating: 0,
        revenue: 0
      }
    ];

    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
    setIsLoading(false);
  }, []);

  // Filter courses
  useEffect(() => {
    const filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || 
                           (selectedStatus === 'published' && course.isPublished) ||
                           (selectedStatus === 'draft' && !course.isPublished);
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedStatus, selectedCategory]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER':
        return 'bg-green-500';
      case 'INTERMEDIATE':
        return 'bg-yellow-500';
      case 'ADVANCED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER':
        return 'Beginner';
      case 'INTERMEDIATE':
        return 'Intermediate';
      case 'ADVANCED':
        return 'Advanced';
      default:
        return difficulty;
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCourses(courses.filter(course => course.id !== courseId));
        toast.success('Course deleted successfully');
      } catch (error) {
        toast.error('Failed to delete course');
      }
    }
  };

  const handleTogglePublish = async (courseId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCourses(courses.map(course => 
        course.id === courseId 
          ? { ...course, isPublished: !course.isPublished }
          : course
      ));
      
      const course = courses.find(c => c.id === courseId);
      toast.success(`Course ${course?.isPublished ? 'unpublished' : 'published'} successfully`);
    } catch (error) {
      toast.error('Failed to update course status');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!session || (session.user?.role !== 'CREATOR' && session.user?.role !== 'ADMIN')) {
    router.push('/auth/login');
    return null;
  }

  const totalRevenue = courses.reduce((sum, course) => sum + course.revenue, 0);
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const publishedCourses = courses.filter(course => course.isPublished).length;
  const draftCourses = courses.filter(course => !course.isPublished).length;

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Course Management</h1>
            <p className="text-gray-400">Manage and monitor all your courses</p>
          </div>
          <Link href="/admin/create-course" className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create New Course
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Students</p>
                <p className="text-2xl font-bold mt-1">{totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Published</p>
                <p className="text-2xl font-bold mt-1">{publishedCourses}</p>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Drafts</p>
                <p className="text-2xl font-bold mt-1">{draftCourses}</p>
              </div>
              <EyeOff className="h-8 w-8 text-yellow-400" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="glass rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category === 'All Categories' ? 'all' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <span className="text-sm text-gray-400">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden group"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image || '/api/placeholder/400/250'}
                  alt={course.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.isPublished 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-black'
                  }`}>
                    {course.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {getDifficultyText(course.difficulty)}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-red-600 text-white font-medium">
                    ${course.price}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-400 font-medium">{course.category}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-center">
                    <div className="text-gray-400">Students</div>
                    <div className="font-semibold">{course.students}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">Revenue</div>
                    <div className="font-semibold">${course.revenue.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">Duration</div>
                    <div className="font-semibold">{course.duration}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link 
                    href={`/admin/courses/${course.id}`}
                    className="flex-1 btn-secondary text-sm text-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Link>
                  <Link 
                    href={`/admin/courses/${course.id}/edit`}
                    className="flex-1 btn-secondary text-sm text-center"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(course.id)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      course.isPublished 
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {course.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or create your first course</p>
            <Link href="/admin/create-course" className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Course
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
} 