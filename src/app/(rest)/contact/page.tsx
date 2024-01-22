import Image from "next/image";

export default function Contact() {
  return (
    <div className="">
      <div className="flex justify-center gap-24">
        <div className=" w-96 h-96 overflow-hidden rounded-full relative ">
          <Image
            src={"/images/blog/flowerist_girl_ai.png"}
            alt={"avatar właścicielki sklepu wygenerowany przez ai"}
            fill
            className="object-cover "
          />
        </div>

        <span className="w-1/2 font-medium my-auto">
          Witaj w "Kwiecistym zakątku" – Twoim ulubionym sklepie internetowym
          pełnym pięknych kwiatów i unikalnych bukietów! Nasza pasja to
          przekazywanie radości i emocji za pomocą świeżych, kolorowych kwiatów,
          które dodają uroku każdemu chwilowemu i stałemu wydarzeniu, które
          umożliwią Ci stworzenie magicznego klimatu w Twoim domu czy biurze.
        </span>
      </div>
      <div className="flex justify-center py-10 gap-24">
        <div className="font-medium my-auto w-1/2">
          <span>
            "Kwiecisty zakątek" to miejsce, gdzie natura spotyka elegancję, a
            każdy zakup to wyjątkowe doświadczenie. Nasza oferta obejmuje
            szeroki wybór świeżych kwiatów ciętych, bukietów sezonowych,
            kompozycji kwiatowych i roślin doniczkowych. Niezależnie od okazji –
            romantyczne randki, urodzinowe przyjęcie - mamy idealne kwiaty, by
            wyrazić Twoje uczucia.
          </span>
        </div>
        <div className="w-96 h-96 overflow-hidden rounded-full relative">
          <Image
            src={"/images/blog/bunch_of_flowers.png"}
            alt={"avatar właścicielki sklepu wygenerowany przez ai"}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
