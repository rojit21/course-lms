"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ReviewCoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "ADMIN") {
      router.push("/auth/login");
      return;
    }
    fetch("/api/admin/unpublished-courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
        setIsLoading(false);
      });
  }, [session, status, router]);

  const handleApprove = async (id: string) => {
    await fetch(`/api/admin/approve-course`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setCourses((prev) => prev.filter((c: any) => c.id !== id));
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/delete-course`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setCourses((prev) => prev.filter((c: any) => c.id !== id));
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="loading-spinner"></div></div>;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Review Unpublished Courses
        </motion.h1>
        {courses.length === 0 ? (
          <div className="text-gray-400 text-center py-16">No courses pending review.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course: any) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6 flex flex-col"
              >
                <Image src={course.image || "/api/placeholder/400/250"} alt={course.title} width={400} height={250} className="w-full h-32 object-cover rounded mb-4" />
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-400 mb-2">{course.description}</p>
                <div className="mb-2 text-sm text-gray-400">Category: {course.category}</div>
                <div className="mb-2 text-sm text-gray-400">Instructor: {course.instructor}</div>
                <div className="mb-2 text-sm text-gray-400">Price: ${course.price}</div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleApprove(course.id)} className="btn-primary flex-1">Approve</button>
                  <button onClick={() => handleDelete(course.id)} className="btn-danger flex-1">Delete</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 