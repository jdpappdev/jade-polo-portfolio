(() => {
  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[character]);
  }

  function safeURL(value) {
    const candidate = String(value ?? '').trim();
    if (!candidate || candidate.startsWith('//')) return '';
    if (/^[a-z][a-z\d+.-]*:/i.test(candidate)) {
      try {
        const parsed = new URL(candidate, window.location.href);
        return ['http:', 'https:'].includes(parsed.protocol) ? escapeHTML(parsed.href) : '';
      } catch {
        return '';
      }
    }
    return escapeHTML(candidate);
  }

  globalThis.ProjectBriefSafety = Object.freeze({ escapeHTML, safeURL });
})();
