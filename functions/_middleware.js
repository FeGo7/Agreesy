// Cloudflare Pages Middleware: Canonical Redirect, Dynamic WhatsApp/Social OG Previews & Free Markdown Negotiation
const MARKDOWN_DOC = `# Agreesy (https://agreesy.com)

> Einigen ohne Diskussion – Decide without debating. Free 30-second swipe decider for solo users, couples, roommates, and groups (1–6 players) in 5 languages (DE, EN, ES, FR, IT). Zero accounts, zero servers, 100% privacy-first via URL-hash sync.

## Key Features
- **1 to 6 Players (Solo, Duo, Group):** Solo 1v1 knockout duel, 2-player Sudden Death Match, or Group consensus voting (3–6 players) via one WhatsApp link.
- **Super-Like & Veto Jokers:** 1x Super-Like (double weight, golden Super-Match) and 1x Veto per round.
- **Surprise-Me Roulette with Exclusion Filter:** Cross out what you don't want today, spin the slot randomizer on the rest.
- **Viral Match Share Card (PNG):** 1-tap 1080x1080 shareable image card for WhatsApp & Instagram Stories.
- **Fair Split (Chores / Anti-Match):** Voluntarily claim chores; rejected tasks are fairly divided by roulette.
- **15+ Decks & 300+ Concrete Stage-2 Picks:** Dinner, Vegan, Movies, Series, Holiday Movies, Board Games, Video Games, Date Night, Cocktails, Vacation, Gifts, Group Gifts & Secret Santa, Christmas Dinner, New Year's Eve, and Household Chores.

## Links
- Web App: https://agreesy.com/
- Guides & Topic Hub: https://agreesy.com/guides
- Extended AI Docs: https://agreesy.com/llms-full.txt
- Sitemap: https://agreesy.com/sitemap.xml
`;

