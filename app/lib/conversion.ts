/*
import {
  Bid,
  Category,
  EMail,
  Product,
  RawBid,
  RawCategory,
  RawProduct, RawTransaction,
  RawUser,
  Role, Transaction,
  User,
} from "@/app/lib/definitions";

export const unRawUser = ( rawUser: RawUser ): User => ( {
  id:         rawUser.id,
  username:   rawUser.username,
  email:      rawUser.email as EMail,
  password:   rawUser.password,
  role:       rawUser.role as Role,
  created_at: rawUser.created_at,
} );

export const unRawCategory = ( rawCategory: RawCategory ): Category => ( rawCategory );

export const unRawProduct = async (rawProduct: RawProduct): Promise<Product> => ({
  id: rawProduct.id,
  name: rawProduct.name,
  description: rawProduct.description,
  price: rawProduct.price,
  category: await fetchCategoryById(rawProduct.category_id), // Assuming you have the category object available
  created_at: rawProduct.created_at
});

export const unRawBid = async (rawBid: RawBid): Promise<Bid> => ({
  id: rawBid.id,
  user: await fetchUserById(rawBid.user_id),
  product: await fetchProductById(rawBid.product_id),
  amount: rawBid.amount,
  created_at: rawBid.created_at
});

export const unRawTransaction = async (rawTransaction: RawTransaction): Promise<Transaction> => ({
  id: rawTransaction.id,
  bidder: await fetchUserById(rawTransaction.bidder_id),
  seller: await fetchUserById(rawTransaction.seller_id),
  product: await fetchProductById(rawTransaction.product_id),
  amount: rawTransaction.amount,
  created_at: rawTransaction.created_at
});

 */