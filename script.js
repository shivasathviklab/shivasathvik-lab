"use strict";

/* =====================================================================
   EDITABLE CONFIGURATION: change values here, the whole page updates.
   Everything below marked SAMPLE is demonstration data, not confirmed
   by the laboratory. Replace it before launch.
   ===================================================================== */
const BUSINESS_INFO = {
  name: "Shiva Sathvik Diagnostic Lab & X-ray Imaging",
  location: "Chikkaballapur, Karnataka, India",
  hours: "Monday–Saturday, 7:00 AM–8:30 PM",
  openFrom: "07:00",
  openTo: "20:30"
};
const PHONE_NUMBER = "9343601092";
const WHATSAPP_NUMBER = "919343601092";   // Digits only with country code. Empty = disabled.
const SETTINGS = {
  reportHours: 24,                                   // SAMPLE target, confirm with lab
  collectionArea: "To be confirmed by the lab",      // REPLACE with real coverage
  collectionHours: "To be confirmed by the lab",     // REPLACE with real timings
  freeCollectionMin: 500                             // SAMPLE bill amount (₹)
};

const CATS = { H:"Haematology", U:"Urine Analysis", S:"Stool Analysis", B:"Bio-chemistry", L:"Lipid Profile", V:"Liver Function", O:"Hormones", R:"Serology", M:"Microbiology" };
const CAT_DESC = { H:"A haematology test.", U:"A urine analysis test.", S:"A stool analysis test.", B:"A bio-chemistry test.", L:"A lipid profile test.", V:"A liver function test.", O:"A hormone or related test.", R:"A serology test.", M:"A microbiology or pathology test." };

// REAL catalogue, transcribed from the lab's displayed price list. Row: [name, category, price in ₹].
// Report time, sample type and fasting rules are not on the list, so the site says "confirm with lab".
const TEST_ROWS = [
  ["HB%","H",100],["RBC Count","H",50],["WBC Count","H",50],["D.C. (Differential Count)","H",50],["ESR","H",50],["AEC (Absolute Eosinophil Count)","H",150],["CBC","H",300],["PCV","H",30],["MCV","H",30],["MCH","H",30],["MCHC","H",30],["BT (Bleeding Time)","H",50],["CT (Clotting Time)","H",50],["Platelet Count","H",150],["PT with INR","H",450],["Reticulocyte Count","H",400],["LE Cell Phenomenon","H",450],["Peripheral Smear","H",300],["Malarial Parasites","H",200],["Blood Group & Rh","H",50],["Dengue NS1, IgM, IgG","H",500],["Pf / Pv (Malaria)","H",250],
  ["Urine Sugar","U",20],["Urine Albumin","U",20],["Urine Microscopy","U",20],["Bile Salt","U",20],["Bile Pigment","U",20],["Ketone Bodies","U",150],["24 Hrs Urine Protein","U",500],["Urobilinogen","U",100],["Bence Jones Protein","U",100],["Pregnancy Test","U",100],
  ["Stool Routine","S",150],["Stool Occult","S",50],["Stool Substances","S",40],
  ["FBS (Fasting Blood Sugar)","B",50],["PPBS (Post-Prandial Blood Sugar)","B",50],["RBS (Random Blood Sugar)","B",50],["GTT (Glucose Tolerance Test)","B",250],["Glycosylated Hb (HbA1c)","B",500],["Urea","B",100],["S. Creatinine","B",100],["Uric Acid","B",150],["RFT (Renal Function Test)","B",300],["S. Calcium","B",200],["CPK","B",300],["CPK-MB","B",400],["Amylase","B",600],["Sodium","B",150],["Potassium","B",150],["Acid Phosphatase","B",350],["CA 125","B",1000],
  ["Lipid Profile","L",400],["Total Cholesterol","L",100],["Triglycerides","L",100],["HDL","L",100],["LDL & VLDL","L",200],
  ["Liver Function Test (LFT)","V",600],["T. Bilirubin","V",100],["D. Bilirubin","V",100],["T. Protein","V",100],["Albumin (Serum)","V",100],["Globulin","V",100],["A/G Ratio","V",100],["SGPT","V",100],["SGOT","V",100],["Alkaline Phosphatase","V",180],
  ["T3, T4, TSH","O",500],["LH / FSH / Prolactin","O",1200],["Testosterone","O",1200],["TORCH","O",2000],["B-HCG","O",800],
  ["Widal","R",100],["VDRL","R",150],["RA Factor","R",150],["HIV","R",250],["CRP","R",150],["ASLO","R",150],["Dilution (each)","R",100],["HBsAg","R",200],["Mantoux","R",150],
  ["Urine (Microbiology)","M",500],["Faeces (Microbiology)","M",500],["Pus (Microbiology)","M",500],["Throat (Microbiology)","M",500],["Swab (Microbiology)","M",500],["Sputum (Microbiology)","M",500],["Sputum for AFB","M",150],["Gram Stain","M",250],["Semen Analysis","M",200],["Blood (Microbiology)","M",650],["Histopathology","M",1000]
];
const POPULAR_TEST_IDS = ["cbc","fbs-fasting-blood-sugar","glycosylated-hb-hba1c","lipid-profile","t3-t4-tsh","liver-function-test-lft","rft-renal-function-test","esr","crp","widal"];

// SAMPLE packages built from the real tests above. The original price is the sum of the test prices;
// "disc" is a SAMPLE discount percentage. Set the real package prices and discounts when confirmed.
const PACKAGES = [
  { name:"Basic Health Check", desc:"A starting set of routine checks.", tests:["CBC","FBS (Fasting Blood Sugar)","Lipid Profile","Urine Sugar","Urine Albumin","Urine Microscopy"], disc:10 },
  { name:"Full Body Checkup", desc:"A wider panel covering several body systems.", tests:["CBC","ESR","FBS (Fasting Blood Sugar)","Glycosylated Hb (HbA1c)","Lipid Profile","Liver Function Test (LFT)","RFT (Renal Function Test)","T3, T4, TSH","Urine Sugar","Urine Albumin","Urine Microscopy"], disc:20, badge:"Most Popular" },
  { name:"Diabetes Care", desc:"Sugar-related checks and kidney markers.", tests:["FBS (Fasting Blood Sugar)","PPBS (Post-Prandial Blood Sugar)","Glycosylated Hb (HbA1c)","Urine Sugar","Urine Albumin","RFT (Renal Function Test)"], disc:10 },
  { name:"Heart Health", desc:"Cholesterol and related heart markers.", tests:["Lipid Profile","CRP","CPK","CPK-MB","FBS (Fasting Blood Sugar)"], disc:10 },
  { name:"Thyroid Profile", desc:"Thyroid hormones with a blood count and lipid check.", tests:["T3, T4, TSH","CBC","Lipid Profile"], disc:10 },
  { name:"Senior Citizen", desc:"A routine panel for older adults.", tests:["CBC","FBS (Fasting Blood Sugar)","Glycosylated Hb (HbA1c)","Lipid Profile","Liver Function Test (LFT)","RFT (Renal Function Test)","S. Calcium","Urine Sugar","Urine Albumin"], disc:15 },
  { name:"Women's Wellness", desc:"Common checks for women's health.", tests:["CBC","ESR","T3, T4, TSH","S. Calcium","Blood Group & Rh","Urine Microscopy"], disc:10 }
];

