/**************************************************************
 * SwipeMatch – Core Application Logic & Dynamic Shuffle Engine
 * Supports:
 * 1) Dynamic 8-Card Random Pool Sampling & Fisher-Yates Shuffle
 * 2) Classic Sudden-Death Match Mode (mode: 'match')
 * 3) Anti-Match & Fair Chores Split Mode (mode: 'chores')
 * 4) Custom Quick-Deck Creator encoded 100% in URL Hash (#c=...)
 **************************************************************/

const CARDS_PER_ROUND = 8; // Zieht pro Runde 8 zufällige Karten aus großen Pools

// 45 CODENAMES FÜR 100% GENDER-NEUTRALE & GLEICHBERECHTIGTE SPIELER (Heist & Apple Aesthetic)
const CODENAMES = [
    { name: "Gold", dot: "#EAB308" },
    { name: "Silver", dot: "#94A3B8" },
    { name: "Titan", dot: "#64748B" },
    { name: "Onyx", dot: "#1E293B" },
    { name: "Ruby", dot: "#E11D48" },
    { name: "Jade", dot: "#059669" },
    { name: "Amber", dot: "#D97706" },
    { name: "Cobalt", dot: "#2563EB" },
    { name: "Opal", dot: "#06B6D4" },
    { name: "Carbon", dot: "#334155" },
    { name: "Chrome", dot: "#64748B" },
    { name: "Platin", dot: "#A1A1AA" },
    { name: "Midnight", dot: "#1E1B4B" },
    { name: "Slate", dot: "#475569" },
    { name: "Indigo", dot: "#4F46E5" },
    { name: "Mint", dot: "#10B981" },
    { name: "Copper", dot: "#B45309" },
    { name: "Bronze", dot: "#92400E" },
    { name: "Smoke", dot: "#71717A" },
    { name: "Sage", dot: "#84CC16" },
    { name: "Shadow", dot: "#18181B" },
    { name: "Coral", dot: "#F43F5E" },
    { name: "Ice", dot: "#38BDF8" },
    { name: "Nova", dot: "#F59E0B" },
    { name: "Echo", dot: "#6366F1" },
    { name: "Orion", dot: "#3B82F6" },
    { name: "Atlas", dot: "#0EA5E9" },
    { name: "Zenith", dot: "#8B5CF6" },
    { name: "Eclipse", dot: "#0F172A" },
    { name: "Solar", dot: "#FBBF24" },
    { name: "Frost", dot: "#7DD3FC" },
    { name: "Thunder", dot: "#EAB308" },
    { name: "Vortex", dot: "#6D28D9" },
    { name: "Apex", dot: "#0D9488" },
    { name: "Phantom", dot: "#6B7280" },
    { name: "Pulse", dot: "#0284C7" },
    { name: "Volt", dot: "#EAB308" },
    { name: "Nitro", dot: "#EF4444" },
    { name: "Zero", dot: "#09090B" },
    { name: "Drift", dot: "#065F46" },
    { name: "Ghost", dot: "#9CA3AF" },
    { name: "Matrix", dot: "#22C55E" },
    { name: "Raven", dot: "#171717" },
    { name: "Jet", dot: "#0369A1" },
    { name: "Flash", dot: "#FACC15" }
];

function getRandomCodename() {
    return CODENAMES[Math.floor(Math.random() * CODENAMES.length)];
}

function getUserProfile() {
    const customName = localStorage.getItem('easyagree_user_name');
    if (customName && customName.trim()) {
        return { name: customName.trim(), dot: '#0071E3', isCustom: true };
    }
    const savedCodenameStr = localStorage.getItem('easyagree_codename');
    if (savedCodenameStr) {
        try {
            return JSON.parse(savedCodenameStr);
        } catch (e) {}
    }
    const initial = getRandomCodename();
    localStorage.setItem('easyagree_codename', JSON.stringify(initial));
    return initial;
}

function setUserProfileName(name) {
    if (name && name.trim()) {
        localStorage.setItem('easyagree_user_name', name.trim());
    } else {
        localStorage.removeItem('easyagree_user_name');
    }
    updateProfileUI();
}

function rerollCodename() {
    localStorage.removeItem('easyagree_user_name');
    const newCodename = getRandomCodename();
    localStorage.setItem('easyagree_codename', JSON.stringify(newCodename));
    updateProfileUI();
    const input = document.getElementById('profile-name-input');
    const dotEl = document.getElementById('profile-modal-dot');
    const aliasEl = document.getElementById('profile-current-alias');
    if (input) input.value = '';
    if (dotEl) dotEl.style.backgroundColor = newCodename.dot;
    if (aliasEl) aliasEl.innerText = newCodename.name;
}

function updateProfileUI() {
    const profile = getUserProfile();
    const nameEl = document.getElementById('user-profile-name');
    const dotEl = document.getElementById('user-profile-dot');
    if (nameEl) nameEl.innerText = profile.name;
    if (dotEl) dotEl.style.backgroundColor = profile.dot;
}

function openProfileModal() {
    const modal = document.getElementById('modal-profile');
    const input = document.getElementById('profile-name-input');
    const dotEl = document.getElementById('profile-modal-dot');
    const aliasEl = document.getElementById('profile-current-alias');
    const profile = getUserProfile();

    // Ensure we also read the underlying codename for the Alias display
    let codenameObj = profile;
    const savedCodenameStr = localStorage.getItem('easyagree_codename');
    if (savedCodenameStr) {
        try {
            codenameObj = JSON.parse(savedCodenameStr);
        } catch (e) {}
    }

    if (input) input.value = profile.isCustom ? profile.name : '';
    if (dotEl) dotEl.style.backgroundColor = codenameObj.dot || profile.dot;
    if (aliasEl) aliasEl.innerText = codenameObj.name || profile.name;
    renderProfileBlacklistUI();
    if (modal) modal.classList.remove('hidden');
}

function closeProfileModal() {
    localStorage.setItem('agreesy_profile_initialized', '1');
    const modal = document.getElementById('modal-profile');
    if (modal) modal.classList.add('hidden');
}

function saveProfileName() {
    const input = document.getElementById('profile-name-input');
    if (input) {
        setUserProfileName(input.value);
    }
    localStorage.setItem('agreesy_profile_initialized', '1');
    closeProfileModal();
}

/**************************************************************
 * 0A. PERMANENT CARD BLACKLIST & SEEN MEDIA ENGINE
 **************************************************************/
function getCanonicalDeckId(deckId) {
    if (deckId === 'streaming') return 'movie';
    if (deckId === 'chores') return 'household';
    return deckId || 'all';
}

