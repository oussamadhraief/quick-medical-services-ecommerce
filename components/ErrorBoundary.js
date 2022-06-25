import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
  
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      console.log({ error, errorInfo })
    }
    render() {
      if (this.state.hasError) {
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
  
  
      return this.props.children
    }
  }
  
  export default ErrorBoundary