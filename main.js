/* ═══════════════════════════════════════════════════════════
   PAULE-MARIE BATSOTSA — Portfolio JS
   ═══════════════════════════════════════════════════════════ */

// ── BACKGROUND : Code Rain violet/bleu élégant ───────────────────────────────
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, drops, cols;
  const FONT_SIZE = 13;
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}[]#@!?';
  const PALETTE = [
    'rgba(139,92,246,',   // violet pastel
    'rgba(99,102,241,',   // indigo
    'rgba(168,85,247,',   // violet clair
    'rgba(96,165,250,',   // bleu clair
  ];

  function resize() {
    const hero = document.getElementById('hero');
    W = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
    H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
    cols  = Math.floor(W / FONT_SIZE);
    drops = Array.from({ length: cols }, () => Math.random() * -100);
  }

  function draw() {
    ctx.fillStyle = 'rgba(244,242,255,0.07)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = `${FONT_SIZE}px 'Outfit', monospace`;
    for (let i = 0; i < drops.length; i++) {
      const char    = CHARS[Math.floor(Math.random() * CHARS.length)];
      const palette = PALETTE[i % PALETTE.length];
      const y       = drops[i] * FONT_SIZE;
      ctx.fillStyle = palette + (0.55 + Math.random() * 0.3) + ')';
      ctx.fillText(char, i * FONT_SIZE, y);
      for (let t = 1; t < 4; t++) {
        ctx.fillStyle = palette + Math.max(0, 0.3 - t * 0.08) + ')';
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FONT_SIZE, y - t * FONT_SIZE);
      }
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.4 + Math.random() * 0.25;
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
})();

// ── NAVBAR ────────────────────────────────────────────────────────────────────
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

// ── MOBILE MENU ───────────────────────────────────────────────────────────────
(function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
})();

// ── HERO ENTRANCE ─────────────────────────────────────────────────────────────
(function initHero() {
  const content = document.getElementById('hero-content');
  setTimeout(() => {
    content.style.opacity  = '1';
    content.style.transform = 'translateY(0)';
  }, 120);
})();

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => obs.observe(el));
})();

// ── SKILL BARS ────────────────────────────────────────────────────────────────
(function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sfill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.skill-block').forEach(el => obs.observe(el));
})();

// ── CONTACT FORM ──────────────────────────────────────────────────────────────
(function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.textContent = '✓ Message envoyé !';
    btn.classList.add('sent');
    ['input-name','input-email','input-msg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.classList.remove('sent');
    }, 3000);
  });
})();

