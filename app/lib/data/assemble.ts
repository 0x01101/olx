import {
  AnyJoinedUserOrSmth,
  Bid, Category, JoinedBidder,
  JoinedCategory, JoinedProduct, JoinedSeller, JoinedUser,
  Product,
  RawBidRecord,
  RawProductRecord,
  RawTransactionRecord,
  Transaction, User,
} from "@/app/lib/definitions";

export const assembleUser = ( rawData: AnyJoinedUserOrSmth ): User =>
{
  let prefix: string;
  
  if ( "user_id" in rawData )
  {
    prefix = "user";
  } else if ( "seller_id" in rawData )
  {
    prefix = "seller";
  } else
  {
    prefix = "bidder";
  }
  
  return {
    id:         rawData[ `${prefix}_id` as keyof AnyJoinedUserOrSmth ],
    uuid:       rawData[ `${prefix}_uuid` as keyof AnyJoinedUserOrSmth ],
    username:   rawData[ `${prefix}_username` as keyof AnyJoinedUserOrSmth ],
    email:      rawData[ `${prefix}_email` as keyof AnyJoinedUserOrSmth ],
    password:   rawData[ `${prefix}_password` as keyof AnyJoinedUserOrSmth ],
    role:       rawData[ `${prefix}_role` as keyof AnyJoinedUserOrSmth ],
    created_at: rawData[ `${prefix}_created_at` as keyof AnyJoinedUserOrSmth ],
  };
};

export const assembleCategory = ( rawCategory: JoinedCategory ): Category => ( {
  id:         rawCategory.category_id,
  name:       rawCategory.category_name,
  logo_path:  rawCategory.category_logo_path,
  created_at: rawCategory.category_created_at,
} );

export const assembleProduct = ( rawRecord: RawProductRecord ): Product => ( {
  id:          rawRecord.id,
  uuid:        rawRecord.uuid,
  condition:   rawRecord.condition,
  name:        rawRecord.name,
  description: rawRecord.description,
  price:       rawRecord.price,
  negotiable:  rawRecord.negotiable,
  active:      rawRecord.active,
  created_at:  rawRecord.created_at,
  category:    assembleCategory( rawRecord ),
  seller:      assembleUser( rawRecord ),
} );

export const assembleJoinedProduct = ( rawRecord: JoinedProduct & JoinedCategory & JoinedSeller ): Product => ( {
  id:          rawRecord.product_id,
  uuid:        rawRecord.product_uuid,
  condition:   rawRecord.product_condition,
  name:        rawRecord.product_name,
  description: rawRecord.product_description,
  price:       rawRecord.product_price,
  negotiable:  rawRecord.product_negotiable,
  active:      rawRecord.product_active,
  created_at:  rawRecord.product_created_at,
  category:    assembleCategory( rawRecord ),
  seller:      assembleUser( rawRecord ),
} );

export const assembleBid = ( rawBid: RawBidRecord ): Bid => ( {
  id:         rawBid.id,
  amount:     rawBid.amount,
  created_at: rawBid.created_at,
  user:       assembleUser( rawBid ),
  product:    assembleProduct( rawBid ),
} );

export const assembleTransaction = ( rawTransaction: RawTransactionRecord ): Transaction => ( {
  id:         rawTransaction.id,
  amount:     rawTransaction.amount,
  created_at: rawTransaction.created_at,
  bidder:     assembleUser( rawTransaction ),
  seller:     assembleUser( rawTransaction ),
  product:    assembleJoinedProduct( rawTransaction ),
} );