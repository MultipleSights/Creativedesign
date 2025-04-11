// Preloaer 
window.addEventListener("load", () => {
  const preloader = document.getElementById("videoPreloader");
  const targetVideo = document.querySelector(".leftsection video");

  // Wait for video playback or loading
  setTimeout(() => {
    const targetRect = targetVideo.getBoundingClientRect();

    // Animate to match leftsection video
    preloader.style.transition = "all 1s ease-in-out, opacity 1s ease-in-out";
    preloader.style.position = "fixed";
    preloader.style.top = `${targetRect.top}px`;
    preloader.style.left = `${targetRect.left}px`;
    preloader.style.width = `${targetRect.width}px`;
    preloader.style.height = `${targetRect.height}px`;

    // Fade it out after shrinking
    setTimeout(() => {
      preloader.style.opacity = "0";

      // Finally hide it
      setTimeout(() => {
        preloader.style.display = "none";
      }, 1000); // Match fade duration
    }, 1000); // Wait for shrink transition to finish
  }, 3000); // Delay before starting shrink (match video length)
});




document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
  
    function toggleMobileMenu() {
      mobileMenu.classList.toggle('active');
      const isExpanded = mobileMenu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      
      // Toggle hamburger icon
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
      }
    }
  
    menuToggle.addEventListener('click', toggleMobileMenu);
  
    // ===== DROPDOWN MENUS =====
    // Desktop hover dropdowns
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.querySelector('.dropdown').style.opacity = '1';
        this.querySelector('.dropdown').style.visibility = 'visible';
        this.querySelector('.dropdown').style.transform = 'translateY(0)';
        this.querySelector('.dropdown-arrow').style.transform = 'rotate(180deg)';
      });
  
      item.addEventListener('mouseleave', function() {
        this.querySelector('.dropdown').style.opacity = '0';
        this.querySelector('.dropdown').style.visibility = 'hidden';
        this.querySelector('.dropdown').style.transform = 'translateY(10px)';
        this.querySelector('.dropdown-arrow').style.transform = 'rotate(0)';
      });
    });
  
    // Mobile click dropdowns
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        dropdown.classList.toggle('active');
        const isExpanded = dropdown.classList.contains('active');
        
        // Update ARIA attributes
        this.setAttribute('aria-expanded', isExpanded);
        
        // Rotate arrow icon
        if (icon) {
          icon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0)';
        }
      });
    });
  
    // ===== CLOSE MENU WHEN CLICKING OUTSIDE =====
    document.addEventListener('click', function(e) {
      // Close mobile menu
      if (mobileMenu.classList.contains('active') && 
          !e.target.closest('.navbar') && 
          !e.target.closest('.mobile-menu')) {
        toggleMobileMenu();
      }
      
      // Close mobile dropdowns when clicking elsewhere
      if (!e.target.closest('.mobile-dropdown-toggle')) {
        document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
          const toggle = dropdown.previousElementSibling;
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            const icon = toggle.querySelector('i');
            if (icon) icon.style.transform = 'rotate(0)';
          }
        });
      }
    });
  
    // ===== KEYBOARD ACCESSIBILITY =====
    document.addEventListener('keydown', function(e) {
      // Close on Escape key
      if (e.key === 'Escape') {
        if (mobileMenu.classList.contains('active')) {
          toggleMobileMenu();
        }
        
        document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
  
    // ===== TOUCH DEVICE DETECTION =====
    // Improve hover behavior on touch devices
    function isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
  
    if (isTouchDevice()) {
      document.body.classList.add('touch-device');
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          const dropdown = this.querySelector('.dropdown');
          if (dropdown) {
            const isVisible = dropdown.style.visibility === 'visible';
            document.querySelectorAll('.dropdown').forEach(d => {
              d.style.opacity = '0';
              d.style.visibility = 'hidden';
              d.style.transform = 'translateY(10px)';
            });
            document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
              arrow.style.transform = 'rotate(0)';
            });
            
            if (!isVisible) {
              dropdown.style.opacity = '1';
              dropdown.style.visibility = 'visible';
              dropdown.style.transform = 'translateY(0)';
              this.querySelector('.dropdown-arrow').style.transform = 'rotate(180deg)';
            }
          }
        });
      });
    }
  });

  