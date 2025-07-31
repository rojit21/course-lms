'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Award,
  Calendar,
  Target,
  DollarSign,
  Edit,
  Trash2,
  PlusCircle,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Enrollment, Course } from '@/types';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Add state for add course popup
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    difficulty: 'BEGINNER',
    category: '',
    introVideo: '',
    image: '',
  });
  const [courseImage, setCourseImage] = useState<string | null>(null);
  const [courseVideo, setCourseVideo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const categories = [
    'AI for Creators',
    'ChatGPT',
    'Generative AI',
    'Content Creation',
    'Digital Marketing',
    'Business Strategy',
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Design',
  ];
  const difficulties = [
    { value: 'BEGINNER', label: 'Beginner' },
    { value: 'INTERMEDIATE', label: 'Intermediate' },
    { value: 'ADVANCED', label: 'Advanced' },
  ];
  const [showTotalCourses, setShowTotalCourses] = useState(false);
  const [myCourses, setMyCourses] = useState<any[]>([]);

  // Mock data - replace with API call
  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
      return;
    }

    fetch('/api/learner/enrollments')
      .then(res => res.json())
      .then(data => {
        setEnrollments(data.enrollments || []);
        setIsLoading(false);
      });
  }, [session, status, router]);

  useEffect(() => {
    if (status === 'loading' || !session || session.user?.role !== 'CREATOR') return;
    fetch('/api/creator/courses')
      .then(res => res.json())
      .then(data => setMyCourses(data.courses || []));
  }, [status, session]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCourseImage(e.target?.result as string);
        setFormData({ ...formData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCourseVideo(e.target?.result as string);
        setFormData({ ...formData, introVideo: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/creator/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, creatorId: session?.user?.id }),
      });
      if (res.ok) {
        toast.success('Course created successfully!');
        setFormData({
          title: '', description: '', price: '', duration: '', difficulty: 'BEGINNER', category: '', introVideo: '', image: ''
        });
        setCourseImage(null);
        setCourseVideo(null);
        setShowForm(false);
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to create course.');
      }
    } catch (error) {
      toast.error('Failed to create course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this course? This action cannot be undone.')) return;
    try {
      const res = await fetch('/api/creator/delete-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        toast.success('Course removed successfully!');
        setEnrollments((prev) => prev.filter((e) => e.course?.id !== id));
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to remove course.');
      }
    } catch (error) {
      toast.error('Failed to remove course. Please try again.');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter(e => e.progress === 100).length;
  const inProgressCourses = enrollments.filter(e => e.progress > 0 && e.progress < 100).length;
  const averageProgress = enrollments.length > 0 
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {session.user.name}!</h1>
          {/* Only show Add Course button for creators */}
          {session.user.role === 'CREATOR' && (
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => setShowForm((v) => !v)}
            >
              <PlusCircle className="w-5 h-5" /> Add Course
            </button>
          )}
        </motion.div>
        {/* Add Course Form Popup */}
        {session.user.role === 'CREATOR' && showForm && (
          <div className="glass rounded-xl p-6 mb-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white" placeholder="Enter course title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white resize-none" placeholder="Describe what students will learn in this course" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (USD) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white" placeholder="e.g. 8 hours" />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white">
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty *</label>
                  <select name="difficulty" value={formData.difficulty} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white">
                    {difficulties.map((diff) => (
                      <option key={diff.value} value={diff.value}>{diff.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Thumbnail *</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
                {courseImage && <img src={courseImage} alt="Course Thumbnail" className="mt-2 w-32 h-20 object-cover rounded" />}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Intro Video *</label>
                <input type="file" accept="video/*" onChange={handleVideoUpload} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
                {courseVideo && <video src={courseVideo} controls className="mt-2 w-64 h-32 object-cover rounded" />}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Creating...' : 'Create Course'}
              </button>
            </form>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Restore the Total Courses stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Courses</p>
                <p className="text-3xl font-bold">{totalCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-red-400" />
            </div>
          </motion.div>
          {/* Keep the other stat cards as is */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold">{inProgressCourses}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-3xl font-bold">{completedCourses}</p>
              </div>
              <Award className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Progress</p>
                <p className="text-3xl font-bold">{averageProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Link href="/courses" className="btn-secondary">
              Browse More Courses
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-12 text-center"
            >
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses enrolled yet</h3>
              <p className="text-gray-400 mb-6">Start your learning journey by enrolling in your first course</p>
              <Link href="/courses" className="btn-primary">
                Explore Courses
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {enrollments.map((enrollment) => (
                <motion.div
                  key={enrollment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-6 flex flex-col"
                >
                  <div className="flex-1">
                    {enrollment.course && (
                      <>
                        <div className="relative h-32 mb-4 group cursor-pointer" onClick={() => enrollment.course && enrollment.course.introVideo && setModalCourse(enrollment.course!)}>
                          <img
                            src={enrollment.course.image || '/api/placeholder/400/250'}
                            alt={enrollment.course.title}
                            className="object-cover w-full h-32 rounded"
                          />
                          {enrollment.course.introVideo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-12 h-12 text-white drop-shadow-lg" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{enrollment.course.title}</h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">{enrollment.course.description}</p>
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>{enrollment.course.category}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <span>Difficulty: {enrollment.course.difficulty}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <span>Price: ${enrollment.course.price}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {enrollment.enrolledAt ? new Date(enrollment.enrolledAt).toLocaleDateString() : ''}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {enrollment.course && ((enrollment.course as any)?.creatorId === session.user?.id) && typeof enrollment.course.id === 'string' && (
                      <button onClick={() => handleRemove(enrollment.course.id)} className="btn-danger flex-1 flex items-center gap-1 justify-center">
                        Remove
                      </button>
                    )}
                    <Link href={`/courses/${enrollment.course?.id}`} className="btn-secondary flex-1 flex items-center gap-1 justify-center">
                      Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="glass rounded-xl p-6">
            <div className="space-y-4">
              {enrollments.length > 0 ? (
                enrollments.map((enrollment, index) => (
                  <div key={enrollment.id} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {enrollment.progress === 100 ? 'Completed' : 'Started'} {enrollment.course?.title}
                      </p>
                      <p className="text-sm text-gray-400">
                        {enrollment.progress === 100 ? 'Course completed' : `${enrollment.progress}% completed`}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {enrollment.enrolledAt ? new Date(enrollment.enrolledAt).toLocaleDateString() : ''}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Learning Goals */}
        {/* Remove the Learning Goals section (with text like 'Complete 5 courses this month', 'You're on track to achieve your goal!', '2 of 5 courses completed') and delete it. */}
      </div>
      {/* Video Modal Popup for dashboard */}
      {modalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setModalCourse(null)}>
          <div className="bg-gray-900 rounded-lg shadow-lg p-4 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-2xl" onClick={() => setModalCourse(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-white">{modalCourse.title}</h2>
            {modalCourse.introVideo && (
              modalCourse.introVideo.startsWith('http') ? (
                <iframe
                  src={modalCourse.introVideo}
                  title="Course Video"
                  className="w-full h-72 rounded mb-4"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={modalCourse.introVideo}
                  controls
                  autoPlay
                  className="w-full h-72 rounded mb-4"
                />
              )
            )}
          </div>
        </div>
      )}
      {session.user?.role === 'CREATOR' && (
        <div className="mb-8 flex justify-center">
          <button
            className="bg-gradient-to-br from-red-600 to-red-800 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-8 w-full max-w-xl flex flex-col items-center border-2 border-red-500/40 hover:border-red-500 group"
            onClick={() => setShowTotalCourses(true)}
          >
            <div className="flex items-center mb-2">
              <BookOpen className="w-8 h-8 text-white mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-4xl font-extrabold text-white drop-shadow">{myCourses.length}</span>
            </div>
            <div className="text-lg font-bold text-white mb-1 tracking-wide">Total Courses</div>
            <div className="text-gray-300 text-sm">Click to view and manage all your uploaded courses</div>
          </button>
        </div>
      )}
      {showTotalCourses && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setShowTotalCourses(false)}>
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-4xl w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-2xl" onClick={() => setShowTotalCourses(false)}>&times;</button>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center"><BookOpen className="w-7 h-7 mr-2 text-red-400" /> Your Total Courses</h2>
            {myCourses.length === 0 ? (
              <div className="text-gray-400 text-center py-8">You have not uploaded any courses yet.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {myCourses.map((course) => (
                  <div key={course.id} className="glass rounded-xl p-6 flex flex-col h-full border border-red-500/20 hover:border-red-500 transition group">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="flex-1">
                          <div className="font-bold text-lg text-white mb-1 line-clamp-1 group-hover:text-red-400 transition-colors">{course.title}</div>
                          <div className="text-gray-400 text-sm mb-1 line-clamp-1">{course.category} &bull; {course.difficulty}</div>
                          <div className="text-red-400 font-semibold text-xl ml-0">${course.price}</div>
                          <div className="text-gray-300 text-sm mt-1">Instructor: <span className="font-semibold text-white">{course.instructor}</span></div>
                        </div>
                      </div>
                      <div className="text-gray-300 text-sm mb-2 line-clamp-2 italic">{course.description}</div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button onClick={async () => {
                        if (!window.confirm('Are you sure you want to remove this course? This action cannot be undone.')) return;
                        await fetch('/api/creator/delete-course', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: course.id }),
                        });
                        setMyCourses((prev) => prev.filter((c) => c.id !== course.id));
                        setEnrollments((prev) => prev.filter((e) => e.course?.id !== course.id));
                      }} className="btn-danger px-4 py-2 text-base font-semibold group-hover:scale-105 transition-transform">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 