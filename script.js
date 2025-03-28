
document.addEventListener("DOMContentLoaded", () => {
  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();
  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);
  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });
  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  const items = document.querySelectorAll(
    ".vertical-scroll .cont-wrapper .slide"
  );

  const hItems = document.querySelectorAll(
    ".horizontal-scroll .cont-wrapper .slide"
  );

  console.log(hItems);

  items.forEach((item, index) => {
    if (index !== 0)
      gsap.set(item, {
        yPercent: 100,
      });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".vertical-scroll .cont-wrapper",
      pin: true,
      start: "top top",
      end: () => `+=${(items.length - 1) * 100}%`,
      scrub: 1,
      invalidateOnRefresh: true,
      markers: true,
    },
  });

  items.forEach((item, index) => {
    tl.to(item, {
      scale: 0.9,
      borderRadius: "15px",
    });

    tl.to(
      items[index + 1],
      {
        yPercent: 0,
      },
      "<"
    );
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".images-wrapper",
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: () => `+=${300}%`,
      scrub: 1,
      invalidateOnRefresh: true,
      markers: true,
    },
  });

  gsap.to(".img-1 img", {
    scale: 1.125,
    scrollTrigger: {
      trigger: ".images-wrapper",
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      scrub: true,
    },
  });

  gsap.to(".img-2 img", {
    // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".images-wrapper",
      start: "top top",
      end: `+=${window.innerHeight}`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".img-2", {
          clipPath: `polygon(
            ${gsap.utils.interpolate(
              40,
              0,
              progress
            )}% ${gsap.utils.interpolate(25, 0, progress)}%,
            ${gsap.utils.interpolate(
              60,
              100,
              progress
            )}% ${gsap.utils.interpolate(25, 0, progress)}%,
            ${gsap.utils.interpolate(
              60,
              100,
              progress
            )}% ${gsap.utils.interpolate(75, 100, progress)}%,
            ${gsap.utils.interpolate(
              40,
              0,
              progress
            )}% ${gsap.utils.interpolate(75, 100, progress)}%
            )`,
        });
      },
    },
  });
  gsap.to(".img-3 img", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".images-wrapper",
      start: `${window.innerHeight * 6}`,
      end: `${window.innerHeight * 7}`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".img-3", {
          clipPath: `polygon(
            ${gsap.utils.interpolate(
              50,
              0,
              progress
            )}% ${gsap.utils.interpolate(50, 0, progress)}%,
            ${gsap.utils.interpolate(
              50,
              100,
              progress
            )}% ${gsap.utils.interpolate(50, 0, progress)}%,
            ${gsap.utils.interpolate(
              50,
              100,
              progress
            )}% ${gsap.utils.interpolate(50, 100, progress)}%,
            ${gsap.utils.interpolate(
              50,
              0,
              progress
            )}% ${gsap.utils.interpolate(50, 100, progress)}%
            )`,
        });
      },
    },
  });

  //     hItems.forEach((item, index) => {
  //       if (index !== 0) {
  //         gsap.set(item, {
  //           xPercent: 100,
  //         });
  //       }
  //     });

  //     hItems.forEach((item, index) => {
  //       tl2.to(item, {
  //         scale: 0.9,
  //         borderRadius: "15px",
  //       });

  //       if (index < hItems.length - 1) {
  //         tl2.to(
  //           hItems[index + 1],
  //           {
  //             xPercent: 0,
  //           },
  //           "<"
  //         );
  //       }
  //     });
});
