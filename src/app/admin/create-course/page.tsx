'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Upload, 
  X, 
  Save, 
  Eye, 
  EyeOff,
  DollarSign,
  Clock,
  BookOpen,
  Tag,
  User,
  FileText,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateCoursePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [courseImage, setCourseImage] = useState<string | null>(null);
  const [courseVideo, setCourseVideo] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    difficulty: 'BEGINNER',
    category: '',
    instructor: '',
    introVideo: '',
    image: '',
    isPublished: false
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
    'Design'
  ];

  const difficulties = [
    { value: 'BEGINNER', label: 'Beginner', color: 'bg-green-500' },
    { value: 'INTERMEDIATE', label: 'Intermediate', color: 'bg-yellow-500' },
    { value: 'ADVANCED', label: 'Advanced', color: 'bg-red-500' }
  ];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save course to database with creatorId
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2"
          >
            Create New Course
          </motion.h1>
          <p className="text-gray-400">Design and publish your course to start earning</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Creation Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                    placeholder="Enter course title"
                  />
                </div>

                {/* Course Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Course Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white resize-none"
                    placeholder="Describe what students will learn in this course"
                  />
                </div>

                {/* Price and Duration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                        placeholder="e.g., 8 hours"
                      />
                    </div>
                  </div>
                </div>

                {/* Category and Difficulty */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty Level *
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                    >
                      {difficulties.map((difficulty) => (
                        <option key={difficulty.value} value={difficulty.value}>
                          {difficulty.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Instructor */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Instructor Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                      placeholder="Enter instructor name"
                    />
                  </div>
                </div>

                {/* Course Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Course Thumbnail *
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    {courseImage ? (
                      <div className="relative">
                        <img
                          src={courseImage}
                          alt="Course thumbnail"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCourseImage(null);
                            setFormData({ ...formData, image: '' });
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 mb-2">Upload course thumbnail</p>
                        <p className="text-sm text-gray-500 mb-4">Recommended: 1280x720px, JPG or PNG</p>
                        <label className="btn-secondary cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Intro Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Introduction Video
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    {courseVideo ? (
                      <div className="relative">
                        <video
                          src={courseVideo}
                          controls
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCourseVideo(null);
                            setFormData({ ...formData, introVideo: '' });
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 mb-2">Upload introduction video</p>
                        <p className="text-sm text-gray-500 mb-4">MP4, WebM, or OGG format</p>
                        <label className="btn-secondary cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Video
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-300">Publish Course</label>
                    <p className="text-sm text-gray-500">Make course available to students</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary flex-1 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner mr-2"></div>
                        Creating Course...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Course
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="btn-secondary flex items-center"
                  >
                    {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showPreview ? 'Hide Preview' : 'Preview'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-6 sticky top-24"
            >
              <h3 className="text-xl font-semibold mb-4">Course Preview</h3>
              
              {showPreview && formData.title ? (
                <div className="space-y-4">
                  {/* Course Card Preview */}
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-red-600 to-red-800 relative">
                      {courseImage && (
                        <img
                          src={courseImage}
                          alt="Course preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          difficulties.find(d => d.value === formData.difficulty)?.color || 'bg-gray-500'
                        }`}>
                          {difficulties.find(d => d.value === formData.difficulty)?.label || 'Beginner'}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-600 text-white font-medium">
                          ${formData.price || '0'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">{formData.title}</h4>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{formData.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formData.duration || 'Duration'}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {formData.category || 'Category'}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-400">
                        by <span className="text-white">{formData.instructor || 'Instructor'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Price:</span>
                      <span className="font-semibold">${formData.price || '0'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span>{formData.duration || 'Not set'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span>{formData.category || 'Not set'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Difficulty:</span>
                      <span>{difficulties.find(d => d.value === formData.difficulty)?.label || 'Beginner'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        formData.isPublished 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-black'
                      }`}>
                        {formData.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Fill in the course details to see a preview</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 