import { z } from 'zod';
import { registerSchema as baseRegisterSchema } from 'chat-app-zod-schema';

export const registerSchema = baseRegisterSchema
    .extend({
        confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });