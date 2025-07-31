'use client';

import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  Award, 
  Globe, 
  Heart,
  Lightbulb,
  Zap,
  Star
} from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Active Students", value: "150+" },
    { icon: Award, label: "Courses Completed", value: "69+" },
    { icon: Star, label: "Success Rate", value: "95%" },
    { icon: Globe, label: "Countries", value: "150+" }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every course we create and every student we support."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our passion for education drives us to create the best learning experiences."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly innovate to bring you the latest in AI and technology education."
    },
    {
      icon: Zap,
      title: "Impact",
      description: "We measure success by the positive impact our courses have on your career."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Former AI researcher at Google, passionate about democratizing AI education."
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Tech entrepreneur with 15+ years experience in building scalable platforms."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Education",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "PhD in Computer Science, expert in curriculum development and pedagogy."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">About Course Gen</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            We're on a mission to democratize AI education and empower creators worldwide to build successful careers in the digital age.
          </motion.p>
        </div>
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

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              To provide world-class AI education that transforms learners into creators, 
              enabling them to build sustainable careers in the digital economy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">Why Choose Course Gen?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Industry-leading AI curriculum designed by experts</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Hands-on projects and real-world applications</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Community support and networking opportunities</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-300">Lifetime access to course updates and new content</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 mb-6">
                We envision a world where anyone with passion and determination can master AI technologies 
                and create meaningful impact in their chosen field.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-gray-300">Empower 1 million creators by 2025</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-gray-300">Global reach across 200+ countries</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-gray-300">Industry-recognized certifications</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <value.icon className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300">The passionate minds behind Course Gen</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-red-600 shadow-lg"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-red-400 font-medium mb-2">{member.role}</p>
                <p className="text-gray-300 mb-2">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 