// SAMPLE offers. Set expires to "YYYY-MM-DD" only when the lab confirms it. Empty = not confirmed.
const OFFERS = [
  { title:"Full Body Checkup discount", desc:"A sample discount on the Full Body Checkup package.", benefit:"20% off", cond:"Package booking only", expires:"" },
  { title:"Free home collection", desc:"Home collection with no collection charge above a minimum bill.", benefit:"No collection charge", cond:"Bills above ₹" + SETTINGS.freeCollectionMin, expires:"" },
  { title:"Senior citizen discount", desc:"A sample discount for patients aged 60 and above.", benefit:"10% off", cond:"Age proof may be needed", expires:"" },
  { title:"Family package discount", desc:"A sample discount when several family members book together.", benefit:"Family rate", cond:"2 or more members", expires:"" },
  { title:"First-booking discount", desc:"A sample welcome discount for new patients.", benefit:"10% off", cond:"New patients only", expires:"" }
];

const REVIEWS = [   // SAMPLE layout content, not real feedback
  "Sample review text to show how a patient comment will look in this card.",
  "Another sample comment. Replace with real, permitted patient feedback.",
  "A third sample entry for the carousel layout.",
  "A fourth sample entry showing a slightly longer comment so you can check wrapping on small screens."
];
const FAQS = [
  ["Do I need to fast before my test?", "Some tests need fasting and many do not. Please confirm the preparation for your test with the lab before you visit."],
  ["How long do test reports take?", "Timing depends on the test. Please confirm the expected report time with the lab."],
  ["Do I need to book to visit the lab?", "No. You can walk in during working hours, Monday to Saturday, 7:00 AM to 8:30 PM. Booking is only needed for home sample collection."],
  ["How do I book home sample collection?", "Select your tests or packages, then tap Book Home Collection. It opens WhatsApp with your list ready to send, and the lab confirms your slot and whether it covers your area."],
  ["What payment methods are accepted?", "Please ask the lab which payment methods it accepts."],
  ["How can I access my report online?", "Your report is shared online, so you do not need to come to the lab to collect it. The lab team confirms how it reaches you when they confirm your slot on WhatsApp."],
  ["How should I prepare for my test?", "Preparation differs by test. Follow the instructions given by your doctor and confirm details with the lab."],
  ["Are discounts or offers available?", "Offers shown here are samples. Ask the lab which offers are currently running."],
  ["Are senior citizen discounts available?", "Please ask the lab whether a senior citizen discount applies to your tests."]
];

/* =====================================================================
   DATA BUILD AND VALIDATION
   ===================================================================== */
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const TESTS = TEST_ROWS.map(([name, c, price]) => ({
  id: slug(name), name, cat: CATS[c], catKey: c, price, desc: CAT_DESC[c]
}));
const TEST_MAP = new Map(TESTS.map((t) => [t.id, t]));
if (TEST_MAP.size !== TESTS.length) console.warn("Duplicate test IDs found.");
PACKAGES.forEach((p) => {
  p.id = "pkg-" + slug(p.name);
  p.testIds = p.tests.map(slug);
  p.testIds.forEach((id) => { if (!TEST_MAP.has(id)) console.warn("Package", p.name, "references unknown test", id); });
  p.orig = p.testIds.reduce((s, id) => s + (TEST_MAP.has(id) ? TEST_MAP.get(id).price : 0), 0);
  p.price = Math.round(p.orig * (1 - p.disc / 100) / 10) * 10;
  p.discount = Math.round((1 - p.price / p.orig) * 100);
});
POPULAR_TEST_IDS.forEach((id) => { if (!TEST_MAP.has(id)) console.warn("Unknown popular test", id); });
const PKG_MAP = new Map(PACKAGES.map((p) => [p.id, p]));
const getItem = (id) => TEST_MAP.get(id) || PKG_MAP.get(id);

/* =====================================================================
   HELPERS
   ===================================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const rupee = (n) => "₹" + n.toLocaleString("en-IN");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Click effects: ripple on buttons, sparks and "+1" on add/claim */
let lastPt = { x: innerWidth / 2, y: innerHeight / 2 };
document.addEventListener("click", (e) => {
  const t = e.target.closest(".btn,.tab,.fab");
  const r = t ? t.getBoundingClientRect() : null;
  lastPt = e.clientX || e.clientY ? { x: e.clientX, y: e.clientY } : r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : lastPt;
  if (!t || reduceMotion) return;
  const d = Math.max(r.width, r.height), s = h("span", "ripple");
  s.style.cssText = "width:" + d + "px;height:" + d + "px;left:" + (lastPt.x - r.left - d / 2) + "px;top:" + (lastPt.y - r.top - d / 2) + "px";
  t.append(s);
  setTimeout(() => s.remove(), 650);
}, true);
function burst(n) {
  if (reduceMotion) return;
  for (let i = 0; i < n; i++) {
    const s = h("span", "spark"), a = (i / n) * Math.PI * 2, d = 34 + (i % 3) * 14;
    s.style.cssText = "left:" + lastPt.x + "px;top:" + lastPt.y + "px;--dx:" + Math.cos(a) * d + "px;--dy:" + Math.sin(a) * d + "px";
    document.body.append(s);
    setTimeout(() => s.remove(), 750);
  }
}
function fxAdd() {
  if (reduceMotion) return;
  burst(8);
  const p = h("span", "plus", "+1");
  p.style.cssText = "left:" + (lastPt.x - 18) + "px;top:" + (lastPt.y - 30) + "px";
  document.body.append(p);
  setTimeout(() => p.remove(), 950);
}
function h(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function btn(label, cls, onClick, aria) {
  const b = h("button", cls, label);
  b.type = "button";
  if (aria) b.setAttribute("aria-label", aria);
  b.addEventListener("click", onClick);
  return b;
}
const phoneDigits = PHONE_NUMBER.replace(/[^\d+]/g, "");
const phoneOk = /^\+?\d{8,15}$/.test(phoneDigits);
const waOk = /^\d{11,15}$/.test(WHATSAPP_NUMBER);

let toastTimer;
function toast(msg, linkText, href) {
  const t = $("#toast");
  t.textContent = msg;
  if (linkText) { const a = h("a", "", linkText); a.href = href; t.append(a); }
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 4000);
}

