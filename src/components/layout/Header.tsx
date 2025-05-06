
import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3 w-full max-w-md">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-1 text-sm focus:outline-none"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-1 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
          <User size={16} className="text-gray-500" />
        </div>
      </div>
    </header>
  );
}
