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
          type_name: string | null
          updated_at: string | null
          workbook_id: string | null
        }
        Relationships: []
      }
      cobie_document_index: {
        Row: {
          category: string | null
          description: string | null
          directory: string | null
          file: string | null
          id: string | null
          name: string | null
          organization_id: string | null
          reference: string | null
          row_name: string | null
          sheet_name: string | null
          workbook_id: string | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          directory?: string | null
          file?: string | null
          id?: string | null
          name?: string | null
          organization_id?: string | null
          reference?: string | null
          row_name?: string | null
          sheet_name?: string | null
          workbook_id?: string | null
        }
        Update: {
          category?: string | null
          description?: string | null
          directory?: string | null
          file?: string | null
          id?: string | null
          name?: string | null
          organization_id?: string | null
          reference?: string | null
          row_name?: string | null
          sheet_name?: string | null
          workbook_id?: string | null
        }
        Relationships: []
      }
      cobie_space_index: {
        Row: {
          category: string | null
          description: string | null
          floor_category: string | null
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
          assembly_type: string | null
          child_names: string | null
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
          parent_name: string | null
          raw_row: Json
          sheet_name: string | null
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          assembly_type?: string | null
          child_names?: string | null
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
          parent_name?: string | null
          raw_row?: Json
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          assembly_type?: string | null
          child_names?: string | null
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
          parent_name?: string | null
          raw_row?: Json
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assembly_workbook_id_fkey"
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
          category: string | null
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
          row_name: string | null
          sheet_name: string | null
          source_row_number: number | null
          source_sheet: string
          unit: string | null
          updated_at: string
          value: string | null
          workbook_id: string
        }
        Insert: {
          allowed_values?: string | null
          category?: string | null
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
          row_name?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          unit?: string | null
          updated_at?: string
          value?: string | null
          workbook_id: string
        }
        Update: {
          allowed_values?: string | null
          category?: string | null
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
          row_name?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          unit?: string | null
          updated_at?: string
          value?: string | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attribute_workbook_id_fkey"
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
          space_name: string | null
          tag_number: string | null
          type_name: string | null
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
          space_name?: string | null
          tag_number?: string | null
          type_name?: string | null
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
          space_name?: string | null
          tag_number?: string | null
          type_name?: string | null
          updated_at?: string
          warranty_start_date?: string | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "component_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      connection: {
        Row: {
          connection_type: string | null
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
          row_name_1: string | null
          row_name_2: string | null
          sheet_name: string | null
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
        }
        Insert: {
          connection_type?: string | null
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
          row_name_1?: string | null
          row_name_2?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
        }
        Update: {
          connection_type?: string | null
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
          row_name_1?: string | null
          row_name_2?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connection_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      contact: {
        Row: {
          category: string | null
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
          category?: string | null
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
          category?: string | null
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
          category: string | null
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
          row_name: string | null
          sheet_name: string | null
          source_row_number: number | null
          source_sheet: string
          updated_at: string
          workbook_id: string
          yaw_rotation: string | null
        }
        Insert: {
          category?: string | null
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
          row_name?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id: string
          yaw_rotation?: string | null
        }
        Update: {
          category?: string | null
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
          row_name?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          workbook_id?: string
          yaw_rotation?: string | null
        }
        Relationships: [
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
          approval_by: string | null
          category: string | null
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
          row_name: string | null
          sheet_name: string | null
          source_row_number: number | null
          source_sheet: string
          stage: string | null
          updated_at: string
          workbook_id: string
        }
        Insert: {
          approval_by?: string | null
          category?: string | null
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
          row_name?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          stage?: string | null
          updated_at?: string
          workbook_id: string
        }
        Update: {
          approval_by?: string | null
          category?: string | null
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
          row_name?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          stage?: string | null
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_workbook_id_fkey"
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
          category: string | null
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
          category?: string | null
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
          category?: string | null
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
          category: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          elevation: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
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
          category?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          elevation?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
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
          category?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          elevation?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
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
          impact_stage: string | null
          impact_type: string | null
          impact_unit: string | null
          inserted_at: string
          lead_in_time: string | null
          lead_out_time: string | null
          name: string | null
          organization_id: string
          raw_row: Json
          row_name: string | null
          sheet_name: string | null
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
          impact_stage?: string | null
          impact_type?: string | null
          impact_unit?: string | null
          inserted_at?: string
          lead_in_time?: string | null
          lead_out_time?: string | null
          name?: string | null
          organization_id: string
          raw_row?: Json
          row_name?: string | null
          sheet_name?: string | null
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
          impact_stage?: string | null
          impact_type?: string | null
          impact_unit?: string | null
          inserted_at?: string
          lead_in_time?: string | null
          lead_out_time?: string | null
          name?: string | null
          organization_id?: string
          raw_row?: Json
          row_name?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          updated_at?: string
          value?: string | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "impact_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      issue: {
        Row: {
          chance: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          ext_identifier: string | null
          ext_object: string | null
          ext_system: string | null
          id: string
          impact: string | null
          inserted_at: string
          mitigation: string | null
          name: string
          organization_id: string
          owner: string | null
          raw_row: Json
          risk: string | null
          row_name: string | null
          sheet_name: string | null
          source_row_number: number | null
          source_sheet: string
          type: string | null
          updated_at: string
          workbook_id: string
        }
        Insert: {
          chance?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          ext_identifier?: string | null
          ext_object?: string | null
          ext_system?: string | null
          id?: string
          impact?: string | null
          inserted_at?: string
          mitigation?: string | null
          name: string
          organization_id: string
          owner?: string | null
          raw_row?: Json
          risk?: string | null
          row_name?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          type?: string | null
          updated_at?: string
          workbook_id: string
        }
        Update: {
          chance?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          ext_identifier?: string | null
          ext_object?: string | null
          ext_system?: string | null
          id?: string
          impact?: string | null
          inserted_at?: string
          mitigation?: string | null
          name?: string
          organization_id?: string
          owner?: string | null
          raw_row?: Json
          risk?: string | null
          row_name?: string | null
          sheet_name?: string | null
          source_row_number?: number | null
          source_sheet?: string
          type?: string | null
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      job: {
        Row: {
          category: string | null
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
          priors: string | null
          raw_row: Json
          resource_names: string | null
          source_row_number: number | null
          source_sheet: string
          start_value: string | null
          status: string | null
          task_number: string | null
          task_start_unit: string | null
          type_name: string | null
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category?: string | null
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
          priors?: string | null
          raw_row?: Json
          resource_names?: string | null
          source_row_number?: number | null
          source_sheet?: string
          start_value?: string | null
          status?: string | null
          task_number?: string | null
          task_start_unit?: string | null
          type_name?: string | null
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category?: string | null
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
          priors?: string | null
          raw_row?: Json
          resource_names?: string | null
          source_row_number?: number | null
          source_sheet?: string
          start_value?: string | null
          status?: string | null
          task_number?: string | null
          task_start_unit?: string | null
          type_name?: string | null
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_workbook_id_fkey"
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
          category: string | null
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
          category?: string | null
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
          category?: string | null
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
            foreignKeyName: "resource_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      space: {
        Row: {
          category: string | null
          created_by_email: string | null
          created_on: string | null
          description: string | null
          external_identifier: string | null
          external_object: string | null
          external_system: string | null
          floor_name: string | null
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
          category?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          floor_name?: string | null
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
          category?: string | null
          created_by_email?: string | null
          created_on?: string | null
          description?: string | null
          external_identifier?: string | null
          external_object?: string | null
          external_system?: string | null
          floor_name?: string | null
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
          category: string | null
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
          suppliers: string | null
          type_name: string | null
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category?: string | null
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
          suppliers?: string | null
          type_name?: string | null
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category?: string | null
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
          suppliers?: string | null
          type_name?: string | null
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spare_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
          },
        ]
      }
      system: {
        Row: {
          category: string | null
          component_names: string | null
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
          category?: string | null
          component_names?: string | null
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
          category?: string | null
          component_names?: string | null
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
            foreignKeyName: "system_workbook_id_fkey"
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
          asset_type: string | null
          category: string | null
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
          asset_type?: string | null
          category?: string | null
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
          asset_type?: string | null
          category?: string | null
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
          category: string | null
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
          space_names: string | null
          updated_at: string
          workbook_id: string
        }
        Insert: {
          category?: string | null
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
          space_names?: string | null
          updated_at?: string
          workbook_id: string
        }
        Update: {
          category?: string | null
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
          space_names?: string | null
          updated_at?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "zone_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["id"]
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

