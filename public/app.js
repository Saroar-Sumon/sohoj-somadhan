const WA = "8801710441658";
const KEY = "shohoj_products_v1";
const starter = [{ id: "p1", name: "360 Tap Water Filter", category: "Kitchen", regularPrice: 850, discountPrice: 650, stock: 20, description: "দৈনন্দিন ব্যবহারের জন্য সুবিধাজনক ট্যাপ ওয়াটার ফিল্টার।" }];
let products = [];
let cart = JSON.parse(localStorage.getItem("shohoj_cart") || "[]");

function save() { localStorage.setItem(KEY, JSON.stringify(products)); localStorage.setItem("shohoj_cart", JSON.stringify(cart)) }
function money(n) { return "৳ " + Number(n || 0).toLocaleString("bn-BD") }
function cats() { let c = [...new Set(products.map(p => p.category).filter(Boolean))]; category.innerHTML = '<option value="">সব ক্যাটাগরি</option>' + c.map(x => `<option>${esc(x)}</option>`).join("") }
function renderProducts()(cats(); let q = search.value.toLowerCase(), c = category.value, s = sort.value; let a = products.filter(p => (p.name + " " + p.description).toLowerCase().includes(q) && (!c || p.category === c)); a.sort((x, y) => s === "low" ? price(x) - price(y) : s === "high" ? price(y) - price(x) : 0); productGrid.innerHTML = a.map(card).join(""); empty.hidden = a.length > 0 }
function price(p) { return Number(p.discountPrice || p.regularPrice || 0) }
function card(p) { let img = p.image ? `<img src="${p.image}" alt="${esc(p.name)}">` : '<div class="placeholder">📸</div>'; return `<article class="card"><div class="pic">${img}</div><div class="card-body"><div class="cat">${esc(p.category || "সাধারণ")}</div><h3>${esc(p.name)}</h3><div><span class="price">${money(price(p))}</span>${p.discountPrice && p.regularPrice ? `<span class="old">${money(p.regularPrice)}</span>` : ""}</div><p class="desc">${esc(p.description || "")}</p><button class="btn" onclick="order('${p.id}')">অর্ডার করুন</button></div></article>` }
function details(id) { let p = products.find(x => x.id === id); open(`<h2 class="${esc(p.name)}"></h2><p>${esc(p.description || "")}</p><p><b>মূল্য:</b> ${money(price(p))}</p><button class="btn" onclick="order('${p.id}');closeModal()">অর্ডার করুন</button>`) }
function order(id) { let p = products.find(x => x.id === id); open(`<h2>অর্ডার ফর্ম: ${esc(p.name)}</h2><p>মূল্য: <b>${money(price(p))}</b></p><form class="order-form" onsubmit="sendOrder(event,'${p.id}')"><input type="text" name="n" placeholder="আপনার নাম" required><input type="text" name="p" placeholder="মোবাইল নম্বর" required><input type="text" name="a" placeholder="পূর্ণ ঠিকানা" required><div class="qty-box"><label>পরিমাণ:</label><input type="number" name="q" value="1" min="1" required></div><button type="submit" class="btn">অর্ডার নিশ্চিত করুন</button></form>`) }
function summary(p, q) { return `নতুন অর্ডার:\nনাম: ${p.n}\nফোন: ${p.p}\nঠিকানা: ${p.a}\nপ্রোডাক্ট: ${p.p_name}\nপরিমাণ: ${q}\nমোট দাম: ${money(p.price * q)}\n\nডেলিভারি চার্জ: ঢাকার ভিতরে ৬০ টাকা, ঢাকার বাইরে ১২০ টাকা। বিস্তারিত নিশ্চিত করার জন্য আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন। ধন্যবাদ।` }
function sendOrder(e, id) { e.preventDefault(); let f = new FormData(e.target), p = products.find(x => x.id === id), q = Number(f.get("qty") || 1); let msg = encodeURIComponent(summary({ n: f.get("n"), p: f.get("p"), a: f.get("a"), p_name: p.name, price: price(p) }, q)); window.open(`https://wa.me{WA}?text=${msg}`, "_blank"); closeModal() }
function openCart() { open("<h2>কার্ট</h2><p>আপনার কার্ট খালি আছে। সরাসরি Product থেকে অর্ডার করুন।</p>") }
function open(html) { modalBody.innerHTML = html; modal.hidden = false }
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
