import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <header className="bg-white py-12">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              Empowering Growth and Your Career Path
            </h1>
            <p className="text-gray-600 mb-6">
              Our platform offers personalized learning pathways to empower you
              in strengthening your skills and advancing in your chosen career
              field.
            </p>
          </div>
          <div className="lg:w-1/2 lg:text-right">
            <img
              src="./intro.png" // Ganti dengan gambar asli
              alt="Hero"
              className="rounded-lg shadow-md bg-orange-500"
            />
          </div>
        </div>
      </header>
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="📊"
              title="In-Depth Career Fit Analysis"
              description="Get career recommendations tailored to your interests, strengths, and learning style."
            />
            <FeatureCard
              icon="📈"
              title="Career Recommendations Based on Strengths and Weaknesses"
              description="Visualize your potential with a diagram that helps you identify your ideal career path."
            />
            <FeatureCard
              icon="🎯"
              title="Skill Development Recommendations"
              description="Receive tailored suggestions on skills to improve based on your chosen career."
            />
            <FeatureCard
              icon="📉"
              title="Data-Driven Insights"
              description="All recommendations are based on accurate data analysis, helping you make confident decisions."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
