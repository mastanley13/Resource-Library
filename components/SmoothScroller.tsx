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
    gsap.registerPlugin(ScrollTrigger);

    const scroll = new LocomotiveScroll({
      el: document.querySelector("#smooth-wrapper") as HTMLElement,
      smooth: true,
      smartphone: { smooth: true },
    });

    ScrollTrigger.scrollerProxy("#smooth-wrapper", {
      scrollTop(value) {
        return value !== undefined ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    const onScroll = () => ScrollTrigger.update();
    scroll.on("scroll", onScroll);

    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", () => scroll.update());
      scroll.off("scroll", onScroll);
      scroll.destroy();
    };
  }, []);

  return <div id="smooth-wrapper">{children}</div>;
}
