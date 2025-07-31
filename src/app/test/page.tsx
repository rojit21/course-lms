export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">TailwindCSS Test</h1>
        <p className="text-white text-lg">If you can see this styled text, TailwindCSS is working!</p>
        <div className="mt-8 p-6 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
          <p className="text-white">Glass morphism effect test</p>
        </div>
      </div>
    </div>
  );
} 