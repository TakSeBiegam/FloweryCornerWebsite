export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  generalCategory: string;
  image: string;
  available?: boolean;
  isNew?: boolean;
  rate: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Piękna Róża",
    category: "rose",
    image: "/images/flowers/roza.jpg",
    generalCategory: "flower",
    description:
      "Doskonałe jako prezent na różne okazje – od romantycznych randek po święta czy uroczystości rodzinne. Każda róża w naszym sklepie to nie tylko kwiat, ale także wyraz uczuć i troski.",
    price: 20.21,
    available: true,
    isNew: true,
    rate: 4.3,
  },
  {
    id: 2,
    name: "Elegancki Tulipan",
    category: "tulip",
    image: "/images/flowers/lilia.jpg",
    generalCategory: "flower",
    description:
      "Tulipan to symbol elegancji i subtelności. Ten kwiat doskonale sprawdzi się jako prezent dla bliskiej osoby lub ozdoba wnętrza. Dostępny w różnych kolorach.",
    price: 15.99,
    available: true,
    isNew: false,
    rate: 4.0,
  },
  {
    id: 3,
    name: "Kolorowy Gerber",
    category: "gerbera",
    image: "/images/flowers/roza.jpg",
    generalCategory: "flower",
    description:
      "Gerbera to kwiat pełen energii i radości. Doskonały wybór, aby wyrazić pozytywne emocje. Dostępny w różnorodnych kolorach, idealny na każdą okazję.",
    price: 18.5,
    available: true,
    isNew: true,
    rate: 4.5,
  },
  {
    id: 4,
    name: "Egzotyczna Orkidea",
    category: "orchid",
    image: "/images/flowers/roza.jpg",
    generalCategory: "flower",
    description:
      "Orkidea to kwiat o subtelnym pięknie i egzotycznym charakterze. Doskonały wybór dla miłośników niezwykłych roślin. Dostępny w różnych odmianach kolorystycznych.",
    price: 25.99,
    isNew: true,
    rate: 4.8,
  },
  {
    id: 5,
    name: "Zimowa Azalia",
    category: "azalea",
    image: "/images/flowers/lilia.jpg",
    generalCategory: "flower",
    description:
      "Azalia to kwiat o pięknych, delikatnych kwiatach, który doskonale sprawdzi się jako ozdoba domu. Idealny na zimowe dni, dodając nutę koloru do wnętrza.",
    price: 22.75,
    available: true,
    isNew: false,
    rate: 4.2,
  },
];
