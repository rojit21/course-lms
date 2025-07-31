"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { DollarSign, BookOpen, Video, Image as ImageIcon, Tag, Clock } from 'lucide-react';

export default function CreatorCreateCoursePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [courseImage, setCourseImage] = useState<string | null>(null);
  const [courseVideo, setCourseVideo] = useState<string | null>(null);
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'CREATOR') {
    router.push('/auth/login');
    return null;
  }

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
    setIsLoading(true);
    try {
      const res = await fetch('/api/creator/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, creatorId: session?.user?.id }),
      });
      if (res.ok) {
        toast.success('Course created successfully!');
        router.push('/creator/dashboard');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to create course.');
      }
    } catch (error) {
      toast.error('Failed to create course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-2">
            Create New Course
          </motion.h1>
          <p className="text-gray-400">Design and publish your course to start earning</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-xl p-6">
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
                <button type="submit" disabled={isLoading} className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Creating...' : 'Create Course'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 