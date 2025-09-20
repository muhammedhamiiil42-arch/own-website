// EmailJS configuration — replace with your real IDs from the EmailJS dashboard
const EMAILJS_PUBLIC_KEY = "JnVfgZKdgQMFtvBhI"; // your real EmailJS public key
const EMAILJS_SERVICE_ID = "service_8hn9f88"; // your real EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_ngo42yb"; // your real EmailJS template ID

// Initialize once DOM is ready and SDK is present
document.addEventListener("DOMContentLoaded", () => {
  if (typeof emailjs === "undefined" || !emailjs?.init) {
    console.error(
      "EmailJS SDK not loaded. Include https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js BEFORE this script."
    );
    return;
  }
  try {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      console.warn(
        "EmailJS public key is NOT set. Replace EMAILJS_PUBLIC_KEY with your real Public Key from EmailJS › Account."
      );
    }
  } catch (e) {
    console.error("EmailJS init failed:", e);
  }
});

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sendMail(event) {
  event.preventDefault();
  // Ensure SDK is ready
  if (typeof emailjs === "undefined" || !emailjs.send) {
    alert("❌ Email service is not ready. Make sure the EmailJS SDK script is loaded BEFORE index.js.");
    console.error(
      "EmailJS SDK missing. Include: <script src=\"https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js\"></script>"
    );
    return false;
  }

  const nameValue = document.getElementById("name").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const messageValue = document.getElementById("message").value.trim();

  if (!nameValue || !emailValue || !messageValue) {
    alert("⚠ Please fill in all fields (Name, Email, Message).");
    return false;
  }
  if (!isValidEmail(emailValue)) {
    alert("⚠ Please enter a valid email address.");
    return false;
  }

  var params = {
    from_name: nameValue,
    from_email: emailValue,
    reply_to: emailValue,
    message: messageValue,
  };

  console.log("Sending via", EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID);
  console.table(params);

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(res => {
      ["name", "email", "message"].forEach(id => (document.getElementById(id).value = ""));
      console.log("SUCCESS", res.status, res.text);
      alert("✅ Your message was sent successfully!");
    })
    .catch(err => {
      const details = err?.text || err?.message || JSON.stringify(err);
      alert("❌ Failed to send message. Details in console.\n\n• Check: Public Key, Service ID, Template ID\n• Check: Template variable names match params\n• Check: Your domain is added in EmailJS Settings › Domains");
      console.error("❌ EmailJS send failed:", details);
    });

  return false;
}



let lastScrollY = window.scrollY;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    
    navbar.classList.add("hide");
  } else {
  
    navbar.classList.remove("hide");
  }
  lastScrollY = window.scrollY;
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});