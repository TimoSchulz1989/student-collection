(function () {
  "use strict";
  const C = window.COLLECTION;
  if (!C) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === false) continue;
      if (k === "text") node.textContent = v;
      else if (k === "style") node.style.cssText = v;
      else node.setAttribute(k, v === true ? "" : v);
    }
    [].concat(children).forEach((c) => c && node.append(c));
    return node;
  };
  const euro = (n) => n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const colorName = (key) => (C.colors[key] ? C.colors[key].name : key);

  /* ---------- Allgemeine Texte & Links ---------- */
  $$("[data-order-link]").forEach((a) => {
    a.href = C.orderUrl;
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$("[data-school-name]").forEach((n) => (n.textContent = C.school.name));
  $$("[data-school-long]").forEach((n) => (n.textContent = C.school.long));
  $$("[data-year]").forEach((n) => (n.textContent = C.school.year));
  $$("[data-contact-link]").forEach((a) => (a.href = "mailto:" + C.contact.email));

  /* ---------- Preis-Chips im Hero ---------- */
  const chips = $("[data-price-chips]");
  if (chips) {
    C.products.forEach((p) => {
      chips.append(el("li", {}, [document.createTextNode(p.name + " "), el("strong", { text: euro(p.price) + " €" })]));
    });
    if (C.deadline) {
      const d = new Date(C.deadline + "T23:59:59");
      if (d >= new Date()) {
        chips.append(el("li", { class: "chip-deadline" }, [document.createTextNode("Bestellen bis "), el("strong", { text: d.toLocaleDateString("de-DE", { day: "numeric", month: "numeric", year: "numeric" }) })]));
      }
    }
  }

  /* ---------- Zahlen ---------- */
  const setStat = (key, val) => { const n = $(`[data-stat="${key}"]`); if (n) n.textContent = val; };
  setStat("student-motifs", C.motifs.filter((m) => m.byStudents).length);
  setStat("products", C.products.length);
  setStat("colors", Object.keys(C.colors).length);

  /* ---------- Lightbox ---------- */
  const lb = $("[data-lightbox]");
  const lbImg = $("[data-lightbox-img]");
  const lbCap = $("[data-lightbox-caption]");
  function openLightbox(src, alt, caption) {
    if (!lb) return;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lbCap.textContent = caption || "";
    if (typeof lb.showModal === "function") lb.showModal();
    else lb.setAttribute("open", "");
  }
  if (lb) {
    $("[data-lightbox-close]").addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  }

  /* ---------- Motive ---------- */
  const motifGrid = $("[data-motifs]");
  const motifCards = [];
  if (motifGrid) {
    C.motifs.forEach((m) => {
      const variantKeys = Object.keys(m.variants);
      let current = variantKeys[0];

      const img = el("img", {
        src: m.variants[current],
        alt: `Motiv „${m.title}“ auf ${colorName(current).toLowerCase()}em Hoodie`,
        loading: "lazy",
        width: 800, height: 1200
      });

      const media = el("button", { class: "motif__media", type: "button", "aria-label": `Motiv „${m.title}“ vergrößern` }, [
        img,
        m.byStudents
          ? el("span", { class: "badge", text: "by students" })
          : el("span", { class: "badge badge--special", text: "Sondermotiv" }),
        m.placement ? el("span", { class: "badge badge--placement", text: m.placement }) : null
      ]);
      media.addEventListener("click", () => {
        openLightbox(m.variants[current], img.alt, captionFor(m));
      });

      const artistLine = m.artist
        ? el("p", { class: "motif__artist" }, [document.createTextNode("Design: "), el("strong", { text: m.artist }), document.createTextNode(m.className ? ` · ${m.className}` : "")])
        : m.byStudents
          ? el("p", { class: "motif__artist", text: "Design: Schüler*innen des BSZ" })
          : null;

      const colorsRow = el("div", { class: "motif__colors" }, [el("span", { class: "motif__colors-label", text: variantKeys.length > 1 ? "Ansicht:" : "Abgebildet:" })]);
      if (variantKeys.length === 1) {
        colorsRow.append(el("span", { class: "swatch" }, [
          el("span", { class: "dot", style: `--c:${C.colors[current].hex}`, "aria-hidden": "true" }),
          document.createTextNode(colorName(current))
        ]));
      }
      const dots = variantKeys.length < 2 ? [] : variantKeys.map((key) => {
        const d = el("button", {
          class: "dot", type: "button",
          style: `--c:${C.colors[key].hex}`,
          title: colorName(key),
          "aria-label": `Ansicht in ${colorName(key)}`,
          "aria-pressed": key === current ? "true" : "false"
        });
        d.addEventListener("click", () => {
          current = key;
          img.src = m.variants[key];
          img.alt = `Motiv „${m.title}“ auf ${colorName(key).toLowerCase()}em Hoodie`;
          dots.forEach((x) => x.setAttribute("aria-pressed", x === d ? "true" : "false"));
        });
        return d;
      });
      dots.forEach((d) => colorsRow.append(d));

      const card = el("article", { class: "motif" }, [
        media,
        el("div", { class: "motif__body" }, [
          el("h3", { class: "motif__title", text: m.title }),
          artistLine,
          m.note ? el("p", { class: "motif__note", text: m.note }) : null,
          colorsRow
        ])
      ]);
      card.dataset.colors = variantKeys.join(" ");
      motifCards.push({ card, m, show: (key) => { const d = dots[variantKeys.indexOf(key)]; if (d) d.click(); } });
      motifGrid.append(card);
    });
  }

  function captionFor(m) {
    let c = m.title;
    if (m.artist) c += ` – Design: ${m.artist}${m.className ? " (" + m.className + ")" : ""}`;
    else if (!m.byStudents) c += " – Sondermotiv";
    return c;
  }

  /* ---------- Filter nach gezeigter Farbe ---------- */
  const filters = $("[data-filters]");
  if (filters) {
    const opts = [["alle", "Alle Motive"]].concat(Object.keys(C.colors).map((k) => [k, colorName(k)]));
    const buttons = opts.map(([key, label]) => {
      const b = el("button", { class: "chip", type: "button", "aria-pressed": key === "alle" ? "true" : "false" }, [
        key !== "alle" ? el("span", { class: "dot", style: `--c:${C.colors[key].hex}`, "aria-hidden": "true" }) : null,
        document.createTextNode(label)
      ]);
      b.addEventListener("click", () => {
        buttons.forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
        motifCards.forEach(({ card, m, show }) => {
          const match = key === "alle" || !!m.variants[key];
          card.hidden = !match;
          if (match && key !== "alle") show(key);
        });
      });
      return b;
    });
    buttons.forEach((b) => filters.append(b));
  }

  /* ---------- Artikel ---------- */
  const productGrid = $("[data-products]");
  if (productGrid) {
    C.products.forEach((p) => {
      const swatches = p.colors.map((k) =>
        el("span", { class: "swatch" }, [el("span", { class: "dot", style: `--c:${C.colors[k].hex}`, "aria-hidden": "true" }), document.createTextNode(colorName(k))])
      );
      productGrid.append(
        el("article", { class: "product" }, [
          el("div", { class: "product__top" }, [
            el("h3", { class: "product__name", text: p.name }),
            el("div", { class: "product__price" }, [document.createTextNode(euro(p.price)), el("small", { text: "€" })])
          ]),
          p.details ? el("p", { class: "product__details", text: p.details }) : null,
          el("dl", { class: "product__meta" }, [
            el("div", {}, [el("dt", { text: "Farben" }), el("dd", {}, swatches)]),
            el("div", {}, [el("dt", { text: "Größen" }), el("dd", { text: p.sizes })]),
            el("div", {}, [el("dt", { text: "Motive" }), el("dd", { text: "alle " + C.motifs.length + " zur Auswahl" })])
          ])
        ])
      );
    });
  }

  /* ---------- Lookbook ---------- */
  const look = $("[data-lookbook]");
  if (look && C.lookbook) {
    C.lookbook.forEach((l) => {
      const b = el("button", { type: "button", "aria-label": l.alt + " – vergrößern" }, [el("img", { src: l.src, alt: l.alt, loading: "lazy", width: 800, height: 1200 })]);
      b.addEventListener("click", () => openLightbox(l.src, l.alt, ""));
      look.append(b);
    });
  }

  /* ---------- Ablauf & Frist ---------- */
  const steps = $("[data-steps]");
  if (steps) C.steps.forEach((s) => steps.append(el("li", {}, [el("h3", { text: s.title }), el("p", { text: s.text })])));

  const note = $("[data-deadline-note]");
  if (note && C.deadline) {
    const d = new Date(C.deadline + "T23:59:59");
    const days = Math.ceil((d - new Date()) / 86400000);
    const dateStr = d.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
    note.textContent = days >= 0
      ? `Bestellfrist: ${dateStr}${days <= 30 ? ` – noch ${days} ${days === 1 ? "Tag" : "Tage"}` : ""}`
      : `Die Bestellphase ist seit dem ${dateStr} beendet.`;
  }

  /* ---------- QR-Code (lokal erzeugt) ---------- */
  const qrBox = $("[data-qr]");
  if (qrBox && typeof window.qrcode === "function") {
    const qr = window.qrcode(0, "M");
    qr.addData(C.orderUrl);
    qr.make();
    qrBox.innerHTML = qr.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
  }
})();