function getBlacklistedCards() {
    try {
        const raw = localStorage.getItem('agreesy_blacklist_cards');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveBlacklistedCards(list) {
    try {
        localStorage.setItem('agreesy_blacklist_cards', JSON.stringify(list));
    } catch (e) {}
}

function isCardBlacklisted(deckId, cardId) {
    const canon = getCanonicalDeckId(deckId);
    const key = `${canon}:${cardId}`;
    return getBlacklistedCards().some(item => item.key === key);
}

function getSeenMediaList() {
    try {
        const raw = localStorage.getItem('agreesy_seen_media');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveSeenMediaList(list) {
    try {
        localStorage.setItem('agreesy_seen_media', JSON.stringify(list));
    } catch (e) {}
}

function removeBlacklistedCard(key) {
    const next = getBlacklistedCards().filter(item => item.key !== key);
    saveBlacklistedCards(next);
    renderProfileBlacklistUI();
}

function removeSeenMediaItem(id) {
    const next = getSeenMediaList().filter(item => item.id !== id);
    saveSeenMediaList(next);
    renderProfileBlacklistUI();
    if (matchedCard && !document.getElementById('screen-match').classList.contains('hidden')) {
        renderStage2MediaPicks(matchedCard);
    }
}

function clearAllBlacklists() {
    saveBlacklistedCards([]);
    saveSeenMediaList([]);
    renderProfileBlacklistUI();
    if (matchedCard && !document.getElementById('screen-match').classList.contains('hidden')) {
        renderStage2MediaPicks(matchedCard);
    }
}

function renderProfileBlacklistUI() {
    const listEl = document.getElementById('profile-blacklist-list');
    const resetBtn = document.getElementById('t-profile-blacklist-reset');
    if (!listEl) return;
    const t = I18N[currentLang] || I18N.de;
    const cards = getBlacklistedCards();
    const seen = getSeenMediaList();
    const total = cards.length + seen.length;

    if (resetBtn) {
        if (total > 0) resetBtn.classList.remove('hidden');
        else resetBtn.classList.add('hidden');
    }

    if (total === 0) {
        listEl.innerHTML = `<div class="text-[11.5px] text-muted-role py-1">${t.profileBlacklistEmpty || 'Noch keine Karten ausgeblendet'}</div>`;
        return;
    }

    const itemsHtml = [];
    cards.forEach(item => {
        itemsHtml.push(`
            <div class="flex items-center justify-between gap-2 surface-raised px-2.5 py-1.5 rounded-[8px]">
                <span class="truncate text-[11.5px] text-primary-role">🚫 ${item.label}</span>
                <button type="button" onclick="removeBlacklistedCard('${item.key}')" class="text-[11px] font-bold text-secondary-role hover:text-primary-role px-1.5">✕</button>
            </div>
        `);
    });
    seen.forEach(item => {
        itemsHtml.push(`
            <div class="flex items-center justify-between gap-2 surface-raised px-2.5 py-1.5 rounded-[8px]">
                <span class="truncate text-[11.5px] text-primary-role">👁️ ${item.title}</span>
                <button type="button" onclick="removeSeenMediaItem('${item.id}')" class="text-[11px] font-bold text-secondary-role hover:text-primary-role px-1.5">✕</button>
            </div>
        `);
    });
    listEl.innerHTML = itemsHtml.join('');
}

// 0-BYTE WEB AUDIO SYNTHESIZER (Walt Disney, Hans Zimmer & John Carmack)
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playSwipeClick(isLike) {
    try {
        if (navigator.vibrate) navigator.vibrate(isLike ? 16 : 10);
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        const now = ctx.currentTime;
        const freq = isLike ? 587.33 : 329.63; // D5 vs E4
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * (isLike ? 1.25 : 0.75), now + 0.04);
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        
        osc.start(now);
        osc.stop(now + 0.04);
    } catch (e) {}
}

function playMatchChime() {
    try {
        if (navigator.vibrate) navigator.vibrate([40, 80, 140]);
        const ctx = getAudioContext();
        if (!ctx) return;
        
        // Warm Major Triad Chime: C5, E5, G5, C6
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            const now = ctx.currentTime + (idx * 0.06);
            osc.frequency.setValueAtTime(freq, now);
            
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
            
            osc.start(now);
            osc.stop(now + 0.85);
        });
    } catch (e) {}
}

let currentLang = 'de';
let currentDeckId = null;
let currentCardIndex = 0;
let activeRoundCards = []; // Die für diese Runde gezogenen & gemischten Karten
let partnerRoundCardIds = null; // Welche Karten-IDs Spieler 1 in seiner Runde hatte
let partnerSenderName = null;   // Name oder Codename des Partners
let myLikes = [];          // Card-IDs mit JA-Swipe
let partnerLikes = null;   // null = Spieler 1; Array = Spieler 2+
let matchedCard = null;
let timerInterval = null;
let timeLeft = 30;
let selectedCategory = 'all';

// Player Count & Multi-Player Chain State (1 = Solo, 2 = Duo, 3..6 = Group)
let targetPlayerCount = (() => {
    const saved = parseInt(localStorage.getItem('agreesy_player_count') || '2', 10);
    return (!isNaN(saved) && saved >= 1 && saved <= 6) ? saved : 2;
})();
let completedPlayers = []; // Array of { name: string, likes: number[] }
let soloLikedCards = [];
let soloCurrentWinnerIdx = 0;
let soloDuelQueue = [];
let soloDuelChamp = null;
let soloDuelNextIdx = 1;
let lastMatchMeta = null;

function setPlayerCount(count) {
    const parsed = parseInt(count, 10);
    targetPlayerCount = (!isNaN(parsed) && parsed >= 1 && parsed <= 6) ? parsed : 2;
    try {
        localStorage.setItem('agreesy_player_count', String(targetPlayerCount));
    } catch (e) {}
    updatePlayerModeUI();
    updateHeroRoundCardUI();
}

function selectGroupMode() {
    if (targetPlayerCount < 3) {
        setPlayerCount(3);
    } else {
        updatePlayerModeUI();
    }
}

function updatePlayerModeUI() {
    const btn1 = document.getElementById('player-mode-btn-1');
    const btn2 = document.getElementById('player-mode-btn-2');
    const btnGroup = document.getElementById('player-mode-btn-group');
    const picker = document.getElementById('group-size-picker');
    const badge = document.getElementById('group-count-badge');

    const activeCls = "h-9 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all btn-primary shadow-sm";
    const inactiveCls = "h-9 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all text-secondary-role hover:text-primary-role";

    if (btn1) btn1.className = (targetPlayerCount === 1) ? activeCls : inactiveCls;
    if (btn2) btn2.className = (targetPlayerCount === 2) ? activeCls : inactiveCls;
    if (btnGroup) btnGroup.className = (targetPlayerCount >= 3) ? activeCls : inactiveCls;

    if (badge) {
        if (targetPlayerCount >= 3) {
            badge.innerText = `(${targetPlayerCount})`;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    if (picker) {
        if (targetPlayerCount >= 3) {
            picker.classList.remove('hidden');
            [3, 4, 5, 6].forEach(n => {
                const b = document.getElementById(`group-count-btn-${n}`);
                if (b) {
                    b.className = (n === targetPlayerCount)
                        ? "w-8 h-7 rounded-full text-[12px] font-bold transition-all btn-primary"
                        : "w-8 h-7 rounded-full text-[12px] font-bold transition-all surface-raised text-secondary-role hover:text-primary-role";
                }
            });
        } else {
            picker.classList.add('hidden');
        }
    }
}

// Custom Deck Builder State
let customDeckMode = 'match';
let customOptionCount = 3;

// Chores / Anti-Match Resolution State
let currentChoresSummary = {
    voluntary: [],     // { card, owner: 'p1' | 'p2' | 'both' }
    antiMatches: [],   // { card, assignedTo: null | 'p1' | 'p2' }
    resolved: false
};

const CUSTOM_CARD_GRADIENTS = [
    "from-slate-900 to-slate-800",
    "from-blue-900 to-slate-900",
    "from-emerald-900 to-slate-900",
    "from-indigo-900 to-slate-900",
    "from-neutral-900 to-stone-900",
    "from-sky-900 to-slate-900"
];
const CUSTOM_CARD_EMOJIS = ["1", "2", "3", "4", "5", "6"];

/**************************************************************
 * 0. HELPERS: UTF-8 BASE64 & FISHER-YATES SHUFFLE
 **************************************************************/
function encodeBase64Utf8(str) {
    return btoa(encodeURIComponent(str));
}

function decodeBase64Utf8(b64) {
    return decodeURIComponent(atob(b64));
}

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

/**************************************************************
 * 1. INITIALIZATION & LIFECYCLE
 **************************************************************/
window.addEventListener('DOMContentLoaded', () => {
    // 1. Theme-Controller starten
    if (typeof initThemeImmediately === 'function') {
        initThemeImmediately();
    }
    const theme = getPreferredTheme();
    setTheme(theme);

    // 2. Sprache bestimmen (Priorität: Gespeicherte Wahl -> Browser-Systemsprache -> 'de')
    currentLang = detectInitialLanguage();
    setLang(currentLang);

    // 2b. Profil & Codename anzeigen + beim allerersten Öffnen nach Namen/Alias fragen
    updateProfileUI();
    if (!localStorage.getItem('agreesy_profile_initialized')) {
        openProfileModal();
    }

    // 3. Partner-Herausforderung via Hash prüfen (#m=... oder #c=...)
    checkIncomingChallenge();

    // 3b. Direkter Deck-Start via SEO-Landingpage (?deck=dinner oder #deck=dinner)
    checkDirectDeckParam();

    // 3c. Direkter Aufruf von Impressum / Datenschutz via Hash (#impressum / #datenschutz)
    if (window.location.hash === '#impressum') {
        closeProfileModal();
        openLegalModal('impressum');
    } else if (window.location.hash === '#datenschutz') {
        closeProfileModal();
        openLegalModal('datenschutz');
    }

    // 4. Logo initialisieren & Showcase rendern
    if (typeof setActiveLogo === 'function') {
        setActiveLogo(currentLogoId);
    }

    // 5. Touch-Gesten für mobiles Wischen
    initTouchSwipe();

    // 6. PWA Installation Handler (OS-spezifisch)
    initPwaInstall();
});

function detectInitialLanguage() {
    const search = window.location.search;
    if (search) {
        const p = new URLSearchParams(search);
        const l = p.get('lang');
        if (l && I18N[l.toLowerCase()]) return l.toLowerCase();
    }
    const saved = localStorage.getItem('syncswipe_lang');
    if (saved && I18N[saved]) {
        return saved;
    }
    const candidateLanguages = (navigator.languages && navigator.languages.length)
        ? navigator.languages
        : [navigator.language || 'en'];

    for (const lang of candidateLanguages) {
        if (!lang) continue;
        const code = lang.slice(0, 2).toLowerCase();
        if (I18N[code]) {
            return code;
        }
    }
    return 'en';
}

/**************************************************************
 * 2. URL DECODER & PARTNER-SYNC (0-Byte Backend)
 **************************************************************/
function checkIncomingChallenge() {
    const hash = window.location.hash;
    const fullHref = window.location.href;

    // Check sender name from URL (&from=...)
    if (fullHref.includes('from=')) {
        const match = fullHref.match(/from=([^&/#]+)/);
        if (match) {
            partnerSenderName = decodeURIComponent(match[1]);
        }
    }

    // FALL 1: Standard-Deck Challenge (#m=deckId:likes:roundPool:customIdea:totalPlayers:namesPipe)
    if (hash && hash.startsWith('#m=')) {
        try {
            const raw = hash.replace('#m=', '').split('&')[0];
            const decodedStr = atob(raw); // Format: "dinner:0,14,5:14,3,0,19,5,8,11,2::3:Felix|Max"
            const parts = decodedStr.split(':');
            const deckId = parts[0];
            const likesStr = parts[1] || '';
            const poolStr = parts[2] || '';
            const customIdeaEncoded = parts[3] || '';
            const totalPlayersPart = parseInt(parts[4] || '2', 10);
            const namesPipeEncoded = parts[5] || '';

            if (DECKS[deckId]) {
                if (customIdeaEncoded) {
                    const ideaText = decodeURIComponent(customIdeaEncoded);
                    DECKS[deckId].cards = DECKS[deckId].cards.filter(c => c.id !== 999);
                    DECKS[deckId].cards.push({
                        id: 999,
                        emoji: '✨',
                        tag: { de: 'Vorschlag', en: 'Suggestion', es: 'Sugerencia', fr: 'Suggestion', it: 'Proposta' },
                        title: { de: ideaText, en: ideaText, es: ideaText, fr: ideaText, it: ideaText },
                        desc: { de: 'Eigene Idee für diese Runde', en: 'Custom idea for this round', es: 'Idea propia para esta ronda', fr: 'Idée personnelle pour cette manche', it: 'Idea personale per questa manche' }
                    });
                }
                currentDeckId = deckId;
                targetPlayerCount = (!isNaN(totalPlayersPart) && totalPlayersPart >= 2 && totalPlayersPart <= 6) ? totalPlayersPart : 2;
                updatePlayerModeUI();

                const likeGroups = likesStr.split('|');
                const nameGroups = namesPipeEncoded
                    ? namesPipeEncoded.split('|').map(s => { try { return decodeURIComponent(s); } catch (e) { return s; } })
                    : [partnerSenderName || 'Person 1'];

                completedPlayers = likeGroups.map((lg, idx) => ({
                    name: nameGroups[idx] || (`Person ${idx + 1}`),
                    likes: lg ? lg.split(',').filter(s => s !== '').map(Number) : []
                }));

                partnerSenderName = completedPlayers.map(p => p.name).join(', ');
                partnerLikes = completedPlayers[0] ? completedPlayers[0].likes : [];
                partnerRoundCardIds = poolStr ? poolStr.split(',').filter(s => s !== '').map(Number) : null;

                if (DECKS[deckId].category) {
                    selectedCategory = DECKS[deckId].category;
                }

                // Jobs & Monte: SOFORTIGER START FÜR NÄCHSTEN SPIELER (Direkt in Karte 1!)
                setTimeout(() => {
                    startGame(deckId);
                }, 80);
                return;
            }
        } catch (e) {
            console.warn("Ungültiger Herausforderungs-Link (#m=)", e);
        }
    }

    // FALL 2: Eigenes Blitz-Deck Challenge (#c=...)
    if (hash && hash.startsWith('#c=')) {
        try {
            const raw = hash.replace('#c=', '').split('&')[0];
            const payload = JSON.parse(decodeBase64Utf8(raw));
            if (payload && Array.isArray(payload.o) && payload.o.length >= 2) {
                registerCustomDeckInMemory(payload.t, payload.m || 'match', payload.o);
                currentDeckId = 'custom';
                const parsedTc = parseInt(payload.tc || '2', 10);
                targetPlayerCount = (!isNaN(parsedTc) && parsedTc >= 2 && parsedTc <= 6) ? parsedTc : 2;
                updatePlayerModeUI();

                if (Array.isArray(payload.voters) && payload.voters.length > 0) {
                    completedPlayers = payload.voters.map((v, idx) => ({
                        name: v.n || (`Person ${idx + 1}`),
                        likes: Array.isArray(v.l) ? v.l.map(Number) : []
                    }));
                } else {
                    completedPlayers = [{
                        name: partnerSenderName || 'Person 1',
                        likes: Array.isArray(payload.l) ? payload.l.map(Number) : []
                    }];
                }
                partnerSenderName = completedPlayers.map(p => p.name).join(', ');
                partnerLikes = completedPlayers[0] ? completedPlayers[0].likes : [];
                partnerRoundCardIds = null;
                selectedCategory = 'all';

                // Jobs & Monte: SOFORTIGER START FÜR NÄCHSTEN SPIELER
                setTimeout(() => {
                    startGame('custom');
                }, 80);
                return;
            }
        } catch (e) {
            console.warn("Ungültiger Custom-Deck-Link (#c=)", e);
        }
    }

    renderCategoryFilter();
    renderDeckList();
}

function checkDirectDeckParam() {
    const hash = window.location.hash;
    const search = window.location.search;
    if (hash && (hash.startsWith('#m=') || hash.startsWith('#c='))) {
        return; // Partner-Herausforderung hat Vorrang
    }
    let targetDeck = null;
    if (search) {
        const params = new URLSearchParams(search);
        targetDeck = params.get('deck');
    }
    if (!targetDeck && hash && hash.startsWith('#deck=')) {
        targetDeck = hash.replace('#deck=', '');
    }
    if (targetDeck && DECKS[targetDeck]) {
        localStorage.setItem('agreesy_profile_initialized', 'true');
        closeProfileModal();
        setTimeout(() => {
            startGame(targetDeck);
        }, 80);
    }
}

/**************************************************************
 * 3. INTERNATIONALIZATION (i18n) & UI TEXT REFRESH
 **************************************************************/
function setLang(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem('syncswipe_lang', lang);

    const langBtnLabel = document.getElementById('lang-btn-label');
    if (langBtnLabel) {
        langBtnLabel.innerText = lang.toUpperCase();
    }

    ['de', 'en', 'es', 'fr', 'it'].forEach(code => {
        const opt = document.getElementById(`lang-opt-${code}`);
        if (opt) {
            if (code === lang) {
                opt.className = "w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between bg-[#0071E3]/10 text-[#0071E3] dark:text-[#0A84FF] transition";
            } else {
                opt.className = "w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/10 transition text-slate-700 dark:text-neutral-300";
            }
        }
    });

    const t = I18N[lang];
    const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el && val !== undefined) el.innerText = val;
    };
    const setHtml = (id, val) => {
        const el = document.getElementById(id);
        if (el && val !== undefined) el.innerHTML = val;
    };

    setText('t-badge', t.badge);
    setHtml('t-hero-title', t.heroTitle);
    setText('t-hero-sub', t.heroSub);
    setText('t-p2-badge', t.p2Badge);
    setText('t-p2-title', t.p2Title);
    setText('t-p2-sub', t.p2Sub);
    const isChoresActive = currentDeckId && DECKS[currentDeckId] && DECKS[currentDeckId].mode === 'chores';
    setText('t-nope-hint', `← ${isChoresActive ? t.choreNopeHint : t.nopeHint}`);
    setText('t-like-hint', `${isChoresActive ? t.choreLikeHint : t.likeHint} →`);
    setText('t-btn-swipe-no', isChoresActive ? t.swipeChoreBtnNo : t.swipeBtnNo);
    setText('t-btn-swipe-yes', isChoresActive ? t.swipeChoreBtnYes : t.swipeBtnYes);
    const btnSwipeNoBtn = document.getElementById('btn-swipe-no');
    const btnSwipeYesBtn = document.getElementById('btn-swipe-yes');
    if (btnSwipeNoBtn) btnSwipeNoBtn.setAttribute('aria-label', isChoresActive ? t.swipeChoreBtnNo : t.swipeBtnNo);
    if (btnSwipeYesBtn) btnSwipeYesBtn.setAttribute('aria-label', isChoresActive ? t.swipeChoreBtnYes : t.swipeBtnYes);
    setText('t-share-title', t.shareTitle);
    setText('t-share-sub', t.shareSub);
    setText('t-share-link-label', t.shareLinkLabel);
    setText('t-wa-btn', t.waBtn);
    setText('t-copy-btn', t.copyBtn);
    setText('t-pass-phone', t.passPhone);
    setText('t-match-badge', t.matchBadge);
    setText('t-match-title', t.matchTitle);
    setText('t-match-sub', t.matchSub);
    setText('t-notify-partner', t.notifyPartner);
    setText('btn-continue-swiping', t.continueSwiping);
    setText('t-nomatch-title', t.nomatchTitle);
    setText('t-nomatch-sub', t.nomatchSub);
    setText('t-new-random-round-btn', t.newRandomRoundBtn);
    setText('t-random-pick-btn', t.randomPickBtn);
    setText('t-retry-btn', t.retryBtn);
    setText('t-footer', t.footerText);
    setText('t-footer-guides', t.footerGuides);
    setText('t-footer-impressum', t.footerImpressum);
    setText('t-footer-datenschutz', t.footerDatenschutz);

    // Screen P1 Zero
    setText('t-p1zero-title', t.p1ZeroTitle);
    setText('t-p1zero-sub', t.p1ZeroSub);
    setText('t-p1zero-fresh-btn', t.p1ZeroFreshBtn);
    setText('t-p1zero-idea-label', t.p1ZeroIdeaLabel);
    const p1IdeaInput = document.getElementById('p1-custom-idea-input');
    if (p1IdeaInput) p1IdeaInput.placeholder = t.p1ZeroPlaceholder;
    setText('t-p1zero-inject-btn', t.p1ZeroInjectBtn);
    setText('t-p1zero-back-btn', t.retryBtn);

    // Screen Suspense / Matching
    setText('t-matching-title', t.matchingTitle);
    setText('t-matching-sub', t.matchingSub);

    // Screen No Match
    setText('t-nomatch-wa-btn', t.noMatchWaBtn);
    setText('t-nomatch-idea-label', t.noMatchIdeaLabel);
    const p2CounterInput = document.getElementById('p2-counter-idea-input');
    if (p2CounterInput) p2CounterInput.placeholder = t.p1ZeroPlaceholder;
    setText('t-nomatch-send-btn', t.noMatchSendBtn);
    setText('t-new-round-btn', t.noMatchNewRoundBtn);

    // Chores & Legal Modals
    if (typeof getRegionalStoreConfig === 'function') {
        const storeCfg = getRegionalStoreConfig(lang);
        setText('t-chores-deal-text', `${t.choresDealText} (${storeCfg.amazonDomain}) *`);
        const choresDealLink = document.getElementById('chores-deal-link');
        if (choresDealLink) {
            choresDealLink.href = storeCfg.choresUrl;
        }
    } else {
        setText('t-chores-deal-text', t.choresDealText);
    }
    setText('t-winner-affiliate-note', t.affiliateFootnote);
    setText('t-chores-affiliate-note', t.affiliateFootnote);
    setText('legal-modal-close-btn', t.modalClose);

    // 3 Primary Hero Scenarios + Cal AI Macro & Feed Metadata
    setText('t-hero-food-title', t.heroFoodTitle);
    setText('t-hero-food-sub', t.heroFoodSub);
    setText('t-hero-food-btn', t.heroFoodBtn);
    setText('t-hero-movie-title', t.heroMovieTitle);
    setText('t-hero-movie-sub', t.heroMovieSub);
    setText('t-hero-movie-btn', t.heroMovieBtn);
    setText('t-hero-chores-title', t.heroChoresTitle);
    setText('t-hero-chores-sub', t.heroChoresSub);
    setText('t-hero-chores-btn', t.heroChoresBtn);
    setText('t-all-categories-toggle', t.allCategoriesToggle);

    setText('t-macro-food-title', t.macroFoodTitle);
    setText('t-macro-food-sub', t.macroFoodSub);
    setText('t-macro-movie-title', t.macroMovieTitle);
    setText('t-macro-movie-sub', t.macroMovieSub);
    setText('t-macro-chores-title', t.macroChoresTitle);
    setText('t-macro-chores-sub', t.macroChoresSub);

    setText('t-section-quickstart', t.sectionQuickstart);
    setText('t-section-custom-link', t.sectionCustomLink);

    setText('t-meta-food-1', t.metaFood1);
    setText('t-meta-food-2', t.metaFood2);
    setText('t-meta-food-3', t.metaFood3);
    setText('t-meta-movie-1', t.metaMovie1);
    setText('t-meta-movie-2', t.metaMovie2);
    setText('t-meta-movie-3', t.metaMovie3);
    setText('t-meta-chores-1', t.metaChores1);
    setText('t-meta-chores-2', t.metaChores2);
    setText('t-meta-chores-3', t.metaChores3);
    setText('t-round-timer-label', t.roundTimerLabel);
    setText('t-blacklist-card-btn', t.blacklistCardBtn);
    setText('t-profile-blacklist-title', t.profileBlacklistTitle);
    setText('t-profile-blacklist-reset', t.profileBlacklistReset);
    setText('t-stage2-shuffle-btn', t.stage2ShuffleBtn);
    setText('t-pill-vegan', t.pillVegan);
    setText('t-pill-series', t.pillSeries);
    setText('t-pill-datenight', t.pillDatenight);
    setText('t-pill-weekend', t.pillWeekend);
    setText('t-pill-quickcook', t.pillQuickcook);
    setText('t-mode-solo', t.modeSolo);
    setText('t-mode-duo', t.modeDuo);
    setText('t-mode-group', t.modeGroup);
    setText('t-group-size-label', t.groupSizeLabel);
    updatePlayerModeUI();
    renderProfileBlacklistUI();
    updateHeroRoundCardUI();

    // Onboarding Profile Modal
    setText('profile-modal-title', t.onboardingTitle);
    setText('profile-modal-badge', t.onboardingBadge);
    setText('profile-modal-sub', t.onboardingSub);
    setText('profile-alias-label', t.onboardingAliasLabel);
    setText('profile-reroll-btn-text', t.onboardingRerollBtn);
    setText('profile-custom-label', t.onboardingCustomLabel);
    setText('profile-submit-btn-text', t.onboardingSubmitBtn);
    const profileNameInput = document.getElementById('profile-name-input');
    if (profileNameInput && t.onboardingPlaceholder) {
        profileNameInput.placeholder = t.onboardingPlaceholder;
    }

    // Custom Deck Creator Texts
    setText('t-custom-btn-title', t.customDeckBtnTitle);
    setText('t-custom-btn-sub', t.customDeckBtnSub);
    setText('t-custom-modal-title', t.customModalTitle);
    setText('t-custom-modal-sub', t.customModalSub);
    setText('t-custom-mode-label', t.customModeLabel);
    setText('t-custom-mode-match', t.customModeMatch);
    setText('t-custom-mode-chores', t.customModeChores);
    setText('t-custom-options-label', t.customOptionsLabel);
    setText('btn-add-custom-option', t.customAddOption);
    setText('t-custom-start-btn', t.customStartBtn);
    setText('t-custom-cancel-btn', t.customCancelBtn);

    const customTitleInput = document.getElementById('custom-deck-title');
    if (customTitleInput) {
        customTitleInput.placeholder = t.customTitlePlaceholder;
    }

    // Chores / Anti-Match Screen Texts
    setText('t-chores-badge', t.choresResultBadge);
    setText('t-chores-title', t.choresResultTitle);
    setText('t-chores-sub', t.choresResultSub);
    setText('t-chores-voluntary-title', t.choresVoluntaryTitle);
    setText('t-chores-antimatch-title', t.choresAntiMatchTitle);
    setText('btn-chores-roulette', t.choresRouletteBtn);
    setText('t-chores-share-wa', t.choresShareWaBtn);
    setText('t-chores-back-btn', t.retryBtn);

    // PWA Install Texts
    setText('t-pwa-banner-title', t.pwaBannerTitle);
    setText('t-pwa-banner-sub', t.pwaBannerSub);
    setText('t-pwa-banner-btn', t.pwaBannerBtn);
    setText('t-footer-pwa', t.pwaFooterBtn);
    setText('pwa-modal-title', t.pwaModalTitle);
    setText('pwa-modal-sub', t.pwaModalSub);
    setHtml('pwa-ios-step1', t.pwaIosStep1);
    setHtml('pwa-ios-step2', t.pwaIosStep2);
    setHtml('pwa-ios-step3', t.pwaIosStep3);
    setText('pwa-android-btn-text', t.pwaAndroidBtn);
    setHtml('pwa-android-step1', t.pwaAndroidStep1);
    setHtml('pwa-android-step2', t.pwaAndroidStep2);
    setText('pwa-desktop-btn-text', t.pwaDesktopBtn);
    setHtml('pwa-desktop-step1', t.pwaDesktopStep1);
    setText('pwa-modal-close-btn', t.pwaCloseBtn);

    renderCategoryFilter();
    renderDeckList();
    if (typeof renderLogoShowcase === 'function') {
        renderLogoShowcase();
    }

    if (!document.getElementById('screen-game').classList.contains('hidden') && currentDeckId) {
        renderCurrentCard();
    }
    if (!document.getElementById('screen-chores-result').classList.contains('hidden') && currentDeckId) {
        renderChoresSummaryUI();
    }
    if (!document.getElementById('screen-match').classList.contains('hidden') && matchedCard) {
        updateWinnerAffiliateLinks(matchedCard);
    }
    const soloDuelEl = document.getElementById('screen-solo-duel');
    if (soloDuelEl && !soloDuelEl.classList.contains('hidden')) {
        renderSoloDuelUI();
    }
}

function toggleLangMenu(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('lang-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function selectLang(lang) {
    setLang(lang);
    const menu = document.getElementById('lang-menu');
    if (menu) {
        menu.classList.add('hidden');
    }
}

document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('lang-dropdown-wrapper');
    const menu = document.getElementById('lang-menu');
    if (menu && !menu.classList.contains('hidden') && wrapper && !wrapper.contains(e.target)) {
        menu.classList.add('hidden');
    }
});

/**************************************************************
 * 4. KATEGORIEN-FILTER, LINE ICONS & DECK-LISTE (Unslop Standard)
 **************************************************************/
function getCategoryLineIcon(category) {
    switch (category) {
        case 'food':
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`;
        case 'entertainment':
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>`;
        case 'activity':
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
        case 'chores':
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`;
        case 'trips':
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>`;
        default:
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`;
    }
}

function renderCategoryFilter() {
    const container = document.getElementById('category-filter');
    if (!container) return;
    container.innerHTML = '';

    CATEGORIES.forEach(cat => {
        const isSelected = (selectedCategory === cat.id);
        const btn = document.createElement('button');
        btn.onclick = () => selectCategory(cat.id);
        btn.className = `px-3 py-1.5 rounded-[8px] text-[12px] transition-colors whitespace-nowrap ${
            isSelected
                ? 'btn-primary font-medium'
                : 'surface-raised text-secondary-role hover:text-primary-role font-normal'
        }`;
        btn.innerText = cat.label[currentLang] || cat.label.de;
        container.appendChild(btn);
    });
}

function selectCategory(catId) {
    selectedCategory = catId;
    renderCategoryFilter();
    renderDeckList();
}

function renderDeckList() {
    const container = document.getElementById('deck-list');
    if (!container) return;
    container.innerHTML = '';

    // Eindeutige Decks nach deck.id filtern (verhindert Duplikate durch Aliase wie streaming/chores)
    const allDecks = Array.from(new Map(Object.values(DECKS).map(d => [d.id, d])).values());

    const filteredDecks = allDecks.filter(deck => {
        if (deck.id === 'custom' && currentDeckId !== 'custom') return false;
        if (partnerLikes !== null && currentDeckId === deck.id) return true;
        if (selectedCategory === 'all') return true;
        return deck.category === selectedCategory;
    });

    filteredDecks.sort((a, b) => {
        if (partnerLikes !== null) {
            if (a.id === currentDeckId) return -1;
            if (b.id === currentDeckId) return 1;
        }
        return 0;
    });

    filteredDecks.forEach(deck => {
        const isPartnerDeck = (partnerLikes !== null && currentDeckId === deck.id);
        const dimOtherDecks = (partnerLikes !== null && currentDeckId !== deck.id);
        const totalPool = deck.cards.length;
        const sampleCount = Math.min(CARDS_PER_ROUND, totalPool);
        const poolText = totalPool > sampleCount ? `${sampleCount} / ${totalPool}` : `${totalPool}`;

        const row = document.createElement('button');
        row.onclick = () => startGame(deck.id);
        row.className = `w-full p-3.5 rounded-[10px] row-card text-left flex items-center justify-between gap-3 ${
            isPartnerDeck ? 'border-[#E05A3A]' : ''
        } ${dimOtherDecks ? 'opacity-40' : ''}`;

        row.innerHTML = `
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-5 h-5 flex items-center justify-center text-secondary-role shrink-0">
                    ${getCategoryLineIcon(deck.category)}
                </div>
                <div class="min-w-0">
                    <div class="font-medium text-[14px] text-primary-role truncate">
                        ${deck.title[currentLang] || deck.title.de}
                    </div>
                    <div class="text-[12px] text-secondary-role truncate mt-0.5">
                        ${deck.sub[currentLang] || deck.sub.de}
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2 text-muted-role shrink-0">
                <span class="text-[11px] font-mono tabular-nums">${isPartnerDeck ? (I18N[currentLang]?.partnerDeckActive || 'Aktiv') : poolText}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
        `;
        container.appendChild(row);
    });
}

/**************************************************************
 * 4B. CUSTOM QUICK-DECK CREATOR (100% URL-ENCODED)
 **************************************************************/
function openCustomDeckModal() {
    customDeckMode = 'match';
    customOptionCount = 3;
    const titleInput = document.getElementById('custom-deck-title');
    if (titleInput) titleInput.value = '';

    setCustomDeckMode('match');
    renderCustomOptionInputs(['', '', '']);
    showScreen('screen-custom');
}

function setCustomDeckMode(mode) {
    customDeckMode = (mode === 'chores') ? 'chores' : 'match';
    const matchBtn = document.getElementById('custom-mode-match-btn');
    const choresBtn = document.getElementById('custom-mode-chores-btn');
    const matchCheck = document.getElementById('custom-mode-match-check');
    const choresCheck = document.getElementById('custom-mode-chores-check');

    if (customDeckMode === 'match') {
        matchBtn.className = "w-full p-3 rounded-[10px] text-left text-[13px] font-medium border transition-colors flex items-center justify-between surface-raised border-[var(--border-strong)] text-primary-role";
        choresBtn.className = "w-full p-3 rounded-[10px] text-left text-[13px] font-normal border transition-colors flex items-center justify-between surface border-[var(--border)] text-secondary-role";
        if (matchCheck) matchCheck.innerText = "●";
        if (choresCheck) choresCheck.innerText = "○";
    } else {
        choresBtn.className = "w-full p-3 rounded-[10px] text-left text-[13px] font-medium border transition-colors flex items-center justify-between surface-raised border-[var(--border-strong)] text-primary-role";
        matchBtn.className = "w-full p-3 rounded-[10px] text-left text-[13px] font-normal border transition-colors flex items-center justify-between surface border-[var(--border)] text-secondary-role";
        if (choresCheck) choresCheck.innerText = "●";
        if (matchCheck) matchCheck.innerText = "○";
    }
}

function renderCustomOptionInputs(existingValues) {
    const container = document.getElementById('custom-options-container');
    if (!container) return;
    container.innerHTML = '';
    const t = I18N[currentLang];

    existingValues.forEach((val, idx) => {
        const row = document.createElement('div');
        row.className = "flex items-center gap-2.5";
        row.innerHTML = `
            <span class="w-5 text-right text-[12px] font-mono tabular-nums text-muted-role">${String(idx + 1).padStart(2, '0')}</span>
            <input type="text" maxlength="50" value="${val.replace(/"/g, '&quot;')}" placeholder="${t.customOptionPlaceholder} ${idx + 1}" class="custom-opt-input flex-1 surface rounded-[8px] px-3 py-2 text-[13px] font-normal focus:outline-none focus:border-[var(--text-secondary)] text-primary-role placeholder:text-muted-role">
        `;
        container.appendChild(row);
    });

    const addBtn = document.getElementById('btn-add-custom-option');
    if (addBtn) {
        if (existingValues.length >= 6) {
            addBtn.classList.add('hidden');
        } else {
            addBtn.classList.remove('hidden');
        }
    }
}

function addCustomOptionInput() {
    const inputs = Array.from(document.querySelectorAll('.custom-opt-input')).map(el => el.value);
    if (inputs.length >= 6) return;
    inputs.push('');
    renderCustomOptionInputs(inputs);
}

function findStage2MediaPickByFormattedTitle(formatted) {
    if (typeof MEDIA_STAGE2_PICKS === 'undefined') return null;
    for (const type of ['movie', 'series', 'gaming', 'vacation', 'gifts']) {
        const genres = MEDIA_STAGE2_PICKS[type] || {};
        for (const gKey of Object.keys(genres)) {
            const found = (genres[gKey] || []).find(item => `${item.title} (${item.year})` === formatted);
            if (found) return { ...found, stage2Type: type };
        }
    }
    return null;
}

function registerCustomDeckInMemory(rawTitle, mode, optionsArray) {
    const cleanTitle = (rawTitle && rawTitle.trim()) ? rawTitle.trim() : "Eigene Abstimmung";
    let matchedStage2Type = null;
    const cards = optionsArray.map((optText, idx) => {
        const mediaItem = findStage2MediaPickByFormattedTitle(optText);
        if (mediaItem && !matchedStage2Type) matchedStage2Type = mediaItem.stage2Type;
        const descStr = mediaItem ? mediaItem.vibe : (mode === 'chores' ? "Aufgabe zuteilen" : "Option zur Abstimmung");
        const tagStr = mediaItem ? `${mediaItem.year} · ${cleanTitle}` : cleanTitle;
        return {
            id: idx,
            emoji: mediaItem ? (mediaItem.emoji || "🎬") : "✨",
            bg: "",
            targetType: mediaItem ? (mediaItem.targetType || (mediaItem.stage2Type === 'gaming' ? 'amazon' : 'prime')) : null,
            searchCleanTitle: mediaItem ? mediaItem.title : optText,
            tag: { de: tagStr, en: tagStr, es: tagStr, fr: tagStr, it: tagStr },
            title: { de: optText, en: optText, es: optText, fr: optText, it: optText },
            desc: {
                de: descStr,
                en: mediaItem ? mediaItem.vibe : (mode === 'chores' ? "Assign task" : "Option for this round"),
                es: mediaItem ? mediaItem.vibe : (mode === 'chores' ? "Asignar tarea" : "Opción de la ronda"),
                fr: mediaItem ? mediaItem.vibe : (mode === 'chores' ? "Attribuer la tâche" : "Option de la manche"),
                it: mediaItem ? mediaItem.vibe : (mode === 'chores' ? "Assegna compito" : "Opzione della manche")
            },
            actionLabel: {
                de: "Auf Google suchen",
                en: "Search on Google",
                es: "Buscar en Google",
                fr: "Rechercher sur Google",
                it: "Cerca su Google"
            },
            actionUrl: `https://www.google.com/search?q=${encodeURIComponent(optText)}`
        };
    });

    let deckCategory = 'all';
    if (matchedStage2Type === 'movie' || matchedStage2Type === 'series' || matchedStage2Type === 'gaming') {
        deckCategory = 'entertainment';
    } else if (matchedStage2Type === 'vacation' || matchedStage2Type === 'gifts') {
        deckCategory = 'trips';
    }

    DECKS['custom'] = {
        id: 'custom',
        category: deckCategory,
        mode: mode === 'chores' ? 'chores' : 'match',
        customMeta: {
            t: cleanTitle,
            m: mode === 'chores' ? 'chores' : 'match',
            o: optionsArray
        },
        icon: "",
        gradient: "",
        title: { de: cleanTitle, en: cleanTitle, es: cleanTitle },
        sub: {
            de: `${optionsArray.length} eigene Optionen`,
            en: `${optionsArray.length} custom options`,
            es: `${optionsArray.length} opciones propias`
        },
        cards: cards
    };
}

