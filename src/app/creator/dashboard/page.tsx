"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DollarSign, BookOpen, Edit, Trash2, PlusCircle, Clock, X } from "lucide-react";
import { toast } from "react-hot-toast";

// Add Course type
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  price: number;
}

export default function CreatorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showTotalCourses, setShowTotalCourses] = useState(false);
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  // Add form state for new course
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

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "CREATOR") {
      router.push("/auth/login");
      return;
    }
    // Fetch courses for this creator
    fetch("/api/creator/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
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
        setShowForm(false); // Hide form after successful submission
        // Refresh course list
        fetch("/api/creator/courses")
          .then((res) => res.json())
          .then((data) => setCourses(data.courses || []));
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
    await fetch('/api/creator/delete-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setMyCourses((prev) => prev.filter((c) => c.id !== id));
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== "CREATOR") {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold">Your Courses</h1>
          <button
            className="btn-primary flex items-center gap-2"
            onClick={() => setShowForm((v) => !v)}
          >
            <PlusCircle className="w-5 h-5" /> Add Course
          </button>
        </motion.div>
        {showForm && (
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
                {courseImage && <Image src={courseImage} alt="Course Thumbnail" width={128} height={80} className="mt-2 w-32 h-20 object-cover rounded" />}
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
        {/* Total Courses Card/Button */}
        <div className="mb-8">
          <button
            className="glass rounded-xl p-6 text-left w-full flex flex-col items-start hover:bg-red-900/20 transition"
            onClick={() => setShowTotalCourses(true)}
          >
            <div className="text-gray-400 text-sm mb-1">Total Courses</div>
            <div className="text-3xl font-bold text-white">{myCourses.length}</div>
            <div className="text-gray-400 text-xs mt-1">Click to view and manage all your uploaded courses</div>
          </button>
        </div>
        {/* Total Courses Modal */}
        {showTotalCourses && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setShowTotalCourses(false)}>
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-2xl" onClick={() => setShowTotalCourses(false)}>&times;</button>
              <h2 className="text-2xl font-bold mb-4 text-white">Your Total Courses</h2>
              {myCourses.length === 0 ? (
                <div className="text-gray-400 text-center py-8">You have not uploaded any courses yet.</div>
              ) : (
                <div className="space-y-4">
                  {myCourses.map((course) => (
                    <div key={course.id} className="glass rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{course.title}</div>
                        <div className="text-gray-400 text-sm">{course.category}</div>
                      </div>
                      <button onClick={() => handleRemove(course.id)} className="btn-danger px-4 py-2 ml-4">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Course List */}
        {courses.length === 0 ? (
          <div className="text-gray-400 text-center py-16">
            <BookOpen className="mx-auto mb-4 w-12 h-12 text-red-400" />
            <p>You haven't created any courses yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course: Course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6 flex flex-col"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h2>
                  <p className="text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>{course.category}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <span>Difficulty: {course.difficulty}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <span>Price: ${course.price}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleRemove(course.id)} className="btn-danger flex-1 flex items-center gap-1 justify-center">
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 