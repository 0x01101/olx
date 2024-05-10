import * as z from "zod";

export const LoginSchema = z.object( {
  email:    z.string().email(),
  password: z.string().min( 1, {
    message: "Password is required",
  } ),
  code:     z.optional( z.string() ),
} );

export const RegisterSchema = z.object( {
  email:    z.string().email(),
  password: z.string().min( 6, {
    message: "Minimum 6 characters required",
  } ),
  name:     z.string().min( 3, {
    message: "Minimum 3 characters required",
  } ),
} );

export const ResetSchema = z.object( {
  email: z.string().email( {
    message: "Email is required",
  } ),
} );

export const NewPasswordSchema = z.object( {
  password: z.string().min( 6, {
    message: "Minimum 6 characters required",
  } ),
} );

export const SearchSchema = z.object( {
  search: z.string().min( 1, {
    message: "Search query is required",
  } ),
} );

export const UserDTOSchema = z.object( {
  id:        z.string(),
  name:      z.string().optional().nullable(),
  image:     z.string().optional().nullable(),
  role:      z.string(),
  createdAt: z.date(),
});

export const ProductDTOSchema = z.object( {
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category_id: z.number(),
  seller_id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().optional().nullable(),
    parent_id: z.number().optional().nullable(),
  }),
  seller: UserDTOSchema,
} );