function startCustomDeck() {
    // Carmack Sanity Check: Truncate to avoid exploding WhatsApp 2048-char URL boundary
    const rawTitle = (document.getElementById('custom-deck-title').value || '').trim().slice(0, 60);
    const rawOptions = Array.from(document.querySelectorAll('.custom-opt-input'))
        .map(el => el.value.trim().slice(0, 60))
        .filter(Boolean)
        .slice(0, 8);

    if (rawOptions.length < 2) {
        const firstEmpty = document.querySelector('.custom-opt-input');
        if (firstEmpty) firstEmpty.focus();
        return;
    }

    partnerLikes = null;
    partnerRoundCardIds = null;
    window.history.replaceState(null, null, window.location.pathname);
    registerCustomDeckInMemory(rawTitle, customDeckMode, rawOptions);
    startGame('custom');
}

/**************************************************************
 * 5. GAME CONTROLLER, DYNAMIC SHUFFLE SAMPLER & TIMER
 **************************************************************/
function buildActiveRoundCards(deck) {
    if (!deck || !Array.isArray(deck.cards)) return [];

    if (partnerLikes !== null && Array.isArray(partnerRoundCardIds) && partnerRoundCardIds.length > 0) {
        const subset = partnerRoundCardIds
            .map(id => deck.cards.find(c => c.id === id))
            .filter(Boolean);
        if (subset.length > 0) {
            return shuffleArray(subset);
        }
    }

    let availableCards = deck.cards.filter(c => !isCardBlacklisted(deck.id, c.id));
    if (availableCards.length < 2) {
        availableCards = deck.cards;
    }

    const shuffledPool = shuffleArray(availableCards);
    if (deck.id === 'custom') {
        return shuffledPool;
    }
    return shuffledPool.slice(0, Math.min(CARDS_PER_ROUND, shuffledPool.length));
}

function blacklistCurrentCard() {
    const deck = DECKS[currentDeckId];
    if (!deck || !activeRoundCards.length) return;
    const card = activeRoundCards[currentCardIndex];
    if (!card) return;

    const canon = getCanonicalDeckId(currentDeckId);
    const key = `${canon}:${card.id}`;
    const label = card.title[currentLang] || card.title.de || 'Karte';
    const currentList = getBlacklistedCards();
    if (!currentList.some(item => item.key === key)) {
        currentList.push({ key, deckId: canon, cardId: card.id, label });
        saveBlacklistedCards(currentList);
    }

    const t = I18N[currentLang] || I18N.de;
    const btnSpan = document.getElementById('t-blacklist-card-btn');
    if (btnSpan) {
        btnSpan.innerText = `✓ ${t.blacklistAddedToast || 'Dauerhaft ausgeblendet'}`;
        setTimeout(() => {
            if (btnSpan) btnSpan.innerText = (I18N[currentLang] || I18N.de).blacklistCardBtn;
        }, 900);
    }

    // Try to swap in an unused non-blacklisted card from the deck if Player 1
    if (partnerLikes === null && deck.id !== 'custom') {
        const activeIds = new Set(activeRoundCards.map(c => c.id));
        const replacement = deck.cards.find(c => !activeIds.has(c.id) && !isCardBlacklisted(currentDeckId, c.id));
        if (replacement) {
            activeRoundCards[currentCardIndex] = replacement;
            renderCurrentCard();
            return;
        }
    }

    // Otherwise treat as "Nope" and advance
    handleSwipe(false);
}

function startGame(deckId) {
    if (partnerLikes !== null && deckId !== currentDeckId) {
        partnerLikes = null;
        partnerRoundCardIds = null;
        partnerSenderName = null;
        completedPlayers = [];
        window.history.replaceState(null, null, window.location.pathname);
    }
    if (partnerLikes === null) {
        completedPlayers = [];
    }
    currentDeckId = deckId;
    const deck = DECKS[currentDeckId];
    if (!deck) return;

    activeRoundCards = buildActiveRoundCards(deck);
    currentCardIndex = 0;
    myLikes = [];
    matchedCard = null;
    soloLikedCards = [];
    soloCurrentWinnerIdx = 0;
    lastMatchMeta = null;

    showScreen('screen-game');

    const p2LiveEl = document.getElementById('p2-live-indicator');
    const p2TextEl = document.getElementById('p2-live-text');
    if (p2LiveEl && p2TextEl) {
        if (partnerLikes !== null && completedPlayers.length > 0) {
            const t = I18N[currentLang] || I18N.de;
            if (targetPlayerCount >= 3) {
                const curNum = Math.min(targetPlayerCount, completedPlayers.length + 1);
                const namesStr = completedPlayers.map(p => p.name).join(', ');
                p2TextEl.innerText = (t.groupLiveBanner || "Person {cur} von {total} · Bisher: {names}")
                    .replace('{cur}', curNum)
                    .replace('{total}', targetPlayerCount)
                    .replace('{names}', namesStr);
            } else {
                const sender = partnerSenderName || t.choresPlayer1 || "Person 1";
                p2TextEl.innerText = (t.p2LiveBanner || "{name} hat bereits gewählt").replace('{name}', sender);
            }
            p2LiveEl.classList.remove('hidden');
        } else {
            p2LiveEl.classList.add('hidden');
        }
    }

    renderCurrentCard();
    startTimer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startFreshShuffleRound() {
    if (!currentDeckId || !DECKS[currentDeckId]) {
        resetToHome();
        return;
    }
    partnerLikes = null;
    partnerRoundCardIds = null;
    completedPlayers = [];
    window.history.replaceState(null, null, window.location.pathname);
    const banner = document.getElementById('p2-welcome-banner');
    if (banner) banner.classList.add('hidden');
    startGame(currentDeckId);
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    updateTimerUI();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishSwipingRound();
        }
    }, 1000);
}

function updateTimerUI() {
    const display = document.getElementById('timer-display');
    const bar = document.getElementById('timer-bar');
    if (display) display.innerText = String(timeLeft).padStart(2, '0');
    if (bar) {
        const pct = Math.max(0, (timeLeft / 30) * 100);
        bar.style.width = pct + '%';
    }
}

function renderCurrentCard() {
    const deck = DECKS[currentDeckId];
    if (!deck || !activeRoundCards.length) return;
    const card = activeRoundCards[currentCardIndex];
    if (!card) return;
    const t = I18N[currentLang];
    const isChoresMode = (deck.mode === 'chores');

    const numCurrent = String(currentCardIndex + 1).padStart(2, '0');
    const numTotal = String(activeRoundCards.length).padStart(2, '0');

    const progressEl = document.getElementById('game-progress-text');
    if (progressEl) {
        progressEl.innerText = `${numCurrent} / ${numTotal}`;
    }

    const indexMonoEl = document.getElementById('card-index-mono');
    if (indexMonoEl) {
        indexMonoEl.innerText = numCurrent;
    }

    // Update Signature Convergence Dots
    const dotLeft = document.getElementById('sig-dot-left');
    const dotRight = document.getElementById('sig-dot-right');
    if (dotLeft && dotRight) {
        const ratio = currentCardIndex / Math.max(1, activeRoundCards.length);
        const offsetPct = Math.round(ratio * 46);
        dotLeft.style.left = `${offsetPct}%`;
        dotRight.style.right = `${offsetPct}%`;
    }

    const modePill = document.getElementById('game-mode-pill');
    if (modePill) {
        modePill.innerText = isChoresMode ? t.modeChoreBadge : (deck.title[currentLang] || deck.title.de);
        modePill.className = "font-sans text-[11.5px] font-bold text-primary-role";
    }

    const nopeHintEl = document.getElementById('t-nope-hint');
    const likeHintEl = document.getElementById('t-like-hint');
    if (nopeHintEl && likeHintEl) {
        nopeHintEl.innerText = `← ${isChoresMode ? t.choreNopeHint : t.nopeHint}`;
        likeHintEl.innerText = `${isChoresMode ? t.choreLikeHint : t.likeHint} →`;
    }

    const btnNoSpan = document.getElementById('t-btn-swipe-no');
    const btnYesSpan = document.getElementById('t-btn-swipe-yes');
    if (btnNoSpan) btnNoSpan.innerText = isChoresMode ? t.swipeChoreBtnNo : t.swipeBtnNo;
    if (btnYesSpan) btnYesSpan.innerText = isChoresMode ? t.swipeChoreBtnYes : t.swipeBtnYes;
    const btnNoEl = document.getElementById('btn-swipe-no');
    const btnYesEl = document.getElementById('btn-swipe-yes');
    if (btnNoEl) btnNoEl.setAttribute('aria-label', isChoresMode ? t.swipeChoreBtnNo : t.swipeBtnNo);
    if (btnYesEl) btnYesEl.setAttribute('aria-label', isChoresMode ? t.swipeChoreBtnYes : t.swipeBtnYes);

    const cardEl = document.getElementById('active-card');
    if (cardEl) {
        cardEl.style.transform = '';
        cardEl.style.transition = '';
        cardEl.style.opacity = '1';
        cardEl.className = "w-full rounded-[28px] surface relative z-10 overflow-hidden card-enter flex flex-col text-left";
    }

    const stackNextEl = document.getElementById('stack-next-card');
    if (stackNextEl) {
        if (currentCardIndex + 1 < activeRoundCards.length) {
            stackNextEl.style.opacity = '0.5';
            stackNextEl.style.transform = 'translateY(8px) scale(0.96)';
        } else {
            stackNextEl.style.opacity = '0';
            stackNextEl.style.transform = 'translateY(0) scale(0.92)';
        }
    }

    document.getElementById('card-tag').innerText = card.tag[currentLang] || card.tag.de;

    // Microsoft Fluent 3D Image Rendering (Centered with Ambient Glow)
    const imgEl = document.getElementById('card-image');
    const emojiEl = document.getElementById('card-emoji');
    const fluentFileName = (typeof FLUENT_EMOJI_MAP !== 'undefined' && card.emoji) ? FLUENT_EMOJI_MAP[card.emoji] : null;

    if (fluentFileName && imgEl) {
        imgEl.src = `options_gallery/images/${fluentFileName}`;
        imgEl.alt = card.title[currentLang] || card.title.de || '';
        imgEl.classList.remove('hidden');
        if (emojiEl) emojiEl.classList.add('hidden');
    } else {
        if (imgEl) imgEl.classList.add('hidden');
        if (emojiEl) {
            emojiEl.innerText = card.emoji || '✨';
            emojiEl.classList.remove('hidden');
        }
    }

    document.getElementById('card-title').innerText = card.title[currentLang] || card.title.de;
    document.getElementById('card-desc').innerText = card.desc[currentLang] || card.desc.de;
    updateHeroRoundCardUI();
}

/**************************************************************
 * 6. SWIPE ACTIONS, SUDDEN-DEATH MATCH & ANTI-MATCH ENGINE
 **************************************************************/
function handleSwipe(isLike) {
    playSwipeClick(isLike);
    const deck = DECKS[currentDeckId];
    if (!deck || !activeRoundCards.length) return;
    const card = activeRoundCards[currentCardIndex];
    if (!card) return;
    const cardEl = document.getElementById('active-card');

    if (cardEl) {
        cardEl.classList.remove('card-enter');
        cardEl.classList.add(isLike ? 'swipe-right' : 'swipe-left');
    }

    if (isLike) {
        myLikes.push(card.id);

        // SUDDEN DEATH CHECK (Im klassischen 2-Personen-Match-Modus!)
        if (deck.mode !== 'chores' && targetPlayerCount === 2 && partnerLikes !== null && partnerLikes.includes(card.id)) {
            clearInterval(timerInterval);
            lastMatchMeta = { mode: 'duo' };
            setTimeout(() => {
                triggerMatchScreen(card);
            }, 220);
            return;
        }
    }

    setTimeout(() => {
        currentCardIndex++;
        if (currentCardIndex < activeRoundCards.length) {
            renderCurrentCard();
        } else {
            clearInterval(timerInterval);
            finishSwipingRound();
        }
    }, 220);
}

