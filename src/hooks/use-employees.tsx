
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchEmployees, 
  fetchEmployeeById, 
  updateEmployee, 
  createEmployee, 
  deleteEmployee,
  Employee,
  CreateEmployeeDTO 
} from "@/services/employeeService";
import { useLoading } from "./use-loading";
import { toast } from "sonner";

export const useEmployees = () => {
  const queryClient = useQueryClient();
  const { withLoading } = useLoading();

  const {
    data: employees = [],
    isLoading: isLoadingEmployees,
    error: employeesError,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });

  const getEmployeeById = (id: string) => {
    return useQuery({
      queryKey: ['employee', id],
      queryFn: () => fetchEmployeeById(id),
    });
  };

  const createEmployeeMutation = useMutation({
    mutationFn: (newEmployee: CreateEmployeeDTO) => withLoading(createEmployee(newEmployee)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success("Funcionário criado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar funcionário: ${error.message || "Tente novamente."}`);
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Employee> }) => 
      withLoading(updateEmployee(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success("Funcionário atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar funcionário: ${error.message || "Tente novamente."}`);
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: (id: string) => withLoading(deleteEmployee(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success("Funcionário excluído com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao excluir funcionário: ${error.message || "Tente novamente."}`);
    },
  });

  return {
    employees,
    isLoadingEmployees,
    employeesError,
    getEmployeeById,
    createEmployee: createEmployeeMutation.mutate,
    isCreatingEmployee: createEmployeeMutation.isPending,
    updateEmployee: updateEmployeeMutation.mutate,
    isUpdatingEmployee: updateEmployeeMutation.isPending,
    deleteEmployee: deleteEmployeeMutation.mutate,
    isDeletingEmployee: deleteEmployeeMutation.isPending,
  };
};
