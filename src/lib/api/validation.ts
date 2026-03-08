
import { z, ZodError, ZodIssue } from 'zod';

export class ValidationError extends Error {
  constructor(
    message: string,
    public issues?: ZodIssue[]
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}


export const SearchResourcesSchema = z.object({
  topicTitle: z
    .string()
    .min(1, 'Topic title is required')
    .max(200, 'Topic title must be under 200 characters')
    .trim(),
  curriculum: z
    .string()
    .max(100, 'Curriculum must be under 100 characters')
    .optional()
    .default('General'),
  phase: z
    .union([z.string(), z.number()])
    .optional()
    .transform(v => (v ? (typeof v === 'string' ? v : String(v)) : undefined)),
});


export const AIModalRequestSchema = z.object({
  topic: z
    .string()
    .min(1, 'Topic is required')
    .max(200, 'Topic must be under 200 characters'),
  category: z
    .string()
    .min(1, 'Category is required')
    .max(100, 'Category must be under 100 characters'),
  description: z
    .string()
    .max(1000, 'Description must be under 1000 characters')
    .optional()
    .default(''),
  phase: z
    .union([z.string(), z.number()])
    .optional()
    .transform(v => (v ? (typeof v === 'string' ? parseInt(v, 10) : v) : undefined))
    .refine(v => v === undefined || !isNaN(v), 'Phase must be a valid number'),
  forceRefresh: z.boolean().optional().default(false),
  mode: z.enum(['explanation', 'quiz']).optional().default('explanation'),
  persona: z.enum(['general', 'buddy']).optional().default('general'),
  messages: z
    .array(z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string()
    }))
    .optional()
    .default([]),
});

export const ChatMessageSchema = z.object({
  topicTitle: z
    .string()
    .min(1, 'Topic is required')
    .max(200, 'Topic must be under 200 characters'),
  userMessage: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message must be under 2000 characters'),
  curriculum: z
    .string()
    .max(100)
    .optional()
    .default('General'),
  phase: z
    .union([z.string(), z.number()])
    .optional()
    .transform(v => (v ? (typeof v === 'string' ? parseInt(v, 10) : v) : undefined))
    .refine(v => v === undefined || !isNaN(v), 'Phase must be a valid number'),
  messages: z
    .array(z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string()
    }))
    .optional()
    .default([]),
  userMessageId: z.string().optional(),
  assistantMessageId: z.string().optional(),
  memoryScope: z.enum(['session', 'topic']).optional().default('session'),
  pinnedMemories: z
    .array(z.string().min(1).max(280))
    .optional()
    .default([]),
  aiMode: z.enum(['mentor', 'reviewer', 'interviewer', 'architect']).optional().default('mentor'),
});


export const ProgressUpdateSchema = z.object({
  topicId: z.string().min(1, 'Topic ID is required'),
  status: z.enum(['not-started', 'in-progress', 'completed']),
  completedAt: z.number().optional(),
  notes: z.string().max(500).optional(),
});

export const DashboardQuerySchema = z.object({
  curriculum: z.string().optional(),
  category: z.string().optional(),
  timeframe: z
    .enum(['week', 'month', 'all'])
    .optional()
    .default('month'),
});


export const ShareContentSchema = z.object({
  topic: z.string().min(1).max(200),
  category: z.string().min(1).max(100),
  content: z.string().max(5000),
  platform: z.enum(['twitter', 'linkedin', 'email']).optional(),
});


export const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[0-9]/, 'Password must contain number'),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be under 100 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const DojoChallengeSchema = z.object({
  topic: z
    .string()
    .min(1, 'Topic is required')
    .max(200, 'Topic must be under 200 characters'),
  category: z
    .string()
    .max(100, 'Category must be under 100 characters')
    .optional(),
  language: z
    .string()
    .max(32, 'Language must be under 32 characters')
    .optional()
    .default('javascript'),
});

export type SearchResourcesInput = z.infer<typeof SearchResourcesSchema>;
export type AIModalRequestInput = z.infer<typeof AIModalRequestSchema>;
export type ChatMessageInput = z.infer<typeof ChatMessageSchema>;
export type ProgressUpdateInput = z.infer<typeof ProgressUpdateSchema>;
export type DashboardQueryInput = z.infer<typeof DashboardQuerySchema>;
export type ShareContentInput = z.infer<typeof ShareContentSchema>;
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type DojoChallengeInput = z.infer<typeof DojoChallengeSchema>;


export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.issues || [];
      const firstIssue = issues[0];
      const path = firstIssue?.path?.join('.') || 'input';
      const message = firstIssue ? `${path}: ${firstIssue.message}` : 'Validation failed';
      throw new ValidationError(message, issues);
    }
    throw error;
  }
}

export function validateInputSafe<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T | null {
  try {
    return schema.parse(data);
  } catch {
    return null;
  }
}

