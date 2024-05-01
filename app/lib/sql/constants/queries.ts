/* Exclude references (foreign keys) */
const userKeys: string[] = [ "id", "username", "email", "password" ];
const user_infoKeys: string[] = [ "id", "uuid", "username", "email", "password", "role", "watched_categories_ids", "created_at" ];
const categoryKeys: string[] = [ "id", "name", "logo_path", "created_at" ];
const productKeys: string[] = [ "id", "uuid", "condition", "name", "description", "price", "negotiable", "active", "created_at" ];
const bidKeys: string[] = [ "id", "amount", "created_at" ];
const transactionKeys: string[] = [ "id", "amount", "created_at" ];
const notificationKeys: string[] = [ "id", "source", "title", "content", "created_at" ];

export const user: string = `
  select
    ${userKeys.join( "," )}
  from
    users;
`;

export const user_info: string = `
  select
    ${user_infoKeys.map( ( k: string ): string => `user_info.${k}` ).join( "," )},
    ${userKeys.map( ( k: string ): string => `users.${k} as user_${k}` ).join( "," )}
  from
    user_info
      inner join users on user_info.id = users.id;
`;

export const category: string = `
  select
    ${categoryKeys.join( "," )}
  from
    categories;
`;

export const product: string = `
  select
    ${productKeys.map( ( k: string ): string => `products.${k}` ).join( "," )},
    ${categoryKeys.map( ( k: string ): string => `categories.${k} as category_${k}` ).join( "," )},
    ${userKeys.map( ( k: string ): string => `users.${k} as seller_${k}` ).join( "," )}
  from
    products
      inner join categories on products.category_id = categories.id
      inner join users on products.user_id = users.id;
`;

export const bid: string = `
  select
    ${bidKeys.map( ( k: string ): string => `bids.${k}` ).join( "," )},
    ${userKeys.map( ( k: string ): string => `users.${k} as user_${k}` ).join( "," )},
    ${productKeys.map( ( k: string ): string => `products.${k} as product_${k}` ).join( "," )},
    ${categoryKeys.map( ( k: string ): string => `categories.${k} as category_${k}` ).join( "," )},
    ${userKeys.map( ( k: string ): string => `sellers.${k} as seller_${k}` ).join( "," )}
  from
    bids
      inner join users on bids.user_id = users.id
      inner join products on bids.product_id = products.id
      inner join categories on products.category_id = categories.id
      inner join users as sellers on products.user_id = sellers.id;
`;

export const transaction: string = `
  select
    ${transactionKeys.map( ( k: string ): string => `transactions.${k}` ).join( "," )},
    ${userKeys.map( ( k: string ): string => `bidders.${k} as bidder_${k}` ).join( "," )},
    ${userKeys.map( ( k: string ): string => `sellers.${k} as seller_${k}` ).join( "," )},
    ${productKeys.map( ( k: string ): string => `products.${k} as product_${k}` ).join( "," )},
    ${categoryKeys.map( ( k: string ): string => `categories.${k} as category_${k}` ).join( "," )}
  from
    transactions
      inner join users as bidders on transactions.bidder_id = bidders.id
      inner join users as sellers on transactions.seller_id = sellers.id
      inner join products on transactions.product_id = products.id
      inner join categories on products.category_id = categories.id;
`;

export const notification: string = `
  select
    ${notificationKeys.join( "," )}
  from
    notifications;
`;