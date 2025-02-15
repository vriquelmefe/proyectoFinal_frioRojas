import React from 'react';

type ErrorMessageProps = { children: React.ReactNode };

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="alert alert-danger" role="alert">
      {children}
    </p>      
  )
}