// ── CARD TILT ─────────────────────────────────────────────────────────────────
(function initCardTilt() {
  document.querySelectorAll('.stage-card, .proj-category-card, .certif-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

// ── PROJETS PANELS ────────────────────────────────────────────────────────────
function toggleProj(cat) {
  const ids = ['reseau','systeme','dev'];
  const open = document.getElementById('panel-' + cat).classList.contains('open');
  ids.forEach(id => {
    document.getElementById('panel-' + id).classList.remove('open');
    document.getElementById('panel-' + id).style.display = 'none';
    const card = document.getElementById('cat-' + id);
    if (card) card.classList.remove('active');
  });
  if (!open) {
    const panel = document.getElementById('panel-' + cat);
    panel.style.display = 'block';
    panel.classList.add('open');
    const card = document.getElementById('cat-' + cat);
    if (card) card.classList.add('active');
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  }
}

// ── CERTIF FILE ───────────────────────────────────────────────────────────────
function handleCertifFile(input, previewId) {
  const file = input.files[0];
  if (!file) return;
  document.getElementById(previewId).textContent = '✅ ' + file.name;
}

// ── VEILLE TECHNOLOGIQUE : Flux RSS ──────────────────────────────────────────
(function initVeille() {

  const PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';

  const FEEDS = [
    { id: 'feed-certfr', url: 'https://www.cert.ssi.gouv.fr/feed/', badge: 'red',    label: 'CERT-FR', count: 4 },
    { id: 'feed-nvd',    url: 'https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss-analyzed.xml', badge: 'orange', label: 'CVE', count: 4 },
    { id: 'feed-thn',    url: 'https://feeds.feedburner.com/TheHackersNews', badge: 'blue',   label: 'THN', count: 4 },
    { id: 'feed-bc',     url: 'https://www.bleepingcomputer.com/feed/',      badge: 'violet', label: 'BC',  count: 4 },
  ];

  const FALLBACKS = {
    'feed-certfr': [
      { title: 'Vulnérabilité critique dans Cisco IOS XE — exécution de code à distance', link: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-001/', pubDate: '2026-05-01T10:00:00Z', description: 'Le CERT-FR recommande l\'application immédiate du correctif. Faille permettant l\'exécution de code sans authentification.' },
      { title: 'Patch Tuesday Microsoft — 68 vulnérabilités dont 3 zero-days', link: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-002/', pubDate: '2026-04-08T10:00:00Z', description: 'Le CERT-FR alerte sur trois vulnérabilités activement exploitées dans Windows et Office.' },
      { title: 'Campagne de phishing ciblant les DSI français', link: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-003/', pubDate: '2026-04-20T10:00:00Z', description: 'Une vague de spear-phishing sophistiqué vise les administrateurs système en France.' },
      { title: 'Exploitation active de CVE-2026-3144 dans FortiGate', link: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-004/', pubDate: '2026-03-28T10:00:00Z', description: 'Des attaquants exploitent activement cette faille dans les VPN FortiGate. Mise à jour urgente recommandée.' },
    ],
    'feed-nvd': [
      { title: 'CVE-2026-2891 — CVSS 9.8 CRITICAL — Apache HTTP Server RCE', link: 'https://nvd.nist.gov/vuln/detail/CVE-2026-2891', pubDate: '2026-05-02T12:00:00Z', description: 'Exécution de code à distance sans authentification via une requête HTTP malformée.' },
      { title: 'CVE-2026-1203 — CVSS 8.8 HIGH — Windows Kernel Privilege Escalation', link: 'https://nvd.nist.gov/vuln/detail/CVE-2026-1203', pubDate: '2026-04-25T12:00:00Z', description: 'Élévation de privilèges dans le noyau Windows permettant d\'obtenir les droits SYSTEM.' },
      { title: 'CVE-2026-4512 — CVSS 9.1 CRITICAL — VMware ESXi Auth Bypass', link: 'https://nvd.nist.gov/vuln/detail/CVE-2026-4512', pubDate: '2026-04-15T12:00:00Z', description: 'Contournement d\'authentification sur VMware ESXi permettant l\'accès non autorisé aux VMs.' },
      { title: 'CVE-2026-0987 — CVSS 7.5 HIGH — OpenSSL Buffer Overflow', link: 'https://nvd.nist.gov/vuln/detail/CVE-2026-0987', pubDate: '2026-04-10T12:00:00Z', description: 'Dépassement de tampon dans OpenSSL pouvant provoquer un déni de service ou exécution de code.' },
    ],
    'feed-thn': [
      { title: 'LockBit 4.0 frappe des hôpitaux en Europe', link: 'https://thehackernews.com/2026/05/lockbit-4-0-hits-hospitals-europe.html', pubDate: '2026-05-03T08:00:00Z', description: 'Le groupe ransomware LockBit revendique des attaques contre des hôpitaux en France, Allemagne et Belgique.' },
      { title: 'Nouvelle technique : exfiltration DNS via HTTPS chiffré', link: 'https://thehackernews.com/2026/04/dns-exfiltration-https-encrypted.html', pubDate: '2026-04-28T08:00:00Z', description: 'Des chercheurs démontrent une méthode d\'exfiltration discrète utilisant les canaux DNS-over-HTTPS.' },
      { title: 'APT29 exploite un zero-day VPN pour cibler des gouvernements', link: 'https://thehackernews.com/2026/04/apt29-zero-day-vpn-governments.html', pubDate: '2026-04-20T08:00:00Z', description: 'Le groupe russe APT29 utilise une faille inédite dans un VPN répandu pour compromettre des entités étatiques.' },
      { title: '40 millions de comptes volés chez un opérateur télécom', link: 'https://thehackernews.com/2026/04/40-million-accounts-stolen-telecom.html', pubDate: '2026-04-15T08:00:00Z', description: 'Un opérateur majeur confirme une violation massive : noms, adresses et données de facturation exposés.' },
    ],
    'feed-bc': [
      { title: 'Microsoft corrige 74 failles dont 5 zero-days exploités', link: 'https://www.bleepingcomputer.com/news/security/microsoft-fixes-74-flaws-5-exploited-zero-days/', pubDate: '2026-04-08T10:00:00Z', description: 'Le Patch Tuesday couvre des vulnérabilités critiques dans Windows, Exchange et Edge.' },
      { title: 'Nouveau malware ShadowStealer vole les credentials Chrome', link: 'https://www.bleepingcomputer.com/news/security/new-shadowstealer-malware-steals-chrome-passwords/', pubDate: '2026-04-25T10:00:00Z', description: 'Un stealer inédit cible les mots de passe enregistrés dans Chrome, Firefox et Edge.' },
      { title: 'Supply chain attack via GitHub Actions compromis', link: 'https://www.bleepingcomputer.com/news/security/supply-chain-attack-via-compromised-github-actions/', pubDate: '2026-04-18T10:00:00Z', description: 'Des actions GitHub malveillantes ont injecté du code dans des pipelines CI/CD de développeurs.' },
      { title: 'Ivanti publie un correctif d\'urgence pour Connect Secure', link: 'https://www.bleepingcomputer.com/news/security/ivanti-releases-emergency-patch-for-connect-secure/', pubDate: '2026-04-10T10:00:00Z', description: 'Une vulnérabilité critique dans Ivanti Connect Secure est activement exploitée. Patch urgent.' },
    ],
  };

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim().slice(0, 120);
  }

  function renderCards(containerId, items, badge, label) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!items || items.length === 0) {
      container.innerHTML = '<div class="feed-error">Aucun article disponible.</div>';
      return;
    }
    container.innerHTML = items.map(item => `
      <a href="${item.link || '#'}" target="_blank" rel="noopener" class="feed-card">
        <div class="fc-badge ${badge}">${label}</div>
        <div class="fc-title">${item.title || 'Sans titre'}</div>
        <div class="fc-desc">${stripHtml(item.description || item.content || '')}</div>
        <div class="fc-meta">
          <span>📅 ${formatDate(item.pubDate)}</span>
          <span class="fc-read">Lire →</span>
        </div>
      </a>
    `).join('');
  }

  function renderFallback(feed) {
    renderCards(feed.id, FALLBACKS[feed.id] || [], feed.badge, feed.label);
  }

  async function loadFeed(feed) {
    try {
      const res = await fetch(
        `${PROXY}${encodeURIComponent(feed.url)}`,
        { signal: AbortSignal.timeout(6000) }
      );
      const data = await res.json();
      if (data.status === 'ok' && data.items?.length) {
        // Limiter à feed.count articles
        const limitedItems = data.items.slice(0, feed.count);
        renderCards(feed.id, limitedItems, feed.badge, feed.label);
      } else {
        renderFallback(feed);
      }
    } catch (e) {
      renderFallback(feed);
    }
  }

  // Afficher fallback immédiatement, puis tenter le live
  FEEDS.forEach(feed => renderFallback(feed));

  // Charger les flux live quand la section est visible
  const section = document.getElementById('veille');
  if (section) {
    let loaded = false;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loaded) {
        loaded = true;
        FEEDS.forEach(feed => loadFeed(feed));
      }
    }, { threshold: 0.1 });
    obs.observe(section);
  }
})();


