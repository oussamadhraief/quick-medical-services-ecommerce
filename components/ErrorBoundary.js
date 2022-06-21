import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
  
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className="w-screen h-screen flex items-center justify-center">
            <h2>Oops, une erreur est survenue!</h2>
            <button
              type="button"
              className="text-blue-300 hover:underline"
              onClick={() => {
                this.setState({ hasError: false })
                location.reload()
              }}
            >
              Rafraîchir la page
            </button>
          </div>
        )
      }
  
      // Return children components in case of no error
  
      return this.props.children
    }
  }
  
  export default ErrorBoundary