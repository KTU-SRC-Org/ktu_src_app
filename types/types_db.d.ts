export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      departments: {
        Row: {
          created_at: string
          faculty_id: string
          id: string
          logo_uri: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          faculty_id: string
          id?: string
          logo_uri?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          faculty_id?: string
          id?: string
          logo_uri?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculties"
            referencedColumns: ["id"]
          },
        ]
      }
      faculties: {
        Row: {
          created_at: string
          id: string
          logo_uri: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_uri?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_uri?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      hostel_photos: {
        Row: {
          caption: string | null
          created_at: string
          hostel_id: string
          id: string
          is_featured: boolean
          position: number
          storage_path: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          hostel_id: string
          id?: string
          is_featured?: boolean
          position?: number
          storage_path: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          hostel_id?: string
          id?: string
          is_featured?: boolean
          position?: number
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "hostel_photos_hostel_id_fkey"
            columns: ["hostel_id"]
            isOneToOne: false
            referencedRelation: "hostels"
            referencedColumns: ["id"]
          },
        ]
      }
      hostels: {
        Row: {
          address: string | null
          agent_avatar_url: string | null
          agent_email: string | null
          agent_name: string | null
          bathrooms: number | null
          bedrooms: number | null
          campus: boolean
          contact: string | null
          created_at: string
          description: string | null
          facilities: string[]
          hero_image_url: string | null
          id: string
          is_featured: boolean
          name: string
          payment_term:
            | Database["public"]["Enums"]["hostel_payment_term"]
            | null
          price: number
          rating: number | null
          type: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          agent_avatar_url?: string | null
          agent_email?: string | null
          agent_name?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          campus?: boolean
          contact?: string | null
          created_at?: string
          description?: string | null
          facilities?: string[]
          hero_image_url?: string | null
          id?: string
          is_featured?: boolean
          name: string
          payment_term?:
            | Database["public"]["Enums"]["hostel_payment_term"]
            | null
          price: number
          rating?: number | null
          type?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          agent_avatar_url?: string | null
          agent_email?: string | null
          agent_name?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          campus?: boolean
          contact?: string | null
          created_at?: string
          description?: string | null
          facilities?: string[]
          hero_image_url?: string | null
          id?: string
          is_featured?: boolean
          name?: string
          payment_term?:
            | Database["public"]["Enums"]["hostel_payment_term"]
            | null
          price?: number
          rating?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          completed: boolean
          created_at: string
          department_id: string | null
          email: string | null
          faculty_id: string | null
          full_name: string | null
          id: string
          index_number: string | null
          level: number | null
          onboarding_completed_at: string | null
          phone: string | null
          program_id: number | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          completed?: boolean
          created_at?: string
          department_id?: string | null
          email?: string | null
          faculty_id?: string | null
          full_name?: string | null
          id: string
          index_number?: string | null
          level?: number | null
          onboarding_completed_at?: string | null
          phone?: string | null
          program_id?: number | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          completed?: boolean
          created_at?: string
          department_id?: string | null
          email?: string | null
          faculty_id?: string | null
          full_name?: string | null
          id?: string
          index_number?: string | null
          level?: number | null
          onboarding_completed_at?: string | null
          phone?: string | null
          program_id?: number | null
          updated_at?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          created_at: string
          department: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          department: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          department?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      refresh_hostel_hero_image: {
        Args: { p_hostel_id: string }
        Returns: undefined
      }
    }
    Enums: {
      hostel_payment_term: "yearly" | "semester" | "academic_year"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      hostel_payment_term: ["yearly", "semester", "academic_year"],
    },
  },
} as const