function finishSwipingRound() {
    const deck = DECKS[currentDeckId];
    if (!deck) return;
    const t = I18N[currentLang] || I18N.de;
    const myName = getUserProfile().name;

    // FALL 0: SOLO-MODUS (1 Person entscheidet für sich alleine)
    if (targetPlayerCount === 1 && completedPlayers.length === 0) {
        if (myLikes.length === 0) {
            if (deck.mode === 'chores') {
                completedPlayers = [{ name: myName, likes: [] }];
                triggerChoresResultScreen();
                return;
            }
            const inputEl = document.getElementById('p1-custom-idea-input');
            if (inputEl) inputEl.value = '';
            showScreen('screen-p1-zero');
            return;
        }
        soloLikedCards = shuffleArray(activeRoundCards.filter(c => myLikes.includes(c.id)));
        if (soloLikedCards.length === 0) {
            soloLikedCards = [activeRoundCards[0] || deck.cards[0]];
        }
        soloCurrentWinnerIdx = 0;
        lastMatchMeta = { mode: 'solo', totalLiked: soloLikedCards.length };

        // Wenn nur 1 Karte geliked wurde -> Direkt Gewinner!
        if (soloLikedCards.length === 1) {
            triggerMatchScreen(soloLikedCards[0]);
            return;
        }

        // Wenn 2 oder mehr Karten geliked wurden -> 1-gegen-1 K.O.-Stechen starten!
        startSoloDuel(soloLikedCards);
        return;
    }

    // Wenn der allererste Spieler im Match-Modus 0-mal JA gewischt hat -> Zwischenscreen für neue Karten oder eigene Idee
    if (completedPlayers.length === 0 && deck.mode !== 'chores' && myLikes.length === 0) {
        const inputEl = document.getElementById('p1-custom-idea-input');
        if (inputEl) inputEl.value = '';
        showScreen('screen-p1-zero');
        return;
    }

    // Aktuellen Spieler zur Abstimmungskette hinzufügen
    const allVoters = [...completedPlayers, { name: myName, likes: [...myLikes] }];

    // FALL A: Noch nicht alle Spieler durch (z. B. Spieler 1 von 2, oder Spieler 1/2 von 3..6) -> Link für nächsten Spieler generieren
    if (allVoters.length < targetPlayerCount) {
        const baseUrl = window.location.origin + window.location.pathname;
        let shareUrl = '';
        const roundIds = activeRoundCards.map(c => c.id);

        if (currentDeckId === 'custom' && deck.customMeta) {
            const payload = {
                t: deck.customMeta.t,
                m: deck.customMeta.m,
                o: deck.customMeta.o,
                l: allVoters[0].likes,
                tc: targetPlayerCount,
                voters: allVoters.map(v => ({ n: v.name, l: v.likes }))
            };
            shareUrl = `${baseUrl}#c=${encodeBase64Utf8(JSON.stringify(payload))}&from=${encodeURIComponent(myName)}`;
        } else {
            const likesPipe = allVoters.map(v => v.likes.join(',')).join('|');
            const namesPipe = allVoters.map(v => encodeURIComponent(v.name)).join('|');
            const customCard999 = activeRoundCards.find(c => c.id === 999);
            const ideaEnc = customCard999 ? encodeURIComponent(customCard999.title.de || '') : '';
            const encodedPayload = btoa(`${currentDeckId}:${likesPipe}:${roundIds.join(',')}:${ideaEnc}:${targetPlayerCount}:${namesPipe}`);
            shareUrl = `${baseUrl}#m=${encodedPayload}&from=${encodeURIComponent(myName)}`;
        }

        document.getElementById('share-url-input').value = shareUrl;
        const copyBtnSpan = document.getElementById('t-copy-btn');
        if (copyBtnSpan) copyBtnSpan.innerText = t.copyBtn;

        const shareTitleEl = document.getElementById('t-share-title');
        const shareSubEl = document.getElementById('t-share-sub');
        const passPhoneEl = document.getElementById('t-pass-phone');

        if (targetPlayerCount >= 3) {
            const cur = allVoters.length;
            const next = cur + 1;
            if (shareTitleEl) {
                shareTitleEl.innerText = (t.groupShareTitle || "Auswahl {cur} von {total} steht")
                    .replace('{cur}', cur)
                    .replace('{total}', targetPlayerCount);
            }
            if (shareSubEl) {
                shareSubEl.innerText = (t.groupShareSub || "Teile diesen Link mit Person {next}.")
                    .replace('{next}', next)
                    .replace(/\{total\}/g, targetPlayerCount);
            }
            if (passPhoneEl) {
                passPhoneEl.innerText = (t.groupPassPhone || "Gerät direkt an Person {next} weitergeben")
                    .replace('{next}', next);
            }
        } else {
            if (shareTitleEl) shareTitleEl.innerText = t.shareTitle;
            if (shareSubEl) shareSubEl.innerText = t.shareSub;
            if (passPhoneEl) passPhoneEl.innerText = t.passPhone;
        }

        showScreen('screen-share');
        return;
    }

    // FALL B: Letzter Spieler ist fertig im Chores / Anti-Match Modus -> Auswertungs- & Roulette-Screen zeigen
    completedPlayers = allVoters;
    if (deck.mode === 'chores') {
        triggerChoresResultScreen();
        return;
    }

    // FALL C: Letzter Spieler in einer Gruppe (3–6 Personen) ist fertig -> Gruppen-Stimmen auswerten!
    if (targetPlayerCount >= 3) {
        let bestCard = null;
        let maxVotes = 0;

        activeRoundCards.forEach(card => {
            const votes = allVoters.reduce((acc, voter) => acc + (voter.likes.includes(card.id) ? 1 : 0), 0);
            if (votes > maxVotes) {
                maxVotes = votes;
                bestCard = card;
            }
        });

        if (bestCard && maxVotes >= 2) {
            lastMatchMeta = {
                mode: 'group',
                votes: maxVotes,
                total: allVoters.length,
                names: allVoters.map(v => v.name)
            };
            triggerMatchScreen(bestCard);
            return;
        }
    }

    // FALL D: Kein gemeinsamer Treffer (0 Überschneidungen)
    const p2InputEl = document.getElementById('p2-counter-idea-input');
    if (p2InputEl) p2InputEl.value = '';
    showScreen('screen-nomatch');
}

// Fall A: Spieler 1 platziert eine eigene Idee direkt in diese Runde
function startSoloDuel(cardsQueue) {
    soloDuelQueue = [...cardsQueue];
    soloDuelChamp = soloDuelQueue[0];
    soloDuelNextIdx = 1;
    showScreen('screen-solo-duel');
    renderSoloDuelUI();
}

function renderSoloDuelCardSlot(slotSuffix, card) {
    if (!card) return;
    const imgEl = document.getElementById(`duel-img-${slotSuffix}`);
    const emojiEl = document.getElementById(`duel-emoji-${slotSuffix}`);
    const tagEl = document.getElementById(`duel-tag-${slotSuffix}`);
    const titleEl = document.getElementById(`duel-title-${slotSuffix}`);
    const descEl = document.getElementById(`duel-desc-${slotSuffix}`);

    const fluentFile = (typeof FLUENT_EMOJI_MAP !== 'undefined' && card.emoji) ? FLUENT_EMOJI_MAP[card.emoji] : null;
    if (fluentFile && imgEl) {
        imgEl.src = `options_gallery/images/${fluentFile}`;
        imgEl.alt = card.title[currentLang] || card.title.de || '';
        imgEl.classList.remove('hidden');
        if (emojiEl) emojiEl.classList.add('hidden');
    } else {
        if (imgEl) imgEl.classList.add('hidden');
        if (emojiEl) {
            emojiEl.innerText = card.emoji || '✨';
            emojiEl.classList.remove('hidden');
        }
    }

    if (tagEl) tagEl.innerText = (card.tag && (card.tag[currentLang] || card.tag.de)) || '';
    if (titleEl) titleEl.innerText = (card.title && (card.title[currentLang] || card.title.de)) || '';
    if (descEl) descEl.innerText = (card.desc && (card.desc[currentLang] || card.desc.de)) || '';
}

function renderSoloDuelUI() {
    const challenger = soloDuelQueue[soloDuelNextIdx];
    if (!soloDuelChamp || !challenger) return;

    const t = I18N[currentLang] || I18N.de;
    const deck = DECKS[currentDeckId];
    const isChores = deck && deck.mode === 'chores';
    const totalDuels = Math.max(1, soloDuelQueue.length - 1);
    const curDuel = Math.min(totalDuels, soloDuelNextIdx);

    const badgeEl = document.getElementById('t-duel-badge');
    const titleEl = document.getElementById('t-duel-title');
    const subEl = document.getElementById('t-duel-sub');
    const coinBtnEl = document.getElementById('t-duel-coin-btn');
    const backBtnEl = document.getElementById('t-duel-back-btn');

    if (badgeEl) {
        badgeEl.innerText = (t.soloDuelBadge || 'K.O.-Stechen · Duell {cur} von {total}')
            .replace('{cur}', curDuel)
            .replace('{total}', totalDuels);
    }
    if (titleEl) {
        titleEl.innerText = isChores
            ? (t.soloDuelChoresTitle || 'Womit fängst du zuerst an?')
            : (t.soloDuelTitle || 'Bauchgefühl: Eins gegen Eins!');
    }
    if (subEl) {
        subEl.innerText = isChores
            ? (t.soloDuelChoresSub || 'Tippe die Aufgabe an, die du jetzt als Erstes anpackst:')
            : (t.soloDuelSub || 'Du hast mehrere Favoriten gewählt. Tippe spontan an, worauf du jetzt mehr Lust hast:');
    }
    if (coinBtnEl) coinBtnEl.innerText = t.soloDuelCoinBtn || 'Münze werfen (Beides gut)';
    if (backBtnEl) backBtnEl.innerText = t.retryBtn || 'Zurück zur Übersicht';

    renderSoloDuelCardSlot('a', soloDuelChamp);
    renderSoloDuelCardSlot('b', challenger);
}

function pickSoloDuelWinner(choice) {
    playSwipeClick(true);
    const challenger = soloDuelQueue[soloDuelNextIdx];
    if (choice === 'b') {
        soloDuelChamp = challenger;
    } else if (choice === 'coin') {
        if (Math.random() < 0.5 && challenger) {
            soloDuelChamp = challenger;
        }
    }

    soloDuelNextIdx++;
    if (soloDuelNextIdx < soloDuelQueue.length) {
        renderSoloDuelUI();
    } else {
        // Solo Champion steht fest! Sortiere ihn auf Platz 1 von soloLikedCards
        const rest = soloLikedCards.filter(c => c.id !== soloDuelChamp.id);
        soloLikedCards = [soloDuelChamp, ...rest];
        soloCurrentWinnerIdx = 0;
        lastMatchMeta = { mode: 'solo', totalLiked: soloLikedCards.length };
        triggerMatchScreen(soloDuelChamp);
    }
}