/* =====================================================================
   STATIC BINDINGS
   ===================================================================== */
(function ticks() {
  const t = $("#ticks");
  for (let i = 0; i < 30; i++) { const s = h("i"); s.style.setProperty("--i", i); if ((i + 1) % 10 === 0) s.className = "big"; t.append(s); }
})();
$("#year").textContent = new Date().getFullYear();
$("#statTests").dataset.count = TESTS.length;
$("#statHours").dataset.count = SETTINGS.reportHours;
$("#areaTxt").textContent = SETTINGS.collectionArea;
$("#collHours").textContent = SETTINGS.collectionHours;
$$("[data-phone]").forEach((a) => {
  if (phoneOk) { a.href = "tel:" + phoneDigits; a.textContent = PHONE_NUMBER; if (a.classList.contains("fab")) a.textContent = "Call"; }
  else { a.textContent = "Phone to be added"; a.removeAttribute("href"); }
});

/* =====================================================================
   OFFERS MARQUEE AND OFFER CARDS
   ===================================================================== */
const MARQUEE = [
  "Trusted Diagnostic Services",
  "Affordable Diagnostic Test Prices",
  "Family Health Checkup Packages",
  "Reports Delivered on WhatsApp",
  "Home Sample Collection Available",
  "Senior Citizen Health Packages"
];
(function marquee() {
  const track = $("#marquee");
  for (let i = 0; i < 2; i++) {
    const g = h("div"); g.style.display = "flex";
    if (i) g.setAttribute("aria-hidden", "true");
    MARQUEE.forEach((t) => g.append(h("span", "", "✦ " + t)));
    track.append(g);
  }
})();
function expiryText(o) {
  if (!o.expires) return "Expiry: to be confirmed";
  const d = new Date(o.expires + "T23:59:59");
  return d < new Date() ? "Expired on " + o.expires : "Valid until " + o.expires;
}
OFFERS.forEach((o, i) => {
  const c = h("article", "card reveal");
  c.style.setProperty("--i", i);
  c.append((() => { const g = h("span", "ico glow", "%"); g.setAttribute("aria-hidden", "true"); return g; })(), h("span", "badge", "Sample promotion"), h("h3", "", o.title), h("p", "", o.desc), h("div", "benefit", o.benefit),
    h("p", "", "Conditions: " + o.cond), h("p", "", expiryText(o)));
  const b = btn("Claim Offer", "btn btn-g", () => {
    burst(12);
    offerNote = "I would like to ask about this offer: " + o.title + ".";
    $("#patientMessage").value = offerNote;
    toast("Select your tests, then tap Book Home Collection.");
    openCart();
  });
  c.append(b);
  $("#offerGrid").append(c);
});

/* =====================================================================
   ENQUIRE: pre-selects a test or package in the enquiry form
   ===================================================================== */
/* =====================================================================
   MY TESTS (basket): pick one or more tests/packages, then Book Home Collection
   opens WhatsApp with the whole list. WhatsApp is never reached with an empty list.
   Repeats and package overlaps are checked with the patient before adding.
   ===================================================================== */
const CART_KEY = "ssdl_my_tests";
let cart = [];   // [{ id, n }]
try {
  cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]")
    .map((x) => (typeof x === "string" ? { id: x, n: 1 } : x))
    .filter((x) => x && getItem(x.id))
    .map((x) => ({ id: x.id, n: Math.min(9, Math.max(1, x.n | 0 || 1)) }));
} catch (e) { cart = []; }
let offerNote = "", flash = null, sumTok = 0, shownSum = 0;
const cartDlg = $("#cartDialog"), askDlg = $("#askDialog");
const find = (id) => cart.find((x) => x.id === id);
const qtyOf = (id) => (find(id) ? find(id).n : 0);
const cartCount = () => cart.reduce((sum, x) => sum + x.n, 0);
const cartTotal = () => cart.reduce((sum, x) => sum + getItem(x.id).price * x.n, 0);
const cartLines = () => cart.map((x, i) => { const it = getItem(x.id); return (i + 1) + ". " + it.name + (it.testIds ? " (package, " + it.tests.length + " tests)" : "") + (x.n > 1 ? " x" + x.n : "") + " - " + rupee(it.price * x.n); });
const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} };
function waLink(text) { return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text); }
function cartMessage() {
  return "Hello " + BUSINESS_INFO.name + ", I would like to book HOME SAMPLE COLLECTION.\n\nTests / packages:\n" + cartLines().join("\n") +
    "\n\nEstimated total: " + rupee(cartTotal()) + " (to be confirmed by the lab)" + (offerNote ? "\n\n" + offerNote : "") +
    "\n\nPlease check availability and confirm a slot. I will share my name, address and preferred date and time here.";
}

/* Cross-check: does this item share tests with something already in the list? */
const testsOf = (it) => it.testIds || [it.id];
function overlapText(id) {
  const it = getItem(id), out = [];
  cart.forEach((x) => {
    if (x.id === id) return;
    const ot = getItem(x.id), shared = testsOf(it).filter((t) => testsOf(ot).includes(t));
    if (!shared.length) return;
    const names = shared.map((t) => TEST_MAP.get(t).name), list = names.slice(0, 3).join(", ") + (names.length > 3 ? " +" + (names.length - 3) + " more" : "");
    if (!it.testIds) out.push(it.name + " is already part of " + ot.name + ".");
    else if (!ot.testIds) out.push(ot.name + " is already in your list and is part of " + it.name + ".");
    else out.push(it.name + " and " + ot.name + " both include " + list + ".");
  });
  return out.join(" ");
}

