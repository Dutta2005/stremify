import { useState } from 'react';
import { 
  Home, 
  RefreshCw, 
  MessageCircle,
  Users,
  MapPin,
  AlertTriangle
} from "lucide-react";

const ErrorPage = () => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-2xl text-center space-y-8">
        {/* Illustration */}
        <div className="relative">
          <div className="bg-error/10 p-8 rounded-full mx-auto w-fit">
            <AlertTriangle className="size-20 text-error" />
          </div>
          <div className="absolute -top-2 -right-2 animate-bounce">
            <div className="bg-warning text-warning-content text-xs px-2 py-1 rounded-full font-bold">
              Oops!
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-lg opacity-70 max-w-md mx-auto">
            Don't worry! Even the best language learners make mistakes. 
            We're working to fix this issue.
          </p>
        </div>

        {/* Error suggestions */}
        <div className="card bg-base-200 p-6 max-w-lg mx-auto">
          <h3 className="font-semibold mb-4">What you can try:</h3>
          <ul className="space-y-2 text-left">
            <li className="flex items-center gap-3">
              <RefreshCw className="size-4 text-primary flex-shrink-0" />
              <span className="text-sm">Refresh the page</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-primary flex-shrink-0" />
              <span className="text-sm">Check your internet connection</span>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-4 text-primary flex-shrink-0" />
              <span className="text-sm">Contact support if problem persists</span>
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className={`btn btn-primary btn-lg ${isRetrying ? 'loading' : ''}`}
            onClick={handleRetry}
            disabled={isRetrying}
          >
            {!isRetrying && <RefreshCw className="size-5 mr-2" />}
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </button>
          
          <button 
            className="btn btn-outline btn-lg"
            onClick={() => window.location.href = '/'}
          >
            <Home className="size-5 mr-2" />
            Go Home
          </button>
        </div>

        {/* Encouraging message */}
        <div className="card bg-gradient-to-r from-success/10 to-info/10 p-4 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-success" />
            <div className="text-left">
              <p className="text-sm font-medium">Keep Learning!</p>
              <p className="text-xs opacity-70">
                Every error is a step toward fluency. You've got this! 💪
              </p>
            </div>
          </div>
        </div>

        {/* Error ID for support */}
        <div className="text-xs opacity-50">
          Error ID: LX-{Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

// Demo Component to showcase both pages
const ErrorPagesDemo = () => {
  const [currentPage, setCurrentPage] = useState('404');

  return (
    <div>
      {/* Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="btn-group">
          <button 
            className={`btn btn-sm ${currentPage === '404' ? 'btn-active' : ''}`}
            onClick={() => setCurrentPage('404')}
          >
            404 Page
          </button>
          <button 
            className={`btn btn-sm ${currentPage === 'error' ? 'btn-active' : ''}`}
            onClick={() => setCurrentPage('error')}
          >
            Error Page
          </button>
        </div>
      </div>

      {/* Page Content */}
      {currentPage === '404' ? <NotFoundPage /> : <ErrorPage />}
    </div>
  );
};

export default ErrorPagesDemo;