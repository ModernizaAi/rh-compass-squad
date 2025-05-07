
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, CheckCircle2, GraduationCap } from "lucide-react";

export const TrainingStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-sm text-gray-500">Cursos Ativos</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold">86</h3>
          <p className="text-sm text-gray-500">Participantes</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <CheckCircle2 className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold">68%</h3>
          <p className="text-sm text-gray-500">Taxa de Conclusão</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="bg-yellow-100 p-3 rounded-full mb-4">
            <GraduationCap className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold">42</h3>
          <p className="text-sm text-gray-500">Certificações Emitidas</p>
        </CardContent>
      </Card>
    </div>
  );
};
