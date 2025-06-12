import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createClient } from '@supabase/supabase-js';
import { users, grimoires, chapters, userProgress, type User, type InsertUser, type Grimoire, type Chapter, type UserProgress, type InsertProgress } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  initializeDatabase(): Promise<void>;
}

export class SupabaseStorage implements IStorage {
  private supabaseClient: any = null;

  private getSupabaseClient() {
    if (!this.supabaseClient && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      this.supabaseClient = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
      );
    }
    return this.supabaseClient;
  }

  async initializeDatabase(): Promise<void> {
    try {
      const client = this.getSupabaseClient();
      if (client) {
        // Test connection by attempting a simple query
        const { error } = await client.from('users').select('count', { count: 'exact', head: true });
        
        if (error && error.code === 'PGRST116') {
          console.log("Users table doesn't exist - please create it in Supabase dashboard");
          console.log("SQL: CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL);");
        } else if (error) {
          throw new Error(`Supabase error: ${error.message}`);
        }
        
        console.log("Supabase connection established successfully");
      }
    } catch (error) {
      console.error("Supabase connection error:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const client = this.getSupabaseClient();
      if (!client) return undefined;
      
      const { data, error } = await client
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return undefined; // No rows found
        console.error('Error fetching user:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const client = this.getSupabaseClient();
      if (!client) return undefined;
      
      const { data, error } = await client
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return undefined; // No rows found
        console.error('Error fetching user by username:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const client = this.getSupabaseClient();
      if (!client) return undefined;
      
      const { data, error } = await client
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return undefined; // No rows found
        console.error('Error fetching user by email:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const client = this.getSupabaseClient();
    if (!client) throw new Error('Database connection failed');
    
    const { data, error } = await client
      .from('users')
      .insert(insertUser)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
    
    return data;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }



  async initializeDatabase(): Promise<void> {
    // No-op for memory storage
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
}

// Use Supabase if DATABASE_URL is available, otherwise fallback to memory
// Create storage instance with smart fallback
class HybridStorage implements IStorage {
  private supabaseStorage: SupabaseStorage;
  private memStorage: MemStorage;
  private useSupabase: boolean = false;

  constructor() {
    this.supabaseStorage = new SupabaseStorage();
    this.memStorage = new MemStorage();
  }

  async initializeDatabase(): Promise<void> {
    if (process.env.DATABASE_URL) {
      try {
        await this.supabaseStorage.initializeDatabase();
        this.useSupabase = true;
        console.log("✓ Using Supabase storage");
      } catch (error) {
        console.warn("⚠️  Supabase failed, using memory storage");
        await this.memStorage.initializeDatabase();
        this.useSupabase = false;
      }
    } else {
      await this.memStorage.initializeDatabase();
      this.useSupabase = false;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.useSupabase 
      ? this.supabaseStorage.getUser(id)
      : this.memStorage.getUser(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.useSupabase 
      ? this.supabaseStorage.getUserByUsername(username)
      : this.memStorage.getUserByUsername(username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.useSupabase 
      ? this.supabaseStorage.getUserByEmail(email)
      : this.memStorage.getUserByEmail(email);
  }

  async createUser(user: InsertUser): Promise<User> {
    return this.useSupabase 
      ? this.supabaseStorage.createUser(user)
      : this.memStorage.createUser(user);
  }
}

export const storage = new HybridStorage();
