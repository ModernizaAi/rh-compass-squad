
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type NotificationType = "meeting" | "recruitment" | "performance" | "training" | "document" | "general";

export interface Notification {
  id: number;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created_at: string;
}

export const fetchNotifications = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    toast.error("Falha ao carregar notificações");
    console.error("Error in notification service:", error);
    return [];
  }
};

export const markNotificationAsRead = async (id: number) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }

    return true;
  } catch (error) {
    toast.error("Falha ao atualizar notificação");
    console.error("Error in notification service:", error);
    return false;
  }
};

export const markAllNotificationsAsRead = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }

    return true;
  } catch (error) {
    toast.error("Falha ao atualizar notificações");
    console.error("Error in notification service:", error);
    return false;
  }
};

export const createNotification = async (notification: Omit<Notification, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notification])
      .select();

    if (error) {
      console.error("Error creating notification:", error);
      throw error;
    }

    return data?.[0] || null;
  } catch (error) {
    toast.error("Falha ao criar notificação");
    console.error("Error in notification service:", error);
    return null;
  }
};

export const deleteNotification = async (id: number) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }

    return true;
  } catch (error) {
    toast.error("Falha ao excluir notificação");
    console.error("Error in notification service:", error);
    return false;
  }
};
