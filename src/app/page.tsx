'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Play, 
  Users, 
  Award, 
  TrendingUp, 
  Star, 
  ArrowRight,
  CheckCircle,
  BookOpen,
  DollarSign
} from 'lucide-react';

// Add Course type for homepage
interface HomeCourse {
  id: string;
  title: string;
  instructor: string;
  price: number;
  image?: string;
  category?: string;
}

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [courses, setCourses] = useState<HomeCourse[]>([]);
  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.courses || []));
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Content Creator",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "Course Gen transformed my content creation. I went from 0 to 50K followers in 3 months!",
      rating: 5
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Digital Marketer",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      text: "The AI courses here are game-changing. I've increased my client revenue by 300%.",
      rating: 5
    },
    {
      id: 3,
      name: "David Kim",
      role: "Entrepreneur",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      text: "Best investment I've made. The practical skills I learned here are worth 10x the price.",
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, label: "Active Students", value: "150+" },
    { icon: Award, label: "Courses Completed", value: "69+" },
    { icon: TrendingUp, label: "Success Rate", value: "95%" },
    { icon: DollarSign, label: "Average Income", value: "$5,000+" }
  ];

  const aiCourses = courses.filter(
    (course) => course.category && course.category.toLowerCase().includes('ai')
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 opacity-90"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Become a Creator,</span>
            <br />
            <span className="text-white">Learn AI, Start Earning</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Master AI tools and techniques to create engaging content, build your audience, and generate sustainable income as a digital creator.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/courses" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center whitespace-nowrap">
              <span>Explore Courses</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button 
              onClick={() => setIsVideoPlaying(true)}
              className="btn-secondary text-lg px-8 py-4 flex items-center"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Intro
            </button>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 text-red-400 opacity-20"
        >
          <BookOpen size={40} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-20 right-10 text-red-400 opacity-20"
        >
          <Award size={40} />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="glass rounded-xl p-6">
                  <stat.icon className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured AI Masterclasses</h2>
            <p className="text-xl text-gray-300">Hand-picked courses to accelerate your creator journey</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {aiCourses.length === 0 ? (
              <div className="col-span-3 text-center text-gray-400">No AI courses available yet.</div>
            ) : (
              aiCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-xl overflow-hidden card-hover"
              >
                <div className="h-48 bg-gradient-to-br from-red-600 to-red-800 relative">
                    <img
                      src={course.image || '/api/placeholder/400/250'}
                      alt={course.title}
                      className="object-cover w-full h-48"
                    />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                    {course.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-400 mb-4">by {course.instructor}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-red-400">${course.price}</div>
                  </div>
                  <Link href={`/courses/${course.id}`} className="btn-primary w-full text-center">
                    Enroll Now
                  </Link>
                </div>
              </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-300">See how our students transformed their careers</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 object-cover rounded-full mr-4 border-2 border-red-600 shadow"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.text}</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Creator Journey?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who are already earning with AI. Start your first course today!
            </p>
            <Link href="/auth/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center whitespace-nowrap">
              <span>Get Started Free</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
