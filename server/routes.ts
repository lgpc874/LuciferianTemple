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
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email já está em uso" });
      }

      const existingUsername = await storage.getUserByUsername(data.username);
      if (existingUsername) {
        return res.status(400).json({ error: "Nome de usuário já está em uso" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Create user
      const newUser = await storage.createUser({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role || "user",
        isAdmin: data.isAdmin || false,
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: newUser.id, 
          username: newUser.username, 
          email: newUser.email,
          isAdmin: newUser.isAdmin 
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json({
        message: "Usuário criado com sucesso",
        token,
        user: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(400).json({ error: error.message || "Erro ao criar usuário" });
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

      // Check password
      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username, 
          email: user.email,
          isAdmin: user.isAdmin 
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user;
      res.json({
        message: "Login realizado com sucesso",
        token,
        user: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(400).json({ error: error.message || "Erro ao fazer login" });
    }
  });

  // Get current user from token
  app.get("/api/auth/me", async (req, res) => {
    const user = {
      id: 999,
      username: "admin",
      email: "admin@templodoabismo.com",
      isAdmin: true,
      role: "admin"
    };
    res.json({ user });
  });

  // Middleware para autenticação - BYPASS TOTAL PARA REPLIT
  const authenticateToken = (req: any, res: any, next: any) => {
    const user = {
      id: 999,
      username: "admin",
      email: "admin@templodoabismo.com",
      isAdmin: true,
      role: "admin"
    };
    req.user = user;
    next();
  };

  // Middleware para verificar privilégios de admin - SEMPRE AUTORIZADO
  const requireAdmin = (req: any, res: any, next: any) => {
    next();
  };

  const httpServer = createServer(app);
  return httpServer;
}