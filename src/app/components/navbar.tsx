import styles from "@/app/styles/navbar/navbar.module.css";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.icons_container}>
        <img src={"/images/icons/7.png"} alt={"logo"} className={styles.icon} />
        <div className={styles.links}>
          <Link href="/">STRONA GŁÓWNA</Link>
          <Link href="shop">SKLEP</Link>
          <Link href="apply">BLOG</Link>
          <Link href="apply">KONTAKT</Link>
        </div>
        <div className={styles.right_container}>
          <img
            src={"/images/icons/8.png"}
            alt={"logo"}
            className={styles.icon}
          />
          <img
            src={"/images/icons/9.png"}
            alt={"logo"}
            className={styles.icon}
          />
          <img
            src={"/images/icons/10.png"}
            alt={"logo"}
            className={styles.icon}
          />
        </div>
      </div>
      <div className={styles.bottom} />
    </div>
  );
};
