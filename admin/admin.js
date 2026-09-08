const KEY="shohoj_products_v1";
const ADMIN_SESSION="shohoj_admin_session";
const ADMIN_PIN="2468";

const $=id=>document.getElementById(id);
function products(){return JSON.parse(localStorage.getItem(KEY)||"[]")}
function save(a){localStorage.setItem(KEY,JSON.stringify(a))}

// লগইন ফাংশন এবং ড্যাশবোর্ড শো করা
function login(){
    if($("pin").value===ADMIN_PIN){
        sessionStorage.setItem(ADMIN_SESSION,"1");
        show();
    }else{
        $("err").textContent="PIN সঠিক নয়।";
    }
}

// লগআউট ফাংশন
function logout(){
    sessionStorage.removeItem(ADMIN_SESSION);
    location.reload();
}

function show(){
    loginEl.hidden=true;
    panel.hidden=false;
    render();
}

const loginEl=$("login"),panel=$("panel");

// পেজ লোড হওয়ার সময় যদি অলরেডি লগইন থাকে
if(sessionStorage.getItem(ADMIN_SESSION)){
    show();
}

// প্রোডাক্ট আপলোড ফর্ম সাবমিট হ্যান্ডলার (আইডিগুলো ফিক্স করা হয়েছে)
$("form").addEventListener("submit",async e=>{
    e.preventDefault();
    let file=$("image").files[0];
    let image="";
    
    if(file) {
        image=await new Promise((res,rej)=>{
            let r=new FileReader();
            r.onload=()=>res(r.result);
            r.onerror=rej;
            r.readAsDataURL(file);
        });
    }
    
    let a=products();
    a.unshift({
        id:"p"+Date.now(),
        name:$("name").value,
        category:$("category").value,
        regularPrice:Number($("regular").value), // HTML matching fixed
        discountPrice:Number($("discount").value||0), // HTML matching fixed
        stock:Number($("stock").value),
        description:$("desc").value, // HTML matching fixed
        image
    });
    
    save(a);
    e.target.reset();
    render();
    alert("Product সফলভাবে প্রকাশ হয়েছে!");
    
    // ড্যাশবোর্ড আপডেট রাখতে এবং পাবলিক পেজে ডেটা পাঠাতে রিফ্রেশ
    window.location.reload(); 
});

// প্রোডাক্ট লিস্ট রেন্ডার করা
function render(){
    let a=products();
    $("pc").textContent=a.length;
    $("list").innerHTML=a.map(p=>`<div class="item">${p.image?`<img src="${p.image}" alt="" style="width:80px;height:80px;object-fit:cover;border-radius:10px;">`:"<div style='width:80px;height:80px;background:#eee;border-radius:10px;display:flex;align-items:center;justify-content:center;'>🛍️</div>"}<div><b>${esc(p.name)}</b><div>৳${(p.discountPrice||p.regularPrice).toLocaleString("en-BD")} · Stock: ${p.stock}</div></div><button onclick="del('${p.id}')" style="background:#ff4d4d;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">Delete</button></div>`).join("")||"<p>কোনো product নেই।</p>";
}

// প্রোডাক্ট ডিলিট করা
function del(id){
    if(confirm("এই product মুছে ফেলবেন?")){
        save(products().filter(p=>p.id!==id));
        render();
    }
}

function esc(s){
    return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"'"}[m]));
}
