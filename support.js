(() => {
  class DCLogic {
    constructor(props = {}) { this.props = props; }
  }
  window.DCLogic = DCLogic;

  function applyHoverStyles() {
    document.querySelectorAll('[style-hover]').forEach((el) => {
      const base = el.getAttribute('style') || '';
      const hover = el.getAttribute('style-hover') || '';
      el.addEventListener('mouseenter', () => { el.setAttribute('style', base + ';' + hover); });
      el.addEventListener('mouseleave', () => { el.setAttribute('style', base); });
    });
  }

  function fixEmailProtection() {
    document.querySelectorAll('a[href*="/cdn-cgi/l/email-protection"]').forEach((a) => {
      a.href = 'mailto:kavan.mehta@attaliscapital.com';
      if (a.textContent.includes('protected')) a.textContent = 'kavan.mehta@attaliscapital.com';
    });
    document.querySelectorAll('.__cf_email__').forEach((el) => { el.textContent = 'kavan.mehta@attaliscapital.com'; });
  }

  function boot() {
    applyHoverStyles();
    fixEmailProtection();
    const script = document.querySelector('script[type="text/x-dc"][data-dc-script]');
    if (!script) return;
    let raw = {};
    try { raw = JSON.parse(script.getAttribute('data-props') || '{}'); } catch (_) {}
    const props = {};
    for (const [key, schema] of Object.entries(raw)) {
      if (key.startsWith('$')) continue;
      props[key] = schema && Object.prototype.hasOwnProperty.call(schema, 'default') ? schema.default : undefined;
    }
    try {
      const ComponentClass = new Function('DCLogic', `${script.textContent}\nreturn Component;`)(DCLogic);
      const instance = new ComponentClass(props);
      window.__stereonComponent = instance;
      if (typeof instance.renderVals === 'function') instance.renderVals();
      if (typeof instance.componentDidMount === 'function') instance.componentDidMount();
    } catch (err) {
      console.error('Stereon boot failed', err);
      const root = document.getElementById('st-root');
      if (root) root.insertAdjacentHTML('afterbegin', '<div style="position:fixed;z-index:9999;bottom:12px;left:12px;background:#300;color:#fff;padding:10px 14px;border-radius:8px;font:12px monospace">Interactive runtime failed. Please refresh.</div>');
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
