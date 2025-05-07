
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function Tab({ value, children, className }: TabProps) {
  return (
    <button
      value={value}
      className={cn(
        "px-4 py-3 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 transition-all",
        "data-[state=active]:border-primary data-[state=active]:text-primary",
        className
      )}
      data-state={value === value ? "active" : "inactive"}
    >
      {children}
    </button>
  );
}

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

export function TabList({ children, className }: TabListProps) {
  return (
    <div className={cn("flex overflow-x-auto", className)}>
      {children}
    </div>
  );
}

export interface TabPanelProps {
  value: string;
  currentValue: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ value, currentValue, children, className }: TabPanelProps) {
  if (value !== currentValue) return null;
  
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
}

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  // Clone children and add an onClick handler to Tab components
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Tab) {
      return React.cloneElement(child, {
        onClick: () => onValueChange(child.props.value),
        "data-state": child.props.value === value ? "active" : "inactive",
      });
    }
    return child;
  });
  
  return (
    <div className={cn("", className)}>
      {childrenWithProps}
    </div>
  );
}
