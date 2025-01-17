"use client";
import styles from "./sidebar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProfileFromToken } from "@/_api/profile";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [localToken, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenData = localStorage.getItem("token");
      if (tokenData) {
        const tokenObject = JSON.parse(tokenData);
        setToken(tokenObject);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (localToken) {
      router.push(pathname);
    }
  }, [localToken, router, pathname]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Image src="/_assets/logo2.png" alt="logo" width={100} height={80} />
          {/* <span>MovieMeter</span>   */}
        </div>
      </div>

      <ul>
        <li>
          <a href="/homepage">
            <div className={styles.icon}>
              <HomeIcon></HomeIcon>
            </div>
            <span className={styles.navitem}>Home</span>
          </a>
        </li>
        <li>
          <a href="/search">
            <div className={styles.icon}>
              <SearchIcon></SearchIcon>
            </div>

            <span className={styles.navitem}>Search</span>
          </a>
        </li>
        <li>
          <a href="/feed">
            <div className={styles.icon}>
              <ExploreIcon></ExploreIcon>
            </div>
            <span className={styles.navitem}>Explore</span>
          </a>
        </li>
        {localToken ? (
          <li>
            <a href="/userpage">
              <div className={styles.icon}>
                <ProfileIcon></ProfileIcon>
              </div>
              <span className={styles.navitem}>Profile</span>
            </a>
          </li>
        ) : (
          <li>
            <a href="/login">
              <div className={styles.icon}>
                <ProfileIcon></ProfileIcon>
              </div>
              <span className={styles.navitem}>Sign In</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
