
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Moon, Sun, Laptop } from "lucide-react";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tema da Aplicação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Escolha o tema de sua preferência para a interface do sistema.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button
              variant={theme === "light" ? "default" : "outline"} 
              className="flex items-center gap-2" 
              onClick={() => setTheme("light")}
            >
              <Sun className="h-5 w-5" />
              <span>Claro</span>
            </Button>
            
            <Button 
              variant={theme === "dark" ? "default" : "outline"} 
              className="flex items-center gap-2" 
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-5 w-5" />
              <span>Escuro</span>
            </Button>
            
            <Button 
              variant={theme === "system" ? "default" : "outline"} 
              className="flex items-center gap-2" 
              onClick={() => setTheme("system")}
            >
              <Laptop className="h-5 w-5" />
              <span>Sistema</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
