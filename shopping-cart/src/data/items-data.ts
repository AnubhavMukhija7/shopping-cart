import {Items} from '../interface/items-interface'

export const items : Items= [
    {
        id: 1,
        kind: "content#product",
        title: "Google Tee Black",
        description: "The Black Google Tee is available in unisex sizing.",
        imageLink: "https://shop.example.com/.../images/GGOEGXXX1100.jpg",
        availability: true,
        availablePieces : 2,
        brand: "Google",
        color: ["black"],
        condition: "new",
        gender: "M",
        price: {
            value: 21.99,
            currency: "USD"
        },
        sizes: [
            "L"
        ]
    }
]