function injectPlayer1CustomIdea() {
    const inputEl = document.getElementById('p1-custom-idea-input');
    const ideaText = inputEl ? inputEl.value.trim() : '';
    if (!ideaText) {
        if (inputEl) inputEl.focus();
        return;
    }
    const deck = DECKS[currentDeckId];
    if (!deck) return;

    deck.cards = deck.cards.filter(c => c.id !== 999);
    const customCard = {
        id: 999,
        emoji: '✨',
        tag: { de: 'Vorschlag', en: 'Suggestion', es: 'Sugerencia', fr: 'Suggestion', it: 'Proposta' },
        title: { de: ideaText, en: ideaText, es: ideaText, fr: ideaText, it: ideaText },
        desc: { de: 'Eigene Idee für diese Runde', en: 'Custom idea for this round', es: 'Idea propia para esta ronda', fr: 'Idée personnelle pour cette manche', it: 'Idea personale per questa manche' }
    };
    deck.cards.push(customCard);

    if (activeRoundCards.length >= 8) {
        activeRoundCards[activeRoundCards.length - 1] = customCard;
    } else {
        activeRoundCards.push(customCard);
    }
    myLikes = [999];

    if (targetPlayerCount === 1) {
        soloLikedCards = [customCard];
        soloCurrentWinnerIdx = 0;
        lastMatchMeta = { mode: 'solo', totalLiked: 1 };
        triggerMatchScreen(customCard);
        return;
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const roundIds = activeRoundCards.map(c => c.id);
    const myName = getUserProfile().name;
    const encodedPayload = btoa(`${currentDeckId}:${myLikes.join(',')}:${roundIds.join(',')}:${encodeURIComponent(ideaText)}:${targetPlayerCount}:${encodeURIComponent(myName)}`);
    const shareUrl = `${baseUrl}#m=${encodedPayload}&from=${encodeURIComponent(myName)}`;

    document.getElementById('share-url-input').value = shareUrl;
    showScreen('screen-share');
}

// Fall B: Spieler 2 gibt per WhatsApp Bescheid, dass es 0 Treffer gab
function notifyNoMatchViaWhatsApp() {
    const baseUrl = window.location.origin + window.location.pathname;
    const t = I18N[currentLang];
    const noMatchMsg = t.waNoMatchText || "Wir hatten in dieser Runde leider keine Übereinstimmung 😅 Lass uns 8 frische Karten probieren oder eine neue Runde starten:";
    const text = encodeURIComponent(`${noMatchMsg}\n${baseUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

// Fall B: Spieler 2 schickt direkt eine Gegenidee in einer neuen Runde zurück
function sendCounterIdeaFromNoMatch() {
    const inputEl = document.getElementById('p2-counter-idea-input');
    const ideaText = inputEl ? inputEl.value.trim() : '';
    if (!ideaText) {
        if (inputEl) inputEl.focus();
        return;
    }
    const deck = DECKS[currentDeckId];
    if (!deck) return;

    deck.cards = deck.cards.filter(c => c.id !== 999);
    const customCard = {
        id: 999,
        emoji: '✨',
        tag: { de: 'Gegenidee', en: 'Counter Idea', es: 'Propuesta' },
        title: { de: ideaText, en: ideaText, es: ideaText },
        desc: { de: 'Eigener Vorschlag für unsere Runde', en: 'Suggested for our round', es: 'Sugerencia para nuestra ronda' }
    };
    deck.cards.push(customCard);

    const otherCards = shuffleArray(deck.cards.filter(c => c.id !== 999)).slice(0, 7);
    activeRoundCards = [...otherCards, customCard];
    partnerLikes = null;
    partnerRoundCardIds = null;
    myLikes = [999];

    const baseUrl = window.location.origin + window.location.pathname;
    const roundIds = activeRoundCards.map(c => c.id);
    const myName = getUserProfile().name;
    const encodedPayload = btoa(`${currentDeckId}:${myLikes.join(',')}:${roundIds.join(',')}:${encodeURIComponent(ideaText)}`);
    const shareUrl = `${baseUrl}#m=${encodedPayload}&from=${encodeURIComponent(myName)}`;

    document.getElementById('share-url-input').value = shareUrl;
    const t = I18N[currentLang];
    const counterMsg = t.waCounterIdeaText || "Wir hatten eben leider keine Übereinstimmung 😅 Ich habe eine neue Runde mit einer eigenen Idee gestartet – wisch mal kurz durch:";
    const text = encodeURIComponent(`${counterMsg}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showScreen('screen-share');
}

function triggerMatchScreen(card) {
    matchedCard = card;
    const suspenseEl = document.getElementById('screen-suspense');
    if (suspenseEl) {
        suspenseEl.classList.remove('hidden');
        if (navigator.vibrate) navigator.vibrate([25, 40, 25]);
        setTimeout(() => {
            suspenseEl.classList.add('hidden');
            revealMatchScreen(card);
        }, 1100);
    } else {
        revealMatchScreen(card);
    }
}

function getRegionalStoreConfig(lang) {
    const tag = 'f05b1-21';
    let isUk = false;
    try {
        const nav = (navigator.language || '').toLowerCase();
        const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
        if (nav.includes('gb') || nav.includes('uk') || nav.includes('ie') || tz.includes('london') || tz.includes('dublin')) {
            isUk = true;
        }
    } catch (e) {}

    const configs = {
        de: {
            amazonHost: 'www.amazon.de',
            amazonDomain: 'amazon.de',
            foodDomain: 'lieferando.de',
            foodUrl: (q) => `https://www.lieferando.de/lieferservice/essen/${q}`,
            foodSuffix: 'zutaten+kochbuch',
            snackQuery: 'kino+snack+box+popcorn',
            gygHost: 'www.getyourguide.de',
            gygDomain: 'getyourguide.de',
            bookingDomain: 'booking.com',
            activitySuffix: 'paar+date+spiel',
            bookingLang: 'de',
            tripsSuffix: 'reise+geschenk',
            choresUrl: `https://www.amazon.de/s?k=saugroboter+haushaltshelfer+bestseller&tag=${tag}`
        },
        en: {
            amazonHost: isUk ? 'www.amazon.co.uk' : 'www.amazon.com',
            amazonDomain: isUk ? 'amazon.co.uk' : 'amazon.com',
            foodDomain: 'ubereats.com',
            foodUrl: (q) => `https://www.ubereats.com/${isUk ? 'gb/' : ''}search?q=${q}`,
            foodSuffix: 'ingredients+cookbook',
            snackQuery: 'movie+night+snack+box+popcorn',
            gygHost: 'www.getyourguide.com',
            gygDomain: 'getyourguide.com',
            bookingDomain: 'booking.com',
            activitySuffix: 'couple+date+night+game',
            bookingLang: 'en-gb',
            tripsSuffix: 'travel+accessories+gift',
            choresUrl: `https://${isUk ? 'www.amazon.co.uk' : 'www.amazon.com'}/s?k=robot+vacuum+smart+home+helpers+bestseller&tag=${tag}`
        },
        es: {
            amazonHost: 'www.amazon.es',
            amazonDomain: 'amazon.es',
            foodDomain: 'just-eat.es',
            foodUrl: () => `https://www.just-eat.es/`,
            foodSuffix: 'ingredientes+libro+cocina',
            snackQuery: 'caja+snacks+cine+palomitas',
            gygHost: 'www.getyourguide.es',
            gygDomain: 'getyourguide.es',
            bookingDomain: 'booking.com',
            activitySuffix: 'juego+parejas+cita',
            bookingLang: 'es',
            tripsSuffix: 'accesorios+viaje+regalo',
            choresUrl: `https://www.amazon.es/s?k=robot+aspirador+hogar+inteligente+mas+vendidos&tag=${tag}`
        },
        fr: {
            amazonHost: 'www.amazon.fr',
            amazonDomain: 'amazon.fr',
            foodDomain: 'ubereats.com',
            foodUrl: (q) => `https://www.ubereats.com/fr/search?q=${q}`,
            foodSuffix: 'ingredients+livre+cuisine',
            snackQuery: 'coffret+snacks+cinema+popcorn',
            gygHost: 'www.getyourguide.fr',
            gygDomain: 'getyourguide.fr',
            bookingDomain: 'booking.com',
            activitySuffix: 'jeu+couple+soiree',
            bookingLang: 'fr',
            tripsSuffix: 'accessoires+voyage+cadeau',
            choresUrl: `https://www.amazon.fr/s?k=aspirateur+robot+maison+connectee+meilleures+ventes&tag=${tag}`
        },
        it: {
            amazonHost: 'www.amazon.it',
            amazonDomain: 'amazon.it',
            foodDomain: 'justeat.it',
            foodUrl: () => `https://www.justeat.it/`,
            foodSuffix: 'ingredienti+libro+cucina',
            snackQuery: 'box+snack+cinema+popcorn',
            gygHost: 'www.getyourguide.it',
            gygDomain: 'getyourguide.it',
            bookingDomain: 'booking.com',
            activitySuffix: 'gioco+coppia+serata',
            bookingLang: 'it',
            tripsSuffix: 'accessori+viaggio+regalo',
            choresUrl: `https://www.amazon.it/s?k=robot+aspirapolvere+casa+smart+piu+venduti&tag=${tag}`
        }
    };
    const cfg = configs[lang] || configs.de;
    cfg.tag = tag;
    return cfg;
}

function formatWithDomainTag(labelStr, domainStr) {
    const clean = (labelStr || '').replace(/\s*\(Amazon\)/gi, '');
    return `${clean} (${domainStr}) *`;
}

function updateWinnerAffiliateLinks(card) {
    if (!card) return;
    const deck = DECKS[currentDeckId];
    const titleEl = document.getElementById('winner-title');
    const descEl = document.getElementById('winner-desc');
    if (titleEl) titleEl.innerText = card.title[currentLang] || card.title.de;
    if (descEl) descEl.innerText = card.desc[currentLang] || card.desc.de;

    const actionBtn = document.getElementById('winner-action-btn');
    const actionText = document.getElementById('winner-action-text');
    const secondaryBtn = document.getElementById('winner-secondary-deal-btn');
    const secondaryText = document.getElementById('winner-secondary-deal-text');

    if (actionBtn && actionText) {
        const cat = deck ? deck.category : 'all';
        const titleStr = card.title[currentLang] || card.title.de || 'Idee';
        const cleanQueryStr = card.searchCleanTitle || titleStr;
        const query = encodeURIComponent(cleanQueryStr);
        const store = getRegionalStoreConfig(currentLang);
        const t = I18N[currentLang] || I18N.de;

        // Check if this is a Round 2 card with an explicit targetType ('booking', 'gyg', 'amazon', 'prime')
        if (card.targetType === 'booking') {
            actionBtn.href = `https://www.booking.com/searchresults.${store.bookingLang}.html?ss=${query}`;
            actionText.innerText = `${titleStr} (${store.bookingDomain}) *`;
            if (secondaryBtn && secondaryText) {
                secondaryBtn.href = `https://${store.gygHost}/s/?q=${query}`;
                secondaryText.innerText = formatWithDomainTag(t.winnerActivities || 'Erlebnisse & Touren vor Ort', store.gygDomain);
                secondaryBtn.classList.remove('hidden');
            }
        } else if (card.targetType === 'gyg') {
            actionBtn.href = `https://${store.gygHost}/s/?q=${query}`;
            actionText.innerText = formatWithDomainTag(`${titleStr} – ${t.winnerActivities || 'Tickets & Erlebnisse'}`, store.gygDomain);
            if (secondaryBtn && secondaryText) {
                secondaryBtn.href = `https://${store.amazonHost}/s?k=${query}&tag=${store.tag}`;
                secondaryText.innerText = formatWithDomainTag(t.winnerActivitySecondary || 'Passende Geschenk-Boxen', store.amazonDomain);
                secondaryBtn.classList.remove('hidden');
            }
        } else if (card.targetType === 'amazon' || currentDeckId === 'gaming' || (currentDeckId === 'gifts' && [3, 4, 5, 7, 8].includes(card.id))) {
            actionBtn.href = `https://${store.amazonHost}/s?k=${query}&tag=${store.tag}`;
            actionText.innerText = formatWithDomainTag(`${titleStr} – ${t.winnerOpenAction || 'Jetzt ansehen'}`, store.amazonDomain);
            if (secondaryBtn && secondaryText) {
                secondaryBtn.href = `https://${store.amazonHost}/s?k=${store.snackQuery}&tag=${store.tag}`;
                secondaryText.innerText = formatWithDomainTag(t.winnerSnackBox || 'Passende Snackbox bestellen', store.amazonDomain);
                secondaryBtn.classList.remove('hidden');
            }
        } else if (cat === 'food') {
            actionBtn.href = store.foodUrl(query);
            actionText.innerText = formatWithDomainTag(`${titleStr} – ${t.winnerOrderFood || 'bestellen'}`, store.foodDomain);
            if (secondaryBtn && secondaryText) {
                secondaryBtn.href = `https://${store.amazonHost}/s?k=${query}+${store.foodSuffix}&tag=${store.tag}`;
                const secPattern = (t.winnerFoodSecondary || 'Zutaten & Koch-Sets für {title}').replace('{title}', titleStr);
                secondaryText.innerText = formatWithDomainTag(secPattern, store.amazonDomain);
                secondaryBtn.classList.remove('hidden');
            }
        } else if (cat === 'entertainment') {
            actionBtn.href = `https://${store.amazonHost}/s?k=${query}&i=instant-video&tag=${store.tag}`;
            actionText.innerText = formatWithDomainTag(`${titleStr} – ${t.winnerStreamPrime || 'auf Prime Video streamen'}`, store.amazonDomain);
            if (secondaryBtn && secondaryText) {
                secondaryBtn.href = `https://${store.amazonHost}/s?k=${store.snackQuery}&tag=${store.tag}`;
                secondaryText.innerText = formatWithDomainTag(t.winnerSnackBox || 'Passende Heimkino-Snackbox bestellen', store.amazonDomain);
                secondaryBtn.classList.remove('hidden');
            }
        } else if (cat === 'activity') {
            actionBtn.href = `https://${store.gygHost}/s/?q=${query}`;
            actionText.innerText = formatWithDomainTag(`${titleStr} – ${t.winnerActivities || 'Erlebnisse & Tickets'}`, store.gygDomain);
            if (secondaryBtn && secondaryText) {
                secondaryBtn.href = `https://${store.amazonHost}/s?k=${query}+${store.activitySuffix}&tag=${store.tag}`;
                secondaryText.innerText = formatWithDomainTag(t.winnerActivitySecondary || 'Passendes Zubehör & Date-Boxen', store.amazonDomain);
                secondaryBtn.classList.remove('hidden');
            }
        } else if (cat === 'trips') {
            actionBtn.href = `https://www.booking.com/searchresults.${store.bookingLang}.html?ss=${query}`;
            actionText.innerText = `${titleStr} (${store.bookingDomain}) *`;
            if (secondaryBtn && secondaryText) {
                secondaryBtn.href = `https://${store.amazonHost}/s?k=${query}+${store.tripsSuffix}&tag=${store.tag}`;
                secondaryText.innerText = formatWithDomainTag(t.winnerTripsSecondary || 'Reise-Gadgets & Geschenk-Sets', store.amazonDomain);
                secondaryBtn.classList.remove('hidden');
            }
        } else {
            actionBtn.href = `https://${store.amazonHost}/s?k=${query}&tag=${store.tag}`;
            actionText.innerText = formatWithDomainTag(`${titleStr} – ${t.winnerOpenAction || 'Direkt online entdecken'}`, store.amazonDomain);
            if (secondaryBtn) {
                secondaryBtn.classList.add('hidden');
            }
        }
    }

    renderStage2MediaPicks(card);
}

let stage2ShuffleOffset = 0;

function getStage2MediaContext(card) {
    if (!card || typeof MEDIA_STAGE2_PICKS === 'undefined') return null;
    let mediaType = null;
    if (currentDeckId === 'movie' || currentDeckId === 'streaming') {
        mediaType = 'movie';
    } else if (currentDeckId === 'series') {
        mediaType = 'series';
    } else if (currentDeckId === 'gaming') {
        mediaType = 'gaming';
    } else if (currentDeckId === 'vacation') {
        mediaType = 'vacation';
    } else if (currentDeckId === 'gifts') {
        mediaType = 'gifts';
    }
    if (!mediaType || !MEDIA_STAGE2_PICKS[mediaType]) return null;
    const pool = MEDIA_STAGE2_PICKS[mediaType][card.id];
    if (!Array.isArray(pool) || pool.length === 0) return null;
    return { mediaType, pool };
}

function getStage2ItemTargetLinkAndDomain(item, mediaType, store) {
    const tType = item.targetType || (mediaType === 'gaming' ? 'amazon' : (mediaType === 'vacation' ? 'booking' : 'prime'));
    if (tType === 'booking') {
        return {
            url: `https://www.booking.com/searchresults.${store.bookingLang}.html?ss=${encodeURIComponent(item.title)}`,
            domain: `${store.bookingDomain} *`
        };
    }
    if (tType === 'gyg') {
        return {
            url: `https://${store.gygHost}/s/?q=${encodeURIComponent(item.title)}`,
            domain: `${store.gygDomain} *`
        };
    }
    if (tType === 'amazon') {
        return {
            url: `https://${store.amazonHost}/s?k=${encodeURIComponent(item.title)}&tag=${store.tag}`,
            domain: `${store.amazonDomain} *`
        };
    }
    return {
        url: `https://${store.amazonHost}/s?k=${encodeURIComponent(item.title + ' ' + item.year)}&i=instant-video&tag=${store.tag}`,
        domain: `${store.amazonDomain} *`
    };
}

function renderStage2MediaPicks(card) {
    const boxEl = document.getElementById('winner-stage2-box');
    const listEl = document.getElementById('winner-stage2-list');
    const headerEl = document.getElementById('t-stage2-header');
    const shuffleBtnEl = document.getElementById('t-stage2-shuffle-btn');
    const startBtnEl = document.getElementById('t-stage2-start-btn');
    if (!boxEl || !listEl) return;

    const ctx = getStage2MediaContext(card);
    if (!ctx) {
        boxEl.classList.add('hidden');
        return;
    }

    boxEl.classList.remove('hidden');
    const t = I18N[currentLang] || I18N.de;
    const store = getRegionalStoreConfig(currentLang);

    const headerMap = {
        movie: t.stage2MoviesHeader || '3 aktuelle Film-Tipps (2024–2026)',
        series: t.stage2SeriesHeader || '3 aktuelle Serien-Tipps (2024–2026)',
        gaming: t.stage2GamingHeader || '3 beliebte Spiele-Tipps (Bestseller)',
        vacation: t.stage2VacationHeader || '3 konkrete Reiseziele passend zur Wahl',
        gifts: t.stage2GiftsHeader || '3 konkrete Geschenk-Ideen & Bestseller'
    };
    const startBtnMap = {
        movie: t.stage2StartMoviesBtn || '🎬 Runde 2: Aus 8 passenden Filmen swipen →',
        series: t.stage2StartSeriesBtn || '📺 Runde 2: Aus 8 passenden Serien swipen →',
        gaming: t.stage2StartGamingBtn || '🎲 Runde 2: Aus 8 konkreten Spielen swipen →',
        vacation: t.stage2StartVacationBtn || '✈️ Runde 2: Aus 8 konkreten Reisezielen swipen →',
        gifts: t.stage2StartGiftsBtn || '🎁 Runde 2: Aus 6 konkreten Geschenken swipen →'
    };

    if (headerEl) headerEl.innerText = headerMap[ctx.mediaType] || headerMap.movie;
    if (shuffleBtnEl) shuffleBtnEl.innerText = t.stage2ShuffleBtn || '🎲 Andere 3';
    if (startBtnEl) startBtnEl.innerText = startBtnMap[ctx.mediaType] || startBtnMap.movie;

    const seenIds = new Set(getSeenMediaList().map(item => item.id));
    let unseenPool = ctx.pool.filter(item => !seenIds.has(item.id));
    if (unseenPool.length === 0) {
        unseenPool = ctx.pool;
    }

    const count = Math.min(3, unseenPool.length);
    const picked = [];
    for (let i = 0; i < count; i++) {
        picked.push(unseenPool[(stage2ShuffleOffset + i) % unseenPool.length]);
    }

    const isWatchType = (ctx.mediaType === 'movie' || ctx.mediaType === 'series');
    const skipBtnLabel = isWatchType ? `👁️ ${t.stage2SeenBtn || 'Schon gesehen'}` : `🔄 ${t.stage2SkipItemBtn || 'Tauschen'}`;

    listEl.innerHTML = picked.map(item => {
        const targetInfo = getStage2ItemTargetLinkAndDomain(item, ctx.mediaType, store);
        const safeTitle = item.title.replace(/'/g, "\\'");
        return `
            <div class="surface-raised rounded-[14px] p-2.5 flex items-center justify-between gap-2.5">
                <a href="${targetInfo.url}" target="_blank" rel="noopener" class="flex items-center gap-2.5 min-w-0 flex-1 group">
                    <span class="text-lg shrink-0">${item.emoji || '🎬'}</span>
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="font-bold text-[13px] text-primary-role truncate group-hover:underline">${item.title}</span>
                            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md surface text-secondary-role shrink-0">${item.year}</span>
                            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded-md surface text-muted-role shrink-0">↗ ${targetInfo.domain}</span>
                        </div>
                        <div class="text-[11.5px] text-secondary-role truncate mt-0.5">${item.vibe}</div>
                    </div>
                </a>
                <button type="button" onclick="markMediaPickSeen('${item.id}', '${safeTitle}')" class="px-2 py-1 rounded-full surface text-[10.5px] font-semibold text-secondary-role hover:text-primary-role shrink-0 transition-colors" title="${skipBtnLabel}">
                    ${skipBtnLabel}
                </button>
            </div>
        `;
    }).join('');
}

function shuffleStage2Picks() {
    stage2ShuffleOffset += 3;
    if (matchedCard) {
        renderStage2MediaPicks(matchedCard);
    }
}

function markMediaPickSeen(id, title) {
    const current = getSeenMediaList();
    if (!current.some(item => item.id === id)) {
        current.push({ id, title });
        saveSeenMediaList(current);
    }
    if (matchedCard) {
        renderStage2MediaPicks(matchedCard);
    }
}

function startStage2MediaRound() {
    if (!matchedCard) return;
    const ctx = getStage2MediaContext(matchedCard);
    if (!ctx) return;

    const seenIds = new Set(getSeenMediaList().map(item => item.id));
    let pool = ctx.pool.filter(item => !seenIds.has(item.id));
    if (pool.length < 3) {
        pool = ctx.pool;
    }

    const genreTitle = matchedCard.title[currentLang] || matchedCard.title.de || 'Auswahl';
    const optionsArray = pool.map(item => `${item.title} (${item.year})`);
    registerCustomDeckInMemory(genreTitle, 'match', optionsArray);

    if (DECKS['custom']) {
        DECKS['custom'].category = (ctx.mediaType === 'vacation' || ctx.mediaType === 'gifts') ? 'trips' : 'entertainment';
        DECKS['custom'].cards = pool.map((item, idx) => ({
            id: idx,
            emoji: item.emoji || '🎬',
            bg: '',
            targetType: item.targetType || (ctx.mediaType === 'gaming' ? 'amazon' : (ctx.mediaType === 'vacation' ? 'booking' : 'prime')),
            searchCleanTitle: item.title,
            tag: {
                de: `${item.year} · ${genreTitle}`,
                en: `${item.year} · ${genreTitle}`,
                es: `${item.year} · ${genreTitle}`,
                fr: `${item.year} · ${genreTitle}`,
                it: `${item.year} · ${genreTitle}`
            },
            title: {
                de: `${item.title} (${item.year})`,
                en: `${item.title} (${item.year})`,
                es: `${item.title} (${item.year})`,
                fr: `${item.title} (${item.year})`,
                it: `${item.title} (${item.year})`
            },
            desc: {
                de: item.vibe,
                en: item.vibe,
                es: item.vibe,
                fr: item.vibe,
                it: item.vibe
            }
        }));
    }

    partnerLikes = null;
    partnerRoundCardIds = null;
    completedPlayers = [];
    window.history.replaceState(null, null, window.location.pathname);
    startGame('custom');
}

function revealMatchScreen(card) {
    showScreen('screen-match');
    playMatchChime();

    // Jony Ive Feedback: Haptic Feedback auf Smartphones
    if ('vibrate' in navigator) {
        try { navigator.vibrate([40, 60, 140]); } catch (e) {}
    }

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
        });
    }

    const winnerCardEl = document.getElementById('winner-card');
    if (winnerCardEl) {
        winnerCardEl.className = "w-full rounded-[24px] p-6 mb-5 flex flex-col items-center text-center surface transition-all";
    }

    // Microsoft Fluent 3D Image Rendering for Winner Card
    const winnerImgEl = document.getElementById('winner-image');
    const winnerEmojiEl = document.getElementById('winner-emoji');
    const fluentWinnerFile = (typeof FLUENT_EMOJI_MAP !== 'undefined' && card.emoji) ? FLUENT_EMOJI_MAP[card.emoji] : null;

    if (fluentWinnerFile && winnerImgEl) {
        winnerImgEl.src = `options_gallery/images/${fluentWinnerFile}`;
        winnerImgEl.alt = card.title[currentLang] || card.title.de || '';
        winnerImgEl.classList.remove('hidden');
        if (winnerEmojiEl) winnerEmojiEl.classList.add('hidden');
    } else {
        if (winnerImgEl) winnerImgEl.classList.add('hidden');
        if (winnerEmojiEl) {
            winnerEmojiEl.innerText = card.emoji || '✨';
            winnerEmojiEl.classList.remove('hidden');
        }
    }

    const t = I18N[currentLang] || I18N.de;
    const matchBadgeEl = document.getElementById('t-match-badge');
    const matchTitleEl = document.getElementById('t-match-title');
    const partiesEl = document.getElementById('winner-parties');
    const myName = getUserProfile().name;

    if (lastMatchMeta && lastMatchMeta.mode === 'solo') {
        if (matchBadgeEl) matchBadgeEl.innerText = t.soloMatchBadge || 'Deine Auswahl';
        if (matchTitleEl) matchTitleEl.innerText = t.soloMatchTitle || 'Dein Treffer für heute';
        if (partiesEl) partiesEl.innerText = myName;
    } else if (lastMatchMeta && lastMatchMeta.mode === 'group') {
        if (matchBadgeEl) {
            matchBadgeEl.innerText = (t.groupMatchBadge || 'Gruppen-Match ({votes}/{total} Stimmen)')
                .replace('{votes}', lastMatchMeta.votes)
                .replace('{total}', lastMatchMeta.total);
        }
        if (matchTitleEl) matchTitleEl.innerText = t.matchTitle;
        if (partiesEl) partiesEl.innerText = (lastMatchMeta.names || []).join(' · ');
    } else {
        if (matchBadgeEl) matchBadgeEl.innerText = t.matchBadge;
        if (matchTitleEl) matchTitleEl.innerText = t.matchTitle;
        if (partiesEl) {
            const p1Name = partnerSenderName || "Person 1";
            partiesEl.innerText = `${p1Name} & ${myName}`;
        }
    }

    updateWinnerAffiliateLinks(card);

    const continueBtn = document.getElementById('btn-continue-swiping');
    if (continueBtn) {
        if (lastMatchMeta && lastMatchMeta.mode === 'solo') {
            if (soloLikedCards.length > 1) {
                continueBtn.innerText = (t.soloNextPickBtn || 'Nächsten Favoriten zeigen ({cur}/{total})')
                    .replace('{cur}', soloCurrentWinnerIdx + 1)
                    .replace('{total}', soloLikedCards.length);
                continueBtn.classList.remove('hidden');
            } else {
                continueBtn.classList.add('hidden');
            }
        } else if (lastMatchMeta && lastMatchMeta.mode === 'group') {
            continueBtn.classList.add('hidden');
        } else {
            continueBtn.innerText = t.continueSwiping;
            if (currentCardIndex + 1 < activeRoundCards.length) {
                continueBtn.classList.remove('hidden');
            } else {
                continueBtn.classList.add('hidden');
            }
        }
    }
}

