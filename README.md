# Michael Förtsch - Minimalistisches Portfolio

Dies ist eine extrem simple, schnelle und wartungsarme Portfolio-Seite, die aus einem Experiment mit Gemini 3 Pro enstand. Sie ist zum Teil also KI-generiert, zum Teil händisch nachgebessert, da Gemini teils absurde Fehler machte.
Ich teile sie hier. Wer mag, kann basierend darauf eine eigene Seite erstellen.

- **Kein React**, kein Build-Prozess.
- **Nur HTML-Dateien** für die gesamte Website.
- Design: "Dezenter" als die Vorlage. Helle Papier-Töne statt grellem Gelb, Fokus auf Typografie.

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
    │
    ├── ki-01.jpg            (KI Bild 1)
    ├── ki-02.jpg            (KI Bild 2)
    ... bis ...
    └── ki-12.jpg            (KI Bild 12)
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
