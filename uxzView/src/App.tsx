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
  const [copiedPsReg, setCopiedPsReg] = useState(false);
  const [copiedMime, setCopiedMime] = useState(false);

  const version = '0.5.0';
  const releaseDate = '29. Oktober 2026';
  const releaseDateEn = 'October 29, 2026';
  const downloadUrl = 'https://github.com/micha42-dot/uxzView/releases/download/0.5.0/uxzView-win64.zip';
  const sha256 = 'eaddf4daf508266398e465c6a0e7a64b8abf49499f2ae1efe28aa19302c36c51';
  const repoUrl = 'https://github.com/micha42-dot/uxzView';

  const windowsDeps = 'Python 3.14+ · CMake 3.24+ · Qt 6.8+ · C++20 Compiler · libjpeg-turbo';

  const windowsBuildSnippet = `python scripts/bootstrap_sdk.py
python scripts/build_tool_packs.py
./scripts/build.ps1 -Test
python scripts/deploy.py`;

  const linuxDeps = {
    ubuntu: 'sudo apt install build-essential cmake qt6-base-dev libqt6svg6-dev libraw-dev libjpeg-turbo8-dev',
    arch: 'sudo pacman -S base-devel cmake qt6-base qt6-svg libraw libjpeg-turbo',
    fedora: 'sudo dnf install gcc-c++ cmake qt6-qtbase-devel qt6-qtsvg-devel LibRaw-devel libjpeg-turbo-devel',
  };

  const macosDeps = 'brew install cmake qt libraw libjpeg-turbo';

  const linuxScriptSnippet = `bash scripts/build.sh -DCMAKE_PREFIX_PATH=/path/to/Qt`;
  const macosScriptSnippet = `bash scripts/build.sh -DCMAKE_PREFIX_PATH="$(brew --prefix qt)"`;

  const psRegSnippet = `./register-windows.ps1 -ExecutablePath 'C:\\Apps\\üxzView\\uxzView.exe' -GenerateOnly -RegFilePath './uxzView.reg'`;
  const xdgMimeSnippet = `xdg-mime default org.ixview.IxView.desktop image/jpeg image/png image/webp image/gif image/tiff image/bmp`;

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyText = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="bg-[#202123] min-h-screen font-mono selection:bg-white selection:text-black flex flex-col text-[#f1f2f4]">
      {/* Top Bar */}
      <header className="border-b border-[#34373e] bg-[#202123] sticky top-0 z-50">
        <div className="max-w-[1020px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center text-white no-underline">
            <img
              src="assets/logo-header.png"
              alt="üxzView"
              className="h-6 sm:h-7 w-auto object-contain pixel-logo"
            />
          </a>

          <nav className="flex items-center gap-3 sm:gap-4 md:gap-5 text-xs sm:text-[13px] font-mono text-zinc-300">
            <a href="#features" className="hover:text-white transition-colors">
              {lang === 'de' ? 'Funktionen' : 'Features'}
            </a>
            <a href="#formats" className="hover:text-white transition-colors">
              {lang === 'de' ? 'Formate' : 'Formats'}
            </a>
            <a href="#tools" className="hover:text-white transition-colors hidden sm:inline">
              {lang === 'de' ? 'Erkennung' : 'Tools'}
            </a>
            <a href="#portable" className="hover:text-white transition-colors hidden md:inline">
              Portable
            </a>
            <a href="#default-app" className="hover:text-white transition-colors hidden sm:inline">
              {lang === 'de' ? 'Standard' : 'Default'}
            </a>
            <a href="#build" className="hover:text-white transition-colors hidden sm:inline">
              Build
            </a>
            <a href="#docs" className="hover:text-white transition-colors hidden lg:inline">
              {lang === 'de' ? 'Doku' : 'Docs'}
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
            <div className="border-l border-[#3a3d46] pl-2 sm:pl-3 flex items-center gap-1 text-xs">
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
        {/* HERO: Centered Logo with Brackets + Tagline + Screenshot + Download */}
        <section>
          {/* Logo centered above Version and Download, framed by square brackets */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pb-6 pt-2">
            <span
              className="text-6xl sm:text-8xl font-mono text-zinc-300 select-none leading-none font-light"
              aria-hidden="true"
            >
              [
            </span>
            <img
              src="assets/logo.jpg"
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

          {/* Statement: Free · Open-Source · Unfinished */}
          <div className="text-center pb-8 pt-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-white font-mono uppercase">
              Free · Open-Source · Unfinished
            </div>
            <p className="text-xs sm:text-[13px] text-zinc-300 font-mono mt-3 max-w-2xl mx-auto leading-relaxed">
              {lang === 'de'
                ? 'üxzView ist ein Bildbetrachter für Windows 10/11, Linux und macOS, entwickelt mit C++20 und Qt 6. Inspiriert von IrfanView und nomacs.'
                : 'üxzView is an image viewer for Windows 10/11, Linux and macOS, built with C++20 and Qt 6. Inspired by IrfanView and nomacs.'}
            </p>
            <p className="text-[11px] sm:text-xs text-zinc-400 font-mono mt-1 max-w-2xl mx-auto leading-relaxed">
              {lang === 'de'
                ? 'Aktuell in aktiver Entwicklung. Fertige Pakete richten sich derzeit an Windows x64. Kompilierung aus dem Quellcode für Linux und macOS vorbereitet (native Testläufe noch ausstehend).'
                : 'Currently in development. Prebuilt packages currently target Windows x64 only. Source builds for Linux and macOS supported (native validation in progress).'}
            </p>
          </div>

          {/* Screenshot Preview directly placed between hero tagline and download spec panel */}
          <div className="border border-[#34373e] bg-[#161719] overflow-hidden shadow-2xl mb-8">
            <img
              src="assets/screenshot.jpg"
              alt="üxzView Programmoberfläche"
              className="w-full h-auto block select-none"
              loading="lazy"
            />
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
                  {lang === 'de' ? 'Auspacken, starten, läuft · Windows x64 ZIP (74,4 MB)' : 'Extract and run · Windows x64 ZIP (74.4 MB)'}
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
                    ? 'Windows 10/11 (Binärpaket x64) · Linux & macOS (Build via scripts/build.sh)'
                    : 'Windows 10/11 (Pre-built x64) · Linux & macOS (Build via scripts/build.sh)'}
                </span>
              </div>

              <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
                <span className="sm:col-span-4 text-zinc-400 font-bold">
                  {lang === 'de' ? 'Namensgebung & Identifikatoren' : 'Naming & Identifiers'}
                </span>
                <span className="sm:col-span-8 text-zinc-200">
                  {lang === 'de'
                    ? 'Programmdateien und Downloads nutzen ASCII-Namen uxzView · Speicherpfade behalten IxView-IDs'
                    : 'Program files and downloads use ASCII name uxzView · Storage identifiers retain IxView'}
                </span>
              </div>

              <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
                <span className="sm:col-span-4 text-zinc-400 font-bold">
                  {lang === 'de' ? 'Erkennungswerkzeuge (OCR/QR)' : 'Recognition Tools (OCR/QR)'}
                </span>
                <span className="sm:col-span-8 text-zinc-200">
                  ZXing-C++ (QR/Barcodes) · Tesseract OCR (DE, EN, FR, JA, KO) im Ordner tools/ (modular entfernbar)
                </span>
              </div>

              <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
                <span className="sm:col-span-4 text-zinc-400 font-bold">
                  {lang === 'de' ? 'Technischer Stack & Lizenz' : 'Tech Stack & License'}
                </span>
                <span className="sm:col-span-8 text-zinc-200">
                  C++20 · Qt 6.8+ · CMake 3.24+ · libjpeg-turbo · LibRaw 16-Bit · GPL-3.0-or-later
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

        {/* FUNKTIONEN (Official Features from README) */}
        <section id="features">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Funktionen' : 'Features'}</span>
          </h2>

          <div className="border-y border-[#34373e] divide-y divide-[#34373e] text-xs sm:text-[13px] font-mono">
            {/* 1. Fast folder browsing, keyboard navigation and image caching */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Ordner-Browsing & Caching' : 'Folder Browsing & Caching'}</span>
                <span className="text-zinc-400 font-normal">Space / ← →</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Blitzschnelles Navigieren in Bildordnern, reaktionsschnelle Tastatursteuerung und speichereffizientes Caching.'
                  : 'Fast folder browsing, responsive keyboard navigation and memory-efficient image caching.'}
              </div>
            </div>

            {/* 2. Fullscreen viewing, slideshows, area zoom */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Rahmenlose Anzeige & Vollbild' : 'Frameless Canvas & Fullscreen'}</span>
                <span className="text-zinc-400 font-normal">F11 / Maus</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Rahmenlose Bildanzeige im Fenster- und Vollbildmodus, flüssige Mausnavigation, Diashows und stufenloses Hineinzoomen in markierte Bildausschnitte.'
                  : 'Frameless image canvas in window and fullscreen modes, smooth mouse navigation, automated slideshows and precision zoom into selected image areas.'}
              </div>
            </div>

            {/* 3. Optional fullscreen info in any corner */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Vollbild-Info in jeder Ecke' : 'Corner Fullscreen Info'}</span>
                <span className="text-zinc-400 font-normal">HUD</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Optionale Vollbild-Informationen in jeder beliebigen Ecke: Auflösung, DPI, Dateigröße und ausgewählte Metadaten.'
                  : 'Optional fullscreen information in any corner: resolution, DPI, file size and selected metadata.'}
              </div>
            </div>

            {/* 4. Optional centered thumbnail strip */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Zentrierte Nachbarleiste' : 'Centered Thumbnail Strip'}</span>
                <span className="text-zinc-400 font-normal">1–5 Frames</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Optionale, zentrierte Miniaturleiste mit jeweils 1 bis 5 vorherigen und nachfolgenden Bildern für schnellen Bildvergleich.'
                  : 'Optional, centered thumbnail strip displaying 1–5 previous and next images for quick visual comparison.'}
              </div>
            </div>

            {/* 5. Command Search in Toolbar */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Befehlssuche in Toolbar' : 'Toolbar Command Search'}</span>
                <span className="text-zinc-400 font-normal">Shift+T</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Direkte Suche und Sofortausführung sämtlicher Bearbeitungsbefehle direkt aus der Werkzeugleiste.'
                  : 'Instant search and execution for editing commands directly from the application toolbar.'}
              </div>
            </div>

            {/* 6. Resize, crop, rotate, flip, colors, auto-correction */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Bearbeitung & Autokorrektur' : 'Editing & Auto-Correction'}</span>
                <span className="text-zinc-400 font-normal">Transform</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Skalieren, Zuschneiden mit Standard- oder benutzerdefinierten Seitenverhältnissen, Drehen, Spiegeln, Farbanpassungen und automatische Korrektur.'
                  : 'Resize, crop with preset or custom aspect ratios, rotate, flip, adjust colors and automatic image correction.'}
              </div>
            </div>

            {/* 7. Visual batch processing */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Visuelle Stapelverarbeitung' : 'Visual Batch Processing'}</span>
                <span className="text-zinc-400 font-normal">Batch Profiles</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Visuelle Stapelverarbeitung ganzer Ordner mit wiederverwendbaren Profilen, Wasserzeichen und detaillierten Konvertierungsberichten.'
                  : 'Visual batch processing with reusable profiles, watermarks, and export conversion reports.'}
              </div>
            </div>

            {/* 8. Ratings, labels, search, duplicate detection */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Bewertungen & Duplikate' : 'Ratings & Duplicate Search'}</span>
                <span className="text-zinc-400 font-normal">Labels &amp; Stars</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Sternebewertungen, Farblabels, gezielte Suche nach Metadaten und automatische Erkennung doppelter Bilder.'
                  : 'Ratings, color labels, metadata search and automated duplicate detection.'}
              </div>
            </div>

            {/* 9. System trash and undo/redo for image edits */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'System-Papierkorb & Undo/Redo' : 'System Trash & Undo/Redo'}</span>
                <span className="text-zinc-400 font-normal">Ctrl+Z / Del</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Direkte Dateilöschung über den Papierkorb des Betriebssystems mit Revisionsprüfung; zuverlässiges Undo/Redo für alle Bildbearbeitungen.'
                  : 'Direct file deletion via the operating system trash with pre-delete revision verification; reliable undo/redo history for image edits.'}
              </div>
            </div>

            {/* 10. Configurable screenshots & shortcuts */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Screenshots & Shortcuts' : 'Screenshots & Shortcuts'}</span>
                <span className="text-zinc-400 font-normal">Configurable</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Konfigurierbare Screenshot-Aufnahmen und frei anpassbare Tastaturkürzel für sämtliche Arbeitsabläufe.'
                  : 'Configurable screenshot captures and fully customizable keyboard shortcuts.'}
              </div>
            </div>

            {/* 11. Formats: JPEG, PNG, WebP, TIFF, GIF, APNG, PSD, SVG, RAW */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Raster, RAW & Plugins' : 'Raster, RAW & Plugins'}</span>
                <span className="text-zinc-400 font-normal">Broad Support</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'JPEG, PNG, WebP, TIFF, GIF, APNG, PSD-Composite, SVG, Kamera-RAW sowie zusätzliche per Plugin bereitgestellte Formate.'
                  : 'JPEG, PNG, WebP, TIFF, GIF, APNG, PSD composite images, SVG, RAW and additional plugin-provided formats.'}
              </div>
            </div>

            {/* 12. Multi-page, animations, 16-bit, ICC/EXIF/IPTC/XMP */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? '16-Bit, Animationen & Metadaten' : '16-bit, Animations & Color'}</span>
                <span className="text-zinc-400 font-normal">ICC / EXIF</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Mehrseitige Dokumente, Animationswiedergabe, 16-Bit-Farbtiefe sowie Unterstützung von ICC-Farbprofilen, EXIF, IPTC und XMP wo vom Format unterstützt.'
                  : 'Multi-page images, animation playback, 16-bit image data and ICC/EXIF/IPTC/XMP support where supported by the format.'}
              </div>
            </div>

            {/* 13. ZIP/CBZ image collections */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'ZIP/CBZ Archiv-Sammlungen' : 'ZIP/CBZ Image Archives'}</span>
                <span className="text-zinc-400 font-normal">Archive Plugin</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Direktes Betrachten von ZIP- und Comic-CBZ-Archiven über das optionale Archivformat-Plugin.'
                  : 'Browse ZIP and CBZ image collections directly through the optional archive format plugin.'}
              </div>
            </div>

            {/* 14. Offline QR/barcode reading and text recognition */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Offline QR & Texterkennung' : 'Offline QR & OCR Reader'}</span>
                <span className="text-zinc-400 font-normal">ZXing / Tesseract</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Lokales QR-/Barcode-Lesen und optische Texterkennung (OCR) aus dem Vollbild oder per Rechtsklick-Auswahl, mit entbehrlichen Tools und OCR-Sprachpaketen.'
                  : 'Offline QR/barcode reading and text recognition from the image or a right-clicked selection, with removable tools and OCR languages.'}
              </div>
            </div>

            {/* 15. Separate format & function extensions */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Modulare Erweiterungen' : 'Modular Extensions'}</span>
                <span className="text-zinc-400 font-normal">Custom Folders</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Getrennte Erweiterungen für Bildformate und Funktionen mit frei konfigurierbaren Speicherordnern.'
                  : 'Separate image-format and function extensions, with configurable storage folders.'}
              </div>
            </div>

            {/* 16. Portable mode */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Portabler Modus' : 'Portable Mode'}</span>
                <span className="text-zinc-400 font-normal">Self-contained</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Optionaler portabler Modus für Einstellungen, Profile, Bewertungen und Erweiterungen direkt neben der Anwendung.'
                  : 'Optional portable mode for settings, profiles, ratings and extensions beside the app.'}
              </div>
            </div>

            {/* 17. Multi-language */}
            <div className="py-3.5 grid sm:grid-cols-12 gap-3 items-baseline">
              <div className="sm:col-span-4 font-bold text-white flex items-center justify-between sm:justify-start gap-3">
                <span>{lang === 'de' ? 'Mehrsprachige Oberfläche' : 'Multi-Language UI'}</span>
                <span className="text-zinc-400 font-normal">5 Sprachen</span>
              </div>
              <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                {lang === 'de'
                  ? 'Oberfläche verfügbar in Deutsch, Englisch, Koreanisch, Japanisch und Französisch.'
                  : 'German, English, Korean, Japanese and French interface options.'}
              </div>
            </div>
          </div>

          {/* Footnote status links from README */}
          <div className="mt-4 p-3 bg-[#17181a] border border-[#34373e] text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-3">
            <span>
              {lang === 'de'
                ? 'Format-Support, Testabdeckung und aktuelle Einschränkungen im Repository:'
                : 'Format support, test coverage and remaining limitations in the repository:'}
            </span>
            <div className="flex items-center gap-3 font-semibold text-zinc-200">
              <a href={`${repoUrl}/blob/main/PROJECT_STATUS.md`} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                Project Status ↗
              </a>
              <a href={`${repoUrl}/blob/main/docs/FORMAT_COMPATIBILITY.md`} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                Format Compatibility ↗
              </a>
              <a href={`${repoUrl}/blob/main/docs/QUALITY.md`} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                Quality Checks ↗
              </a>
            </div>
          </div>
        </section>

        {/* FORMATE (Tabular breakdown from README & specs) */}
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
                  <td className="py-3 px-4 font-bold text-white">Archive &amp; Sammlungen</td>
                  <td className="py-3 px-4 text-zinc-300">
                    ZIP, CBZ Bildarchive (über das optionale Archivformat-Plugin)
                  </td>
                  <td className="py-3 px-4 text-zinc-400">Archive Plugin</td>
                </tr>
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-3 px-4 font-bold text-white">HDR, Vector &amp; Spezial</td>
                  <td className="py-3 px-4 text-zinc-300">
                    OpenEXR (.exr), Photoshop (.psd Composite), SVG Vektor (.svg), Targa (.tga), DirectDraw (.dds), Netpbm (.ppm, .pgm), Radiance (.hdr)
                  </td>
                  <td className="py-3 px-4 text-zinc-400">Float 32-Bit / Vektor</td>
                </tr>
                <tr className="hover:bg-[#1a1c20]">
                  <td className="py-3 px-4 font-bold text-white">{lang === 'de' ? 'Metadaten & Profile' : 'Metadata & Profiles'}</td>
                  <td className="py-3 px-4 text-zinc-300">
                    ICC Profile (sRGB, Display P3, AdobeRGB), EXIF, IPTC, XMP Metadaten, mehrseitige Dokumente
                  </td>
                  <td className="py-3 px-4 text-zinc-400">Color Management</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ERKENNUNGSWERKZEUGE (README Recognition tools) */}
        <section id="tools">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Erkennungswerkzeuge (Recognition Tools)' : 'Recognition Tools'}</span>
          </h2>

          <div className="border border-[#34373e] bg-[#161719] p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300 space-y-4">
            <p>
              {lang === 'de'
                ? 'Das Windows-Paket enthält Werkzeuge zur Erkennung von QR-/Barcodes (ZXing-C++) und Texterkennung (Tesseract) mit OCR für Englisch, Deutsch, Französisch, Japanisch und Koreanisch.'
                : 'The Windows package includes QR/barcode reading (ZXing-C++) and text recognition (Tesseract), with English, German, French, Japanese and Korean OCR.'}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#111214] border border-[#2e313a]">
                <span className="font-bold text-white block mb-1">
                  {lang === 'de' ? 'Isolierter Ordner & Ressourcenschonend' : 'Isolated Folder & Resource-Friendly'}
                </span>
                <span className="text-zinc-400 leading-normal block">
                  {lang === 'de'
                    ? 'Die Werkzeuge liegen im Verzeichnis tools neben der Anwendung und laufen nur bei explizitem Aufruf.'
                    : 'Tools live in tools beside the application and run only when invoked.'}
                </span>
              </div>
              <div className="p-3 bg-[#111214] border border-[#2e313a]">
                <span className="font-bold text-white block mb-1">
                  {lang === 'de' ? 'Verwaltung & Pfadkonfiguration' : 'Management & Custom Paths'}
                </span>
                <span className="text-zinc-400 leading-normal block">
                  {lang === 'de'
                    ? 'Einzelne Tools/Sprachen können entfernt oder unter Optionen → Erweiterungen verwalten → Funktionserweiterungen konfiguriert werden.'
                    : 'Remove individual tools/languages or change their folder under Options → Manage extensions → Function extensions.'}
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400">
              {lang === 'de'
                ? 'Erkennungen arbeiten auf dem gesamten Bild oder einer per Rechtsklick gezogenen Auswahl und lassen die Bildpixel unangetastet.'
                : 'They work on the whole image or a selection and leave image pixels unchanged.'}{' '}
              <a
                href={`${repoUrl}/blob/main/docs/TOOL_EXTENSIONS.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline font-semibold"
              >
                {lang === 'de' ? 'Details zu Funktionserweiterungen ↗' : 'Function extensions documentation ↗'}
              </a>
            </p>
          </div>
        </section>

        {/* PORTABLE MODUS (README Portable mode) */}
        <section id="portable">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Portabler Modus' : 'Portable Mode'}</span>
          </h2>

          <div className="border border-[#34373e] bg-[#161719] p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300 space-y-3">
            <p>
              {lang === 'de' ? (
                <>
                  Der portable Modus ist verfügbar unter <strong className="text-white">Optionen → Einstellungen → Speicherorte</strong> und wird nach einem Neustart aktiv.
                </>
              ) : (
                <>
                  Portable mode is available under <strong className="text-white">Options → Settings → Storage locations</strong> and takes effect after restarting.
                </>
              )}
            </p>
            <p>
              {lang === 'de'
                ? 'Bestehende Benutzerdaten werden bei der ersten Aktivierung kopiert und an ihrem ursprünglichen Speicherort beibehalten.'
                : 'Existing user data is copied on first activation and retained in its original location.'}
            </p>
            <div className="p-3 bg-[#101113] border border-[#2a2d35] text-xs font-mono text-zinc-200">
              <span className="text-zinc-400 block mb-1">
                {lang === 'de' ? 'Zusammen mit der Anwendung verschieben:' : 'Move together with the application:'}
              </span>
              <code>portable.mode</code> · <code>IxView-data</code> · <code>tools</code>
            </div>
            <div className="pt-1">
              <a
                href={`${repoUrl}/blob/main/docs/PORTABLE.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline text-xs font-semibold"
              >
                {lang === 'de' ? 'Vollständige Dokumentation zum portablen Modus ↗' : 'Portable mode full documentation ↗'}
              </a>
            </div>
          </div>
        </section>

        {/* STANDARD-BETRACHTER EINRICHTEN (README Use üxzView as default viewer) */}
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
                      ? 'Führe im portablen Anwendungsordner register-windows.bat aus. Das Skript findet uxzView.exe daneben automatisch. Wenn du das Skript woanders ablegst, passe den IXVIEW_EXE Pfad darin an.'
                      : 'Run register-windows.bat in the portable application folder. It finds uxzView.exe beside it automatically. If you keep the script elsewhere, edit the IXVIEW_EXE path inside it.'}
                  </p>
                  <div className="p-3 bg-[#101113] border border-[#2a2d35] text-xs font-mono text-zinc-200">
                    <code>register-windows.bat</code>
                  </div>
                  <p className="text-zinc-400 text-xs">
                    {lang === 'de'
                      ? 'üxzView wird für deinen Benutzer in »Öffnen mit« und unter »Einstellungen → Apps → Standard-Apps« registriert. Windows verlangt, dass du diese finale Zuordnung dort selbst triffst.'
                      : 'üxzView will be registered for your user in "Open with" and "Settings → Apps → Default apps". Windows requires you to make that final choice yourself.'}
                  </p>

                  <div className="pt-2 border-t border-[#262830] space-y-2">
                    <span className="text-xs font-bold text-white block">
                      {lang === 'de'
                        ? 'Alternative: Registry-Datei zum manuellen Prüfen oder Importieren erzeugen:'
                        : 'Alternative: Generate a registry file to inspect or import manually:'}
                    </span>
                    <div className="relative">
                      <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                        {psRegSnippet}
                      </pre>
                      <button
                        type="button"
                        onClick={() => handleCopyText(psRegSnippet, setCopiedPsReg)}
                        className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                      >
                        {copiedPsReg ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                      </button>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-xs">
                    {lang === 'de'
                      ? 'unregister-windows.bat ausführen, um die Registrierung zu entfernen. Beim Verschieben des Ordners einfach neu registrieren. Keine Administratorrechte erforderlich.'
                      : 'Run unregister-windows.bat to remove registration. If you move the folder, register its new location again. No admin rights needed.'}{' '}
                    <a
                      href={`${repoUrl}/blob/main/docs/FILE_ASSOCIATIONS.md`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline font-semibold"
                    >
                      {lang === 'de' ? 'Registrierungs-Details ↗' : 'Registration details ↗'}
                    </a>
                  </p>
                </>
              )}

              {defaultAppTab === 'linux' && (
                <>
                  <p>
                    {lang === 'de'
                      ? 'Installiere üxzView und dessen Desktop-Eintrag gemäß Bauanleitung. Dein Dateimanager kann üxzView dann im »Öffnen mit«-Menü auswählen. Zum Festlegen gängiger Dateizuordnungen im Terminal:'
                      : 'Install üxzView and its desktop entry using the build guide. Your file manager\'s "Open with" menu can then select üxzView. To set common defaults from a terminal:'}
                  </p>
                  <div className="relative">
                    <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                      {xdgMimeSnippet}
                    </pre>
                    <button
                      type="button"
                      onClick={() => handleCopyText(xdgMimeSnippet, setCopiedMime)}
                      className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                    >
                      {copiedMime ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400">
                    <a
                      href={`${repoUrl}/blob/main/docs/PLATFORMS.md`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline font-semibold"
                    >
                      {lang === 'de' ? 'Plattform-Bauanleitung für Linux ↗' : 'Platform build guide for Linux ↗'}
                    </a>
                  </p>
                </>
              )}

              {defaultAppTab === 'macos' && (
                <>
                  <p>
                    {lang === 'de'
                      ? 'Die gebaute uxzView.app in Programme (/Applications) ablegen und einmalig starten. Im Finder Bild markieren → Informationen (Cmd+I) → Öffnen mit → üxzView → "Alle ändern...". Für jedes gewünschte Bildformat wiederholen.'
                      : 'Place the built uxzView.app in Applications and open it once. In Finder, select an image → Get Info (Cmd+I) → Open with → üxzView → "Change All...". Repeat for each image type you want to associate.'}
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* BUILD FROM SOURCE (README Build from source) */}
        <section id="build">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Selbst kompilieren (Build from Source)' : 'Build from Source'}</span>
          </h2>

          <div className="font-mono text-xs">
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
                  href={`${repoUrl}/archive/refs/tags/${version}.tar.gz`}
                  className="text-zinc-300 hover:text-white underline text-xs"
                >
                  üxzView-{version}-source.tar.gz ↗
                </a>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="p-4 sm:p-5 space-y-5 bg-[#161719]">
                {buildPlatform === 'linux' ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-white text-xs">
                          {lang === 'de'
                            ? '1. Abhängigkeiten installieren (C++20-Compiler, CMake 3.24+, Qt 6.8+, libjpeg-turbo, LibRaw):'
                            : '1. Install Dependencies (C++20 compiler, CMake 3.24+, Qt 6.8+, libjpeg-turbo, LibRaw):'}
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
                          onClick={() => handleCopyText(linuxDeps[linuxDistro], setCopiedDep)}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedDep ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-[#262830]">
                      <span className="font-bold text-white text-xs">
                        {lang === 'de' ? '2. Build-Skript ausführen:' : '2. Run build script:'}
                      </span>
                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {linuxScriptSnippet}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopyText(linuxScriptSnippet, setCopiedBuild)}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedBuild ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                      <p className="text-zinc-400 text-xs">
                        {lang === 'de'
                          ? 'Der gemeinsame Quellcode und die Build-Workflows sind für alle drei Systeme vorbereitet; erfolgreiche native Linux-Läufe stehen noch aus.'
                          : 'The shared source code and build workflows are prepared for all three systems; native Linux runs still need validation.'}{' '}
                        <a
                          href={`${repoUrl}/blob/main/docs/PLATFORMS.md`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white underline"
                        >
                          docs/PLATFORMS.md ↗
                        </a>
                      </p>
                    </div>
                  </>
                ) : buildPlatform === 'macos' ? (
                  <>
                    <div className="space-y-2">
                      <span className="font-bold text-white text-xs">
                        {lang === 'de' ? '1. Abhängigkeiten via Homebrew:' : '1. Dependencies via Homebrew:'}
                      </span>
                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {macosDeps}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopyText(macosDeps, setCopiedDep)}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedDep ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-[#262830]">
                      <span className="font-bold text-white text-xs">
                        {lang === 'de' ? '2. Build-Skript ausführen:' : '2. Run build script:'}
                      </span>
                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {macosScriptSnippet}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopyText(macosScriptSnippet, setCopiedBuild)}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedBuild ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                      <p className="text-zinc-400 text-xs">
                        {lang === 'de'
                          ? 'Native macOS-Läufe stehen noch aus. Siehe '
                          : 'Native macOS runs still need validation. See '}{' '}
                        <a
                          href={`${repoUrl}/blob/main/docs/PLATFORMS.md`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white underline"
                        >
                          docs/PLATFORMS.md ↗
                        </a>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <span className="font-bold text-white text-xs">
                        {lang === 'de'
                          ? '1. Voraussetzungen (Python 3.14+, CMake 3.24+, Qt 6.8+, libjpeg-turbo, C++20 Compiler):'
                          : '1. Requirements (Python 3.14+, CMake 3.24+, Qt 6.8+, libjpeg-turbo, C++20 Compiler):'}
                      </span>
                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {windowsDeps}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-[#262830]">
                      <span className="font-bold text-white text-xs">
                        {lang === 'de'
                          ? '2. SDK Bootstrap, Tool-Packs, Build & Deploy:'
                          : '2. SDK bootstrap, tool packs, build & deploy:'}
                      </span>
                      <div className="relative">
                        <pre className="terminal-block overflow-x-auto text-xs font-mono leading-relaxed text-[#f1f2f4]">
                          {windowsBuildSnippet}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopyText(windowsBuildSnippet, setCopiedBuild)}
                          className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] border border-[#444855] text-[11px] font-mono cursor-pointer text-zinc-200 transition-colors"
                        >
                          {copiedBuild ? (lang === 'de' ? 'Kopiert' : 'Copied') : (lang === 'de' ? 'Kopieren' : 'Copy')}
                        </button>
                      </div>
                      <p className="text-zinc-400 text-xs">
                        {lang === 'de'
                          ? 'Deployment baut zusätzlich die kleineren HEIF/AVIF-Bibliotheken aus gepinnten Quellen. Die Quellarchive werden einmalig geladen und lokal gecacht.'
                          : 'Deployment also builds the smaller HEIF/AVIF libraries from pinned sources. Their source archives are downloaded once and cached locally.'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* DOKUMENTATION & QUELLEN (All README References) */}
        <section id="docs">
          <h2 className="section-title">
            <span>{lang === 'de' ? 'Dokumentation & Referenzen' : 'Documentation & References'}</span>
          </h2>

          <div className="border border-[#34373e] bg-[#161719] divide-y divide-[#2a2d35] font-mono text-xs">
            <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
              <span className="sm:col-span-4 text-white font-bold">
                {lang === 'de' ? 'Projektstatus & Qualität' : 'Status & Quality'}
              </span>
              <div className="sm:col-span-8 flex flex-wrap gap-x-4 gap-y-1">
                <a href={`${repoUrl}/blob/main/PROJECT_STATUS.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  PROJECT_STATUS.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/FORMAT_COMPATIBILITY.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/FORMAT_COMPATIBILITY.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/QUALITY.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/QUALITY.md ↗
                </a>
              </div>
            </div>

            <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
              <span className="sm:col-span-4 text-white font-bold">
                {lang === 'de' ? 'Architektur & Module' : 'Architecture & Modules'}
              </span>
              <div className="sm:col-span-8 flex flex-wrap gap-x-4 gap-y-1">
                <a href={`${repoUrl}/blob/main/docs/ARCHITECTURE.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/ARCHITECTURE.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/PORTABLE.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/PORTABLE.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/SETTINGS.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/SETTINGS.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/TOOL_EXTENSIONS.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/TOOL_EXTENSIONS.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/FILE_ASSOCIATIONS.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/FILE_ASSOCIATIONS.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/UI_STYLE.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/UI_STYLE.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/UI_UX_REVIEW_2026-10-29.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/UI_UX_REVIEW_2026-10-29.md ↗
                </a>
              </div>
            </div>

            <div className="p-3 sm:px-4 grid sm:grid-cols-12 gap-2 items-baseline">
              <span className="sm:col-span-4 text-white font-bold">
                {lang === 'de' ? 'Mitwirken & Lizenzen' : 'Contributing & Licenses'}
              </span>
              <div className="sm:col-span-8 flex flex-wrap gap-x-4 gap-y-1">
                <a href={`${repoUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  CONTRIBUTING.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/DEVELOPMENT.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/DEVELOPMENT.md ↗
                </a>
                <a href={`${repoUrl}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  LICENSE (GPL-3.0-or-later) ↗
                </a>
                <a href={`${repoUrl}/blob/main/docs/THIRD_PARTY.md`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline">
                  docs/THIRD_PARTY.md ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ROADMAP & CHANGELOG */}
        <section id="roadmap">
          <h2 className="section-title">
            <span>Roadmap</span>
          </h2>

          <div className="space-y-6 font-mono text-xs sm:text-[13px]">
            {/* Completed Milestones */}
            <div className="border border-[#34373e] overflow-hidden">
              <div className="bg-[#17181a] px-4 py-2.5 border-b border-[#34373e] flex items-center justify-between">
                <span className="font-bold text-white text-xs">
                  {lang === 'de' ? 'Bisherige Meilensteine' : 'Completed Milestones'}
                </span>
                <a
                  href={`${repoUrl}/blob/main/CHANGELOG.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-zinc-400 hover:text-white underline font-mono"
                >
                  CHANGELOG.md ↗
                </a>
              </div>

              <div className="divide-y divide-[#34373e] text-zinc-300">
                <div className="p-4 grid sm:grid-cols-12 gap-3 items-baseline hover:bg-[#1a1c20]">
                  <div className="sm:col-span-4 font-bold text-white">
                    <span>v0.5.0</span>
                    <span className="block text-[11px] text-zinc-400 font-normal">
                      {lang === 'de' ? 'Rahmenloses Canvas & Architektur-Audit' : 'Frameless Canvas & Architecture Audit'}
                    </span>
                  </div>
                  <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                    {lang === 'de'
                      ? 'Rahmenlose Bildanzeige im Fenster- und Vollbildmodus, kompakte Einstellungen in 9 Kategorien, atomare Direktexporte im Batch-Prozessor, Dateilöschung über den nativen System-Papierkorb mit Revisionsprüfung und beschleunigtes klassisches Umbenennen.'
                      : 'Frameless image canvas in window and fullscreen modes, compact settings in 9 categories, direct atomic batch exports, system trash integration with pre-delete revision verification, and accelerated classic batch renaming.'}
                  </div>
                </div>

                <div className="p-4 grid sm:grid-cols-12 gap-3 items-baseline hover:bg-[#1a1c20]">
                  <div className="sm:col-span-4 font-bold text-white">
                    <span>v0.4.5 – v0.4.8</span>
                    <span className="block text-[11px] text-zinc-400 font-normal">
                      {lang === 'de' ? 'Befehlssuche, Service-Architektur & Caching' : 'Command Search, Service Architecture & Caching'}
                    </span>
                  </div>
                  <div className="sm:col-span-8 text-zinc-300 leading-relaxed">
                    {lang === 'de'
                      ? 'Befehlssuche mit Direkt-Caching, DirectoryIndexService mit Abbruchsteuerung, zweistufige Validierung von Speicherzielen vor dem Schreiben, Space/Backspace Bild-Navigation und optimierte Nearest-Neighbor Pufferverwaltung.'
                      : 'Command search with direct row model caching, DirectoryIndexService with cancellation, two-stage pre-encoding save destination validation, Space/Backspace image navigation, and optimized nearest-neighbor buffer allocation.'}
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
              </div>
            </div>

            {/* Upcoming Roadmap */}
            <div className="border border-[#34373e] overflow-hidden">
              <div className="bg-[#17181a] px-4 py-2.5 border-b border-[#34373e] flex items-center justify-between">
                <span className="font-bold text-white text-xs">
                  {lang === 'de' ? 'Ausblick & Nächste Schritte' : 'Upcoming & Next Steps'}
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
              src="assets/logo.jpg"
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
            · GPL-3.0-or-later.
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
