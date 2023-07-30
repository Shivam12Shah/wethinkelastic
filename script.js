function locooo(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
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
locooo();

var clutter = "";
document.querySelector("#hello h1").textContent.split("").forEach(function (dets) {
    clutter += `<span> ${dets} </span>`
    document.querySelector("#hello h1").innerHTML = clutter;
})

gsap.from("#hello h1 span",{
  y:"100%",
  duration:1,
  stagger:0.1,
  ease:Expo.easeInOut,
})

gsap.to("#page1-video",{
  width:"100%",
  scrollTrigger:{
    trigger:"#hero h2",
    scroller:"#main",
    start:"top 90%",
    end:"top -40%",
    markers:true,
    scrub:3,
  }
})

var cursor = document.querySelector("#cursor")

window.addEventListener("mousemove", function(dets){
  cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`
  // console.log(dets);
})
document.querySelectorAll(".project-video").forEach(function(dets){
  dets.addEventListener("mouseenter",function(){
    cursor.style.opacity=1
    dets.style.scale= 0.9
    dets.lastElementChild.style.scale = 1.2
  })
})
document.querySelectorAll(".project-video").forEach(function(dets){
  dets.addEventListener("mouseleave",function(){
    cursor.style.opacity=0
    dets.style.scale= 1
    dets.lastElementChild.style.scale = 1


  })
})
document.querySelectorAll(".project-img").forEach(function(dets){
  dets.addEventListener("mouseenter",function(){
    cursor.style.opacity=1
    dets.style.scale= 0.9
    dets.lastElementChild.style.scale = 1.2

  })
})
document.querySelectorAll(".project-img").forEach(function(dets){
  dets.addEventListener("mouseleave",function(){
    cursor.style.opacity=0
    dets.style.scale= 1
    dets.lastElementChild.style.scale = 1

  })
})