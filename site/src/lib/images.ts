/**
 * Real-photography manifest. A destination or attraction appears here ONLY
 * once a properly licensed image has been sourced, visually verified, and
 * logged in /assets/images/<slug>/SOURCES.md. Anything absent falls back to
 * the honest photo-slot placeholder — never a loosely related substitute.
 */
export interface ImageEntry {
  src: string;
  alt: string;
}

interface DestinationImages {
  hero?: ImageEntry;
  attractions: Record<string, ImageEntry>;
}

const DESTINATION_IMAGES: Record<string, DestinationImages> = {
  goa: {
    hero: {
      src: "/images/goa/hero.jpg",
      alt: "Palm-fringed North Goa coastline seen from a hilltop, with beachgoers on the sand, rocky outcrops in the surf and the Arabian Sea fading to a hazy horizon",
    },
    attractions: {
      "Basilica of Bom Jesus": {
        src: "/images/goa/basilica-of-bom-jesus.jpg",
        alt: "The red laterite facade of the Basilica of Bom Jesus in Old Goa rising behind a huge rain tree, with visitors resting on the lawn in front",
      },
      "Dudhsagar Falls": {
        src: "/images/goa/dudhsagar-falls.jpg",
        alt: "White cascades of Dudhsagar Falls pouring down dark rock into a still green plunge pool, a sunlit boulder in the foreground",
      },
      "Fontainhas, Panaji": {
        src: "/images/goa/fontainhas.jpg",
        alt: "A narrow paved lane in Fontainhas, Panaji, lined by heritage houses with a bright blue shuttered shopfront and a scooter parked mid-lane",
      },
      "Fort Aguada": {
        src: "/images/goa/fort-aguada.jpg",
        alt: "The white four-storey lighthouse of Fort Aguada standing over the fort's laterite ramparts, with the river mouth and sea behind",
      },
      "Baga & Calangute beach belt": {
        src: "/images/goa/baga-calangute.jpg",
        alt: "Three parasailers being towed above water-sports boats in the surf off Baga Beach in the late-afternoon haze",
      },
      "Anjuna Flea Market": {
        src: "/images/goa/anjuna-flea-market.jpg",
        alt: "Rows of jewellery and handicraft stalls under Anjuna Flea Market's woven-palm canopy, dappled sunlight falling on browsing shoppers",
      },
    },
  },
  kerala: {
    hero: {
      src: "/images/kerala/hero.jpg",
      alt: "A two-deck kettuvallam houseboat moored along a palm-lined bank of the Kerala backwaters under a clear sky",
    },
    attractions: {
      "Alleppey Backwaters": {
        src: "/images/kerala/alleppey-backwaters.jpg",
        alt: "A thatched houseboat on the Alleppey backwaters at sunset, coconut palms silhouetted behind and sunlight glinting off the water",
      },
      "Munnar": {
        src: "/images/kerala/munnar.jpg",
        alt: "Rolling contours of the Lockhart tea plantation at Munnar, bright green tea bushes rising toward forested Western Ghats ridges",
      },
      "Periyar Tiger Reserve, Thekkady": {
        src: "/images/kerala/periyar-thekkady.jpg",
        alt: "Safari boats cruising Periyar Lake past the bleached trunks of drowned trees, forested hills behind",
      },
      "Fort Kochi": {
        src: "/images/kerala/fort-kochi.jpg",
        alt: "A shore-operated Chinese fishing net silhouetted over the water at Fort Kochi as the sun sets behind clouds",
      },
      "Kathakali performance": {
        src: "/images/kerala/kathakali.jpg",
        alt: "Close-up of a Kathakali performer in a female role — painted face, bold black eye make-up, silver headdress and heavy jewellery",
      },
      "Athirappilly Falls": {
        src: "/images/kerala/athirappilly-falls.jpg",
        alt: "The wide white curtain of Athirappilly Falls dropping off a forested plateau in full monsoon flow",
      },
    },
  },
  rajasthan: {
    hero: {
      src: "/images/rajasthan/hero.jpg",
      alt: "A domed rooftop pavilion of Jaipur's City Palace with the royal standard flying, cream and pink against a monsoon sky",
    },
    attractions: {
      "Amber Fort, Jaipur": {
        src: "/images/rajasthan/amber-fort.jpg",
        alt: "The Sheesh Mahal pavilion at Amber Fort behind its star-shaped charbagh garden, marble arches glowing in evening light",
      },
      "Hawa Mahal, Jaipur": {
        src: "/images/rajasthan/hawa-mahal.jpg",
        alt: "The full pink five-storey honeycomb facade of Hawa Mahal with its 953 jharokha windows, street life passing below",
      },
      "Mehrangarh Fort, Jodhpur": {
        src: "/images/rajasthan/mehrangarh-fort.jpg",
        alt: "Cannons on Mehrangarh Fort's ramparts looking straight down over the indigo-washed houses of Jodhpur's Blue City",
      },
      "City Palace, Udaipur": {
        src: "/images/rajasthan/city-palace-udaipur.jpg",
        alt: "Looking up at the carved jharokha balconies and corner turrets of Udaipur's City Palace in golden stone",
      },
      "Jaisalmer Fort": {
        src: "/images/rajasthan/jaisalmer-fort.jpg",
        alt: "The round golden-sandstone bastions of Jaisalmer Fort rising from their sloped stone base against a blue desert sky",
      },
      "Jaipur's walled old city": {
        src: "/images/rajasthan/jaipur-old-city.jpg",
        alt: "Pink-washed heritage facades with domed chhatris above a row of jewellers' shopfronts in Jaipur's walled old city at dusk",
      },
    },
  },
  delhi: {
    hero: {
      src: "/images/delhi/hero.jpg",
      alt: "India Gate at dusk under a pink sky, evening crowds and ice-cream carts on the avenue, the empty canopy visible through the arch",
    },
    attractions: {
      "Red Fort": {
        src: "/images/delhi/red-fort.jpg",
        alt: "The Lahori Gate of the Red Fort with the Indian tricolour flying above its red-sandstone bastions and chhatris",
      },
      "Qutub Minar": {
        src: "/images/delhi/qutub-minar.jpg",
        alt: "The fluted sandstone shaft of Qutub Minar rising behind the ruined arches of the Quwwat-ul-Islam mosque complex",
      },
      "Humayun's Tomb": {
        src: "/images/delhi/humayuns-tomb.jpg",
        alt: "The red-and-white front facade of Humayun's Tomb under its white marble dome, seen down the charbagh garden's axis",
      },
      "Jama Masjid": {
        src: "/images/delhi/jama-masjid.jpg",
        alt: "Jama Masjid's marble-domed prayer hall framed in silhouette through the great eastern gateway arch, worshippers in the courtyard",
      },
      "Chandni Chowk": {
        src: "/images/delhi/chandni-chowk.jpg",
        alt: "A green-and-yellow auto-rickshaw amid the crowds, saree-shop hoardings and tangled signboards of Chandni Chowk",
      },
      "India Gate": {
        src: "/images/delhi/india-gate.jpg",
        alt: "The full 42-metre arch of India Gate from the western lawns, a cyclist walking across the grass in the foreground",
      },
    },
  },
  sikkim: {
    hero: {
      src: "/images/sikkim/hero.jpg",
      alt: "Weathered white prayer flags printed with mantras strung across the frame, misty forested Himalayan ridges and a snow patch behind",
    },
    attractions: {
      "Tsomgo (Changu) Lake": {
        src: "/images/sikkim/tsomgo-lake.jpg",
        alt: "Tsomgo Lake mirroring bare mountain slopes, with a black yak in red tassels standing on the stone shoreline path",
      },
      "Nathula Pass": {
        src: "/images/sikkim/nathula-pass.jpg",
        alt: "The road curving up to Nathula Pass through snow-dusted slopes, the red-roofed border complex on the ridge above",
      },
      "Rumtek Monastery": {
        src: "/images/sikkim/rumtek-monastery.jpg",
        alt: "Rumtek Monastery's ornately painted main hall reflected in a rain-wet courtyard, monks in red robes crossing and mist in the trees",
      },
      "Kanchenjunga viewpoints": {
        src: "/images/sikkim/kanchenjunga.jpg",
        alt: "The snow faces of the Kanchenjunga massif catching first light above a dark silhouetted treeline, seen from Gangtok",
      },
      "MG Marg, Gangtok": {
        src: "/images/sikkim/mg-marg.jpg",
        alt: "Gangtok's pedestrian MG Marg full of evening strollers, ornate lamp posts and the Mahatma Gandhi statue mid-promenade",
      },
      "Gangtok Ropeway": {
        src: "/images/sikkim/gangtok-ropeway.jpg",
        alt: "A red Gangtok Ropeway cabin suspended high above the hill town's stacked houses and winding main road",
      },
    },
  },
  kashmir: {
    hero: {
      src: "/images/kashmir/hero.jpg",
      alt: "Tourists riding a canopied shikara past ornate wooden houseboats on Dal Lake at dusk, snow-dusted mountains behind",
    },
    attractions: {
      "Dal Lake": {
        src: "/images/kashmir/dal-lake.jpg",
        alt: "A flower-seller poling his boat laden with fresh blooms through Dal Lake's lotus pads at sunset",
      },
      "Gulmarg Gondola": {
        src: "/images/kashmir/gulmarg-gondola.jpg",
        alt: "Gulmarg Gondola cabins climbing a cable line through snow-laden pine trees toward the mountain station",
      },
      "Mughal Gardens of Srinagar": {
        src: "/images/kashmir/mughal-gardens.jpg",
        alt: "Nishat Bagh's terraced water channel and flower beds stepping down toward the camera, the Zabarwan mountains rising behind",
      },
      "Pahalgam": {
        src: "/images/kashmir/pahalgam.jpg",
        alt: "The Lidder river running through a green pine-forested valley at Pahalgam, snow peaks filling the horizon",
      },
      "Sonamarg": {
        src: "/images/kashmir/sonamarg.jpg",
        alt: "A glacial stream cutting through Sonamarg's boulder-strewn meadow, snow-capped peaks rising beyond the pines",
      },
      "Saffron fields of Pampore": {
        src: "/images/kashmir/saffron-pampore.jpg",
        alt: "Purple saffron crocus flowers with orange stigmas in close-up, blooming across a ploughed Pampore field",
      },
    },
  },
  france: {
    hero: {
      src: "/images/france/hero.jpg",
      alt: "The Eiffel Tower silhouetted against a deep red sunset above the domed rooftops of Paris",
    },
    attractions: {
      "Eiffel Tower": {
        src: "/images/france/eiffel-tower.jpg",
        alt: "The illuminated Eiffel Tower at night, seen across the Seine beyond the gilded statues of Pont Alexandre III",
      },
      "The Louvre": {
        src: "/images/france/louvre.jpg",
        alt: "The Louvre's glass pyramid glowing gold at dusk, flanked by the palace's ornate stone wings",
      },
      "Palace of Versailles": {
        src: "/images/france/versailles.jpg",
        alt: "The Hall of Mirrors at Versailles, its crystal chandeliers and gilded statues lit under a frescoed vaulted ceiling",
      },
      "Seine river cruise": {
        src: "/images/france/seine-notre-dame.jpg",
        alt: "Notre-Dame's towers and spire lit up at dusk on the Île de la Cité, reflected in the Seine",
      },
      "Nice & the Promenade des Anglais": {
        src: "/images/france/nice-promenade.jpg",
        alt: "The pebble beach and curving seafront of the Promenade des Anglais in Nice, with the city stretching along the bay",
      },
      "Monaco & Èze": {
        src: "/images/france/eze-monaco.jpg",
        alt: "The medieval village of Èze perched on its rocky pinnacle above the Riviera coastline, hazy sea and hills behind",
      },
    },
  },
  switzerland: {
    hero: {
      src: "/images/switzerland/hero.jpg",
      alt: "A Swiss Alpine village nestled beneath dramatic pale limestone cliffs under a blue sky with scattered clouds",
    },
    attractions: {
      "Jungfraujoch — Top of Europe": {
        src: "/images/switzerland/jungfraujoch.jpg",
        alt: "The stone Sphinx Observatory building perched on Jungfraujoch's rocky summit, a Swiss flag flying against a clear blue sky",
      },
      "Glacier Express": {
        src: "/images/switzerland/glacier-express.jpg",
        alt: "A red Glacier Express train winding through a snow-covered valley just below the Oberalp Pass summit",
      },
      "Interlaken": {
        src: "/images/switzerland/interlaken.jpg",
        alt: "Turquoise Lake Brienz and the town of Interlaken seen through pine trees from the Harder Kulm viewpoint",
      },
      "Lucerne & the Chapel Bridge": {
        src: "/images/switzerland/lucerne.jpg",
        alt: "The wooden Chapel Bridge and octagonal Water Tower spanning the Reuss river in Lucerne's old town",
      },
      "Chillon Castle, Montreux": {
        src: "/images/switzerland/chillon-castle.jpg",
        alt: "Chillon Castle glowing at dusk on the shore of Lake Geneva, the snow-capped Dents du Midi rising behind",
      },
      "GoldenPass route": {
        src: "/images/switzerland/goldenpass.jpg",
        alt: "A dark blue GoldenPass panoramic train stopped at Zweisimmen station with green alpine meadows behind",
      },
    },
  },
  uae: {
    hero: {
      src: "/images/uae/hero.jpg",
      alt: "Abu Dhabi's skyline of glass towers seen across the water from the Corniche, seagulls flying overhead under a cloudy sky",
    },
    attractions: {
      "Sheikh Zayed Grand Mosque, Abu Dhabi": {
        src: "/images/uae/grand-mosque.jpg",
        alt: "Sheikh Zayed Grand Mosque's white minarets and domes framed by a palm-lined marble approach under a clear sky",
      },
      "Louvre Abu Dhabi": {
        src: "/images/uae/louvre-abu-dhabi.jpg",
        alt: "The Louvre Abu Dhabi's perforated dome scattering a rain of light across the museum's stepped courtyard",
      },
      "Qasr Al Watan": {
        src: "/images/uae/qasr-al-watan.jpg",
        alt: "Qasr Al Watan's golden-domed ceremonial gate seen across the palace grounds, Abu Dhabi's skyline behind",
      },
      "Yas Island": {
        src: "/images/uae/yas-island.jpg",
        alt: "Aerial view of Ferrari World's distinctive red spaceframe roof spread across Yas Island, race track curling beneath it",
      },
      "Sharjah's museum quarter": {
        src: "/images/uae/sharjah-museum.jpg",
        alt: "A gallery inside the Sharjah Museum of Islamic Civilization, glass cases displaying ceramics and metalwork",
      },
      "Fujairah & the east coast": {
        src: "/images/uae/fujairah.jpg",
        alt: "The rocky peaks of the Hajar Mountains silhouetted at dusk above a winding road near Fujairah",
      },
    },
  },
  thailand: {
    hero: {
      src: "/images/thailand/hero.jpg",
      alt: "A traditional wooden longtail boat drifting on a calm Thai seascape at dusk",
    },
    attractions: {
      "Grand Palace & Wat Phra Kaew, Bangkok": {
        src: "/images/thailand/grand-palace.jpg",
        alt: "Gilded and mirror-mosaic yaksha guardian statues supporting a golden chedi within the Grand Palace complex",
      },
      "Wat Arun": {
        src: "/images/thailand/wat-arun.jpg",
        alt: "Wat Arun's tall central prang encrusted with porcelain-shard mosaic, flanked by smaller satellite spires",
      },
      "Wat Pho": {
        src: "/images/thailand/wat-pho.jpg",
        alt: "Close-up of the gold-plated Reclining Buddha's face and shoulder at Wat Pho, patterned temple ceiling above",
      },
      "Phi Phi Islands & Maya Bay": {
        src: "/images/thailand/phi-phi-maya-bay.jpg",
        alt: "Maya Bay's turquoise water meeting a white-sand beach, framed by towering limestone cliffs",
      },
      "Phang Nga Bay": {
        src: "/images/thailand/phang-nga-bay.jpg",
        alt: "Ko Tapu, the top-heavy limestone needle rock known as James Bond Island, rising from Phang Nga Bay with a longtail boat passing",
      },
      "Railay, Krabi": {
        src: "/images/thailand/railay-krabi.jpg",
        alt: "Railay's sheer limestone cliffs bracketing a turquoise bay, swimmers and longtail boats in the water below",
      },
    },
  },
  azerbaijan: {
    hero: {
      src: "/images/azerbaijan/hero.jpg",
      alt: "Aerial sunset view of Baku's skyline — the Flame Towers, TV tower and waterfront Crystal Hall on the Caspian shore",
    },
    attractions: {
      "Icherisheher — Baku's Old City": {
        src: "/images/azerbaijan/old-city-baku.jpg",
        alt: "The stout stone cylinder of the Maiden Tower rising above Icherisheher's old city walls under a blue sky",
      },
      "Flame Towers": {
        src: "/images/azerbaijan/flame-towers.jpg",
        alt: "The three Flame Towers lit red at night, their glow reflected in the water along Baku Boulevard",
      },
      "Gobustan National Park": {
        src: "/images/azerbaijan/gobustan-petroglyphs.jpg",
        alt: "A carved animal figure petroglyph on weathered rock at Gobustan, surrounded by scrubby vegetation",
      },
      "The mud volcanoes": {
        src: "/images/azerbaijan/mud-volcanoes.jpg",
        alt: "Grey mud cones near Gobustan with wet mud trickling down their slopes in channels",
      },
      "Yanar Dag": {
        src: "/images/azerbaijan/yanar-dag.jpg",
        alt: "Flames burning continuously along the base of the Yanar Dag hillside, its name spelled out in white stones above",
      },
      "Ateshgah Fire Temple": {
        src: "/images/azerbaijan/ateshgah.jpg",
        alt: "The central fire pit of Ateshgah Fire Temple, framed by a stone archway with visitors gathered around",
      },
    },
  },
  singapore: {
    hero: {
      src: "/images/singapore/hero.jpg",
      alt: "Marina Bay illuminated at night, the ArtScience Museum's lotus-shaped roof and the CBD skyline reflected in the water",
    },
    attractions: {
      "Gardens by the Bay": {
        src: "/images/singapore/supertree-grove.jpg",
        alt: "The elevated canopy walkway threading between the towering steel Supertrees at Gardens by the Bay",
      },
      "Marina Bay Sands SkyPark": {
        src: "/images/singapore/marina-bay-sands.jpg",
        alt: "Marina Bay Sands' three towers topped by the ship-shaped SkyPark, palm trees visible along its rooftop edge",
      },
      "Sentosa & Universal Studios": {
        src: "/images/singapore/sentosa-universal.jpg",
        alt: "Hollywood Boulevard at Universal Studios Singapore, palm-lined under a vaulted glass canopy with visitors strolling",
      },
      "Night Safari": {
        src: "/images/singapore/night-safari.jpg",
        alt: "A spotted serval cat prowling along a path at Singapore's Night Safari, illuminated against the dark surroundings",
      },
      "Hawker centres": {
        src: "/images/singapore/hawker-centre.jpg",
        alt: "Maxwell Food Centre's low heritage roofline and palm trees set against Singapore's glass-tower skyline",
      },
      "Jewel Changi": {
        src: "/images/singapore/jewel-changi.jpg",
        alt: "The Rain Vortex pouring through the centre of Jewel Changi's latticed glass dome into a planted forest valley below",
      },
    },
  },
};

export function destinationHero(slug: string): ImageEntry | undefined {
  return DESTINATION_IMAGES[slug]?.hero;
}

export function attractionImage(slug: string, attractionName: string): ImageEntry | undefined {
  return DESTINATION_IMAGES[slug]?.attractions[attractionName];
}
