import { makeVar } from "@apollo/client";

export const cartItemsVar = makeVar([]);

export const fields = {
    typePolicies: {
        Query: {
            fields: {
                cartItem: {
                    read() {
                        return cartItemsVar()
                    },
                },
            },
        },
    },
}