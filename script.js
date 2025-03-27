
document.addEventListener("DOMContentLoaded", () => {

    // Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


    const scrollSection = document.querySelectorAll(".vertical-scroll");

    const wrapper = document.querySelectorAll(".cont-wrapper");

    const items = document.querySelectorAll(".slide");

    console.log(items);

    items.forEach((item, index) => {
        if (index !== 0){
            gsap.set(item, {
                yPercent: 100,
            })
        }
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".cont-wrapper",
            pin: true,
            start: "top top",
            end: () => `+=${items.length * 100}%`,
            scrub: 1,
            invalidateOnRefresh: true,
            markers: true,
        }
    })
    items.forEach((item, index) => {
        tl.to(item, {
            scale: 0.9,
            borderRadius: "10px",
        })

        if (index < items.length - 1) {
            tl.to(items[index + 1], {
                yPercent: 0,
            }, "<");
        }
    })

})

