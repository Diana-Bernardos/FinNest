// src/components/ui/alert.jsx
import * as React from "react"

const Alert = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const baseStyles = "relative w-full rounded-lg border p-4"
  const variantStyles = {
    default: "bg-white text-gray-900 border-gray-200",
    destructive: "bg-red-50 text-red-900 border-red-200",
    success: "bg-green-50 text-green-900 border-green-200",
    warning: "bg-yellow-50 text-yellow-900 border-yellow-200"
  }

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${className || ''}`

  return (
    <div
      ref={ref}
      role="alert"
      className={finalClassName}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className || ''}`}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className || ''}`}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }