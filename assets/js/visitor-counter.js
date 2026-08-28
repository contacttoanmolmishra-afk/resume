(() => {
  'use strict';

  const namespace = 'lakumnarvirsinh';
  const key = 'portfolio-visits';
  const COUNTER_URL = `https://api.countapi.xyz/hit/${namespace}/${key}`;
  const CREATE_URL = `https://api.countapi.xyz/create?namespace=${encodeURIComponent(namespace)}&key=${encodeURIComponent(key)}&value=0`;

  const formatCount = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return '--';
    return num.toLocaleString('en-IN');
  };

  const setCounterText = (text) => {
    const countEl = document.getElementById('visitor-count');
    if (countEl) countEl.textContent = text;
  };

  const updateLocalFallback = () => {
    try {
      const key = 'portfolio-visits-local';
      const prev = Number(localStorage.getItem(key) || '0');
      const next = Number.isFinite(prev) ? prev + 1 : 1;
      localStorage.setItem(key, String(next));
      setCounterText(formatCount(next));
    } catch (_) {
      setCounterText('--');
    }
  };

  const loadCounter = async () => {
    try {
      let res = await fetch(COUNTER_URL, { method: 'GET', cache: 'no-store' });
      if (res.status === 404) {
        await fetch(CREATE_URL, { method: 'GET', cache: 'no-store' });
        res = await fetch(COUNTER_URL, { method: 'GET', cache: 'no-store' });
      }
      if (!res.ok) throw new Error(`Counter request failed: ${res.status}`);
      const data = await res.json();
      setCounterText(formatCount(data?.value));
    } catch (_) {
      updateLocalFallback();
    }
  };

  window.addEventListener('DOMContentLoaded', loadCounter);
})();
