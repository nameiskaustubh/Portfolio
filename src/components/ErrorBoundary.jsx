/**
 * ErrorBoundary.jsx
 *
 * FIX #13: Wraps the 3D Scene so WebGL failures (unsupported GPU,
 *          mobile GPU throttle, Three.js crash) degrade gracefully
 *          to the classic layout instead of a blank white screen.
 *
 * Usage:
 *   <ErrorBoundary fallback={<ClassicLayout />}>
 *     <Suspense fallback={<Loader />}>
 *       <Scene />
 *     </Suspense>
 *   </ErrorBoundary>
 */

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to your error tracking service (Sentry, LogRocket, etc.)
    console.error('[ErrorBoundary] Caught error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback prop if provided, otherwise a minimal message
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'var(--bg-0)',
            color: 'var(--text-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
          }}
        >
          Something went wrong loading this section.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;