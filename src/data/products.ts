export interface Product {
    id: number,
    name: string;
    description: string;
    price: number;
    category: string;
    generalCategory: string;
    image: string;
    available?: boolean;
    isNew?: boolean;
    rate: number
}


export const products: Product[] = [
    {
        id: 1,
        name: "Piękna Róża",
        category: "Rose",
        image: "/images/flowers/roza.jpg",
        generalCategory: "flower",
        description: "Doskonałe jako prezent na różne okazje – od romantycznych randek po święta czy uroczystości rodzinne. Każda róża w naszym sklepie to nie tylko kwiat, ale także wyraz uczuć i troski.",
        price: 20.21,
        available: true,
        isNew: true,
        rate: 4.3
    },
    {
        id: 2,
        name: "Bukiet róż",
        category: "Bouquet",
        image: "https://images.pexels.com/photos/1133274/pexels-photo-1133274.jpeg",
        generalCategory: "flower",
        description: "Bukiet róż to klasyczny i elegancki prezent na każdą okazję.",
        price: 150.00,
        available: true,
        isNew: false,
        rate: 4.7
    },
    {
        id: 3,
        name: "Wiązanka kwiatów",
        category: "Bouquet",
        image: "https://images.pexels.com/photos/1159850/pexels-photo-1159850.jpeg",
        generalCategory: "flower",
        description: "Wiązanka kwiatów to piękny i elegancki prezent na każdą okazję.",
        price: 200.00,
        available: true,
        isNew: false,
        rate: 4.9
    },
    {
        id: 4,
        name: "Kwiaty w doniczce",
        category: "Pot Plant",
        image: "https://images.pexels.com/photos/1159851/pexels-photo-1159851.jpeg",
        generalCategory: "flower",
        description: "Kwiaty w doniczce to piękna i trwała dekoracja do domu.",
        price: 100.00,
        available: true,
        isNew: false,
        rate: 5.0
    },
    {
        id: 5,
        name: "Bukiet ślubny",
        category: "Bouquet",
        image: "https://images.pexels.com/photos/1159852/pexels-photo-1159852.jpeg",
        generalCategory: "flower",
        description: "Bukiet ślubny to najważniejszy element każdej ślubnej stylizacji.",
        price: 300.00,
        available: true,
        isNew: false,
        rate: 4.8
    },
    {
        id: 6,
        name: "Bukiet pogrzebowy",
        category: "Bouquet",
        image: "https://images.pexels.com/photos/1159853/pexels-photo-1159853.jpeg",
        generalCategory: "flower",
        description: "Bukiet pogrzebowy to wyraz szacunku i pamięci o zmarłej osobie.",
        price: 250.00,
        available: true,
        isNew: false,
        rate: 4.6
    },
    {
        id: 7,
        name: "Kwiaty na walentynki",
        category: "Bouquet",
        image: "https://images.pexels.com/photos/1159854/pexels-photo-1159854.jpeg",
        generalCategory: "flower",
        description: "Kwiaty na walentynki to idealny prezent dla ukochanej osoby.",
        price: 170.00,
        available: true,
        isNew: false,
        rate: 5.0
    },
    {
        id: 8,
        name: "Kwiaty na urodziny",
        category: "Bouquet",
        image: "https://images.pexels.com/photos/1159855/pexels-photo-1159855.jpeg",
        generalCategory: "flower",
        description: "Kwiaty na urodziny to piękny i elegancki prezent dla solenizanta.",
        price: 150.00,
        available: true,
        isNew: false,
        rate: 4.9
    },
];