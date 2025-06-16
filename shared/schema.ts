import { pgTable, text, varchar, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
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

// Seções da biblioteca para organização dos grimórios
export const library_sections = pgTable("library_sections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  display_order: integer("display_order").default(0).notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// Grimórios principais
export const grimoires = pgTable("grimoires", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content"),
  difficulty_level: integer("difficulty_level").default(1).notNull(),
  section_id: integer("section_id").references(() => library_sections.id).notNull(),
  cover_image_url: text("cover_image_url"),
  price: decimal("price", { precision: 10, scale: 2 }),
  is_paid: boolean("is_paid").default(false).notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  unlock_order: integer("unlock_order").default(0).notNull(),
  estimated_reading_time: integer("estimated_reading_time").default(30).notNull(),
  is_published: boolean("is_published").default(false).notNull(),
  level: text("level").default("iniciante").notNull(),
  tags: text("tags").array(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Capítulos dos grimórios
export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  grimoire_id: integer("grimoire_id").references(() => grimoires.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  chapter_number: integer("chapter_number").notNull(),
  estimated_reading_time: integer("estimated_reading_time").default(10).notNull(),
  is_unlocked: boolean("is_unlocked").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// Progresso de leitura dos usuários
export const user_progress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  grimoire_id: integer("grimoire_id").references(() => grimoires.id).notNull(),
  current_page: integer("current_page").default(1),
  total_pages: integer("total_pages").default(1),
  reading_time_minutes: integer("reading_time_minutes").default(0),
  is_completed: boolean("is_completed").default(false).notNull(),
  last_read_at: timestamp("last_read_at").defaultNow(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Compras de grimórios (Stripe)
export const grimoire_purchases = pgTable("grimoire_purchases", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  grimoire_id: integer("grimoire_id").references(() => grimoires.id).notNull(),
  payment_intent_id: text("payment_intent_id").notNull().unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  purchased_at: timestamp("purchased_at").defaultNow(),
  created_at: timestamp("created_at").defaultNow(),
});

// Tabela para configurações de IA
export const ai_settings = pgTable("ai_settings", {
  id: serial("id").primaryKey(),
  personality: text("personality").default("luciferian").notNull(),
  complexity: text("complexity").default("beginner").notNull(),
  length: text("length").default("medium").notNull(),
  style: text("style").default("mixed").notNull(),
  guidelines: text("guidelines").default(""),
  default_section: text("default_section").default(""),
  auto_price: boolean("auto_price").default(false).notNull(),
  price_range_min: decimal("price_range_min", { precision: 10, scale: 2 }).default("9.99"),
  price_range_max: decimal("price_range_max", { precision: 10, scale: 2 }).default("49.99"),
  updated_at: timestamp("updated_at").defaultNow(),
  created_at: timestamp("created_at").defaultNow(),
});

// Tabela para configurações gerais do sistema
export const system_settings = pgTable("system_settings", {
  id: serial("id").primaryKey(),
  site_name: text("site_name").default("Templo do Abismo").notNull(),
  site_description: text("site_description").default("Portal de ensinamentos luciferianos").notNull(),
  site_keywords: text("site_keywords").default("lucifer, ocultismo, magia, grimórios").notNull(),
  admin_email: text("admin_email").default("admin@templodoabismo.com.br").notNull(),
  content_language: text("content_language").default("português").notNull(),
  content_tone: text("content_tone").default("formal").notNull(),
  content_target_audience: text("content_target_audience").default("iniciantes").notNull(),
  enable_user_registration: boolean("enable_user_registration").default(true).notNull(),
  enable_paid_content: boolean("enable_paid_content").default(true).notNull(),
  enable_ai_generation: boolean("enable_ai_generation").default(true).notNull(),
  security_level: text("security_level").default("medium").notNull(),
  enable_content_protection: boolean("enable_content_protection").default(true).notNull(),
  enable_download_protection: boolean("enable_download_protection").default(true).notNull(),
  auto_publish: boolean("auto_publish").default(false).notNull(),
  require_approval: boolean("require_approval").default(true).notNull(),
  default_currency: text("default_currency").default("BRL").notNull(),
  enable_comment_moderation: boolean("enable_comment_moderation").default(true).notNull(),
  max_file_size: integer("max_file_size").default(10).notNull(),
  free_trial_days: integer("free_trial_days").default(7).notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
  created_at: timestamp("created_at").defaultNow(),
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

// Schemas de validação para biblioteca
export const insertLibrarySectionSchema = createInsertSchema(library_sections).pick({
  name: true,
  description: true,
  slug: true,
  display_order: true,
  is_active: true,
});

export const insertGrimoireSchema = createInsertSchema(grimoires).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertChapterSchema = createInsertSchema(chapters).pick({
  grimoire_id: true,
  title: true,
  content: true,
  chapter_number: true,
  word_count: true,
  estimated_reading_time: true,
  is_unlocked: true,
});

export const insertProgressSchema = createInsertSchema(user_progress).pick({
  user_id: true,
  grimoire_id: true,
  current_page: true,
  total_pages: true,
  reading_time_minutes: true,
  is_completed: true,
  last_read_at: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

// Tipos da biblioteca
export type LibrarySection = typeof library_sections.$inferSelect;
export type InsertLibrarySection = z.infer<typeof insertLibrarySectionSchema>;

export type Grimoire = typeof grimoires.$inferSelect;
export type InsertGrimoire = z.infer<typeof insertGrimoireSchema>;

export type Chapter = typeof chapters.$inferSelect;
export type InsertChapter = z.infer<typeof insertChapterSchema>;

export type UserProgress = typeof user_progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
