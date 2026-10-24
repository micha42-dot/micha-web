/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

export default function App() {
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [buildPlatform, setBuildPlatform] = useState<'linux' | 'macos' | 'windows'>('linux');
  const [defaultAppTab, setDefaultAppTab] = useState<'windows' | 'linux' | 'macos'>('windows');
  const [linuxDistro, setLinuxDistro] = useState<'ubuntu' | 'arch' | 'fedora'>('ubuntu');
  const [copied, setCopied] = useState(false);
  const [copiedDep, setCopiedDep] = useState(false);
  const [copiedBuild, setCopiedBuild] = useState(false);

  const version = '0.4.4';
  const releaseDate = 'Oktober 2026';
  const releaseDateEn = 'October 2026';
  const downloadUrl = 'https://github.com/micha42-dot/uxzView/releases/download/0.4.4/uxzView-win64.zip';
  const sha256 = 'abca4072a05e72474bbab3f1e13998847957e6d3f232a7e003b252791e1abf75';
  const repoUrl = 'https://github.com/micha42-dot/uxzView';

  const windowsDeps = 'Python 3.14+ · CMake 3.24+ · Qt 6.8+ · C++20 Compiler';

  const windowsBuildSnippet = `python scripts/bootstrap_sdk.py
python scripts/build_tool_packs.py
./scripts/build.ps1 -Test
python scripts/deploy.py`;

  const linuxDeps = {
    ubuntu: 'sudo apt install build-essential cmake qt6-base-dev libqt6svg6-dev libraw-dev',
    arch: 'sudo pacman -S base-devel cmake qt6-base qt6-svg libraw',
    fedora: 'sudo dnf install gcc-c++ cmake qt6-qtbase-devel qt6-qtsvg-devel LibRaw-devel',
  };

  const macosDeps = 'brew install cmake qt libraw';

  const linuxBuildSnippet = `git clone https://github.com/micha42-dot/uxzView.git
cd uxzView
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release -j $(nproc)
./build/üxzView`;

  const macosBuildSnippet = `git clone https://github.com/micha42-dot/uxzView.git
cd uxzView
cmake -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH="$(brew --prefix qt)"
cmake --build build --config Release -j $(sysctl -n hw.ncpu)
./build/üxzView`;

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyDep = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDep(true);
    setTimeout(() => setCopiedDep(false), 2000);
  };

  const handleCopyBuild = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBuild(true);
    setTimeout(() => setCopiedBuild(false), 2000);
  };

  return (
    <div className="bg-[#202123] min-h-screen font-mono selection:bg-white selection:text-black flex flex-col text-[#f1f2f4]">
      {/* Top Bar */}
      <header className="border-b border-[#34373e] bg-[#202123] sticky top-0 z-50">
        <div className="max-w-[1020px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center text-white no-underline">
            <img
              src="/assets/aistudio/_gz_view_logo_fc6b3ac0.png"
              alt="üxzView"
              className="h-6 sm:h-7 w-auto object-contain pixel-logo"
            />
          </a>

          <nav className="flex items-center gap-4 sm:gap-5 text-xs sm:text-[13px] font-mono text-zinc-300">
            <a href="#features" className="hover:text-white transition-colors">
              {lang === 'de' ? 'Funktionen' : 'Features'}
            </a>
            <a href="#formats" className="hover:text-white transition-colors">
              {lang === 'de' ? 'Formate' : 'Formats'}
            </a>
            <a href="#default-app" className="hover:text-white transition-colors hidden sm:inline">
              {lang === 'de' ? 'Standard' : 'Default'}
            </a>
            <a href="#cli" className="hover:text-white transition-colors hidden sm:inline">
              CLI
            </a>
            <a href="#roadmap" className="hover:text-white transition-colors hidden sm:inline">
              Roadmap
            </a>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline font-semibold"
            >
              GitHub ↗
            </a>

            {/* Language Switch */}
            <div className="border-l border-[#3a3d46] pl-3 flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setLang('de')}
                className={`cursor-pointer px-2 py-0.5 transition-colors font-mono font-medium ${
                  lang === 'de' ? 'font-bold bg-white text-black' : 'text-zinc-400 hover:text-white bg-[#17181a]'
                }`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`cursor-pointer px-2 py-0.5 transition-colors font-mono font-medium ${
                  lang === 'en' ? 'font-bold bg-white text-black' : 'text-zinc-400 hover:text-white bg-[#17181a]'
                }`}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-[1020px] mx-auto px-4 py-10 w-full space-y-16">
        {/* HERO: Centered Logo with Brackets + Version & Download */}
        <section className="border-b border-[#34373e] pb-10">
          {/* Logo centered above Version and Download, framed by square brackets */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pb-6 pt-2">
            <span
              className="text-6xl sm:text-8xl font-mono text-zinc-300 select-none leading-none font-light"
              aria-hidden="true"
            >
              [
            </span>
            <img
              src="/assets/aistudio/_gz_ae961cd1.jpg"
              alt="üxz"
              className="h-24 sm:h-28 w-auto object-contain pixel-logo"
            />
            <span
              className="text-6xl sm:text-8xl font-mono text-zinc-300 select-none leading-none font-light"
              aria-hidden="true"
            >
              ]
            </span>
          </div>

          {/* Prominent Statement: Free · Open-Source · Unfinished */}
          <div className="text-center pb-12 sm:pb-14 pt-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-white font-mono uppercase">
              Free · Open-Source · Unfinished
            </div>
            <p className="text-xs sm:text-[13px] text-zinc-400 font-mono mt-2 max-w-2xl mx-auto leading-relaxed">
              {lang === 'de'
                ? 'Inspiriert von IrfanView & nomacs. 100% kostenlos, Open-Source (GNU GPLv3) und gebraut mit C++20 & Qt 6.8.'
                : 'Inspired by IrfanView & nomacs. 100% free, open-source (GNU GPLv3), built with C++20 & Qt 6.8.'}
            </p>
          </div>

          {/* Release Download & Spec Panel */}
          <div className="border border-[#34373e] bg-[#161719] overflow-hidden font-mono text-xs sm:text-[13px]">
            {/* Header: Version & Date */}
            <div className="bg-[#17181a] px-4 py-3 border-b border-[#34373e] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-base sm:text-lg font-bold text-white font-mono">
                  Version {version}
                </span>
                <span className="text-[11px] font-bold text-zinc-300 bg-[#252830] px-2 py-0.5 border border-[#3c404b]">
                  {lang === 'de' ? 'AKTUELLER RELEASE' : 'CURRENT RELEASE'}
                </span>
              </div>
              <span className="text-zinc-400 text-xs font-medium">
                {lang === 'de' ? releaseDate : releaseDateEn}
              </span>
            </div>

            {/* Action Row: Primary Download + Linux/macOS Compile Link */}
            <div className="p-4 sm:p-5 border-b border-[#34373e] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#1b1d21]">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-white text-sm sm:text-base">
                  {lang === 'de' ? 'Fertiges Paket für Windows 10/11' : 'Pre-built package for Windows 10/11'}
                </span>
                <span className="text-zinc-400 text-xs">
                  {lang === 'de' ? 'Auspacken, starten, läuft · 60.58 MB ZIP' : 'Extract and run · 60.58 MB ZIP archive'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <a
                  href={downloadUrl}
                  className="btn-classic-primary text-xs sm:text-sm px-5 py-2.5 font-bold flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 3v13M5 10l7 7 7-7" />
                    <line x1="4" y1="21" x2="20" y2="21" />
                  </svg>
                  <span>{lang === 'de' ? 'Download für Windows (Win64)' : 'Download for Windows (Win64)'}</span>
                </a>

                <a
                  href="#build"
                  className="px-4 py-2.5 bg-[#202123] hover:bg-[#282a2f] border border-[#3a3d46] text-zinc-200 hover:text-white transition-colors text-xs text-center font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'de' ? 'Linux / macOS: Build' : 'Linux / macOS: Build'}</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            {/* Structured Specifications Grid */}
            <div className="divide-y divide-[#2a2d35] text-xs">
              <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
                <span className="sm:col-span-4 text-zinc-400 font-bold">
                  {lang === 'de' ? 'Unterstützte Plattformen' : 'Supported Platforms'}
                </span>
                <span className="sm:col-span-8 text-zinc-200">
                  {lang === 'de'
                    ? 'Windows 10/11 (Binärpaket) · Linux & macOS (Kompilieren via CMake)'
                    : 'Windows 10/11 (Pre-built) · Linux & macOS (Compile via CMake)'}
                </span>
              </div>

              <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
                <span className="sm:col-span-4 text-zinc-400 font-bold">
                  {lang === 'de' ? 'Inspiration & Namensgebung' : 'Inspiration & Identifiers'}
                </span>
                <span className="sm:col-span-8 text-zinc-200">
                  {lang === 'de'
                    ? 'Inspiriert von IrfanView & nomacs · ASCII-Name: uxzView · Speicherpfade: IxView'
                    : 'Inspired by IrfanView & nomacs · ASCII name: uxzView · Storage path IDs: IxView'}
                </span>
              </div>

              <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
                <span className="sm:col-span-4 text-zinc-400 font-bold">
                  {lang === 'de' ? 'Erkennungswerkzeuge (OCR/QR)' : 'Recognition Tools (OCR/QR)'}
                </span>
                <span className="sm:col-span-8 text-zinc-200">
                  ZXing-C++ (QR/Barcodes) · Tesseract OCR (DE, EN, FR, JA, KO) im Ordner tools/
                </span>
              </div>

              <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
                <span className="sm:col-span-4 text-zinc-400 font-bold">
                  {lang === 'de' ? 'Technischer Stack & Lizenz' : 'Tech Stack & License'}
                </span>
                <span className="sm:col-span-8 text-zinc-200">
                  C++20 · Qt 6.8 · LibRaw 16-Bit · GNU GPLv3
                </span>
              </div>

              <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-center">
                <span className="sm:col-span-4 text-zinc-400 font-bold shrink-0">
                  SHA-256 (Win64)
                </span>
                <div className="sm:col-span-8 flex items-center gap-2 min-w-0">
                  <code className="bg-[#101113] border border-[#2a2d35] px-2.5 py-1 text-[11px] text-zinc-200 font-mono truncate select-all flex-grow">
                    {sha256}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyChecksum}
                    className={`px-3 py-1 text-xs font-mono font-semibold cursor-pointer transition-colors border shrink-0 ${
                      copied
                        ? 'bg-white text-black border-white'
                        : 'bg-[#22252c] hover:bg-[#2d313b] text-zinc-200 border-[#3e424e]'
                    }`}
                  >
                    {copied ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FUNKTIONEN (Comprehensive Feature Spec Sheet from Repository README) */}
        <section id="features">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Funktionen' : 'Features'}</span>
          </h2>

          <div className="border-y border-[#34373e] divide-y divide-[#34373e] text-xs sm:text-[13px] font-mono">
            {/* Ordner-Browsing & RAM-Cache */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Ordner-Browsing & Cache' : 'Folder Browsing & Cache'}</span>
                <span className="text-zinc-400 font-normal">0,24 ms</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Blitzschnelles Navigieren in Ordnern mit Tastatursteuerung und speichereffizientem RAM-Lookahead-Caching für nahtloses Bildwechseln.'
                  : 'Fast folder browsing with full keyboard navigation and memory-efficient RAM lookahead caching for seamless image transitions.'}
              </div>
            </div>

            {/* Vollbild, Zoom & Diashow */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Vollbild, Zoom & Diashow' : 'Fullscreen, Zoom & Slideshow'}</span>
                <span className="text-zinc-400 font-normal">F11 / Space</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Ablenkungsfreie Vollbildansicht mit Maus-Navigation, automatischen Diashows und bereichsspezifischem Zoom in ausgewählte Bildausschnitte.'
                  : 'Distraction-free fullscreen viewing with mouse navigation, automatic slideshows, and region-specific zoom into selected image areas.'}
              </div>
            </div>

            {/* Info-Ecken & EXIF/RGB HUD */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Info-Ecken & Metadaten-HUD' : 'Metadata HUD & Corner Info'}</span>
                <span className="text-zinc-400 font-normal">{lang === 'de' ? 'I Taste' : 'I key'}</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Einstellbare Info-Einblendungen in beliebigen Bildecken (Auflösung, DPI, Dateigröße, Kamera, Objektiv, EXIF/IPTC/XMP) sowie RGB-Echtzeit-Histogramm.'
                  : 'Customizable corner info overlays (resolution, DPI, file size, EXIF/IPTC/XMP metadata) plus real-time RGB histogram.'}
              </div>
            </div>

            {/* Zentrierte Nachbarleiste */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Zentrierte Nachbarleiste' : 'Centered Culling Strip'}</span>
                <span className="text-zinc-400 font-normal">1–5 Frames</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Optionale, zentrierte Vorschauleiste zum Direktvergleich von 1–5 vorherigen und nachfolgenden Bildern für schnelles Culling.'
                  : 'Optional centered thumbnail strip displaying 1–5 preceding and succeeding images for fast culling and comparisons.'}
              </div>
            </div>

            {/* Toolbar-Befehlssuche & Palette */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Befehlssuche & Palette' : 'Command Palette & Search'}</span>
                <span className="text-zinc-400 font-normal">Shift+T</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Direkte Suche und Schnellausführung aller Bearbeitungsbefehle und Werkzeuge über die Toolbar oder per Tastatur.'
                  : 'Instant search and execution of all editing commands and tools directly from the toolbar or quick keyboard launcher.'}
              </div>
            </div>

            {/* Bearbeitung & Korrekturen */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Bearbeitung & Korrekturen' : 'Editing & Adjustments'}</span>
                <span className="text-zinc-400 font-normal">Crop / Color</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Skalieren, Zuschneiden mit Seitenverhältnis-Presets oder frei, Drehen, Spiegeln, Farbanpassungen und automatische Bildkorrektur.'
                  : 'Resize, crop with preset or custom aspect ratios, rotate, flip, color adjustments, and automatic image enhancement.'}
              </div>
            </div>

            {/* Stapelverarbeitung */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Visuelle Stapelverarbeitung' : 'Visual Batch Processing'}</span>
                <span className="text-zinc-400 font-normal">Profiles &amp; Watermarks</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Stapelverarbeitung ganzer Bildordner mit wiederverwendbaren Profilen, Wasserzeichen und echten Export-Echtzeit-Vorschauen.'
                  : 'Batch processing with reusable profiles, custom watermarks, and real-time export previews before processing.'}
              </div>
            </div>

            {/* Bewertungen, Labels & Duplikate */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Verwaltung & Duplikate' : 'Ratings & Duplicate Search'}</span>
                <span className="text-zinc-400 font-normal">1–5 Stars / Labels</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Sterne-Bewertungen, Farblabels, gezielte Metadaten-Suche und automatische Erkennung doppelter Aufnahmen.'
                  : 'Star ratings, color labels, targeted metadata search, and automated duplicate image detection.'}
              </div>
            </div>

            {/* Papierkorb & Atomares Undo */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Interner Papierkorb & Undo' : 'Internal Trash & Undo'}</span>
                <span className="text-zinc-400 font-normal">Ctrl+Z</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Internes Papierkorb-Journal, lückenlose Historie aller Dateioperationen und atomares Rückgängigmachen (Undo per Ctrl+Z).'
                  : 'Internal trash integration, full file-operation history, and atomic undo via Ctrl+Z.'}
              </div>
            </div>

            {/* Screenshots & Hotkey-Konfiguration */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Screenshots & Shortcuts' : 'Screenshots & Keybindings'}</span>
                <span className="text-zinc-400 font-normal">Custom Keys</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Konfigurierbares Screenshot-Werkzeug und frei anpassbare Tastaturkürzel für sämtliche Aktionen.'
                  : 'Configurable screenshot capture utility and customizable keyboard shortcuts for all operations.'}
              </div>
            </div>

            {/* Offline OCR & QR/Barcode Reader */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Offline OCR & QR-Reader' : 'Offline OCR & QR/Barcode'}</span>
                <span className="text-zinc-400 font-normal">100% Offline</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Lokales Auslesen von QR-/Barcodes und optische Texterkennung (OCR) aus dem Gesamtbild oder einer Rechtsklick-Auswahl, inkl. deinstallierbarer Sprachpakete.'
                  : 'Local QR/barcode scanning and optical text recognition (OCR) from whole image or right-click selection, with modular language packs.'}
              </div>
            </div>

            {/* Erweiterungen & Plugin-Architektur */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Format- & Funktions-Plugins' : 'Extensions & Plugins'}</span>
                <span className="text-zinc-400 font-normal">Modular</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Getrennte Erweiterungen für zusätzliche Bildformate und Funktionen mit frei konfigurierbaren Speicherpfaden.'
                  : 'Separate image-format and functional extensions with customizable storage directories.'}
              </div>
            </div>

            {/* Portable-Modus */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Optionale Portable-Nutzung' : 'Optional Portable Mode'}</span>
                <span className="text-zinc-400 font-normal">No Registry</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Optionaler Portable-Modus: Alle Einstellungen, Profile, Bewertungen, Erweiterungen und Historie werden direkt neben der Anwendung gespeichert.'
                  : 'Optional portable operation storing settings, profiles, ratings, plugins, and file history alongside the executable.'}
              </div>
            </div>

            {/* Mehrsprachigkeit */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Mehrsprachiges UI' : 'Multi-Language UI'}</span>
                <span className="text-zinc-400 font-normal">DE / EN / KO / JA / FR</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Interface verfügbar in Deutsch, Englisch, Koreanisch, Japanisch und Französisch.'
                  : 'User interface supported in German, English, Korean, Japanese, and French.'}
              </div>
            </div>

            {/* Offline & Datenschutz */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Offline & Datenschutz' : 'Offline & Privacy'}</span>
                <span className="text-zinc-400 font-normal">GNU GPLv3</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Keine Telemetrie, kein Tracking, keine Cloud-Pflicht. 100% freier Quellcode, der komplett lokal auf deinem System läuft.'
                  : 'Zero telemetry, zero tracking, no cloud lock-in. 100% open-source software running entirely on your local system.'}
              </div>
            </div>
          </div>
        </section>

        {/* FORMATE (Clean tabular breakdown) */}
        <section id="formats">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Unterstützte Formate' : 'Supported Formats'}</span>
          </h2>

          <div className="border border-[#34373e] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-[13px] font-mono">
              <thead>
                <tr className="bg-[#17181a] border-b border-[#34373e] text-zinc-300 text-xs">
                  <th className="py-2.5 px-4 font-bold w-1/4">{lang === 'de' ? 'Kategorie' : 'Category'}</th>
                  <th className="py-2.5 px-4 font-bold w-1/2">{lang === 'de' ? 'Formate' : 'Formats'}</th>
                  <th className="py-2.5 px-4 font-bold w-1/4">{lang === 'de' ? 'Engine / Tiefe' : 'Engine / Depth'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#34373e] text-zinc-200">
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-3 px-4 font-bold text-white">Raster &amp; Web</td>
                  <td className="py-3 px-4 text-zinc-300">
                    JPEG, PNG (16-Bit), WebP, AVIF, HEIC / HEIF, TIFF, BMP, GIF (Animation), APNG, ICO
                  </td>
                  <td className="py-3 px-4 text-zinc-400">libjpeg-turbo / Qt / 16-Bit</td>
                </tr>
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-3 px-4 font-bold text-white">Kamera-RAW</td>
                  <td className="py-3 px-4 text-zinc-300">
                    Sony (.arw), Nikon (.nef), Canon (.cr2, .cr3), Adobe (.dng), Fujifilm (.raf), Olympus (.orf, .rw2), PhaseOne (.iiq)
                  </td>
                  <td className="py-3 px-4 text-zinc-400">LibRaw 16-Bit Native</td>
                </tr>
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-3 px-4 font-bold text-white">HDR &amp; Spezial</td>
                  <td className="py-3 px-4 text-zinc-300">
                    OpenEXR (.exr), Photoshop (.psd Composite), SVG Vektor (.svg), Targa (.tga), DirectDraw (.dds), Netpbm (.ppm, .pgm), Radiance (.hdr)
                  </td>
                  <td className="py-3 px-4 text-zinc-400">Float 32-Bit / Vektor</td>
                </tr>
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-3 px-4 font-bold text-white">{lang === 'de' ? 'Metadaten & Profile' : 'Metadata & Profiles'}</td>
                  <td className="py-3 px-4 text-zinc-300">
                    ICC Profile (sRGB, Display P3, AdobeRGB), EXIF, IPTC, XMP Metadaten, Mehrseitige Dokumente
                  </td>
                  <td className="py-3 px-4 text-zinc-400">Color Management Engine</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* TASTATURKÜRZEL (High contrast 2-column cheat sheet) */}
        <section id="shortcuts">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Tastaturkürzel' : 'Keyboard Shortcuts'}</span>
          </h2>

          <div className="border border-[#34373e] overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#34373e] text-xs">
              {/* Spalte 1: Navigation & Ansicht */}
              <table className="w-full text-left border-collapse font-mono">
                <tbody className="divide-y divide-[#34373e] text-zinc-200">
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4 w-1/2"><kbd>Space</kbd> / <kbd>→</kbd></td>
                    <td className="py-2.5 px-4 text-white font-medium">{lang === 'de' ? 'Nächstes Bild' : 'Next image'}</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>Backspace</kbd> / <kbd>←</kbd></td>
                    <td className="py-2.5 px-4 text-white font-medium">{lang === 'de' ? 'Vorheriges Bild' : 'Previous image'}</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>1</kbd></td>
                    <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? '100% Originalgröße' : '100% 1:1 scale'}</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>Mausrad</kbd> / <kbd>+</kbd> <kbd>-</kbd></td>
                    <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'Zoom (Cursor-zentriert)' : 'Zoom (Cursor-centered)'}</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>F</kbd> / <kbd>F11</kbd></td>
                    <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'Vollbild umschalten' : 'Toggle fullscreen'}</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>Esc</kbd></td>
                    <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'Vollbild beenden / Schließen' : 'Exit fullscreen / Close'}</td>
                  </tr>
                </tbody>
              </table>

              {/* Spalte 2: Manipulation & Befehle */}
              <table className="w-full text-left border-collapse font-mono">
                <tbody className="divide-y divide-[#34373e] text-zinc-200">
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4 w-1/2"><kbd>Shift + T</kbd></td>
                    <td className="py-2.5 px-4 text-white font-medium">{lang === 'de' ? 'Befehlspalette' : 'Command palette'}</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>R</kbd> / <kbd>L</kbd></td>
                    <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'Drehen 90° (Rechts/Links)' : 'Rotate 90° (Right/Left)'}</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>H</kbd> / <kbd>V</kbd></td>
                    <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'Spiegeln (H/V)' : 'Flip (Horizontal/Vertical)'}</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>I</kbd></td>
                    <td className="py-2.5 px-4 text-zinc-300">EXIF HUD Overlay</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>Entf</kbd> / <kbd>Delete</kbd></td>
                    <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'In Papierkorb' : 'Move to trash'}</td>
                  </tr>
                  <tr className="hover:bg-[#1a1c20]">
                    <td className="py-2.5 px-4"><kbd>Ctrl + Z</kbd></td>
                    <td className="py-2.5 px-4 text-white font-bold">{lang === 'de' ? 'Rückgängig (Undo)' : 'Undo (Restore)'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* STANDARD-BETRACHTER EINRICHTEN */}
        <section id="default-app">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Als Standard-Betrachter festlegen' : 'Set as Default Image Viewer'}</span>
          </h2>

          <div className="border border-[#34373e] bg-[#161719] font-mono text-xs sm:text-[13px] overflow-hidden">
            <div className="bg-[#17181a] px-4 py-3 border-b border-[#34373e] flex flex-wrap items-center justify-between gap-3">
              <span className="font-bold text-white text-xs">
                {lang === 'de' ? 'Betriebssystem wählen:' : 'Select Operating System:'}
              </span>
              <div className="flex items-center gap-1">
                {(['windows', 'linux', 'macos'] as const).map((os) => (
                  <button
                    key={os}
                    type="button"
                    onClick={() => setDefaultAppTab(os)}
                    className={`px-3 py-1 text-xs font-mono font-semibold cursor-pointer transition-colors border ${
                      defaultAppTab === os
                        ? 'bg-white text-black border-white'
                        : 'bg-[#202123] text-zinc-300 hover:text-white border-[#34373e]'
                    }`}
                  >
                    {os === 'windows' ? 'Windows 10/11' : os === 'linux' ? 'Linux' : 'macOS'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-zinc-300 leading-relaxed">
              {defaultAppTab === 'windows' && (
                <>
                  <p>
                    {lang === 'de'
                      ? 'Führe im entpackten Anwendungsordner die Skriptdatei register-windows.bat aus. Sie erkennt den Pfad zu uxzView.exe automatisch und registriert das Programm ohne Administratorrechte.'
                      : 'Run register-windows.bat inside the portable application folder. It detects uxzView.exe automatically and registers the application without administrator rights.'}
                  </p>
                  <div className="p-3 bg-[#101113] border border-[#2a2d35] text-xs font-mono text-zinc-200">
                    <code>register-windows.bat</code>
                  </div>
                  <p className="text-zinc-400 text-xs">
                    {lang === 'de'
                      ? 'Danach steht üxzView unter Windows in "Öffnen mit" und unter Einstellungen → Apps → Standard-Apps zur Auswahl. Zum Entfernen einfach unregister-windows.bat ausführen.'
                      : 'Afterwards, üxzView appears in "Open with" and Settings → Apps → Default apps. Run unregister-windows.bat to remove the registration.'}
                  </p>
                </>
              )}

              {defaultAppTab === 'linux' && (
                <>
                  <p>
                    {lang === 'de'
                      ? 'Installiere üxzView und die dazugehörige org.ixview.IxView.desktop Datei. Anschließend kannst du den Betrachter im "Öffnen mit"-Menü deines Dateimanagers wählen oder per Terminal als Standard festlegen:'
                      : 'Install üxzView and org.ixview.IxView.desktop. Select üxzView in your file manager\'s "Open with" menu or configure system defaults via terminal:'}
                  </p>
                  <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                    xdg-mime default org.ixview.IxView.desktop image/jpeg image/png image/webp image/gif image/tiff image/bmp
                  </pre>
                </>
              )}

              {defaultAppTab === 'macos' && (
                <>
                  <p>
                    {lang === 'de'
                      ? 'Verschiebe die gebaute uxzView.app in den Ordner Programme (/Applications). Wähle im Finder ein Bild aus → Informationen (Cmd+I) → Öffnen mit → üxzView → "Alle ändern...".'
                      : 'Move the built uxzView.app into /Applications. In Finder, select an image file → Get Info (Cmd+I) → Open with → üxzView → "Change All...".'}
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* KOMMANDOZEILE (CLI) */}
        <section id="cli">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Kommandozeilen-Optionen' : 'CLI Parameters'}</span>
          </h2>

          <div className="border border-[#34373e] overflow-hidden font-mono text-xs">
            <div className="bg-[#17181a] text-zinc-100 px-4 py-2.5 border-b border-[#34373e] text-xs font-bold">
              <span>$ üxzView [OPTIONS] [FILE | DIR]</span>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <tbody className="divide-y divide-[#34373e] text-zinc-200">
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-2.5 px-4 text-white font-bold w-1/3 sm:w-1/4">--fullscreen, -f</td>
                  <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'Startet direkt im Vollbild' : 'Launch directly in fullscreen'}</td>
                </tr>
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-2.5 px-4 text-white font-bold">--slideshow &lt;s&gt;</td>
                  <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'Automatischer Bildwechsel (Sekunden)' : 'Auto-advance interval in seconds'}</td>
                </tr>
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-2.5 px-4 text-white font-bold">--raw-fast</td>
                  <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'Halbe RAW-Auflösung für schnelles Culling' : 'Half-res RAW decode for fast culling'}</td>
                </tr>
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-2.5 px-4 text-white font-bold">--scale &lt;1:1|fit&gt;</td>
                  <td className="py-2.5 px-4 text-zinc-300">{lang === 'de' ? 'Standard-Skalierungsmodus beim Öffnen' : 'Default scaling mode upon opening'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* BUILD FROM SOURCE */}
        <section id="build">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Selbst kompilieren (Build)' : 'Build from Source'}</span>
          </h2>

          <div className="font-mono text-xs">
            {/* Build Guide for Windows, Linux & macOS */}
            <div className="border border-[#34373e] overflow-hidden">
              {/* Header with OS Tabs */}
              <div className="bg-[#17181a] px-4 py-2.5 border-b border-[#34373e] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white text-xs">
                    {lang === 'de' ? 'Plattform wählen:' : 'Select platform:'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setBuildPlatform('linux')}
                      className={`px-2.5 py-0.5 text-xs font-mono font-semibold cursor-pointer transition-colors border ${
                        buildPlatform === 'linux'
                          ? 'bg-white text-black border-white'
                          : 'bg-[#202123] text-zinc-300 hover:text-white border-[#34373e]'
                      }`}
                    >
                      Linux
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuildPlatform('macos')}
                      className={`px-2.5 py-0.5 text-xs font-mono font-semibold cursor-pointer transition-colors border ${
                        buildPlatform === 'macos'
                          ? 'bg-white text-black border-white'
                          : 'bg-[#202123] text-zinc-300 hover:text-white border-[#34373e]'
                      }`}
                    >
                      macOS
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuildPlatform('windows')}
                      className={`px-2.5 py-0.5 text-xs font-mono font-semibold cursor-pointer transition-colors border ${
                        buildPlatform === 'windows'
                          ? 'bg-white text-black border-white'
                          : 'bg-[#202123] text-zinc-300 hover:text-white border-[#34373e]'
                      }`}
                    >
                      Windows
                    </button>
                  </div>
                </div>

                <a
                  href={`${repoUrl}/archive/refs/tags/v${version}.tar.gz`}
                  className="text-zinc-300 hover:text-white underline text-xs"
                >
                  üxzView-{version}-source.tar.gz (~1.9 MB) ↗
                </a>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="p-4 sm:p-5 space-y-5 bg-[#161719]">
                {buildPlatform === 'linux' ? (
                  <>
                    {/* Linux Step 1: Dependencies */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-white text-xs">
                          {lang === 'de' ? '1. Abhängigkeiten installieren (C++20, CMake, Qt 6, LibRaw):' : '1. Install Dependencies (C++20, CMake, Qt 6, LibRaw):'}
                        </span>
                        <div className="flex items-center gap-1 text-[11px]">
                          {(['ubuntu', 'arch', 'fedora'] as const).map((distro) => (
                            <button
                              key={distro}
                              type="button"
                              onClick={() => setLinuxDistro(distro)}
                              className={`px-2 py-0.5 font-mono cursor-pointer transition-colors border ${
                                linuxDistro === distro
                                  ? 'bg-zinc-200 text-black border-zinc-200 font-bold'
                                  : 'bg-[#202123] text-zinc-400 hover:text-white border-[#34373e]'
                              }`}
                            >
                              {distro === 'ubuntu' ? 'Ubuntu / Debian' : distro === 'arch' ? 'Arch Linux' : 'Fedora'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {linuxDeps[linuxDistro]}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopyDep(linuxDeps[linuxDistro])}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedDep ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                    </div>

                    {/* Linux Step 2: Build & Run */}
                    <div className="space-y-2 pt-3 border-t border-[#262830]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">
                          {lang === 'de' ? '2. Quellcode klonen, kompilieren & starten:' : '2. Clone, build & run via CMake:'}
                        </span>
                      </div>

                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {linuxBuildSnippet}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopyBuild(linuxBuildSnippet)}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedBuild ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                    </div>
                  </>
                ) : buildPlatform === 'macos' ? (
                  <>
                    {/* macOS Step 1: Homebrew */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">
                          {lang === 'de' ? '1. Abhängigkeiten via Homebrew installieren:' : '1. Install dependencies via Homebrew:'}
                        </span>
                      </div>

                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {macosDeps}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopyDep(macosDeps)}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedDep ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                    </div>

                    {/* macOS Step 2: Build & Run */}
                    <div className="space-y-2 pt-3 border-t border-[#262830]">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-white text-xs">
                          {lang === 'de' ? '2. Kompilieren (mit Homebrew Qt-Pfad) & starten:' : '2. Compile (with Homebrew Qt prefix) & run:'}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          {lang === 'de'
                            ? 'Homebrew installiert Qt 6 isoliert (keg-only). CMAKE_PREFIX_PATH übergibt den Pfad automatisch an CMake.'
                            : 'Homebrew installs Qt 6 as keg-only. CMAKE_PREFIX_PATH passes the path automatically to CMake.'}
                        </span>
                      </div>

                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {macosBuildSnippet}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopyBuild(macosBuildSnippet)}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedBuild ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <span className="font-bold text-white text-xs">
                        {lang === 'de' ? '1. Voraussetzungen (Python 3.14+, CMake 3.24+, Qt 6.8+, C++20 Compiler):' : '1. Requirements (Python 3.14+, CMake 3.24+, Qt 6.8+, C++20 Compiler):'}
                      </span>
                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {windowsDeps}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-[#262830]">
                      <span className="font-bold text-white text-xs">
                        {lang === 'de' ? '2. SDK Bootstrap, Tool-Packs bauen & Deploy ausführen:' : '2. Run SDK bootstrap, build tool packs & deploy:'}
                      </span>
                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {windowsBuildSnippet}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopyBuild(windowsBuildSnippet)}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedBuild ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ROADMAP & ENTWICKLUNG */}
        <section id="roadmap">
          <h2 className="section-title">
            <span>Roadmap</span>
          </h2>

          <div className="space-y-6 font-mono text-xs sm:text-[13px]">
            {/* Completed Milestones */}
            <div className="border border-[#34373e] overflow-hidden">
              <div className="bg-[#17181a] px-4 py-2.5 border-b border-[#34373e] flex items-center justify-between">
                <span className="font-bold text-white text-xs">
                  {lang === 'de' ? '1. Bisherige Meilensteine' : '1. Completed Milestones'}
                </span>
                <span className="text-[11px] font-bold text-zinc-300 bg-[#252830] px-2 py-0.5 border border-[#3c404b]">
                  {lang === 'de' ? 'ERLEDIGT' : 'RELEASED'}
                </span>
              </div>

              <div className="divide-y divide-[#34373e] text-zinc-300">
                <div className="p-4 grid sm:grid-cols-12 gap-3 items-baseline hover:bg-[#1a1c20]">
                  <div className="sm:col-span-4 font-bold text-white">
                    <span>v0.1.0 – v0.3.5</span>
                    <span className="block text-[11px] text-zinc-400 font-normal">
                      {lang === 'de' ? 'Fundament & Core Engine' : 'Core Engine & Foundation'}
                    </span>
                  </div>
                  <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                    {lang === 'de'
                      ? 'Natives C++20 / Qt6 Framework, LibRaw 16-Bit RAW-Integration (Sony ARW, Canon CR2/CR3, Fuji RAF), EXIF HUD Overlay und blitzschnelles Culling per Tastatur.'
                      : 'Native C++20 / Qt6 framework, LibRaw 16-bit RAW integration (Sony ARW, Canon CR2/CR3, Fuji RAF), EXIF HUD overlay, and zero-latency keyboard culling.'}
                  </div>
                </div>

                <div className="p-4 grid sm:grid-cols-12 gap-3 items-baseline hover:bg-[#1a1c20]">
                  <div className="sm:col-span-4 font-bold text-white">
                    <span>v0.4.0 – v0.4.4</span>
                    <span className="block text-[11px] text-zinc-400 font-normal">
                      {lang === 'de' ? 'Performance, Usability & Stabilität' : 'Performance, Usability & Stability'}
                    </span>
                  </div>
                  <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                    {lang === 'de'
                      ? '0,24 ms RAM-Lookahead-Cache, Command Palette (Shift+T), Nachbarleiste (1–5 Frames), Papierkorb-Journal mit Ctrl+Z Undo, OpenEXR HDR, C++ Core Updates und Windows 11 Explorer-Integration.'
                      : '0.24 ms RAM lookahead cache, command palette (Shift+T), centered neighbor strip (1–5 frames), recycle bin journal with Ctrl+Z undo, OpenEXR HDR, C++ core updates, and Windows 11 explorer integration.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Roadmap */}
            <div className="border border-[#34373e] overflow-hidden">
              <div className="bg-[#17181a] px-4 py-2.5 border-b border-[#34373e] flex items-center justify-between">
                <span className="font-bold text-white text-xs">
                  {lang === 'de' ? '2. Ausblick & Nächste Schritte' : '2. Upcoming & Next Steps'}
                </span>
                <span className="text-[11px] font-bold text-white bg-[#252830] px-2 py-0.5 border border-[#444855]">
                  {lang === 'de' ? 'IN ENTWICKLUNG' : 'IN PROGRESS'}
                </span>
              </div>

              <div className="divide-y divide-[#34373e] text-zinc-300 bg-[#161719]">
                <div className="p-4 grid sm:grid-cols-12 gap-3 items-baseline hover:bg-[#1a1c20]">
                  <div className="sm:col-span-4 font-bold text-white">
                    <span>{lang === 'de' ? 'Native Installer' : 'Native Installers'}</span>
                    <span className="block text-[11px] text-zinc-400 font-normal">Windows · Linux · macOS</span>
                  </div>
                  <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                    {lang === 'de'
                      ? 'Geführte Installationsroutinen für Windows (MSI/Setup), Linux (AppImage, Flatpak, DEB/RPM) und macOS (.dmg Paket) zur einfachen Systemintegration.'
                      : 'Guided setup installers for Windows (MSI/Setup), Linux (AppImage, Flatpak, DEB/RPM), and macOS (.dmg package) for seamless system integration.'}
                  </div>
                </div>

                <div className="p-4 grid sm:grid-cols-12 gap-3 items-baseline hover:bg-[#1a1c20]">
                  <div className="sm:col-span-4 font-bold text-white">
                    <span>{lang === 'de' ? 'Zusätzliche Werkzeuge' : 'Additional Tools'}</span>
                    <span className="block text-[11px] text-zinc-400 font-normal">
                      {lang === 'de' ? 'Optionale Utilities' : 'Optional Utilities'}
                    </span>
                  </div>
                  <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                    {lang === 'de'
                      ? 'Erweiterung um optionale Zusatz-Tools für Bildbearbeitung, Metadaten-Verwaltung und erweiterte Export- und Konvertierungsworkflows.'
                      : 'Expansion with optional helper tools for image processing, metadata management, and advanced export and conversion workflows.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHANGELOG */}
        <section id="changelog">
          <h2 className="section-title">
            <span>Changelog</span>
          </h2>

          <div className="border-y border-[#34373e] divide-y divide-[#34373e] text-xs font-mono">
            <div className="py-4">
              <div className="flex items-center gap-3 font-bold text-white text-sm">
                <span>v0.4.4</span>
                <span className="text-zinc-400 font-normal">({lang === 'de' ? releaseDate : releaseDateEn})</span>
                <span className="bg-white text-black px-1.5 py-0.2 text-[10px] font-bold">CURRENT</span>
              </div>
              <ul className="list-disc list-inside mt-2.5 space-y-1 text-zinc-300">
                <li>{lang === 'de' ? 'Aktualisierungen & Stabilitätsverbesserungen im C++ Core' : 'C++ core updates & stability improvements'}</li>
                <li>{lang === 'de' ? 'Optimierte Qt6 Render-Pipeline & RAW Dekodierung' : 'Optimized Qt6 rendering pipeline & RAW decoding'}</li>
                <li>{lang === 'de' ? 'Verfeinerte Tastaturnavigation & EXIF-HUD Darstellung' : 'Refined keyboard navigation & EXIF HUD overlay'}</li>
              </ul>
            </div>

            <div className="py-4">
              <div className="flex items-center gap-3 font-bold text-white text-sm">
                <span className="text-zinc-200">v0.4.3</span>
              </div>
              <ul className="list-disc list-inside mt-2.5 space-y-1 text-zinc-300">
                <li>{lang === 'de' ? '0,24 ms RAM-Cache via Multithreaded Lookahead' : '0.24 ms RAM cache latency via multithreaded lookahead'}</li>
                <li>{lang === 'de' ? 'LibRaw 0.21.3 mit Sony ARW & Fuji RAF Farbkalibrierung' : 'LibRaw 0.21.3 with Sony ARW and Fuji RAF color calibrations'}</li>
                <li>{lang === 'de' ? 'Toolbar-Befehlspalette via Shift+T' : 'Toolbar command palette via Shift+T'}</li>
                <li>{lang === 'de' ? 'Zentrierte Nachbarleiste (1–5 Frames)' : 'Centered neighbor strip (1–5 frames)'}</li>
              </ul>
            </div>

            <div className="py-4">
              <div className="flex items-center gap-3 font-bold text-white text-sm">
                <span className="text-zinc-200">v0.4.2</span>
              </div>
              <ul className="list-disc list-inside mt-2.5 space-y-1 text-zinc-300">
                <li>{lang === 'de' ? 'Papierkorb-Journal (Ctrl+Z Atomares Undo)' : 'Recycle bin recovery journal (Ctrl+Z atomic undo)'}</li>
                <li>{lang === 'de' ? 'OpenEXR 32-Bit Float HDR Unterstützung' : 'OpenEXR 32-bit float HDR support'}</li>
                <li>{lang === 'de' ? 'Windows 11 Explorer Kontextmenü-Skripte' : 'Bundled Windows 11 context menu scripts'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* JOURNALISTISCHES EXPERIMENT & KI */}
        <section id="experiment">
          <h2 className="section-title">
            <span>
              {lang === 'de'
                ? 'Das KI-Experiment & 1E9'
                : 'AI Experiment & 1E9'}
            </span>
          </h2>

          <div className="border border-[#34373e] bg-[#161719] p-5 sm:p-6 space-y-5 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300">
            <p className="leading-relaxed">
              {lang === 'de' ? (
                <>
                  üxzView stammt von Entwickler und Journalist Michael Förtsch (
                  <a
                    href="https://github.com/micha42-dot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-zinc-200 font-semibold"
                  >
                    micha42-dot
                  </a>
                  ) – gebaut mit ordentlich Unterstützung durch KI-Tools. Entwickelt wurde mit den Assistenten{' '}
                  <strong className="text-white font-bold">Codex</strong> und{' '}
                  <strong className="text-white font-bold">Cline</strong> auf Basis der Sprachmodelle{' '}
                  <strong className="text-white font-bold">GPT-6 Astra</strong>,{' '}
                  <strong className="text-white font-bold">GPT-6.1 Sol</strong>,{' '}
                  <strong className="text-white font-bold">Kimi K3</strong> und{' '}
                  <strong className="text-white font-bold">GLM 5.3</strong>. Das Ganze ist gleichzeitig ein kleines journalistisches Experiment: In einer zweiteiligen Artikelreihe beim Tech-Magazin{' '}
                  <a
                    href="https://1e9.community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold underline hover:text-zinc-200"
                  >
                    1E9
                  </a>{' '}
                  beleuchtet Michael die Entstehung, Stolpersteine und Erkenntnisse beim Bau einer voll funktionsfähigen nativen Desktop-Software mit KI.
                </>
              ) : (
                <>
                  üxzView was built by developer and journalist Michael Förtsch (
                  <a
                    href="https://github.com/micha42-dot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-zinc-200 font-semibold"
                  >
                    micha42-dot
                  </a>
                  ) with plenty of assistance from AI tools. Development relied on the coding assistants{' '}
                  <strong className="text-white font-bold">Codex</strong> and{' '}
                  <strong className="text-white font-bold">Cline</strong>, powered by the AI models{' '}
                  <strong className="text-white font-bold">GPT-6 Astra</strong>,{' '}
                  <strong className="text-white font-bold">GPT-6.1 Sol</strong>,{' '}
                  <strong className="text-white font-bold">Kimi K3</strong>, and{' '}
                  <strong className="text-white font-bold">GLM 5.3</strong>. The project also serves as a journalistic experiment: in a two-part article series for the tech magazine{' '}
                  <a
                    href="https://1e9.community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold underline hover:text-zinc-200"
                  >
                    1E9
                  </a>
                  , Michael documented the creation, hurdles, and takeaways of building native desktop software using AI.
                </>
              )}
            </p>

            {/* Structured Specifications Grid */}
            <div className="pt-1">
              <div className="border border-[#2e313a] bg-[#121315] divide-y divide-[#2e313a] text-xs font-mono">
                <div className="p-3 grid sm:grid-cols-12 gap-2 items-baseline">
                  <span className="sm:col-span-4 text-zinc-400 font-bold">
                    {lang === 'de' ? 'Entwickler & Journalist' : 'Developer & Journalist'}
                  </span>
                  <span className="sm:col-span-8 text-white font-bold">
                    Michael Förtsch (micha42-dot)
                  </span>
                </div>
                <div className="p-3 grid sm:grid-cols-12 gap-2 items-baseline">
                  <span className="sm:col-span-4 text-zinc-400 font-bold">
                    {lang === 'de' ? 'KI-Tools & Agenten' : 'AI Tools & Agents'}
                  </span>
                  <span className="sm:col-span-8 text-white font-bold">Codex · Cline</span>
                </div>
                <div className="p-3 grid sm:grid-cols-12 gap-2 items-baseline">
                  <span className="sm:col-span-4 text-zinc-400 font-bold">
                    {lang === 'de' ? 'Verwendete Modelle' : 'Models Used'}
                  </span>
                  <span className="sm:col-span-8 text-white font-bold">
                    GPT-6 Astra · GPT-6.1 Sol · Kimi K3 · GLM 5.3
                  </span>
                </div>
                <div className="p-3 grid sm:grid-cols-12 gap-2 items-baseline">
                  <span className="sm:col-span-4 text-zinc-400 font-bold">
                    {lang === 'de' ? 'Journalistischer Kontext' : 'Journalistic Context'}
                  </span>
                  <span className="sm:col-span-8 text-white">
                    {lang === 'de'
                      ? 'Zweiteilige Artikelreihe im Tech-Magazin 1E9'
                      : 'Two-part article series in tech magazine 1E9'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#34373e] bg-[#17181a] py-6 px-4 text-xs text-zinc-400 font-mono mt-16">
        <div className="max-w-[1020px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <img
              src="/assets/aistudio/_gz_ae961cd1.jpg"
              alt="üxz"
              className="h-4 w-auto object-contain pixel-logo"
            />
            <span className="font-bold text-white font-mono">üxzView</span> &copy; 2026 · {lang === 'de' ? 'Entwickelt von' : 'Created by'}{' '}
            <a
              href="https://github.com/micha42-dot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline font-semibold"
            >
              micha42-dot
            </a>{' '}
            · GNU GPLv3.
          </div>

          <div className="flex flex-wrap items-center gap-5 text-zinc-300 font-mono">
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-white font-medium">
              GitHub ↗
            </a>
            <a href={`${repoUrl}/releases`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Releases
            </a>
            <a href={`${repoUrl}/issues`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Issues
            </a>
            <a href="https://michaelfoertsch.de" target="_blank" rel="noopener noreferrer" className="hover:underline">
              michaelfoertsch.de
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
