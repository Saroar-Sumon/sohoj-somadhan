const WA="8801710441658";
const KEY="shohoj_products_v1";
const starter=[{id:"p1",name:"360° Tap Water Filter",category:"Kitchen",regularPrice:850,discountPrice:650,stock:20,description:"দৈনন্দিন ব্যবহারের জন্য সুবিধাজনক ট্যাপ ওয়াটার ফিল্টার।",image:""}];
let products=JSON.parse(localStorage.getItem(KEY)||"null")||starter;
let cart=JSON.parse(localStorage.getItem("shohoj_cart")||"[]");

function save(){localStorage.setItem(KEY,JSON.stringify(products));localStorage.setItem("shohoj_cart",JSON.stringify(cart))}
function money(n){return "৳"+Number(n||0).toLocaleString("bn-BD")}
function cats(){let c=[...new Set(products.map(p=>p.category).filter(Boolean))];category.innerHTML='<option value="">সব ক্যাটাগরি</option>'+c.map(x=>`<option>${esc(x)}</option>`).join("")}
function renderProducts(){cats();let q=search.value.toLowerCase(), c=category.value, s=sort.value;
 let a=products.filter(p=>(p.name+" "+p.description).toLowerCase().includes(q)&&(!c||p.category===c));
 a.sort((x,y)=>s==="low"?price(x)-price(y):s==="high"?price(y)-price(x):0);
 productGrid.innerHTML=a.map(card).join("");empty.hidden=a.length>0}
function price(p){return Number(p.discountPrice||p.regularPrice||0)}
function card(p){let img=p.image?`<img src="${p.image}" alt="${esc(p.name)}">`:'<div class="placeholder">🛍️</div>';
 return `<article class="card"><div class="pic">${img}</div><div class="card-body"><div class="cat">${esc(p.category||"সাধারণ")}</div><h3>${esc(p.name)}</h3><div><span class="price">${money(price(p))}</span>${p.discountPrice&&p.regularPrice?`<span class="old">${money(p.regularPrice)}</span>`:""}</div><div class="stock">${Number(p.stock)>0?"স্টকে আছে":"স্টক শেষ"}</div><div class="card-actions"><button class="smallbtn details" onclick="details('${p.id}')">বিস্তারিত</button><button class="smallbtn order" ${Number(p.stock)<=0?"disabled":""} onclick="order('${p.id}')">অর্ডার</button></div></div></article>`}
function details(id){let p=products.find(x=>x.id===id);open(`<h2>${esc(p.name)}</h2><p>${esc(p.description||"")}</p><p><b>${money(price(p))}</b></p><button class="btn primary" onclick="order('${p.id}');closeModal()">এখনই অর্ডার করুন</button>`)}
function order(id){let p=products.find(x=>x.id===id);open(`<h2>অর্ডার করুন</h2><p><b>${esc(p.name)}</b> — ${money(price(p))}</p><form class="order-form" onsubmit="sendOrder(event,'${p.id}')"><label>আপনার নাম<input name="name" required></label><label>মোবাইল নম্বর<input name="phone" inputmode="tel" pattern="01[0-9]{9}" placeholder="01XXXXXXXXX" required></label><label>ডেলিভারি ঠিকানা<textarea name="address" rows="3" required></textarea></label><label>পরিমাণ<input name="qty" type="number" min="1" max="${Math.max(1,Number(p.stock))}" value="1" required></label><label>অতিরিক্ত নোট (ঐচ্ছিক)<textarea name="note" rows="2"></textarea></label><div class="summary" id="sum">${summary(p,1)}</div><button class="btn primary" type="submit">WhatsApp-এ অর্ডার করুন</button></form>`)}
function summary(p,q){return `পণ্যের দাম: <b>${money(price(p))}</b><br>পরিমাণ: <b>${q}</b><br>সাবটোটাল: <b>${money(price(p)*q)}</b><br>ডেলিভারি চার্জ: <b>পরবর্তীতে নিশ্চিত করা হবে</b>`}
function sendOrder(e,id){e.preventDefault();let f=new FormData(e.target),p=products.find(x=>x.id===id),q=Number(f.get("qty"));let msg=`🛍️ নতুন অর্ডার — সহজ সমাধান\n\nপণ্য: ${p.name}\nপরিমাণ: ${q}\nদাম: ${money(price(p))}\nসাবটোটাল: ${money(price(p)*q)}\nডেলিভারি চার্জ: পরবর্তীতে নিশ্চিত করা হবে\n\nCustomer Name: ${f.get("name")}\nMobile: ${f.get("phone")}\nAddress: ${f.get("address")}\nNote: ${f.get("note")||"নেই"}`;window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank");}
function openCart(){open("<h2>কার্ট</h2><p>বর্তমানে কার্ট ফিচারটি প্রস্তুত করা হয়নি। সরাসরি Product থেকে অর্ডার করুন।</p>")}
function open(html){modalBody.innerHTML=html;modal.hidden=false}
function closeModal(){modal.hidden=true}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
year.textContent=new Date().getFullYear();renderProducts();