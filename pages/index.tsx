import { Footer } from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar";
import styles from "@/app/styles/layout.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.main_container}>
        <Navbar />
        <h1>aaaaaaaaaaaa</h1>
        <Footer />
      </div>
    </main>
  );
}
