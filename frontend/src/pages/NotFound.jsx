
import { 
  Home, 
  Search,  
  MessageCircle,
  Users,
  Compass,
  BookOpen
} from "lucide-react";

import { Link } from "react-router";

// Not Found Page Component
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-2xl text-center space-y-8">
        {/* Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-primary opacity-20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-base-200 p-6 rounded-full">
              <Compass className="size-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Oops! Page Not Found
          </h1>
          <p className="text-lg opacity-70 max-w-md mx-auto">
            Looks like you've wandered off the language learning path. 
            Let's get you back to connecting with fellow learners!
          </p>
        </div>

        {/* Language-themed suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <div className="card bg-base-200 p-4">
            <div className="flex items-center gap-3">
              <Users className="size-5 text-primary" />
              <div className="text-left">
                <h3 className="font-semibold">Find Friends</h3>
                <p className="text-sm opacity-70">Connect with language partners</p>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-200 p-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="size-5 text-secondary" />
              <div className="text-left">
                <h3 className="font-semibold">Start Chatting</h3>
                <p className="text-sm opacity-70">Practice with native speakers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="btn btn-primary btn-lg"
          >
            <Home className="size-5 mr-2" />
            Back to Home
          </Link>
          
          <button 
            className="btn btn-outline btn-lg"
            onClick={() => window.history.back()}
          >
            <Search className="size-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Fun language fact */}
        <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 p-4 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <BookOpen className="size-5 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium">Fun Fact</p>
              <p className="text-xs opacity-70">
                "404" means "not found" in over 7,000 languages! 🌍
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;