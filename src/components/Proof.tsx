"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Proof.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: number;
  num: string;
  role: string;
  title: string;
  desc: string;
  toolsHeader: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string; // Dynamic website/repo URL
}

export default function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects: ProjectItem[] = [
    {
      id: 1,
      num: "01",
      role: "Sebagai Fullstack Developer",
      title: "BGeo Dev Portfolio",
      desc: "Merancang dan mengeksekusi arsitektur web dari nol untuk startup gue sendiri. Menggabungkan animasi GSAP yang smooth dengan integrasi backend Supabase dan performa Next.js untuk menghadirkan pengalaman digital yang interaktif, scalable, dan anti-lelet.",
      toolsHeader: "Yang gue pake",
      tags: ["Next.js", "GSAP", "Supabase", "Tailwind CSS"],
      imageUrl: "/Projects/bgeo.png",
      projectUrl: "https://bgeodev.vercel.app/",
    },
    {
      id: 2,
      num: "02",
      role: "Sebagai Front-End Developer & Project Manager",
      title: "Website Company Profile RAMENRAMEiN",
      desc: "Memimpin pengembangan web profil untuk brand restoran ramen. Mengubah desain antarmuka menjadi baris kode nyata dan mengintegrasikannya dengan sistem database untuk memastikan performa website yang cepat, stabil, dan responsif di berbagai device.",
      toolsHeader: "Yang gue pake",
      tags: ["Next.js", "Supabase", "Figma"],
      imageUrl: "/Projects/ramenramein.png",
      projectUrl: "https://ramenramein.vercel.app/",
    },
    {
      id: 3,
      num: "03",
      role: "Sebagai UI/UX Designer & Front-End Developer",
      title: "Company Profile, POS & Queue System Satria",
      desc: "Merancang interface dari nol sekaligus mengembangkan sistemnya. Nggak cuma bikin website company profile yang enak dilihat, gue juga meracik UI/UX dan logika front-end untuk sistem Point of Sales (POS) dan manajemen antrean. Pakai Next.js dan Supabase, gue mastiin pencatatan kasir dan antrean terdokumentasi dengan rapi.",
      toolsHeader: "Yang gue pake",
      tags: ["Next.js", "Supabase", "Figma"],
      imageUrl: "/Projects/satriacnm.png",
      projectUrl: "https://satriacmclean.vercel.app/",
    },
    {
      id: 4,
      num: "04",
      role: "Sebagai Front-End Developer & UI/UX Designer",
      title: "iQuarium App",
      desc: "Menerjemahkan desain menjadi front-end aplikasi mobile learning dan marketplace. Memastikan setiap interaksi di fitur edukasi dan transaksi berjalan mulus dengan UI/UX yang responsif dan memanjakan mata pengguna.",
      toolsHeader: "Yang gue pake",
      tags: ["Tailwind", "React", "Figma"],
      imageUrl: "/Projects/iquarium.png",
      projectUrl: "https://github.com/Frizaski/iquariumprofile",
    },
    {
      id: 5,
      num: "05",
      role: "Sebagai UI/UX Designer, Front-End, & AR Developer",
      title: "Solar Verse - AR Mobile Game",
      desc: "Mengembangkan game mobile Augmented Reality (AR) untuk melengkapi pengalaman bermain board game Planet Clash. Gue merancang UI/UX gameplay secara menyeluruh agar interaktif , sekaligus mengeksekusi sisi front-end dan logika interaksi AR berbasis marker menggunakan Unity.",
      toolsHeader: "Yang gue pake",
      tags: ["Unity", "AR", "Figma"],
      imageUrl: "/Projects/solarverse.png",
      projectUrl: "https://drive.google.com/drive/folders/1raFFWje1MSOaJAuY-XM5toB7pl3WsZlC",
    },
    {
      id: 6,
      num: "06",
      role: "Sebagai UI/UX Designer",
      title: "Company Profile PT. Mitra Jasa Power",
      desc: "Mengembangkan antarmuka front-end untuk sistem pencatatan pengiriman dan pemantauan logistik. Fokus ngebangun workflow operasional yang efisien lewat desain interface yang responsif supaya gampang dipakai oleh user di lapangan.",
      toolsHeader: "Yang gue pake",
      tags: ["Figma"],
      imageUrl: "/Projects/mitrajasapower.png",
      projectUrl: "https://github.com/frizaski",
    },
  ];

  const initialText = "Bukan hanya bicara, tapi realisasi";
  const initialWords = initialText.split(" ");

  useGSAP(() => {
    if (!mounted || !sectionRef.current || !headingRef.current) return;

    const initialHeadingWords = headingRef.current.querySelectorAll(".proof-word");
    const projectPanels = sectionRef.current.querySelectorAll(".proof-project-panel");

    // Dynamic scroll timeline reach
    const totalScrollDistance = 1.8 + (projects.length * 2.2);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalScrollDistance * 100}%`,
        pin: true,
        scrub: 1.0,
        invalidateOnRefresh: true,
      },
    });

    // 1. Initial Heading Word-by-Word Opacity Reveal
    tl.to(initialHeadingWords, {
      opacity: 1,
      stagger: 0.15,
      ease: "none",
      duration: 1.5,
    });

    // Hold the fully revealed state for a moment
    tl.to({}, { duration: 0.8 });

    // 2. Reverse scroll reveal: words fade back to 0.15
    tl.to(initialHeadingWords, {
      opacity: 0.15,
      stagger: -0.1, // reverse reveal order
      ease: "none",
      duration: 1.2,
    });

    // Fade out heading container completely
    tl.to(headingRef.current, {
      opacity: 0,
      ease: "power2.inOut",
      duration: 0.8,
    });

    // 3. Projects Showcase Loop
    projectPanels.forEach((panel, index) => {
      const imgContainerInner = panel.querySelector(".proof-img-container-inner");
      const imgEl = panel.querySelector(".proof-project-image");
      const roleText = panel.querySelector(".proof-project-role");
      const title = panel.querySelector(".proof-project-title");
      const toolsHeader = panel.querySelector(".proof-tools-header");
      const descWords = panel.querySelectorAll(".proof-desc-word");
      const tagEls = panel.querySelectorAll(".proof-tag");

      const labelStart = `project-${index}-start`;
      const labelEnd = `project-${index}-end`;

      // Set initial states before animations
      gsap.set(panel, { display: "none", opacity: 0 });

      // Premium 3D Tilt and Parallax start state
      gsap.set(imgContainerInner, {
        scale: 0.75,
        yPercent: 30,
        rotationX: 15,
        rotationY: -10,
        opacity: 0,
        transformOrigin: "center bottom"
      });
      if (imgEl) gsap.set(imgEl, { scale: 1.3, yPercent: -10 });

      gsap.set([roleText, title, toolsHeader], { opacity: 0, y: 20 });
      gsap.set(descWords, { opacity: 0.15 });
      gsap.set(tagEls, { opacity: 0 });

      // -- SHOW PANEL --
      tl.set(panel, { display: "grid", opacity: 1 }, labelStart);

      // Animate Image container to flat, fully scaled, and centered
      tl.to(imgContainerInner, {
        scale: 1,
        yPercent: 0,
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 2.2,
      }, labelStart);

      // Counter-zoom the inner image
      if (imgEl) {
        tl.to(imgEl, {
          scale: 1,
          yPercent: 0,
          ease: "power2.out",
          duration: 2.2,
        }, labelStart);
      }

      // Animate role, title, and tools header fade-in
      tl.to([roleText, title, toolsHeader], {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: "power2.out",
        duration: 1.2,
      }, `${labelStart}+=0.3`);

      // Animate Description words reveal (opacity 0.15 to 1.0, matching About section style)
      tl.to(descWords, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        duration: 2.2,
      }, `${labelStart}+=0.4`);

      // Animate tag pills fade-in
      tl.to(tagEls, {
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        duration: 1.0,
      }, `${labelStart}+=1.2`);

      // -- STATIC VIEW HOLD --
      tl.to({}, { duration: 1.8 });

      // -- ANIMATE OUT (only if not the last project) --
      if (index < projects.length - 1) {
        // Animate image out with a 3D tilt and slide-up fade out
        tl.to(imgContainerInner, {
          scale: 0.85,
          yPercent: -30,
          rotationX: -15,
          rotationY: 10,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1.8,
        }, labelEnd);

        if (imgEl) {
          tl.to(imgEl, {
            scale: 1.15,
            yPercent: 10,
            ease: "power2.inOut",
            duration: 1.8,
          }, labelEnd);
        }

        // Animate text elements out
        tl.to([roleText, title, toolsHeader, descWords, tagEls], {
          opacity: 0,
          y: -30,
          stagger: 0.05,
          ease: "power2.inOut",
          duration: 1.5,
        }, labelEnd);

        tl.set(panel, { display: "none" });
      } else {
        // Last project view holds before section unpins
        tl.to({}, { duration: 2.2 });
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [mounted]);

  if (!mounted) {
    // Render static black placeholder during SSR & hydration to prevent layout shift and insertBefore errors
    return <section id="portfolio" style={{ minHeight: "100vh", backgroundColor: "#000000" }} />;
  }

  return (
    <section ref={sectionRef} id="portfolio" className={styles.proofSection}>
      <div className={styles.container}>
        {/* PHASE 1: INITIAL HEADING */}
        <div ref={headingRef} className={styles.initialHeadingWrapper}>
          <h2 className={styles.initialHeadingText}>
            {initialWords.map((word, i) => (
              <span key={i} className={`proof-word ${styles.word}`}>
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* PHASE 2: PROJECTS PANELS */}
        <div className={styles.panelsStack}>
          {projects.map((project) => {
            const descWords = project.desc.split(" ");
            return (
              <div
                key={project.id}
                className={`proof-project-panel ${styles.projectPanel}`}
                style={{ display: "none" }}
              >
                {/* Left Column: Image with 3D Parallax hover and scroll links */}
                <div className={styles.imgContainer}>
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.imageLink}
                  >
                    <div className={`proof-img-container-inner ${styles.imgContainerInner}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className={`proof-project-image ${styles.projectImage}`}
                      />
                    </div>
                  </a>
                </div>

                {/* Right Column: Project Description & Info */}
                <div className={styles.textDetailsColumn}>
                  <p className={`proof-project-role ${styles.roleText}`}>
                    {project.role}
                  </p>

                  <h3 className={`proof-project-title ${styles.titleText}`}>
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.titleLink}
                    >
                      {project.title}
                    </a>
                  </h3>

                  <p className={`${styles.descParagraph} ${styles.descParagraphMargin}`}>
                    {descWords.map((word, i) => (
                      <span key={i} className={`proof-desc-word ${styles.descWord}`}>
                        {word}
                      </span>
                    ))}
                  </p>

                  <p className={`proof-tools-header ${styles.toolsHeader}`}>
                    {project.toolsHeader}
                  </p>

                  <div className={styles.tagsContainer}>
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={`proof-tag ${styles.tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
