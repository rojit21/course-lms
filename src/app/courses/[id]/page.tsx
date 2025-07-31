import { notFound } from 'next/navigation';

async function getCourse(id: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/courses/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.course;
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);
  if (!course) return notFound();

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-white">{course.title}</h1>
        <div className="mb-4">
          <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm mr-2">{course.category}</span>
          <span className="inline-block bg-gray-700 text-white px-3 py-1 rounded-full text-sm">{course.difficulty}</span>
        </div>
        <img src={course.image || '/api/placeholder/400/250'} alt={course.title} className="w-full h-56 object-cover rounded mb-6" />
        <p className="text-gray-300 mb-6">{course.description}</p>
        <div className="mb-4 text-lg text-white font-semibold">Price: ${course.price}</div>
        <div className="mb-4 text-gray-400">Instructor: {course.instructor}</div>
        {course.introVideo && (
          course.introVideo.startsWith('http') ? (
            <iframe
              src={course.introVideo}
              title="Course Video"
              className="w-full h-64 rounded mb-4"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={course.introVideo}
              controls
              className="w-full h-64 rounded mb-4"
            />
          )
        )}
      </div>
    </div>
  );
} 