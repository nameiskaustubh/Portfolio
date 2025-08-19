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
              
             
              if (result.totalSolved !== undefined) {
                
                data = {
                  totalSolved: result.totalSolved || 0,
                  easySolved: result.easySolved || 0,
                  mediumSolved: result.mediumSolved || 0,
                  hardSolved: result.hardSolved || 0,
                  ranking: result.ranking || 'N/A',
                  accuracy: result.acceptanceRate || result.accuracy
                };
              } else if (result.totalQuestionsSolved !== undefined) {
                
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
                break; 
              }
            } else {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
          } catch (apiError) {
            console.log(`Failed with endpoint ${endpoint}:`, apiError.message);
            lastError = apiError;
            continue; 
          }
        }

        if (!data) {
          throw new Error(`Unable to fetch data from any API. Please check if the username "${username}" exists and is public. Last error: ${lastError?.message || 'Unknown error'}`);
        }

        setStats(data);
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
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading LeetCode stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="text-red-500 mr-3 text-xl">⚠️</div>
            <div>
              <p className="text-sm font-medium text-red-800">Unable to fetch LeetCode data</p>
              <p className="text-xs text-red-600 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const CompactDonutChart = ({ easy, medium, hard, total }) => {
    if (total === 0) {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="w-24 h-24 rounded-full border-4 border-gray-300 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-500">0</div>
              <div className="text-xs text-gray-400">Solved</div>
            </div>
          </div>
        </div>
      );
    }

    const size = 96;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    const easyPercent = (easy / total) * 100;
    const mediumPercent = (medium / total) * 100;
    const hardPercent = (hard / total) * 100;
    
    const easyOffset = 0;
    const mediumOffset = (easyPercent / 100) * circumference;
    const hardOffset = ((easyPercent + mediumPercent) / 100) * circumference;
    
    return (
      <div className="flex items-center justify-center h-32">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
            />
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
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            )}
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
                className="transition-all duration-1000 ease-out delay-300"
                strokeLinecap="round"
              />
            )}
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
                className="transition-all duration-1000 ease-out delay-500"
                strokeLinecap="round"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">{total}</div>
              <div className="text-xs text-gray-500">Solved</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const profileUrl = `https://leetcode.com/u/${username}`;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                {displayName || username}'s LeetCode Journey
              </h1>
              <p className="text-gray-600 text-sm mt-1">@{username}</p>
            </div>
          </div>
          <a 
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 font-medium text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            View Profile
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Progress Overview</h3>
          
          <CompactDonutChart 
            easy={stats.easySolved || 0} 
            medium={stats.mediumSolved || 0} 
            hard={stats.hardSolved || 0} 
            total={stats.totalSolved || 0} 
          />
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-800">{stats.ranking || "N/A"}</div>
              <div className="text-xs text-gray-600">Rank</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-800">
                {!stats.accuracy 
                    
                    ? "N/A"
                    : typeof stats.accuracy === "string"
                    ? stats.accuracy 
                    :stats.accuracy > 1
                    ? `${stats.accuracy.toFixed(1)}%`
                    : `${(stats.accuracy * 100).toFixed(1)}%`}
              </div>
              <div className="text-xs text-gray-600">Rate</div>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">By Difficulty</h3>
          
          <div className="space-y-4 mt-6">
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium text-green-700">Easy</span>
              </div>
              <span className="text-lg font-bold text-green-700">{stats.easySolved || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="font-medium text-yellow-700">Medium</span>
              </div>
              <span className="text-lg font-bold text-yellow-700">{stats.mediumSolved || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="font-medium text-red-700">Hard</span>
              </div>
              <span className="text-lg font-bold text-red-700">{stats.hardSolved || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeTracker;