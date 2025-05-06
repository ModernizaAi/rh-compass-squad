
import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "training" | "review" | "interview" | "meeting";
}

interface UpcomingEventsCardProps {
  events: Event[];
}

// Helper function to get event type styles
const getEventTypeStyles = (type: Event["type"]) => {
  switch (type) {
    case "training":
      return "bg-blue-100 text-blue-800";
    case "review":
      return "bg-purple-100 text-purple-800";
    case "interview":
      return "bg-green-100 text-green-800";
    case "meeting":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Helper function to get event type label
const getEventTypeLabel = (type: Event["type"]) => {
  switch (type) {
    case "training":
      return "Treinamento";
    case "review":
      return "Avaliação";
    case "interview":
      return "Entrevista";
    case "meeting":
      return "Reunião";
    default:
      return "Evento";
  }
};

export function UpcomingEventsCard({ events }: UpcomingEventsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-soft overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium">Eventos Próximos</h3>
        <Link 
          to="/calendar" 
          className="text-primary text-sm font-medium hover:underline"
        >
          Ver calendário
        </Link>
      </div>
      
      {events.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {events.map((event) => (
            <div key={event.id} className="px-5 py-3">
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium text-gray-900">{event.title}</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getEventTypeStyles(event.type)}`}>
                  {getEventTypeLabel(event.type)}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={14} className="mr-1" />
                {event.date}, {event.time}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-8 text-center">
          <p className="text-sm text-gray-500">Nenhum evento próximo</p>
          <Link to="/calendar/new" className="mt-2 text-sm font-medium text-primary hover:underline inline-block">
            + Agendar novo evento
          </Link>
        </div>
      )}
    </div>
  );
}
