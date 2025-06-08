import { useState, useEffect } from "react";
import { 
  Ship, 
  MessageCircle, 
  Video, 
  Shield, 
  Globe, 
  Zap, 
  Brain, 
  AlertTriangle, 
  Rocket, 
  Target,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  LogIn
} from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroLoaded, setHeroLoaded] = useState(false);

  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
    "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden"
  ];

  // Auto-cycle through themes for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Hero animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with data-animate attribute
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: "Real-time Messaging",
      description: "Instant messaging with typing indicators, reactions, and seamless communication",
      color: "text-blue-500"
    },
    {
      icon: Video,
      title: "Video Calls & Screen Sharing",
      description: "1-on-1 and group video calls with screen sharing and recording capabilities",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "JWT Authentication",
      description: "Secure authentication system with protected routes and user privacy",
      color: "text-purple-500"
    },
    {
      icon: Globe,
      title: "32 Unique UI Themes",
      description: "Customize your experience with our extensive collection of beautiful themes",
      color: "text-cyan-500"
    },
    {
      icon: Zap,
      title: "Modern Tech Stack",
      description: "Built with React, Express, MongoDB, TailwindCSS, and TanStack Query",
      color: "text-yellow-500"
    },
    {
      icon: Brain,
      title: "Zustand State Management",
      description: "Efficient global state management for seamless user experience",
      color: "text-pink-500"
    },
    {
      icon: AlertTriangle,
      title: "Robust Error Handling",
      description: "Comprehensive error handling on both frontend and backend",
      color: "text-red-500"
    },
    {
      icon: Rocket,
      title: "Free Deployment Ready",
      description: "Easily deployable with modern hosting solutions and CI/CD integration",
      color: "text-indigo-500"
    }
  ];

  const stats = [
    { number: "32", label: "UI Themes", icon: Sparkles },
    { number: "100+", label: "Languages", icon: Globe },
    { number: "24/7", label: "Support", icon: Heart },
    { number: "99.9%", label: "Uptime", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 20 + 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Interactive cursor effect */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transition: 'all 0.1s ease'
        }}
      >
        <div className="w-5 h-5 bg-white rounded-full opacity-50"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo with entrance animation */}
            <div className={`flex items-center justify-center gap-4 mb-8 transition-all duration-1000 ${
              heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Ship className="w-16 h-16 text-blue-400 animate-bounce" />
              <div>
                <h1 className="text-6xl md:text-8xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-wider animate-pulse">
                  Streamify
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-medium mt-2 animate-fade-in">
                  Connect. Learn. Grow Together.
                </p>
              </div>
            </div>

            {/* Main Tagline with staggered animation */}
            <div className={`transition-all duration-1000 delay-300 ${
              heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                The Ultimate{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                  Language Exchange
                </span>{" "}
                Platform
              </h2>
            </div>

            <p className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Experience real-time conversations, video calls, and cultural exchange with native speakers from around the world. Built with cutting-edge technology for seamless communication.
            </p>

            {/* CTA Buttons with hover animations */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-700 ${
              heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Link to="/signup" className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative flex items-center gap-3">
                  Get Started
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to='/login' className="group px-8 py-4 border-2 border-gray-600 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-lg">
                <span className="flex items-center gap-3">
                  <LogIn className="w-5 h-5" />
                  Login
                </span>
              </Link>
            </div>

            {/* Animated Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-900 ${
              heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-110">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-blue-400 group-hover:text-purple-400 transition-colors animate-pulse" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold font-mono text-blue-400 group-hover:text-purple-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['features-header'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            data-animate 
            id="features-header"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Modern Communication
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need for effective language learning and cultural exchange in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                data-animate
                id={`feature-${index}`}
                className={`group bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:border-blue-400/50 ${
                  isVisible[`feature-${index}`] 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gray-700/50 group-hover:bg-gray-600/50 transition-colors">
                    <feature.icon className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform`} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section with floating animation */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['tech-header'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            data-animate
            id="tech-header"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Cutting-Edge Technology
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by React, Express, MongoDB, TailwindCSS, TanStack Query, and Stream for unmatched performance and scalability
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div 
              className={`bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm transition-all duration-1000 ${
                isVisible['tech-stack'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              data-animate
              id="tech-stack"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                {[
                  { name: "React", icon: "⚛️" },
                  { name: "Express", icon: "🚀" },
                  { name: "MongoDB", icon: "🗄️" },
                  { name: "TailwindCSS", icon: "🎨" },
                  { name: "TanStack Query", icon: "🔄" },
                  { name: "Zustand", icon: "🧠" },
                  { name: "Stream", icon: "📡" },
                  { name: "JWT", icon: "🔐" },
                  { name: "Socket.io", icon: "⚡" },
                  { name: "Node.js", icon: "💚" }
                ].map((tech, index) => (
                  <div key={index} className="group cursor-pointer transform transition-all duration-300 hover:scale-110">
                    <div className="text-4xl mb-2 group-hover:animate-bounce">
                      {tech.icon}
                    </div>
                    <div className="font-semibold text-sm group-hover:text-blue-400 transition-colors">
                      {tech.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Showcase with auto-cycling animation */}
      <section className="py-20 bg-gray-800/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['theme-header'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            data-animate
            id="theme-header"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                32 Beautiful Themes
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Customize your experience with our extensive collection of themes that adapt to your style
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div 
              className={`bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center transform transition-all duration-1000 hover:scale-105 ${
                isVisible['theme-showcase'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              data-animate
              id="theme-showcase"
            >
              <div className="text-6xl mb-4 animate-spin-slow">🎨</div>
              <h3 className="text-2xl font-bold mb-4">
                Current Theme: <span className="text-blue-400">{themes[currentTheme]}</span>
              </h3>
              <p className="text-gray-300 mb-6">
                Themes automatically cycle every 3 seconds. Each theme provides a unique experience!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {themes.slice(0, 8).map((theme, index) => (
                  <div
                    key={theme}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      index === currentTheme 
                        ? 'bg-blue-500 text-white scale-110' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {theme}
                  </div>
                ))}
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-600 text-gray-400">
                  +24 more
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Ready to Start Your
            <br />
            Language Journey?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join thousands of learners connecting with native speakers worldwide. Your perfect language partner is waiting!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup" className="group relative px-12 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="absolute inset-0 w-full h-full bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="relative flex items-center gap-3">
                <Users className="w-5 h-5" />
                Join Streamify Now
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/login" className="group px-12 py-4 border-2 border-white/50 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Ship className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-2xl font-bold font-mono">Streamify</span>
            </div>
            <div className="text-gray-400">
              © 2025 Streamify. Connecting the world through language.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;