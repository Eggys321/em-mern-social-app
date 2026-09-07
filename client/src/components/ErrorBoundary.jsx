import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error:", error, info?.componentStack);
  }

  handleReset() {
    this.setState({ error: null });
    window.location.assign("/");
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        role="alert"
        className="d-flex flex-column align-items-center justify-content-center text-center vh-100 px-3"
      >
        <h1 className="fw-bold mb-2">Something went wrong</h1>
        <p className="text-muted-em mb-4">
          An unexpected error interrupted this page. You can try again or head back home.
        </p>
        <button type="button" className="btn btn-primary rounded-pill px-4" onClick={this.handleReset}>
          Back to home
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