/* Small question dialog */
function ask(title, msg, actions) {
  $("#askT").textContent = title; $("#askM").textContent = msg;
  const box = $("#askBtns"); box.replaceChildren();
  actions.forEach((a) => box.append(btn(a.label, a.cls, () => { askDlg.close(); if (a.fn) a.fn(); })));
  askDlg.showModal();
}
askDlg.addEventListener("click", (e) => { if (e.target === askDlg) askDlg.close(); });

/* Animations */
function bump(t) {
  if (reduceMotion) return;
  [...$$(".cart-n"), t].filter(Boolean).forEach((e) => { e.classList.remove("bump"); void e.offsetWidth; e.classList.add("bump"); setTimeout(() => e.classList.remove("bump"), 520); });
}
function fly(src) {
  if (reduceMotion) return;
  const target = [".tabbar .tb-book i", "#cartBtn", "#waFab"].map((q) => $(q)).find((e) => e && e.getBoundingClientRect().width > 0);
  if (!target) return;
  const r = src && src.getBoundingClientRect().width ? src.getBoundingClientRect() : { left: lastPt.x, top: lastPt.y, width: 0, height: 0 };
  const t = target.getBoundingClientRect();
  const x0 = r.left + r.width / 2, y0 = r.top + r.height / 2, dx = t.left + t.width / 2 - x0, dy = t.top + t.height / 2 - y0;
  const dot = h("span", "fly", "+");
  dot.style.left = x0 - 16 + "px"; dot.style.top = y0 - 16 + "px";
  document.body.append(dot);
  dot.animate([
    { transform: "translate(0,0) scale(1)", opacity: 1 },
    { transform: "translate(" + dx * 0.5 + "px," + (dy * 0.5 - 70) + "px) scale(1.2)", opacity: 1, offset: 0.5 },
    { transform: "translate(" + dx + "px," + dy + "px) scale(.35)", opacity: 0.5 }
  ], { duration: 700, easing: "cubic-bezier(.5,0,.25,1)" }).onfinish = () => { dot.remove(); bump(target); };
}
function tweenSum(to) {
  const el = $("#ctSum"), tok = ++sumTok;
  if (reduceMotion) { el.textContent = rupee(to); shownSum = to; return; }
  const from = shownSum, t0 = performance.now();
  (function f(now) {
    if (tok !== sumTok) return;
    const p = Math.min((now - t0) / 380, 1);
    el.textContent = rupee(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(f); else shownSum = to;
  })(t0);
}

/* Add / change / remove */
function syncBtn(b) {
  const n = qtyOf(b.dataset.add), on = n > 0, it = getItem(b.dataset.add), was = b.dataset.on;
  b.dataset.on = on ? "1" : "0";
  b.textContent = on ? "✓ Added" + (n > 1 ? " ×" + n : "") : "Add to My Tests";
  b.classList.toggle("added", on);
  b.setAttribute("aria-pressed", String(on));
  if (it) b.setAttribute("aria-label", it.name + (on ? " is in My Tests. Tap to change." : ": add to My Tests"));
  if (was !== undefined && was !== b.dataset.on && !reduceMotion) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
}
function addBtn(id, cls) { const b = btn("", cls, () => onAddTap(id, b)); b.dataset.add = id; syncBtn(b); return b; }
function onAddTap(id, src) {
  const it = getItem(id); if (!it) return;
  if (find(id)) {
    ask("Already in My Tests", it.name + " is already in your list" + (qtyOf(id) > 1 ? " (×" + qtyOf(id) + ")" : "") + ". Is this for another person?", [
      { label: "Add another", cls: "btn btn-p", fn: () => changeQty(id, 1, src) },
      { label: "Remove it", cls: "btn btn-o", fn: () => removeItem(id) },
      { label: "Keep as it is", cls: "link-btn" }
    ]);
    return;
  }
  const ov = overlapText(id);
  if (ov) {
    ask("Please check your list", ov + " Do you still want to add it?", [
      { label: "Yes, add it", cls: "btn btn-p", fn: () => addItem(id, src) },
      { label: "No, don't add", cls: "btn btn-o" }
    ]);
    return;
  }
  addItem(id, src);
}
function addItem(id, src) {
  cart.push({ id, n: 1 }); flash = { id, type: "add" };
  saveCart(); renderCart(); fxAdd(); fly(src);
  toast(getItem(id).name + " added to My Tests.", "View", "#cart");
}
function changeQty(id, d, src) {
  const x = find(id); if (!x) return;
  if (x.n + d < 1) { removeItem(id); return; }
  if (x.n + d > 9) { toast("Maximum 9 of one test per booking."); return; }
  x.n += d; flash = { id, type: "qty" };
  saveCart(); renderCart();
  if (d > 0) { fxAdd(); fly(src); } else bump();
  if (d > 0 && !src) bump();
}
function removeItem(id) {
  const li = cartDlg.open && $('#ctList [data-id="' + id + '"]');
  const done = () => {
    const it = getItem(id);
    cart = cart.filter((x) => x.id !== id); saveCart(); renderCart(); bump();
    if (!cartDlg.open) toast(it.name + " removed from My Tests.");
  };
  if (li && !reduceMotion && li.animate) {
    li.style.overflow = "hidden";
    li.animate([
      { opacity: 1, transform: "none", height: li.offsetHeight + "px" },
      { opacity: 0, transform: "translateX(44px) scale(.95)", height: "0px", paddingTop: "0px", paddingBottom: "0px", borderWidth: "0px" }
    ], { duration: 320, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" }).onfinish = done;
  } else done();
}

function renderCart() {
  const n = cartCount();
  $$(".cart-n").forEach((e) => { e.textContent = n; e.hidden = !n; });
  $$("[data-add]").forEach(syncBtn);
  const list = $("#ctList");
  list.replaceChildren();
  cart.forEach((x) => {
    const it = getItem(x.id), li = h("li", "ct-item"), info = h("div", "ct-info");
    li.dataset.id = x.id;
    if (flash && flash.id === x.id) li.classList.add(flash.type === "add" ? "ct-add" : "ct-pulse");
    info.append(h("b", "", it.name), h("span", "", it.testIds ? "Package · " + it.tests.length + " tests" : it.cat));
    const warn = overlapText(x.id);
    if (warn) info.append(h("p", "ct-warn", "⚠ " + warn));
    const qty = h("div", "ct-qty");
    qty.append(btn("−", "", () => changeQty(x.id, -1), "Decrease quantity of " + it.name), h("span", "", String(x.n)), btn("+", "", () => changeQty(x.id, 1), "Increase quantity of " + it.name));
    const row = h("div", "ct-row2");
    row.append(qty, h("b", "ct-price", rupee(it.price * x.n)));
    li.append(info, btn("×", "ct-rm", () => removeItem(x.id), "Remove " + it.name), row);
    list.append(li);
  });
  $("#ctEmpty").hidden = cart.length > 0;
  $("#ctTotal").hidden = !cart.length;
  tweenSum(cartTotal());
  const go = $("#ctGo"), hint = $("#ctHint");
  if (cart.length && waOk) { go.href = waLink(cartMessage()); go.removeAttribute("aria-disabled"); hint.hidden = true; }
  else {
    go.removeAttribute("href"); go.setAttribute("aria-disabled", "true"); hint.hidden = false;
    hint.textContent = !cart.length ? "Select at least one test or package to continue." : "WhatsApp is not set up yet. Please call " + PHONE_NUMBER + " to book.";
  }
  const fc = $("#formCart");
  fc.replaceChildren();
  if (!cart.length) {
    const add = btn("Select tests", "btn btn-o", () => openCatalogue());
    add.id = "formCartAdd";
    fc.append(h("p", "fc-empty", "No tests selected yet. Choose one or more tests or packages."), add);
  } else {
    const ul = h("ul", "fc-list");
    cart.forEach((x) => {
      const it = getItem(x.id), li = h("li", "fc-chip" + (flash && flash.id === x.id ? " chip-in" : ""));
      li.append(h("span", "", it.name + (x.n > 1 ? " ×" + x.n : "") + " · " + rupee(it.price * x.n)), btn("×", "", () => removeItem(x.id), "Remove " + it.name));
      ul.append(li);
    });
    fc.append(ul, h("p", "fc-total", "Estimated total: " + rupee(cartTotal())), btn("+ Add more tests", "link-btn", () => openCatalogue()));
    const e = $("#e-cart"); if (e) e.textContent = "";
  }
  flash = null;
}
function openCart() { renderCart(); setMenu(false); if (!cartDlg.open) cartDlg.showModal(); }
$("#ctClose").addEventListener("click", () => cartDlg.close());
cartDlg.addEventListener("click", (e) => { if (e.target === cartDlg) cartDlg.close(); });
$("#ctGo").addEventListener("click", (e) => {
  if (e.currentTarget.getAttribute("aria-disabled") === "true") { e.preventDefault(); return; }
  setTimeout(() => cartDlg.close(), 150);
});
["#ctBrowse", "#ctMore"].forEach((q) => $(q).addEventListener("click", () => { cartDlg.close(); openCatalogue(); }));
$("#cartBtn").addEventListener("click", () => openCart());
$("#toast").addEventListener("click", (e) => { if (e.target.closest('a[href="#cart"]')) { e.preventDefault(); openCart(); } });
$$('[data-action="book"]').forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); openCart(); }));
renderCart();

