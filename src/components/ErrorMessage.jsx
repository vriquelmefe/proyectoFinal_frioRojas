
export default function ErrorMessage({ children }) {
  return (
    <p className="alert alert-danger" role="alert">
      {children}
    </p>      
  )
}
