import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, type User, type InsertUser } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  initializeDatabase(): Promise<void>;
}

export class SupabaseStorage implements IStorage {
  private client: postgres.Sql | null = null;
  private db: any = null;

  private async getConnection() {
    if (!this.client && process.env.DATABASE_URL) {
      this.client = postgres(process.env.DATABASE_URL);
      this.db = drizzle(this.client);
    }
    return { client: this.client, db: this.db };
  }

  async initializeDatabase(): Promise<void> {
    try {
      const { client } = await this.getConnection();
      if (client) {
        await client`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
          )
        `;
        console.log("Database initialized successfully");
      }
    } catch (error) {
      console.error("Error initializing database:", error);
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
export const storage = process.env.DATABASE_URL 
  ? new SupabaseStorage() 
  : new MemStorage();
