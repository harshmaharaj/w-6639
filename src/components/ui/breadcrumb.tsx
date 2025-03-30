
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex items-center overflow-x-auto whitespace-nowrap gap-1.5 break-words text-sm text-muted-foreground", 
      className
    )}
    {...props}
  />
))
