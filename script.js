document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  const feedback = document.querySelector('#form-feedback');
  
  if (form && feedback) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');
      
      let isValid = true;
      let errorMessage = '';

      if (!nameInput.value.trim()) {
        isValid = false;
        errorMessage += 'Name is required.\n';
      }
      if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
      }
      if (!messageInput.value.trim()) {
        isValid = false;
        errorMessage += 'Message is required.\n';
      }

      feedback.classList.remove('hidden');
      if (isValid) {
        feedback.textContent = 'Submitting your message...';
        feedback.classList.remove('text-red-600', 'bg-red-100');
        feedback.classList.add('text-green-800', 'bg-green-100');

        try {
          const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });
          
          if (response.ok) {
            feedback.textContent = 'Thank you! Your message has been sent.';
            feedback.classList.add('text-green-800', 'bg-green-100');
            form.reset();
          } else {
            feedback.textContent = 'Error sending message. Please try again.';
            feedback.classList.remove('text-green-800', 'bg-green-100');
            feedback.classList.add('text-red-600', 'bg-red-100');
          }
        } catch (error) {
          feedback.textContent = 'Network error. Please try again.';
          feedback.classList.remove('text-green-800', 'bg-green-100');
          feedback.classList.add('text-red-600', 'bg-red-100');
        }
      } else {
        feedback.textContent = errorMessage.replace(/\n/g, ' ');
        feedback.classList.remove('text-green-800', 'bg-green-100');
        feedback.classList.add('text-red-600', 'bg-red-100');
      }
    });
  }
});