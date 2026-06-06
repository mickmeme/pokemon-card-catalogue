const descriptions = {
  // ── Base Series ──────────────────────────────────────────────────────────────
  base1: `The set that started it all. Released in January 1999, Base Set introduced the Pokémon Trading Card Game to the Western world with 102 cards. It established the core mechanics still used today — HP, attacks, weaknesses, and retreating. Holographic cards like Charizard, Blastoise, and Venusaur immediately became cultural icons and remain some of the most sought-after cards ever printed.`,

  base2: `Jungle was the first expansion to the Base Set, released in June 1999. It introduced 64 new cards focusing on forest-dwelling Pokémon. Notable for the first appearances of Scyther, Pinsir, and Vaporeon in holo form, as well as the first Jolteon and Flareon cards. The set also introduced Full Heal Energy, one of the earliest Special Energy cards.`,

  base3: `Fossil arrived in October 1999 and brought 62 cards based around prehistoric Pokémon. It introduced Gengar, Haunter, Lapras, and Aerodactyl to the TCG, along with the powerful Mew card. Fossil is remembered for its strong competitive cards and the inclusion of Ditto, which could copy any Pokémon's attacks — a mechanic that caused significant debate in early tournament play.`,

  base4: `Base Set 2 was a 130-card reprint set released in February 2000, combining cards from Base Set and Jungle with revised artwork and updated formatting. It was not popular with collectors at the time as it contained no new cards, but it served as an accessible entry point for newer players and is now collected for its reprinted versions of classic art.`,

  base5: `Team Rocket, released in April 2000, introduced the concept of Dark Pokémon — sinister versions of fan favourites under the control of Team Rocket. The set of 83 cards featured Dark Charizard, Dark Blastoise, and Dark Raichu, as well as the first full-art style Secret Rare in the form of a special Meowth card. It brought a villainous narrative twist to the TCG for the first time.`,

  gym1: `Gym Heroes, released in August 2000, shifted focus to the Gym Leaders of the Kanto region. Cards featured Pokémon belonging to Brock, Misty, Lt. Surge, and Erika. It introduced a new naming convention — "Misty's Starmie", "Brock's Onix" — giving cards a personal identity tied to their trainer. The set is beloved for its artwork style and the colourful Trainer cards unique to each Gym Leader.`,

  gym2: `Gym Challenge completed the Gym Leader cycle started in Gym Heroes, adding cards themed around Koga, Blaine, Sabrina, and Giovanni. Released in October 2000, it introduced some of the most powerful Trainer cards of the era. Giovanni's Gyarados and Blaine's Charizard remain iconic. The set's competitive impact was significant in late 2000 and early 2001 tournament circuits.`,

  // ── Neo Series ───────────────────────────────────────────────────────────────
  neo1: `Neo Genesis, released in December 2000, marked a major transition — Pokémon Gold and Silver had arrived, and this 111-card set introduced Generation II Pokémon to the TCG for the first time. It also introduced Baby Pokémon as a new card type and the Pokémon Breeder mechanic. Lugia (the first Lugia card ever) and Feraligatr are among the most prized cards from this set.`,

  neo2: `Neo Discovery, released in June 2001, expanded the Generation II card pool with 75 cards centred on the Johto region's diverse Pokémon. It introduced Unown cards — one for each letter of the alphabet — which became a beloved collector's sub-set within the expansion. Espeon and Umbreon made their TCG debut here and remain fan favourites to this day.`,

  neo3: `Neo Revelation, released in September 2001, continued the Neo era with 64 cards and a major new feature: Shining Pokémon. These foil Shiny-coloured Pokémon (Shining Magikarp, Shining Gyarados) were among the first short-printed secret rares in the TCG, making them extremely rare and valuable. Ho-Oh appeared on the set's box art, foreshadowing its arrival in the game.`,

  neo4: `Neo Destiny, released in February 2002, concluded the Neo era with 105 cards. It introduced Light Pokémon to complement the Dark Pokémon from Team Rocket, and included more Shining Pokémon secrets — including the legendary Shining Charizard, which became one of the most iconic and valuable cards of its era. The set is widely considered the pinnacle of the original WotC period.`,

  // ── Legendary Collection / E-Card ────────────────────────────────────────────
  base6: `Legendary Collection was a 110-card reprint set released in May 2002. It reprinted fan-favourite cards from Base Set through Team Rocket with a new horizontal reverse-holo treatment — a distinctively different aesthetic compared to anything else in the TCG. Primarily aimed at collectors wanting polished reprints of classic cards, it is now sought after for its unique foil pattern.`,

  ecard1: `Expedition Base Set launched in September 2002, ushering in the e-Card era. Cards featured dot-code strips on the side that could be scanned with a Nintendo e-Reader accessory. With 165 cards, the set revisited Kanto Pokémon with dramatically updated artwork. Crystal-type Pokémon made their first appearance, and the set's high card count made completing it a significant challenge.`,

  ecard2: `Aquapolis, released in January 2003, is widely regarded as one of the most beautiful and difficult sets to complete in TCG history. Its 186 cards feature an expanded Crystal Pokémon sub-set and some of the most artistic card illustrations of the WotC era. The Crystal Lugia and Crystal Charizard are among the rarest and most striking cards ever produced. A favourite of vintage collectors.`,

  ecard3: `Skyridge, released in May 2003, was the final set produced by Wizards of the Coast before Pokémon Company International took over the licence. Its 182 cards carried forward the Crystal Pokémon concept and maintained the high artistic quality of the e-Card era. Due to low print runs and its status as WotC's swan song, Skyridge is one of the most expensive sets to complete and is considered a holy grail by vintage collectors.`,

  // ── EX Series ────────────────────────────────────────────────────────────────
  ex1: `EX Ruby & Sapphire, released in June 2003, launched the EX era and the transition to Pokémon's new Generation III. It introduced Pokémon-ex — powerful cards with higher HP and devastating attacks, but which gave up two Prize cards when knocked out. The card layout was overhauled with a cleaner design, and Pokémon Company International took over publishing from WotC.`,

  ex2: `EX Sandstorm, released in September 2003, expanded the Hoenn Pokédex in the TCG with 100 cards. It introduced the first Rare Candy card (a staple in competitive decks for years to come) and added more Pokémon-ex. The desert and weather-themed artwork gave the set a distinctive visual identity. Sandslash and Wailord ex were particularly notable inclusions.`,

  ex3: `EX Dragon, released in November 2003, focused on Dragon-type Pokémon and introduced 97 new cards. Notably, this was before Dragon was an official TCG type — Dragon Pokémon were spread across Colourless, Water, and Fire. Rayquaza ex made its debut here and quickly became a competitive powerhouse. The set's artwork leaned into dramatic, action-focused compositions.`,

  ex4: `EX Team Magma vs Team Aqua, released in March 2004, introduced a dual-faction gimmick with two distinct teams of cards, each with their own Pokémon, Trainers, and Energy. Team Magma's Groudon and Team Aqua's Kyogre became centrepiece cards. The set introduced multi-type Pokémon where cards could share two types — a unique mechanic not seen before or since.`,

  ex5: `EX Hidden Legends, released in June 2004, drew on the mythical and legendary Pokémon of the Hoenn region, including Jirachi, Regirock, Registeel, and Regice. With 102 cards and a focus on rares, it was considered a prestige set for collectors at the time. Many of the rare holo artworks feature dramatic environmental backdrops that make them striking display pieces.`,

  ex6: `EX FireRed & LeafGreen, released in August 2004, revisited Generation I Pokémon to tie in with the Game Boy Advance remakes. The 116-card set featured old favourites with updated artwork and new ex versions of the original starters and Legendary Birds. It was particularly popular with players who grew up with the original games and wanted to collect their favourite Kanto Pokémon in the new ex format.`,

  ex7: `EX Team Rocket Returns, released in November 2004, revived the Team Rocket theme with 111 cards featuring Dark Pokémon and a new Rocket's-branded Trainer card series. It also introduced Pokémon-∗, a special variant only available in the set's rare slots. The set is notable for containing Dark Dragonite ex and Dark Tyranitar ex, both highly sought-after competitive cards.`,

  ex8: `EX Deoxys, released in February 2005, centred on the Mythical space Pokémon Deoxys and its four formes. The 108-card set offered multiple Deoxys variants representing its Attack, Defence, Speed, and Normal formes. Delta Species Pokémon — which had non-standard types — made their debut in a preview capacity here. Rayquaza ex made a powerful reappearance and dominated tournament play.`,

  ex9: `EX Emerald, released in May 2005, was a smaller 106-card set expanding the Hoenn roster with a fresh wave of ex Pokémon. It introduced Team Magma and Team Aqua cards once again, tying into the release of Pokémon Emerald. The set is best remembered for Rayquaza ex (Δ Species) and its unique gold-tinted artwork, one of the most visually distinctive cards of the EX era.`,

  ex10: `EX Unseen Forces, released in August 2005, revisited the Johto region with 145 cards including an extensive Unown sub-set spanning the full alphabet. Baby Pokémon returned with new mechanics. The set included the first Gold Star Pokémon — Espeon Gold Star and Umbreon Gold Star — among the most prestigious and valuable cards of the EX era, finished with a stunning starred foil treatment.`,

  ex11: `EX Delta Species, released in October 2005, fully introduced the Delta Species concept — Pokémon printed with unusual type combinations. Charizard as a Lightning/Metal type and Mewtwo as a Grass type were among the stranger and more beloved inclusions. The 113-card set's creative type-swapping delighted players and collectors. Holon's Pokémon and Holon Energy made their debut here.`,

  ex12: `EX Legend Maker, released in February 2006, brought the Holon mechanic to full fruition with 93 cards and a strong focus on Pokémon from the Holon region of the Delta Species storyline. Mew and Kyogre Gold Stars were available through special insert programmes. Wailord ex and Flygon ex δ were standout competitive cards, and the lore-heavy flavour text added narrative depth.`,

  ex13: `EX Holon Phantoms, released in May 2006, continued the Delta Species storyline with 110 cards. It expanded the Holon Energy mechanic and featured more Delta Species Pokémon with unusual typings. Charizard δ (Lightning type) was among the most popular cards. The set also contained the extremely rare Mew Gold Star — distributed via a special promotional programme — making it a grail for EX-era collectors.`,

  ex14: `EX Crystal Guardians, released in August 2006, took a visual step back toward the e-Card era by revisiting Crystal-type Pokémon. The 100-card set is noted for its clean artwork and the reintroduction of Crystal Pokémon as powerful δ-type cards. Shiftry ex and Flygon ex were prominent competitive cards. The set also featured Rayquaza δ, a perennial collector favourite.`,

  ex15: `EX Dragon Frontiers, released in November 2006, leaned heavily into the Dragon theme and δ Species mechanics with 101 cards. For the first time, Charizard appeared as a Water type — an intentionally bizarre choice that made the card immediately iconic. Gold Star Charizard, available here, is one of the most valuable Gold Stars ever produced and a centrepiece of EX-era collections.`,

  ex16: `EX Power Keepers, released in February 2007, was the final set of the EX era with 108 cards. It served as a compilation of sorts, reprinting ex Pokémon from across the series while adding new artwork and some new inclusions. Though not as thematically bold as its predecessors, it rounded out the EX era neatly and is collected as the bookend of a beloved chapter in the TCG's history.`,

  // ── Diamond & Pearl Series ───────────────────────────────────────────────────
  dp1: `Diamond & Pearl, released in May 2007, launched the Generation IV era and one of the most significant mechanical overhauls in TCG history. The set introduced Pokémon Lv.X — powerful level-up cards placed on existing Pokémon. It also separated Supporter and Stadium cards from the generic Trainer category for the first time, clarifying the game's rules. Dialga and Palkia Lv.X were the headline cards.`,

  dp2: `Mysterious Treasures, released in August 2007, expanded the Generation IV card pool with 123 cards centred on ancient and mysterious Pokémon, including the Legendary Titans and Lake Guardians. Lucario Lv.X was a standout competitive and collector card. The set's artwork drew on archaeological and mythological themes, resulting in some of the most distinctive imagery of the Diamond & Pearl era.`,

  dp3: `Secret Wonders, released in November 2007, was a 132-card expansion blending Generation I and IV Pokémon, appealing to nostalgia while pushing the game forward. It introduced Gardevoir Lv.X and featured strong holographic versions of popular Pokémon like Charizard and Blastoise. Widely regarded as one of the strongest Diamond & Pearl sets both competitively and as a collector's item.`,

  dp4: `Great Encounters, released in February 2008, included 106 cards with a focus on Legendary Pokémon including Darkrai, Cresselia, and Regigigas. Darkrai Lv.X became one of the most competitive cards of its format. The set is remembered for its excellent artwork, particularly the atmospheric illustrations of the dark and psychic legendaries that dominated its upper rare slots.`,

  dp5: `Majestic Dawn, released in May 2008, focused on the Sinnoh Lake Guardians — Uxie, Mesprit, and Azelf — alongside early-route Pokémon like Eevee and its evolutions. Leafeon Lv.X and Glaceon Lv.X were centrepiece cards and became competitive staples. The 100-card set's artwork captured a fresh, pastoral quality that made it visually distinct from other Diamond & Pearl releases.`,

  dp6: `Legends Awakened, released in August 2008, was the largest Diamond & Pearl set with 146 cards and introduced the concept of oversized Lv.X cards for the first time. Regigigas Lv.X was particularly notable for its dramatic scale. The set also included a large number of Legendary and pseudo-Legendary Pokémon, making it a favourite for collectors who gravitated toward powerful and dramatic subjects.`,

  dp7: `Stormfront, released in November 2008, closed out the main Diamond & Pearl series with 106 cards. It introduced the first "secret rare" cards to exceed a set's printed total — a concept that would become a permanent TCG feature. Shiny Pokémon appeared as extremely rare Gold Star-style inclusions, including a highly coveted Shiny Charizard. These Secret Rares immediately became some of the most chased cards of the era.`,

  // ── Platinum Series ──────────────────────────────────────────────────────────
  pl1: `Platinum, released in February 2009, launched the short but distinctive Platinum sub-series with 133 cards. It tied into the Pokémon Platinum game and introduced Pokémon SP — cards representing Pokémon belonging to specific trainers, including rivals and villains. Giratina, in both its Altered and Origin Formes, headlined the set. The framing device of trainer-owned Pokémon added new narrative flavour.`,

  pl2: `Rising Rivals, released in May 2009, expanded the SP (Special) Pokémon concept further with 120 cards. Cards like Flint's Infernape and Volkner's Luxray brought Gym Leaders' Pokémon back to the spotlight. The Lv.X mechanic reached its peak here, with particularly striking full-art-adjacent illustrations. It remains one of the more beloved Platinum-era sets among collectors of that period.`,

  pl3: `Supreme Victors, released in August 2009, was a 153-card set with one of the largest card counts of the era. It introduced Arceus as a recurring motif across multiple cards — the first time a single Legendary Pokémon had so many variants in one expansion. Charizard G Lv.X became an instant collector's item. The set's scale and ambition set the stage for the Arceus set that followed.`,

  pl4: `Arceus, released in November 2009, was built around the mythical Pokémon Arceus and its 17 type plates. Multiple Arceus cards were included representing each type, along with an Arceus Lv.X for each. This was the first set truly structured around a single Pokémon's mythology. Its 99-card count was modest, but the thematic cohesion and colourful artwork made it a unique and beloved entry in the Platinum series.`,

  // ── HeartGold & SoulSilver Series ────────────────────────────────────────────
  hgss1: `HeartGold & SoulSilver, released in February 2010, marked the transition to Generation II remakes and introduced a bold new card layout. The LEGEND card type debuted here — two-card pieces (top and bottom halves) that formed a single powerful Pokémon when played together. Lugia LEGEND and Ho-Oh LEGEND were the flagship cards. The set also introduced Pokémon Prime as a new high-rarity category.`,

  hgss2: `Unleashed, released in May 2010, continued the HeartGold & SoulSilver era with 95 cards and more Johto favourites. Jirachi and Steelix Prime were standout inclusions. The set refined the LEGEND and Prime mechanics introduced in the base HGSS set. Collector-favourite artwork for Pokémon like Houndoom and Ninetales helped give the set a warmer, more characterful identity than many contemporaries.`,

  hgss3: `Undaunted, released in August 2010, brought Raikou & Suicune LEGEND and Entei & Raikou LEGEND — completing the full set of Johto Legendary Beast LEGENDs across the HGSS era. Umbreon Prime and Espeon Prime became instant collector and competitive favourites. The dark-toned artwork befitting the "undaunted" theme gave the set a dramatic and atmospheric feel.`,

  hgss4: `Triumphant, released in November 2010, closed out the HeartGold & SoulSilver era with 102 cards. Yanmega Prime and Magnezone Prime became dominant forces in the competitive meta. The LEGEND format was retired with this set. Celebi Prime was a notable collector card. The set is remembered fondly as the end of one of the game's most visually cohesive eras.`,

  col1: `Call of Legends was a 95-card set released in February 2011, serving as a transitional bridge between HeartGold & SoulSilver and the incoming Black & White era. It reprinted powerful Pokémon and introduced Shiny Pokémon as rare foil inserts — a preview of what the upcoming era would do with rare treatments. The reverse-holo treatment used throughout the set is distinctive and appreciated by collectors.`,

  // ── Black & White Series ─────────────────────────────────────────────────────
  bw1: `Black & White, released in April 2011, launched Generation V in the TCG and introduced the era's defining mechanic: Pokémon-EX (stylised with a capital EX, distinct from the earlier Pokémon-ex). These full-art cards depicted Pokémon in dynamic poses against abstract backgrounds and immediately changed what players expected from rare cards. Reshiram-EX and Zekrom-EX headlined the launch.`,

  bw2: `Emerging Powers, released in August 2011, expanded the Unova Pokédex in the TCG with 98 cards. It introduced several powerful new Pokémon-EX and a wave of Supporter cards that redefined competitive deckbuilding. Gothitelle and Tornadus EX were particularly impactful in the meta. The set's straightforward design belied the competitive influence it had on the 2011–12 tournament season.`,

  bw3: `Noble Victories, released in November 2011, introduced the legendary Pokémon N as a Supporter card — which went on to become one of the most iconic and widely used cards in TCG history. The 101-card set also brought Victini EX and a range of new Unova Pokémon. The N card alone cemented Noble Victories' place in competitive TCG history as one of the most influential sets ever printed.`,

  bw4: `Next Destinies, released in February 2012, introduced Mewtwo EX — immediately one of the most controversial and dominant cards in the game's history. Its X-Ball attack scaled in power with the Energy attached to both active Pokémon, creating a format-defining threat. Shaymin EX and Regigigas EX also featured. The set brought some of the most visually striking full-art EX cards of the early Black & White era.`,

  bw5: `Dark Explorers, released in May 2012, channelled the spirit of the original Team Rocket era with 111 cards themed around Dark-type Pokémon and Team Plasma. Darkrai EX became an immediate competitive powerhouse that dominated the format for over a year. The set also introduced the first Supporter cards based on Team Plasma members. Raikou EX and Entei EX were popular collector picks.`,

  bw6: `Dragons Exalted, released in August 2012, was one of the largest and most celebrated Black & White sets with 124 cards. It introduced Rayquaza EX — one of the most popular and visually iconic EX cards ever printed — and featured a wide sweep of Dragon-type Pokémon. The full-art Rayquaza EX with its swirling sky background became a poster image for the era and remains highly collected.`,

  bw7: `Boundaries Crossed, released in November 2012, was notable for 149 cards and for the introduction of ACE SPEC cards — ultra-powerful Item cards limited to one per deck. Computer Search and Crystal Wall were among the original ACE SPECs. The set also included Cresselia EX and Black Kyurem EX, and its large card count provided significant depth for both collectors and competitors.`,

  bw8: `Plasma Storm, released in February 2013, leaned into the Team Plasma narrative with 135 cards and introduced Team Plasma Pokémon — cards belonging to the villainous organisation. Lugia EX became an immediate fan favourite and competitive staple. The set also introduced the Colourless Blizzard Burn Pokémon-EX format and Caitlin as a new Supporter. Plasma Storm remains one of the most beloved Black & White sets.`,

  bw9: `Plasma Freeze, released in May 2013, continued the Team Plasma storyline with 122 cards. Deoxys EX was the headliner, becoming a key piece of the dominant Plasma deck archetype of the 2013 season. The set introduced a range of powerful Plasma Pokémon that combined synergistically with Team Plasma Trainers across the era. Thundurus EX was another competitive standout.`,

  bw10: `Plasma Blast, released in August 2013, concluded the Team Plasma trilogy with 101 cards. Genesect EX debuted here and became one of the strongest cards of its era. The set introduced Pokémon-EX via the Megalo Cannon concept. Rare Candy reprints and new ACE SPEC cards helped flesh out the competitive landscape. Glaceon EX was a notable collector card with striking winter imagery.`,

  bw11: `Legendary Treasures, released in November 2013, was a 115-card set and the final release of the Black & White era. It served as a celebration of the Generation V period, featuring reprints and new versions of iconic Pokémon including Reshiram, Zekrom, and Kyurem. A special 45-card Radiant Collection sub-set featuring sparkly Fairy-type cards added a unique flavour that previewed the incoming XY era.`,

  // ── XY Series ────────────────────────────────────────────────────────────────
  xy1: `XY, released in February 2014, launched the Generation VI era and introduced two landmark changes. The Fairy type was added to the TCG for the first time, giving Pokémon like Gardevoir and Sylveon a proper home. Mega Evolution EX cards — which could only be played by Mega Evolving an existing Pokémon-EX — made their debut, opening a new design space. Xerneas EX and Yveltal EX were the flagship Legendaries.`,

  xy2: `Flashfire, released in May 2014, turned the spotlight onto Fire-type Pokémon with 106 cards. Charizard EX appeared in multiple forms including a stunning full-art version and the format-defining Mega Charizard EX (both X and Y variants). The set was hugely popular at release due to Charizard's enduring appeal. It also introduced M Charizard EX-Y, which became one of the best-selling single cards of the XY era.`,

  xy3: `Furious Fists, released in August 2014, celebrated Fighting-type Pokémon with 111 cards and introduced the first Strong Energy — a Special Energy that boosted Fighting-type damage. Hawlucha EX and Lucario EX headlined a set that competitive players found highly impactful. The set also featured Dragonite EX with a charming art style. Strong Energy's introduction fundamentally shifted competitive play toward Fighting decks.`,

  xy4: `Phantom Forces, released in November 2014, brought Ghost and Dark themes with 119 cards. It introduced the first Night March cards — Lampent, Pumpkaboo, and Joltik — which years later became the backbone of one of the most dominant budget decks in the game's history. Gengar EX and Aegislash EX were notable inclusions. Phantom Forces is remembered as a sleeper hit with long-lasting competitive relevance.`,

  xy5: `Primal Clash, released in February 2015, was a 160-card set built around Primal Reversion — the mechanic powering Primal Kyogre EX and Primal Groudon EX. These were some of the most powerful cards of the XY era and required special Ancient Trait energy acceleration. The set introduced the Ancient Trait mechanic across many cards, adding passive abilities that broadened deck-building creativity.`,

  xy6: `Roaring Skies, released in May 2015, focused on Flying and Dragon-type Pokémon with 108 cards. Shaymin EX made its TCG debut and became one of the most important cards of its era — its Sky Return and Set Up Ability (which drew cards when played from the hand) made it an auto-include in virtually every competitive deck for years. A single card rarely shifts an entire format's dynamic as dramatically as Shaymin EX did.`,

  xy7: `Ancient Origins, released in August 2015, introduced Mega Ampharos EX, Mega Sceptile EX, and a memorable Hoopa EX. The set brought the Unbound mechanic for Hoopa EX, letting players search for EX Pokémon from the deck — another format-defining Ability. Ancient Origins is also notable for Tyranitar EX's artwork and for being one of the more visually striking mid-series XY sets.`,

  xy8: `BREAKthrough, released in November 2015, introduced a brand-new card type: Pokémon BREAK. These oversized yellow cards sat on top of existing Pokémon and granted bonus HP and attacks while retaining the base Pokémon's original rules. Raichu BREAK, Zoroark BREAK, and Chesnaught BREAK were early favourites. The dramatic BREAK design — translucent gold foil on a bold yellow frame — immediately stood out.`,

  xy9: `BREAKpoint, released in February 2016, expanded the BREAK mechanic with popular Pokémon in striking new card treatments. Gyarados EX and its BREAK variant became a competitive deck archetype. M Audino EX and the new Talonflame were meta-relevant. The set is widely remembered for the Gyarados BREAK combo deck and for some of the most vivid and cinematic artwork in the XY series.`,

  xy10: `Fates Collide, released in May 2016, merged two Generation VI themes with 124 cards. Mega Alakazam EX, Mega Altaria EX, and Zygarde EX were highlights. The set also introduced the first Pokémon cards for Shiny Mega Rayquaza, which carried enormous collector appeal. A Mega Slowbro EX card and some excellent Trainer cards helped round out a solid competitive and collector experience.`,

  xy11: `Steam Siege, released in August 2016, introduced the Dual-type mechanic for the first time since the Team Magma vs Team Aqua era. Cards like Volcanion EX had two types simultaneously, opening new defensive and strategic options. Mega Gardevoir EX became competitive staple and collector favourite. The set's industrial, steampunk aesthetic inspired by Gear Pokémon gave it a distinctive visual identity.`,

  xy12: `Evolutions, released in November 2016, was a love letter to the original Base Set on the TCG's 20th anniversary. The 108-card set reprinted iconic cards like Base Charizard, Blastoise, and Venusaur with classic artwork, while adding modern rarities like Mega Charizard EX and Mega Blastoise EX. Immensely popular with nostalgic collectors, Evolutions is one of the most opened sets of the XY era.`,

  g1: `Generations was a special 115-card set released in February 2016 to celebrate the TCG's 20th anniversary, sold exclusively in special anniversary collections. It revisited iconic Kanto Pokémon and Legendaries with fresh artwork in a modern style. The Radiant Collection sub-set (for the Mewtwo vs. Mew box) featured particularly striking alternate-art Pokémon. As a limited distribution set, individual packs are difficult to find loose.`,

  // ── Sun & Moon Series ────────────────────────────────────────────────────────
  sm1: `Sun & Moon, released in February 2017, launched Generation VII in the TCG with a sweeping 149-card set. Most significantly, it introduced Pokémon-GX — a new card type with a unique GX attack usable only once per game. The GX mechanic immediately became a major creative canvas, with full-art and rainbow-rare versions of each GX card. Solgaleo-GX and Lunala-GX headlined the launch.`,

  sm2: `Guardians Rising, released in May 2017, expanded the Alola card pool with 169 cards. Tapu Koko-GX and Tapu Lele-GX became instant competitive staples — Tapu Lele-GX's Wonder Tag Ability (searching for a Supporter) was so powerful it saw play for years. Wishiwashi-GX and Vikavolt-GX added fun deck archetypes. The set cemented GX cards as the new dominant card type in competitive play.`,

  sm3: `Burning Shadows, released in August 2017, brought 169 cards with Alolan Pokémon and a focus on Darkness-type themes. Necrozma-GX, Gardevoir-GX, and Marshadow-GX were headliners. The set introduced the Rainbow Rare treatment — a prismatic, full-art foil applied to GX and Trainer cards as the highest rarity tier. Rainbow Rares immediately became some of the most sought-after cards in the modern era.`,

  sm35: `Shining Legends was an 78-card special set released in October 2017, sold exclusively in special collections and blister packs. It revived the Shining Pokémon concept with a suite of Shiny-coloured Pokémon cards with glittering foil treatments. Shining Charizard, Shining Mew, and Shining Rayquaza became instant collector icons. Mewtwo-GX's multiple variants made this a prestige set from release.`,

  sm4: `Crimson Invasion, released in November 2017, introduced the Ultra Beasts to the TCG — extradimensional Pokémon from beyond the Ultra Wormhole. Buzzwole-GX, Kartana-GX, and Nihilego-GX headlined the 111-card set. Ultra Beasts' alien design language translated brilliantly to card art, with some of the most otherworldly and dramatic illustrations of the Sun & Moon era. Guzma became a widely played Supporter card.`,

  sm5: `Ultra Prism, released in February 2018, focused on the Ultra Space narrative and introduced Prism Star cards — a new rare category where only one copy could be included in a deck. Dusk Mane Necrozma-GX and Dawn Wings Necrozma-GX were the flagship GX cards. Prism Star cards for Dialga, Palkia, and Lunala added powerful, rule-bending effects. The Prism Star mechanic brought genuine new deckbuilding constraints.`,

  sm6: `Forbidden Light, released in May 2018, introduced Ultra Necrozma-GX and expanded the Ultra Beasts line-up. The 131-card set also featured the debut of Zygarde-GX and a wave of new Pokémon with strong competitive applications. Naganadel-GX and Garchomp became particularly impactful in competitive play. The set's focus on powerful, otherworldly Pokémon gave its artwork a consistently dramatic, high-stakes visual tone.`,

  sm7: `Celestial Storm, released in August 2018, was a 183-card set that revisited the Hoenn region and introduced the Weather trio — Groudon, Kyogre, and Rayquaza — in GX form. It revived the ACE SPEC concept under a new name (Prism Star Items) and introduced the Lost Zone mechanic as a discard alternative. Rayquaza-GX featured one of the most iconic artworks of the era, dominating competitive play and collectors' wish lists alike.`,

  sm75: `Dragon Majesty was a 70-card special set released in September 2018, sold exclusively in collections and blister packs. As its name suggests, it focused on Dragon-type Pokémon including Drampa-GX, Dragonite-GX, and Lance's Charizard-GX. The set's tight focus and exclusive distribution made it a collector's favourite. Shiny Rayquaza and Shiny Charizard cards were particularly prized.`,

  sm8: `Lost Thunder, released in November 2018, was the largest Pokémon TCG set ever printed at the time with 214 cards. It brought back the Lost Zone mechanic prominently, introduced Zeraora-GX, and contained a record number of Trainer and Special Energy cards. The sheer scale of Lost Thunder was unprecedented and signalled the direction the TCG would take — larger sets, more variants, more collector tiers.`,

  sm9: `Team Up, released in February 2019, introduced TAG TEAM GX cards — cards featuring two Pokémon sharing a single card, with sky-high HP and devastating combined GX attacks. Pikachu & Zekrom-GX, Eevee & Snorlax-GX, and Gengar & Mimikyu-GX debuted here to enormous excitement. TAG TEAMs redefined the upper rarity tier and their full-art and rainbow variants became the most desirable cards of the era.`,

  sm10: `Unbroken Bonds, released in May 2019, expanded the TAG TEAM format aggressively with 234 cards — one of the largest sets of its era. Reshiram & Charizard-GX, Gardevoir & Sylveon-GX, and Lucario & Melmetal-GX headlined an enormous card pool. The set also introduced new Trainer and Energy cards that shifted competitive play significantly. Reshiram & Charizard-GX's alternate art became one of the generation's iconic images.`,

  sm11: `Unified Minds, released in August 2019, was another massive 236-card set bringing more TAG TEAM Pokémon including Mewtwo & Mew-GX — a single card that could mimic any GX attack from GX Pokémon in play. Mewtwo & Mew's power level was unprecedented and made it an instant centrepiece of competitive and collector interest. Garchomp & Giratina-GX and Umbreon & Darkrai-GX were other stand-outs.`,

  sm115: `Hidden Fates was a special 69-card set released in August 2019 with one of the most celebrated collectors' sub-sets of the modern era: the Shiny Vault. This 94-card Shiny Pokémon sub-set featured glittering Shiny versions of popular Pokémon in brand-new artwork. Shiny Charizard-GX became the most sought-after card of 2019 and drove enormous demand for the set. Hidden Fates boxes commanded premium prices for years after release.`,

  sm12: `Cosmic Eclipse, released in November 2019, was the final set of the Sun & Moon era with 236 cards. It added more TAG TEAM GX Pokémon including Arceus & Dialga & Palkia-GX — a TAG TEAM of three Pokémon, the first ever. The set closed the GX era with a celebration of beloved Pokémon and Trainers across the franchise's history. Its final card, Venusaur & Snivy-GX, served as a bittersweet farewell to the GX format.`,

  // ── Sword & Shield Series ────────────────────────────────────────────────────
  swsh1: `Sword & Shield, released in February 2020, launched Generation VIII in the TCG and introduced Pokémon V and Pokémon VMAX — the successors to EX and Mega Evolution. V cards were large, powerful single-Pokémon cards, while VMAX represented Dynamax Pokémon with record-breaking HP values (often 300+). Zacian V and Zamazenta V headlined the launch. The card design adopted a bold new aesthetic with clean geometric frames.`,

  swsh2: `Rebel Clash, released in May 2020, expanded the Sword & Shield card pool with 192 cards. Dragapult VMAX and Boltund V were standout competitive cards. The set also introduced numerous new Supporter cards based on Galar-region characters and the first Trainer Gallery-style alternate-art cards for certain V Pokémon. Released during the global pandemic, Rebel Clash saw unprecedented demand as the hobby surged in popularity.`,

  swsh3: `Darkness Ablaze, released in August 2020, introduced Eternatus VMAX — a card with the highest-ever HP printed on a standard card at that time (340 HP) and a game-defining Ability that filled the Bench with Darkness Pokémon. Charizard VMAX (both standard and the ultra-rare Secret version) drove enormous collector demand. The TCG hobby boom of 2020 saw this set become one of the most widely sought-after of the era.`,

  swsh35: `Champion's Path was a 73-card special set released in October 2020, available exclusively in Champion's Path collections. It celebrated the Galar Gym Leaders with themed cards and visually stunning full-art V cards for Pokémon associated with each Gym. Charizard V (Secret Rainbow Rare) became one of the most desirable and valuable modern-era cards, selling for hundreds at peak market conditions.`,

  swsh4: `Vivid Voltage, released in November 2020, introduced the Amazing Rare card type — a new rarity featuring non-holographic cards with striking stained-glass-style artwork. Jirachi Amazing Rare and Rayquaza Amazing Rare were immediate collector favourites. Pikachu VMAX (the rainbow-coloured "Birthday Pikachu" version) became another icon of the era. The set brought visual creativity to the forefront during the height of the TCG hobby boom.`,

  swsh45: `Shining Fates, released in February 2021, was a special 73-card set with a massive 122-card Shiny Vault sub-set — the largest ever. Like Hidden Fates before it, it featured Shiny Pokémon in brand-new artwork across every product in the line. Shiny Charizard VMAX became the centrepiece card and one of the most valuable modern Pokémon cards ever produced, reaching extraordinary secondary market prices.`,

  swsh5: `Battle Styles, released in March 2021, introduced the Single Strike and Rapid Strike mechanics — two combat styles that synergised with dedicated Trainer and Energy cards. Urshifu VMAX appeared in both Single Strike (Dark-type) and Rapid Strike (Water-type) variants, each with its own competitive archetype. The dual-style mechanic added a new dimension to deckbuilding strategy and gave the set strong competitive longevity.`,

  swsh6: `Chilling Reign, released in June 2021, focused on the Crown Tundra region and introduced the Legendary Pokémon of that area: Calyrex Ice Rider VMAX and Calyrex Shadow Rider VMAX. The Alternate Art variant card treatment — featuring illustrated backgrounds and action poses rather than the standard floating-on-white aesthetic — was refined and popularised here, with Alternate Art Shadow Rider Calyrex becoming one of the era's most iconic cards.`,

  swsh7: `Evolving Skies, released in August 2021, celebrated Dragon-type and Eevee-family Pokémon with 237 cards. It contained the most Alternate Art rare cards of any set to that point, including standout pieces for all eight Eeveelutions. Rayquaza VMAX (Alternate Art) became one of the most valuable cards of the entire Sword & Shield era. Evolving Skies is widely considered the pinnacle of the era for collectors.`,

  swsh8: `Fusion Strike, released in November 2021, was the largest Pokémon TCG set ever released at the time with 264 cards. It introduced the Fusion Strike mechanic alongside Mew VMAX, which could copy any Fusion Strike Pokémon's attacks — a powerful and flexible toolbox strategy that dominated competitive play for months. The sheer scale and diverse card pool made Fusion Strike both a collector's challenge and a competitive staple.`,

  swsh9: `Brilliant Stars, released in February 2022, introduced the VSTAR mechanic — replacing VMAX as the new pinnacle of Pokémon power. VSTAR cards came with a unique VSTAR Power (either a powerful attack or Ability) usable once per game. Arceus VSTAR headlined the set and became one of the most dominant competitive cards of its era. Brilliant Stars also introduced the Trainer Gallery sub-set — full-art cards showing Pokémon alongside their Trainers.`,

  swsh10: `Astral Radiance, released in May 2022, expanded the VSTAR format with Origin Forme Palkia VSTAR and Hisuian Pokémon making their TCG debut. The Hisui region's designs translated beautifully to card art. Radiant Pokémon — a new single-copy rare category with unique attacks — debuted here. Astral Radiance is remembered for bridging Hisui's visual identity into the TCG with exceptional artwork quality throughout.`,

  swsh11: `Lost Origin, released in September 2022, revived the Lost Zone mechanic as a core deckbuilding theme. Giratina VSTAR and Aerodactyl VSTAR were the headline V cards, while Lost Box (using Comfey and Colress's Experiment to rapidly fill the Lost Zone) became one of the strongest competitive archetypes of the era. The set's dark, dimensional artwork leaned into the eerie, void-like nature of the Lost Zone theme.`,

  swsh12: `Silver Tempest, released in November 2022, introduced Lugia VSTAR as its headliner — with an Ability capable of recovering Pokémon from the discard pile, creating a powerful new archetype. The Trainer Gallery sub-set featured some of its most acclaimed artwork to date. Regidrago VSTAR became a fun rogue-deck centrepiece. Silver Tempest closed out the main Sword & Shield era on a strong artistic and competitive note.`,

  cel25: `Celebrations was a special 25-card set released in October 2021 to mark the Pokémon franchise's 25th anniversary. Each card was a faithful reprint of a historically significant card from throughout the TCG's history — including Base Set Charizard, Neo Destiny Shining Charizard, and Gold Star Pikachu — with updated rarity treatments. A 25-card Classic Collection sub-set reprinted iconic vintage cards with modern card stock. Hugely popular with nostalgic collectors.`,

  swsh12pt5: `Crown Zenith, released in January 2023, was the grand finale of the Sword & Shield era — a 160-card set combining reprints and new versions of beloved Sword & Shield Pokémon. The 70-card Galarian Gallery sub-set contained some of the most visually spectacular alternate-art cards of the entire era, including Kyogre, Regieleki & Regidrago VSTAR, and Pikachu VMAX. Crown Zenith was a celebration and a farewell to one of the TCG's most prolific eras.`,

  // ── Scarlet & Violet Series ───────────────────────────────────────────────────
  sv1: `Scarlet & Violet, released in March 2023, launched Generation IX in the TCG with 258 cards and a complete visual overhaul. The card frame was redesigned for the first time in years — Pokémon portraits now extended behind the card's HP and type information. ex cards returned (distinguished from the original 2003 Pokémon-ex by capitalisation) and brought with them Illustration Rare and Special Illustration Rare as new premium art tiers, raising the ceiling for card artistry.`,

  sv2: `Paldea Evolved, released in June 2023, was a 279-card expansion and one of the largest sets in the game's history. It fleshed out the Paldea Pokédex substantially and introduced more ex cards and Double Rare variants. Special Illustration Rares featuring Pokémon and Trainers in unique illustrated scenes became the defining collector tier. Several new ACE SPEC cards were introduced, bringing back the one-per-deck ultra-Item mechanic from Black & White.`,

  sv3: `Obsidian Flames, released in August 2023, spotlighted Tera-type Pokémon — Pokémon with a changed type due to the Terastallization mechanic. Charizard ex (Tera Fire-type, with black colouration) became one of the most wanted modern Pokémon cards, particularly in its Special Illustration Rare and Hyper Rare forms. The set's dramatic dark-on-flame colour palette gave it immediate visual identity.`,

  'sv3pt5': `151, released in September 2023, was a love letter to Generation I — a 165-card set featuring all 151 original Pokémon. Every Pokémon from Bulbasaur to Mew received a card, making it one of the most completable collector's sets ever produced. The ex variants of Venusaur, Charizard, Blastoise, and Mewtwo were highlights. The set sold out rapidly worldwide, driven by overwhelming nostalgia and its elegant conceptual premise.`,

  sv4: `Paradox Rift, released in November 2023, introduced Ancient and Future Paradox Pokémon — prehistoric and futuristic variants of familiar species from the Area Zero storyline. Iron Valiant and Roaring Moon ex headlined the set's 182 cards. The split between ancient-organic and future-mechanical aesthetics produced dramatically different artwork styles within a single set. Collectors were drawn to its visual ambition and conceptual daring.`,

  'sv4pt5': `Paldean Fates, released in January 2024, was a special 245-card set functioning as the Shiny set of the Scarlet & Violet era. Shiny versions of Paldean Pokémon featured throughout, with Shiny Charizard ex as the headline card. Rather than a traditional Shiny Vault, all non-ex cards featured Shiny designs, making every pack feel premium. The set's pastel shiny colour treatments gave it an ethereal, beautiful aesthetic.`,

  sv5: `Temporal Forces, released in March 2024, continued the Ancient and Future Paradox theme and introduced Ace Spec cards as part of the standard set for the first time — rather than as a special release. Walking Wake ex and Iron Leaves ex headlined 162 cards. The ACE SPEC reprints and new additions brought competitive depth. The Illustration Rare cards depicting Pokémon in atmospheric temporal settings were particularly well-received.`,

  sv6: `Twilight Masquerade, released in May 2024, themed around the Loyal Three and Ogerpon — the foxlike Legendary Pokémon of the Teal Mask DLC. Ogerpon ex in its four mask variants became instant collector centrepieces, each with unique type, attack, and stunning illustration. The masquerade visual theme inspired some of the most ornate and decorative card artwork of the Scarlet & Violet era.`,

  'sv6pt5': `Shrouded Fable, released in August 2024, was a special 99-card set themed around the Loyal Three and the mythology of the Kitakami region. Pecharunt ex headlined a focused, smaller-than-usual release. Its compact card pool made it more completable than standard sets. The Japanese folklore-inspired artwork — featuring lanterns, festivals, and autumnal scenery — gave Shrouded Fable an aesthetic unlike any contemporary set.`,

  sv7: `Stellar Crown, released in September 2024, introduced Stellar Tera-type Pokémon — a special Terastallization form representing the ultimate expression of the mechanic. Terapagos ex in its Stellar form was the centrepiece card of 175 cards. The celestial, crystal-star visual theme produced some of the era's most dazzling artwork. Several Illustration Rares featured Pokémon bathed in starlight and cosmic imagery.`,

  'sv7pt5': `Surging Sparks, released in November 2024, was a 191-card celebration of Pikachu and the Raichu evolutionary line, released to coincide with Pokémon's ongoing anniversary celebrations. Multiple Pikachu ex variants, a range of Electric-type Pokémon, and a bumper crop of Special Illustration Rares made it one of the most collector-focused sets of the era. Raichu ex's full-art variants were particularly sought-after.`,

  sv8: `Prismatic Evolutions, released in January 2025, centred on the Eevee evolutionary family — all eight Eeveelutions received ex cards alongside Eevee itself. The set's prismatic light-refracting visual theme gave every card a brilliant, jewel-like quality. The Eevee-centric focus echoed Evolving Skies from the previous era and immediately drove enormous collector demand. Eeveelution Illustration Rares became the most competitive pull targets of early 2025.`,

  sv8pt5: `Destined Rivals, released in March 2025, explored the rivalry theme across the Pokémon franchise, pairing iconic Pokémon and their rivals across multiple generations. The 140-card set featured unique dual-composition Illustration Rares depicting classic rivalries in single frames. Competitive players found strong new ACE SPEC and Supporter inclusions. The emotional resonance of the rivalry theme translated into some of the era's most narrative-rich card artwork.`,

  // ── Mega Evolution Series ─────────────────────────────────────────────────────
  me1: `The first set in the Mega Evolution series, this expansion brought back Mega Evolution as a core mechanic for the Scarlet & Violet era — reimagining the powerful Kalos transformation in a modern card framework. Mega Pokémon returned as ex cards with distinctive Mega-evolution artwork, blending nostalgia for the XY era with the visual polish of the Scarlet & Violet card frame. A landmark release for fans of the Generation VI games.`,

  me2: `The second Mega Evolution set continued expanding the roster of Mega-evolved Pokémon available in the modern era. New Mega ex cards and their associated Illustration Rare variants drove collector enthusiasm. The series' consistent focus on visually dramatic Mega Evolution artwork — showcasing Pokémon mid-transformation — gave each set a kinetic, high-energy identity distinct from other Scarlet & Violet releases.`,

  me3: `The third Mega Evolution set deepened the series' competitive and collector credentials. ACE SPEC cards and Double Rare Mega ex variants gave competitive players strong new tools, while Illustration Rare and Special Illustration Rare treatments of beloved Mega-evolved Pokémon kept collector interest high. The set continued building on the series' blend of nostalgic Mega Evolution appeal and modern card design.`,

  me4: `Chaos Rising is the fourth set in the Mega Evolution series, continuing the celebration of Mega Evolution Pokémon from the Kalos region. The set introduces Mega Pyroar ex, Mega Greninja ex, Mega Floette ex, Mega Dragalge ex, and Mega Gallade ex as new Double Rare and Ultra Rare cards, alongside a suite of Illustration Rares and Special Illustration Rares. The lone Mega Hyper Rare — Mega Greninja ex — represents the pinnacle pull of the set and is among the most striking cards in the Mega Evolution series.`,
}

export default descriptions
