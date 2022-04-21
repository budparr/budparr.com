import Alpine from 'alpinejs';
// import Alpine from '@alpinejs/csp';

// window.Alpine = Alpine
Alpine.start();

console.log("this is scripts/index.js")


document.documentElement.className = document.documentElement.className.replace(
    /\bno-js\b/,
    "js"
  );
  