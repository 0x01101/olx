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
  search: z.string(),
} );

export const UserDTOSchema = z.object( {
  id:        z.string(),
  name:      z.string().optional().nullable(),
  image:     z.string().optional().nullable(),
  role:      z.enum( [ "USER", "ADMIN" ] ),
  createdAt: z.date(),
} );

export const ProductDTOSchema = z.object( {
  id:          z.string(),
  name:        z.string(),
  description: z.string(),
  price:       z.number(),
  image:       z.string(),
  state:       z.enum( [ "NEW", "USED", "BROKEN" ] ),
  category_id: z.number(),
  seller_id:   z.string(),
  createdAt:   z.date(),
  updatedAt:   z.date(),
  category:    z.object( {
    id:        z.number(),
    name:      z.string(),
    image:     z.string().optional().nullable(),
    parent_id: z.number().optional().nullable(),
  } ),
  images:      z.array( z.object( {
    id:        z.string(),
    url:       z.string(),
    productId: z.string(),
  } ) ),
  seller:      UserDTOSchema,
} );

export const ListingAddSchema = z.object( {
  name:        z.string().min( 1, "Name is required" ),
  description: z.string().min( 1, "Description is required" ),
  price:       z.string().min( 1, "Price is required" ).regex( /^[1-9]\d*$/ ),
  images:      z.string().min( 1, "Image is required" ),
  state:       z.enum( [ "NEW", "USED", "BROKEN" ] ).default( "USED" ),
  category:    z.string().min( 1, "Category is required" ).regex( /^[1-9]\d*$/ ),
} );

export const Admin_ListingUpdateSchema = z.object( {
  name:        z.string().min( 1, "Name is required" ),
  description: z.string().min( 1, "Description is required" ),
  price:       z.string().min( 1, "Price is required" ).regex( /^[1-9]\d*$/ ),
  state:       z.enum( [ "NEW", "USED", "BROKEN" ] ).default( "USED" ),
  category:    z.string().min( 1, "Category is required" ).regex( /^[1-9]\d*$/ ),
  seller_id:   z.string().min( 1, "Seller is required" ),
} );

export const Admin_CategoryUpdateSchema = z.object( {
  name:  z.string().min( 1, "Name is required" ),
} );

export const Admin_UserUpdateSchema = z.object( {
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.enum( [ "USER", "ADMIN" ] ),
  isTwoFactorEnabled: z.boolean(),
})

export const UserUpdateSchema = z.object( {
  name: z.string().min( 1, "Name is required" ),
  email: z.string().min( 1, "Email is required" ).email(),
  image: z.string().optional(),
  isTwoFactorEnabled: z.boolean(),
});