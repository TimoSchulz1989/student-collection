# Student Collection – Showcase-Seite

Statische Seite (HTML/CSS/JS, kein Build-Schritt) zur Präsentation der Student Collection am Elternabend.
Bestellt wird über Microsoft Forms. Alle Bestell-Buttons und der QR-Code führen dorthin.

## Inhalte pflegen
Alles steht in `data/collection.js`:
- `orderUrl`: Forms-Link (Buttons und QR-Code aktualisieren sich automatisch)
- `deadline`: Bestellfrist als `"JJJJ-MM-TT"` oder `null`
- `products`: Artikel, Preise, Farben, Größen
- `motifs`: Motive mit Bild pro Farbe (`variants`). Die Titel entsprechen den Namen im Bestellformular.
- `lookbook`, `steps`, `contact`

Neue Bilder: als WebP mit ca. 1200 px langer Kante unter `img/motifs/` bzw. `img/look/` ablegen.

## Lokal ansehen
Im Cockpit-Ordner gibt es den Preview-Eintrag `student-collection` (http-server auf Port 8124).

## Veröffentlichen (GitHub Pages)
Die Seite wird direkt aus dem Branch `main` (Ordner `/`) über GitHub Pages ausgeliefert.
Für ein Update genügen diese drei Befehle:
```bash
git add -A
git commit -m "Update"
git push
```
Nach etwa einer Minute ist die neue Version online.

## Datenschutz
Keine Cookies, kein Tracking. Schriften (Graduate, Inter; SIL OFL) und die QR-Bibliothek
(qrcode-generator, MIT) liegen im Repo und werden nicht von fremden Servern geladen.
