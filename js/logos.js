/**************************************************************
 * Agreesy – Brand Mark Module
 * Synced to the interlocked-rings App Icon (icon-64.webp / icon.svg)
 **************************************************************/

const BRAND_ICON_SMALL = `<img src="icon-64.webp" alt="Agreesy" width="28" height="28" class="w-7 h-7 rounded-[7px] shadow-sm block">`;
const BRAND_ICON_LARGE = `<img src="icon-64.webp" alt="Agreesy" width="36" height="36" class="w-9 h-9 rounded-[9px] shadow-sm block">`;

const LOGO_VARIANTS = {
    vennMark: {
        id: 'vennMark',
        title: { de: 'Agreesy Logo', en: 'Agreesy Logo', es: 'Logo de Agreesy' },
        desc: { de: 'Verwobene Ringe (Weiß & Coral) – offizielles Agreesy App-Icon.', en: 'Interlocked rings (White & Coral) – official Agreesy icon.', es: 'Anillos entrelazados – icono oficial de Agreesy.' },
        svgSmall: BRAND_ICON_SMALL,
        svgLarge: BRAND_ICON_LARGE
    }
};

let currentLogoId = 'vennMark';

function getActiveLogo() {
    return LOGO_VARIANTS.vennMark;
}

function setActiveLogo() {
    currentLogoId = 'vennMark';
    localStorage.setItem('agreesy_logo_v2', 'vennMark');

    const headerIconEl = document.getElementById('header-logo-icon');
    if (headerIconEl && !headerIconEl.querySelector('img')) {
        headerIconEl.innerHTML = BRAND_ICON_SMALL;
    }
}

function cycleNextLogo() {
    setActiveLogo('vennMark');
}

function renderLogoShowcase() {
    // Showcase retired; single unified brand mark active
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveLogo('vennMark');
});
