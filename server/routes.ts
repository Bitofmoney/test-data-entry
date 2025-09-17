
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = storage.authenticateUser(username, password);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Return user data without password
      const { password: _, ...userResponse } = user;
      res.json({ 
        message: "Login successful",
        user: userResponse
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Get user profile
  app.get("/api/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = storage.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Admin only - get all users
  app.get("/api/admin/users", async (req, res) => {
    try {
      // In a real app, you'd verify admin token here
      const users = storage.getAllUsers().map(({ password: _, ...user }) => user);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