/* =====================================================================
   CARDS: POPULAR TESTS, CATALOGUE, PACKAGES
   ===================================================================== */
let detailId = null;
function openDetail(id) {
  const t = TEST_MAP.get(id);
  detailId = id;
  $("#dTitle").textContent = t.name;
  $("#dDesc").textContent = t.desc;
  const f = $("#dFacts");
  f.replaceChildren();
  [["Category", t.cat], ["Price (lab list)", rupee(t.price)], ["Preparation", "Confirm with lab"], ["Report time", "Confirm with lab"]].forEach(([k, v]) => {
    const d = h("div"); d.append(h("dt", "", k), h("dd", "", v)); f.append(d);
  });
  const da = $("#dAdd"); da.dataset.add = id; syncBtn(da);
  $("#detail").showModal();
}
$("#dAdd").addEventListener("click", () => { $("#detail").close(); onAddTap(detailId); });
$("#dClose").addEventListener("click", () => $("#detail").close());
$("#detail").addEventListener("click", (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); });

POPULAR_TEST_IDS.forEach((id, i) => {
  const t = TEST_MAP.get(id);
  if (!t) return;
  const c = h("article", "card reveal");
  c.style.setProperty("--i", i % 5);
  const meta = h("ul", "meta");
  meta.append(h("li", "", t.cat), h("li", "", "Report time: confirm with lab"));
  const actions = h("div", "card-btns");
  actions.append(addBtn(id, "btn btn-p"));
  c.append(h("span", "ico", t.catKey), (() => { const hh = h("h3"); hh.append(btn(t.name, "link-btn title-link", () => openDetail(id), "View details for " + t.name)); return hh; })(), h("p", "", t.desc), meta, h("div", "price", rupee(t.price)), actions);
  $("#popularGrid").append(c);
});

PACKAGES.forEach((p, i) => {
  const c = h("article", "card reveal" + (p.badge ? " feature" : ""));
  c.style.setProperty("--i", i % 4);
  if (p.badge) c.append(h("span", "badge", p.badge));
  const price = h("div", "price", rupee(p.price));
  price.append(h("s", "", rupee(p.orig)));
  const det = h("details");
  det.append(h("summary", "", "Included tests (" + p.tests.length + ")"));
  const ul = h("ul");
  p.tests.forEach((n) => ul.append(h("li", "", n)));
  det.append(ul);
  c.append(h("h3", "", p.name), h("p", "", p.desc), h("p", "", p.tests.length + " tests included."),
    price, h("span", "tag off", p.discount + "% off (sample)"), det,
    (() => { const a = h("div", "card-btns"); a.append(addBtn(p.id, "btn btn-p")); return a; })());
  $("#pkgGrid").append(c);
});

