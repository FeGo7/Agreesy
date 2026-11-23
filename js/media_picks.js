/**************************************************************
 * Agreesy – Stage 2 Contemporary Movie & Series Engine (2024–2026)
 * Easily maintainable catalog of current releases per genre.
 * Last updated: 2026-Q1
 *
 * Rules:
 * - "movie" (and alias "streaming") cards ONLY suggest concrete MOVIES (2024–2026).
 *   (Exception: movie card #4 is explicitly "90s/2000s Cult Classics").
 * - "series" cards ONLY suggest concrete SERIES / new seasons (2024–2026).
 **************************************************************/

const MEDIA_PICKS_META = {
    lastUpdated: '2026-03',
    releaseWindow: '2024–2026'
};

const MEDIA_STAGE2_PICKS = {
    movie: {
        // 0: Mindfuck-Thriller mit Plot-Twist (2024-2026 Movies ONLY)
        0: [
            { id: 'm0_1', title: 'Conclave', year: '2024', emoji: '🗝️', vibe: 'Oscar-Hit · Vatikan-Verschwörung & krasser Twist' },
            { id: 'm0_2', title: 'Blink Twice', year: '2024', emoji: '🏝️', vibe: 'Psycho-Thriller · Milliardärs-Insel mit dunklem Geheimnis' },
            { id: 'm0_3', title: 'Carry-On', year: '2024', emoji: '✈️', vibe: 'Hochspannung · Erpressung am Flughafen-Sicherheitsscanner' },
            { id: 'm0_4', title: 'Caddo Lake', year: '2024', emoji: '🛶', vibe: 'Mindfuck-Mystery · Verschwinden im Sumpf & Zeiträtsel' },
            { id: 'm0_5', title: 'Black Bag', year: '2025', emoji: '🕵️', vibe: 'Spionage-Thriller · Soderbergh-Verwirrspiel unter Agenten-Eheleuten' },
            { id: 'm0_6', title: 'Drop', year: '2025', emoji: '📱', vibe: 'Echtzeit-Thriller · Tödliche AirDrop-Nachrichten beim ersten Date' },
            { id: 'm0_7', title: 'Companion', year: '2025', emoji: '🤖', vibe: 'Sci-Fi-Thriller · Wochenendtrip am See eskaliert völlig' },
            { id: 'm0_8', title: 'Juror #2', year: '2024', emoji: '⚖️', vibe: 'Moral-Thriller · Geschworener erkennt eigene Schuld im Mordprozess' }
        ],
        // 1: Gute-Laune-Komödie (2024-2026 Movies ONLY)
        1: [
            { id: 'm1_1', title: 'The Fall Guy', year: '2024', emoji: '🕶️', vibe: 'Action-Comedy · Ryan Gosling als Stuntman auf Abwegen' },
            { id: 'm1_2', title: 'Hit Man', year: '2024', emoji: '🎭', vibe: 'Smart & Witzig · Fake-Auftragskiller verliebt sich in Kundin' },
            { id: 'm1_3', title: 'One of Them Days', year: '2025', emoji: '💸', vibe: 'Buddy-Comedy · 12 Stunden Chaos, um die Miete zu retten' },
            { id: 'm1_4', title: 'Jackpot!', year: '2024', emoji: '🎰', vibe: 'Action-Spaß · Lottogewinn in LA mit verrückter Kopfgeldjagd' },
            { id: 'm1_5', title: 'icky Stanicky', year: '2024', emoji: '🍻', vibe: 'Kult-Klamauk · Erfundener bester Freund wird plötzlich real' },
            { id: 'm1_6', title: 'You\'re Cordially Invited', year: '2025', emoji: '🎂', vibe: 'Hochzeits-Chaos · Zwei Familien buchen dieselbe Trauminsel' },
            { id: 'm1_7', title: 'Thelma', year: '2024', emoji: '🛵', vibe: 'Feel-Good-Hit · 93-jährige Oma auf Rachemission gegen Telefonbetrüger' },
            { id: 'm1_8', title: 'Brothers', year: '2024', emoji: '🚐', vibe: 'Chaos-Komödie · Ungleiche Zwillingsbrüder auf schrägem Raubzug' }
        ],
        // 2: Packende True-Crime-Doku (2024-2026 Feature Docs ONLY)
        2: [
            { id: 'm2_1', title: 'What Jennifer Did', year: '2024', emoji: '🚨', vibe: 'True-Crime-Film · Verhörprotokolle eines schockierenden Falls' },
            { id: 'm2_2', title: 'Lover, Stalker, Killer', year: '2024', emoji: '💻', vibe: 'True-Crime-Doku · Online-Dating wird zum jahrelangen Albtraum' },
            { id: 'm2_3', title: 'Chaos: The Manson Murders', year: '2025', emoji: '📂', vibe: 'Enthüllungs-Doku · Errol Morris deckt völlig neue Hintergründe auf' },
            { id: 'm2_4', title: 'The Menendez Brothers', year: '2024', emoji: '🎙️', vibe: 'True-Crime-Film · Die Brüder sprechen erstmals selbst über den Fall' },
            { id: 'm2_5', title: 'Sweet Bobby: My Catfish Nightmare', year: '2024', emoji: '🕵️‍♀️', vibe: 'Mindfuck-Doku · Einer der unglaublichsten Identitätsbetrüge Europas' },
            { id: 'm2_6', title: 'Jailbreak: Love on the Run', year: '2024', emoji: '🚓', vibe: 'True-Crime-Film · Gefängnisbeamtin flieht mit verurteiltem Häftling' },
            { id: 'm2_7', title: 'Into the Fire: The Lost Daughter', year: '2024', emoji: '🔥', vibe: 'Gänsehaut-Doku · Eine Mutter klärt auf eigene Faust ein Verbrechen auf' },
            { id: 'm2_8', title: 'Con Mum', year: '2025', emoji: '🥂', vibe: 'True-Crime-Doku · Luxus-Hochstaplerin taucht als verlorene Mutter auf' }
        ],
        // 3: Sci-Fi oder Action-Blockbuster (2024-2026 Movies ONLY)
        3: [
            { id: 'm3_1', title: 'Dune: Part Two', year: '2024', emoji: '🏜️', vibe: 'Heimkino-Gigant · Episches Sci-Fi-Meisterwerk von Denis Villeneuve' },
            { id: 'm3_2', title: 'Furiosa: A Mad Max Saga', year: '2024', emoji: '🔥', vibe: 'High-Octane Action · Nonstop-Adrenalin im Wasteland' },
            { id: 'm3_3', title: 'Mickey 17', year: '2025', emoji: '🚀', vibe: 'Sci-Fi-Highlight · Robert Pattinson als geklonter Weltraum-Arbeiter' },
            { id: 'm3_4', title: 'Civil War', year: '2024', emoji: '📸', vibe: 'A24-Blockbuster · Packender Roadtrip durch ein gespaltenes Amerika' },
            { id: 'm3_5', title: 'Gladiator II', year: '2024', emoji: '⚔️', vibe: 'Arena-Blockbuster · Kolosseum-Spektakel von Ridley Scott' },
            { id: 'm3_6', title: 'The Gorge', year: '2025', emoji: '🏞️', vibe: 'Sci-Fi-Action · Zwei Scharfschützen bewachen eine mysteriöse Schlucht' },
            { id: 'm3_7', title: 'Alien: Romulus', year: '2024', emoji: '👽', vibe: 'Sci-Fi-Spannung · Zurück zu den düsteren Weltraum-Wurzeln' },
            { id: 'm3_8', title: 'Kingdom of the Planet of the Apes', year: '2024', emoji: '🦍', vibe: 'Abenteuer-Blockbuster · Gigantische Bilder & neue Ära' }
        ],
        // 4: Kultfilm aus den 90ern / 2000ern (Explicit Nostalgia Category)
        4: [
            { id: 'm4_1', title: 'Ocean\'s Eleven', year: '2001', emoji: '🎰', vibe: 'Kult-Klassiker · Der coolste Casino-Raubzug aller Zeiten' },
            { id: 'm4_2', title: 'The Matrix', year: '1999', emoji: '🕶️', vibe: 'Sci-Fi-Meilenstein · Rote oder blaue Pille?' },
            { id: 'm4_3', title: 'Catch Me If You Can', year: '2002', emoji: '✈️', vibe: 'Feel-Good-Kult · DiCaprio & Tom Hanks im genialen Katz-und-Maus-Spiel' },
            { id: 'm4_4', title: 'Gladiator', year: '2000', emoji: '⚔️', vibe: 'Epos · Gänsehaut-Soundtrack von Hans Zimmer' },
            { id: 'm4_5', title: '10 Dinge, die ich an dir hasse', year: '1999', emoji: '🎸', vibe: '90er-RomCom-Kult · Heath Ledger & Julia Stiles' },
            { id: 'm4_6', title: 'The Dark Knight', year: '2008', emoji: '🦇', vibe: 'Meisterwerk · Heath Ledger als legendärer Joker' },
            { id: 'm4_7', title: 'Pulp Fiction', year: '1994', emoji: '🍔', vibe: 'Tarantino-Kult · Coole Dialoge & legendärer Soundtrack' },
            { id: 'm4_8', title: 'Der Teufel trägt Prada', year: '2006', emoji: '👠', vibe: '2000er-Liebling · Meryl Streep & Anne Hathaway in Bestform' }
        ],
        // 5: Grusel-, Mystery- oder Smarter Horrorfilm (2024-2026 Movies ONLY)
        5: [
            { id: 'm5_1', title: 'Heretic', year: '2024', emoji: '🕯️', vibe: 'Smart Horror · Hugh Grant in einem teuflisch cleveren Katz-und-Maus-Spiel' },
            { id: 'm5_2', title: 'Longlegs', year: '2024', emoji: '🗂️', vibe: 'Mystery-Horror · Düsterer FBI-Okkult-Thriller im 90er-Stil' },
            { id: 'm5_3', title: 'The Substance', year: '2024', emoji: '💉', vibe: 'Kult-Schocker · Demi Moore im extremsten Body-Horror-Hit des Jahres' },
            { id: 'm5_4', title: 'Nosferatu', year: '2024', emoji: '🦇', vibe: 'Gothic-Meisterwerk · Atmosphärischer Gänsehaut-Film von Robert Eggers' },
            { id: 'm5_5', title: 'A Quiet Place: Day One', year: '2024', emoji: '🤫', vibe: 'Survival-Horror · Tag 1 der Invasion mitten in New York' },
            { id: 'm5_6', title: 'Presence', year: '2025', emoji: '👻', vibe: 'Mystery-Experiment · Spukhaus-Thriller komplett aus Geister-Perspektive' },
            { id: 'm5_7', title: 'Smile 2', year: '2024', emoji: '😈', vibe: 'Hochspannung · Popstar gerät in einen unaufhaltsamen Albtraum' },
            { id: 'm5_8', title: 'Speak No Evil', year: '2024', emoji: '🏡', vibe: 'Psycho-Grusel · Wochenendbesuch bei Urlaubsbekannten kippt insBöse' }
        ],
        // 6: Krimi-Rätsel à la Knives Out (2024-2026 Movies ONLY)
        6: [
            { id: 'm6_1', title: 'Wake Up Dead Man: A Knives Out Mystery', year: '2025', emoji: '🔍', vibe: 'Whodunit-Highlight · Benoit Blancs neuester, düsterster Rätselfall' },
            { id: 'm6_2', title: 'Conclave', year: '2024', emoji: '🗳️', vibe: 'Rätsel hinter verschlossenen Türen · Wer sabotiert die Papstwahl?' },
            { id: 'm6_3', title: 'The Thursday Murder Club', year: '2025', emoji: '🕵️‍♀️', vibe: 'Cozy-Crime-Hit · Vier clevere Senioren lösen einen echten Mordfall' },
            { id: 'm6_4', title: 'Juror #2', year: '2024', emoji: '⚖️', vibe: 'Gerichts-Krimi · Clint Eastwoods packendes Indizien-Rätsel' },
            { id: 'm6_5', title: 'A Haunting in Venice', year: '2024', emoji: '🎭', vibe: 'Agatha-Christie-Flair · Hercule Poirot ermittelt im nächtlichen Palazzo' },
            { id: 'm6_6', title: 'Reunion', year: '2024', emoji: '🥂', vibe: 'Whodunit-Comedy · Mord beim eingeschneiten Klassentreffen' },
            { id: 'm6_7', title: 'Greedy People', year: '2024', emoji: '💰', vibe: 'Krimi-Komödie · Kleinstadt-Polizisten, eine Leiche & eine Million Dollar' },
            { id: 'm6_8', title: 'Knox Goes Away', year: '2024', emoji: '🧩', vibe: 'Neo-Noir-Rätsel · Michael Keaton im Wettlauf gegen das eigene Gedächtnis' }
        ],
        // 7: Meisterwerk-Animation (2024-2026 Movies ONLY)
        7: [
            { id: 'm7_1', title: 'The Wild Robot (Der wilde Roboter)', year: '2024', emoji: '🤖', vibe: 'Meisterwerk · Visuell überwältigend, witzig & voller Herz' },
            { id: 'm7_2', title: 'Flow', year: '2024', emoji: '🐈‍⬛', vibe: 'Oscar-Gewinner · Magische Reise einer kleinen schwarzen Katze ohne ein Wort' },
            { id: 'm7_3', title: 'Inside Out 2 (Alles steht Kopf 2)', year: '2024', emoji: '🧠', vibe: 'Pixar-Hit · Neue Emotionen sorgen für brillantes Gefühlschaos' },
            { id: 'm7_4', title: 'Wallace & Gromit: Vengeance Most Fowl', year: '2024', emoji: '🐧', vibe: 'Kult-Stop-Motion · Bösewicht-Pinguin Feathers McGraw ist zurück' },
            { id: 'm7_5', title: 'Memoir of a Snail', year: '2024', emoji: '🐌', vibe: 'Indie-Perle · Tiefgründige, warmherzige Stop-Motion-Tragikomödie' },
            { id: 'm7_6', title: 'Transformers One', year: '2024', emoji: '⚡', vibe: 'Überraschungs-Hit · Rasant animierte Origin-Story auf Cybertron' },
            { id: 'm7_7', title: 'Orion and the Dark', year: '2024', emoji: '🌙', vibe: 'DreamWorks-Perle · Einfallsreiches Abenteuer durch die Nacht' },
            { id: 'm7_8', title: 'The Boy and the Heron', year: '2024', emoji: '🦩', vibe: 'Studio Ghibli · Hayao Miyazakis bildgewaltiges Fantasy-Meisterwerk' }
        ],
        // 8: Rom-Com oder Liebesfilm mit gutem Humor (2024-2026 Movies ONLY)
        8: [
            { id: 'm8_1', title: 'Anyone But You (Wo die Lüge hinfällt)', year: '2024', emoji: '🏖️', vibe: 'Rom-Com-Hit · Sydney Sweeney & Glen Powell als Fake-Paar in Australien' },
            { id: 'm8_2', title: 'We Live in Time', year: '2024', emoji: '🎠', vibe: 'Herz & Humor · Florence Pugh & Andrew Garfield mit unglaublicher Chemie' },
            { id: 'm8_3', title: 'The Idea of You', year: '2024', emoji: '🎤', vibe: 'Prime-Liebling · Anne Hathaway in einer charmanten Sommer-Romanze' },
            { id: 'm8_4', title: 'Upgraded', year: '2024', emoji: '✈️', vibe: 'Wohlfühl-RomCom · Zufälliges First-Class-Upgrade führt zu Liebeswirren in London' },
            { id: 'm8_5', title: 'Fly Me to the Moon', year: '2024', emoji: '🌙', vibe: 'Retro-Charme · Scarlett Johansson & Channing Tatum beim Apollo-11-Countdown' },
            { id: 'm8_6', title: 'Bridget Jones: Mad About the Boy', year: '2025', emoji: '📓', vibe: 'Comeback · Witzig, warmherzig und voller britischem Selbstironie-Charme' },
            { id: 'm8_7', title: 'Materialists', year: '2025', emoji: '💍', vibe: 'A24-RomCom · Dakota Johnson, Pedro Pascal & Chris Evans in New York' },
            { id: 'm8_8', title: 'La Dolce Villa', year: '2025', emoji: '🍋', vibe: 'Italien-Romantik · 1-Euro-Haus in der Toskana sorgt für Urlaubsgefühle' }
        ],
        // 9: Atemberaubende Natur-, Weltraum- oder Reisereportage (2024-2026 Docs ONLY)
        9: [
            { id: 'm9_1', title: 'Wilding', year: '2024', emoji: '🦌', vibe: 'Natur-Wunder · Wie ein Paar ein ganzes Landgut zurück in echte Wildnis verwandelt' },
            { id: 'm9_2', title: 'Skywalkers: A Love Story', year: '2024', emoji: '🏙️', vibe: 'Schwindelfrei · Spektakuläre 4K-Aufnahmen auf den höchsten Wolkenkratzern der Welt' },
            { id: 'm9_3', title: 'The Remarkable Life of Ibelin', year: '2024', emoji: '🌌', vibe: 'Preisgekrönt · Eine der bewegendsten Dokumentationen der letzten Jahre' },
            { id: 'm9_4', title: 'Apollo 13: Survival', year: '2024', emoji: '🚀', vibe: 'Weltraum-Doku · Originalaufnahmen & Funkverkehr der dramatischsten NASA-Mission' },
            { id: 'm9_5', title: 'The Blue Angels', year: '2024', emoji: '✈️', vibe: 'IMAX-Feeling · Atemberaubende Cockpit-Aufnahmen in 4K' },
            { id: 'm9_6', title: 'Billy & Molly: An Otter Love Story', year: '2024', emoji: '🦦', vibe: 'National Geographic · Herzerwärmende Naturaufnahme auf den Shetlandinseln' },
            { id: 'm9_7', title: 'Mountain Queen: The Summits of Lhakpa Sherpa', year: '2024', emoji: '🏔️', vibe: 'Everest-Doku · Gigantische Himalaya-Bilder & unglaubliche Lebensgeschichte' },
            { id: 'm9_8', title: 'Ocean with David Attenborough', year: '2025', emoji: '🐋', vibe: '4K-Meisterwerk · Attenboroughs neueste Reise in die Tiefsee' }
        ],
        // 10: Heist-Movie (Bankraub, Casino-Trick & coole Gangster) (2024-2026 Movies ONLY)
        10: [
            { id: 'm10_1', title: 'The Instigators', year: '2024', emoji: '💰', vibe: 'Heist-Action · Matt Damon & Casey Affleck bei einem chaotischen Raubüberfall' },
            { id: 'm10_2', title: 'Wolfs', year: '2024', emoji: '🐺', vibe: 'Cooles Duo · George Clooney & Brad Pitt als rivalisierende Unterwelt-Fixer' },
            { id: 'm10_3', title: 'Den of Thieves 2: Pantera', year: '2025', emoji: '💎', vibe: 'Diamanten-Raub · Gerard Butler plant den größten Coup an der Côte d\'Azur' },
            { id: 'm10_4', title: 'Lift', year: '2024', emoji: '✈️', vibe: 'High-Tech-Heist · Goldraub aus einem Passagierflugzeug in 12.000 Metern Höhe' },
            { id: 'm10_5', title: 'Hit Man', year: '2024', emoji: '🕶️', vibe: 'Cleverer Trick · Täuschungsmanöver, falsche Identitäten & ein perfekter Plan' },
            { id: 'm10_6', title: 'Riff Raff', year: '2025', emoji: '🥃', vibe: 'Gangster-Comedy · Ruhestand eines Ex-Kriminellen wird an Silvester gesprengt' },
            { id: 'm10_7', title: 'Love Lies Bleeding', year: '2024', emoji: '💪', vibe: 'A24-Crime · Pulsierender Neo-Noir-Thriller in der Wüste von New Mexico' },
            { id: 'm10_8', title: 'The Amateur', year: '2025', emoji: '💻', vibe: 'Smarter Rache-Plan · CIA-Kryptograf (Rami Malek) überlistet Profis weltweit' }
        ],
        // 11: Preisgekröntes Highlight (Oscar-Gewinner / A24-Film) (2024-2026 Movies ONLY)
        11: [
            { id: 'm11_1', title: 'Anora', year: '2024', emoji: '🏆', vibe: '5× Oscar-Gewinner · Rasante, urkomische & berührende Palme-d\'Or-Sensation' },
            { id: 'm11_2', title: 'Challengers', year: '2024', emoji: '🎾', vibe: 'Kino-Rausch · Zendaya im elektrisierenden Liebesdreieck mit treibendem Beat' },
            { id: 'm11_3', title: 'A Real Pain', year: '2024', emoji: '🎒', vibe: 'Oscar-prämiert · Kieran Culkin & Jesse Eisenberg als ungleiche Cousins auf Reise' },
            { id: 'm11_4', title: 'The Brutalist', year: '2024', emoji: '🏛️', vibe: 'Oscar-Meisterwerk · Adrien Brody in einem monumentalen Kino-Epos' },
            { id: 'm11_5', title: 'Civil War', year: '2024', emoji: '📷', vibe: 'A24-Highlight · Intensives Kino, das noch tagelang nachwirkt' },
            { id: 'm11_6', title: 'Past Lives', year: '2024', emoji: '🌃', vibe: 'A24-Perle · Einer der schönsten, klügsten Filme über Schicksal & Liebe' },
            { id: 'm11_7', title: 'Sing Sing', year: '2024', emoji: '🎭', vibe: 'Kritiker-Liebling · Colman Domingo in einer tief bewegenden wahren Geschichte' },
            { id: 'm11_8', title: 'Anatomy of a Fall (Anatomie eines Falls)', year: '2024', emoji: '❄️', vibe: 'Oscar-Gewinner · Fesselndes Gerichts- & Beziehungsdrama in den Alpen' }
        ],
        // 12: Survival-, Abenteuer- oder Katastrophen-Thriller (2024-2026 Movies ONLY)
        12: [
            { id: 'm12_1', title: 'Twisters', year: '2024', emoji: '🌪️', vibe: 'Katastrophen-Action · Glen Powell & Daisy Edgar-Jones mitten im Monster-Tornado' },
            { id: 'm12_2', title: 'Society of the Snow (Die Schneegesellschaft)', year: '2024', emoji: '🏔️', vibe: 'Survival-Meisterwerk · Unglaublicher Überlebenskampf in den Anden' },
            { id: 'm12_3', title: 'Last Breath', year: '2025', emoji: '🤿', vibe: 'Tiefsee-Survival · Wettlauf gegen die Zeit 100 Meter unter der Nordsee' },
            { id: 'm12_4', title: 'Arthur the King', year: '2024', emoji: '🐕', vibe: 'Abenteuer nach wahrer Geschichte · 700 km durch den Dschungel mit Streunerhund' },
            { id: 'm12_5', title: 'Eden', year: '2024', emoji: '🏝️', vibe: 'Insel-Thriller · Aussteiger-Paradies auf den Galápagos-Inseln eskaliert' },
            { id: 'm12_6', title: 'Land of Bad', year: '2024', emoji: '🚁', vibe: 'Survival-Action · Russell Crowe & Liam Hemsworth hinter feindlichen Linien' },
            { id: 'm12_7', title: 'One Fast Move', year: '2024', emoji: '🏍️', vibe: 'Adrenalin · Packendes Motorrad-Renn-Drama auf Prime Video' },
            { id: 'm12_8', title: 'Elevation', year: '2024', emoji: '⛰️', vibe: 'Sci-Fi-Survival · Überleben in den Rocky Mountains oberhalb von 2.400 Metern' }
        ],
        // 13: Biopic / Wahre Geschichte (Musik, Sport oder Genie) (2024-2026 Movies ONLY)
        13: [
            { id: 'm13_1', title: 'A Complete Unknown', year: '2024', emoji: '🎸', vibe: 'Musik-Biopic · Timothée Chalamet als junger Bob Dylan im New York der 60er' },
            { id: 'm13_2', title: 'Better Man', year: '2024', emoji: '🎤', vibe: 'Kreativ & Mitreißend · Das spektakulär inszenierte Robbie-Williams-Biopic' },
            { id: 'm13_3', title: 'Dune / Oppenheimer Double – Oppenheimer', year: '2024', emoji: '💥', vibe: '7× Oscar-Sieger · Christopher Nolans packendes Biopic-Meisterwerk' },
            { id: 'm13_4', title: 'Unstoppable', year: '2024', emoji: '🥇', vibe: 'Sport-Triumph · Wahre Geschichte des Ringers Anthony Robles auf Prime Video' },
            { id: 'm13_5', title: 'One Life', year: '2024', emoji: '🚂', vibe: 'Gänsehaut pur · Anthony Hopkins in einer unglaublichen wahren Rettungsgeschichte' },
            { id: 'm13_6', title: 'Young Woman and the Sea', year: '2024', emoji: '🏊‍♀️', vibe: 'Sport-Biopic · Daisy Ridley durchschwimmt als erste Frau den Ärmelkanal' },
            { id: 'm13_7', title: 'Saturday Night', year: '2024', emoji: '📺', vibe: 'Echtzeit-Biopic · Die chaotischen 90 Minuten vor der allerersten SNL-Show' },
            { id: 'm13_8', title: 'The Iron Claw', year: '2024', emoji: '🤼', vibe: 'A24-Drama · Zac Efron & Jeremy Allen White in der wahren Geschichte der Von-Erich-Brüder' }
        ]
    },

    series: {
        // 0: Spannende Miniserie (1 Staffel) (2024-2026 Series ONLY)
        0: [
            { id: 's0_1', title: 'Adolescence', year: '2025', emoji: '🎬', vibe: 'Meisterwerk in 4 Folgen · Jede Episode in einer einzigen Einstellung gedreht' },
            { id: 's0_2', title: 'The Day of the Jackal', year: '2024', emoji: '🎯', vibe: 'Hochspannung · Eddie Redmayne im rasanten Katz-und-Maus-Spiel quer durch Europa' },
            { id: 's0_3', title: 'Baby Reindeer (Rentierbaby)', year: '2024', emoji: '🦌', vibe: 'Emmy-Sensation · Wahre, abgründige Stalking-Geschichte in 7 kurzen Folgen' },
            { id: 's0_4', title: 'Ripley', year: '2024', emoji: '🇮🇹', vibe: 'Edler Thriller · Andrew Scott als Hochstapler an der italienischen Amalfiküste' },
            { id: 's0_5', title: 'Presumed Innocent (Aus Mangel an Beweisen)', year: '2024', emoji: '⚖️', vibe: 'Justiz-Thriller · Jake Gyllenhaal wird selbst zum Hauptverdächtigen im Mordfall' },
            { id: 's0_6', title: 'Black Doves', year: '2024', emoji: '🕊️', vibe: 'Spionage-Miniserie · Keira Knightley & Ben Whishaw im winterlichen London' },
            { id: 's0_7', title: 'Zero Day', year: '2025', emoji: '💻', vibe: 'Polit-Thriller · Robert De Niro jagt die Drahtzieher einer landesweiten Cyber-Attacke' },
            { id: 's0_8', title: 'A Good Girl\'s Guide to Murder', year: '2024', emoji: '🔍', vibe: 'Whodunit-Miniserie · 6 spannende Folgen zum Miträtseln' }
        ],
        // 1: Witzige Comfort-Sitcom (2024-2026 Series ONLY)
        1: [
            { id: 's1_1', title: 'Nobody Wants This', year: '2024', emoji: '🎙️', vibe: 'Feel-Good-Hit · Kristen Bell & Adam Brody in der charmantesten Comedy-Serie des Jahres' },
            { id: 's1_2', title: 'The Studio', year: '2025', emoji: '🎬', vibe: 'Hollywood-Comedy · Seth Rogen verzweifelt als neuer Chef eines Chaos-Filmstudios' },
            { id: 's1_3', title: 'A Man on the Inside (Undercover im Seniorenheim)', year: '2024', emoji: '🕵️‍♂️', vibe: 'Herzerwärmend & Witzig · Ted Danson ermittelt undercover in einer Seniorenresidenz' },
            { id: 's1_4', title: 'Running Point', year: '2025', emoji: '🏀', vibe: 'Sport-Comedy · Kate Hudson übernimmt überraschend ein Profi-Basketballteam' },
            { id: 's1_5', title: 'Shrinking (Staffel 2)', year: '2024', emoji: '🛋️', vibe: 'Herausragend · Jason Segel & Harrison Ford zwischen Lachen und Rührung' },
            { id: 's1_6', title: 'St. Denis Medical', year: '2024', emoji: '🩺', vibe: 'Mockumentary-Sitcom · Wie „The Office“, nur mitten im Krankenhaus-Alltag' },
            { id: 's1_7', title: 'Hacks (Staffel 3)', year: '2024', emoji: '🎤', vibe: 'Emmy-Sieger · Messerscharfer Humor hinter den Kulissen von Las Vegas' },
            { id: 's1_8', title: 'Only Murders in the Building (Staffel 4)', year: '2024', emoji: '🏢', vibe: 'Cozy-Crime-Comedy · Steve Martin, Martin Short & Selena Gomez ermitteln wieder' }
        ],
        // 2: Dark Mystery oder Sci-Fi-Rätsel (2024-2026 Series ONLY)
        2: [
            { id: 's2_1', title: 'Severance (Staffel 2)', year: '2025', emoji: '🛗', vibe: 'Sci-Fi-Phänomen · Das genialste Mystery-Rätsel im aktuellen Streaming' },
            { id: 's2_2', title: 'Fallout', year: '2024', emoji: '☢️', vibe: 'Prime-Video-Megahit · Schwarzer Humor, Bunker-Geheimnisse & grandiose Endzeit-Welt' },
            { id: 's2_3', title: 'Silo (Staffel 2)', year: '2024', emoji: '🔩', vibe: 'Cliffhanger-Garantie · Was liegt wirklich außerhalb des unterirdischen Bunkers?' },
            { id: 's2_4', title: '3 Body Problem', year: '2024', emoji: '🪐', vibe: 'Sci-Fi-Rätsel · Mysteriöse Countdowns & eine Bedrohung aus den Tiefen des Alls' },
            { id: 's2_5', title: 'Dark Matter', year: '2024', emoji: '🚪', vibe: 'Mindfuck-Sci-Fi · Ein Physiker wird in eine Parallelversion seines eigenen Lebens entführt' },
            { id: 's2_6', title: 'Paradise', year: '2025', emoji: '🏛️', vibe: 'Rätsel-Thriller · Der spektakulärste Pilotfolgen-Twist des Jahres' },
            { id: 's2_7', title: 'From (Staffel 3)', year: '2024', emoji: '🌲', vibe: 'Mystery-Suchtgefahr · Eine Kleinstadt, die niemanden wieder gehen lässt' },
            { id: 's2_8', title: 'Bodies', year: '2024', emoji: '⏳', vibe: 'Zeitreise-Krimi · Vier Detektive finden in vier Epochen exakt dieselbe Leiche' }
        ],
        // 3: Reality-TV, Dating-Show oder Survival (2024-2026 Series ONLY)
        3: [
            { id: 's3_1', title: '7 vs. Wild: Crashed (Staffel 4)', year: '2024', emoji: '✈️', vibe: 'Survival-Hit · Flugzeugwrack-Aussetzung bei eisiger Kälte in Neuseeland' },
            { id: 's3_2', title: 'Beast Games', year: '2024', emoji: '💰', vibe: 'Prime-Rekordshow · 1.000 Teilnehmer kämpfen um 5 Millionen Dollar' },
            { id: 's3_3', title: 'The Traitors (Die Verräter)', year: '2024', emoji: '🗡️', vibe: 'Psychospiel · Wer lügt allen mitten ins Gesicht?' },
            { id: 's3_4', title: 'Love Is Blind: Germany', year: '2025', emoji: '💍', vibe: 'Dating-Experiment · Verloben, ohne sich vorher jemals gesehen zu haben' },
            { id: 's3_5', title: 'Squid Game: The Challenge', year: '2024', emoji: '🦑', vibe: 'Nervenkitzel · Echte Kandidaten in den kultigen Spielen um 4,56 Mio. Dollar' },
            { id: 's3_6', title: 'LOL: Last One Laughing (Neue Staffeln)', year: '2025', emoji: '😂', vibe: '6 Stunden nicht lachen · Perfekt zum Abschalten auf der Couch' },
            { id: 's3_7', title: 'Million Dollar Secret', year: '2025', emoji: '🧳', vibe: 'Bluff-Reality · Einer im Luxus-Resort versteckt heimlich eine Million Dollar' },
            { id: 's3_8', title: 'Kaulitz & Kaulitz', year: '2024', emoji: '🥂', vibe: 'Guilty-Pleasure-Hit · Unterhaltsamer Blick hinter die Kulissen in LA' }
        ],
        // 4: Hochbewertetes Prestige-Drama / Mafia (2024-2026 Series ONLY)
        4: [
            { id: 's4_1', title: 'The Penguin', year: '2024', emoji: '🐧', vibe: 'IMDb 8.7 · Colin Farrell im düsteren Mafia-Aufstieg in Gotham City' },
            { id: 's4_2', title: 'The Gentlemen', year: '2024', emoji: '🥃', vibe: 'Guy-Ritchie-Style · Britischer Adel trifft auf ein unterirdisches Imperium' },
            { id: 's4_3', title: 'Landman', year: '2024', emoji: '🛢️', vibe: 'Prestige-Drama · Billy Bob Thornton im Milliarden-Geschäft der texanischen Öl-Barone' },
            { id: 's4_4', title: 'The Bear (Staffel 3)', year: '2024', emoji: '🔪', vibe: 'Ausnahme-Serie · Hochspannung, Perfektionismus & Emotionen in der Sterneküche' },
            { id: 's4_5', title: 'MobLand', year: '2025', emoji: '🕴️', vibe: 'Gangster-Drama · Tom Hardy, Pierce Brosnan & Helen Mirren im Londoner Unterweltkrieg' },
            { id: 's4_6', title: 'Squid Game (Staffel 2)', year: '2024', emoji: '🎭', vibe: 'Welt-Event · Gi-hun kehrt zurück in das tödliche Spiel' },
            { id: 's4_7', title: 'The Pitt', year: '2025', emoji: '🏥', vibe: 'Echtzeit-Drama · 15 Stunden Schicht in der Notaufnahme – jede Folge 1 Stunde' },
            { id: 's4_8', title: 'Mr. & Mrs. Smith', year: '2024', emoji: '💼', vibe: 'Prime-Highlight · Donald Glover & Maya Erskine als frisch verheiratete Spione' }
        ],
        // 5: Düsterer Skandi-Krimi oder Detektiv-Serie (2024-2026 Series ONLY)
        5: [
            { id: 's5_1', title: 'Dept. Q', year: '2025', emoji: '📁', vibe: 'Cold-Case-Thriller · Neues Ermittlerteam rollt ungelöste Fälle in Edinburgh auf' },
            { id: 's5_2', title: 'Slow Horses (Staffel 4)', year: '2024', emoji: '🧥', vibe: 'IMDb-Liebling · Gary Oldman als brillant-abgehalfterter MI5-Chef' },
            { id: 's5_3', title: 'True Detective: Night Country', year: '2024', emoji: '❄️', vibe: 'Eisige Spannung · Jodie Foster ermittelt in der ewigen Polarnacht Alaskas' },
            { id: 's5_4', title: 'The Åre Murders (Die Åre-Morde)', year: '2025', emoji: '🏔️', vibe: 'Schwedischer Nordic Noir · Spurensuche im verschneiten Skigebiet' },
            { id: 's5_5', title: 'The Breakthrough (Der Durchbruch)', year: '2025', emoji: '🧬', vibe: 'Skandi-Krimi nach wahrem Fall · Wie ein Ahnenforscher einen 16 Jahre alten Doppelmord löst' },
            { id: 's5_6', title: 'Criminal Record', year: '2024', emoji: '🚓', vibe: 'London-Thriller · Zwei Ermittler prallen bei einem alten Mordgeständnis aufeinander' },
            { id: 's5_7', title: 'Cross', year: '2024', emoji: '🧩', vibe: 'Prime-Krimi · Detective Alex Cross jagt einen extrem manipulativen Serienmörder' },
            { id: 's5_8', title: 'Under the Bridge', year: '2024', emoji: '🌉', vibe: 'Atmosphärischer Crime · Lily Gladstone ermittelt in einem schockierenden Kriminalfall' }
        ],
        // 6: Fantasy-, Mittelalter- oder Historien-Epos (2024-2026 Series ONLY)
        6: [
            { id: 's6_1', title: 'Shōgun', year: '2024', emoji: '⚔️', vibe: '18× Emmy-Rekordsieger · Monumentales Meisterwerk im feudalen Japan' },
            { id: 's6_2', title: 'House of the Dragon (Staffel 2)', year: '2024', emoji: '🐉', vibe: 'Fantasy-Blockbuster · Der Tanz der Drachen bricht mit voller Wucht aus' },
            { id: 's6_3', title: 'Der Herr der Ringe: Die Ringe der Macht (Staffel 2)', year: '2024', emoji: '💍', vibe: 'Prime-Epos · Saurons Aufstieg und die Belagerung von Eregion' },
            { id: 's6_4', title: '1923 (Staffel 2)', year: '2025', emoji: '🐎', vibe: 'Western-Epos · Harrison Ford & Helen Mirren verteidigen die Yellowstone-Ranch' },
            { id: 's6_5', title: 'A Thousand Blows', year: '2025', emoji: '🥊', vibe: 'Peaky-Blinders-Macher · Untergrund-Boxen & Banden im viktorianischen London' },
            { id: 's6_6', title: 'American Primeval', year: '2025', emoji: '🏹', vibe: 'Rau & Packend · Überlebenskampf im gesetzlosen Wilden Westen 1857' },
            { id: 's6_7', title: 'Dune: Prophecy', year: '2024', emoji: '🌙', vibe: 'Sci-Fi-Historie · Machtspiele der Schwesternschaft 10.000 Jahre vor Paul Atreides' },
            { id: 's6_8', title: 'Those About to Die', year: '2024', emoji: '🏛️', vibe: 'Antikes Rom · Anthony Hopkins, Wagenrennen und Intrigen im Circus Maximus' }
        ],
        // 7: Koch-Show, Back-Wettbewerb oder Food-Reise (2024-2026 Series ONLY)
        7: [
            { id: 's7_1', title: 'Culinary Class Wars', year: '2024', emoji: '👨‍🍳', vibe: 'Mega-Hit · 100 Köche treten im spektakulärsten Kochduell der Welt gegeneinander an' },
            { id: 's7_2', title: 'Somebody Feed Phil (Staffel 7)', year: '2024', emoji: '🍜', vibe: 'Gute Laune & Hunger · Kulinarische Weltreise von Kyoto bis Schottland' },
            { id: 's7_3', title: 'Chef\'s Table: Noodles', year: '2024', emoji: '🍝', vibe: 'Food-Porn in 4K · Die besten Pasta- und Nudelmeister der Welt' },
            { id: 's7_4', title: 'Stanley Tucci: Searching for Italy / Tucci in Italy', year: '2025', emoji: '🍷', vibe: 'Dolce Vita pur · Reisen, Wein und unfassbar gutes italienisches Essen' },
            { id: 's7_5', title: 'Is It Cake? (Staffel 3)', year: '2024', emoji: '🎂', vibe: 'Mitraten auf der Couch · Täuschend echte Alltagsgegenstände aus Kuchen' },
            { id: 's7_6', title: 'Dinner Time Live with David Chang', year: '2024', emoji: '🔥', vibe: 'Ungeschnitten & Locker · Kochen für prominente Gäste ohne Drehbuch' },
            { id: 's7_7', title: 'Clarkson\'s Farm (Staffel 3)', year: '2024', emoji: '🚜', vibe: 'Prime-Publikumsliebling · Urkomisches Chaos auf der eigenen Farm & im Hofladen' },
            { id: 's7_8', title: 'With Love, Meghan / Bite Size Food Docs', year: '2025', emoji: '🍋', vibe: 'Entspanntes Lifestyle-Kochen · Leichte Rezepte & Gastgeber-Ideen' }
        ],
        // 8: Anthologie-Serie (Jede Folge eine eigene Story) (2024-2026 Series ONLY)
        8: [
            { id: 's8_1', title: 'Black Mirror (Staffel 7)', year: '2025', emoji: '🪞', vibe: 'Kult-Anthologie · 6 brandneue, eigenständige Sci-Fi- & Psycho-Geschichten' },
            { id: 's8_2', title: 'Secret Level', year: '2024', emoji: '🎮', vibe: 'Prime-Highlight · 15 bildgewaltige Kurzfilme von den „Love, Death & Robots“-Machern' },
            { id: 's8_3', title: 'Fargo (Staffel 5)', year: '2024', emoji: '❄️', vibe: 'Abgeschlossene Staffel · Juno Temple & Jon Hamm in einer rabenschwarzen Entführungsstory' },
            { id: 's8_4', title: 'Love, Death & Robots (Neue Folgen)', year: '2025', emoji: '🤖', vibe: '15-Minuten-Meisterwerke · Jede Folge ein eigener Stil und ein krasser Twist' },
            { id: 's8_5', title: 'True Detective: Night Country', year: '2024', emoji: '🔦', vibe: 'Eigenständiger Fall · Komplett unabhängig von früheren Staffeln schaubar' },
            { id: 's8_6', title: 'Feud: Capote vs. The Swans', year: '2024', emoji: '🦢', vibe: 'Abgeschlossene Miniserie · Skandal in der New Yorker High Society' },
            { id: 's8_7', title: 'Monsters: The Lyle and Erik Menendez Story', year: '2024', emoji: '🌴', vibe: 'Anthologie-Staffel · Hochspannend inszenierter True-Crime-Fall in Beverly Hills' },
            { id: 's8_8', title: 'The White Lotus (Staffel 3 – Thailand)', year: '2025', emoji: '🌺', vibe: 'Neue Urlaubsgäste, neues Luxusresort, neues Todesopfer' }
        ],
        // 9: Mitreißende Sport- oder Backstage-Dokuserie (2024-2026 Series ONLY)
        9: [
            { id: 's9_1', title: 'Formula 1: Drive to Survive (Staffel 7)', year: '2025', emoji: '🏎️', vibe: 'Adrenalin hinter den Kulissen · Fahrerwechsel, Rivalitäten & Highspeed-Drama' },
            { id: 's9_2', title: 'Starting 5', year: '2024', emoji: '🏀', vibe: 'NBA Hautnah · LeBron James, Jayson Tatum & Co. durch eine komplette Saison begleitet' },
            { id: 's9_3', title: 'Sprint', year: '2024', emoji: '⚡', vibe: 'Hundertstelsekunden · Die schnellsten Menschen der Welt auf dem Weg zu Olympia-Gold' },
            { id: 's9_4', title: 'Court of Gold', year: '2025', emoji: '🥇', vibe: 'Gänsehaut-Doku · Hinter den Kulissen des dramatischsten Basketball-Turniers bei Olympia' },
            { id: 's9_5', title: 'Receiver', year: '2024', emoji: '🏈', vibe: 'Von den „Quarterback“-Machern · Spektakuläre NFL-Einblicke auf und neben dem Platz' },
            { id: 's9_6', title: 'Simone Biles Rising', year: '2024', emoji: '🤸‍♀️', vibe: 'Inspirierend · Das große Comeback der erfolgreichsten Turnerin aller Zeiten' },
            { id: 's9_7', title: 'Pop Star Academy: KATSEYE', year: '2024', emoji: '🎤', vibe: 'Backstage-Drama · Knallhartes Casting und Training einer globalen Popgruppe' },
            { id: 's9_8', title: 'Senna', year: '2024', emoji: '🏁', vibe: 'Packende Miniserie · Das Leben der Formel-1-Legende Ayrton Senna' }
        ],
        // 10: Starke Anime- oder Adult-Animation-Serie (2024-2026 Series ONLY)
        10: [
            { id: 's10_1', title: 'Arcane (Staffel 2)', year: '2024', emoji: '💥', vibe: 'IMDb 9.0 Meisterwerk · Das bildgewaltige große Finale von Vi und Jinx' },
            { id: 's10_2', title: 'Invincible (Staffel 3)', year: '2025', emoji: '🦸‍♂️', vibe: 'Prime-Megahit · Kompromisslose Superhelden-Action für Erwachsene' },
            { id: 's10_3', title: 'Solo Leveling (Staffel 1 & 2)', year: '2025', emoji: '🗡️', vibe: 'Anime-Phänomen · Vom schwächsten Jäger der Welt zur unaufhaltsamen Macht' },
            { id: 's10_4', title: 'Dan Da Dan', year: '2024', emoji: '🛸', vibe: 'Kreativ-Feuerwerk · Abgedrehte Mischung aus Aliens, Geistern, Action & Humor' },
            { id: 's10_5', title: 'Frieren: Beyond Journey\'s End', year: '2024', emoji: '🪄', vibe: '#1 auf MyAnimeList · Wunderschönes, tiefgründiges Fantasy-Meisterwerk' },
            { id: 's10_6', title: 'Creature Commandos', year: '2024', emoji: '🐺', vibe: 'James Gunns DC-Start · Schräges Monster-Einsatzteam mit coolem Soundtrack' },
            { id: 's10_7', title: 'Common Side Effects', year: '2025', emoji: '🍄', vibe: 'Adult-Swim-Thriller · Zwei Außenseiter entdecken einen Pilz, der jede Krankheit heilt' },
            { id: 's10_8', title: 'Tomb Raider: The Legend of Lara Croft', year: '2024', emoji: '🏹', vibe: 'Abenteuer-Animation · Rasante Schatzjagd rund um den Globus' }
        ],
        // 11: Urlaubs-Intrigen & Gesellschafts-Satire (White Lotus Vibe) (2024-2026 Series ONLY)
        11: [
            { id: 's11_1', title: 'The White Lotus (Staffel 3)', year: '2025', emoji: '🌺', vibe: 'Das Original · Luxus-Wellnessresort in Thailand, dunkle Geheimnisse & bissige Satire' },
            { id: 's11_2', title: 'The Perfect Couple (Ein neuer Sommer)', year: '2024', emoji: '🥂', vibe: 'Strand-Krimi · Nicole Kidman & eine Milliardärs-Hochzeit auf Nantucket mit Leiche' },
            { id: 's11_3', title: 'Palm Royale', year: '2024', emoji: '🌴', vibe: 'High-Society-Intrigen · Kristen Wiig kämpft sich in den exklusivsten Club von Palm Beach' },
            { id: 's11_4', title: 'Sirens', year: '2025', emoji: '🛥️', vibe: 'Luxus-Insel-Satire ·Julianne Moore auf einem dekadenten Insel-Anwesen' },
            { id: 's11_5', title: 'Bad Monkey', year: '2024', emoji: '🐒', vibe: 'Florida-Keys-Vibe · Vince Vaughn in einem sonnigen, schrägen Krimi unter Reichen' },
            { id: 's11_6', title: 'Apples Never Fall', year: '2024', emoji: '🎾', vibe: 'Familien-Geheimnisse · Wohlhabende Tennis-Dynastie in Florida unter Verdacht' },
            { id: 's11_7', title: 'Rivals', year: '2024', emoji: '🍾', vibe: 'Skandalös & Unterhaltsam · Machtkämpfe und Affären der britischen TV-Elite' },
            { id: 's11_8', title: 'The Franchise', year: '2024', emoji: '🎥', vibe: 'Messerscharfe Satire · Das absurde Chaos hinter den Kulissen eines Blockbuster-Drehs' }
        ]
    },

    gaming: {
        // 0: Fun-Racer oder Sport-Duell (Mario Kart / FIFA)
        0: [
            { id: 'g0_1', title: 'Mario Kart 8 Deluxe', year: 'Top-Hit', emoji: '🏎️', vibe: 'Der ultimative Couch-Klassiker · Splitscreen-Rennen & Bananenschalen-Duelle' },
            { id: 'g0_2', title: 'EA Sports FC 26', year: 'Sport-Hit', emoji: '⚽', vibe: '1-gegen-1 oder zusammen im Koop auf dem virtuellen Rasen' },
            { id: 'g0_3', title: 'Nintendo Switch Sports', year: 'Motion', emoji: '🎳', vibe: 'Tennis, Bowling, Badminton & Golf direkt im Wohnzimmer' },
            { id: 'g0_4', title: 'Rocket League', year: 'Action', emoji: '🚀', vibe: 'Autoball-Adrenalin · Schnelle 5-Minuten-Matches im Splitscreen' },
            { id: 'g0_5', title: 'TopSpin 2K25', year: 'Sport', emoji: '🎾', vibe: 'Packende Tennis-Matches zu zweit auf den großen Grand-Slam-Courts' },
            { id: 'g0_6', title: 'Tony Hawk\'s Pro Skater 1 + 2', year: 'Kult', emoji: '🛹', vibe: 'Highscore-Jagd zu zweit mit legendärem Soundtrack' },
            { id: 'g0_7', title: 'Gran Turismo 7 / Forza Motorsport', year: 'Racing', emoji: '🏁', vibe: 'Kopf-an-Kopf-Rennen auf den berühmtesten Rennstrecken' },
            { id: 'g0_8', title: 'Crash Team Racing Nitro-Fueled', year: 'Fun-Racer', emoji: '💣', vibe: 'Rasantes Kart-Duell mit Power-Ups und Drift-Action' }
        ],
        // 1: Couch-Koop zusammen meistern
        1: [
            { id: 'g1_1', title: 'It Takes Two', year: 'Game of the Year', emoji: '🤝', vibe: 'Das beste Koop-Spiel aller Zeiten · Kreatives Abenteuer speziell für 2 Spieler' },
            { id: 'g1_2', title: 'Split Fiction', year: 'Koop-Hit', emoji: '✨', vibe: 'Vom „It Takes Two“-Studio · Sci-Fi- & Fantasy-Welten gemeinsam im Splitscreen erleben' },
            { id: 'g1_3', title: 'Overcooked! All You Can Eat', year: 'Chaos-Koop', emoji: '👨‍🍳', vibe: 'Hektischer Küchen-Spaß · Wer schneidet die Tomaten, wer löscht den Brand?' },
            { id: 'g1_4', title: 'Super Mario Bros. Wonder', year: 'Jump & Run', emoji: '🍄', vibe: 'Buntes 2D-Meisterwerk voller Überraschungen für die Couch' },
            { id: 'g1_5', title: 'Unravel Two', year: 'Cozy-Koop', emoji: '🧶', vibe: 'Zwei durch ein Garnband verbundene Figuren lösen gemeinsam Rätsel' },
            { id: 'g1_6', title: 'A Way Out', year: 'Action-Koop', emoji: '🚓', vibe: 'Filmreifer Gefängnisausbruch · Nur zu zweit im Splitscreen spielbar' },
            { id: 'g1_7', title: 'Moving Out 2', year: 'Party-Koop', emoji: '📦', vibe: 'Chaotisches Umzugs-Team · Sofas durch Fenster werfen auf Zeit' },
            { id: 'g1_8', title: 'Baldur\'s Gate 3', year: 'Fantasy-Epos', emoji: '🐉', vibe: 'Gemeinsames Rollenspiel-Abenteuer mit völliger Entscheidungsfreiheit' }
        ],
        // 2: Schnelles Karten- oder Würfelspiel
        2: [
            { id: 'g2_1', title: 'Skyjo', year: 'Bestseller #1', emoji: '🃏', vibe: 'In 1 Minute erklärt, extrem hohes Suchtpotenzial für 2 bis 8 Spieler' },
            { id: 'g2_2', title: 'Qwixx – Das Würfelspiel', year: 'Würfel-Hit', emoji: '🎲', vibe: 'Keine Wartezeit · Bei jedem Wurf können alle gleichzeitig ankreuzen' },
            { id: 'g2_3', title: 'Cabo', year: 'Geheimtipp', emoji: '🦩', vibe: 'Cleveres Gedächtnis- & Bluff-Kartenspiel – ideal zu zweit' },
            { id: 'g2_4', title: 'The Gang (Kooperatives Poker)', year: 'Trend-Spiel', emoji: '🏦', vibe: 'Zusammen statt gegeneinander · Ohne zu reden die Pokerhände sortieren' },
            { id: 'g2_5', title: '5-Minute Dungeon', year: 'Echtzeit', emoji: '⏱️', vibe: 'Kooperatives Karten-Chaos · In exakt 5 Minuten gemeinsam den Boss besiegen' },
            { id: 'g2_6', title: 'Exploding Kittens (oder 2-Spieler-Edition)', year: 'Party-Klassiker', emoji: '🐱', vibe: 'Russisches Roulette mit explodierenden Katzen und fiesen Aktionskarten' },
            { id: 'g2_7', title: 'Kniffel Extreme / Ganz schön clever', year: 'Würfel-Klassiker', emoji: '📝', vibe: 'Der spannende Kettenreaktions-Würfelblock für gemütliche Abende' },
            { id: 'g2_8', title: 'Flip 7 / Trio', year: 'Schnellstart', emoji: '7️⃣', vibe: 'Nervenkitzel pur · Noch eine Karte aufdecken oder Punkte sichern?' }
        ],
        // 3: Quiz-, Schätz- oder Musik-Raten (Hitster)
        3: [
            { id: 'g3_1', title: 'Hitster – Das Musik-Partyspiel', year: 'Bestseller #1', emoji: '🎵', vibe: 'Songs per Spotify scannen und chronologisch in die eigene Zeitleiste legen' },
            { id: 'g3_2', title: 'Smart 10', year: 'Quiz-Hit', emoji: '🧠', vibe: '1 Frage, 10 Antwortmöglichkeiten · Wer zockt zu hoch und verliert seine Punkte?' },
            { id: 'g3_3', title: 'Hitster Summer Party / Guilty Pleasures', year: 'Musik-Edition', emoji: '🕺', vibe: 'Ohrwurm-Garantie mit den größten Party- und Kult-Hits' },
            { id: 'g3_4', title: 'Kneipenquiz – Das Original', year: 'Koop-Quiz', emoji: '🍻', vibe: 'Gemeinsam als Team gegen das Spiel rätseln und kombinieren' },
            { id: 'g3_5', title: 'Top 10', year: 'Partyspiel', emoji: '🔟', vibe: 'Urkomische Einschätzungs-Aufgaben auf einer Skala von 1 bis 10' },
            { id: 'g3_6', title: 'Wer weiß denn sowas? – Das Spiel', year: 'TV-Quiz', emoji: '❓', vibe: 'Kuriose Alltagsfragen, bei denen man wunderbar um die Ecke denken muss' },
            { id: 'g3_7', title: 'Bezzerwizzer Kompakt', year: 'Duell-Quiz', emoji: '💡', vibe: 'Kategorien klauen und beim Gegner punkten' },
            { id: 'g3_8', title: 'Aus der Reihe: Das Schätzspiel', year: 'Schätz-Duell', emoji: '📏', vibe: 'Niemand muss die exakte Zahl kennen – gutes Bauchgefühl gewinnt' }
        ],
        // 4: Strategie-Brettspiel (Catan, Carcassonne, Zug um Zug)
        4: [
            { id: 'g4_1', title: '7 Wonders Duel', year: 'Top für 2', emoji: '🏛️', vibe: 'Speziell für 2 Personen entwickelt · Weltwunder bauen & strategisch siegen' },
            { id: 'g4_2', title: 'Dorfromantik – Das Brettspiel', year: 'Spiel des Jahres', emoji: '🏡', vibe: 'Entspanntes, kooperatives Plättchenlegen mit freischaltbaren Boxen' },
            { id: 'g4_3', title: 'Zug um Zug: Europa', year: 'Klassiker', emoji: '🚂', vibe: 'Eisenbahnstrecken quer durch Europa bauen und Aufträge erfüllen' },
            { id: 'g4_4', title: 'Cascadia', year: 'Spiel des Jahres', emoji: '🐻', vibe: 'Wunderschönes Natur-Legespiel mit Bären,achsen, Hirschen und Füchsen' },
            { id: 'g4_5', title: 'Catan – Das Duell (Für 2 Spieler)', year: 'Aufbauspiel', emoji: '🌾', vibe: 'Das berühmte Siedler-Prinzip maßgeschneidert für zwei Personen' },
            { id: 'g4_6', title: 'Azul', year: 'Taktik-Hit', emoji: '💠', vibe: 'Edle Mosaiksteine sammeln und Muster legen – leicht gelernt, taktisch tief' },
            { id: 'g4_7', title: 'Carcassonne', year: 'Legespiel', emoji: '🏰', vibe: 'Landschaften, Städte und Klöster legen – ideal und schnell zu zweit' },
            { id: 'g4_8', title: 'Flügelschlag (Wingspan)', year: 'Kennerspiel', emoji: '🦅', vibe: 'Wunderschön illustriertes Engine-Building-Spiel' }
        ],
        // 5: Exit-Game / Krimi-Akte am Wohnzimmertisch lösen
        5: [
            { id: 'g5_1', title: 'Hidden Games Tatort – Krimi-Akte', year: 'Echte Fallakte', emoji: '📁', vibe: 'Echte Verhörprotokolle, Fotos, Alibis prüfen & den Täter überführen' },
            { id: 'g5_2', title: 'EXIT – Das Spiel (Kosmos Einsteiger)', year: 'Escape-Hit', emoji: '🔐', vibe: 'Rätsel knacken, Schlösser öffnen und den Raum am Tisch entschlüsseln' },
            { id: 'g5_3', title: 'MicroMacro: Crime City', year: 'Spiel des Jahres', emoji: '🔍', vibe: 'Auf einem riesigen Wimmelbild-Stadtplan mit der Lupe Kriminalfälle rekonstruieren' },
            { id: 'g5_4', title: 'Masters of Crime – Krimi-Fallakte', year: 'True-Crime-Flair', emoji: '🕵️', vibe: 'Mit Google Maps, E-Mails und Beweisen einen komplexen Fall lösen' },
            { id: 'g5_5', title: 'Sherlock – Die Kartenspiel-Krimireihe', year: '30-Min Krimi', emoji: '🎩', vibe: 'Kompakter Kriminalfall im Taschenformat – Hinweise teilen oder ausschließen' },
            { id: 'g5_6', title: 'Escape Room – Das Spiel (2-Spieler-Edition)', year: 'Mit Chrono-Decoder', emoji: '⏳', vibe: '60 Minuten Countdown mit echtem Schlüssel-Decoder' },
            { id: 'g5_7', title: 'Detective Stories – Fall 1: Das Feuer in Adlerstein', year: 'Ermittler-Box', emoji: '🔥', vibe: 'Realistische Beweismittel und digitale Spuren auswerten' },
            { id: 'g5_8', title: 'Adventure Games – Die Monochrome AG', year: 'Story-Rätsel', emoji: '🏢', vibe: 'Wie ein Point-and-Click-Adventure zum gemeinsamen Erkunden am Tisch' }
        ],
        // 6: Mario Party, Jackbox oder Smartphone-Partyspiel
        6: [
            { id: 'g6_1', title: 'Super Mario Party Jamboree', year: 'Party-König', emoji: '🎉', vibe: 'Über 110 Minispiele und spannende Spielbretter für den perfekten Abend' },
            { id: 'g6_2', title: 'The Jackbox Party Pack', year: 'Smartphone-Controller', emoji: '📱', vibe: 'Jeder nutzt sein eigenes Handy als Controller für witzige Zeichen- & Wortduelle' },
            { id: 'g6_3', title: 'Just Dance 2026 Edition', year: 'Musik & Action', emoji: '💃', vibe: 'Handy in die Hand und zu aktuellen Charts im Wohnzimmer antreten' },
            { id: 'g6_4', title: 'Keep Talking and Nobody Explodes', year: 'Kommunikations-Test', emoji: '💣', vibe: 'Einer sieht die Bombe, der andere hat das Handbuch – Nervenkitzel pur!' },
            { id: 'g6_5', title: 'WarioWare: Move It!', year: '5-Sekunden-Chaos', emoji: '🤪', vibe: 'Über 200 völlig abgedrehte Mikro-Spiele im Sekundentakt' },
            { id: 'g6_6', title: 'Boomerang Fu', year: 'Couch-Action', emoji: '🪃', vibe: 'Niedliches Essen bekämpft sich in rasanten 1-Minuten-Arenen' },
            { id: 'g6_7', title: 'Ultimate Chicken Horse', year: 'Hindernis-Bau', emoji: '🐴', vibe: 'Gemeinsam Fallen in das Level bauen und trotzdem das Ziel erreichen' },
            { id: 'g6_8', title: 'Gang Beasts / Party Animals', year: 'Lachgarantie', emoji: '🐶', vibe: 'Wackelige Gelee-Figuren schubsen sich von aberwitzigen Bühnen' }
        ],
        // 7: Story-Game zusammen entscheiden
        7: [
            { id: 'g7_1', title: 'Until Dawn (PS5 / PC Remake)', year: 'Interaktiver Film', emoji: '🏔️', vibe: 'Jede Entscheidung zählt · Wer überlebt die Nacht auf der verschneiten Berghütte?' },
            { id: 'g7_2', title: 'Life is Strange: Double Exposure', year: 'Mystery-Story', emoji: '🦋', vibe: 'Parallele Zeitlinien und ein packender Mordfall mit emotionalen Entscheidungen' },
            { id: 'g7_3', title: 'The Quarry', year: 'Couch-Modus', emoji: '🏕️', vibe: 'Somcamp-Thriller mit eigenem Couch-Koop-Modus (jeder steuert seine Figuren)' },
            { id: 'g7_4', title: 'Detroit: Become Human', year: 'Sci-Fi-Thriller', emoji: '🤖', vibe: 'Hunderte Story-Verzweigungen – jede Szene verändert den Ausgang' },
            { id: 'g7_5', title: 'The Dark Pictures Anthology: House of Ashes', year: 'Movie-Night-Modus', emoji: '🔦', vibe: 'Controller-Weitergabe-Modus speziell für Paare & Gruppen' },
            { id: 'g7_6', title: 'As Dusk Falls', year: 'Mit Handy abstimmen', emoji: '🌵', vibe: 'Packendes Geiseldrama, bei dem ihr per Smartphone über jede Entscheidung abstimmt' },
            { id: 'g7_7', title: 'Heavy Rain / Beyond: Two Souls', year: 'Krimi-Drama', emoji: '🌧️', vibe: 'Spannender interaktiver Thriller auf den Spuren des Origami-Killers' },
            { id: 'g7_8', title: 'Dispatch / Lost Records: Bloom & Rage', year: 'Story-Neuheit', emoji: '📼', vibe: 'Von den „Life is Strange“-Machern – Geheimnisse eines unvergesslichen Sommers' }
        ],
        // 8: Entweder-Oder / 36 Fragen / Paar-Kartenspiel
        8: [
            { id: 'g8_1', title: 'Erzählt euch mehr – Paare-Edition', year: 'Bestseller', emoji: '💬', vibe: 'Tiefgründige, witzige und überraschende Gesprächskarten für den Abend zu zweit' },
            { id: 'g8_2', title: 'We\'re Not Really Strangers (Couples Edition)', year: 'Kult-Spiel', emoji: '❤️', vibe: '3 Level voller ehrlicher Fragen, die man sich im Alltag sonst nie stellt' },
            { id: 'g8_3', title: 'Tiefergehend – Das Gesprächsspiel für Paare', year: 'Date-Night', emoji: '🍷', vibe: 'Perfekt bei einem Glas Wein auf der Couch oder beim Essen' },
            { id: 'g8_4', title: 'Ohne Filter – Das ehrliche Fragenspiel', year: 'Unterhaltung', emoji: '🔥', vibe: 'Spannende Entweder-Oder-Dilemmas und unerwartete Geschichten' },
            { id: 'g8_5', title: 'Vertellis Beziehungs-Edition', year: 'Klassiker', emoji: '✨', vibe: 'Rückblicke, gemeinsame Träume und schöne Momente Revue passieren lassen' },
            { id: 'g8_6', title: '52 Dates für Paare (Freirubbel-Karten)', year: 'Ideen-Box', emoji: '🪙', vibe: 'Karte ziehen, freirubbeln und das Date direkt umsetzen' },
            { id: 'g8_7', title: 'Klartext für Paare', year: 'Humor & Tiefe', emoji: '🗣️', vibe: 'Über 100 Gesprächsimpulse ohne Kitsch' },
            { id: 'g8_8', title: 'Schlagfertig / Wer würde eher? – Paar-Duell', year: 'Lustig', emoji: '😂', vibe: 'Wer von euch beiden würde eher...? Ehrlich und urkomisch' }
        ],
        // 9: Puzzle, Lego-Set oder Wort-Duell (Scrabble / Wordle)
        9: [
            { id: 'g9_1', title: 'LEGO Botanicals Blumenstrauß / Rosenstrauß', year: 'Deko-Bestseller', emoji: '💐', vibe: 'Entspannt zu zweit bauen (mit 2 Anleitungsheften) – verwelkt nie!' },
            { id: 'g9_2', title: 'Codenames Duett (Für 2 Spieler)', year: 'Wort-Koop', emoji: '🕵️‍♂️', vibe: 'Gemeinsam durch clevere 1-Wort-Hinweise alle Geheimagenten finden' },
            { id: 'g9_3', title: 'Ravensburger Escape Puzzle (750 Teile)', year: 'Puzzle + Rätsel', emoji: '🧩', vibe: 'Erst puzzeln, dann die versteckten Rätsel im Motiv lösen' },
            { id: 'g9_4', title: 'Scrabble Original / Buchstaben-Duell', year: 'Wort-Klassiker', emoji: '🔤', vibe: 'Der zeitlose Klassiker um die besten Wörter und Dreifachen Wortwert' },
            { id: 'g9_5', title: 'LEGO Icons Bonsai-Baum oder Orchidee', year: 'Zen-Bauprojekt', emoji: '🪴', vibe: 'Perfekt zum Abschalten mit Musik oder einem Podcast im Hintergrund' },
            { id: 'g9_6', title: 'Bananagrams', year: 'Schnelles Wortspiel', emoji: '🍌', vibe: 'Wie Scrabble ohne Spielbrett – alle bauen gleichzeitig im Wettlauf' },
            { id: 'g9_7', title: 'Ubongo – Das Duell (Für 2)', year: 'Lege-Rätsel', emoji: '📐', vibe: 'Wer puzzelt seine Formen schneller auf das Aufgabenfeld?' },
            { id: 'g9_8', title: 'Rummikub Original', year: 'Zahlen-Klassiker', emoji: '🔢', vibe: 'Zahlenreihen umbauen, anlegen und als Erster alle Steine loswerden' }
        ]
    },

    vacation: {
        // 0: Strandurlaub, Meer & Pool-Liege
        0: [
            { id: 'v0_1', title: 'Mallorca – Traumbuchten & Beach-Hotels', year: 'Balearen', emoji: '🏖️', vibe: 'Türkisfarbene Calas, kurze Flugzeit & entspannte Strandpromenaden', targetType: 'booking' },
            { id: 'v0_2', title: 'Kreta – Sonne, Tavernen & Lagunen', year: 'Griechenland', emoji: '🇬🇷', vibe: 'Elafonissi, Balos-Lagune & griechische Gastfreundschaft direkt am Meer', targetType: 'booking' },
            { id: 'v0_3', title: 'Algarve – Felsbuchten & Goldstrände', year: 'Portugal', emoji: '🇵🇹', vibe: 'Spektakuläre Klippen, Atlantik-Sonnenuntergänge & frischer Fisch', targetType: 'booking' },
            { id: 'v0_4', title: 'Sardinien – Karibik-Feeling im Mittelmeer', year: 'Italien', emoji: '🇮🇹', vibe: 'Glasklares Wasser an der Costa Smeralda & La Maddalena', targetType: 'booking' },
            { id: 'v0_5', title: 'Costa Brava & Tossa de Mar', year: 'Spanien', emoji: '🇪🇸', vibe: 'Malerische kleine Buchten, Pinienwälder und Tapas am Meer', targetType: 'booking' },
            { id: 'v0_6', title: 'Rhodos & Lindos – Sonneninsel', year: 'Griechenland', emoji: '☀️', vibe: 'Über 300 Sonnentage, weiße Dörfer und moderne Adults-Only Beach-Resorts', targetType: 'booking' },
            { id: 'v0_7', title: 'Teneriffa / Gran Canaria – Ewiger Frühling', year: 'Kanaren', emoji: '🌴', vibe: 'Auch im Herbst & Winter angenehm warm mit Pool & Atlantikstrand', targetType: 'booking' },
            { id: 'v0_8', title: 'Split & Makarska Riviera', year: 'Kroatien', emoji: '🇭🇷', vibe: 'Glasklare Adria, Pinien am Strand und historische Altstädte', targetType: 'booking' }
        ],
        // 1: Städtetrip Europa
        1: [
            { id: 'v1_1', title: 'Lissabon', year: 'Portugal', emoji: '🚋', vibe: 'Gelbe Straßenbahn, Aussichtspunkte (Miradouros), Pastéis de Belém & Rooftop-Bars', targetType: 'booking' },
            { id: 'v1_2', title: 'Barcelona', year: 'Spanien', emoji: '🥘', vibe: 'Städtetrip + Stadtstrand · Sagrada Família, Gotisches Viertel & Tapas', targetType: 'booking' },
            { id: 'v1_3', title: 'Rom', year: 'Italien', emoji: '🏛️', vibe: 'La Dolce Vita · Kolosseum, Trastevere-Gassen, Espresso & beste Carbonara', targetType: 'booking' },
            { id: 'v1_4', title: 'Kopenhagen', year: 'Dänemark', emoji: '🚲', vibe: 'Nyhavn, skandinavisches Design, beste Bäckereien & entspannter Hygge-Vibe', targetType: 'booking' },
            { id: 'v1_5', title: 'Amsterdam', year: 'Niederlande', emoji: '🌷', vibe: 'Grachtenfahrt, kleine Cafés in den „9 Straatjes“, Museen & Wochenend-Flair', targetType: 'booking' },
            { id: 'v1_6', title: 'Wien', year: 'Österreich', emoji: '☕', vibe: 'Kaffeehauskultur, Prater, Naschmarkt & imperiale Architektur', targetType: 'booking' },
            { id: 'v1_7', title: 'Prag', year: 'Tschechien', emoji: '🌉', vibe: 'Karlsbrücke im Morgenlicht, wunderschöne Altstadt & top Preis-Leistungs-Verhältnis', targetType: 'booking' },
            { id: 'v1_8', title: 'Florenz', year: 'Italien', emoji: '🍷', vibe: 'Renaissance-Perle · Ponte Vecchio, Piazzale Michelangelo & toskanischer Wein', targetType: 'booking' }
        ],
        // 2: Berghütte, Wandern & Bergsee
        2: [
            { id: 'v2_1', title: 'Südtirol & Dolomiten (Pragser Wildsee)', year: 'Italien', emoji: '🏔️', vibe: '300 Sonnentage, spektakuläre Gipfel, Kaiserschmarrn auf der Alm & Bergseen', targetType: 'booking' },
            { id: 'v2_2', title: 'Zillertal & Achensee', year: 'Tirol', emoji: '🥾', vibe: 'Türkisblauer Bergsee, Gondelfahrten & urige Hütten mit Panoramaterrasse', targetType: 'booking' },
            { id: 'v2_3', title: 'Allgäu (Oberstdorf & Füssen)', year: 'Bayern', emoji: '🐄', vibe: 'Alpen-Panorama, klare Gebirgsbäche, Schlösser & gemütliche Chalets', targetType: 'booking' },
            { id: 'v2_4', title: 'Berchtesgadener Land & Königssee', year: 'Bayern', emoji: '🛶', vibe: 'Bootsfahrt nach St. Bartholomä, Watzmann-Blick & malerischer Obersee', targetType: 'booking' },
            { id: 'v2_5', title: 'Salzkammergut (Wolfgangsee & Hallstatt)', year: 'Österreich', emoji: '🏞️', vibe: 'Glasklare Badeseen direkt vor imposanter Bergkulisse', targetType: 'booking' },
            { id: 'v2_6', title: 'Gardasee Nord (Riva del Garda & Monte Baldo)', year: 'Italien', emoji: '🍋', vibe: 'Alpengipfel treffen auf Palmen, Olivenhaine und italienisches Gelato', targetType: 'booking' },
            { id: 'v2_7', title: 'Tegernsee & Schliersee', year: 'Oberbayern', emoji: '🥨', vibe: 'Kurze Anreise, See-Spaziergang, Wallbergbahn & Bräustüberl', targetType: 'booking' },
            { id: 'v2_8', title: 'Zermatt & Matterhorn', year: 'Schweiz', emoji: '🇨🇭', vibe: 'Autofreies Bergdorf mit Blick auf den berühmtesten Gipfel der Alpen', targetType: 'booking' }
        ],
        // 3: Roadtrip entlang der Küste
        3: [
            { id: 'v3_1', title: 'Amalfiküste (Positano, Amalfi & Ravello)', year: 'Italien', emoji: '🍋', vibe: 'Spektakuläre Küstenstraße, pastellfarbene Dörfer & Zitronengärten über dem Meer', targetType: 'booking' },
            { id: 'v3_2', title: 'Algarve & Portugals Atlantikküste', year: 'Portugal', emoji: '🚐', vibe: 'Von Porto über Lissabon bis zu den Klippen von Lagos', targetType: 'booking' },
            { id: 'v3_3', title: 'Côte d\'Azur (Nizza, Antibes & Menton)', year: 'Frankreich', emoji: '🌴', vibe: 'Panoramastraßen (Corniches), türkises Wasser & südfranzösisches Savoir-vivre', targetType: 'booking' },
            { id: 'v3_4', title: 'Istrien (Rovinj, Pula & Opatija)', year: 'Kroatien', emoji: '🌊', vibe: 'Venezianische Hafenstädtchen, Trüffel-Region & Küstenstraßen an der Adria', targetType: 'booking' },
            { id: 'v3_5', title: 'Andalusien (Málaga, Ronda, Cádiz & Sevilla)', year: 'Spanien', emoji: '💃', vibe: 'Weiße Dörfer, Atlantikstrände und maurische Paläste', targetType: 'booking' },
            { id: 'v3_6', title: 'Cinque Terre & Ligurische Küste', year: 'Italien', emoji: '🎨', vibe: 'Fünf bunte Küstendörfer an steilen Weinbergen mit Meerblick', targetType: 'booking' },
            { id: 'v3_7', title: 'Mallorca Westküste (Valldemossa, Deià & Sóller)', year: 'Balearen', emoji: '🍊', vibe: 'Traumhafte Serpentinen durch die Serra de Tramuntana', targetType: 'booking' },
            { id: 'v3_8', title: 'Schottische Highlands & Isle of Skye', year: 'Schottland', emoji: '🏰', vibe: 'Dramatische Küsten, Burgen, Lochs und grüne Täler', targetType: 'booking' }
        ],
        // 4: Wellness- & Spa-Hotel mit Infinity-Pool
        4: [
            { id: 'v4_1', title: 'Südtirol (Meran & Passeiertal) – Panorama-Spa', year: 'Top-Wellness', emoji: '🧖‍♀️', vibe: 'Beheizte Infinity-Pools mit freiem Blick auf die verschneiten Berggipfel', targetType: 'booking' },
            { id: 'v4_2', title: 'Tirol & Salzburger Land – Alpen-Wellness', year: 'Österreich', emoji: '🏔️', vibe: 'Große Saunawelten, Naturbadeteiche und exzellente Halbpension', targetType: 'booking' },
            { id: 'v4_3', title: 'Schwarzwald (Baiersbronn & Titisee)', year: 'Deutschland', emoji: '🌲', vibe: 'Wald-Spa, Panorama-Sauna und preisgekrönte regionale Küche', targetType: 'booking' },
            { id: 'v4_4', title: 'Bayerischer Wald – Adults-Only Wellnesshotels', year: 'Bayern', emoji: '✨', vibe: 'Ruhe pur, Dachterrassen-Sky-Pool und riesige Ruheoasen für Paare', targetType: 'booking' },
            { id: 'v4_5', title: 'Ostsee (Timmendorfer Strand / Rügen / Usedom)', year: 'Küste', emoji: '🌊', vibe: 'Strandspaziergang an der frischen Seeluft & danach ab in die warme Sauna', targetType: 'booking' },
            { id: 'v4_6', title: 'Mosel & Vulkaneifel – Wein- & Romantik-Spa', year: 'Rheinland-Pfalz', emoji: '🍷', vibe: 'Wellnesshotels inmitten von Weinbergen und ruhigen Flusstälern', targetType: 'booking' },
            { id: 'v4_7', title: 'Bodensee (Überlingen & Konstanz)', year: 'See-Wellness', emoji: '🦢', vibe: 'Seetherme mit Blick über das Wasser bis zu den Schweizer Alpen', targetType: 'booking' },
            { id: 'v4_8', title: 'Harz – Boutique-Wellness & Natur', year: 'Mittelgebirge', emoji: '🦌', vibe: 'Moderne Design-Spa-Hotels für eine schnelle Auszeit am Wochenende', targetType: 'booking' }
        ],
        // 5: Eigenes Ferienhaus / Finca (mit Pool, Kamin oder Garten)
        5: [
            { id: 'v5_1', title: 'Mallorca – Naturstein-Finca mit eigenem Pool', year: 'Spanien', emoji: '🏡', vibe: 'Absolute Privatsphäre zwischen Oliven- und Mandelbäumen', targetType: 'booking' },
            { id: 'v5_2', title: 'Toskana – Landhaus (Agriturismo) in den Hügeln', year: 'Italien', emoji: '🌻', vibe: 'Zypressenalleen, Pool mit Weitblick und Wein direkt vom Weingut', targetType: 'booking' },
            { id: 'v5_3', title: 'Dänische Nordseeküste (Blåvand / Søndervig)', year: 'Dänemark', emoji: '🔥', vibe: 'Gemütliches Hygge-Holzhaus in den Dünen mit Kaminofen & eigener Sauna', targetType: 'booking' },
            { id: 'v5_4', title: 'Zeeland & Holländische Küste', year: 'Niederlande', emoji: '🏖️', vibe: 'Modernes Strandhaus oder Tiny House nahe den endlosen Sandstränden', targetType: 'booking' },
            { id: 'v5_5', title: 'Istrien – Moderne Pool-Villa', year: 'Kroatien', emoji: '🏊', vibe: 'Eigenes Haus mit Außengrill, Pool und Blick aufs Meer', targetType: 'booking' },
            { id: 'v5_6', title: 'Provence & Luberon – Französisches Landhaus', year: 'Frankreich', emoji: '💜', vibe: 'Lavendelfelder, Wochenmärkte und Frühstück auf der eigenen Terrasse', targetType: 'booking' },
            { id: 'v5_7', title: 'Österreichische Alpen – Privates Holz-Chalet', year: 'Österreich', emoji: '🪵', vibe: 'Eigene Berghütte mit Kaminfeuer und Hot-Tub auf der Holzterrasse', targetType: 'booking' },
            { id: 'v5_8', title: 'Ostsee & Mecklenburgische Seenplatte', year: 'Deutschland', emoji: '⛵', vibe: 'Reetdachhaus oder Hausboot direkt am glitzernden Wasser', targetType: 'booking' }
        ],
        // 6: Insel-Urlaub (Mallorca, Griechenland, Kanaren oder Azoren)
        6: [
            { id: 'v6_1', title: 'Mallorca (Balearen)', year: 'Spanien', emoji: '🏝️', vibe: 'Perfekte Mischung aus Traumbuchten, Bergdörfern und Palma-Flair', targetType: 'booking' },
            { id: 'v6_2', title: 'Kreta (Griechenland)', year: 'Griechenland', emoji: '🫒', vibe: 'Vielfältigste Insel Griechenlands mit Traumstränden, Schluchten & Hafenstädten', targetType: 'booking' },
            { id: 'v6_3', title: 'Teneriffa (Kanaren)', year: 'Spanien', emoji: '🌋', vibe: 'Vulkan Teide, grüne Lorbeerwälder im Norden und Sonne im Süden', targetType: 'booking' },
            { id: 'v6_4', title: 'Madeira – Die grüne Blumeninsel', year: 'Portugal', emoji: '🌺', vibe: 'Spektakuläre Steilküsten, Levada-Wanderungen und natürliche Lava-Meerwasserpools', targetType: 'booking' },
            { id: 'v6_5', title: 'Sardinien', year: 'Italien', emoji: '⛵', vibe: 'Weißer Puderzucker-Sand, türkises Wasser und italienische Küche', targetType: 'booking' },
            { id: 'v6_6', title: 'Korfu', year: 'Griechenland', emoji: '🌿', vibe: 'Grüne Zypressen-Insel mit venezianischer Altstadt und malerischen Buchten', targetType: 'booking' },
            { id: 'v6_7', title: 'Lanzarote (Kanaren)', year: 'Spanien', emoji: '🖤', vibe: 'Einzigartige Vulkanlandschaft, weiße Architektur & goldene Papagayo-Strände', targetType: 'booking' },
            { id: 'v6_8', title: 'Azoren (São Miguel)', year: 'Portugal', emoji: '🐋', vibe: 'Heiße Quellen, grüne Kraterseen und Natur pur mitten im Atlantik', targetType: 'booking' }
        ],
        // 7: Skandinavien, Schottland oder Natur-Abenteuer im Norden
        7: [
            { id: 'v7_1', title: 'Norwegen – Westfjorde & Bergen', year: 'Norwegen', emoji: '🇳🇴', vibe: 'Gigantische Wasserfälle, tiefe Fjorde und bunte Holzhäuser am Hafen', targetType: 'booking' },
            { id: 'v7_2', title: 'Stockholm & Schärengarten', year: 'Schweden', emoji: '🇸🇪', vibe: '14 Inseln, Gamla Stan, Zimtschnecken (Fika) & Bootsfahrten durch die Schären', targetType: 'booking' },
            { id: 'v7_3', title: 'Edinburgh & Schottische Highlands', year: 'Schottland', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', vibe: 'Mittelalterliche Gassen, gemütliche Pubs, Schlösser und wilde Natur', targetType: 'booking' },
            { id: 'v7_4', title: 'Island – Golden Circle & Südküste', year: 'Island', emoji: '🇮🇸', vibe: 'Geysire, heiße Thermalbäder, schwarze Strände und Wasserfälle', targetType: 'booking' },
            { id: 'v7_5', title: 'Kopenhagen & Nord-Seeland', year: 'Dänemark', emoji: '🇩🇰', vibe: 'Design, Kulinarik, Schlösser am Meer und entspannte Lebensart', targetType: 'booking' },
            { id: 'v7_6', title: 'Finnische Seenplatte & Helsinki', year: 'Finnland', emoji: '🇫🇮', vibe: 'Tausende glitzernde Seen, Blockhaussauna und nordische Ruhe', targetType: 'booking' },
            { id: 'v7_7', title: 'Irland – Dublin, Galway & Cliffs of Moher', year: 'Irland', emoji: '☘️', vibe: 'Grüne Küstenklippen, Live-Musik im Pub und herzliche Menschen', targetType: 'booking' },
            { id: 'v7_8', title: 'Lofoten-Inseln', year: 'Norwegen', emoji: '🏔️', vibe: 'Steile Berge direkt aus dem Arktischen Meer & rote Fischerhütten (Rorbuer)', targetType: 'booking' }
        ],
        // 8: Genuss-Reise (Toskana, Südtirol, Provence oder San Sebastián)
        8: [
            { id: 'v8_1', title: 'Toskana & Chianti-Weinregion', year: 'Italien', emoji: '🍷', vibe: 'Weingüter, mittelalterliche Hügelstädte (Siena, San Gimignano) & Trüffel-Pasta', targetType: 'booking' },
            { id: 'v8_2', title: 'Südtirol (Bozen, Meran & Kalterer See)', year: 'Italien', emoji: '🍇', vibe: 'Alpen-Mediterran-Mix · Törggelen, Spitzenweine und Knödel bis Risotto', targetType: 'booking' },
            { id: 'v8_3', title: 'San Sebastián (Donostia) & Baskenland', year: 'Spanien', emoji: '🍢', vibe: 'Welthauptstadt der Pintxos (Tapas-Bars) direkt an einer wunderschönen Meeresbucht', targetType: 'booking' },
            { id: 'v8_4', title: 'Provence (Aix-en-Provence, Gordes & Roussillon)', year: 'Frankreich', emoji: '🥖', vibe: 'Roséwein, provenzalische Wochenmärkte, Olivenhaine & Bergdörfer', targetType: 'booking' },
            { id: 'v8_5', title: 'Piemont (Alba & Langhe)', year: 'Italien', emoji: '🌰', vibe: 'Heimat des Barolo-Weins, Haselnüsse, Tajarin-Pasta & sanfte Weinberge', targetType: 'booking' },
            { id: 'v8_6', title: 'Porto & Douro-Tal', year: 'Portugal', emoji: '🇵🇹', vibe: 'Historische Altstadt am Fluss, Portweinkeller & terrassierte Weinberge', targetType: 'booking' },
            { id: 'v8_7', title: 'Elsass (Colmar & Elsässer Weinstraße)', year: 'Frankreich', emoji: '🥧', vibe: 'Fachwerkromantik, Flammkuchen, Riesling und französische Patisserien', targetType: 'booking' },
            { id: 'v8_8', title: 'Bologna & Emilia-Romagna', year: 'Italien', emoji: '🍝', vibe: 'Italiens Bauch · Original Tagliatelle al Ragù, Parmigiano & Aceto Balsamico', targetType: 'booking' }
        ],
        // 9: Winter-Trip: Skifahren, Rodeln oder verschneite Chalet-Auszeit
        9: [
            { id: 'v9_1', title: 'Zillertal / Mayrhofen / Sölden', year: 'Tirol', emoji: '🎿', vibe: 'Schneesichere Pisten, moderne Gondeln & gemütliche Hütten', targetType: 'booking' },
            { id: 'v9_2', title: 'Gröden (Val Gardena) & Seiser Alm', year: 'Südtirol', emoji: '❄️', vibe: 'Winterwandern, Rodeln und Skifahren unter den Dolomiten-Felsen mit Südtiroler Küche', targetType: 'booking' },
            { id: 'v9_3', title: 'Kitzbühel & Kirchberg', year: 'Tirol', emoji: '🏔️', vibe: 'Charmante Alpenstadt, Top-Hotels, Winterspaziergänge & Hüttenzauber', targetType: 'booking' },
            { id: 'v9_4', title: 'Oberstdorf & Kleinwalsertal', year: 'Allgäu', emoji: '🛷', vibe: 'Verschneite Täler, Pferdeschlittenfahrten, Rodelbahnen und Wellness', targetType: 'booking' },
            { id: 'v9_5', title: 'Zell am See & Kaprun', year: 'Salzburger Land', emoji: '🏔️', vibe: 'Kombination aus verschneitem Bergsee, Gletscher und Thermen-Spa', targetType: 'booking' },
            { id: 'v9_6', title: 'Garmisch-Partenkirchen & Zugspitze', year: 'Bayern', emoji: '🚠', vibe: 'Eibsee im Winterkleid, Partnachklamm und Deutschlands höchster Gipfel', targetType: 'booking' },
            { id: 'v9_7', title: 'Zermatt im Winter', year: 'Schweiz', emoji: '🧀', vibe: 'Schweizer Käsefondue im verschneiten Bergdorf vor dem Matterhorn', targetType: 'booking' },
            { id: 'v9_8', title: 'Rovaniemi & Finnisches Lappland', year: 'Finnland', emoji: '🦌', vibe: 'Einmal-im-Leben-Reise · Glas-Iglus, Nordlichter & Rentierschlitten', targetType: 'booking' }
        ]
    },

    gifts: {
        // 0: Konzert-, Comedy- oder Event-Tickets
        0: [
            { id: 'gf0_1', title: 'Candlelight Konzert (Klassik & Filmmusik bei Kerzenschein)', year: 'Live-Event', emoji: '🕯️', vibe: 'Gänsehaut-Atmosphäre in tausenden Kerzen (z. B. Hans Zimmer, Coldplay, Queen)', targetType: 'gyg' },
            { id: 'gf0_2', title: 'Stand-Up Comedy Live-Show / Comedy-Club', year: 'Lachen zu zweit', emoji: '🎤', vibe: '2 Stunden Bauchmuskelkater vor Lachen mit Drinks im Club', targetType: 'gyg' },
            { id: 'gf0_3', title: 'Varieté- & Akrobatik-Show (z. B. GOP / Palazzo)', year: 'Show & Dinner', emoji: '🎪', vibe: 'Weltklasse-Artistik, Musik und optionales 3-Gänge-Menü', targetType: 'gyg' },
            { id: 'gf0_4', title: 'Großes Musical-Highlight (Hamburg / Stuttgart / Köln)', year: 'Bühnen-Show', emoji: '🎭', vibe: 'König der Löwen, Moulin Rouge, MJ oder Tarzan live erleben', targetType: 'gyg' },
            { id: 'gf0_5', title: 'Immersive Kunst- & Licht-Ausstellung', year: 'Visual Event', emoji: '✨', vibe: '360-Grad Projektionen, Klangwelten und beeindruckende Installationen', targetType: 'gyg' },
            { id: 'gf0_6', title: 'Krimi-Dinner oder Zauber-Show Live', year: 'Interaktiv', emoji: '🎩', vibe: 'Spannender Abend zwischen Gänsehaut, Rätsel und gutem Essen', targetType: 'gyg' }
        ],
        // 1: Besonderes Dinner, Tasting oder Kochkurs
        1: [
            { id: 'gf1_1', title: 'Italienischer Pasta- & Pizza-Kochkurs', year: 'Kulinarik-Event', emoji: '🍝', vibe: 'Zusammen frische Pasta rollen, Wein trinken und gemeinsam schlemmen', targetType: 'gyg' },
            { id: 'gf1_2', title: 'Sushi-Meisterkurs für Einsteiger', year: 'Food-Workshop', emoji: '🍣', vibe: 'Maki, Inside-Out & Nigiri professionell selbst rollen lernen', targetType: 'gyg' },
            { id: 'gf1_3', title: 'Wein- & Käse-Tasting Abend', year: 'Verkostung', emoji: '🍷', vibe: 'Ausgewählte Weine und gereifte Käsesorten entspannt kennenlernen', targetType: 'gyg' },
            { id: 'gf1_4', title: 'Cocktail-Mixkurs / Gin-Tasting', year: 'Bar-Erlebnis', emoji: '🍸', vibe: 'Shaken wie die Profis – eigene Lieblingscocktails mixen & probieren', targetType: 'gyg' },
            { id: 'gf1_5', title: 'Barista- & Latte-Art-Kurs', year: 'Kaffee-Liebhaber', emoji: '☕', vibe: 'Perfekter Espresso-Bezug und cremiger Milchschaum an der Siebträgermaschine', targetType: 'gyg' },
            { id: 'gf1_6', title: 'Kulinarische Stadtführung (Food-Tour)', year: 'Entdecker-Date', emoji: '🌮', vibe: '5–6 versteckte kulinarische Geheimtipps in einem Viertel durchprobieren', targetType: 'gyg' }
        ],
        // 2: Überraschungs-Kurztrip (1–2 Nächte)
        2: [
            { id: 'gf2_1', title: 'Boutique-Hotel Städtetrip (1–2 Nächte mit Frühstück)', year: 'Kurztrip', emoji: '🧳', vibe: 'Stylisches Design-Hotel mitten im Szeneviertel für ein Wochenende', targetType: 'booking' },
            { id: 'gf2_2', title: 'Wellness- & Spa-Hotel Auszeit (2 Nächte)', year: 'Entspannung', emoji: '🧖‍♀️', vibe: 'Bademantel an, Infinity-Pool, Sauna und langes Schlemmer-Frühstück', targetType: 'booking' },
            { id: 'gf2_3', title: 'Tiny House oder Baumhaus in der Natur', year: 'Besonders übernachten', emoji: '🌲', vibe: 'Mitten im Grünen aufwachen mit Panoramafenster und Terrasse', targetType: 'booking' },
            { id: 'gf2_4', title: 'Romantik- & Schlosshotel mit Candle-Light-Dinner', year: 'Klassiker', emoji: '🏰', vibe: 'Übernachten in historischen Mauern mit Schlosspark', targetType: 'booking' },
            { id: 'gf2_5', title: 'Berg-Chalet oder Almhütte für zwei', year: 'Berge', emoji: '🏔️', vibe: 'Frische Bergluft, Holz-Architektur und Hütten-Gemütlichkeit', targetType: 'booking' },
            { id: 'gf2_6', title: 'Strandhotel am Meer (Nordsee / Ostsee / Holland)', year: 'Meeresbrise', emoji: '🌊', vibe: 'Meeresrauschen, Dünenspaziergang und Fischbrötchen am Hafen', targetType: 'booking' }
        ],
        // 3: Cooles Gadget (Tech, Kaffee oder Küche)
        3: [
            { id: 'gf3_1', title: 'Ninja Foodi Dual Zone Heißluftfritteuse (Airfryer)', year: 'Küchen-Bestseller', emoji: '🍟', vibe: 'Zwei Fächer gleichzeitig knusprig garen – spart extrem viel Zeit im Alltag', targetType: 'amazon' },
            { id: 'gf3_2', title: 'Ninja Creami Eismaschine & Frozen-Drink-Maker', year: 'Viral-Hit', emoji: '🍨', vibe: 'Aus fast allem auf Knopfdruck cremiges Eis, Sorbet oder Protein-Eis zaubern', targetType: 'amazon' },
            { id: 'gf3_3', title: 'Tragbare Akku-Espressomaschine (für Auto & Reisen)', year: 'Kaffee-Gadget', emoji: '☕', vibe: 'Frischer Espresso mit echter Crema beim Roadtrip, im Park oder am See', targetType: 'amazon' },
            { id: 'gf3_4', title: '3-in-1 MagSafe / Qi2 Nachttisch-Ladestation', year: 'Tech-Upgrade', emoji: '⚡', vibe: 'Handy, Uhr & Kopfhörer ordentlich an einem Platz laden ohne Kabelsalat', targetType: 'amazon' },
            { id: 'gf3_5', title: 'Noise-Cancelling Over-Ear Kopfhörer (Sony / Bose / Soundcore)', year: 'Audio-Hit', emoji: '🎧', vibe: 'Ruhe auf Knopfdruck für Reisen, Homeoffice und Musikgenuss', targetType: 'amazon' },
            { id: 'gf3_6', title: 'Mini-Heimkino-Beamer (Full-HD für Schlafzimmer & Decke)', year: 'Couch-Upgrade', emoji: '📽️', vibe: 'Kino-Leinwand direkt an die Zimmerwand oder Schlafzimmerdecke projizieren', targetType: 'amazon' }
        ],
        // 4: Massage-, Day-Spa- oder Wellness-Gutschein
        4: [
            { id: 'gf4_1', title: 'Wellness- & Thermen-GutscheinBox für 2', year: 'Auszeit', emoji: '🧖‍♀️', vibe: 'Freie Auswahl aus hunderten Thermen, Saunawelten und Day-Spas', targetType: 'amazon' },
            { id: 'gf4_2', title: 'Rituals Luxury Home-Spa Geschenkset (Große Box)', year: 'Wohlfühl-Box', emoji: '🕯️', vibe: 'Duschschaum, Duftkerze, Peeling & Körpercreme für den Spa-Abend zuhause', targetType: 'amazon' },
            { id: 'gf4_3', title: 'Shiatsu Nacken- & Schultermassagegerät mit Wärmefunktion', year: 'Entspannung', emoji: '💆‍♀️', vibe: 'Jeden Abend 15 Minuten Tiefenmassage direkt auf der eigenen Couch', targetType: 'amazon' },
            { id: 'gf4_4', title: 'Paar-Massageöl- & Wellness-Geschenkbox', year: 'Zuhause-Spa', emoji: '🌿', vibe: 'Hochwertige natürliche Aromaöle für entspannte Abende zu zweit', targetType: 'amazon' },
            { id: 'gf4_5', title: 'Kuschel-Bademantel oder XXL-Wärmedecke', year: 'Cozy-Faktor', emoji: '🛋️', vibe: 'Hotel-Spa-Gefühl für kalte Abende im Wohnzimmer', targetType: 'amazon' },
            { id: 'gf4_6', title: 'Aroma-Diffuser mit ätherischen Duftölen', year: 'Raumklima', emoji: '💧', vibe: 'Sanftes Kaminlicht-Ambiente und entspannender Duft nach Lavendel oder Zeder', targetType: 'amazon' }
        ],
        // 5: Feinkost- & Genuss-Box
        5: [
            { id: 'gf5_1', title: 'Italienische Feinkost- & Pasta-Geschenkbox', year: 'La Dolce Vita', emoji: '🍝', vibe: 'Manufaktur-Pasta, Trüffel-Pesto, Olivenöl & Cantuccini für das perfekte Dinner', targetType: 'amazon' },
            { id: 'gf5_2', title: 'Ankerkraut Gourmet-Gewürz-Geschenkset im Korkenglas', year: 'Koch-Freude', emoji: '🧂', vibe: 'Die beliebtesten Gewürzmischungen zum gemeinsamen Kochen und Grillen', targetType: 'amazon' },
            { id: 'gf5_3', title: 'Specialty Coffee / Barista Kaffee-Probierbox', year: 'Kaffee-Genuss', emoji: '☕', vibe: 'Verschiedene Röstungen aus kleinen Kaffeeröstereien zum Durchprobieren', targetType: 'amazon' },
            { id: 'gf5_4', title: 'Belgische Pralinen- & Schokoladen-Tasting-Kollektion', year: 'Süßer Luxus', emoji: '🍫', vibe: 'Handverlesene Trüffel und Pralinen zum gemeinsamen Verkosten', targetType: 'amazon' },
            { id: 'gf5_5', title: 'Gin- & Botanicals-Tasting-Box (oder Cocktail-Set)', year: 'Home-Bar', emoji: '🍸', vibe: 'Verschiedene Miniaturen und ausgewählte Gewürze für den Bar-Abend zuhause', targetType: 'amazon' },
            { id: 'gf5_6', title: 'Scharfe Saucen (Hot Sauce) Tasting-Challenge Box', year: 'Feurig', emoji: '🌶️', vibe: 'Von mild-fruchtig bis feurig-scharf – euer eigenes „Hot Ones“-Tasting am Esstisch', targetType: 'amazon' }
        ],
        // 6: Kreativ-Workshop
        6: [
            { id: 'gf6_1', title: 'Töpferkurs / Keramik-Bemalen für zwei', year: 'Kreativ-Date', emoji: '🏺', vibe: 'Eigene Lieblingstassen oder Schüsseln gestalten und brennen lassen', targetType: 'gyg' },
            { id: 'gf6_2', title: 'ArtNight – Mal-Erlebnis mit Drinks', year: 'Kunst & Spaß', emoji: '🎨', vibe: 'Schritt für Schritt ein eigenes Kunstwerk auf Leinwand malen (auch ohne Vorkenntnisse)', targetType: 'gyg' },
            { id: 'gf6_3', title: 'Parfüm-Workshop – Eigenen Signatur-Duft kreieren', year: 'Besonders', emoji: '🌸', vibe: 'Aus edlen Essenzen einen völlig individuellen Flakon zusammenstellen', targetType: 'gyg' },
            { id: 'gf6_4', title: 'Schokoladen- & Pralinen-Workshop', year: 'Genuss-Handwerk', emoji: '🍫', vibe: 'Eigene Tafelschokolade und Pralinen gießen, verzieren und mitnehmen', targetType: 'gyg' },
            { id: 'gf6_5', title: 'Töpfer-Set für Zuhause (Lufttrocknender Ton + Farben)', year: 'Home-Date-Box', emoji: '🖌️', vibe: 'Komplettes DIY-Pottery-Kit für einen kreativen Abend am eigenen Tisch', targetType: 'amazon' },
            { id: 'gf6_6', title: 'Kerzen-Gieß-Set oder Cocktail-Infusion DIY-Box', year: 'Selbermachen', emoji: '🕯️', vibe: 'Alles in einer Box für ein 2-stündiges Projekt zu zweit', targetType: 'amazon' }
        ],
        // 7: Besonderes Brettspiel, Lego-Set oder Buch-Bestseller
        7: [
            { id: 'gf7_1', title: 'LEGO Botanicals Blumenstrauß / Rosenstrauß', year: 'Bestseller #1', emoji: '💐', vibe: 'Das beliebteste Geschenk-Set – gemeinsam bauen und als Deko in die Vase stellen', targetType: 'amazon' },
            { id: 'gf7_2', title: 'LEGO Icons Orchidee oder Bonsai-Baum', year: 'Design-Set', emoji: '🪴', vibe: 'Sieht täuschend echt aus und macht beim gemeinsamen Zusammenbauen riesig Spaß', targetType: 'amazon' },
            { id: 'gf7_3', title: '7 Wonders Duel / Codenames Duett (Top-Spiele für 2)', year: 'Spiele-Hit', emoji: '🎲', vibe: 'Die am besten bewerteten Spiele speziell für 2 Personen', targetType: 'amazon' },
            { id: 'gf7_4', title: '52 kleine & große Eskapaden (Ausflugsbuch für eure Region)', year: 'Inspirations-Buch', emoji: '📖', vibe: '52 fertige Wochenend-Mikroabenteuer direkt vor der Haustür', targetType: 'amazon' },
            { id: 'gf7_5', title: 'Dorfromantik – Das Brettspiel (Spiel des Jahres)', year: 'Koop-Brettspiel', emoji: '🏡', vibe: 'Gemeinsam Kampagnen-Boxen freischalten und entspannt Landschaften bauen', targetType: 'amazon' },
            { id: 'gf7_6', title: 'Hidden Games Krimi-Akte + EXIT-Spiel Doppelpack', year: 'Rätsel-Abend', emoji: '🕵️', vibe: 'Zwei komplette Ermittler-Abende zum Verschenken', targetType: 'amazon' }
        ],
        // 8: Fotobuch, Erinnerung oder Polaroid-/Instax-Kamera
        8: [
            { id: 'gf8_1', title: 'Fujifilm Instax Mini 12 Sofortbildkamera + Film-Pack', year: 'Bestseller', emoji: '📸', vibe: 'Schnappschüsse sofort als echtes Foto in der Hand halten (für Kühlschrank & Gästebuch)', targetType: 'amazon' },
            { id: 'gf8_2', title: 'Digitaler WLAN-Bilderrahmen (Frameo)', year: 'Smart-Erinnerung', emoji: '🖼️', vibe: 'Neue Urlaubs- und Alltagsfotos direkt vom Smartphone auf den Rahmen schicken', targetType: 'amazon' },
            { id: 'gf8_3', title: 'Kodak Mini Shot / Canon Zoemini Handy-Fotodrucker', year: 'Sofortdruck', emoji: '🖨️', vibe: 'Lieblingsfotos vom Handy in 30 Sekunden auf selbstklebendem Fotopapier ausdrucken', targetType: 'amazon' },
            { id: 'gf8_4', title: 'Unser Abenteuerbuch (Paar-Erinnerungsalbum zum Eintragen)', year: 'Persönlich', emoji: '📔', vibe: 'Gemeinsame Reisen, Insider-Witze und Fotos an einem Ort festhalten', targetType: 'amazon' },
            { id: 'gf8_5', title: 'Weltkarte / Europa-Karte zum Freirubbeln', year: 'Wand-Deko', emoji: '🗺️', vibe: 'Jedes gemeinsam bereiste Land mit einer Münze golden freirubbeln', targetType: 'amazon' },
            { id: 'gf8_6', title: '52 Dates zum Freirubbeln – Das Paar-Abenteuerbuch', year: 'Erlebnis-Buch', emoji: '💑', vibe: 'Jede Woche eine neue Überraschungsidee freirubbeln und ein Foto einkleben', targetType: 'amazon' }
        ],
        // 9: Action-Erlebnis
        9: [
            { id: 'gf9_1', title: 'Indoor-Skydiving (Bodyflying im Windkanal)', year: 'Adrenalin', emoji: '🪂', vibe: 'Das Gefühl des freien Falls völlig sicher im vertikalen Windkanal erleben', targetType: 'gyg' },
            { id: 'gf9_2', title: 'Live Escape Room Abenteuer (60 Minuten)', year: 'Team-Mission', emoji: '🔐', vibe: 'In einem echten Kulissen-Raum Geheimtüren und Zahlenschlösser knacken', targetType: 'gyg' },
            { id: 'gf9_3', title: 'Flugsimulator (Einmal selbst im Cockpit landen)', year: 'Highlight', emoji: '✈️', vibe: 'Mit echtem Instruktor einen Passagierjet starten und landen', targetType: 'gyg' },
            { id: 'gf9_4', title: 'Quad-Tour oder Buggy-Offroad-Erlebnis', year: 'Outdoor-Action', emoji: '🛞', vibe: 'Geführte Tour über Schotterpisten, Waldwege und Panorama-Strecken', targetType: 'gyg' },
            { id: 'gf9_5', title: 'Kletterwald, Zipline-Park oder House-Running', year: 'Höhenflug', emoji: '🧗', vibe: 'Gemeinsam über Hängebrücken und Seilrutschen durch die Baumwipfel', targetType: 'gyg' },
            { id: 'gf9_6', title: 'Kartbahn-Rennen oder VR-Arena Erlebnis', year: 'Duell', emoji: '🏎️', vibe: 'Rundenzeiten jagen oder gemeinsam durch eine Virtual-Reality-Welt laufen', targetType: 'gyg' }
        ]
    },
    boardgames: {
        // 0: Strategie- & Aufbau-Klassiker
        0: [
            { id: 'bg0_1', title: 'Zug um Zug (Ticket to Ride)', year: '2–5 Spieler · 45 Min', emoji: '🚂', vibe: 'Moderner Klassiker · Eisenbahnstrecken quer durch Europa oder Amerika bauen', targetType: 'amazon' },
            { id: 'bg0_2', title: 'Flügelschlag (Wingspan)', year: '1–5 Spieler · 60 Min', emoji: '🦜', vibe: 'Kennerspiel des Jahres · Wunderschöne Vogelkarten & cleveres Engine-Building', targetType: 'amazon' },
            { id: 'bg0_3', title: 'Cascadia', year: '1–4 Spieler · 40 Min', emoji: '🐻', vibe: 'Spiel des Jahres · Entspanntes Legespiel rund um Wildtiere & Landschaften', targetType: 'amazon' },
            { id: 'bg0_4', title: 'Azul', year: '2–4 Spieler · 35 Min', emoji: '🔷', vibe: 'Design-Hit · Taktisches Fliesenlegen mit wunderschönen Spielsteinen', targetType: 'amazon' },
            { id: 'bg0_5', title: 'CATAN – Das Spiel', year: '3–4 Spieler · 75 Min', emoji: '🏝️', vibe: 'All-Time-Legende · Rohstoffe handeln, Straßen bauen, Insel besiedeln', targetType: 'amazon' },
            { id: 'bg0_6', title: 'Carcassonne', year: '2–5 Spieler · 35 Min', emoji: '🏰', vibe: 'Zeitloser Favorit · Plättchen für Plättchen Städte, Wiesen & Straßen errichten', targetType: 'amazon' }
        ],
        // 1: Koop-Abenteuer (Alle gegen das Spiel)
        1: [
            { id: 'bg1_1', title: 'Dorfromantik – Das Brettspiel', year: '1–6 Spieler · 45 Min', emoji: '🏡', vibe: 'Spiel des Jahres · Gemeinsam friedliche Landschaften legen & Boxen freischalten', targetType: 'amazon' },
            { id: 'bg1_2', title: 'Sky Team', year: '2 Spieler · 15 Min', emoji: '✈️', vibe: 'Spiel des Jahres · Als Pilot & Co-Pilot gemeinsam ein Flugzeug sicher landen', targetType: 'amazon' },
            { id: 'bg1_3', title: 'Pandemic (Pandemie)', year: '2–4 Spieler · 45 Min', emoji: '🧪', vibe: 'Koop-Klassiker · Als Spezialisten-Team gemeinsam die Welt retten', targetType: 'amazon' },
            { id: 'bg1_4', title: 'Die Crew – Mission Tiefsee', year: '2–5 Spieler · 20 Min', emoji: '🌊', vibe: 'Kennerspiel-Hit · Kooperatives Stichspiel ohne miteinander zu sprechen', targetType: 'amazon' },
            { id: 'bg1_5', title: 'Paleo', year: '2–4 Spieler · 60 Min', emoji: '🦣', vibe: 'Steinzeit-Abenteuer · Gemeinsam Gefahren meistern und Höhlenmalerei vollenden', targetType: 'amazon' },
            { id: 'bg1_6', title: 'Bomb Busters', year: '2–5 Spieler · 30 Min', emoji: '💣', vibe: 'Spannungs-Hit · Gemeinsam durch clevere Logik die richtigen Kabel durchtrennen', targetType: 'amazon' }
        ],
        // 2: Party-, Lach- & Musik-Spiele
        2: [
            { id: 'bg2_1', title: 'HITSTER – Das Musik-Partyspiel', year: '2–10 Spieler · 30 Min', emoji: '🎵', vibe: 'Bestseller #1 · Spotify-Hits anhören & richtig in die Zeitlinie einordnen', targetType: 'amazon' },
            { id: 'bg2_2', title: 'Codenames (oder Codenames Duett)', year: '2–8 Spieler · 15 Min', emoji: '🕵️', vibe: 'Wort-Geniestreich · Mit einem einzigen Hinweiswort mehrere Agenten verbinden', targetType: 'amazon' },
            { id: 'bg2_3', title: 'Just One', year: '3–7 Spieler · 20 Min', emoji: '✍️', vibe: 'Spiel des Jahres · Kooperatives Wortratespiel mit genialen Missverständnissen', targetType: 'amazon' },
            { id: 'bg2_4', title: 'Exploding Kittens', year: '2–5 Spieler · 15 Min', emoji: '🐱', vibe: 'Chaos-Hit · Strategisches Russisch Roulette mit verrückten Katzen-Karten', targetType: 'amazon' },
            { id: 'bg2_5', title: 'Dixit', year: '3–8 Spieler · 30 Min', emoji: '🎨', vibe: 'Fantasievoll · Wunderschöne Bildkarten mit kreativen Hinweisen erraten', targetType: 'amazon' },
            { id: 'bg2_6', title: 'Top Ten', year: '4–9 Spieler · 30 Min', emoji: '😂', vibe: 'Lachgarantie · Absurde Szenarien auf einer Skala von 1 bis 10 erraten', targetType: 'amazon' }
        ],
        // 3: Taktische 2-Spieler-Duelle
        3: [
            { id: 'bg3_1', title: '7 Wonders Duel', year: '2 Spieler · 30 Min', emoji: '🏛️', vibe: 'Bestes 2er-Spiel · Zivilisation, Weltwunder & drei mögliche Siegwege', targetType: 'amazon' },
            { id: 'bg3_2', title: 'Splendor Duel', year: '2 Spieler · 30 Min', emoji: '💎', vibe: 'Edelstein-Duell · Taktisch, schnell gelernt und extrem hoher Wiederspielwert', targetType: 'amazon' },
            { id: 'bg3_3', title: 'Patchwork', year: '2 Spieler · 30 Min', emoji: '🧵', vibe: 'Tetris auf dem Tisch · Mit Stoff-Flicken die beste Decke zusammenpuzzeln', targetType: 'amazon' },
            { id: 'bg3_4', title: 'Jaipur', year: '2 Spieler · 25 Min', emoji: '🐪', vibe: 'Handels-Duell · Schnell, clever und ideal für gemütliche Abende zu zweit', targetType: 'amazon' },
            { id: 'bg3_5', title: 'Schotten Totten', year: '2 Spieler · 20 Min', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', vibe: 'Karten-Taktik · Mit klugen 3er-Kombinationen Grenzsteine erobern', targetType: 'amazon' },
            { id: 'bg3_6', title: 'Der Herr der Ringe: Duell um Mittelerde', year: '2 Spieler · 30 Min', emoji: '💍', vibe: 'Neuheit-Hit · 7-Wonders-Duel-Genialität im Mittelerde-Universum', targetType: 'amazon' }
        ],
        // 4: Krimi-, Escape- & Rätsel-Abende
        4: [
            { id: 'bg4_1', title: 'EXIT – Das Spiel (Kosmos)', year: '1–4 Spieler · 60 Min', emoji: '🔐', vibe: 'Escape-Room-Kult · Falten, Schneiden & Codes knacken direkt am Esstisch', targetType: 'amazon' },
            { id: 'bg4_2', title: 'Hidden Games – Tatort Krimi-Akte', year: '1–6 Spieler · 90 Min', emoji: '📂', vibe: 'Realistischer Krimi · Echte Beweismittel, Fotos & WhatsApp-Sprachnachrichten prüfen', targetType: 'amazon' },
            { id: 'bg4_3', title: 'MicroMacro: Crime City', year: '1–4 Spieler · 30 Min', emoji: '🔍', vibe: 'Spiel des Jahres · Mit der Lupe Verbrechen auf einem riesigen Wimmelbild aufklären', targetType: 'amazon' },
            { id: 'bg4_4', title: 'Unlock! Escape Adventures', year: '1–6 Spieler · 60 Min', emoji: '📱', vibe: 'App-gestützt · 3 komplette Escape-Abenteuer ohne Material zu zerstören', targetType: 'amazon' },
            { id: 'bg4_5', title: 'Scotland Yard', year: '2–6 Spieler · 45 Min', emoji: '🕵️‍♂️', vibe: 'Kult-Jagd · Gemeinsam Mister X quer durch London einkreisen', targetType: 'amazon' },
            { id: 'bg4_6', title: 'Mysterium', year: '2–7 Spieler · 45 Min', emoji: '🔮', vibe: 'Atmosphärisch · Ein Geist gibt nur durch Traum-Bildkarten Hinweise auf den Täter', targetType: 'amazon' }
        ],
        // 5: Schnelle Karten- & Würfel-Hits (15 Min)
        5: [
            { id: 'bg5_1', title: 'SKYJO', year: '2–8 Spieler · 20 Min', emoji: '🃏', vibe: 'Mega-Bestseller · In 2 Minuten erklärt, macht die ganze Runde sofort süchtig', targetType: 'amazon' },
            { id: 'bg5_2', title: 'Wizard – Das Stichspiel', year: '3–6 Spieler · 35 Min', emoji: '🧙', vibe: 'Karten-Kult · Stiche exakt vorhersagen – mit Zauberern & Narren', targetType: 'amazon' },
            { id: 'bg5_3', title: 'Qwixx', year: '2–5 Spieler · 15 Min', emoji: '🎲', vibe: 'Würfel-Hit · Keine Wartezeit, weil alle bei jedem Wurf ankreuzen dürfen', targetType: 'amazon' },
            { id: 'bg5_4', title: '6 nimmt!', year: '2–10 Spieler · 20 Min', emoji: '🐂', vibe: 'Klassiker · Alle legen gleichzeitig – wer die 6. Karte legt, kassiert Hornochsen', targetType: 'amazon' },
            { id: 'bg5_5', title: 'CABO', year: '2–4 Spieler · 20 Min', emoji: '🦄', vibe: 'Gedächtnis & Taktik · Niedrigste Punktzahl sammeln und im perfekten Moment rufen', targetType: 'amazon' },
            { id: 'bg5_6', title: 'Scout', year: '2–5 Spieler · 15 Min', emoji: '🎪', vibe: 'Cleveres Kartenspiel · Karten dürfen nicht umsortiert werden – genialer Twist', targetType: 'amazon' }
        ],
        // 6: Bluff, Täuschung & Social Deduction
        6: [
            { id: 'bg6_1', title: 'Die Werwölfe von Düsterwald', year: '6–18 Spieler · 30 Min', emoji: '🐺', vibe: 'Gruppen-Legende · Dorfbewohner vs. Werwölfe – pures Misstrauen & Diskussion', targetType: 'amazon' },
            { id: 'bg6_2', title: 'Love Letter', year: '2–6 Spieler · 15 Min', emoji: '💌', vibe: 'Minimalistisches Genie · Nur 21 Karten voller Bluff, Logik und Überraschungen', targetType: 'amazon' },
            { id: 'bg6_3', title: 'Skull King', year: '2–8 Spieler · 30 Min', emoji: '🏴‍☠️', vibe: 'Piraten-Stichspiel · Wild, gemein und mit genialen Risiko-Wetten', targetType: 'amazon' },
            { id: 'bg6_4', title: 'Kakerlakenpoker', year: '2–6 Spieler · 20 Min', emoji: '🪳', vibe: 'Reines Bluffen · Wahrheit oder Lüge? Perfekt für schauspielerisches Talent', targetType: 'amazon' },
            { id: 'bg6_5', title: 'Coup', year: '2–6 Spieler · 15 Min', emoji: '👑', vibe: 'Eiskaltes Pokerface · Jede Rolle behaupten, solange dich niemand herausfordert', targetType: 'amazon' },
            { id: 'bg6_6', title: 'Secret Identity / Chameleon', year: '3–8 Spieler · 15 Min', emoji: '🦎', vibe: 'Hochspannung · Ein Spieler kennt das geheime Wort nicht und muss sich tarnen', targetType: 'amazon' }
        ],
        // 7: Quiz-, Wort- & Wissens-Duelle
        7: [
            { id: 'bg7_1', title: 'SMART10', year: '2–8 Spieler · 20 Min', emoji: '🔵', vibe: 'Bestseller-Quiz · Alle spielen gleichzeitig mit 10 Antwort-Markern in der Box', targetType: 'amazon' },
            { id: 'bg7_2', title: 'Das Kneipenquiz', year: '3–6 Spieler · 30 Min', emoji: '🍺', vibe: 'Pub-Quiz für Zuhause · Gemeinsam als Team gegen das Spiel antreten', targetType: 'amazon' },
            { id: 'bg7_3', title: 'Bananagrams', year: '1–8 Spieler · 15 Min', emoji: '🍌', vibe: 'Turboschnelles Scrabble · Ohne Spielbrett gleichzeitig eigene Kreuzworträtsel legen', targetType: 'amazon' },
            { id: 'bg7_4', title: 'So Kleever!', year: '3–6 Spieler · 30 Min', emoji: '🍀', vibe: 'Wort-Assoziation · Geniale Begriffe finden, die jeweils zwei Wörter verbinden', targetType: 'amazon' },
            { id: 'bg7_5', title: 'Trivial Pursuit (Classic / Master)', year: '2–6 Spieler · 60 Min', emoji: '🥧', vibe: 'Wissens-Klassiker · Wissens-Ecken aus 6 Kategorien erspielen', targetType: 'amazon' },
            { id: 'bg7_6', title: 'Bezzerwizzer', year: '2–4 Spieler · 45 Min', emoji: '🎯', vibe: 'Taktisches Quiz · Kategorien klauen, Punkte verdoppeln & Besserwisser-Steine nutzen', targetType: 'amazon' }
        ]
    }
};
