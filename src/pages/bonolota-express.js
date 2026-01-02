// Importing Files
import '../styles/base.css';
import '../styles/movies.css';
import '../main.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { renderLinks, renderSocialLinks, renderContactInfo, renderCast, renderCarousel, initScrollSpy, initSidebar, initVideoModal, initSectionVideos, setSectionBackgrounds } from "../main.js";


// Nav Links
export const siteLinks = [
  { text: "Home", href: "#home" },
  { text: "About", href: "#about" },
  { text: "Cast", href: "#cast" },
  { text: "Gallery", href: "#gallery" },
  { text: "Contact", href: "#contact" }
];

// Social Links
export const socialLinksData = [
  {
    href: "https://www.facebook.com/p/Buriganga-Talkies-61582315140804/",
    icon: "fa-facebook"
  },
  {
    href: "",
    icon: "fa-instagram"
  },
  {
    href: "",
    icon: "fa-youtube"
  }
];

// Cast data
export const castData = [
  {
    name: "Mosharraf Karim",
    img: "https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg"
  },
  {
    name: "Chanchal Chowdhury",
    img: "https://images.pexels.com/photos/4792288/pexels-photo-4792288.jpeg"
  },
  {
    name: "Azmeri Haque Badhon",
    img: "https://images.pexels.com/photos/8382083/pexels-photo-8382083.jpeg"
  },
  {
    name: "Sabila Nur",
    img: "https://images.pexels.com/photos/5999874/pexels-photo-5999874.jpeg"
  },
  {
    name: "Shamol Mawla",
    img: "https://images.pexels.com/photos/7103117/pexels-photo-7103117.jpeg"
  }
];


// Carousel Image Data
export const carouselSlides = [
  {
    src: "https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg",
    alt: "Mountain Landscape"
  },
  {
    src: "https://images.pexels.com/photos/4792288/pexels-photo-4792288.jpeg",
    alt: "Beach Sunset"
  },
  {
    src: "https://images.pexels.com/photos/8382083/pexels-photo-8382083.jpeg",
    alt: "Beach Sunset"
  },
  {
    src: "https://images.pexels.com/photos/5999874/pexels-photo-5999874.jpeg",
    alt: "Beach Sunset"
  },
  {
    src: "https://images.pexels.com/photos/7103117/pexels-photo-7103117.jpeg",
    alt: "Cover Image"
  }
];

// Footer Contact Info
export const contactInfo = [
  {
    icon: "fa-location-dot",
    text: "Block A, 2nd Floor, House 53, Road 01,<br />Niketan Housing Society, Dhaka, Bangladesh"
  },
  {
    icon: "fa-phone",
    text: "+880 1756 407517"
  },
  {
    icon: "fa-envelope",
    text: "contact.dopeproductions@gmail.com"
  }
];


// YouTube Link
export const youTubeLink = "https://www.youtube.com/embed/PE1k3TdwK7Y";


export const backgroundImages = [
    {
        id: "about",
        url: "assets/bonolota-express/about-background.webp"
    },
    {
        id: "cast",
        url: 'assets/bonolota-express/cast-background.webp'
    }

]

// Nav In-page links
renderLinks({
  container: document.getElementById("navLinks"),
  links: siteLinks,
  aClass: "nav__link",
  addActiveToFirst: false
});

// Aside In-page links
renderLinks({
  container: document.getElementById("asideLinks"),
  links: siteLinks,
  liClass: "aside__link"
});

// Open and Close Sidebar
const sidebar = document.querySelector('.sidebar');
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close');
const asideLinks = document.querySelectorAll('.aside__link');
const asideOverlay = document.querySelector('.aside__overlay');

initSidebar({
  sidebarEl: sidebar,
  openBtn: hamburger,
  closeBtn: closeBtn,
  links: asideLinks,
  overlay: asideOverlay
});

// Aside section social links
renderSocialLinks(
  document.getElementById("asideSocialLinks"),
  socialLinksData
);

// Hero section social links
renderSocialLinks(
  document.getElementById("homeSocialLinks"),
  socialLinksData
);

// Hero Video
initSectionVideos(document.querySelectorAll('section'));

// Play and pause video
// initScrollSpy(
//     document.querySelectorAll("section"), 
//     document.getElementById("navLinks")
// );

// Video Modal
const modal = document.getElementById('videoModal');
const openModal = document.querySelector('.display__button');
const closeModal = document.getElementById('closeModal');
const player = document.getElementById('ytPlayer');


initVideoModal({
  modalEl: modal,
  openBtn: openModal,
  closeBtn: closeModal,
  playerEl: player,
  videoURL: youTubeLink
});

// Render Cast Images
renderCast(
    document.getElementById("castGrid"), 
    castData
);

// Render Carousel Images
renderCarousel(
    document.getElementById("carouselIndicators"),
    document.getElementById("carouselInner"),
    carouselSlides
)

// Set Background Image
setSectionBackgrounds(backgroundImages);

// Render Footer Contacts
renderContactInfo(
    document.getElementById("contactInfo"), 
    contactInfo
);