/* Catalogue: search + category tabs */
const state = { cat: "all", q: "" };
const tabsEl = $("#tabs");
[["all", "All"], ...Object.entries(CATS)].forEach(([key, label]) => {
  const b = h("button", "tab", label);
  b.type = "button"; b.dataset.cat = key;
  b.setAttribute("role", "tab");
  b.setAttribute("aria-selected", key === "all" ? "true" : "false");
  b.setAttribute("aria-controls", "results");
  b.tabIndex = key === "all" ? 0 : -1;
  tabsEl.append(b);
});
function setCat(key) {
  state.cat = key;
  $$(".tab", tabsEl).forEach((b) => {
    const on = b.dataset.cat === key;
    b.setAttribute("aria-selected", String(on));
    b.tabIndex = on ? 0 : -1;
  });
  renderCatalogue();
}
tabsEl.addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (b) setCat(b.dataset.cat); });
tabsEl.addEventListener("keydown", (e) => {
  const tabs = $$(".tab", tabsEl);
  const i = tabs.findIndex((b) => b.getAttribute("aria-selected") === "true");
  let n = -1;
  if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
  else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
  else if (e.key === "Home") n = 0;
  else if (e.key === "End") n = tabs.length - 1;
  if (n < 0) return;
  e.preventDefault();
  setCat(tabs[n].dataset.cat);
  tabs[n].focus();
});
function renderCatalogue() {
  const q = state.q.trim().toLowerCase();
  const list = TESTS.filter((t) => (state.cat === "all" || t.catKey === state.cat) &&
    (!q || (t.name + " " + t.cat).toLowerCase().includes(q)));
  const out = $("#results");
  out.replaceChildren();
  out.style.animation = "none"; void out.offsetWidth; out.style.animation = "";
  $("#count").textContent = list.length + " of " + TESTS.length + " tests shown";
  if (!list.length) {
    out.append(h("div", "empty", "No tests match your search. Try a shorter name, or choose “All” to see every category."));
    return;
  }
  list.forEach((t) => {
    const r = h("article", "row");
    const name = h("div", "name");
    name.append(btn(t.name, "link-btn", () => openDetail(t.id), "View details for " + t.name), h("br"), h("span", "tag", t.cat));
    const meta = h("div", "meta rm");
    meta.append(h("span", "", "Preparation and report time: confirm with lab"));
    name.classList.add("name");
    const price = h("b", "price rp", rupee(t.price));
    const add = addBtn(t.id, "btn btn-o rb");
    r.append(name, meta, price, add);
    out.append(r);
  });
}
$("#q").addEventListener("input", (e) => { state.q = e.target.value; renderCatalogue(); });
/* Open the catalogue dropdown and jump to it, optionally with a search term */
function openCatalogue(term) {
  $("#testsDropdown").open = true;
  if (term != null) { $("#q").value = term; state.q = term; setCat("all"); }
  $("#tests").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}
$$('a[href="#tests"]').forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); openCatalogue(); }));
if (location.hash === "#tests") $("#testsDropdown").open = true;

/* Hero search: live suggestions while typing, Enter goes to the catalogue */
const heroQ = $("#heroQ"), suggest = $("#heroSuggest");
let sugItems = [], sugActive = -1;
function hideSuggest() {
  suggest.hidden = true; sugActive = -1;
  heroQ.setAttribute("aria-expanded", "false");
  heroQ.removeAttribute("aria-activedescendant");
}
function setActive(i) {
  const lis = $$("li[role=option]", suggest);
  lis.forEach((li, n) => li.setAttribute("aria-selected", String(n === i)));
  sugActive = i;
  if (i >= 0) { heroQ.setAttribute("aria-activedescendant", lis[i].id); lis[i].scrollIntoView({ block: "nearest" }); }
  else heroQ.removeAttribute("aria-activedescendant");
}
function pickSuggestion(t) {
  heroQ.value = t.name;
  hideSuggest();
  openCatalogue(t.name);
}
function renderSuggest() {
  const q = heroQ.value.trim().toLowerCase();
  suggest.replaceChildren();
  sugActive = -1;
  if (!q) { hideSuggest(); return; }
  sugItems = TESTS.filter((t) => (t.name + " " + t.cat).toLowerCase().includes(q))
    .sort((a, b) => (b.name.toLowerCase().startsWith(q) - a.name.toLowerCase().startsWith(q)) || a.name.localeCompare(b.name))
    .slice(0, 8);
  if (!sugItems.length) {
    suggest.append(h("li", "sg-none", "No matching tests. Press Enter to browse the full catalogue."));
  }
  sugItems.forEach((t, i) => {
    const li = h("li", "sg-item");
    li.id = "sg-" + i;
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", "false");
    const label = h("span", "sg-name");
    const at = t.name.toLowerCase().indexOf(q);
    if (at >= 0) label.append(t.name.slice(0, at), h("mark", "", t.name.slice(at, at + q.length)), t.name.slice(at + q.length));
    else label.textContent = t.name;
    li.append(label, h("span", "sg-cat", t.cat), h("b", "sg-price", rupee(t.price)));
    li.addEventListener("mousedown", (e) => e.preventDefault());
    li.addEventListener("click", () => pickSuggestion(t));
    suggest.append(li);
  });
  suggest.hidden = false;
  heroQ.setAttribute("aria-expanded", "true");
}
heroQ.addEventListener("input", renderSuggest);
heroQ.addEventListener("focus", () => { if (heroQ.value.trim()) renderSuggest(); });
heroQ.addEventListener("keydown", (e) => {
  const open = !suggest.hidden && sugItems.length;
  if (e.key === "ArrowDown" && open) { e.preventDefault(); setActive((sugActive + 1) % sugItems.length); }
  else if (e.key === "ArrowUp" && open) { e.preventDefault(); setActive((sugActive - 1 + sugItems.length) % sugItems.length); }
  else if (e.key === "Escape" && !suggest.hidden) { e.stopPropagation(); hideSuggest(); }
});
document.addEventListener("click", (e) => { if (!e.target.closest("#heroSearch")) hideSuggest(); });
$("#heroSearch").addEventListener("submit", (e) => {
  e.preventDefault();
  if (sugActive >= 0 && sugItems[sugActive]) { pickSuggestion(sugItems[sugActive]); return; }
  hideSuggest();
  openCatalogue(heroQ.value);
});

