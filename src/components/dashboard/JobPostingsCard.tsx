
import React from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  applications: number;
  daysLeft: number;
}

interface JobPostingsCardProps {
  jobPostings: JobPosting[];
}

export function JobPostingsCard({ jobPostings }: JobPostingsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium">Vagas Abertas</h3>
        <Link 
          to="/recruitment" 
          className="text-primary text-sm font-medium hover:underline"
        >
          Ver todas
        </Link>
      </div>
      
      <div className="divide-y divide-gray-100">
        {jobPostings.map((job) => (
          <Link
            key={job.id}
            to={`/recruitment/job/${job.id}`}
            className="block px-5 py-3 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{job.title}</p>
                <p className="text-xs text-gray-500">{job.department} • {job.location}</p>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {job.applications} candidatos
                  </span>
                </div>
                <div className="flex items-center text-amber-600 text-xs">
                  <Clock size={14} className="mr-1" />
                  <span>{job.daysLeft} dias restantes</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <Link
          to="/recruitment/create"
          className="block text-center text-sm font-medium text-primary hover:underline"
        >
          + Publicar nova vaga
        </Link>
      </div>
    </div>
  );
}
