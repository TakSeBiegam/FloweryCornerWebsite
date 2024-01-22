import { describe } from "node:test"

export interface BlogElement {
    name: string;
    image: string;
    description?: string;
}

export const blogIdeas: BlogElement[] =
    [{
        name: "Kraina Kwiatów: Sztuka Ogrodzenia Twojego Świata",
        image: "/images/blog/sadzonka.png"
    },
    {
        name: "Botaniczne Inspiracje: Odkrywaj Piękno Świata Roślin",
        image: "/images/blog/botanic.png"
    },
    {
        name: "Kwiatowy Zakątek: Porady, Inspiracje i Historie Kwiatowych Przygód",
        image: "/images/blog/tutorial.png"
    }]