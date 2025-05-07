
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrainingStats } from "@/components/training/TrainingStats";
import { CourseCard } from "@/components/training/CourseCard";
import { EmployeeTrainingTable } from "@/components/training/EmployeeTrainingTable";
import { CalendarPlaceholder } from "@/components/training/CalendarPlaceholder";
import { courses, employeeTraining } from "@/components/training/data";

export default function Training() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Treinamentos</h1>
        <p className="text-gray-500 mt-1">
          Gerencie cursos, certificações e desenvolvimento profissional
        </p>

        <TrainingStats />

        <div className="mt-8">
          <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="courses">Cursos</TabsTrigger>
              <TabsTrigger value="employees">Funcionários</TabsTrigger>
              <TabsTrigger value="calendar">Calendário</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Cursos Disponíveis</h2>
                <Button>Novo Curso</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="employees">
              <EmployeeTrainingTable employees={employeeTraining} />
            </TabsContent>
            
            <TabsContent value="calendar">
              <CalendarPlaceholder />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
