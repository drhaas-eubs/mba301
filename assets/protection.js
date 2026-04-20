/* MBA301 — Content protection (deterrent layer).
   NOTE: This is a classroom-appropriate deterrent, not true security.
   Determined users can view source, take screenshots, or disable JavaScript.
   The goal is to make casual copying and printing inconvenient and to set a
   clear expectation that the material is © 2026 Dr. H. Haas / EU Business School. */
(function () {
  'use strict';

  // ----- Toast notice -----
  var toast = document.createElement('div');
  toast.className = 'mba-protect-toast';
  toast.setAttribute('role', 'alert');
  toast.style.cssText = 'display:none';
  toast.innerHTML = '<span class="mba-protect-ico">🔒</span><div class="mba-protect-body"><strong>Protected content</strong><span>This course material is © 2026 Dr. H. Haas · EU Business School and is not available for copying, saving or printing.</span></div>';
  document.body.appendChild(toast);

  var toastTimer = null;
  function showToast() {
    toast.style.display = 'flex';
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.style.display = 'none'; }, 300);
    }, 2800);
  }

  function isInSearchInput(target) {
    // Allow search input to work normally (typing, editing)
    return target && (
      target.classList && target.classList.contains('mba-search-input')
    );
  }
  function isInteractiveElement(target) {
    var tag = (target && target.tagName) || '';
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  }

  // ----- Block right-click context menu -----
  document.addEventListener('contextmenu', function (e) {
    if (isInteractiveElement(e.target)) return;
    e.preventDefault();
    showToast();
    return false;
  });

  // ----- Block drag (images, text) -----
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  });

  // ----- Block text selection at DOM level (belt-and-braces with CSS) -----
  document.addEventListener('selectstart', function (e) {
    if (isInteractiveElement(e.target)) return;
    e.preventDefault();
    return false;
  });

  // ----- Block copy/cut events -----
  ['copy', 'cut'].forEach(function (evt) {
    document.addEventListener(evt, function (e) {
      if (isInSearchInput(e.target) || isInteractiveElement(e.target)) return;
      e.preventDefault();
      try { e.clipboardData.setData('text/plain', ''); } catch (_) {}
      showToast();
    });
  });

  // ----- Block keyboard shortcuts -----
  document.addEventListener('keydown', function (e) {
    // Allow search modal keyboard shortcuts
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) return;

    // Don't interfere when user is typing into an input/textarea
    if (isInteractiveElement(e.target)) return;

    var key = (e.key || '').toLowerCase();

    // Ctrl/Cmd + C / X / A / P / S / U / J
    if ((e.metaKey || e.ctrlKey) && ['c', 'x', 'a', 'p', 's', 'u', 'j'].indexOf(key) !== -1) {
      e.preventDefault();
      showToast();
      return false;
    }

    // Ctrl/Cmd + Shift + I/C/J (dev tools common shortcuts)
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && ['i', 'c', 'j'].indexOf(key) !== -1) {
      e.preventDefault();
      showToast();
      return false;
    }
  });

  // ----- Print deterrent: visible hint if Ctrl/Cmd+P sneaks through -----
  window.addEventListener('beforeprint', function () {
    // CSS @media print will handle the actual blackout; this is informational.
    console.info('MBA301 course material is not available for printing.');
  });

})();