const DECK_OG_META = {
  dinner: { e: '🍔', de: 'Was essen wir heute?', en: 'What to Eat Picker', es: '¿Qué comemos hoy?', fr: 'On mange quoi ?', it: 'Cosa mangiamo oggi?' },
  breakfast: { e: '🥐', de: 'Frühstück & Brunch', en: 'Breakfast & Brunch', es: 'Desayuno y Brunch', fr: 'Petit-Déj & Brunch', it: 'Colazione & Brunch' },
  lunch: { e: '🥗', de: 'Mittagessen & Lunch', en: 'Lunch Break Picker', es: 'Comida y Almuerzo', fr: 'Pause Déjeuner', it: 'Pausa Pranzo' },
  streaming: { e: '🎬', de: 'Film-Entscheider', en: 'Movie Picker', es: '¿Qué película ver?', fr: 'Choix du Film', it: 'Quale film vedere?' },
  movie: { e: '🎬', de: 'Film-Entscheider', en: 'Movie Picker', es: '¿Qué película ver?', fr: 'Choix du Film', it: 'Quale film vedere?' },
  series: { e: '📺', de: 'Serien-Finder', en: 'TV Series Picker', es: 'Selector de Series', fr: 'Choix de Série', it: 'Quale serie vedere?' },
  chores: { e: '🧹', de: 'Haushalts-Aufteilung', en: 'Household Chore Split', es: 'Reparto de Tareas', fr: 'Répartition des Tâches', it: 'Divisione Faccende' },
  household: { e: '🧹', de: 'Haushalts-Aufteilung', en: 'Household Chore Split', es: 'Reparto de Tareas', fr: 'Répartition des Tâches', it: 'Divisione Faccende' },
  date: { e: '💘', de: 'Date-Night Entscheider', en: 'Date Night Picker', es: 'Plan de Cita', fr: 'Idée Date Night', it: 'Serata in Coppia' },
  cocktails: { e: '🍸', de: 'Cocktail-Finder', en: 'Cocktail Picker', es: 'Cócteles en Pareja', fr: 'Cocktails à Deux', it: 'Cocktail per Due' },
  vegan: { e: '🥗', de: 'Veggie & Vegan Essen', en: 'Vegan Dinner Picker', es: 'Cena Vegana', fr: 'Dîner Végétarien', it: 'Cena Vegana' },
  wintermovies: { e: '🎄', de: 'Weihnachtsfilme-Match', en: 'Holiday Movie Picker', es: 'Películas de Navidad', fr: 'Films de Noël', it: 'Film di Natale' },
  gaming: { e: '🎮', de: 'Gaming-Entscheider', en: 'Video Game Picker', es: '¿A qué juego jugar?', fr: 'Choix Jeu Vidéo', it: 'A cosa giocare?' },
  boardgames: { e: '🎲', de: 'Spieleabend & Brettspiele', en: 'Board Game Night', es: 'Juegos de Mesa', fr: 'Soirée Jeux de Société', it: 'Giochi da Tavolo' },
  vacation: { e: '✈️', de: 'Urlaubs- & Reiseziel-Finder', en: 'Travel Destination Picker', es: '¿Dónde viajar?', fr: 'Choix de Destination', it: 'Meta di Viaggio' },
  gifts: { e: '🎁', de: 'Geschenkideen-Finder', en: 'Gift Ideas Finder', es: 'Ideas de Regalos', fr: 'Idées Cadeaux', it: 'Idee Regalo' },
  groupgifts: { e: '🎀', de: 'Gruppengeschenk & Wichteln', en: 'Group Gift & Secret Santa', es: 'Regalo en Grupo', fr: 'Cadeau Commun', it: 'Regalo di Gruppo' },
  nye: { e: '🥂', de: 'Silvester-Planer', en: 'New Year\'s Eve Planner', es: 'Planes de Nochevieja', fr: 'Soirée du Nouvel An', it: 'Piani di Capodanno' },
  christmasdinner: { e: '🎄', de: 'Weihnachtsessen-Planer', en: 'Christmas Dinner Picker', es: 'Cena de Navidad', fr: 'Repas de Noël', it: 'Cena di Natale' },
  custom: { e: '✨', de: 'Eigene Abstimmung', en: 'Custom Group Poll', es: 'Votación Personalizada', fr: 'Sondage Personnalisé', it: 'Sondaggio Personalizzato' }
};

const SITE_OG_META = {
  de: {
    title: 'Agreesy – Einigen ohne Diskussion in 30 Sekunden',
    desc: 'Was essen, schauen oder schenken? Alle swipen geheim – das erste gemeinsame Match gewinnt in 30 Sek. Kostenlos, ohne Anmeldung & 100% lokal.',
    image: 'https://agreesy.com/og-image.png',
    locale: 'de_DE'
  },
  en: {
    title: 'Agreesy – Decide Without Debating in 30 Seconds',
    desc: 'What to eat, watch, or gift? Everyone swipes privately – the first mutual match wins in 30s. Free, no signup & 100% private.',
    image: 'https://agreesy.com/og-image-en.png',
    locale: 'en_US'
  },
  es: {
    title: 'Agreesy – Decidid sin discutir en 30 segundos',
    desc: '¿Qué cenar, ver o regalar? Cada uno desliza en secreto – el primer match común gana en 30s. Gratis, sin registro y 100% privado.',
    image: 'https://agreesy.com/og-image-es.png',
    locale: 'es_ES'
  },
  fr: {
    title: 'Agreesy – Décidez sans débattre en 30 secondes',
    desc: 'Quoi manger, regarder ou offrir ? Chacun swipe en secret – le premier match commun gagne en 30s. Gratuit, sans compte et 100% privé.',
    image: 'https://agreesy.com/og-image-fr.png',
    locale: 'fr_FR'
  },
  it: {
    title: 'Agreesy – Decidete senza discutere in 30 secondi',
    desc: 'Cosa mangiare, guardare o regalare? Ognuno fa swipe in segreto – il primo match comune vince in 30s. Gratis, senza account e 100% privato.',
    image: 'https://agreesy.com/og-image-it.png',
    locale: 'it_IT'
  }
};

