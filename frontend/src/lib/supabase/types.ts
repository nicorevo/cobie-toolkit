export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  api: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      cobie_assets: {
        Row: {
          asset_identifier: string | null
          component_name: string | null
          description: string | null
          floor_name: string | null
          id: string | null
          inserted_at: string | null
          organization_id: string | null
          serial_number: string | null
          space_name: string | null
          tag_number: string | null
          type_category: string | null
          type_id: string | null
          type_name: string | null
          updated_at: string | null
          workbook_id: string | null
        }
        Relationships: []
      }
      cobie_document_index: {
        Row: {
          approval_by: string | null
          approval_contact_id: string | null
          category: string | null
          description: string | null
          directory: string | null
          file: string | null
          id: string | null
          name: string | null
          organization_id: string | null
          reference: string | null
          stage: string | null
          target_count: number | null
          workbook_id: string | null
        }
        Relationships: []
      }
      cobie_space_index: {
        Row: {
          category: string | null
          description: string | null
          floor_category: string | null
          floor_id: string | null
          floor_name: string | null
          gross_area: string | null
          id: string | null
          net_area: string | null
          organization_id: string | null
          room_tag: string | null
          space_name: string | null
          workbook_id: string | null
        }
        Relationships: []
      }
      cobie_validation_issues: {
        Row: {
          field_name: string | null
          message: string | null
          organization_id: string | null
          row_name: string | null
          rule_id: string | null
          severity: string | null
          sheet_name: string | null
          workbook_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_workbook: {
        Args: {
          p_name: string
          p_organization_id: string
          p_template_name?: string
        }
        Returns: Database["cobie"]["Tables"]["workbook"]["Row"]
        SetofOptions: {
          from: "*"
          to: "workbook"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      validate_workbook: {
        Args: { p_workbook_id: string }
        Returns: {
          field_name: string
          message: string
          row_name: string
          rule_id: string
          severity: string
          sheet_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  app: {
    Tables: {
      organization_members: {
        Row: {
          created_at: string
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          organization_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_org_admin: { Args: { org_id: string }; Returns: boolean }
      is_org_member: { Args: { org_id: string }; Returns: boolean }
      is_valid_cobie_scope: {
        Args: { p_organization_id: string; p_workbook_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  cobie: {
    Tables: {
      assembly: {
        Row: {
          assembly_type_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          id: string
          inserted_at: string
          name: string | null
          organization_id: string
          parent_id: string | null
          raw_row: Json
          sheet_name: string | null
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          assembly_type_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name?: string | null
          organization_id: string
          parent_id?: string | null
          raw_row?: Json
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          assembly_type_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name?: string | null
          organization_id?: string
          parent_id?: string | null
          raw_row?: Json
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assembly_assembly_type_fk"
            columns: ["workbook_id", "assembly_type_id"]
            isOneToOne: false
            referencedRelation: "assembly_type"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "assembly_parent_fk"
            columns: ["workbook_id", "parent_id"]
            isOneToOne: false
            referencedRelation: "assembly"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "assembly_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      assembly_child: {
        Row: {
          child_assembly_id: string
          id: string
          inserted_at: string
          organization_id: string
          parent_assembly_id: string
          source_position: number
          updated_at: string
          workbook_id: string
        }
        Insert: {
          child_assembly_id: string
          id?: string
          inserted_at?: string
          organization_id: string
          parent_assembly_id: string
          source_position?: number
          updated_at?: string
          workbook_id: string
        }
        Update: {
          child_assembly_id?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          parent_assembly_id?: string
          source_position?: number
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assembly_child_child_fk"
            columns: ["workbook_id", "child_assembly_id"]
            isOneToOne: false
            referencedRelation: "assembly"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "assembly_child_parent_fk"
            columns: ["workbook_id", "parent_assembly_id"]
            isOneToOne: false
            referencedRelation: "assembly"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "assembly_child_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      assembly_type: {
        Row: {
          assembly_type_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          assembly_type_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          assembly_type_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assembly_type_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_type: {
        Row: {
          asset_type_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          asset_type_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          asset_type_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_type_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      attribute: {
        Row: {
          allowed_values: string | null
          category_attribute_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          id: string
          inserted_at: string
          name: string
          organization_id: string
          raw_row: Json
          source_row_number: number | null
          source_sheet: string
          unit: string | null
          updated_at: string
          value: string | null
          workbook_id: string
        }
        Insert: {
          allowed_values?: string | null
          category_attribute_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name: string
          organization_id: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          unit?: string | null
          updated_at?: string
          value?: string | null
          workbook_id: string
        }
        Update: {
          allowed_values?: string | null
          category_attribute_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name?: string
          organization_id?: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          unit?: string | null
          updated_at?: string
          value?: string | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attribute_category_attribute_fk"
            columns: ["workbook_id", "category_attribute_id"]
            isOneToOne: false
            referencedRelation: "category_attribute"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "attribute_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_attribute: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_attribute_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_contact: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_contact_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_coordinate: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_coordinate_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_document: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_document_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_facility: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_facility_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_floor: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_floor_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_job: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_job_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_resource: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_resource_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_space: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_space_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_spare: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_spare_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_system: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_system_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_type: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_type_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      category_zone: {
        Row: {
          category_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_zone_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      component: {
        Row: {
          asset_identifier: string | null
          bar_code: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          id: string
          inserted_at: string
          installation_date: string | null
          name: string
          organization_id: string
          raw_row: Json
          serial_number: string | null
          source_row_number: number | null
          source_sheet: string
          tag_number: string | null
          type_id: string | null
          updated_at: string
          warranty_start_date: string | null
          workbook_id: string
        }
        Insert: {
          asset_identifier?: string | null
          bar_code?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          installation_date?: string | null
          name: string
          organization_id: string
          raw_row?: Json
          serial_number?: string | null
          source_row_number?: number | null
          source_sheet?: string
          tag_number?: string | null
          type_id?: string | null
          updated_at?: string
          warranty_start_date?: string | null
          workbook_id: string
        }
        Update: {
          asset_identifier?: string | null
          bar_code?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          installation_date?: string | null
          name?: string
          organization_id?: string
          raw_row?: Json
          serial_number?: string | null
          source_row_number?: number | null
          source_sheet?: string
          tag_number?: string | null
          type_id?: string | null
          updated_at?: string
          warranty_start_date?: string | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "component_type_fk"
            columns: ["workbook_id", "type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "component_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      component_space: {
        Row: {
          component_id: string
          id: string
          inserted_at: string
          organization_id: string
          source_position: number
          space_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          component_id: string
          id?: string
          inserted_at?: string
          organization_id: string
          source_position?: number
          space_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          component_id?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          source_position?: number
          space_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "component_space_component_fk"
            columns: ["workbook_id", "component_id"]
            isOneToOne: false
            referencedRelation: "component"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "component_space_space_fk"
            columns: ["workbook_id", "space_id"]
            isOneToOne: false
            referencedRelation: "space"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "component_space_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      connection: {
        Row: {
          connection_type_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          id: string
          inserted_at: string
          name: string | null
          organization_id: string
          port_name_1: string | null
          port_name_2: string | null
          raw_row: Json
          realizing_element: string | null
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          connection_type_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name?: string | null
          organization_id: string
          port_name_1?: string | null
          port_name_2?: string | null
          raw_row?: Json
          realizing_element?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          connection_type_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name?: string | null
          organization_id?: string
          port_name_1?: string | null
          port_name_2?: string | null
          raw_row?: Json
          realizing_element?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connection_connection_type_fk"
            columns: ["workbook_id", "connection_type_id"]
            isOneToOne: false
            referencedRelation: "connection_type"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "connection_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      connection_type: {
        Row: {
          id: string
          inserted_at: string
          organization_id: string
          type_name: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          organization_id: string
          type_name: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          organization_id?: string
          type_name?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connection_type_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      contact: {
        Row: {
          category_contact_id: string | null
          company: string | null
          country: string | null
          created_by_email: string | null
          created_on: string | null
          department: string | null
          email: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          family_name: string | null
          given_name: string | null
          id: string
          inserted_at: string
          organization_code: string | null
          organization_id: string
          phone: string | null
          postal_box: string | null
          postal_code: string | null
          raw_row: Json
          source_row_number: number | null
          source_sheet: string
          state_region: string | null
          street: string | null
          town: string | null
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_contact_id?: string | null
          company?: string | null
          country?: string | null
          created_by_email?: string | null
          created_on?: string | null
          department?: string | null
          email?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          family_name?: string | null
          given_name?: string | null
          id?: string
          inserted_at?: string
          organization_code?: string | null
          organization_id: string
          phone?: string | null
          postal_box?: string | null
          postal_code?: string | null
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          state_region?: string | null
          street?: string | null
          town?: string | null
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_contact_id?: string | null
          company?: string | null
          country?: string | null
          created_by_email?: string | null
          created_on?: string | null
          department?: string | null
          email?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          family_name?: string | null
          given_name?: string | null
          id?: string
          inserted_at?: string
          organization_code?: string | null
          organization_id?: string
          phone?: string | null
          postal_box?: string | null
          postal_code?: string | null
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          state_region?: string | null
          street?: string | null
          town?: string | null
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_category_contact_fk"
            columns: ["workbook_id", "category_contact_id"]
            isOneToOne: false
            referencedRelation: "category_contact"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "contact_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      coordinate: {
        Row: {
          category_coordinate_id: string | null
          clockwise_rotation: string | null
          coordinate_x_axis: string | null
          coordinate_y_axis: string | null
          coordinate_z_axis: string | null
          created_by_email: string | null
          created_on: string | null
          elevational_rotation: string | null
          ext_identifier: string | null
          ext_object: string | null
          ext_system: string | null
          id: string
          inserted_at: string
          name: string | null
          organization_id: string
          raw_row: Json
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
          yaw_rotation: string | null
        }
        Insert: {
          category_coordinate_id?: string | null
          clockwise_rotation?: string | null
          coordinate_x_axis?: string | null
          coordinate_y_axis?: string | null
          coordinate_z_axis?: string | null
          created_by_email?: string | null
          created_on?: string | null
          elevational_rotation?: string | null
          ext_identifier?: string | null
          ext_object?: string | null
          ext_system?: string | null
          id?: string
          inserted_at?: string
          name?: string | null
          organization_id: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
          yaw_rotation?: string | null
        }
        Update: {
          category_coordinate_id?: string | null
          clockwise_rotation?: string | null
          coordinate_x_axis?: string | null
          coordinate_y_axis?: string | null
          coordinate_z_axis?: string | null
          created_by_email?: string | null
          created_on?: string | null
          elevational_rotation?: string | null
          ext_identifier?: string | null
          ext_object?: string | null
          ext_system?: string | null
          id?: string
          inserted_at?: string
          name?: string | null
          organization_id?: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
          yaw_rotation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coordinate_category_coordinate_fk"
            columns: ["workbook_id", "category_coordinate_id"]
            isOneToOne: false
            referencedRelation: "category_coordinate"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "coordinate_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      document: {
        Row: {
          approval_contact_id: string | null
          category_document_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          directory: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          file: string | null
          id: string
          inserted_at: string
          name: string
          organization_id: string
          raw_row: Json
          reference: string | null
          source_row_number: number | null
          source_sheet: string
          stage_id: string | null
          updated_at: string
          workbook_id: string
        }
        Insert: {
          approval_contact_id?: string | null
          category_document_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          directory?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          file?: string | null
          id?: string
          inserted_at?: string
          name: string
          organization_id: string
          raw_row?: Json
          reference?: string | null
          source_row_number?: number | null
          source_sheet?: string
          stage_id?: string | null
          updated_at?: string
          workbook_id: string
        }
        Update: {
          approval_contact_id?: string | null
          category_document_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          directory?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          file?: string | null
          id?: string
          inserted_at?: string
          name?: string
          organization_id?: string
          raw_row?: Json
          reference?: string | null
          source_row_number?: number | null
          source_sheet?: string
          stage_id?: string | null
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_approval_contact_fk"
            columns: ["workbook_id", "approval_contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "document_category_document_fk"
            columns: ["workbook_id", "category_document_id"]
            isOneToOne: false
            referencedRelation: "category_document"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "document_stage_fk"
            columns: ["workbook_id", "stage_id"]
            isOneToOne: false
            referencedRelation: "document_stage"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "document_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      document_stage: {
        Row: {
          id: string
          inserted_at: string
          organization_id: string
          stage_name: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          organization_id: string
          stage_name: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          organization_id?: string
          stage_name?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_stage_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      facility: {
        Row: {
          area_measurement: string | null
          area_units: string | null
          category_facility_id: string | null
          created_by_email: string | null
          created_on: string | null
          currency_unit: string | null
          description: string | null
          external_facility_identifier: string | null
          external_facility_object: string | null
          external_project_identifier: string | null
          external_project_object: string | null
          external_site_identifier: string | null
          external_site_object: string | null
          external_system: string | null
          id: string
          inserted_at: string
          linear_units: string | null
          name: string
          organization_id: string
          phase: string | null
          project_description: string | null
          project_name: string | null
          raw_row: Json
          site_description: string | null
          site_name: string | null
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          volume_units: string | null
          workbook_id: string
        }
        Insert: {
          area_measurement?: string | null
          area_units?: string | null
          category_facility_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          currency_unit?: string | null
          description?: string | null
          external_facility_identifier?: string | null
          external_facility_object?: string | null
          external_project_identifier?: string | null
          external_project_object?: string | null
          external_site_identifier?: string | null
          external_site_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          linear_units?: string | null
          name: string
          organization_id: string
          phase?: string | null
          project_description?: string | null
          project_name?: string | null
          raw_row?: Json
          site_description?: string | null
          site_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          volume_units?: string | null
          workbook_id: string
        }
        Update: {
          area_measurement?: string | null
          area_units?: string | null
          category_facility_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          currency_unit?: string | null
          description?: string | null
          external_facility_identifier?: string | null
          external_facility_object?: string | null
          external_project_identifier?: string | null
          external_project_object?: string | null
          external_site_identifier?: string | null
          external_site_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          linear_units?: string | null
          name?: string
          organization_id?: string
          phase?: string | null
          project_description?: string | null
          project_name?: string | null
          raw_row?: Json
          site_description?: string | null
          site_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          volume_units?: string | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_category_facility_fk"
            columns: ["workbook_id", "category_facility_id"]
            isOneToOne: false
            referencedRelation: "category_facility"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "facility_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      floor: {
        Row: {
          category_floor_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          elevation: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          facility_id: string | null
          height: string | null
          id: string
          inserted_at: string
          name: string
          organization_id: string
          raw_row: Json
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_floor_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          elevation?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          facility_id?: string | null
          height?: string | null
          id?: string
          inserted_at?: string
          name: string
          organization_id: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_floor_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          elevation?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          facility_id?: string | null
          height?: string | null
          id?: string
          inserted_at?: string
          name?: string
          organization_id?: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "floor_category_floor_fk"
            columns: ["workbook_id", "category_floor_id"]
            isOneToOne: false
            referencedRelation: "category_floor"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "floor_facility_fk"
            columns: ["workbook_id", "facility_id"]
            isOneToOne: false
            referencedRelation: "facility"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "floor_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      impact: {
        Row: {
          created_by_email: string | null
          created_on: string | null
          description: string | null
          duration: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          id: string
          impact_stage_id: string | null
          impact_type_id: string | null
          impact_unit: string | null
          inserted_at: string
          lead_in_time: string | null
          lead_out_time: string | null
          name: string | null
          organization_id: string
          raw_row: Json
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          value: string | null
          workbook_id: string
        }
        Insert: {
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          duration?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          impact_stage_id?: string | null
          impact_type_id?: string | null
          impact_unit?: string | null
          inserted_at?: string
          lead_in_time?: string | null
          lead_out_time?: string | null
          name?: string | null
          organization_id: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          value?: string | null
          workbook_id: string
        }
        Update: {
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          duration?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          impact_stage_id?: string | null
          impact_type_id?: string | null
          impact_unit?: string | null
          inserted_at?: string
          lead_in_time?: string | null
          lead_out_time?: string | null
          name?: string | null
          organization_id?: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          value?: string | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "impact_impact_stage_fk"
            columns: ["workbook_id", "impact_stage_id"]
            isOneToOne: false
            referencedRelation: "impact_stage"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "impact_impact_type_fk"
            columns: ["workbook_id", "impact_type_id"]
            isOneToOne: false
            referencedRelation: "impact_type"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "impact_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      impact_stage: {
        Row: {
          id: string
          inserted_at: string
          organization_id: string
          stage_name: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          organization_id: string
          stage_name: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          organization_id?: string
          stage_name?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "impact_stage_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      impact_type: {
        Row: {
          id: string
          inserted_at: string
          organization_id: string
          type_name: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          organization_id: string
          type_name: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          organization_id?: string
          type_name?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "impact_type_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      issue: {
        Row: {
          chance_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          ext_identifier: string | null
          ext_object: string | null
          ext_system: string | null
          id: string
          inserted_at: string
          issue_impact_id: string | null
          issue_type_id: string | null
          mitigation: string | null
          name: string
          organization_id: string
          owner_contact_id: string | null
          raw_row: Json
          risk_id: string | null
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          chance_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          ext_identifier?: string | null
          ext_object?: string | null
          ext_system?: string | null
          id?: string
          inserted_at?: string
          issue_impact_id?: string | null
          issue_type_id?: string | null
          mitigation?: string | null
          name: string
          organization_id: string
          owner_contact_id?: string | null
          raw_row?: Json
          risk_id?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          chance_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          ext_identifier?: string | null
          ext_object?: string | null
          ext_system?: string | null
          id?: string
          inserted_at?: string
          issue_impact_id?: string | null
          issue_type_id?: string | null
          mitigation?: string | null
          name?: string
          organization_id?: string
          owner_contact_id?: string | null
          raw_row?: Json
          risk_id?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_chance_fk"
            columns: ["workbook_id", "chance_id"]
            isOneToOne: false
            referencedRelation: "issue_chance"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "issue_issue_impact_fk"
            columns: ["workbook_id", "issue_impact_id"]
            isOneToOne: false
            referencedRelation: "issue_impact"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "issue_issue_type_fk"
            columns: ["workbook_id", "issue_type_id"]
            isOneToOne: false
            referencedRelation: "issue_type"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "issue_owner_contact_fk"
            columns: ["workbook_id", "owner_contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "issue_risk_fk"
            columns: ["workbook_id", "risk_id"]
            isOneToOne: false
            referencedRelation: "issue_risk"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "issue_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      issue_chance: {
        Row: {
          chance_name: string
          id: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          chance_name: string
          id?: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          chance_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_chance_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      issue_impact: {
        Row: {
          id: string
          impact_name: string
          inserted_at: string
          organization_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          impact_name: string
          inserted_at?: string
          organization_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          impact_name?: string
          inserted_at?: string
          organization_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_impact_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      issue_risk: {
        Row: {
          id: string
          inserted_at: string
          organization_id: string
          risk_name: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          organization_id: string
          risk_name: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          organization_id?: string
          risk_name?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_risk_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      issue_target: {
        Row: {
          id: string
          inserted_at: string
          issue_id: string
          organization_id: string
          target_id: string
          target_position: number
          target_table: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          issue_id: string
          organization_id: string
          target_id: string
          target_position?: number
          target_table: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          issue_id?: string
          organization_id?: string
          target_id?: string
          target_position?: number
          target_table?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_target_issue_fk"
            columns: ["workbook_id", "issue_id"]
            isOneToOne: false
            referencedRelation: "issue"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "issue_target_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      issue_type: {
        Row: {
          id: string
          inserted_at: string
          organization_id: string
          type_name: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          organization_id: string
          type_name: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          organization_id?: string
          type_name?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_type_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      job: {
        Row: {
          category_job_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          duration: string | null
          duration_unit: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          frequency: string | null
          frequency_unit: string | null
          id: string
          inserted_at: string
          name: string
          organization_id: string
          raw_row: Json
          source_row_number: number | null
          source_sheet: string
          start_value: string | null
          status_id: string | null
          task_number: string | null
          task_start_unit: string | null
          type_id: string | null
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_job_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          duration?: string | null
          duration_unit?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          frequency?: string | null
          frequency_unit?: string | null
          id?: string
          inserted_at?: string
          name: string
          organization_id: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          start_value?: string | null
          status_id?: string | null
          task_number?: string | null
          task_start_unit?: string | null
          type_id?: string | null
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_job_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          duration?: string | null
          duration_unit?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          frequency?: string | null
          frequency_unit?: string | null
          id?: string
          inserted_at?: string
          name?: string
          organization_id?: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          start_value?: string | null
          status_id?: string | null
          task_number?: string | null
          task_start_unit?: string | null
          type_id?: string | null
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_category_job_fk"
            columns: ["workbook_id", "category_job_id"]
            isOneToOne: false
            referencedRelation: "category_job"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "job_status_fk"
            columns: ["workbook_id", "status_id"]
            isOneToOne: false
            referencedRelation: "job_status"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "job_type_fk"
            columns: ["workbook_id", "type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "job_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      job_prior: {
        Row: {
          id: string
          inserted_at: string
          job_id: string
          organization_id: string
          prior_job_id: string
          source_position: number
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          job_id: string
          organization_id: string
          prior_job_id: string
          source_position?: number
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          job_id?: string
          organization_id?: string
          prior_job_id?: string
          source_position?: number
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_prior_job_fk"
            columns: ["workbook_id", "job_id"]
            isOneToOne: false
            referencedRelation: "job"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "job_prior_prior_fk"
            columns: ["workbook_id", "prior_job_id"]
            isOneToOne: false
            referencedRelation: "job"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "job_prior_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      job_resource: {
        Row: {
          id: string
          inserted_at: string
          job_id: string
          organization_id: string
          resource_id: string
          source_position: number
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          job_id: string
          organization_id: string
          resource_id: string
          source_position?: number
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          job_id?: string
          organization_id?: string
          resource_id?: string
          source_position?: number
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_resource_job_fk"
            columns: ["workbook_id", "job_id"]
            isOneToOne: false
            referencedRelation: "job"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "job_resource_resource_fk"
            columns: ["workbook_id", "resource_id"]
            isOneToOne: false
            referencedRelation: "resource"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "job_resource_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      job_status: {
        Row: {
          id: string
          inserted_at: string
          organization_id: string
          status_name: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          organization_id: string
          status_name: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          organization_id?: string
          status_name?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_status_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      picklist: {
        Row: {
          description: string | null
          field_name: string
          id: string
          inserted_at: string
          organization_id: string | null
          raw_row: Json
          sheet_name: string
          source_version: string | null
          updated_at: string
          value: string
          workbook_id: string | null
        }
        Insert: {
          description?: string | null
          field_name: string
          id?: string
          inserted_at?: string
          organization_id?: string | null
          raw_row?: Json
          sheet_name: string
          source_version?: string | null
          updated_at?: string
          value: string
          workbook_id?: string | null
        }
        Update: {
          description?: string | null
          field_name?: string
          id?: string
          inserted_at?: string
          organization_id?: string | null
          raw_row?: Json
          sheet_name?: string
          source_version?: string | null
          updated_at?: string
          value?: string
          workbook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "picklist_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      resource: {
        Row: {
          category_resource_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          id: string
          inserted_at: string
          name: string
          organization_id: string
          raw_row: Json
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_resource_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name: string
          organization_id: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_resource_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name?: string
          organization_id?: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_category_resource_fk"
            columns: ["workbook_id", "category_resource_id"]
            isOneToOne: false
            referencedRelation: "category_resource"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "resource_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      row_reference: {
        Row: {
          id: string
          inserted_at: string
          organization_id: string
          source_id: string
          source_table: string
          target_id: string
          target_position: number
          target_table: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          organization_id: string
          source_id: string
          source_table: string
          target_id: string
          target_position?: number
          target_table: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          organization_id?: string
          source_id?: string
          source_table?: string
          target_id?: string
          target_position?: number
          target_table?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "row_reference_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      space: {
        Row: {
          category_space_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          floor_id: string | null
          gross_area: string | null
          id: string
          inserted_at: string
          name: string
          net_area: string | null
          organization_id: string
          raw_row: Json
          room_tag: string | null
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          usable_height: string | null
          workbook_id: string
        }
        Insert: {
          category_space_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          floor_id?: string | null
          gross_area?: string | null
          id?: string
          inserted_at?: string
          name: string
          net_area?: string | null
          organization_id: string
          raw_row?: Json
          room_tag?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          usable_height?: string | null
          workbook_id: string
        }
        Update: {
          category_space_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          floor_id?: string | null
          gross_area?: string | null
          id?: string
          inserted_at?: string
          name?: string
          net_area?: string | null
          organization_id?: string
          raw_row?: Json
          room_tag?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          usable_height?: string | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_category_space_fk"
            columns: ["workbook_id", "category_space_id"]
            isOneToOne: false
            referencedRelation: "category_space"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "space_floor_fk"
            columns: ["workbook_id", "floor_id"]
            isOneToOne: false
            referencedRelation: "floor"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "space_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      spare: {
        Row: {
          category_spare_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          id: string
          inserted_at: string
          name: string
          organization_id: string
          part_number: string | null
          raw_row: Json
          set_number: string | null
          source_row_number: number | null
          source_sheet: string
          type_id: string | null
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_spare_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name: string
          organization_id: string
          part_number?: string | null
          raw_row?: Json
          set_number?: string | null
          source_row_number?: number | null
          source_sheet?: string
          type_id?: string | null
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_spare_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name?: string
          organization_id?: string
          part_number?: string | null
          raw_row?: Json
          set_number?: string | null
          source_row_number?: number | null
          source_sheet?: string
          type_id?: string | null
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spare_category_spare_fk"
            columns: ["workbook_id", "category_spare_id"]
            isOneToOne: false
            referencedRelation: "category_spare"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "spare_type_fk"
            columns: ["workbook_id", "type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "spare_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      spare_supplier: {
        Row: {
          contact_id: string
          id: string
          inserted_at: string
          organization_id: string
          source_position: number
          spare_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          contact_id: string
          id?: string
          inserted_at?: string
          organization_id: string
          source_position?: number
          spare_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          contact_id?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          source_position?: number
          spare_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spare_supplier_contact_fk"
            columns: ["workbook_id", "contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "spare_supplier_spare_fk"
            columns: ["workbook_id", "spare_id"]
            isOneToOne: false
            referencedRelation: "spare"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "spare_supplier_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      system: {
        Row: {
          category_system_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          id: string
          inserted_at: string
          name: string
          organization_id: string
          raw_row: Json
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_system_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name: string
          organization_id: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_system_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name?: string
          organization_id?: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_category_system_fk"
            columns: ["workbook_id", "category_system_id"]
            isOneToOne: false
            referencedRelation: "category_system"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "system_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      system_component: {
        Row: {
          component_id: string
          id: string
          inserted_at: string
          organization_id: string
          source_position: number
          system_id: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          component_id: string
          id?: string
          inserted_at?: string
          organization_id: string
          source_position?: number
          system_id: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          component_id?: string
          id?: string
          inserted_at?: string
          organization_id?: string
          source_position?: number
          system_id?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_component_component_fk"
            columns: ["workbook_id", "component_id"]
            isOneToOne: false
            referencedRelation: "component"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "system_component_system_fk"
            columns: ["workbook_id", "system_id"]
            isOneToOne: false
            referencedRelation: "system"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "system_component_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      type: {
        Row: {
          accessibility_performance: string | null
          asset_type_id: string | null
          category_type_id: string | null
          code_performance: string | null
          color: string | null
          constituents: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          duration_unit: string | null
          expected_life: string | null
          features: string | null
          finish: string | null
          grade: string | null
          id: string
          inserted_at: string
          manufacturer: string | null
          material: string | null
          model_number: string | null
          model_reference: string | null
          name: string
          nominal_height: string | null
          nominal_length: string | null
          nominal_width: string | null
          organization_id: string
          raw_row: Json
          replacement_cost: string | null
          shape: string | null
          size: string | null
          source_row_number: number | null
          source_sheet: string
          sustainability_performance: string | null
          updated_at: string
          warranty_description: string | null
          warranty_duration_labor: string | null
          warranty_duration_parts: string | null
          warranty_duration_unit: string | null
          warranty_guarantor_labor: string | null
          warranty_guarantor_parts: string | null
          workbook_id: string
        }
        Insert: {
          accessibility_performance?: string | null
          asset_type_id?: string | null
          category_type_id?: string | null
          code_performance?: string | null
          color?: string | null
          constituents?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          duration_unit?: string | null
          expected_life?: string | null
          features?: string | null
          finish?: string | null
          grade?: string | null
          id?: string
          inserted_at?: string
          manufacturer?: string | null
          material?: string | null
          model_number?: string | null
          model_reference?: string | null
          name: string
          nominal_height?: string | null
          nominal_length?: string | null
          nominal_width?: string | null
          organization_id: string
          raw_row?: Json
          replacement_cost?: string | null
          shape?: string | null
          size?: string | null
          source_row_number?: number | null
          source_sheet?: string
          sustainability_performance?: string | null
          updated_at?: string
          warranty_description?: string | null
          warranty_duration_labor?: string | null
          warranty_duration_parts?: string | null
          warranty_duration_unit?: string | null
          warranty_guarantor_labor?: string | null
          warranty_guarantor_parts?: string | null
          workbook_id: string
        }
        Update: {
          accessibility_performance?: string | null
          asset_type_id?: string | null
          category_type_id?: string | null
          code_performance?: string | null
          color?: string | null
          constituents?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          duration_unit?: string | null
          expected_life?: string | null
          features?: string | null
          finish?: string | null
          grade?: string | null
          id?: string
          inserted_at?: string
          manufacturer?: string | null
          material?: string | null
          model_number?: string | null
          model_reference?: string | null
          name?: string
          nominal_height?: string | null
          nominal_length?: string | null
          nominal_width?: string | null
          organization_id?: string
          raw_row?: Json
          replacement_cost?: string | null
          shape?: string | null
          size?: string | null
          source_row_number?: number | null
          source_sheet?: string
          sustainability_performance?: string | null
          updated_at?: string
          warranty_description?: string | null
          warranty_duration_labor?: string | null
          warranty_duration_parts?: string | null
          warranty_duration_unit?: string | null
          warranty_guarantor_labor?: string | null
          warranty_guarantor_parts?: string | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "type_asset_type_fk"
            columns: ["workbook_id", "asset_type_id"]
            isOneToOne: false
            referencedRelation: "asset_type"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "type_category_type_fk"
            columns: ["workbook_id", "category_type_id"]
            isOneToOne: false
            referencedRelation: "category_type"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "type_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      workbook: {
        Row: {
          created_at: string
          id: string
          ifc_schema: string | null
          name: string
          notes: string | null
          organization_id: string
          standard_version: string
          status: string
          template_checksum: string | null
          template_name: string | null
          template_source_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          ifc_schema?: string | null
          name: string
          notes?: string | null
          organization_id: string
          standard_version?: string
          status?: string
          template_checksum?: string | null
          template_name?: string | null
          template_source_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          ifc_schema?: string | null
          name?: string
          notes?: string | null
          organization_id?: string
          standard_version?: string
          status?: string
          template_checksum?: string | null
          template_name?: string | null
          template_source_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      zone: {
        Row: {
          category_zone_id: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          id: string
          inserted_at: string
          name: string
          organization_id: string
          raw_row: Json
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category_zone_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name: string
          organization_id: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category_zone_id?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          id?: string
          inserted_at?: string
          name?: string
          organization_id?: string
          raw_row?: Json
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "zone_category_zone_fk"
            columns: ["workbook_id", "category_zone_id"]
            isOneToOne: false
            referencedRelation: "category_zone"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "zone_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      zone_space: {
        Row: {
          id: string
          inserted_at: string
          organization_id: string
          source_position: number
          space_id: string
          updated_at: string
          workbook_id: string
          zone_id: string
        }
        Insert: {
          id?: string
          inserted_at?: string
          organization_id: string
          source_position?: number
          space_id: string
          updated_at?: string
          workbook_id: string
          zone_id: string
        }
        Update: {
          id?: string
          inserted_at?: string
          organization_id?: string
          source_position?: number
          space_id?: string
          updated_at?: string
          workbook_id?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "zone_space_space_fk"
            columns: ["workbook_id", "space_id"]
            isOneToOne: false
            referencedRelation: "space"
            referencedColumns: ["workbook_id", "id"]
          },
          {
            foreignKeyName: "zone_space_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zone_space_zone_fk"
            columns: ["workbook_id", "zone_id"]
            isOneToOne: false
            referencedRelation: "zone"
            referencedColumns: ["workbook_id", "id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  api: {
    Enums: {},
  },
  app: {
    Enums: {},
  },
  cobie: {
    Enums: {},
  },
} as const
