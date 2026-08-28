window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const loadingEl = form.querySelector('.loading');
  const errorEl = form.querySelector('.error-message');
  const sentEl = form.querySelector('.sent-message');

  const setState = ({ loading, error, sent }) => {
    if (loadingEl) loadingEl.style.display = loading ? 'block' : 'none';
    if (errorEl) {
      errorEl.style.display = error ? 'block' : 'none';
      errorEl.textContent = error || '';
    }
    if (sentEl) sentEl.style.display = sent ? 'block' : 'none';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setState({ loading: true, error: '', sent: false });

    const action = form.getAttribute('action') || '';
    if (!action || action.includes('yourFormId')) {
      setState({
        loading: false,
        error: 'Form endpoint is not set. Update the form action URL to your form provider endpoint.',
        sent: false
      });
      return;
    }

    try {
      const formData = new FormData(form);
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (!res.ok) {
        let msg = 'Failed to send message. Please try again.';
        try {
          const data = await res.json();
          if (data?.errors?.length) msg = data.errors.map((x) => x.message).join(' ');
        } catch (_) { }
        setState({ loading: false, error: msg, sent: false });
        return;
      }

      form.reset();
      setState({ loading: false, error: '', sent: true });
    } catch (err) {
      setState({ loading: false, error: 'Network error. Please try again.', sent: false });
    }
  });
});

