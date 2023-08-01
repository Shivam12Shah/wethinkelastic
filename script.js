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

var timel = gsap.timeline();
var i=0;
var img_slider = setInterval(function(){

  document.querySelector("#loader img").src = `${imgs[i]}`
  i++;
  // console.log(imgs[i]);
  if(i>=imgs.length){
    clearInterval(img_slider);
    timel.to("#loader-img img",{
      y:"-100%",
      ease:Power3.easeOut,
    },"shivam")
    timel.to("#loader",{
      y:"-100%",
      delay:-2,
      ease:Power3.easeOut,
    },"shivam")
    
  }

},200)
gsap.from("#hello h1 span",{
  y:`100%`,
  stagger:0.1,
  duration:0.8,
  delay:2.6
})

gsap.to("#page1-video",{
  width:"100%",
  scrollTrigger:{
    trigger:"#hero h2",
    scroller:"#main",
    start:"top 90%",
    end:"top -40%",
    // markers:true,
    scrub:3,
  }
})
gsap.to("#h1-section",{
  x:"-65%",
  scrollTrigger:{
    trigger:"#page3",
    scroller:"#main",
    start:"top 0%",
    end:"top -100%",
    markers:true,
    scrub:1,
    pin:true
  }
})

var cursor = document.querySelector("#cursor")

window.addEventListener("mousemove", function(dets){
  
  gsap.to("#cursor",{
    x:`${dets.clientX - 150}px`,
    y:`${dets.clientY -150}px`,
  })
  dets.stopPropagation();
  // console.log(dets);
})
// document.querySelectorAll(".project-video").forEach(function(dets){
//   dets.addEventListener("mouseenter",function(){
//    
//     cursor.style.left="-50px"
//     cursor.style.top="-50px"
//     dets.style.scale= 0.96
//     dets.lastElementChild.style.scale = 1.08
//   })
// })
// document.querySelectorAll(".project-video").forEach(function(dets){
//   dets.addEventListener("mouseleave",function(){
//     cursor.style.display = "none"
//     dets.style.scale= 1
//     dets.lastElementChild.style.scale = 1


//   })
// })
// document.querySelectorAll(".project-img").forEach(function(dets){
//   dets.addEventListener("mouseenter",function(){
//     cursor.style.display = "initial"
//     dets.style.scale= 0.96
//     dets.lastElementChild.style.scale = 1.08

//   })
// })
// document.querySelectorAll(".project-img").forEach(function(dets){
//   dets.addEventListener("mouseleave",function(){
//     

//   })
// })

var imgs = ['https://wethinkelastic.com/assets/images/11d1acd8abd7b1efc4c23d.svg','https://wethinkelastic.com/assets/images/109804494fa1878703f2c1.svg','https://wethinkelastic.com/assets/images/9e5b57420355774e0a99d.svg','https://wethinkelastic.com/assets/images/8a2db0cd90582eb4b877d.svg','https://wethinkelastic.com/assets/images/7c9e22462b51ae93b5a17.svg','https://wethinkelastic.com/assets/images/6a714ad31db5d83bc967b.svg','https://wethinkelastic.com/assets/images/556ce542d7fdbd78d032e.svg','https://wethinkelastic.com/assets/images/4e7e9b9fc472434d65a23.svg','https://wethinkelastic.com/assets/images/338b04b3ad8edf6773599.svg','https://wethinkelastic.com/assets/images/24a07612b16472c6a503f.svg','https://wethinkelastic.com/assets/images/152c223f4359675788470.svg']

// console.log(imgs.length);

console.log(document.querySelectorAll(".project"));

document.querySelectorAll(".project").forEach(function(dets){
  dets.addEventListener("mouseenter",(events)=>{
    
    console.log(events.bubbles);
    cursor.style.display = "initial";
    events.stopPropagation();
  })
  dets.addEventListener("mouseleave",(event)=>{
    
    // console.log(event.bubbles);
    cursor.style.display = "none"
    event.stopPropagation();
  })
})
