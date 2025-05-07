
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  department: string;
  status: "active" | "inactive" | "on_leave";
  hire_date: string;
  salary?: number;
  phone?: string;
  avatar_url?: string;
};

// Tipo para criação de funcionário, sem incluir o campo ID que será gerado pelo banco
export type CreateEmployeeDTO = Omit<Employee, 'id'>;

// Tipo que corresponde exatamente ao que o Supabase aceita
type SupabaseProfileInsert = {
  first_name?: string;
  last_name?: string;
  email?: string;
  position?: string;
  department?: string;
  status?: "active" | "inactive" | "on_leave";
  hire_date?: string;
  salary?: number;
  phone?: string;
  avatar_url?: string;
};

export const fetchEmployees = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      console.error("Erro ao buscar funcionários:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    toast.error("Falha ao carregar funcionários. Tente novamente mais tarde.");
    console.error("Erro no serviço de funcionários:", error);
    return [];
  }
};

export const fetchEmployeeById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Erro ao buscar funcionário ID ${id}:`, error);
      throw error;
    }
    
    return data;
  } catch (error) {
    toast.error("Falha ao carregar dados do funcionário. Tente novamente mais tarde.");
    console.error("Erro no serviço de funcionários:", error);
    return null;
  }
};

export const updateEmployee = async (id: string, employeeData: Partial<Employee>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(employeeData)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error(`Erro ao atualizar funcionário ID ${id}:`, error);
      throw error;
    }
    
    toast.success("Funcionário atualizado com sucesso!");
    return data[0];
  } catch (error) {
    toast.error("Falha ao atualizar dados do funcionário. Tente novamente mais tarde.");
    console.error("Erro no serviço de funcionários:", error);
    return null;
  }
};

export const createEmployee = async (employeeData: CreateEmployeeDTO) => {
  try {
    // Convertemos CreateEmployeeDTO para o tipo que o Supabase aceita
    const profileData: SupabaseProfileInsert = {
      first_name: employeeData.first_name,
      last_name: employeeData.last_name,
      email: employeeData.email,
      position: employeeData.position,
      department: employeeData.department,
      status: employeeData.status,
      hire_date: employeeData.hire_date,
      salary: employeeData.salary,
      phone: employeeData.phone,
      avatar_url: employeeData.avatar_url
    };
    
    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .select();
      
    if (error) {
      console.error(`Erro ao criar funcionário:`, error);
      throw error;
    }
    
    toast.success("Funcionário criado com sucesso!");
    return data[0];
  } catch (error) {
    toast.error("Falha ao criar funcionário. Tente novamente mais tarde.");
    console.error("Erro no serviço de funcionários:", error);
    return null;
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error(`Erro ao excluir funcionário ID ${id}:`, error);
      throw error;
    }
    
    toast.success("Funcionário excluído com sucesso!");
    return true;
  } catch (error) {
    toast.error("Falha ao excluir funcionário. Tente novamente mais tarde.");
    console.error("Erro no serviço de funcionários:", error);
    return false;
  }
};