function continueSwiping() {
    if (lastMatchMeta && lastMatchMeta.mode === 'solo' && soloLikedCards.length > 1) {
        soloCurrentWinnerIdx = (soloCurrentWinnerIdx + 1) % soloLikedCards.length;
        matchedCard = soloLikedCards[soloCurrentWinnerIdx];
        revealMatchScreen(matchedCard);
        return;
    }
    currentCardIndex++;
    if (currentCardIndex < activeRoundCards.length) {
        showScreen('screen-game');
        renderCurrentCard();
        startTimer();
    } else {
        showScreen('screen-nomatch');
    }
}

function pickRandomCardFallback() {
    const deck = DECKS[currentDeckId];
    if (!deck || !deck.cards.length) return;

    const basePool = activeRoundCards.length > 0 ? activeRoundCards : deck.cards;
    const combinedIds = Array.from(new Set([...(partnerLikes || []), ...myLikes]));
    const likedPool = combinedIds.length > 0
        ? basePool.filter(c => combinedIds.includes(c.id))
        : [];

    const finalPool = likedPool.length > 0 ? likedPool : basePool;
    const randomCard = finalPool[Math.floor(Math.random() * finalPool.length)] || deck.cards[0];
    triggerMatchScreen(randomCard);
}

/**************************************************************
 * 6B. CHORES & ANTI-MATCH ENGINE (Haushalt / Wer ist dran?)
 **************************************************************/
function triggerChoresResultScreen() {
    const deck = DECKS[currentDeckId];
    if (!deck) return;

    const evaluatedCards = activeRoundCards.length > 0 ? activeRoundCards : deck.cards;
    const voluntary = [];
    const antiMatches = [];

    if (completedPlayers.length >= 1 && (targetPlayerCount === 1 || targetPlayerCount >= 3)) {
        evaluatedCards.forEach(card => {
            const volunteers = completedPlayers.filter(v => v.likes.includes(card.id)).map(v => v.name);
            if (volunteers.length > 0) {
                voluntary.push({ card, owner: 'custom', ownerLabel: volunteers.join(', ') });
            } else {
                antiMatches.push({ card, assignedTo: null });
            }
        });
    } else {
        evaluatedCards.forEach(card => {
            const p1Liked = partnerLikes && partnerLikes.includes(card.id);
            const p2Liked = myLikes.includes(card.id);

            if (p1Liked && p2Liked) {
                voluntary.push({ card, owner: 'both' });
            } else if (p1Liked) {
                voluntary.push({ card, owner: 'p1' });
            } else if (p2Liked) {
                voluntary.push({ card, owner: 'p2' });
            } else {
                antiMatches.push({ card, assignedTo: null });
            }
        });
    }

    currentChoresSummary = {
        voluntary,
        antiMatches,
        resolved: antiMatches.length === 0
    };

    showScreen('screen-chores-result');
    renderChoresSummaryUI();
}

function renderChoresSummaryUI() {
    const t = I18N[currentLang];
    const volListEl = document.getElementById('chores-voluntary-list');
    const antiListEl = document.getElementById('chores-antimatch-list');
    const rouletteBtn = document.getElementById('btn-chores-roulette');
    const p1Name = partnerSenderName || "Person 1";
    const p2Name = getUserProfile().name;

    if (!volListEl || !antiListEl) return;
    volListEl.innerHTML = '';
    antiListEl.innerHTML = '';

    if (currentChoresSummary.voluntary.length === 0) {
        volListEl.innerHTML = `<div class="text-muted-role py-1">${t.choresNone || "Keine"}</div>`;
    } else {
        currentChoresSummary.voluntary.forEach(item => {
            const title = item.card.title[currentLang] || item.card.title.de;
            let badgeText = t.choresBothWant;
            if (item.owner === 'custom' && item.ownerLabel) badgeText = item.ownerLabel;
            if (item.owner === 'p1') badgeText = p1Name;
            if (item.owner === 'p2') badgeText = p2Name;

            const row = document.createElement('div');
            row.className = "flex items-center justify-between gap-2 p-2.5 rounded-[8px] surface-raised";
            row.innerHTML = `
                <span class="font-medium text-primary-role">${title}</span>
                <span class="text-[11px] font-mono text-secondary-role whitespace-nowrap">${badgeText}</span>
            `;
            volListEl.appendChild(row);
        });
    }

    if (currentChoresSummary.antiMatches.length === 0) {
        antiListEl.innerHTML = `<div class="text-[#349B6B] font-medium py-1">${t.choresNoAntiMatch}</div>`;
        if (rouletteBtn) rouletteBtn.classList.add('hidden');
    } else {
        currentChoresSummary.antiMatches.forEach(item => {
            const title = item.card.title[currentLang] || item.card.title.de;
            let statusText = t.choresOpen || "Offen";
            if (item.assignedTo === 'p1') statusText = p1Name;
            else if (item.assignedTo === 'p2') statusText = p2Name;
            else if (item.assignedTo) statusText = item.assignedTo;

            const row = document.createElement('div');
            row.className = "flex items-center justify-between gap-2 p-2.5 rounded-[8px] surface-raised";
            row.innerHTML = `
                <span class="font-medium text-primary-role">${title}</span>
                <span class="text-[11px] font-mono text-secondary-role whitespace-nowrap">${statusText}</span>
            `;
            antiListEl.appendChild(row);
        });

        if (rouletteBtn) {
            if (currentChoresSummary.resolved) {
                rouletteBtn.innerText = t.choresRouletteDone;
                rouletteBtn.className = "w-full h-10 rounded-[8px] surface-raised text-secondary-role font-medium text-[13px] cursor-default";
            } else {
                rouletteBtn.classList.remove('hidden');
                rouletteBtn.innerText = t.choresRouletteBtn;
                rouletteBtn.className = "w-full h-10 rounded-[8px] btn-primary font-medium text-[13px]";
            }
        }
    }
}

function resolveChoresAntiMatches() {
    if (!currentChoresSummary.antiMatches.length) return;

    // MrBeast / Haptic Roulette Vibration
    if ('vibrate' in navigator) {
        try { navigator.vibrate([60, 40, 60, 40, 160]); } catch (e) {}
    }

    const indices = currentChoresSummary.antiMatches.map((_, idx) => idx).sort(() => Math.random() - 0.5);

    if (completedPlayers.length >= 3) {
        const namesPool = shuffleArray(completedPlayers.map(p => p.name));
        indices.forEach((idx, pos) => {
            currentChoresSummary.antiMatches[idx].assignedTo = namesPool[pos % namesPool.length];
        });
    } else if (targetPlayerCount === 1 && completedPlayers.length === 1) {
        const soloName = completedPlayers[0].name;
        indices.forEach(idx => {
            currentChoresSummary.antiMatches[idx].assignedTo = soloName;
        });
    } else {
        let nextPlayer = Math.random() < 0.5 ? 'p1' : 'p2';
        indices.forEach(idx => {
            currentChoresSummary.antiMatches[idx].assignedTo = nextPlayer;
            nextPlayer = (nextPlayer === 'p1') ? 'p2' : 'p1';
        });
    }

    currentChoresSummary.resolved = true;
    renderChoresSummaryUI();
}

