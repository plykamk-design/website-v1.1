// Mebel Laminat — small, editable interactions.
const languageToggle = document.getElementById('languageToggle');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('mainNav');
let currentLanguage = 'mk';

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-mk][data-en]').forEach((element) => {
    const value = element.dataset[language];
    if (value !== undefined) element.innerHTML = value;
  });
  languageToggle.textContent = language === 'mk' ? 'EN' : 'MK';
  document.querySelectorAll('option[data-mk][data-en]').forEach((option) => {
    option.textContent = option.dataset[language];
  });
}
languageToggle.addEventListener('click', () => setLanguage(currentLanguage === 'mk' ? 'en' : 'mk'));

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact form: submit to the Cloudflare Pages Function at /api/contact.
const contactForm = document.getElementById('contactForm');
const formHint = document.getElementById('formHint');
const submitButton = contactForm.querySelector('button[type="submit"]');
const submitLabel = submitButton.querySelector('span');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const language = currentLanguage;
  const originalLabel = language === 'mk' ? 'Подготви порака ↗' : 'Send message ↗';
  submitButton.disabled = true;
  submitLabel.textContent = language === 'mk' ? 'Се испраќа...' : 'Sending...';
  formHint.textContent = language === 'mk' ? 'Ве молиме почекајте...' : 'Please wait...';
  formHint.setAttribute('role', 'status');

  const form = new FormData(contactForm);
  const payload = {
    name: String(form.get('name') || '').trim(),
    email: String(form.get('email') || '').trim(),
    project: String(form.get('project') || '').trim(),
    message: String(form.get('message') || '').trim(),
    website: String(form.get('website') || '').trim()
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.error || 'Submission failed');
    }

    formHint.textContent = language === 'mk'
      ? 'Ви благодариме! Вашата порака е успешно испратена.'
      : 'Thank you! Your message has been sent successfully.';
    formHint.style.color = 'green';
    contactForm.reset();
  } catch (error) {
    console.error('Contact form submission failed:', error);
    formHint.textContent = language === 'mk'
      ? 'Пораката не можеше да се испрати. Обидете се повторно подоцна.'
      : 'Your message could not be sent. Please try again later.';
    formHint.style.color = '#b42318';
  } finally {
    submitButton.disabled = false;
    submitLabel.textContent = originalLabel;
  }
});
