import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createClient } from '@supabase/supabase-js';
import { users, type User, type InsertUser } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
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
      const { client } = await this.getConnection();
      if (client) {
        // Simple connection test
        await client`SELECT 1`;
        
        // Create users table
        await client`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          )
        `;
        console.log("Supabase database initialized successfully");
      }
    } catch (error) {
      console.error("Supabase connection error:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const { db } = await this.getConnection();
      if (db) {
        const result = await db.select().from(users).where(eq(users.id, id));
        return result[0];
      }
      return undefined;
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const { db } = await this.getConnection();
      if (db) {
        const result = await db.select().from(users).where(eq(users.username, username));
        return result[0];
      }
      return undefined;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const { db } = await this.getConnection();
      if (db) {
        const result = await db.insert(users).values(insertUser).returning();
        return result[0];
      }
      throw new Error("Database not available");
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
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

  async createUser(user: InsertUser): Promise<User> {
    return this.useSupabase 
      ? this.supabaseStorage.createUser(user)
      : this.memStorage.createUser(user);
  }
}

export const storage = new HybridStorage();
