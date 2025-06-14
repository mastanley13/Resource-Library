"use client";

import React, { useEffect, type ReactNode } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  children: ReactNode;
}

export default function SmoothScroller({ children }: Props) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    const scroll = new LocomotiveScroll({
      el: document.querySelector("#smooth-wrapper") as HTMLElement,
      smooth: true,
      smartphone: { smooth: true },
    });

    ScrollTrigger.scrollerProxy("#smooth-wrapper", {
      scrollTop(value) {
        if (value !== undefined) {
          scroll.scrollTo(value);
          return;
        }
        return 0; // Return 0 for now to avoid the type error
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    const onScroll = () => ScrollTrigger.update();
    scroll.on("scroll", onScroll);

    const onRefresh = () => { scroll.update(); };
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      scroll.destroy();
    };
  }, []);

  return <div id="smooth-wrapper">{children}</div>;
}