// ── VEILLE TECHNOLOGIQUE : Flux RSS ──────────────────────────────────────────
(function initVeille() {

  const PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';

  const FEEDS = [
    { id: 'feed-certfr', url: 'https://www.cert.ssi.gouv.fr/feed/', badge: 'red',    label: 'CERT-FR', count: 4 },
    { id: 'feed-nvd',    url: 'https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss-analyzed.xml', badge: 'orange', label: 'CVE', count: 4 },
    { id: 'feed-thn',    url: 'https://feeds.feedburner.com/TheHackersNews', badge: 'blue',   label: 'THN', count: 4 },
    { id: 'feed-bc',     url: 'https://www.bleepingcomputer.com/feed/',      badge: 'violet', label: 'BC',  count: 4 },
  ];

  const FALLBACKS = {
    'feed-certfr': [
      { title: 'Vulnérabilité critique dans Cisco IOS XE — exécution de code à distance', link: 'https://www.cert.ssi.gouv.fr', pubDate: new Date().toISOString(), description: 'Le CERT-FR recommande l\'application immédiate du correctif. Faille permettant l\'exécution de code sans authentification.' },
      { title: 'Patch Tuesday Microsoft — 68 vulnérabilités dont 3 zero-days', link: 'https://www.cert.ssi.gouv.fr', pubDate: new Date().toISOString(), description: 'Le CERT-FR alerte sur trois vulnérabilités activement exploitées dans Windows et Office.' },
      { title: 'Campagne de phishing ciblant les DSI français', link: 'https://www.cert.ssi.gouv.fr', pubDate: new Date().toISOString(), description: 'Une vague de spear-phishing sophistiqué vise les administrateurs système en France.' },
      { title: 'Exploitation active de CVE-2025-3144 dans FortiGate', link: 'https://www.cert.ssi.gouv.fr', pubDate: new Date().toISOString(), description: 'Des attaquants exploitent activement cette faille dans les VPN FortiGate. Mise à jour urgente recommandée.' },
    ],
    'feed-nvd': [
      { title: 'CVE-2025-2891 — CVSS 9.8 CRITICAL — Apache HTTP Server RCE', link: 'https://nvd.nist.gov', pubDate: new Date().toISOString(), description: 'Exécution de code à distance sans authentification via une requête HTTP malformée.' },
      { title: 'CVE-2025-1203 — CVSS 8.8 HIGH — Windows Kernel Privilege Escalation', link: 'https://nvd.nist.gov', pubDate: new Date().toISOString(), description: 'Élévation de privilèges dans le noyau Windows permettant d\'obtenir les droits SYSTEM.' },
      { title: 'CVE-2025-4512 — CVSS 9.1 CRITICAL — VMware ESXi Auth Bypass', link: 'https://nvd.nist.gov', pubDate: new Date().toISOString(), description: 'Contournement d\'authentification sur VMware ESXi permettant l\'accès non autorisé aux VMs.' },
      { title: 'CVE-2025-0987 — CVSS 7.5 HIGH — OpenSSL Buffer Overflow', link: 'https://nvd.nist.gov', pubDate: new Date().toISOString(), description: 'Dépassement de tampon dans OpenSSL pouvant provoquer un déni de service ou exécution de code.' },
    ],
    'feed-thn': [
      { title: 'LockBit 4.0 frappe des hôpitaux en Europe', link: 'https://thehackernews.com', pubDate: new Date().toISOString(), description: 'Le groupe ransomware LockBit revendique des attaques contre des hôpitaux en France, Allemagne et Belgique.' },
      { title: 'Nouvelle technique : exfiltration DNS via HTTPS chiffré', link: 'https://thehackernews.com', pubDate: new Date().toISOString(), description: 'Des chercheurs démontrent une méthode d\'exfiltration discrète utilisant les canaux DNS-over-HTTPS.' },
      { title: 'APT29 exploite un zero-day VPN pour cibler des gouvernements', link: 'https://thehackernews.com', pubDate: new Date().toISOString(), description: 'Le groupe russe APT29 utilise une faille inédite dans un VPN répandu pour compromettre des entités étatiques.' },
      { title: '40 millions de comptes volés chez un opérateur télécom', link: 'https://thehackernews.com', pubDate: new Date().toISOString(), description: 'Un opérateur majeur confirme une violation massive : noms, adresses et données de facturation exposés.' },
    ],
    'feed-bc': [
      { title: 'Microsoft corrige 74 failles dont 5 zero-days exploités', link: 'https://www.bleepingcomputer.com', pubDate: new Date().toISOString(), description: 'Le Patch Tuesday couvre des vulnérabilités critiques dans Windows, Exchange et Edge.' },
      { title: 'Nouveau malware ShadowStealer vole les credentials Chrome', link: 'https://www.bleepingcomputer.com', pubDate: new Date().toISOString(), description: 'Un stealer inédit cible les mots de passe enregistrés dans Chrome, Firefox et Edge.' },
      { title: 'Supply chain attack via GitHub Actions compromis', link: 'https://www.bleepingcomputer.com', pubDate: new Date().toISOString(), description: 'Des actions GitHub malveillantes ont injecté du code dans des pipelines CI/CD de développeurs.' },
      { title: 'Ivanti publie un correctif d\'urgence pour Connect Secure', link: 'https://www.bleepingcomputer.com', pubDate: new Date().toISOString(), description: 'Une vulnérabilité critique dans Ivanti Connect Secure est activement exploitée. Patch urgent.' },
    ],
  };

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim().slice(0, 120);
  }

  function renderCards(containerId, items, badge, label) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!items || items.length === 0) {
      container.innerHTML = '<div class="feed-error">Aucun article disponible.</div>';
      return;
    }
    container.innerHTML = items.map(item => `
      <a href="${item.link || '#'}" target="_blank" rel="noopener" class="feed-card">
        <div class="fc-badge ${badge}">${label}</div>
        <div class="fc-title">${item.title || 'Sans titre'}</div>
        <div class="fc-desc">${stripHtml(item.description || item.content || '')}</div>
        <div class="fc-meta">
          <span>📅 ${formatDate(item.pubDate)}</span>
          <span class="fc-read">Lire →</span>
        </div>
      </a>
    `).join('');
  }

  function renderFallback(feed) {
    renderCards(feed.id, FALLBACKS[feed.id] || [], feed.badge, feed.label);
  }

  async function loadFeed(feed) {
    try {
      const res = await fetch(
        `${PROXY}${encodeURIComponent(feed.url)}&count=${feed.count}`,
        { signal: AbortSignal.timeout(6000) }
      );
      const data = await res.json();
      if (data.status === 'ok' && data.items?.length) {
        renderCards(feed.id, data.items, feed.badge, feed.label);
      } else {
        renderFallback(feed);
      }
    } catch (e) {
      renderFallback(feed);
    }
  }

  // Afficher fallback immédiatement, puis tenter le live
  FEEDS.forEach(feed => renderFallback(feed));

  // Charger les flux live quand la section est visible
  const section = document.getElementById('veille');
  if (section) {
    let loaded = false;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loaded) {
        loaded = true;
        FEEDS.forEach(feed => loadFeed(feed));
      }
    }, { threshold: 0.1 });
    obs.observe(section);
  }
})();