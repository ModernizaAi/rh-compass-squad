
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Video,
  MapPin,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Sample events data
const events = [
  {
    id: 1,
    title: "Reunião de Equipe",
    date: "2025-05-10",
    time: "09:00 - 10:00",
    type: "meeting",
    location: "Sala de Conferências A",
    attendees: [
      "Carlos Silva",
      "Ana Ferreira",
      "Roberto Santos",
      "Juliana Costa",
    ],
  },
  {
    id: 2,
    title: "Entrevista de Candidato",
    date: "2025-05-10",
    time: "11:00 - 12:00",
    type: "interview",
    location: "Sala de Reuniões B",
    attendees: ["Juliana Costa", "Marco Antônio"],
  },
  {
    id: 3,
    title: "Treinamento de Liderança",
    date: "2025-05-11",
    time: "14:00 - 16:00",
    type: "training",
    location: "Auditório",
    attendees: [
      "Carlos Silva",
      "Ana Ferreira",
      "Roberto Santos",
      "Juliana Costa",
      "Marco Antônio",
      "Luciana Almeida",
    ],
  },
  {
    id: 4,
    title: "Call com Cliente",
    date: "2025-05-12",
    time: "10:00 - 11:00",
    type: "meeting",
    location: "Virtual (Zoom)",
    attendees: ["Carlos Silva", "Roberto Santos"],
  },
  {
    id: 5,
    title: "Avaliação de Desempenho",
    date: "2025-05-12",
    time: "15:00 - 16:00",
    type: "review",
    location: "Sala de Reuniões C",
    attendees: ["Juliana Costa", "Ana Ferreira"],
  },
  {
    id: 6,
    title: "Workshop de Design Thinking",
    date: "2025-05-13",
    time: "09:00 - 12:00",
    type: "training",
    location: "Espaço Colaborativo",
    attendees: [
      "Ana Ferreira",
      "Luciana Almeida",
      "Pedro Gomes",
      "Fernanda Lima",
    ],
  },
];

// Generate calendar days for a month
const generateCalendarDays = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  
  // Add empty days for the start of the calendar
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: 0, events: [] });
  }
  
  // Add days with events
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const dayEvents = events.filter(event => event.date === dateStr);
    days.push({ day: i, events: dayEvents });
  }
  
  return days;
};

// Component for calendar day
const CalendarDay = ({ day, events, onClick }: { day: number, events: any[], onClick: () => void }) => {
  if (day === 0) return <div className="p-2 border border-transparent"></div>;
  
  return (
    <div 
      className={`min-h-[100px] p-2 border border-gray-200 hover:bg-gray-50 cursor-pointer ${
        events.length > 0 ? "bg-gray-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="font-medium text-sm mb-1">{day}</div>
      {events.slice(0, 3).map((event) => (
        <div 
          key={event.id}
          className={`text-xs p-1 mb-1 rounded truncate ${
            event.type === "meeting" ? "bg-blue-100 text-blue-800" :
            event.type === "interview" ? "bg-purple-100 text-purple-800" :
            event.type === "training" ? "bg-green-100 text-green-800" :
            "bg-yellow-100 text-yellow-800"
          }`}
        >
          {event.title}
        </div>
      ))}
      {events.length > 3 && (
        <div className="text-xs text-gray-500 mt-1">+{events.length - 3} mais</div>
      )}
    </div>
  );
};

export default function CalendarPage() {
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<any[]>([]);
  
  // Get month and year from current date
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  // Month names
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  // Day names
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  // Generate calendar days
  const days = generateCalendarDays(month, year);
  
  // Navigate to previous month
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  // Handle day click
  const handleDayClick = (day: number) => {
    if (day === 0) return;
    
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = events.filter(event => event.date === dateStr);
    
    setSelectedDay(day);
    setSelectedDayEvents(dayEvents);
  };
  
  return (
    <Layout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Calendário</h1>
            <p className="text-gray-500 mt-1">Gerencie eventos e compromissos</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Eventos</SelectItem>
                <SelectItem value="meeting">Reuniões</SelectItem>
                <SelectItem value="interview">Entrevistas</SelectItem>
                <SelectItem value="training">Treinamentos</SelectItem>
                <SelectItem value="review">Avaliações</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus size={16} className="mr-2" />
              Novo Evento
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold mx-4">
                  {monthNames[month]} {year}
                </h2>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 sm:mt-0">
                <Tabs defaultValue="month" value={view} onValueChange={setView} className="w-[320px]">
                  <TabsList className="w-full">
                    <TabsTrigger value="month" className="flex-1">Mês</TabsTrigger>
                    <TabsTrigger value="week" className="flex-1">Semana</TabsTrigger>
                    <TabsTrigger value="day" className="flex-1">Dia</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="month" className="pt-4">
              <div className="grid grid-cols-7 gap-0">
                {dayNames.map((day, index) => (
                  <div key={index} className="p-2 text-sm font-medium text-center text-gray-500">
                    {day}
                  </div>
                ))}
                {days.map((dayData, index) => (
                  <CalendarDay 
                    key={index} 
                    day={dayData.day} 
                    events={dayData.events}
                    onClick={() => handleDayClick(dayData.day)} 
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="week">
              <div className="h-[600px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <CalendarIcon className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p>Visualização semanal será implementada em breve.</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="day">
              <div className="h-[600px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <CalendarIcon className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p>Visualização diária será implementada em breve.</p>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>

        {selectedDay && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Eventos para {selectedDay} de {monthNames[month]}
            </h3>
            {selectedDayEvents.length === 0 ? (
              <p className="text-gray-500">Não há eventos agendados para este dia.</p>
            ) : (
              <div className="space-y-4">
                {selectedDayEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <Clock size={16} className="mr-2" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            {event.location.includes("Virtual") ? (
                              <Video size={16} className="mr-2" />
                            ) : (
                              <MapPin size={16} className="mr-2" />
                            )}
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge
                            className={
                              event.type === "meeting" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                              event.type === "interview" ? "bg-purple-100 text-purple-800 hover:bg-purple-200" :
                              event.type === "training" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                              "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            }
                          >
                            {event.type === "meeting" ? "Reunião" :
                             event.type === "interview" ? "Entrevista" :
                             event.type === "training" ? "Treinamento" :
                             "Avaliação"}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-2">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Editar evento</DropdownMenuItem>
                              <DropdownMenuItem>Cancelar evento</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center">
                          <Users size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-500">
                            {event.attendees.length} participantes
                          </span>
                        </div>
                        <div className="flex items-center flex-wrap gap-1 mt-2">
                          {event.attendees.slice(0, 3).map((attendee: string, index: number) => (
                            <Badge key={index} variant="outline" className="font-normal">
                              {attendee}
                            </Badge>
                          ))}
                          {event.attendees.length > 3 && (
                            <Badge variant="outline" className="font-normal">
                              +{event.attendees.length - 3} mais
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
