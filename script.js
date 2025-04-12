function locomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation();

function loadingAnimation(){
  var tl = gsap.timeline()
  tl.from("#page1", {
    opacity: 0,
    duration: 0.2,
    delay: 0.2
  })

  tl.from("#page1", {
    transform:"scaleX(0.7) scaleY(0)",
    borderRadius: "150px",
    duration: 1,
    ease: "expo.out"
  })

  tl.from("nav", {
    opacity: 0,
    delay: 0.2
  })

  tl.from("#page1 h1, #page1 p, #page1 div", {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2
  })
}
loadingAnimation();

function navAnimation() {
  var nav = document.querySelector("nav");

  nav.addEventListener("mouseenter", () => {
    let tl = gsap.timeline();
    tl.to("#nav-bottom", {
      height: "21vh",
    });
    tl.to(".nav-part2 h5", {
      display: "block",
    });
    tl.to(".nav-part2 h5 span", {
      y: 0,
      // duration: 0.3,
      stagger: {
        amount: 0.6,
      },
    });
  });

  nav.addEventListener("mouseleave", () => {
    let tl = gsap.timeline();

    tl.to(".nav-part2 h5 span", {
      y: 25,
      stagger: {
        amout: 0.2,
      },
    });
    tl.to(".nav-part2 h5", {
      display: "none",
      duration: 0.1,
    });
    tl.to("#nav-bottom", {
      height: 0,
      duration: 0.2,
    });
  });
}
navAnimation();

function page2Animation(){
  var rightElems = document.querySelectorAll(".right-elem")
rightElems.forEach(function(elem){
  elem.addEventListener("mouseenter", function(){
    gsap.to(elem.childNodes[3], {
      opacity: 1,
      scale: 1
    })
  })
  elem.addEventListener("mouseleave", function(){
    gsap.to(elem.childNodes[3], {
      opacity: 0,
      scale: 0
    })
  })
  elem.addEventListener("mousemove", function(dets){
    gsap.to(elem.childNodes[3], {
      x:dets.x - elem.getBoundingClientRect().x - 50,
      y:dets.y - elem.getBoundingClientRect().y - 150
    })
  })
})
}
page2Animation();


function page3VideoAnimation() {
  var page3Center = document.querySelector(".page3-center");
  var video = document.querySelector("#page3 video");

  // Initial state setup
  gsap.set(video, {
    transform: "scaleX(0.7) scaleY(0)",
    opacity: 0,
    borderRadius: "30px",
    pointerEvents: "none", // Prevent interaction initially
  });

  // Event to play video and show it with animation
  page3Center.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent conflicts with child clicks
    video.play();
    gsap.to(video, {
      transform: "scaleX(1) scaleY(1)",
      opacity: 1,
      borderRadius: 0,
      duration: 0.5, // Smooth transition
      onComplete: () => video.style.pointerEvents = "auto", // Allow interaction
    });
  });

  // Event to pause video and hide it with animation
  video.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent conflicts with parent clicks
    video.pause();
    gsap.to(video, {
      transform: "scaleX(0.7) scaleY(0)",
      opacity: 0,
      borderRadius: "30px",
      duration: 0.5, // Smooth transition
      onComplete: () => video.style.pointerEvents = "none", // Disable interaction
    });
  });
}
page3VideoAnimation();

function sectionAnimation(){
  var sections = document.querySelectorAll(".sec-right");
sections.forEach(function(elem){
  elem.addEventListener("mouseenter", function(){
    elem.childNodes[3].style.opacity = 1;
    elem.childNodes[3].play();
  })
  elem.addEventListener("mouseleave", function(){
    elem.childNodes[3].style.opacity = 0;
    elem.childNodes[3].load();
  })
})
}
sectionAnimation();

function arrowToggle(){
  let elem1 = document.querySelectorAll("#page7-content h1 #first");
  let elem2 = document.querySelectorAll("#page7-content h1 #second");
  let down1 = true;
  let down2 = true;

  elem1[0].addEventListener("click", function(){
    down1 = !down1;
    if(down1){
      elem1[0].innerHTML = '<i class="ri-arrow-up-s-line"></i>'
    }
    else{
      elem1[0].innerHTML = '<i class="ri-arrow-down-s-line"></i>';
    }
  })

  elem2[0].addEventListener("click", function(){
    down2 = !down2;
    if(down2){
      elem2[0].innerHTML = '<i class="ri-arrow-down-s-line"></i>';
    }
    else{
      elem2[0].innerHTML = '<i class="ri-arrow-up-s-line"></i>';
    }
  })
}
arrowToggle();

function page10Animation(){
  gsap.from("#bottom10-part2 h4", {
    x: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#bottom10-part2",
      scroller: "#main",
      start: "top 80%",
      end: "top 10%",
      // markers: true,
      scrub: true
    }
  })
}
page10Animation();