function buildDynamicOg(deckKey, fromRaw, langRaw) {
  const meta = DECK_OG_META[deckKey];
  if (!meta) return null;
  const lang = ['de', 'en', 'es', 'fr', 'it'].includes(langRaw) ? langRaw : 'de';
  const siteMeta = SITE_OG_META[lang] || SITE_OG_META.de;
  const deckTitle = meta[lang] || meta.en;
  const from = (fromRaw || '').replace(/[<>"]/g, '').trim().slice(0, 28);
  const isChores = deckKey === 'chores' || deckKey === 'household';

  const titles = {
    de: from ? `${meta.e} ${from} lädt dich ein: ${deckTitle} – Agreesy` : `${meta.e} ${deckTitle} in 30 Sek. – Agreesy`,
    en: from ? `${meta.e} ${from} invited you: ${deckTitle} – Agreesy` : `${meta.e} ${deckTitle} in 30s – Agreesy`,
    es: from ? `${meta.e} ${from} te invita: ${deckTitle} – Agreesy` : `${meta.e} ${deckTitle} en 30s – Agreesy`,
    fr: from ? `${meta.e} ${from} vous invite : ${deckTitle} – Agreesy` : `${meta.e} ${deckTitle} en 30s – Agreesy`,
    it: from ? `${meta.e} ${from} ti invita: ${deckTitle} – Agreesy` : `${meta.e} ${deckTitle} in 30s – Agreesy`
  };
  const descs = isChores ? {
    de: 'Wähle geheim, welche Aufgaben du freiwillig übernimmst – der Rest wird fair per Zufall aufgeteilt. Ohne App-Download!',
    en: 'Claim chores you don\'t mind doing – leftover tasks are split fairly by roulette. Zero app install!',
    es: 'Elige las tareas que no te importa hacer y repartid el resto a suertes sin discutir. ¡Sin descargar app!',
    fr: 'Choisissez vos tâches volontaires – le reste est réparti équitablement au hasard. Sans téléchargement !',
    it: 'Scegli i compiti volontari e dividete il resto in modo equo a sorte. Senza scaricare app!'
  } : {
    de: 'Tippe drauf & swipe 30 Sek. geheim mit. Das erste gemeinsame Match gewinnt sofort – kostenlos & ohne Anmeldung!',
    en: 'Tap & swipe privately for 30 seconds. First mutual match wins instantly – free with zero signup!',
    es: 'Toca y desliza en secreto durante 30 segundos. ¡El primer match común gana al instante y sin registro!',
    fr: 'Touchez et swipez en secret pendant 30 secondes. Le premier match commun gagne aussitôt, sans inscription !',
    it: 'Tocca e fai swipe in segreto per 30 secondi. Il primo match comune vince subito, gratis e senza registrazione!'
  };

  return { title: titles[lang], desc: descs[lang], image: siteMeta.image, locale: siteMeta.locale };
}

export async function onRequest(context) {
  const accept = context.request.headers.get('Accept') || '';
  const url = new URL(context.request.url);

  // 0. Canonical Host Redirect: Force www.agreesy.com -> agreesy.com (301) to prevent duplicate SEO crawling
  if (url.hostname === 'www.agreesy.com') {
    url.hostname = 'agreesy.com';
    return Response.redirect(url.toString(), 301);
  }

  // 1. Level 2: API Catalog JSON endpoint (RFC 9727 linkset)
  if (url.pathname === '/.well-known/api-catalog') {
    const catalog = {
      "linkset": [
        {
          "anchor": "https://agreesy.com/",
          "service-desc": [
            {
              "href": "https://agreesy.com/llms.txt",
              "type": "text/markdown"
            }
          ],
          "service-doc": [
            {
              "href": "https://agreesy.com/llms.txt",
              "type": "text/markdown"
            }
          ]
        }
      ]
    };
    return new Response(JSON.stringify(catalog, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/linkset+json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  }

  // 2. Level 2: Auth.md for AI Agent login & registration instructions
  if (url.pathname === '/auth.md') {
    const authMd = `# auth.md\n\n## Overview\nAgreesy is a lightweight, client-side decision-making application for couples and groups. AI agents are welcome to navigate, parse content, and reference decision decks.\n\n## Target Audience\nThis document is for autonomous AI agents, LLM assistants, and automated tools discovering Agreesy services.\n\n## Agent Registration\n- **Registration Method:** Anonymous / Open Access\n- **Registration Endpoint:** https://agreesy.com/\n- **Claim URI:** https://agreesy.com/\n- **Identity Types Supported:** anonymous\n- **Credential Types Supported:** none\n\n## Authentication & Credentials\n- **Credentials Required:** None (Zero Login Required)\n- **Token Endpoint:** Not applicable (Public client-side app)\n- **State Storage:** Game state is transferred purely via client URL fragments (#m=..., #c=...).\n`;
    return new Response(authMd, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  }

  // 2b. OAuth Protected Resource Metadata (PRM)
  if (url.pathname === '/.well-known/oauth-protected-resource') {
    const prm = {
      "resource": "https://agreesy.com/",
      "authorization_servers": [
        "https://agreesy.com"
      ],
      "scopes_supported": [
        "public"
      ],
      "bearer_methods_supported": [
        "header"
      ]
    };
    return new Response(JSON.stringify(prm, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  }

  // 2c. OAuth Authorization Server Metadata with agent_auth block
  if (url.pathname === '/.well-known/oauth-authorization-server') {
    const oauthMeta = {
      "issuer": "https://agreesy.com",
      "authorization_endpoint": "https://agreesy.com/",
      "token_endpoint": "https://agreesy.com/",
      "agent_auth": {
        "skill": "https://agreesy.com/auth.md",
        "register_uri": "https://agreesy.com/",
        "claim_uri": "https://agreesy.com/",
        "identity_types_supported": [
          "anonymous"
        ],
        "anonymous": {
          "credential_types_supported": [
            "none"
          ]
        }
      }
    };
    return new Response(JSON.stringify(oauthMeta, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  }

  // 2d. Agentic Resource Discovery (ARD v0.91) & legacy ai-catalog.json manifest
  if (
    url.pathname === '/.well-known/ard.json' ||
    url.pathname === '/.well-known/ai-catalog.json' ||
    url.pathname === '/ai-catalog.json'
  ) {
    const ardCatalog = {
      specVersion: '0.91',
      host: {
        displayName: 'Agreesy',
        identifier: 'agreesy.com',
        documentationUrl: 'https://agreesy.com/llms.txt',
        logoUrl: 'https://agreesy.com/icon-512.png'
      },
      entries: [
        {
          identifier: 'urn:air:agreesy.com:docs:llms-overview',
          displayName: 'Agreesy Decision Maker Overview & Deck Directory',
          type: 'text/markdown',
          url: 'https://agreesy.com/llms.txt',
          description: "Concise machine-readable guide to Agreesy's 30-second swipe decision maker, direct deck deep links, and multilingual topic guides.",
          representativeQueries: [
            'help couples decide what to eat or watch in 30 seconds',
            'find a free no-signup swipe decision maker for groups',
            'split household chores fairly between roommates or partners'
          ]
        },
        {
          identifier: 'urn:air:agreesy.com:docs:llms-full',
          displayName: 'Agreesy Extended Technical Specification',
          type: 'text/markdown',
          url: 'https://agreesy.com/llms-full.txt',
          description: "Full technical documentation of Agreesy's 0-byte backend URL-hash architecture, all decision modes, and curated Stage-2 recommendations.",
          representativeQueries: [
            'how does Agreesy sync votes without a server or database',
            'what decision decks and curated picks does Agreesy support'
          ]
        },
        {
          identifier: 'urn:air:agreesy.com:api:catalog',
          displayName: 'Agreesy Service Discovery Linkset',
          type: 'application/linkset+json',
          url: 'https://agreesy.com/.well-known/api-catalog',
          description: "RFC 9727 linkset advertising Agreesy's service description and documentation endpoints.",
          representativeQueries: [
            'discover Agreesy service description endpoints',
            'find Agreesy machine-readable documentation links'
          ]
        }
      ]
    };
    return new Response(JSON.stringify(ardCatalog, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  }

  // 2e. Guard unknown /.well-known/* discovery probes so Cloudflare Pages does not return 200 HTML
  if (url.pathname.startsWith('/.well-known/')) {
    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  }

  // 3. Level 1: Markdown Content-Negotiation
  if (
    (url.pathname === '/' || url.pathname === '/index.html') &&
    accept.includes('text/markdown') &&
    !accept.includes('text/html')
  ) {
    return new Response(MARKDOWN_DOC, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
        'X-Markdown-Negotiation': 'active'
      }
    });
  }

  // 4. Level 2: Link Headers for Agent Discovery
  const response = await context.next();
  if (url.pathname === '/' || url.pathname === '/index.html') {
    const newHeaders = new Headers(response.headers);
    newHeaders.append('Link', '<https://agreesy.com/llms.txt>; rel="describedby"');
    newHeaders.append('Link', '<https://agreesy.com/sitemap.xml>; rel="sitemap"');
    newHeaders.append('Link', '<https://agreesy.com/.well-known/ard.json>; rel="ard"');
    newHeaders.append('Link', '<https://agreesy.com/.well-known/api-catalog>; rel="service-desc"');
    newHeaders.append('Link', '<https://agreesy.com/auth.md>; rel="authorisation"');
    newHeaders.append('Link', '<https://agreesy.com/.well-known/oauth-protected-resource>; rel="oauth-protected-resource"');
    newHeaders.append('Link', '<https://agreesy.com/.well-known/oauth-authorization-server>; rel="oauth-authorization-server"');

    const outRes = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });

    // 5. Dynamic WhatsApp / Telegram / iMessage / Social OpenGraph Preview (?d=...&from=...&lang=... or ?lang=...)
    const deckParam = (url.searchParams.get('d') || url.searchParams.get('deck') || '').toLowerCase();
    const langParam = (url.searchParams.get('lang') || '').toLowerCase();
    if (typeof HTMLRewriter !== 'undefined') {
      const og = deckParam
        ? buildDynamicOg(deckParam, url.searchParams.get('from'), langParam)
        : (['en', 'es', 'fr', 'it'].includes(langParam) ? SITE_OG_META[langParam] : null);
      if (og) {
        const shareCanonicalUrl = url.toString();
        return new HTMLRewriter()
          .on('title', { element(el) { el.setInnerContent(og.title); } })
          .on('meta[name="description"]', { element(el) { el.setAttribute('content', og.desc); } })
          .on('meta[property="og:title"]', { element(el) { el.setAttribute('content', og.title); } })
          .on('meta[property="og:description"]', { element(el) { el.setAttribute('content', og.desc); } })
          .on('meta[property="og:image"]', { element(el) { el.setAttribute('content', og.image); } })
          .on('meta[property="og:locale"]', { element(el) { el.setAttribute('content', og.locale); } })
          .on('meta[property="og:url"]', { element(el) { el.setAttribute('content', shareCanonicalUrl); } })
          .on('meta[name="twitter:title"]', { element(el) { el.setAttribute('content', og.title); } })
          .on('meta[name="twitter:description"]', { element(el) { el.setAttribute('content', og.desc); } })
          .on('meta[name="twitter:image"]', { element(el) { el.setAttribute('content', og.image); } })
          .transform(outRes);
      }
    }

    return outRes;
  }

  return response;
}
