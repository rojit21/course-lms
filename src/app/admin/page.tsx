'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  BookOpen, 
  TrendingUp, 
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Settings,
  MessageSquare,
  Award,
  Calendar,
  Target
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const stats = [
    { icon: Users, label: "Total Students", value: "2,847", change: "+12%", color: "text-blue-400" },
    { icon: DollarSign, label: "Revenue", value: "$45,230", change: "+8%", color: "text-green-400" },
    { icon: BookOpen, label: "Active Courses", value: "12", change: "+2", color: "text-purple-400" },
    { icon: Star, label: "Avg Rating", value: "4.8", change: "+0.2", color: "text-yellow-400" }
  ];

  const courses = [
    {
      id: 1,
      title: "AI for Content Creators",
      students: 1247,
      revenue: 124700,
      rating: 4.8,
      status: "active",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "ChatGPT Mastery",
      students: 2156,
      revenue: 172480,
      rating: 4.9,
      status: "active",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Generative AI Fundamentals",
      students: 892,
      revenue: 115960,
      rating: 4.7,
      status: "draft",
      image: "/api/placeholder/300/200"
    }
  ];

  const recentStudents = [
    { name: "Alex Thompson", email: "alex@example.com", course: "AI for Content Creators", date: "2 hours ago" },
    { name: "Maria Garcia", email: "maria@example.com", course: "ChatGPT Mastery", date: "4 hours ago" },
    { name: "David Kim", email: "david@example.com", course: "AI for Content Creators", date: "6 hours ago" },
    { name: "Sarah Wilson", email: "sarah@example.com", course: "Generative AI Fundamentals", date: "1 day ago" }
  ];

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/login');
      return;
    }

    if (session.user?.role !== 'CREATOR' && session.user?.role !== 'ADMIN') {
      router.push('/dashboard');
      toast.error('Access denied. Creator privileges required.');
      return;
    }

    setIsLoading(false);
  }, [session, status, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2"
          >
            Creator Dashboard
          </motion.h1>
          <p className="text-gray-400">Manage your courses, track performance, and grow your audience</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentStudents.map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-400">{student.course}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">{student.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                                         <Link href="/admin/create-course" className="w-full btn-primary flex items-center justify-center">
                       <Plus className="w-4 h-4 mr-2" />
                       Create New Course
                     </Link>
                    <button className="w-full btn-secondary flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Messages
                    </button>
                    <button className="w-full btn-secondary flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
                             <div className="flex justify-between items-center">
                 <h3 className="text-xl font-semibold">Your Courses</h3>
                 <Link href="/admin/create-course" className="btn-primary flex items-center">
                   <Plus className="w-4 h-4 mr-2" />
                   Add Course
                 </Link>
               </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="glass rounded-xl overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-red-600 to-red-800 relative">
                      <div className="absolute top-4 right-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          course.status === 'active' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-yellow-500 text-black'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {course.students} students
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          ${course.revenue.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          {course.rating} rating
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 btn-secondary text-sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button className="flex-1 btn-secondary text-sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button className="btn-secondary text-sm px-3">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'students' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Student Management</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Course</th>
                      <th className="text-left py-3 px-4">Joined</th>
                      <th className="text-left py-3 px-4">Progress</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map((student, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full mr-3"></div>
                            {student.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{student.email}</td>
                        <td className="py-3 px-4">{student.course}</td>
                        <td className="py-3 px-4 text-gray-400">{student.date}</td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-red-400 hover:text-red-300">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
                  <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Chart coming soon</p>
                  </div>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Student Growth</h3>
                  <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Chart coming soon</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'earnings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Earnings & Payouts</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">$45,230</p>
                  <p className="text-gray-400">Total Earnings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">$12,450</p>
                  <p className="text-gray-400">This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">$2,847</p>
                  <p className="text-gray-400">Pending Payout</p>
                </div>
              </div>
              <button className="btn-primary">Request Payout</button>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Profile Information</label>
                  <button className="btn-secondary">Edit Profile</button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Payment Settings</label>
                  <button className="btn-secondary">Manage Payment Methods</button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notification Preferences</label>
                  <button className="btn-secondary">Configure Notifications</button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 