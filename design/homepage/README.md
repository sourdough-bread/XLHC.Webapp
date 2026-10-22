# Homepage prototype

Standalone HTML/CSS/JS design for the new homepage (`index.html`, no build step). It is meant as the reference to port into the site's chosen stack.

- **Pitch status** (`Praticable` / `Horaires modifiés` / `Impraticable`) drives both the top banner and the hero pitch illustration. The committee updates a Google Sheet: publish it as CSV and set `STATUS_CSV_URL` in the script (row 2: `state` (ok, partial or closed), `message`, `updated`). Without it, the defaults in `STATES` show. The floating "Aperçu" switch is for review only and should be removed.
- **News dates and the three events are examples.** The current site's news items have no dates; the news copy is real, the dates and events are placeholders.
- **Partner and funder logos are text placeholders** until the real logo files are exported from the current site.
- **Footer** holds the address, parking note, map links, WhatsApp/Instagram/Facebook icons, public funder logos and the privacy link. Map links go to Google Maps, Apple Plans and Waze (coordinates 50.813992, 4.397711), so no third-party map loads without consent.
- Colours (pitch blue + ball yellow) and fonts (Big Shoulders Display, Figtree) are a proposal, not the club's official identity.
