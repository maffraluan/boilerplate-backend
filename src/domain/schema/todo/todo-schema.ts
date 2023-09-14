import { z } from 'zod'

export const createTodoSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Name must be greater than 1 characters!' }),
    description: z
      .string()
      .min(4, { message: 'Descrition must be greater than 4 characters!' }),
    status: z.string().nonempty(),
  }),
})

export const updateTodoSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      title: z
        .string()
        .min(1, { message: 'Name must be greater than 1 characters!' }),
      description: z
        .string()
        .min(4, { message: 'Descrition must be greater than 4 characters!' }),
      status: z.string().nonempty(),
    })
    .partial(),
})
