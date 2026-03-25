# Contact Email System Backup

This is a backup copy of the working contact form/email system previously used in `contact.html`.

## Form Markup

```html
<form id="contactForm" class="contact-form">
  <input type="text" name="name" placeholder="Your name" required />
  <input type="email" name="email" placeholder="Your email" required />
  <textarea name="message" placeholder="Your message" required></textarea>
  <button type="submit">Send</button>
</form>

<p id="status" class="status"></p>
```

## Submit Script

```html
<script>
  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "Sending…";

    const formData = new FormData(form);

    fetch("https://script.google.com/macros/s/AKfycbzeR-Ek8bIuNkkl87gBWiwdDVFGjLB-jfzYOjAYjLCxL3Co9UZ7GjrRqCh8xpKa4HBQUw/exec", {
      method: "POST",
      body: formData
    })
    .then(r => r.text())
    .then(() => {
      status.textContent = "Message sent. Thank you!";
      form.reset();
    })
    .catch(() => {
      status.textContent = "Error sending message.";
    });
  });
</script>
```
