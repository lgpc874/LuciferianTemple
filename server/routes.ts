import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerSchema, loginSchema, type RegisterData, type LoginData } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "templo_abismo_secret_key";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data: RegisterData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUserByEmail = await storage.getUserByEmail(data.email);
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email já está em uso" });
      }
      
      const existingUserByUsername = await storage.getUserByUsername(data.username);
      if (existingUserByUsername) {
        return res.status(400).json({ error: "Nome de usuário já está em uso" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      // Create user
      const user = await storage.createUser({
        username: data.username,
        email: data.email,
        password: hashedPassword
      });
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
      
      res.json({ 
        user: { id: user.id, username: user.username, email: user.email },
        token 
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Erro ao criar conta" });
    }
  });

  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const data: LoginData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(data.email);
      if (!user) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(data.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
      
      res.json({ 
        user: { id: user.id, username: user.username, email: user.email },
        token 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ error: "Erro no login" });
    }
  });

  // Get current user endpoint
  app.get("/api/auth/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token não fornecido" });
      }
      
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
      
      const user = await storage.getUser(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }
      
      res.json({ 
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      console.error("Auth verification error:", error);
      res.status(401).json({ error: "Token inválido" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