/* Popular tests slider: arrows scroll one card at a time */
(function popularSlider() {
  const track = $("#popularGrid"), prev = $("#popPrev"), next = $("#popNext");
  const stepBy = () => { const c = track.firstElementChild; return c ? c.getBoundingClientRect().width + 20 : 300; };
  const sync = () => {
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  prev.addEventListener("click", () => track.scrollBy({ left: -stepBy(), behavior: reduceMotion ? "auto" : "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: stepBy(), behavior: reduceMotion ? "auto" : "smooth" }));
  track.addEventListener("scroll", sync, { passive: true });
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
  });
  window.addEventListener("resize", sync);
  sync();
})();

/* =====================================================================
   REVIEWS CAROUSEL AND FAQ
   ===================================================================== */
REVIEWS.forEach((t, i) => {
  const c = h("article", "card review");
  c.append(h("span", "badge", "Sample review"), h("q", "", t), h("small", "", "Reviewer " + (i + 1)));
  $("#carTrack").append(c);
});
const step = () => $("#carTrack").clientWidth * 0.8;
$("#carPrev").addEventListener("click", () => $("#carTrack").scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }));
$("#carNext").addEventListener("click", () => $("#carTrack").scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }));
$("#carTrack").addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { e.preventDefault(); $("#carNext").click(); }
  if (e.key === "ArrowLeft") { e.preventDefault(); $("#carPrev").click(); }
});

FAQS.forEach(([q, a], i) => {
  const item = h("div", "faq-item");
  const trig = h("button", "faq-q", q);
  trig.type = "button";
  trig.id = "faq-q" + i;
  trig.setAttribute("aria-expanded", "false");
  trig.setAttribute("aria-controls", "faq-p" + i);
  const panel = h("div", "faq-p");
  panel.id = "faq-p" + i;
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-labelledby", trig.id);
  const inner = h("div"); inner.append(h("p", "", a)); panel.append(inner);
  trig.addEventListener("click", () => {
    const open = trig.getAttribute("aria-expanded") === "true";
    trig.setAttribute("aria-expanded", String(!open));
    panel.classList.toggle("open", !open);
  });
  item.append(h("h3", "", ""), panel);
  item.firstChild.append(trig);
  $("#faqList").append(item);
});

/* =====================================================================
   ENQUIRY FORM
   ===================================================================== */
const form = $("#enquiryForm");

const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
$("#prefDate").min = today.toISOString().slice(0, 10);

function goToForm() {
  $("#contact").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  setTimeout(() => $("#patientName").focus({ preventScroll: true }), reduceMotion ? 0 : 600);
}

function setErr(id, msg, field) {
  $("#e-" + id).textContent = msg;
  if (field) field.setAttribute("aria-invalid", msg ? "true" : "false");
}
function validate() {
  let bad = null;
  const name = $("#patientName"), phone = $("#patientPhone"), area = $("#patientArea"), date = $("#prefDate"), time = $("#prefTime");
  const fail = (key, msg, field) => { setErr(key, msg, field); bad = bad || field; };
  setErr("name", "", name); setErr("phone", "", phone); setErr("area", "", area); setErr("date", "", date); setErr("time", "", time);
  setErr("cart", "");
  if (!cart.length) fail("cart", "Select at least one test or package to book.", $("#formCartAdd"));
  if (!name.value.trim()) fail("name", "Enter your name.", name);
  const digits = phone.value.replace(/[\s-]/g, "");
  if (!/^(\+?91)?[6-9]\d{9}$/.test(digits)) fail("phone", "Enter a 10-digit mobile number, with or without +91.", phone);
  if (!area.value.trim()) fail("area", "Enter the address where the sample should be collected.", area);
  if (date.value && new Date(date.value + "T00:00").getDay() === 0) fail("date", "The lab lists Monday–Saturday hours. Please choose another day.", date);
  if (time.value && (time.value < BUSINESS_INFO.openFrom || time.value > BUSINESS_INFO.openTo)) fail("time", "Choose a time between 7:00 AM and 8:30 PM.", time);
  if (bad) bad.focus();
  return !bad;
}
function buildEnquiry() {
  const lines = ["Hello " + BUSINESS_INFO.name + ", I would like to book HOME SAMPLE COLLECTION. Please confirm if a slot is available.", "", "Name: " + $("#patientName").value.trim(), "Phone: " + $("#patientPhone").value.trim(), "Address: " + $("#patientArea").value.trim()];
  lines.push("Tests / packages:", ...cartLines(), "Estimated total: " + rupee(cartTotal()) + " (to be confirmed by the lab)");
  if ($("#prefDate").value) lines.push("Collection date: " + $("#prefDate").value);
  if ($("#prefTime").value) lines.push("Collection time: " + $("#prefTime").value);
  lines.push("Message: " + ($("#patientMessage").value.trim() || "No additional message"));
  return lines.join("\n");
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validate()) return;
  $("#enquiryText").value = buildEnquiry();
  $("#result").hidden = false;
  $("#waBtn").disabled = !waOk;
  $("#waNote").textContent = waOk ? "WhatsApp should have opened with your request ready. Press Send there. If it did not open, use Open WhatsApp." : "WhatsApp is not set up yet. Copy the request and send it by call or message.";
  if (waOk) openWhatsApp();
  $("#resultMsg").focus?.();
  $("#result").scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
});
$("#copyBtn").addEventListener("click", () => {
  const ta = $("#enquiryText");
  const fallback = () => { ta.focus(); ta.select(); $("#waNote").textContent = "Press Ctrl+C (or Copy) to copy the selected text."; };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(ta.value).then(() => { $("#waNote").textContent = "Request copied. Paste it into WhatsApp to send."; }, fallback);
  } else fallback();
});
function openWhatsApp() {
  if (!waOk) { goToForm(); toast("WhatsApp is not set up yet. Prepare and copy your enquiry instead."); return; }
  const text = $("#result").hidden ? "" : $("#enquiryText").value;
  window.open("https://wa.me/" + WHATSAPP_NUMBER + (text ? "?text=" + encodeURIComponent(text) : ""), "_blank", "noopener,noreferrer");
}
$("#waBtn").addEventListener("click", openWhatsApp);
$("#waFab").addEventListener("click", () => openCart());
   // hidden until a WhatsApp number is set

/* =====================================================================
   NAVIGATION, SCROLL EFFECTS AND ANIMATION
   ===================================================================== */
const nav = $("#mainNav"), menuBtn = $("#menuBtn"), scrim = $("#scrim");
function setMenu(open) {
  nav.classList.toggle("open", open);
  scrim.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
scrim.addEventListener("click", () => setMenu(false));
$$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); menuBtn.focus(); } });

