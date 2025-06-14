import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const grimoires = pgTable("grimoires", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  coverImageUrl: text("cover_image_url").notNull(),
  category: text("category").notNull(),
  sectionId: integer("section_id").references(() => librarySections.id),
  difficultyLevel: integer("difficulty_level").notNull(),
  unlockOrder: integer("unlock_order").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  price: text("price"), // null = gratuito, valor = preço em R$
  isPaid: boolean("is_paid").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  grimoireId: integer("grimoire_id").references(() => grimoires.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  chapterOrder: integer("chapter_order").notNull(),
  estimatedReadingTime: integer("estimated_reading_time").notNull(),
  unlockCriteria: text("unlock_criteria").default("previous_chapter").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  grimoireId: integer("grimoire_id").references(() => grimoires.id).notNull(),
  chapterId: integer("chapter_id").references(() => chapters.id),
  progressType: text("progress_type").notNull(),
  currentPage: integer("current_page").default(1),
  readingTime: integer("reading_time").default(0),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const librarySections = pgTable("library_sections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  role: true,
  isAdmin: true,
}).partial({
  role: true,
  isAdmin: true,
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = insertUserSchema.extend({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
});

// Schemas para grimórios
export const insertGrimoireSchema = createInsertSchema(grimoires).pick({
  title: true,
  description: true,
  coverImageUrl: true,
  category: true,
  sectionId: true,
  difficultyLevel: true,
  unlockOrder: true,
  isActive: true,
  price: true,
  isPaid: true,
});

export const insertChapterSchema = createInsertSchema(chapters).pick({
  grimoireId: true,
  title: true,
  content: true,
  chapterOrder: true,
  estimatedReadingTime: true,
  unlockCriteria: true,
});

export const insertProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  grimoireId: true,
  chapterId: true,
  progressType: true,
  currentPage: true,
  readingTime: true,
});

export const insertLibrarySectionSchema = createInsertSchema(librarySections).pick({
  name: true,
  description: true,
  slug: true,
  displayOrder: true,
  isActive: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

export type Grimoire = typeof grimoires.$inferSelect;
export type InsertGrimoire = z.infer<typeof insertGrimoireSchema>;
export type Chapter = typeof chapters.$inferSelect;
export type InsertChapter = z.infer<typeof insertChapterSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type LibrarySection = typeof librarySections.$inferSelect;
export type InsertLibrarySection = z.infer<typeof insertLibrarySectionSchema>;
