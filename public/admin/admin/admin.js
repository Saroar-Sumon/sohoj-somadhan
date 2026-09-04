const KEY="shohoj_products_v1";const ADMIN_SESSION="shohoj_admin_session";const ADMIN_PIN="2468";
const $=id=>document.getElementById(id);
function products(){return JSON.parse(localStorage.getItem(KEY)||"[]")}
function save(a){localStorage.setItem(KEY,JSON.stringify(a))}
function login(){if($("pin").value===ADMIN_PIN){sessionStorage.setItem(ADMIN_SESSION,"1");show()}else $("err").textContent="PIN সঠিক নয়।"}
function logout(){sessionStorage.removeItem(ADMIN_SESSION);location.reload()}
function show(){loginEl.hidden=true;panel.hidden=false;render()}
const loginEl=$("login"),panel=$("panel");
if(sessionStorage.getItem(ADMIN_SESSION))show();
$("form").addEventListener("submit",async e=>{e.preventDefault();let file=$("image").files[0];let image="";if(file) image=await new Promise((res,rej)=>{let r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)});
let a=products();a.unshift({id:"p"+Date.now(),name:$("name").value,category:$("category").value,regularPrice:Number($("regular").value),discountPrice:Number($("discount").value||0),stock:Number($("stock").value),description:$("desc").value,image});save(a);e.target.reset();render();alert("Product প্রকাশ হয়েছে। Public page refresh করলে দেখা যাবে।")});
function render(){let a=products();$("pc").textContent=a.length;$("list").innerHTML=a.map(p=>`<div class="item">${p.image?`<img src="${p.image}" alt="">`:"<div style='width:80px;height:80px;background:#eee;border-radius:10px'></div>"}<div><b>${esc(p.name)}</b><div>৳${(p.discountPrice||p.regularPrice).toLocaleString("en-BD")} · Stock: ${p.stock}</div></div><button onclick="del('${p.id}')">Delete</button></div>`).join("")||"<p>কোনো product নেই।</p>"}
function del(id){if(confirm("এই product মুছে ফেলবেন?")){save(products().filter(p=>p.id!==id));render()}}
function esc(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}