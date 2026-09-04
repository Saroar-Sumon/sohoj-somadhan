const WA = "8801710441658";
const KEY = "shohoj_products_v1";
const starter = [
  { id: "p1", name: "360 Tap Water Filter", category: "Kitchen", regularPrice: 850, discountPrice: 650, stock: 20 },
  { id: "p2", name: "360° Rotatable Flexible Kitchen Tap Sprayer", category: "Kitchen", regularPrice: 450, discountPrice: 350, stock: 50, image: "images/filter.jpg" }
];
let products = [];
let cart = JSON.parse(localStorage.getItem("shohoj_cart")) || "[]";

function save() { localStorage.setItem(KEY, JSON.stringify(products)); localStorage.setItem("shohoj_cart", JSON.stringify(cart)) }
function money(n) { return "৳ " + Number(n || 0).toLocaleString("bn-BD") }
function cats() { let c = [...new Set(products.map(p => p.category).filter(Boolean))]; category.innerHTML = '<option value="">ক্যাটাগরি</option>' + c.map(c => `<option value="${c}">${c}</option>`).join('') }
function renderProducts(cats) { let q = search.value.toLowerCase(), c = category.value, s = sort.value; let a = products.filter(p => (!q || p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))) && (!c || p.category === c)); if (s === 'low') a.sort((x, y) => price(x) - price(y)); if (s === 'high') a.sort((x, y) => price(y) - price(x)); items.innerHTML = a.map(p => card(p)).join('') || '<p class="placeholder">কোন পণ্য পাওয়া যায়নি।</p>' }
function price(p) { return Number(p.discountPrice || p.regularPrice || 0) }
function card(p) { let img = p.image ? `<img src="${p.image}" alt="${esc(p.name)}">` : '<div class="placeholder">ছবি নেই</div>'; return `<div class="card" onclick="openDetails('${p.id}')">${img}<h3>${esc(p.name)}</h3><p>মূল্য: <b>${money(price(p))}</b> ${p.discountPrice && p.regularPrice ? `<del>${money(p.regularPrice)}</del>` : ''}</p><button onclick="event.stopPropagation(); order('${p.id}')">অর্ডার করুন</button></div>` }
function details(id) { let p = products.find(x => x.id === id); open(`<h2 class="${esc(p.name)}"></h2><p>${esc(p.description || '')}</p>`) }
function order(id) { let p = products.find(x => x.id === id); open(`<h2>অর্ডার ফর্ম: ${esc(p.name)}</h2><p>মূল্য: <b>${money(price(p))}</b></p><form onsubmit="sendOrder(event, '${p.id}')"><input type="text" id="o_name" placeholder="আপনার নাম" required><input type="text" id="o_phone" placeholder="মোবাইল নম্বর" required><input type="text" id="o_address" placeholder="পূর্ণ ঠিকানা" required><button type="submit">অর্ডার নিশ্চিত করুন</button></form>`) }
function summary(p, q) { return `নতুন অর্ডার:\nপণ্য: ${p.name}\nমূল্য: ${money(price(p))}\nপরিমাণ: ${q}\nক্রেতার নাম: ${o_name.value}\nমোবাইল: ${o_phone.value}\nঠিকানা: ${o_address.value}` }
function sendOrder(e, id) { e.preventDefault(); let f = new FormData(e.target), p = products.find(x => x.id === id), q = 1; window.open(`https://wa.me{WA}?text=${encodeURIComponent(summary(p, q))}`) }
function openCart() { open(`<h2>কার্ট</h2><p>আপনার কার্ট খালি আছে।</p>`) }
function openHtml(html) { modalBody.innerHTML = html; modal.hidden = false }
function closeModal() { modal.hidden = true }
function esc(s) { return String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])) }
year.textContent = new Date().getFullYear();

async function fetchLiveProducts() {
    try {
        products = starter;
    } catch (error) {
        products = starter;
        console.error(error);
    }
}

if (typeof cats === 'function') cats();

fetchLiveProducts();