// Scroll progress, back-to-top and hero parallax share one rAF-throttled handler
const bar = $("#progress"), toTop = $("#toTop"), heroImg = $("#heroImg"), heroArt = $("#heroArt");
// Hero video: hide the SVG fallback once it plays; respect reduced motion
(function heroVideo() {
  const v = heroImg, fig = v.closest(".hero-photo");
  const on = () => { if (v.currentTime > 0 && !v.paused) fig.classList.add("vid-on"); };
  ["playing", "timeupdate"].forEach((ev) => v.addEventListener(ev, on));
  on();
  if (reduceMotion) { v.removeAttribute("autoplay"); v.removeAttribute("loop"); v.pause(); }
  else v.play?.().catch(() => {});
  document.addEventListener("visibilitychange", () => { if (reduceMotion) return; document.hidden ? v.pause() : v.play?.().catch(() => {}); });
})();
let ticking = false;
function onScroll() {
  const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
  toTop.hidden = y < 700;
  if (!reduceMotion) {
    document.documentElement.style.setProperty("--sy", Math.min(y, 2500));
    if (y < 900) { const t = "translateY(" + (y * 0.12) + "px)"; heroImg.style.transform = t; heroArt.style.transform = t; }
  }
  ticking = false;
}
window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
toTop.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); $("#home").focus?.(); });

// Active nav link
if ("IntersectionObserver" in window) {
  const links = $$(".nav a");
  const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["home", "tests", "packages", "offers", "why", "contact"].forEach((id) => spy.observe($("#" + id)));
}

// Reveal (staggered via --i) and count-up
function countUp(el) {
  const end = Number(el.dataset.count), suffix = el.dataset.suffix || "";
  if (reduceMotion || !end) { el.textContent = end + suffix; return; }
  const start = performance.now(), dur = 1200;
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}
$$(".sec-h").forEach((el) => el.classList.add("reveal"));
$$(".split > div:first-child, .contact-grid > div:first-child").forEach((el) => el.classList.add("fx-left"));
$$(".split > figure, .form-card").forEach((el) => el.classList.add("fx-right"));
$$(".wide-photo, .banner").forEach((el) => el.classList.add("fx-zoom"));
$$(".lab-tile").forEach((el, i) => { el.style.setProperty("--i", i); el.addEventListener("click", () => { el.classList.remove("tap"); void el.offsetWidth; el.classList.add("tap"); }); });
$$("#why .card, .steps li").forEach((el, i) => el.style.setProperty("--i", i % 6));
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver((entries, o) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    o.unobserve(en.target);
  }), { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
  const so = new IntersectionObserver((entries, o) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    $$("[data-count]", en.target).forEach(countUp);
    o.unobserve(en.target);
  }), { threshold: 0.4 });
  so.observe($(".stats"));
  so.observe($(".legacy"));
} else {
  $$(".reveal").forEach((el) => el.classList.add("in"));
  $$("[data-count]").forEach(countUp);
}

/* Hide a photo slot whose file is missing so the instrument art shows through */
$$(".photo img").forEach((img) => {
  const miss = () => img.parentElement.classList.add("nophoto");
  if (img.complete && img.naturalWidth === 0) miss();
  img.addEventListener("error", miss);
});

/* INITIAL RENDER */
renderCatalogue();
/* Premium scroll interactions */
(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const progress = document.getElementById("progress");
  const navLinks = [
    ...document.querySelectorAll("#mainNav a[href^='#']")
  ];

  if (!header) return;

  let ticking = false;

  function updateScrollEffects() {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    header.classList.toggle("scrolled", scrollTop > 12);

    if (progress) {
      const percentage =
        maxScroll > 0 ? scrollTop / maxScroll : 0;

      progress.style.transform =
        `scaleX(${Math.min(1, Math.max(0, percentage))})`;
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateScrollEffects);
    }
  }, { passive: true });

  updateScrollEffects();

  // Highlight the current navigation destination.
  const sections = navLinks
    .map(link => {
      const target = document.querySelector(link.getAttribute("href"));
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visible.length) return;

      const current = sections.find(
        section => section.target === visible[0].target
      );

      if (!current) return;

      navLinks.forEach(link => {
        if (link === current.link) {
          link.classList.add("active");
          link.setAttribute("aria-current", "location");
        } else {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        }
      });
    }, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.25, 0.5]
    });

    sections.forEach(section => observer.observe(section.target));
  }

  // Keep the existing reveal animations, but ensure content
  // remains accessible if IntersectionObserver is unavailable.
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(element => {
      element.classList.add("in");
    });
  }
})();

/* Hero: every 5 seconds the full "30+ years" animation replaces the headline block, then it
   switches back. The search box, buttons and trust line never change. */
(() => {
  const hero = document.getElementById("home");
  const tk = document.getElementById("heroTicks");
  if (!hero || !tk) return;
  for (let i = 0; i < 30; i++) { const s = document.createElement("i"); s.style.setProperty("--i", i); if ((i + 1) % 10 === 0) s.className = "big"; tk.append(s); }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const num = hero.querySelector(".hy-num b");
  const count = () => {
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / 1200, 1);
      num.textContent = Math.round(30 * (1 - Math.pow(1 - p, 3))) + "+";
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  };
  let timer = null;
  const flip = () => { const on = hero.classList.toggle("yrs-on"); if (on) count(); };
  const start = () => { if (!timer) timer = setInterval(flip, 5000); };
  const stop = () => { clearInterval(timer); timer = null; };
  start();
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
})();

/* Mobile app layer: lock scroll behind the menu, highlight the active tab-bar item */
(() => {
  const nav = document.getElementById("mainNav");
  if (nav) new MutationObserver(() => document.documentElement.classList.toggle("no-scroll", nav.classList.contains("open")))
    .observe(nav, { attributes: true, attributeFilter: ["class"] });
  matchMedia("(min-width:901px)").addEventListener?.("change", (e) => { if (e.matches) setMenu(false); });
  const tabs = [...document.querySelectorAll(".tabbar a[data-sec]")];
  if (!tabs.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (en.isIntersecting) tabs.forEach((a) => a.classList.toggle("on", a.dataset.sec === en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  tabs.forEach((a) => { const el = document.getElementById(a.dataset.sec); if (el) io.observe(el); });
})();