function shareChoresPlanViaWhatsApp() {
    if (!currentChoresSummary.resolved && currentChoresSummary.antiMatches.length > 0) {
        resolveChoresAntiMatches();
    }

    const t = I18N[currentLang];
    const p1Name = partnerSenderName || "Person 1";
    const p2Name = getUserProfile().name;
    const headerNames = (completedPlayers.length >= 3)
        ? completedPlayers.map(p => p.name).join(' · ')
        : (targetPlayerCount === 1 ? p2Name : `${p1Name} & ${p2Name}`);
    const lines = [t.waChoresSummaryHeader, headerNames, ""];

    currentChoresSummary.voluntary.forEach(item => {
        const title = item.card.title[currentLang] || item.card.title.de;
        let who = t.choresBothWant;
        if (item.owner === 'custom' && item.ownerLabel) who = item.ownerLabel;
        else if (item.owner === 'p1') who = p1Name;
        else if (item.owner === 'p2') who = p2Name;
        lines.push(`• ${title}: ${who}`);
    });

    currentChoresSummary.antiMatches.forEach(item => {
        const title = item.card.title[currentLang] || item.card.title.de;
        let who = item.assignedTo || p2Name;
        if (item.assignedTo === 'p1') who = p1Name;
        else if (item.assignedTo === 'p2') who = p2Name;
        lines.push(`• ${title}: ${who}`);
    });

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

/**************************************************************
 * 7. SHARING & HELPERS
 **************************************************************/
function copyShareLink() {
    const input = document.getElementById('share-url-input');
    input.select();
    navigator.clipboard.writeText(input.value);
    const t = I18N[currentLang];
    document.getElementById('t-copy-btn').innerText = t.copiedBtn;
}

function shareViaWhatsApp() {
    const url = document.getElementById('share-url-input').value;
    const myName = getUserProfile().name;
    const t = I18N[currentLang];
    const challengeMsg = t.waChallengeText || "Ich habe meine Auswahl getroffen. Schau mal rein, wo wir übereinstimmen:";
    const text = encodeURIComponent(`${myName}: ${challengeMsg}\n${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function sendWinnerToPartner() {
    if (!matchedCard) return;
    const p1Name = partnerSenderName || (I18N[currentLang]?.choresPlayer1 || "Person 1");
    const p2Name = getUserProfile().name;
    const partiesLabel = (lastMatchMeta && lastMatchMeta.mode === 'solo')
        ? p2Name
        : (lastMatchMeta && lastMatchMeta.mode === 'group' && Array.isArray(lastMatchMeta.names))
            ? lastMatchMeta.names.join(' · ')
            : `${p1Name} & ${p2Name}`;
    const title = matchedCard.title[currentLang] || matchedCard.title.en || matchedCard.title.de;
    const prefix = I18N[currentLang]?.waWinnerText || "Gemeinsame Wahl:";
    const shareUrl = "https://agreesy.com";
    const shareText = `🎉 ${prefix} ${title}! (${partiesLabel})\n30s-Entscheidung auf Agreesy: ${shareUrl}`;

    if (navigator.share) {
        navigator.share({
            title: `Agreesy Match: ${title}`,
            text: `🎉 ${prefix} ${title}! (${partiesLabel})`,
            url: shareUrl
        }).catch(() => {
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        });
    } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
}

function simulatePartnerRightHere() {
    const url = document.getElementById('share-url-input').value;
    window.location.hash = url.split('#')[1];
    checkIncomingChallenge();
}

function handleHeroCardClick() {
    if (currentDeckId && activeRoundCards.length > 0 && currentCardIndex < activeRoundCards.length) {
        showScreen('screen-game');
        renderCurrentCard();
        startTimer();
    } else {
        startGame(currentDeckId || 'dinner');
    }
}

function updateHeroRoundCardUI() {
    const badgeEl = document.getElementById('t-badge');
    const titleEl = document.getElementById('t-hero-title');
    const subEl = document.getElementById('t-hero-sub');
    const ctaEl = document.getElementById('hero-cta-text');
    const ringEl = document.getElementById('hero-ring-circle');
    const imgEl = document.getElementById('hero-ring-img');
    const t = I18N[currentLang] || I18N.de;

    const hasActiveRound = currentDeckId && DECKS[currentDeckId] && activeRoundCards.length > 0 && currentCardIndex < activeRoundCards.length;
    if (hasActiveRound) {
        const deck = DECKS[currentDeckId];
        const card = activeRoundCards[currentCardIndex] || activeRoundCards[0];
        const num = currentCardIndex + 1;
        const total = activeRoundCards.length;
        const remaining = total - num + 1;

        if (badgeEl) {
            badgeEl.innerText = (t.heroActiveBadge || "Aktive Runde · Karte {num} von {total}")
                .replace('{num}', num)
                .replace('{total}', total);
        }
        if (titleEl) titleEl.innerText = deck.title[currentLang] || deck.title.de;
        if (subEl) {
            subEl.innerText = (t.heroActiveSub || "Noch {rem} Karten offen")
                .replace('{rem}', remaining);
        }
        if (ctaEl) ctaEl.innerText = num === 1 ? (t.heroCtaStart || 'Runde jetzt starten') : (t.heroCtaResume || 'Runde fortsetzen');

        if (ringEl) {
            const circumference = 207;
            const offset = circumference - (num / Math.max(1, total)) * circumference;
            ringEl.setAttribute('stroke-dashoffset', Math.round(offset));
        }

        if (imgEl && card && typeof FLUENT_EMOJI_MAP !== 'undefined' && card.emoji && FLUENT_EMOJI_MAP[card.emoji]) {
            imgEl.src = `options_gallery/images/${FLUENT_EMOJI_MAP[card.emoji]}`;
        }
    } else {
        if (badgeEl) badgeEl.innerText = t.badge;
        if (titleEl) {
            titleEl.innerHTML = (targetPlayerCount === 1 && t.heroTitleSolo) ? t.heroTitleSolo : t.heroTitle;
        }
        if (subEl) {
            if (targetPlayerCount === 1) {
                subEl.innerText = t.heroSubSolo || t.heroSub;
            } else if (targetPlayerCount >= 3) {
                subEl.innerText = (t.heroSubGroup || t.heroSub).replace('{count}', targetPlayerCount);
            } else {
                subEl.innerText = t.heroSub;
            }
        }
        if (ctaEl) ctaEl.innerText = t.heroCtaStart || t.customStartBtn || 'Runde jetzt starten';
        if (ringEl) ringEl.setAttribute('stroke-dashoffset', '175');
        if (imgEl) imgEl.src = 'options_gallery/images/spaghetti_3d.png';
    }

    // Update Chores Card Labels for Solo vs. Duo/Group Mode
    const macroChoresSubEl = document.getElementById('t-macro-chores-sub');
    const heroChoresTitleEl = document.getElementById('t-hero-chores-title');
    const heroChoresSubEl = document.getElementById('t-hero-chores-sub');
    const heroChoresBtnEl = document.getElementById('t-hero-chores-btn');
    if (targetPlayerCount === 1) {
        if (macroChoresSubEl && t.macroChoresSubSolo) macroChoresSubEl.innerText = t.macroChoresSubSolo;
        if (heroChoresTitleEl && t.heroChoresTitleSolo) heroChoresTitleEl.innerText = t.heroChoresTitleSolo;
        if (heroChoresSubEl && t.heroChoresSubSolo) heroChoresSubEl.innerText = t.heroChoresSubSolo;
        if (heroChoresBtnEl && t.heroChoresBtnSolo) heroChoresBtnEl.innerText = t.heroChoresBtnSolo;
    } else {
        if (macroChoresSubEl && t.macroChoresSub) macroChoresSubEl.innerText = t.macroChoresSub;
        if (heroChoresTitleEl && t.heroChoresTitle) heroChoresTitleEl.innerText = t.heroChoresTitle;
        if (heroChoresSubEl && t.heroChoresSub) heroChoresSubEl.innerText = t.heroChoresSub;
        if (heroChoresBtnEl && t.heroChoresBtn) heroChoresBtnEl.innerText = t.heroChoresBtn;
    }
}

function resetToHome() {
    clearInterval(timerInterval);
    const gameScreen = document.getElementById('screen-game');
    const wasInGame = gameScreen && !gameScreen.classList.contains('hidden');

    if (!wasInGame) {
        partnerLikes = null;
        partnerRoundCardIds = null;
        completedPlayers = [];
        currentDeckId = null;
        activeRoundCards = [];
        window.history.replaceState(null, null, window.location.pathname);
    }
    const banner = document.getElementById('p2-welcome-banner');
    if (banner) banner.classList.add('hidden');
    renderDeckList();
    updateHeroRoundCardUI();
    showScreen('screen-home');
}

function showScreen(screenId) {
    [
        'screen-home',
        'screen-custom',
        'screen-game',
        'screen-share',
        'screen-p1-zero',
        'screen-solo-duel',
        'screen-match',
        'screen-nomatch',
        'screen-chores-result'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(screenId);
    if (target) target.classList.remove('hidden');
}

/**************************************************************
 * 8. TOUCH SWIPE GESTURES (Apple Fluid Physics & Dynamic Drag)
 **************************************************************/
function initTouchSwipe() {
    const cardEl = document.getElementById('active-card');
    if (!cardEl) return;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isDragging = false;

    cardEl.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        startX = e.touches[0].screenX;
        startY = e.touches[0].screenY;
        currentX = startX;
        isDragging = true;
        cardEl.style.transition = 'none';
    }, { passive: true });

    cardEl.addEventListener('touchmove', (e) => {
        if (!isDragging || !e.touches || e.touches.length === 0) return;
        currentX = e.touches[0].screenX;
        const currentY = e.touches[0].screenY;
        const dx = currentX - startX;
        const dy = currentY - startY;

        // Apple fluid rotation & translation
        const rotation = (dx * 0.07).toFixed(2);
        cardEl.style.transform = `translate3d(${dx}px, ${dy * 0.25}px, 0) rotate(${rotation}deg)`;

        // Tactile glow feedback
        if (dx > 25) {
            cardEl.style.boxShadow = `0 20px 45px rgba(16, 185, 129, ${Math.min(0.45, dx / 200)})`;
        } else if (dx < -25) {
            cardEl.style.boxShadow = `0 20px 45px rgba(244, 63, 94, ${Math.min(0.45, Math.abs(dx) / 200)})`;
        } else {
            cardEl.style.boxShadow = '';
        }
    }, { passive: true });

    cardEl.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        const dx = currentX - startX;

        if (Math.abs(dx) > 65) {
            // Apple spring exit animation
            cardEl.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease';
            cardEl.style.transform = dx > 0 
                ? 'translate3d(120vw, 20px, 0) rotate(22deg)' 
                : 'translate3d(-120vw, 20px, 0) rotate(-22deg)';
            cardEl.style.opacity = '0';
            setTimeout(() => {
                cardEl.style.transition = '';
                cardEl.style.transform = '';
                cardEl.style.opacity = '1';
                cardEl.style.boxShadow = '';
                handleSwipe(dx > 0);
            }, 250);
        } else {
            // Spring bounce back to center
            cardEl.style.transition = 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
            cardEl.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
            cardEl.style.boxShadow = '';
            setTimeout(() => {
                cardEl.style.transition = '';
            }, 350);
        }
    }, { passive: true });
}

/**************************************************************
 * 9. LEGAL MODALS (Impressum & Datenschutz)
 **************************************************************/
function openLegalModal(type) {
    const modal = document.getElementById('modal-legal');
    const titleEl = document.getElementById('legal-modal-title');
    const contentEl = document.getElementById('legal-modal-content');
    const closeBtn = document.getElementById('legal-modal-close-btn');
    if (!modal || !titleEl || !contentEl) return;

    const t = I18N[currentLang] || I18N.de;
    if (closeBtn) closeBtn.innerText = t.modalClose || 'Schließen';

    const LEGAL_DATA = {
        impressum: {
            de: {
                title: "Impressum",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h4><p>Felix Gooßens<br>E-Mail: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Webseite: <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h4><p>Felix Gooßens (Kontakt wie oben)</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. Über die App &amp; Plattform-Informationen</h4><p>Agreesy – Interaktive Entscheidungshilfe für Paare, WGs &amp; Freunde.<br>Adspace- / Plattform-Verifizierungscode: <strong>2d31</strong></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. EU-Streitschlichtung &amp; Verbraucherstreitbeilegung (§ 36 VSBG)</h4><p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Haftung für Inhalte &amp; Externe Links</h4><p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Urheberrecht</h4><p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Transparenter Affiliate- und Werbehinweis (§ 5a Abs. 4 UWG / § 6 DDG)</h4><p>Diese Web-App finanziert sich teilweise über sogenannte Affiliate-Links (Partnerlinks), unter anderem im Rahmen des Amazon Partnerprogramms (Amazon EU S.à r.l.) sowie über die Affiliate-Netzwerke AWIN (AWIN AG) und Takeads / Mitgo (Takeads GmbH). Wenn Sie auf einen solchen Partnerlink klicken und über diesen Link einkaufen oder buchen, erhalten wir vom jeweiligen Anbieter eine Provision. Für Sie verändert sich der Preis nicht; es entstehen keinerlei Mehrkosten.</p></div>
                `
            },
            en: {
                title: "Legal Notice (Impressum)",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. Operator Information (§ 5 DDG)</h4><p>Felix Gooßens<br>Email: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Website: <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Responsible for Editorial Content (§ 18 (2) MStV)</h4><p>Felix Gooßens (Contact as stated above)</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. About the App &amp; Platform Details</h4><p>Agreesy – 30-second decision helper for couples, roommates &amp; friends.<br>Platform Verification Code: <strong>2d31</strong></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. Consumer Dispute Resolution (§ 36 VSBG)</h4><p>We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Liability for Content &amp; External Links</h4><p>The contents of this web application have been created with the utmost care. However, we assume no liability for the content of external third-party links. The respective provider or operator is always solely responsible for the content of the linked pages.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Copyright</h4><p>All content, source code, and works created by the site operator on these pages are subject to copyright law. Any reproduction, editing, or distribution beyond the limits of copyright law requires written consent.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Commercial &amp; Affiliate Disclosure</h4><p>This web application participates in affiliate marketing programs, including the Amazon Associates Program (Amazon EU S.à r.l. / Amazon.com Inc.), AWIN (AWIN AG), and Takeads / Mitgo (Takeads GmbH). When you click on partner links and make a qualifying purchase, we may earn an advertising commission at no additional cost to you.</p></div>
                `
            },
            es: {
                title: "Aviso Legal (Impressum)",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. Información del titular (§ 5 DDG)</h4><p>Felix Gooßens<br>Email: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Sitio web: <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Responsable del contenido (§ 18 Abs. 2 MStV)</h4><p>Felix Gooßens (Contacto arriba indicado)</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. Sobre la App &amp; Información de plataforma</h4><p>Agreesy – Herramienta de decisión rápida para parejas y amigos.<br>Código de verificación de plataforma: <strong>2d31</strong></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. Resolución de litigios de consumo (§ 36 VSBG)</h4><p>No estamos dispuestos ni obligados a participar en procedimientos de resolución de litigios ante una junta de arbitraje de consumo.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Responsabilidad por contenidos y enlaces externos</h4><p>Los contenidos de esta aplicación web han sido elaborados con el máximo cuidado. No asumimos ninguna responsabilidad por los contenidos de enlaces externos de terceros; el proveedor u operador respectivo es siempre el único responsable de las páginas enlazadas.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Propiedad intelectual</h4><p>Los contenidos y obras creados por el operador en estas páginas están sujetos a la legislación sobre derechos de autor.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Divulgación de afiliación y publicidad</h4><p>Esta aplicación web participa en programas de afiliación, incluidos el Programa de Afiliados de Amazon (Amazon EU S.à r.l.), AWIN (AWIN AG) y Takeads / Mitgo (Takeads GmbH). Si haces clic en un enlace de socio y realizas una compra, podemos recibir una pequeña comisión sin ningún coste adicional para ti.</p></div>
                `
            },
            fr: {
                title: "Mentions Légales (Impressum)",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. Informations légales (§ 5 DDG)</h4><p>Felix Gooßens<br>E-mail : <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Site web : <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Responsable de la publication (§ 18 Abs. 2 MStV)</h4><p>Felix Gooßens (Coordonnées ci-dessus)</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. À propos de l'application</h4><p>Agreesy – Aide à la décision en 30 secondes pour couples et amis.<br>Code de vérification de plateforme : <strong>2d31</strong></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. Règlement des litiges de consommation (§ 36 VSBG)</h4><p>Nous ne sommes ni disposés ni tenus de participer à des procédures de règlement des litiges devant un organisme de médiation de la consommation.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Responsabilité des contenus et liens externes</h4><p>Le contenu de cette application web a été élaboré avec le plus grand soin. Nous déclinons toute responsabilité quant aux contenus des liens externes vers des tiers ; l'exploitant de chaque site lié en est toujours seul responsable.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Droit d'auteur</h4><p>Les contenus et œuvres créés par l'exploitant du site sont soumis au droit d'auteur.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Information sur les liens d'affiliation</h4><p>Cette application web participe à des programmes d'affiliation, notamment le Programme Partenaires d'Amazon (Amazon EU S.à r.l.), AWIN (AWIN AG) et Takeads / Mitgo (Takeads GmbH). En cliquant sur ces liens partenaires et en effectuant un achat, nous pouvons percevoir une commission sans aucun surcoût pour vous.</p></div>
                `
            },
            it: {
                title: "Note Legali (Impressum)",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. Informazioni legali (§ 5 DDG)</h4><p>Felix Gooßens<br>Email: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Sito web: <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Responsabile dei contenuti (§ 18 Abs. 2 MStV)</h4><p>Felix Gooßens (Contatto come sopra)</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. Informazioni sull'App</h4><p>Agreesy – Applicazione decisionale in 30 secondi per coppie e amici.<br>Codice di verifica della piattaforma: <strong>2d31</strong></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. Risoluzione delle controversie dei consumatori (§ 36 VSBG)</h4><p>Non siamo disposti né obbligati a partecipare a procedure di risoluzione delle controversie dinanzi a un organismo di conciliazione dei consumatori.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Responsabilità per contenuti e link esterni</h4><p>I contenuti di questa applicazione web sono stati redatti con la massima cura. Non ci assumiamo alcuna responsabilità per i contenuti dei link esterni di terze parti; il rispettivo fornitore o gestore è sempre l'unico responsabile delle pagine collegate.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Diritto d'autore</h4><p>I contenuti e le opere creati dal gestore del sito sono soggetti alla normativa sul diritto d'autore.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Informativa sui link di affiliazione</h4><p>Questa applicazione web partecipa a programmi di affiliazione, tra cui il Programma Affiliazione Amazon (Amazon EU S.à r.l.), AWIN (AWIN AG) e Takeads / Mitgo (Takeads GmbH). Effettuando un acquisto tramite uno di questi link partner, potremmo ricevere una commissione senza alcun costo aggiuntivo per l'utente.</p></div>
                `
            }
        },
        datenschutz: {
            de: {
                title: "Datenschutzerklärung (DSGVO)",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. Datenschutz auf einen Blick &amp; Grundsatz der Datenminimierung</h4><p>Der Schutz Ihrer personenbezogenen Daten hat für uns höchste Priorität. Agreesy wurde nach dem Prinzip „Privacy by Design“ als clientseitige Web-Anwendung entwickelt: Wir betreiben keine eigene Nutzerdatenbank, verlangen keine Registrierung und speichern Ihre Abstimmungen oder Vorlieben nicht auf eigenen Servern.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Verantwortliche Stelle (Art. 4 Nr. 7 DSGVO)</h4><p>Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:<br>Felix Gooßens<br>E-Mail: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Webseite: <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. Lokale Speicherung im Browser (LocalStorage) &amp; Peer-to-Peer URL-Synchronisation</h4><p>Damit Agreesy ohne Benutzerkonto funktioniert, werden Ihre Einstellungen (gewählte Sprache, Hell-/Dunkelmodus, gewählter Alias/Vorname, dauerhaft ausgeblendete Karten sowie als „gesehen“ markierte Filmtitel) ausschließlich lokal im Speicher Ihres eigenen Endgeräts (<code>localStorage</code>) abgelegt. Sie können diese lokalen Daten jederzeit in Ihren Browsereinstellungen oder direkt im Profil-Menü der App löschen. Zur Synchronisation einer Runde zwischen zwei Personen wird die Kartenauswahl im URL-Fragment (<code>#m=...</code> oder <code>#c=...</code>) Base64-kodiert übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO sowie § 25 Abs. 2 Nr. 2 TDDDG (technisch unbedingt erforderlich zur Bereitstellung des von Ihnen ausdrücklich gewünschten Dienstes).</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. Hosting, Content Delivery Network (Cloudflare Pages) &amp; Server-Logfiles</h4><p>Diese Web-App wird über Cloudflare Pages bereitgestellt (Anbieter: Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA). Beim Aufruf der Webseite werden durch das CDN technisch notwendige Verbindungsdaten (IP-Adresse, Datum und Uhrzeit der Anfrage, abgerufene Datei, Browsertyp/Betriebssystem, Referrer-URL) verarbeitet, um die Webseite sicher, schnell und geschützt vor Angriffen (z. B. DDoS-Schutz) auszuliefern. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und zuverlässigen Betrieb gemäß Art. 6 Abs. 1 lit. f DSGVO. Cloudflare ist nach dem <strong>EU-US Data Privacy Framework (DPF)</strong> zertifiziert; zudem gelten die Standardvertragsklauseln (SCC) der Europäischen Kommission gemäß Art. 46 DSGVO.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Affiliate-Programme, Partner-Netzwerke &amp; Externe Tracking-Links</h4><p>Zur kostenfreien Bereitstellung von Agreesy nutzen wir Affiliate-Marketing-Programme auf Grundlage unseres berechtigten wirtschaftlichen Interesses an der Refinanzierung unseres Angebots gemäß Art. 6 Abs. 1 lit. f DSGVO (bzw. Art. 6 Abs. 1 lit. a DSGVO / § 25 Abs. 1 TDDDG, sofern auf den Zielseiten der Partner eine Einwilligung eingeholt wird):<br><br><strong>a) Amazon Partnerprogramm:</strong> Wir sind Teilnehmer des Partnerprogramms von Amazon EU S.à r.l. (38 avenue John F. Kennedy, L-1855 Luxemburg). Auf unseren Seiten sind Links zu Amazon-Webseiten (u. a. amazon.de, amazon.com, amazon.co.uk, amazon.es, amazon.fr, amazon.it) eingebunden. Erst wenn Sie aktiv auf einen Amazon-Link klicken, werden Sie zu Amazon weitergeleitet, wobei Amazon über den Partner-Parameter (<code>tag=f05b1-21</code>) erkennt, dass Sie über unsere Seite kamen. Weitere Informationen finden Sie in der Datenschutzerklärung von Amazon.<br><br><strong>b) AWIN Affiliate-Netzwerk &amp; Publisher MasterTag:</strong> Wir nutzen das Affiliate-Netzwerk der AWIN AG (Eichhornstraße 3, 10785 Berlin, Deutschland) sowie das AWIN Publisher MasterTag (<code>dwin2.com</code>). Beim Klick auf einen AWIN-Partnerlink werden technische Zuordnungsdaten (Referrer, Zeitstempel, geklickter Partnerlink, Browser-/Geräteinformationen) verarbeitet, um den Ursprung einer Bestellung für die Provisionsabrechnung zuzuordnen. Datenschutzerklärung von AWIN: <a href="https://www.awin.com/de/datenschutzerklarung" target="_blank" rel="noopener" class="text-primary-role underline">awin.com/de/datenschutzerklarung</a>.<br><br><strong>c) Takeads / Mitgo Affiliate- &amp; Monetarisierungsnetzwerk:</strong> Wir nutzen Dienste, Partnerlinks und das Skript (<code>convertlink.com</code>) der Takeads GmbH / Mitgo Group (Karl-Liebknecht-Str. 1, 10178 Berlin, Deutschland). Wenn Sie auf einen über Takeads vermittelten Händler- oder Empfehlungslink klicken, erfolgt eine Weiterleitung über die Tracking-Infrastruktur von Takeads zur Zielseite des jeweiligen Werbepartners. Dabei werden technisch erforderliche Parameter (IP-Adresse zur Betrugsprävention und Länderzuordnung, Zeitstempel, Referrer-URL sowie eine pseudonymisierte Klick-ID) verarbeitet, um einen erfolgreichen Abschluss provisionsberechtigt zuordnen zu können. Datenschutzerklärung von Takeads: <a href="https://www.takeads.com/privacy-policy/" target="_blank" rel="noopener" class="text-primary-role underline">takeads.com/privacy-policy</a>.<br><br>Sobald Sie durch Klick auf einen externen Link auf die Webseite eines Drittanbieters wechseln, gelten ausschließlich die Datenschutz- und Cookie-Richtlinien des jeweiligen Zielanbieters.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Web-Schriftarten &amp; Technische Ressourcen</h4><p>Zur einheitlichen und ansprechenden Darstellung nutzt diese Seite Web-Schriftarten (Google Fonts, Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) sowie das Stylesheet-CDN von Tailwind. Beim Abruf dieser Ressourcen erfährt der Server technisch bedingt Ihre IP-Adresse. Die Nutzung erfolgt im Interesse einer einheitlichen Darstellung unseres Online-Angebots gemäß Art. 6 Abs. 1 lit. f DSGVO.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Ihre Betroffenenrechte nach DSGVO (Art. 15–21 &amp; Art. 77 DSGVO)</h4><p>Ihnen stehen im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit folgende Rechte hinsichtlich Ihrer personenbezogenen Daten zu:<br>• <strong>Recht auf Auskunft</strong> (Art. 15 DSGVO)<br>• <strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)<br>• <strong>Recht auf Löschung / „Recht auf Vergessenwerden“</strong> (Art. 17 DSGVO)<br>• <strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)<br>• <strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)<br>• <strong>Widerspruchsrecht gegen die Verarbeitung</strong> (Art. 21 DSGVO), sofern die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht.<br>• <strong>Beschwerderecht bei einer Aufsichtsbehörde</strong> (Art. 77 DSGVO), wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt.<br><br>Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a>.</p></div>
                `
            },
            en: {
                title: "Privacy Policy (GDPR / DSGVO)",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. Privacy at a Glance &amp; Data Minimization</h4><p>Protecting your personal data is our top priority. Agreesy is engineered with a strict "Privacy by Design" zero-server architecture: we do not operate a user database, require no registration, and never store your swipe choices on our own servers.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Data Controller (Art. 4 (7) GDPR)</h4><p>Felix Gooßens<br>Email: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Website: <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. Local Browser Storage (LocalStorage) &amp; URL Hash Sync</h4><p>To work without user accounts, your preferences (language, dark/light theme, chosen nickname/alias, blacklisted cards, and seen movies) are stored strictly locally in your browser's <code>localStorage</code>. You can clear these at any time via your browser settings or inside the app profile menu. For 2-player synchronization, round picks are Base64-encoded directly in the URL hash fragment (<code>#m=...</code>) and shared peer-to-peer. The legal basis is Art. 6 (1) (b) and (f) GDPR as well as § 25 (2) No. 2 TDDDG (strictly necessary to provide the service explicitly requested by the user).</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. Hosting, CDN (Cloudflare Pages) &amp; Server Log Files</h4><p>This web application is hosted via Cloudflare Pages (Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA). When accessing the website, technically required connection data (IP address, timestamp, requested resource, user agent, referrer) is processed to ensure fast delivery and protection against cyberattacks (e.g., DDoS protection). The legal basis is our legitimate interest in secure and reliable operation pursuant to Art. 6 (1) (f) GDPR. Cloudflare is certified under the <strong>EU-US Data Privacy Framework (DPF)</strong> and utilizes EU Standard Contractual Clauses (SCCs).</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Affiliate Programs, Partner Networks &amp; Tracking Links</h4><p>To offer Agreesy free of charge, we participate in affiliate marketing programs based on our legitimate economic interest in financing our platform pursuant to Art. 6 (1) (f) GDPR:<br><br><strong>a) Amazon Associates Program:</strong> We participate in the Amazon Associates Program (Amazon EU S.à r.l., 38 avenue John F. Kennedy, L-1855 Luxembourg / Amazon.com Inc.). When you click on an Amazon partner link, you are redirected to Amazon, and Amazon recognizes the referral via our partner tag (<code>tag=f05b1-21</code>).<br><br><strong>b) AWIN Affiliate Network &amp; Publisher MasterTag:</strong> We use the affiliate network operated by AWIN AG (Eichhornstraße 3, 10785 Berlin, Germany) and the AWIN Publisher MasterTag (<code>dwin2.com</code>). When clicking an AWIN partner link, technical attribution parameters (referrer URL, timestamp, clicked link, device/browser metadata) are processed to attribute qualifying orders for commission settlement. Privacy Policy: <a href="https://www.awin.com/gb/privacy" target="_blank" rel="noopener" class="text-primary-role underline">awin.com/gb/privacy</a>.<br><br><strong>c) Takeads / Mitgo Affiliate &amp; Monetization Network:</strong> We integrate partner links and monetization tools (<code>convertlink.com</code>) provided by Takeads GmbH / Mitgo Group (Karl-Liebknecht-Str. 1, 10178 Berlin, Germany). When you click a merchant recommendation link powered by Takeads, you are routed through Takeads' tracking infrastructure to the merchant's website. Technical parameters (IP address for fraud prevention and geo-routing, timestamp, referrer URL, and a pseudonymized click ID) are processed to attribute commissionable transactions. Takeads Privacy Policy: <a href="https://www.takeads.com/privacy-policy/" target="_blank" rel="noopener" class="text-primary-role underline">takeads.com/privacy-policy</a>.<br><br>Once you leave Agreesy and visit a third-party merchant website, the privacy and cookie policies of that respective website apply.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Web Fonts &amp; Technical Assets</h4><p>For consistent visual presentation, this site loads web fonts (Google Fonts, Google Ireland Limited, Dublin, Ireland) and styling resources on the basis of Art. 6 (1) (f) GDPR.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Your Data Subject Rights under GDPR (Art. 15–21 &amp; Art. 77 GDPR)</h4><p>Under the GDPR, you have the right at any time to:<br>• <strong>Access</strong> your personal data (Art. 15 GDPR)<br>• <strong>Rectification</strong> of inaccurate data (Art. 16 GDPR)<br>• <strong>Erasure / "Right to be forgotten"</strong> (Art. 17 GDPR)<br>• <strong>Restriction of processing</strong> (Art. 18 GDPR)<br>• <strong>Data portability</strong> (Art. 20 GDPR)<br>• <strong>Object to processing</strong> based on Art. 6 (1) (f) GDPR (Art. 21 GDPR)<br>• <strong>Lodge a complaint</strong> with a data protection supervisory authority (Art. 77 GDPR).<br><br>To exercise your rights, simply contact us at <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a>.</p></div>
                `
            },
            es: {
                title: "Política de Privacidad (RGPD)",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. Privacidad de un vistazo y minimización de datos</h4><p>La protección de tus datos personales es nuestra máxima prioridad. Agreesy sigue el principio de «Privacidad desde el diseño» sin servidor propio: no requerimos registro ni almacenamos tus votaciones en servidores propios.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Responsable del tratamiento (Art. 4 n.º 7 RGPD)</h4><p>Felix Gooßens<br>Email: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Sitio web: <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. Almacenamiento local (LocalStorage) y sincronización por enlace</h4><p>Tus ajustes (idioma, modo claro/oscuro, alias local, tarjetas ocultas y películas vistas) se guardan exclusivamente en el almacenamiento local de tu navegador (<code>localStorage</code>). Para sincronizar una ronda entre dos personas, la selección se codifica en Base64 directamente en el fragmento del enlace (<code>#m=...</code>). La base jurídica es el Art. 6 apdo. 1 letras b y f del RGPD (estrictamente necesario para prestar el servicio solicitado).</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. Alojamiento, CDN (Cloudflare Pages) y archivos de registro</h4><p>Esta aplicación web está alojada en Cloudflare Pages (Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, EE. UU.). Al acceder al sitio se procesan datos técnicos de conexión (dirección IP, fecha y hora, navegador) sobre la base de nuestro interés legítimo en una entrega segura y rápida conforme al Art. 6 apdo. 1 letra f del RGPD. Cloudflare está certificado bajo el <strong>Marco de Privacidad de Datos UE-EE. UU. (DPF)</strong>.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Programas de afiliación, redes de socios y enlaces de seguimiento</h4><p>Para ofrecer Agreesy de forma gratuita, participamos en programas de marketing de afiliación sobre la base de nuestro interés legítimo conforme al Art. 6 apdo. 1 letra f del RGPD:<br><br><strong>a) Programa de Afiliados de Amazon:</strong> Participamos en el Programa de Afiliados de Amazon EU S.à r.l. (38 avenue John F. Kennedy, L-1855 Luxemburgo). Al hacer clic en un enlace de Amazon, se transmite nuestro identificador de socio (<code>tag=f05b1-21</code>).<br><br><strong>b) Red de afiliación AWIN y Publisher MasterTag:</strong> Utilizamos la red de AWIN AG (Eichhornstraße 3, 10785 Berlín, Alemania) y el script AWIN MasterTag (<code>dwin2.com</code>). Al pulsar un enlace asociado se procesan datos técnicos de atribución para asignar posibles comisiones. Política de privacidad de AWIN: <a href="https://www.awin.com/es/privacidad" target="_blank" rel="noopener" class="text-primary-role underline">awin.com/es/privacidad</a>.<br><br><strong>c) Red de afiliación y monetización Takeads / Mitgo:</strong> Integramos enlaces y herramientas de monetización (<code>convertlink.com</code>) de Takeads GmbH / Mitgo Group (Karl-Liebknecht-Str. 1, 10178 Berlín, Alemania). Al hacer clic en un enlace gestionado por Takeads, se redirige a través de su servidor de seguimiento procesando parámetros técnicos necesarios (dirección IP para prevención de fraude y enrutamiento regional, marca temporal, URL de referencia e ID de clic seudonimizado). Política de privacidad de Takeads: <a href="https://www.takeads.com/privacy-policy/" target="_blank" rel="noopener" class="text-primary-role underline">takeads.com/privacy-policy</a>.<br><br>En las páginas de destino de los comercios externos se aplican sus propias políticas de privacidad y cookies.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Fuentes web y recursos técnicos</h4><p>Para una visualización uniforme utilizamos Google Fonts (Google Ireland Limited, Dublín, Irlanda) y recursos CSS sobre la base del Art. 6 apdo. 1 letra f del RGPD.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Tus derechos según el RGPD (Art. 15–21 y Art. 77 RGPD)</h4><p>Tienes derecho en cualquier momento al <strong>acceso</strong> (Art. 15), <strong>rectificación</strong> (Art. 16), <strong>supresión</strong> (Art. 17), <strong>limitación del tratamiento</strong> (Art. 18), <strong>portabilidad de los datos</strong> (Art. 20), <strong>oposición</strong> al tratamiento basado en el Art. 6 (1) (f) RGPD (Art. 21), así como a presentar una <strong>reclamación ante una autoridad de control de protección de datos</strong> (Art. 77 RGPD). Contacto: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a>.</p></div>
                `
            },
            fr: {
                title: "Politique de Confidentialité (RGPD)",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. La protection des données en un coup d'œil</h4><p>La protection de vos données personnelles est notre priorité absolue. Agreesy repose sur une architecture « Privacy by Design » sans serveur : aucune inscription n'est requise et vos choix ne sont jamais stockés sur nos propres serveurs.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Responsable du traitement (Art. 4 n° 7 RGPD)</h4><p>Felix Gooßens<br>E-mail : <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Site web : <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. Stockage local (LocalStorage) et synchronisation par URL</h4><p>Vos préférences (langue, thème clair/sombre, pseudonyme local, cartes masquées et films vus) sont enregistrées uniquement dans le stockage local de votre navigateur (<code>localStorage</code>). Pour la synchronisation à deux, la sélection est encodée en Base64 dans le fragment d'URL (<code>#m=...</code>). La base juridique est l'Art. 6 par. 1 points b et f du RGPD (strictement nécessaire à la fourniture du service demandé).</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. Hébergement, CDN (Cloudflare Pages) et journaux serveur</h4><p>Cette application web est hébergée via Cloudflare Pages (Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, États-Unis). Lors de l'accès au site, des données techniques de connexion (adresse IP, horodatage, navigateur) sont traitées sur la base de notre intérêt légitime à assurer la sécurité et la rapidité du service (Art. 6 par. 1 point f du RGPD). Cloudflare est certifié dans le cadre du <strong>Data Privacy Framework UE-États-Unis (DPF)</strong>.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Programmes d'affiliation, réseaux partenaires et liens de suivi</h4><p>Afin de proposer Agreesy gratuitement, nous participons à des programmes d'affiliation sur la base de notre intérêt légitime conformément à l'Art. 6 par. 1 point f du RGPD :<br><br><strong>a) Programme Partenaires d'Amazon :</strong> Nous participons au Programme Partenaires d'Amazon EU S.à r.l. (38 avenue John F. Kennedy, L-1855 Luxembourg). Lorsque vous cliquez sur un lien Amazon, notre identifiant partenaire (<code>tag=f05b1-21</code>) est transmis.<br><br><strong>b) Réseau d'affiliation AWIN &amp; Publisher MasterTag :</strong> Nous utilisons le réseau AWIN AG (Eichhornstraße 3, 10785 Berlin, Allemagne) et le script AWIN MasterTag (<code>dwin2.com</code>) pour attribuer les commandes éligibles à une commission. Politique de confidentialité d'AWIN : <a href="https://www.awin.com/fr/politique-de-confidentialite" target="_blank" rel="noopener" class="text-primary-role underline">awin.com/fr/politique-de-confidentialite</a>.<br><br><strong>c) Réseau d'affiliation et de monétisation Takeads / Mitgo :</strong> Nous intégrons des liens partenaires et outils (<code>convertlink.com</code>) fournis par Takeads GmbH / Mitgo Group (Karl-Liebknecht-Str. 1, 10178 Berlin, Allemagne). Lors d'un clic sur un lien partenaire Takeads, une redirection s'effectue via l'infrastructure de suivi de Takeads en traitant des paramètres techniques (adresse IP pour la prévention de la fraude et le routage géographique, horodatage, URL de référence et identifiant de clic pseudonymisé). Politique de confidentialité de Takeads : <a href="https://www.takeads.com/privacy-policy/" target="_blank" rel="noopener" class="text-primary-role underline">takeads.com/privacy-policy</a>.<br><br>Une fois redirigé vers le site d'un marchand tiers, les règles de confidentialité et de cookies de ce marchand s'appliquent.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Polices web et ressources techniques</h4><p>Pour un affichage homogène, ce site utilise Google Fonts (Google Ireland Limited, Dublin, Irlande) sur la base de l'Art. 6 par. 1 point f du RGPD.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Vos droits en vertu du RGPD (Art. 15–21 et Art. 77 RGPD)</h4><p>Vous disposez à tout moment d'un droit d'<strong>accès</strong> (Art. 15), de <strong>rectification</strong> (Art. 16), d'<strong>effacement</strong> (Art. 17), de <strong>limitation du traitement</strong> (Art. 18), de <strong>portabilité des données</strong> (Art. 20), d'<strong>opposition</strong> au traitement fondé sur l'Art. 6 (1) (f) RGPD (Art. 21), ainsi que du droit d'introduire une <strong>réclamation auprès d'une autorité de contrôle</strong> (Art. 77 RGPD). Contact : <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a>.</p></div>
                `
            },
            it: {
                title: "Informativa sulla Privacy (GDPR)",
                html: `
                    <div><h4 class="font-medium text-primary-role mb-1">1. La privacy in sintesi e minimizzazione dei dati</h4><p>La tutela dei tuoi dati personali è la nostra massima priorità. Agreesy segue il principio «Privacy by Design» con architettura zero-server: non richiediamo registrazione e non salviamo mai le tue scelte su server nostri.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">2. Titolare del trattamento (Art. 4 n. 7 GDPR)</h4><p>Felix Gooßens<br>Email: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a><br>Sito web: <a href="https://agreesy.com" class="text-primary-role underline">https://agreesy.com</a></p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">3. Archiviazione locale (LocalStorage) e sincronizzazione tramite URL</h4><p>Le tue impostazioni (lingua, tema chiaro/scuro, alias locale, schede nascoste e film già visti) vengono salvate esclusivamente nella memoria locale del tuo browser (<code>localStorage</code>). Per sincronizzare una partita tra due persone, le scelte vengono codificate in Base64 direttamente nel frammento dell'URL (<code>#m=...</code>). La base giuridica è l'Art. 6 par. 1 lett. b e f del GDPR (strettamente necessario per fornire il servizio richiesto).</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">4. Hosting, CDN (Cloudflare Pages) e file di log del server</h4><p>Questa web app è ospitata tramite Cloudflare Pages (Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA). All'apertura del sito vengono elaborati dati tecnici di connessione (indirizzo IP, data e ora, browser) sulla base del nostro legittimo interesse a garantire sicurezza e affidabilità ai sensi dell'Art. 6 par. 1 lett. f del GDPR. Cloudflare è certificata ai sensi dell'<strong>EU-US Data Privacy Framework (DPF)</strong>.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">5. Programmi di affiliazione, reti partner e link di tracciamento</h4><p>Per offrire Agreesy gratuitamente, partecipiamo a programmi di affiliate marketing sulla base del nostro legittimo interesse economico ai sensi dell'Art. 6 par. 1 lett. f del GDPR:<br><br><strong>a) Programma Affiliazione Amazon:</strong> Partecipiamo al Programma Affiliazione Amazon EU S.à r.l. (38 avenue John F. Kennedy, L-1855 Lussemburgo). Cliccando su un link Amazon viene trasmesso il nostro parametro partner (<code>tag=f05b1-21</code>).<br><br><strong>b) Rete di affiliazione AWIN e Publisher MasterTag:</strong> Utilizziamo la rete AWIN AG (Eichhornstraße 3, 10785 Berlino, Germania) e lo script AWIN MasterTag (<code>dwin2.com</code>) per attribuire gli ordini idonei al riconoscimento delle commissioni. Informativa privacy di AWIN: <a href="https://www.awin.com/it/privacy" target="_blank" rel="noopener" class="text-primary-role underline">awin.com/it/privacy</a>.<br><br><strong>c) Rete di affiliazione e monetizzazione Takeads / Mitgo:</strong> Integriamo link partner e tecnologie di monetizzazione (<code>convertlink.com</code>) di Takeads GmbH / Mitgo Group (Karl-Liebknecht-Str. 1, 10178 Berlino, Germania). Cliccando su un link partner gestito da Takeads, avviene un reindirizzamento tramite l'infrastruttura di tracciamento di Takeads con l'elaborazione dei parametri tecnici necessari (indirizzo IP per prevenzione frodi e instradamento geografico, timestamp, URL referrer e ID clic pseudonimizzato). Informativa privacy di Takeads: <a href="https://www.takeads.com/privacy-policy/" target="_blank" rel="noopener" class="text-primary-role underline">takeads.com/privacy-policy</a>.<br><br>Una volta reindirizzati al sito del commerciante esterno, si applicano esclusivamente le informative sulla privacy e sui cookie di tale sito.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">6. Web Font e risorse tecniche</h4><p>Per una visualizzazione uniforme utilizziamo Google Fonts (Google Ireland Limited, Dublino, Irlanda) sulla base dell'Art. 6 par. 1 lett. f del GDPR.</p></div>
                    <div><h4 class="font-medium text-primary-role mb-1">7. Diritti dell'interessato ai sensi del GDPR (Art. 15–21 e Art. 77 GDPR)</h4><p>Hai il diritto di chiedere in qualsiasi momento l'<strong>accesso</strong> (Art. 15), la <strong>rettifica</strong> (Art. 16), la <strong>cancellazione</strong> (Art. 17), la <strong>limitazione del trattamento</strong> (Art. 18), la <strong>portabilità dei dati</strong> (Art. 20), di <strong>opporti al trattamento</strong> basato sull'Art. 6 (1) (f) GDPR (Art. 21), nonché di proporre <strong>reclamo a un'autorità di controllo</strong> (Art. 77 GDPR). Contatto: <a href="mailto:felix.goossens@aol.com" class="text-primary-role underline">felix.goossens@aol.com</a>.</p></div>
                `
            }
        }
    };

    const doc = (LEGAL_DATA[type] && (LEGAL_DATA[type][currentLang] || LEGAL_DATA[type].de)) || LEGAL_DATA.impressum.de;
    titleEl.innerText = doc.title;
    contentEl.innerHTML = doc.html;

    modal.classList.remove('hidden');
}

function closeLegalModal() {
    const modal = document.getElementById('modal-legal');
    if (modal) modal.classList.add('hidden');
}

/**************************************************************
 * 12. PWA INSTALLATION CONTROLLER (OS-Tailored UX)
 **************************************************************/
let deferredPwaPrompt = null;
let currentPwaTab = 'ios';

function isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches) ||
           (window.navigator.standalone === true) ||
           document.referrer.includes('android-app://');
}

