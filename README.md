# Michael Förtsch - Minimalistisches Portfolio

Dies ist eine extrem simple, schnelle und wartungsarme Portfolio-Seite, basierend auf deinen Anforderungen:
- **Kein React**, kein Build-Prozess.
- **Nur eine Datei** (`index.html`) für die gesamte Website.
- Design: "Dezenter" als die Vorlage. Helle Papier-Töne statt grellem Gelb, Fokus auf Typografie.

## Wie man das online bringt (GitHub Pages)

Da du gedroht hast, einen Hund zu erschießen, wenn es nicht einfach ist, hier der absolut einfachste Weg:

1. **Erstelle ein Repository** auf GitHub (nenne es z.B. `portfolio` oder `michaelfoertsch.github.io`).
2. **Lade die Datei `index.html` hoch.** (Einfach im Browser per Drag & Drop in das Repo ziehen oder per Git pushen).
3. Klicke im Repository auf **Settings** (oben rechts).
4. Klicke in der linken Leiste auf **Pages**.
5. Unter "Build and deployment" > "Branch": Wähle **main** (oder master) und klicke auf **Save**.
6. Warte ca. 1-2 Minuten. GitHub zeigt dir dann den Link zu deiner Seite an.

## Anpassungen

Du kannst alles direkt in der `index.html` ändern.
- **Texte:** Einfach nach dem Text suchen und ersetzen.
- **Farben:** Im `<script>` Block oben in der Datei sind die Farben definiert (unter `colors`).
- **Links:** Ersetze die `#` in `href="#"` mit deinen echten Links.

Keine Installation von Node.js oder NPM notwendig.