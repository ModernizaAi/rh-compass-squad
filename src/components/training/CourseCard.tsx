
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Calendar, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type CourseCardProps = {
  course: {
    id: number;
    title: string;
    description: string;
    category: string;
    duration: string;
    enrolledCount: number;
    completionRate: number;
    startDate: string;
    status: string;
  };
};

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card key={course.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <Badge variant={
            course.status === "Em andamento" ? "default" :
            course.status === "Concluído" ? "secondary" : "outline"
          }>
            {course.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mt-1">{course.description}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
            <span>{course.category}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-500 mr-2" />
            <span>{course.enrolledCount} participantes</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <span>Início: {course.startDate}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Taxa de Conclusão</span>
            <span>{course.completionRate}%</span>
          </div>
          <Progress value={course.completionRate} className="h-2" />
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            Ver Detalhes <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
