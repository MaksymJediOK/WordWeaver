import { z } from 'zod'

const AddSingleWordSchema = z.object({
  wordInput: z.string().min(2).max(50),
  context: z.string().optional()
})

const ManualCreationSchema = z.object({
  originalWord: z.string().min(2).max(50),
  translatedWord: z.string().max(50),
  example: z.string().min(10),
  translatedExample: z.string().min(10)
})

export { AddSingleWordSchema, ManualCreationSchema }
