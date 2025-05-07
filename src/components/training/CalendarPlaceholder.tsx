
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const CalendarPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário de Treinamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] flex items-center justify-center border rounded-md p-4">
          <div className="text-center text-gray-500">
            <Calendar className="mx-auto h-16 w-16 mb-2 opacity-50" />
            <p>Visualização do calendário seria exibida aqui.</p>
            <p className="text-sm text-muted-foreground">
              Implementação do calendário pendente.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
