import React, { useEffect, useState } from "react";

const LeetCodeTracker = ({ username, displayName }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Updated API endpoints with better reliability
        const apiEndpoints = [
          `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
          `https://leetcode-stats-api.herokuapp.com/${username}`,
          `https://leetcode-api-faisalshohag.vercel.app/${username}`,
          `https://leetcodeapi-v1.vercel.app/${username}`
        ];

        let data = null;
        let lastError = null;

        for (const endpoint of apiEndpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);
            const response = await fetch(endpoint, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              mode: 'cors'
            });
            
            if (response.ok) {
              const result = await response.json();
              console.log('API Response:', result);
              
              // Normalize data structure based on different API responses
              if (result.totalSolved !== undefined) {
                // First API format
                data = {
                  totalSolved: result.totalSolved || 0,
                  easySolved: result.easySolved || 0,
                  mediumSolved: result.mediumSolved || 0,
                  hardSolved: result.hardSolved || 0,
                  ranking: result.ranking || 'N/A',
                  accuracy: result.acceptanceRate || result.accuracy
                };
              } else if (result.totalQuestionsSolved !== undefined) {
                // Handle array format
                const easyCount = Array.isArray(result.totalQuestionsSolved) 
                  ? result.totalQuestionsSolved.find(item => item.difficulty === 'Easy')?.count || 0
                  : result.easySolved || 0;
                const mediumCount = Array.isArray(result.totalQuestionsSolved)
                  ? result.totalQuestionsSolved.find(item => item.difficulty === 'Medium')?.count || 0
                  : result.mediumSolved || 0;
                const hardCount = Array.isArray(result.totalQuestionsSolved)
                  ? result.totalQuestionsSolved.find(item => item.difficulty === 'Hard')?.count || 0
                  : result.hardSolved || 0;
                
                data = {
                  totalSolved: typeof result.totalQuestionsSolved === 'number' 
                    ? result.totalQuestionsSolved 
                    : easyCount + mediumCount + hardCount,
                  easySolved: easyCount,
                  mediumSolved: mediumCount,
                  hardSolved: hardCount,
                  ranking: result.ranking || result.globalRanking || 'N/A',
                  accuracy: result.acceptanceRate || result.accuracy
                };
              } else if (result.data) {
                // Third API format (nested data)
                const userData = result.data;
                data = {
                  totalSolved: userData.totalSolved || userData.solvedProblem || 0,
                  easySolved: userData.easySolved || userData.easySolvedProblem || 0,
                  mediumSolved: userData.mediumSolved || userData.mediumSolvedProblem || 0,
                  hardSolved: userData.hardSolved || userData.hardSolvedProblem || 0,
                  ranking: userData.ranking || userData.globalRanking || 'N/A',
                  accuracy: userData.acceptanceRate || userData.accuracy
                };
              } else if (result.username) {
                // Handle direct object format
                data = {
                  totalSolved: result.totalSolved || result.solvedProblem || 0,
                  easySolved: result.easySolved || result.easySolvedProblem || 0,
                  mediumSolved: result.mediumSolved || result.mediumSolvedProblem || 0,
                  hardSolved: result.hardSolved || result.hardSolvedProblem || 0,
                  ranking: result.ranking || result.globalRanking || 'N/A',
                  accuracy: result.acceptanceRate || result.accuracy
                };
              }
              
              if (data && (data.totalSolved !== undefined && data.totalSolved >= 0)) {
                break; // Successfully got data
              }
            } else {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
          } catch (apiError) {
            console.log(`Failed with endpoint ${endpoint}:`, apiError.message);
            lastError = apiError;
            continue; // Try next endpoint
          }
        }

        if (!data) {
          throw new Error(`Unable to fetch data from any API. Please check if the username "${username}" exists and is public. Last error: ${lastError?.message || 'Unknown error'}`);
        }

        setStats(data);
        // Start animation after data loads
        setTimeout(() => setAnimationComplete(true), 300);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username && username.trim()) {
      fetchStats();
    } else {
      setError('Please provide a valid LeetCode username');
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-slate-100 dark:bg-slate-900 min-h-32">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-orange-300 animate-pulse"></div>
        </div>
        <p className="ml-4 text-gray-600 dark:text-gray-300 font-medium animate-pulse">Loading LeetCode stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl p-6 max-w-md mx-auto m-4 animate-in fade-in duration-500">
        <div className="flex items-start">
          <div className="text-red-500 dark:text-red-400 mr-3 text-xl animate-bounce">⚠️</div>
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-300">Unable to fetch LeetCode data</p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-2 leading-relaxed">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  // Enhanced animated donut chart component
  const DonutChart = ({ easy, medium, hard, total }) => {
    if (total === 0) {
      return (
        <div className="relative flex items-center justify-center animate-in fade-in duration-700">
          <div className="w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-500 dark:text-gray-400">0</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">Solved</div>
            </div>
          </div>
        </div>
      );
    }

    const size = 130;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    const easyPercent = (easy / total) * 100;
    const mediumPercent = (medium / total) * 100;
    const hardPercent = (hard / total) * 100;
    
    const easyOffset = 0;
    const mediumOffset = (easyPercent / 100) * circumference;
    const hardOffset = ((easyPercent + mediumPercent) / 100) * circumference;
    
    return (
      <div className="relative flex items-center justify-center animate-in slide-in-from-left duration-700">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 animate-pulse"></div>
        <svg width={size} height={size} className="transform -rotate-90 relative z-10">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            className="dark:stroke-gray-700"
          />
          {/* Easy */}
          {easy > 0 && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeWidth={strokeWidth}
              strokeDasharray={`${(easyPercent / 100) * circumference} ${circumference}`}
              strokeDashoffset={animationComplete ? -easyOffset : -circumference}
              className="transition-all duration-1000 ease-out drop-shadow-sm"
              strokeLinecap="round"
            />
          )}
          {/* Medium */}
          {medium > 0 && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={strokeWidth}
              strokeDasharray={`${(mediumPercent / 100) * circumference} ${circumference}`}
              strokeDashoffset={animationComplete ? -mediumOffset : -circumference}
              className="transition-all duration-1000 ease-out delay-300 drop-shadow-sm"
              strokeLinecap="round"
            />
          )}
          {/* Hard */}
          {hard > 0 && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#ef4444"
              strokeWidth={strokeWidth}
              strokeDasharray={`${(hardPercent / 100) * circumference} ${circumference}`}
              strokeDashoffset={animationComplete ? -hardOffset : -circumference}
              className="transition-all duration-1000 ease-out delay-500 drop-shadow-sm"
              strokeLinecap="round"
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center animate-in zoom-in duration-500 delay-700">
            <div className="text-3xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Solved</div>
          </div>
        </div>
      </div>
    );
  };

  const profileUrl = `https://leetcode.com/u/${username}`;

  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-4 min-h-screen transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header with Profile Link */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-in slide-in-from-top duration-500 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* LeetCode Logo */}
              <div className="mr-4 animate-in zoom-in duration-700">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.816 2.133 8.006-.09 2.19-2.224 2.133-5.791-.09-8.006l-8.339-8.096a.977.977 0 0 0-1.376.059.977.977 0 0 0 .059 1.376l8.339 8.096a3.751 3.751 0 0 1 .06 5.303 3.75 3.75 0 0 1-5.303.06l-4.277-4.193-.038-.037a3.962 3.962 0 0 1-.84-1.209 3.85 3.85 0 0 1-.231-.677 3.702 3.702 0 0 1-.044-1.561 3.527 3.527 0 0 1 .808-1.408l3.854-4.126 5.405-5.788a.635.635 0 0 0-.059-.896.635.635 0 0 0-.896.059z" 
                        fill="url(#leetcode-gradient)" 
                  />
                  <defs>
                    <linearGradient id="leetcode-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFA116" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-in slide-in-from-left duration-700">
                  {displayName || username}'s LeetCode Journey
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 animate-in slide-in-from-left duration-700 delay-100">@{username}</p>
              </div>
            </div>
            <a 
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-sm animate-in slide-in-from-right duration-700"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              View Profile
            </a>
          </div>
        </div>

        {/* Main Stats with Donut */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-in slide-in-from-bottom duration-500 delay-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between gap-8">
            {/* Donut Chart */}
            <div className="flex-shrink-0">
              <DonutChart 
                easy={stats.easySolved || 0} 
                medium={stats.mediumSolved || 0} 
                hard={stats.hardSolved || 0} 
                total={stats.totalSolved || 0} 
              />
            </div>
            
            {/* Stats */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform duration-300 animate-in zoom-in delay-500">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalSolved || 0}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Total Solved</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform duration-300 animate-in zoom-in delay-600">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.ranking || "N/A"}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Global Rank</div>
                </div>
              </div>
              <div className="mt-4 text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform duration-300 animate-in zoom-in delay-700">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {stats.accuracy ? 
                    (typeof stats.accuracy === 'string' ? stats.accuracy : (stats.accuracy * 100).toFixed(1) + "%") 
                    : "N/A"}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Acceptance Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-in slide-in-from-bottom duration-500 delay-400 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 animate-in slide-in-from-left duration-700">Difficulty Breakdown</h2>
          
          <div className="space-y-4">
            {/* Easy */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border border-green-200 dark:border-green-600/30 hover:scale-[1.02] transition-all duration-300 hover:shadow-md animate-in slide-in-from-left duration-700 delay-200">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-4 animate-pulse"></div>
                <span className="font-semibold text-green-700 dark:text-green-300">Easy</span>
              </div>
              <span className="text-xl font-bold text-green-700 dark:text-green-300">{stats.easySolved || 0}</span>
            </div>

            {/* Medium */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-xl border border-yellow-200 dark:border-yellow-600/30 hover:scale-[1.02] transition-all duration-300 hover:shadow-md animate-in slide-in-from-left duration-700 delay-300">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-4 animate-pulse"></div>
                <span className="font-semibold text-yellow-700 dark:text-yellow-300">Medium</span>
              </div>
              <span className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{stats.mediumSolved || 0}</span>
            </div>

            {/* Hard */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10 rounded-xl border border-red-200 dark:border-red-600/30 hover:scale-[1.02] transition-all duration-300 hover:shadow-md animate-in slide-in-from-left duration-700 delay-400">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-4 animate-pulse"></div>
                <span className="font-semibold text-red-700 dark:text-red-300">Hard</span>
              </div>
              <span className="text-xl font-bold text-red-700 dark:text-red-300">{stats.hardSolved || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage - replace with your actual username
export default function App() {
  return (
    <LeetCodeTracker 
      username="afcpwRGndV"  // Your username from the App.js
      displayName="Kaustubh Deshmukh"
    />
  );
}