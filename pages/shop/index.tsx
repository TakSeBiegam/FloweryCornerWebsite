// import Footer from "@/molecules/footer";
// import { Navbar } from "@/molecules/navbar";
// import Head from "next/head";
// import styles from "../styles/index.module.css";
// import Carousel from "@/molecules/karuzela";
// import Image from "next/image";

// const FiveBoxesCentered: React.FC = () => {
//   const items = [
//     { text: "Róże", image: "/images/categories/1.png" },
//     { text: "Lilie", image: "/images/categories/2.png" },
//     { text: "Tulipany", image: "/images/categories/3.png" },
//     { text: "Stokrotki", image: "/images/categories/4.png" },
//     { text: "Orchidee", image: "/images/categories/5.png" },
//     { text: "Słoneczniki", image: "/images/categories/6.png" },
//   ];
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "75%",
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         {items.map((item, index) => (
//           <div
//             key={index}
//             style={{
//               width: "200px",
//               height: "200px",
//               backgroundColor: "white",
//               border: "1px solid #ccc",
//               margin: "0 10px",
//               borderRadius: "16px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               fontFamily: "fantasy",
//             }}
//           >
//             <span
//               style={{
//                 marginTop: "20%",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//                 fontSize: "1.3rem",
//               }}
//             >
//               {item.text}
//             </span>
//             {/* Content for each box */}
//             <img
//               src={item.image}
//               alt={item.text}
//               style={{ width: "60%", height: "auto", borderRadius: "8px" }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const SearchingBelow: React.FC = () => {
//   return (
//     <>
//       <div
//         style={{
//           height: "5vh",
//           backgroundColor: "white",
//           border: "1px solid #ccc",
//           borderRadius: "16px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <p
//           style={{
//             paddingRight: "4vw",
//             marginTop: "1.4vh",
//             fontSize: "1.3rem",
//             fontFamily: "fantasy",
//             fontWeight: "bold",
//           }}
//         >
//           Special Offerts
//         </p>
//       </div>
//       <div
//         style={{
//           height: "5vh",
//           backgroundColor: "white",
//           border: "1px solid #ccc",

//           borderRadius: "16px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <p
//           style={{
//             paddingRight: "30vw",
//             marginTop: "1.4vh",
//             fontSize: "1.3rem",
//             fontFamily: "fantasy",
//             fontWeight: "bold",
//           }}
//         >
//           Trendings
//         </p>
//       </div>
//     </>
//   );
// };

// const TrendingBoxes: React.FC = () => {
//   const items = [
//     { text: "Kwiaty ślubne", image: "/images/trendings/weeding.png" },
//     { text: "Dostarcz Kwiaty", image: "/images/trendings/podarunek.png" },
//     { text: "Dekorowanie", image: "/images/trendings/dekoracje.png" },
//     { text: "Kwiaty urodzinowe", image: "/images/trendings/weeding.png" },
//     { text: "Dostarcz Kwiaty", image: "/images/trendings/podarunek.png" },
//     { text: "Dekorowanie", image: "/images/trendings/dekoracje.png" },
//   ];

//   // Group items in sets of three

//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr 1fr",

//         gap: "2rem",
//       }}
//     >
//       {items.map(({ image, text }, groupIndex) => (
//         <div
//           key={groupIndex}
//           style={{
//             // width: "300px",
//             height: "300px",
//             backgroundColor: "white",
//             border: "1px solid #ccc",
//             borderRadius: "16px",
//             flexDirection: "column",
//             alignItems: "center",
//             fontFamily: "fantasy",
//           }}
//         >
//           <img
//             src={image}
//             style={{
//               objectFit: "cover",
//               maxWidth: "100%",
//               width: "100%",
//               maxHeight: "70%",
//               height: "auto",
//               borderRadius: "8px",
//               paddingBottom: "10px",
//             }}
//           />
//           <div
//             style={{
//               display: "flex",
//               paddingRight: "5%",
//               marginBottom: "6%",
//             }}
//           >
//             <span
//               style={{
//                 width: "100%",
//                 textAlign: "left",
//                 fontWeight: "bold",
//                 marginLeft: "3%",
//                 margin: "0 40px",
//               }}
//             >
//               {text}
//             </span>
//             <div
//               style={{
//                 backgroundColor: "#fa9c1b",
//                 width: "200px",
//                 height: "25px",
//                 borderRadius: "5px",
//                 textAlign: "center",
//               }}
//             >
//               <span style={{ fontFamily: "Segoe UI" }}>Sprawdź</span>
//             </div>
//           </div>
//         </div>
//       ))}
//       {items.map(({ image, text }, groupIndex) => (
//         <div
//           key={groupIndex}
//           style={{
//             // width: "300px",
//             height: "300px",
//             backgroundColor: "white",
//             border: "1px solid #ccc",
//             borderRadius: "16px",
//             flexDirection: "column",
//             alignItems: "center",
//             fontFamily: "fantasy",
//           }}
//         >
//           <img
//             src={image}
//             style={{
//               objectFit: "cover",
//               maxWidth: "100%",
//               width: "100%",
//               maxHeight: "70%",
//               height: "auto",
//               borderRadius: "8px",
//               paddingBottom: "10px",
//             }}
//           />
//           <div
//             style={{
//               display: "flex",
//               paddingRight: "5%",
//               marginBottom: "6%",
//             }}
//           >
//             <span
//               style={{
//                 width: "100%",
//                 textAlign: "left",
//                 fontWeight: "bold",
//                 marginLeft: "3%",
//                 margin: "0 40px",
//               }}
//             >
//               {text}
//             </span>
//             <div
//               style={{
//                 backgroundColor: "#fa9c1b",
//                 width: "200px",
//                 height: "25px",
//                 borderRadius: "5px",
//                 textAlign: "center",
//               }}
//             >
//               <span style={{ fontFamily: "Segoe UI" }}>Sprawdź</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function Home() {
//   const images = [
//     "/images/Sponsors/b3043c_49abee31eb5d4b7fbeded024ad2f1a8f.webp",
//     "/images/Sponsors/Bevolo-Logo-.-VECTOR-file-2.png",
//     "/images/Sponsors/Logo-Naturella.png",
//     "/images/Sponsors/Screen_Shot_2019-04-07_at_8.30.29_PM_1024x1024.webp",
//     "/images/Sponsors/calflowerslogo-b-alt_.jpg",
//     "/images/Sponsors/Image-empty-state.webp",
//   ];

//   return (
//     <>
//       <Head>
//         <title>Ammu Nation</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <Navbar />
//       <main className={styles.container}>
//         <div style={{ display: "flex", marginTop: 120 }}>
//           <div
//             style={{
//               alignItems: "center",
//             }}
//           >
//             <div
//               style={{
//                 fontFamily: "fantasy",
//               }}
//             >
//               <h1 className={styles.h1}>
//                 Znajdź idealne kwiaty na każdą okazje
//               </h1>
//               <p className={styles.span}>
//                 FlowerNation to firma kwiatowa o bogatym doświadczeniu, która
//                 zrodziła się z pasji do kwiatów.
//               </p>
//             </div>
//           </div>
//           <Image
//             alt=""
//             className={styles.Image}
//             src="/images/icons/budynek.jpg"
//             width={600}
//             height={600}
//           ></Image>
//         </div>

//         <p
//           style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}
//         >
//           Kategorie
//         </p>
//         <div>
//           <FiveBoxesCentered />
//         </div>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "auto 1fr",
//             gap: "4rem",
//           }}
//         >
//           <SearchingBelow />
//           <div
//             style={{
//               width: "100%",
//               height: "100%",
//               // backgroundColor: "white",
//               border: "1px solid #ccc",

//               borderRadius: "16px",
//               // display: "flex",
//               // alignItems: "center",
//             }}
//           >
//             <img
//               src={"/images/sale/11.png"}
//               alt={"Przecena"}
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 borderRadius: "8px",
//               }}
//             />
//           </div>
//           <TrendingBoxes />
//         </div>
//         {/* <div
//           style={{
//             marginTop: "15vh",
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",

//             marginInline: "auto",
//           }}
//         >

//           <div
//             style={{
//               height: "30vh",
//               backgroundColor: "white",
//               border: "1px solid #ccc",
//               margin: "5px 40px",
//               borderRadius: "16px",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src={"/images/sale/11.png"}
//               alt={"Przecena"}
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 borderRadius: "8px",
//               }}
//             />
//           </div>

//           <TrendingBoxes />
//         </div> */}
//       </main>
//       <hr></hr>
//       <Footer />
//     </>
//   );
// }

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Second Page</h1>
    </main>
  );
}