function detectUserPlatform() {
    const ua = navigator.userAgent || navigator.vendor || window.opera || '';
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        return 'ios';
    }
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
        return 'ios';
    }
    if (/android/i.test(ua)) {
        return 'android';
    }
    return 'desktop';
}

function initPwaInstall() {
    if (isRunningStandalone()) {
        const footerBtn = document.getElementById('footer-pwa-btn');
        if (footerBtn) footerBtn.classList.add('hidden');
        return;
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPwaPrompt = e;
        updatePwaDirectInstallButtons(true);
        checkAndShowPwaBanner();
    });

    window.addEventListener('appinstalled', () => {
        deferredPwaPrompt = null;
        dismissPwaBanner(true);
        const footerBtn = document.getElementById('footer-pwa-btn');
        if (footerBtn) footerBtn.classList.add('hidden');
    });

    setTimeout(() => {
        checkAndShowPwaBanner();
    }, 2500);
}

function checkAndShowPwaBanner() {
    if (isRunningStandalone()) return;
    const dismissedAt = localStorage.getItem('agreesy_pwa_dismissed');
    if (dismissedAt) {
        const diffDays = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
        if (diffDays < 7) {
            return;
        }
    }
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
        banner.classList.remove('hidden');
    }
}

function dismissPwaBanner(permanent) {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.classList.add('hidden');
    localStorage.setItem('agreesy_pwa_dismissed', Date.now().toString());
}

function handlePwaInstallClick() {
    if (deferredPwaPrompt) {
        triggerNativeInstallPrompt();
    } else {
        openPwaModal();
    }
}

function triggerNativeInstallPrompt() {
    if (!deferredPwaPrompt) {
        openPwaModal();
        return;
    }
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            dismissPwaBanner(true);
            closePwaModal();
        }
        deferredPwaPrompt = null;
        updatePwaDirectInstallButtons(false);
    });
}

function updatePwaDirectInstallButtons(available) {
    const androidBtn = document.getElementById('pwa-android-install-direct-btn');
    const desktopBtn = document.getElementById('pwa-desktop-install-direct-btn');
    if (androidBtn) {
        if (available) {
            androidBtn.classList.remove('hidden');
            androidBtn.classList.add('flex');
        } else {
            androidBtn.classList.add('hidden');
            androidBtn.classList.remove('flex');
        }
    }
    if (desktopBtn) {
        if (available) {
            desktopBtn.classList.remove('hidden');
            desktopBtn.classList.add('flex');
        } else {
            desktopBtn.classList.add('hidden');
            desktopBtn.classList.remove('flex');
        }
    }
}

function openPwaModal(forcedTab) {
    const modal = document.getElementById('modal-pwa-install');
    if (!modal) return;
    
    const targetTab = forcedTab || detectUserPlatform();
    switchPwaTab(targetTab);
    updatePwaDirectInstallButtons(!!deferredPwaPrompt);
    modal.classList.remove('hidden');
}

function closePwaModal() {
    const modal = document.getElementById('modal-pwa-install');
    if (modal) modal.classList.add('hidden');
}

function switchPwaTab(tab) {
    currentPwaTab = tab;
    const tabs = ['ios', 'android', 'desktop'];
    tabs.forEach(t => {
        const btn = document.getElementById(`pwa-tab-${t}`);
        const content = document.getElementById(`pwa-content-${t}`);
        if (btn) {
            if (t === tab) {
                btn.className = "flex-1 py-1.5 rounded-[8px] text-[12px] font-semibold text-center transition-all surface text-primary-role shadow-sm border border-[var(--border)]";
            } else {
                btn.className = "flex-1 py-1.5 rounded-[8px] text-[12px] font-medium text-center transition-all text-secondary-role hover:text-primary-role";
            }
        }
        if (content) {
            if (t === tab) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        }
    });
}
