# Michael Förtsch - Minimalistisches Portfolio

Dies ist eine extrem simple, schnelle und wartungsarme Portfolio-Seite, basierend auf deinen Anforderungen:
- **Kein React**, kein Build-Prozess.
- **Nur HTML-Dateien** für die gesamte Website.
- Design: "Dezenter" als die Vorlage. Helle Papier-Töne statt grellem Gelb, Fokus auf Typografie.

## Technologie-Stack (Keep it simple)

Um Fragen vorzubeugen, hier was wir nutzen (und was nicht):

*   ✅ **HTML5 & CSS3:** Das Gerüst.
*   ✅ **Tailwind CSS:** Für das Design (via CDN geladen, keine Installation nötig).
*   ✅ **JavaScript:** Minimal (nur für Konfiguration im Browser).
*   ❌ **React / Vue / Angular:** Nein. Kein Framework-Overhead.
*   ❌ **TypeScript:** Nein. Browser verstehen nur JS.
*   ❌ **Ruby on Rails / PHP / Node.js:** Nein. Die Seite braucht kein Backend und keine Datenbank.

## 📂 Ordnerstruktur (WICHTIG!)

Damit die Bilder angezeigt werden, musst du folgende Struktur auf deinem Computer anlegen:

```
dein-projekt-ordner/
│
├── index.html       (Startseite)
├── artikel.html     (Artikel & Arbeit)
├── fotos.html       (Fotogalerie)
├── ki.html          (KI & Generative Art)
├── projekte.html    (Projekte)
├── ueber.html       (Über Mich)
├── impressum.html   (Impressum)
├── README.md        (Diese Datei)
│
└── graphics/        <-- DIESEN ORDNER MUSST DU ERSTELLEN!
    │
    ├── portrait-bg.jpg      (Hintergrundbild Startseite oben, blass)
    ├── artikel-bg.jpg       (Hintergrundbild Artikel-Seite)
    ├── fotos-bg.jpg         (Hintergrundbild Foto-Seite)
    ├── ki-bg.jpg            (Hintergrundbild KI-Seite)
    ├── projekte-bg.jpg      (Hintergrundbild Projekte-Seite)
    ├── ueber-bg.jpg         (Hintergrundbild Über-Seite)
    │
    ├── portrait.jpg         (Dein Profilbild für die Über-Seite)
    ├── email.jpg            (Bild deiner E-Mail Adresse für Spam-Schutz)
    │
    ├── projekt-1e9.jpg      (Bild für 1E9)
    ├── projekt-xplr.jpg     (Bild für XPLR Media)
    ├── projekt-kurator.jpg  (Bild für Kurator42)
    │
    ├── foto-01.jpg          (Landscape/16:9 - Bild 1)
    ├── foto-02.jpg          (Landscape/16:9 - Bild 2)
    ├── foto-03.jpg          (Landscape/16:9 - Bild 3)
    ├── foto-04.jpg          (Landscape/16:9 - Bild 4)
    ├── foto-05.jpg          (Portrait/Hochformat - Bild 5)
    ├── foto-06.jpg          (Portrait/Hochformat - Bild 6)
    ├── foto-07.jpg          (Portrait/Hochformat - Bild 7)
    ├── foto-08.jpg          (Portrait/Hochformat - Bild 8)
    ├── foto-09.jpg          (Landscape/16:9 - Bild 9)
    ├── foto-10.jpg          (Landscape/16:9 - Bild 10)
    ├── foto-11.jpg          (Landscape/16:9 - Bild 11)
    ├── foto-12.jpg          (Landscape/16:9 - Bild 12)
    ├── foto-13.jpg          (Portrait/Hochformat - Bild 13)
    ├── foto-14.jpg          (Portrait/Hochformat - Bild 14)
    ├── foto-15.jpg          (Portrait/Hochformat - Bild 15)
    ├── foto-16.jpg          (Portrait/Hochformat - Bild 16)
    │
    ├── ki-01.jpg            (KI Bild 1)
    ├── ki-02.jpg            (KI Bild 2)
    ...
    ├── ki-12.jpg            (KI Bild 12)
    ├── ki-13.jpg            (KI Landscape 16:9)
    ├── ki-14.jpg            (KI Landscape 16:9)
    ├── ki-15.jpg            (KI Landscape 16:9)
    ├── ki-16.jpg            (KI Portrait)
    ├── ki-17.jpg            (KI Portrait)
    └── ki-18.jpg            (KI Portrait)
```

Wenn die Bilder im Ordner `graphics` fehlen, wird an der Stelle ein "Broken Image" Icon angezeigt, da wir die Fallback-Bilder aus dem Internet entfernt haben.

## Wie man das online bringt (GitHub Pages)

Da du gedroht hast, einen Hund zu erschießen, wenn es nicht einfach ist, hier der absolut einfachste Weg:

1. **Erstelle ein Repository** auf GitHub (nenne es z.B. `portfolio` oder `michaelfoertsch.github.io`).
2. **Lade ALLE Dateien hoch.** (Die HTML-Dateien und den `graphics` Ordner mit den Bildern).
3. Klicke im Repository auf **Settings** (oben rechts).
4. Klicke in der linken Leiste auf **Pages**.
5. Unter "Build and deployment" > "Branch": Wähle **main** (oder master) und klicke auf **Save**.
6. Warte ca. 1-2 Minuten. GitHub zeigt dir dann den Link zu deiner Seite an.

## Anpassungen

Du kannst alles direkt in den HTML-Dateien ändern. Öffne sie einfach mit einem Text-Editor (Notepad, TextEdit, VS Code).

- **Texte:** Einfach nach dem Text suchen und ersetzen.
- **Farben:** Im `<script>` Block oben in jeder Datei sind die Farben definiert (unter `colors`).
- **Links:** Ersetze die `#` in `href="#"` mit deinen echten Links.

Keine Installation von Node.js oder NPM notwendig.