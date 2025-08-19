


const name = localStorage.getItem('firstName') || 'John Doe';
const dob = localStorage.getItem('dob') || '01/01/1990';
const email = localStorage.getItem('userEmail') || 'johndoe@gmail.com';
const gender = localStorage.getItem('gender') || 'M';

// Check if data is available
console.log("User Profile Data:", { name, dob, email, gender });
const profile = document.getElementById('pop')
// Function to create and display the profile modal
profile.addEventListener('click', () => {
    // Remove existing profile modal if it exists
    const existingModal = document.getElementById('profileModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Decide the profile image based on gender
    let profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJd42JdHzWNXP6VQQbiNZ3VrzHtDmvYMYQEVEriEi7kCw5Uz06QQtyfQeNoHItvNO0mKQ&usqp=CAU"; // Default image
    if (gender.toLowerCase() === 'm') {
        profileImage = "https://cdn-icons-png.flaticon.com/512/2922/2922506.png"; // Male image
    } else if (gender.toLowerCase() === 'f') {
        profileImage = "https://cdn-icons-png.flaticon.com/512/2922/2922561.png"; // Female image
    }


     const div = document.createElement('div');
div.id = 'profileModal';
div.style.cssText = `
  width: 25%;
  height: 100%;
  background-color: white;
  color: #0f346c;
  position: fixed;
  top: 0;
  font-family: Arial, sans-serif;
  right: 0;
  z-index: 10000;
  overflow-y: auto; /* Enable vertical scrolling */
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
`;

// Add CSS rules to hide scrollbars for different browsers
const style = document.createElement('style');
style.innerHTML = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  #profileModal::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  #profileModal {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;
document.head.appendChild(style);





    // Build appointments HTML
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let appointmentsHTML = '';
    
    if (appointments.length > 0) {
        appointmentsHTML = appointments.map(app => `
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin: 15px 0; background: #f9f9f9;overflow-y:auto;-ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;">
                <div style="display: flex; align-items: center;">
                    <img src="${app.doctorImage}" alt="Doctor" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-right: 15px;">
                    <div>
                        <h3 style="margin: 0 0 5px 0;">${app.doctorName}</h3>
                        <p style="margin: 0; color: #666;">${app.doctorDepartment}</p>
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <p style="margin: 5px 0;"><strong>Date:</strong> ${app.date}</p>
                    <p style="margin: 5px 0;"><strong>Time:</strong> ${app.time}</p>
                    <p style="margin: 5px 0; font-size: 0.9em; color: #888;">
                        Booked on ${new Date(app.bookedAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        `).join('');
    } else {
        appointmentsHTML = '<p>No appointments booked yet.</p>';
    }

    // Create profile modal with appointments section
    div.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;color:orange;display:inline-block;padding-bottom;font-weight:300;border-bottom:1px solid #0f346c">User Information</h2>
        <div style="text-align: center; padding: 20px;">
            <img src="${profileImage}" alt="Profile Image" 
                 style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 3px solid #0f346c;">
        </div>
        <h2 style='font-size:1.5rem;font-weight:100;margin-left:10%';><strong style='font-weight:400;color:orange'>Name:</strong> ${name}</h2>
        <h2 style='font-size:1.5rem;font-weight:100;margin-left:10%';><strong style='font-weight:400;color:orange'>Date of Birth:</strong> ${dob}</h2>
        <h2 style='font-size:1.5rem;font-weight:100;margin-left:10%';><strong style='font-weight:400;color:orange'>Gender:</strong> ${gender}</h2>
        <h2 style='font-size:1.5rem;font-weight:100;margin-left:10%';><strong style='font-weight:400;color:orange'>Email:</strong> ${email}</h2>
        
        <h2 style="text-align: center; margin-top: 30px; margin-bottom: 20px;color:orange;border-bottom:1px solid #0f346c;font-size:1.5rem;font-family:system-ui;font-weight:200;padding-bottom:1px;display:inline-block">My Appointments</h2>
        <div style="margin: 0 10%; max-height: 300px; overflow-y: auto;">
            ${appointmentsHTML}
        </div>
                <h2 style="text-align: center; margin-top: 30px; margin-bottom: 20px;color:orange;border-bottom:1px solid #0f346c;font-size:1.5rem;font-family:system-ui;font-weight:200;padding-bottom:1px;display:inline-block">Lab Tests</h2>
        <div style="margin: 0 10%; max-height: 300px; overflow-y: auto;">
            <p style="text-align: center; color: #666;">No lab tests booked yet.</p>
        </div>

        
        <button id="closeProfile" style="display: block; margin: 20px auto; padding: 10px 20px; background-color: orange; border: none; color: white; border-radius: 5px; font-size: 1rem; cursor: pointer;">Close</button>
    `;

    document.body.appendChild(div);

    // Close button functionality
    document.getElementById('closeProfile').addEventListener('click', () => {
        div.remove();
    });
});
let cart = JSON.parse(localStorage.getItem('medicalCart')) || [];
updateCartBadge();

// Add to cart function
function addToCart(button) {
    const testId = parseInt(button.getAttribute('data-id'));
    const allProducts = [...productdetails, ...productdetails1];
    const product = allProducts.find(p => p.id === testId);
    
    if (!product) {
        console.error('Product not found');
        return;
    }

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === testId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartBadge();
    alert(`${product.name} added to cart!`);
}

// Remove from cart function
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartBadge();
    showCartModal(); // Fixed: Re-render the modal
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('medicalCart', JSON.stringify(cart));
}

// Update cart badge
function updateCartBadge() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 
    }
}

// Show cart modal
function showCartModal() {
    // Remove existing modals
    document.getElementById('cartModal')?.remove();
    document.getElementById('profileModal')?.remove();
    document.getElementById('popup')?.remove();
    document.getElementById('popup1')?.remove();

    const div = document.createElement('div');
    div.id = 'cartModal';
    div.style.cssText = `
        width: 25%;
        height: 100%;
        background-color: white;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 10000;
        overflow-y: auto;
        padding: 20px;
        box-shadow: -2px 0 10px rgba(0,0,0,0.1);
    `;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartContent = cart.length > 0 
        ? cart.map((item, index) => `
            <div style="border-bottom: 1px solid #ddd; padding: 10px; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                    <img src="${item.img}" alt="Product" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #0f346c; margin-right: 10px;">
                    <div>
                        <p><b>${item.name}</b></p>
                        <p>Qty: ${item.quantity}</p>
                        <p style="color: orange; font-weight: bold;">Price: ₹${item.price * item.quantity}</p>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 5px;">Remove</button>
            </div>
        `).join('')
        : '<p>No items in cart</p>';

    div.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px; color: #0f346c;">Your Cart</h2>
        <div style="margin-bottom: 20px; max-height: 70vh; overflow-y: auto;">
            ${cartContent}
        </div>
        <div style="font-weight: bold; font-size: 1.2rem; text-align: right; padding: 10px; border-top: 1px solid #ddd;">
            Total: ₹${total}
        </div>
        <button id="closeCart" style="display: block; margin: 20px auto; padding: 10px 20px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 1rem; cursor: pointer;">Close</button>
        <button id="checkout" style="display: block; margin: 10px auto; padding: 10px 20px; background-color: orange; border: none; color: white; border-radius: 5px; font-size: 1rem; cursor: pointer;" ${cart.length === 0 ? 'disabled' : ''}>Checkout</button>
    `;

    document.body.appendChild(div);

    // Add event listeners to remove buttons
    div.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromCart(index);
        });
    });

    // Close button
    document.getElementById('closeCart').addEventListener('click', () => div.remove());
    
    // Checkout button
    document.getElementById('checkout').addEventListener('click', () => {
    localStorage.setItem('checkoutItems', JSON.stringify(cart));
    let a = JSON.parse(localStorage.getItem('checkoutItems'));
    alert(JSON.stringify(a, null, 2)); // Pretty-print the object
    window.location.href = 'patient_details.html';
});
}

// Initialize cart icon
const cartIcon = document.querySelector('#cart');
if (cartIcon) {
    cartIcon.addEventListener('click', showCartModal);
}

// ====== PRODUCT DETAILS ======


// ====== PRODUCT POPUPS ======
function showProductPopup(product) {
    // Remove existing popups
    document.getElementById('popup')?.remove();
    document.getElementById('popup1')?.remove();

    const popup = document.createElement("div");
    popup.style.cssText = `
        width: 40%;
        height: 50%;
        background-color: white;
        color: #0f346c;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        overflow-y: auto;
    `;

    popup.innerHTML = `
        <span class="close" style="float:right; cursor:pointer;">
            ✖
        </span>
        <h3 style="color:orange;font-weight:400;border-bottom:1px solid #0f346c;display:inline-block">Test Details</h3>
        <div style="display:flex;justify-content:center;margin:20px 0">
            <img src="${product.img}" alt="Test Image" style="width:100px; height:100px; border:2px solid #0f346c; border-radius:50%;">
            <h3 style="margin-left:2rem;margin-top:2rem;font-size:1.8rem;font-weight:200;">${product.name}</h3>
        </div>
        <p><strong style="color:orange">Details:</strong> ${product.details}</p>
        <p style="color:maroon"><strong style='color:orange'>Requirements:</strong> ${product.Requirements}</p>
        <button style="margin-top:20px; padding:10px 20px; background-color:#0f346c; color:white; border:none; border-radius:5px; cursor:pointer;"
                data-id="${product.id}">Add to Cart - ₹${product.price}</button>
        
                
    `;

    document.body.appendChild(popup);

    // Event listeners
    popup.querySelector('.close').addEventListener('click', () => popup.remove());
    popup.querySelector('button').addEventListener('click', function() {
        addToCart(this);
        popup.remove();
    });
}

// Event delegation for product clicks
document.addEventListener('click', function(e) {
    // Blood tests
    if (e.target.closest('.te')) {
        const button = e.target.closest('.te').querySelector('.te-2 button');
        if (button) {
            const testId = parseInt(button.getAttribute('data-id'));
            const product = [...productdetails, ...productdetails1].find(p => p.id === testId);
            if (product) showProductPopup(product);
        }
    }
    // Antigen tests
    else if (e.target.closest('.test-3-1-1')) {
        const button = e.target.closest('.test-3-1-1').querySelector('.test3-2-2 button');
        if (button) {
            const testId = parseInt(button.getAttribute('data-id'));
            const product = [...productdetails, ...productdetails1].find(p => p.id === testId);
            if (product) showProductPopup(product);
        }
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});


// this is use to create the popup for the booking appointements
const doctors = [
    {
        id: 1.1,
        name: "Dr. Brahmanadam",
        experience: 3,
        languages: ["Telugu", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364794/carm1_hi5q6l.png",
        dep:"Cardiologist"
    },
    {
        id: 2.1,
        name: "Dr. Aradhya",
        experience: 9,
        languages: ["Tamil", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364793/carf1_bcrod9.png",
         dep:"Cardiologist"

    },
    {
        id: 3.1,
        name: "Dr. Domini",
        experience: 4,
        languages: ["Hindi", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364793/carf2_jfuurh.png",
         dep:"Cardiologist"
    },
    {
        id: 4.1,
        name: "Dr. Balakrishna",
        experience: 25,
        languages: ["Telugu", "Hindi", "Tamil", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364795/carm2_ruc3yx.png",
         dep:"Cardiologist",
    },
    {
        id: 5.1,
        name: "Dr. Ishaan",
        experience: 3,
        languages: ["Telugu", "English"],
        dep: "Cardiothoracic",
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364793/cardm1_fhopfu.png"
    },
    {
        id: 6.1,
        name: "Dr. Samantha",
        experience: 5,
        languages: ["Hindi", "English"],
        dep: "Cardiothoracic",
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364790/cardf1_dglvor.jpg"
    },
    {
        id: 7.1,
        name: "Dr. Riya",
        experience: 10,
        languages: ["Telugu", "English"],
        dep: "Cardiothoracic",
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364791/cardf2_uke1ri.png"
    },
    {
        id: 8.1,
        name: "Dr. Nagaeshvarao",
        experience: 25,
        languages: ["Telugu", "Hindi", "English"],
        dep: "Cardiothoracic",
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364793/cardm2_lodo6r.png"
    },
    {
        id: 9.1,
        name: "Dr. Mukesh",
        experience: 10,
        languages: ["Hindi", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364802/dem1_i4vxyd.png",
        dep: "Dental",
    },
    {
        id: 10.1,
        name: "Dr. Vaishnavi",
        experience: 9,
        languages: ["Telugu", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364802/def1_x2yxdo.png",
        dep: "Dental",
    },
    {
        id: 11.1,
        name: "Dr. Anjali",
        experience: 4,
        languages: ["Telugu", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364802/def2_zrdbkr.png",
        dep: "Dental",
    },
    {
        id: 12.1,
        name: "Dr. Apparao",
        experience: 25,
        languages: ["Telugu", "Hindi", "Tamil", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364803/dem2_gsagij.png",
        dep: "Dental",
    },
    {
        id: 13.1,
        name: "Dr. James",
        dep: "Dermatology",
        experience: 7,
        languages: ["Telugu", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364806/dermm1_szceb1.png"
    },
    {
        id: 14.1,
        name: "Dr. Lakshmi",
        dep: "Dermatology",
        experience: 5,
        languages: ["Telugu", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364805/dermf1_nekcde.png"
    },
    {
        id: 15,
        name: "Dr. Sushmitha",
        dep: "Dermatology",
        experience: 4,
        languages: ["Hindi", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364805/dermf2_cvk0b4.png"
    },
    {
        id: 16,
        name: "Dr. Subbarao",
        dep: "Dermatology",
        experience: 25,
        languages: ["Telugu", "Hindi", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364806/dermm2_ldbk6v.png"
    },
    
  {
    id: 17,
    "name": "Dr. Rayadu",
    "experience": 6,
    "languages": ["Telugu", "English"],
    "dep": "Gastroenterology",
    "image": "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364831/gasm1_ws1zl0.png"
  },
  {
    "id": 18,
    "name": "Dr. Lalitha",
    "experience": 10,
    "languages": ["Hindi", "English"],
    "dep": "Gastroenterology",
    "image": "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364828/gasf1_bavx7k.png"
  },
  {
    "id": 19,
    "name": "Dr. Sneha",
    "experience": 6,
    "languages": ["Telugu", "English"],
    "dep": "Gastroenterology",
    "image": "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364831/gasf2_v4qabo.png"
  },
  {
    "id": 20,
    "name": "Dr. Ramesh",
    "experience": 21,
    "languages": ["Telugu", "Hindi", "Tamil", "English"],
    "dep": "Gastroenterology",
    "image": "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364831/gasm2_kbt8q8.png"
  },

    {
        id: 21,
        name: "Dr. Sravya",
        experience: 6,
        languages: ["Hindi", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364834/gnycf1_iz52vc.png",
        dep: "Women's Health (Gynecology)"
    },
    {
        id: 22,
        name: "Dr. Rohini",
        experience: 15,
        languages: ["Hindi", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364834/gnycf2_j0psns.jpg",
        dep: "Women's Health (Gynecology)"
    },
    {
        id: 23,
        name: "Dr. Harika",
        experience: 7,
        languages: ["Hindi", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364924/drf10_mwnw21.jpg",
        dep: "Women's Health (Gynecology)"
    },
    {
        id: 24,
        name: "Dr. Nithya",
        experience: 6,
        languages: ["Telugu", "Hindi", "Tamil", "English"],
        image: "dummymasked.svg",
        dep: "Women's Health (Gynecology)"
    },
    {
        id: 25,
        name: "Dr. Christoper",
        experience: 6,
        languages: ["Telugu", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364947/oncm1_p90yna.png",
        dep: "Oncology"
    },
    {
        id: 26,
        name: "Dr. Lakshmi",
        experience: 10,
        languages: ["Hindi", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364946/oncf1_ujlks8.png",
        dep: "Oncology"
    },
    {
        id: 27,
        name: "Dr. Supraja",
        experience: 12,
        languages: ["Telugu", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364946/oncf2_cjpzo3.png",
        dep: "Oncology"
    },
    {
        id: 28,
        name: "Dr. Hamsworth",
        experience: 21,
        languages: ["Telugu", "Hindi", "Tamil", "English"],
        image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364948/oncm2_srpxvc.png",
        dep: "Oncology"
    },{
    id: 29,
    name: "Dr. Raghu",
    experience: 9,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364955/orthm1_ywgmsz.png",
    dep: "Orthopedics"
},
{
    id: 30,
    name: "Dr. Urvasi",
    experience: 12,
    languages: ["Hindi", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364950/orthf1_ynfbl6.png",
    dep: "Orthopedics"
},
{
    id: 31,
    name: "Dr. Sandhya",
    experience: 6,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364963/orthf2_qqcazh.png",
    dep: "Orthopedics"
},
{
    id: 32,
    name: "Dr. Manoj",
    experience: 18,
    languages: ["Telugu", "Hindi", "Tamil", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364957/orthm2_upbnsf.png",
    dep: "Orthopedics"
},
{
    id: "33",
    name: "Dr. Vishnu",
    experience: 11,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364968/pumm1_befaix.png",
    dep: "Pulmonology"
},
{
    id: "34",
    name: "Dr. Jenny",
    experience: 8,
    languages: ["Hindi", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364966/pumf1_iewqoz.png",
    dep: "Pulmonology"
},
{
    id: "35",
    name: "Dr. Saraswathi",
    experience: 6,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364970/pumpf2_cacgmf.png",
    dep: "Pulmonology"
},
{
    id: "36",
    name: "Dr. Krishna",
    experience: 19,
    languages: ["Telugu", "Hindi", "Tamil", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364968/pumm2_klndzc.png",
    dep: "Pulmonology"
},
{
    id: "37",
    name: "Dr. Mohan",
    experience: 9,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364961/perm1_a1nat2.png",
    dep: "Predictive Care"
},
{
    id: "38",
    name: "Dr. Parvathi",
    experience: 10,
    languages: ["Hindi", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364960/perf1_qiz6hz.png",
    dep: "Predictive Care"
},
{
    id: "39",
    name: "Dr. Dhanya",
    experience: 8,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364960/perf2_xtchnh.png",
    dep: "Predictive Care"
},
{
    id: "40",
    name: "Dr. Vamsi",
    experience: 19,
    languages: ["Telugu", "Hindi", "Tamil", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364962/perm2_qayqvy.png",
    dep: "Predictive Care"
},
{
    id: "41",
    name: "Dr. Teja",
    experience: 9,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364941/neum1_j1a5pw.png",
    dep: "Neuroscience"
},
{
    id: "42",
    name: "Dr. Harshitha",
    experience: 10,
    languages: ["Hindi", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364939/neuf1_qzr1lk.png",
    dep: "Neuroscience"
},
{
    id: "43",
    name: "Dr. Bhavika",
    experience: 8,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364940/neuf2_vo1uan.png",
    dep: "Neuroscience"
},
{
    id: "44",
    name: "Dr. Srikar",
    experience: 19,
    languages: ["Telugu", "Hindi", "Tamil", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364945/neum2_vbgkgq.png",
    dep: "Neuroscience"
},
{
    id: "45",
    name: "Dr. Chanikya",
    experience: 9,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364939/nepm1_eze78h.png",
    dep: "Neurology"
},
{
    id: "46",
    name: "Dr. Bhavani",
    experience: 10,
    languages: ["Hindi", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364937/nepf1_wyuvdi.png",
    dep: "Neurology"
},
{
    id: "47",
    name: "Dr. Radha",
    experience: 8,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364937/nepf2_ayfrvj.png",
    dep: "Neurology"
},
{
    id: "48",
    name: "Dr. Rahul",
    experience: 19,
    languages: ["Telugu", "Hindi", "Tamil", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364939/nepm2_uwiqpd.png",
    dep: "Neurology"
},
{
    name: "Dr.Aadi",
    experience: 9,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364996/urm1_gck7yb.png",
    id: 49,
    dep: "Urology"
},
{
    name: "Dr.Sumathi",
    experience: 10,
    languages: ["Hindi", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364984/urf1_mor1rh.png",
    id: 50,
    dep: "Urology"
},
{
    name: "Dr.Meghana",
    experience: 8,
    languages: ["Telugu", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364992/urf2_fvxfu4.png",
    id: 51,
    dep: "Urology"
},
{
    name: "Dr.Balaji",
    experience: 19,
    languages: ["Telugu", "Hindi", "Tamil", "English"],
    image: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742365001/urm2_xaw1gj.png",
    id: 52,
    dep: "Urology"
}

    
    
];

       
 
    

    const docCards = document.querySelectorAll(".d1");
docCards.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});

// for the 2nd department cardio
const docCards1 = document.querySelectorAll(".d2");

docCards1.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});


// it is a function to show the popup for the appointment booking for the 3rd department dental department

const docCards2 = document.querySelectorAll(".d3");
docCards2.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});


const docCards3 = document.querySelectorAll('.d4');
docCards3.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});



// doctors card for gastrology department

const docCards4 = document.querySelectorAll('.d5');
docCards4.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});




// the below code is for the pop and booking appointent funcionlaity for the gynecology department
const docCards5 = document.querySelectorAll('.d6');
docCards5.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});


// the beolow code is belongs to oncology department for booking appointment for patient portal
const docCards6 = document.querySelectorAll('.d7');
docCards6.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});
// the beolow code is used for the orthopedic department to generate the pop ups and bookng appointement
const docCards7 = document.querySelectorAll('.d8');
docCards7.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});


// the below code is for the appointment booking and pop up creation in patient portal for pulmunology care department
const docCards8 = document.querySelectorAll('.d9');
docCards8.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});

// the below code is for the appointment booking and pop up creation in patient portal for prediatic care department
const docCards9 = document.querySelectorAll('.d10');
docCards9.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});

// the below code is for the appointment booking and pop up creation in patient portal for neuroscience department
const docCards10 = document.querySelectorAll('.d11');
docCards10.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});

// the below code is for the appointment booking and pop up creation in patient portal fo rneurology department
const docCards11 = document.querySelectorAll('.d12');
docCards11.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});

// the below code is for the appointment booking and pop up creation in patient portal fo rneurology department
const docCards12 = document.querySelectorAll('.d13');

docCards12.forEach(card => {
    card.addEventListener("click", function () {
        const btn = this.querySelector("button");
        if (!btn) return;

        const docId = btn.getAttribute("id");
        const selectedDoc = doctors.find(doctor => doctor.id == docId);
        if (!selectedDoc) return;

        // Generate next 4 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        // Available time slots
        const timeSlots = [
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "3:00 PM - 4:00 PM",
            "5:00 PM - 6:00 PM"
        ];

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        // Create the pop-up container
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.overflowY = "auto"; 
        popup.style.scrollbarWidth = 'none';
        popup.style.msOverflowStyle = 'none';
        popup.style.WebkitOverflowScrolling = 'touch'
        popup.innerHTML = `
            <span id='close' class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </span>
            <h3>${selectedDoc.dep}</h3>

            <div style='display: flex; margin-bottom: 10px;'>
                <img src='${selectedDoc.image}' alt='Doctor Image' style='width: 260px; height: 260px; border-radius: 50%; object-fit: cover; margin-right: 10px; position:relative; top:-10px; left:2rem'>
                <div style='width:60%; margin-left:5rem; border:1px solid white; text-align:center; margin-top:20px'>
                    <br>
                    <h2>${selectedDoc.name}</h2>
                    <p><strong style="color:orange">Experience:</strong> ${selectedDoc.experience} Years</p>
                    <p><strong style="color:orange">Languages Known:</strong> ${selectedDoc.languages.join(", ")}</p>
                </div>
            </div>

            <h3>Select a Date:</h3>
            <div id="date-container" class="date-container">
                ${dates.map(date => `<div class="date-box" data-date="${date}">${date}</div>`).join('')}
            </div>

            <h3>Select a Time Slot:</h3>
            <div id="time-container" class="time-container"></div>

            <button id="confirm-btn" class="confirm-btn">Confirm Appointment</button>
        `;

        document.body.appendChild(popup);

        let selectedDate = null;
        let selectedTime = null;

        // Handle date selection (unchanged)
        document.querySelectorAll(".date-box").forEach(dateDiv => {
            dateDiv.addEventListener("click", function () {
                document.querySelectorAll(".date-box").forEach(d => d.classList.remove("active"));
                this.classList.add("active");
                selectedDate = this.getAttribute("data-date");

                const timeContainer = document.getElementById("time-container");
                timeContainer.innerHTML = "";

                const isToday = (new Date(selectedDate).toDateString() === today.toDateString());
                const currentHour = today.getHours();

                timeSlots.forEach(slot => {
                    const timeDiv = document.createElement("div");
                    timeDiv.classList.add("time-box");
                    timeDiv.textContent = slot;

                    const [startHour] = slot.split(":")[0].split(" ");
                    if (isToday && parseInt(startHour) <= currentHour) {
                        timeDiv.classList.add("disabled");
                        timeDiv.style.opacity = "0.5";
                    } else {
                        timeDiv.addEventListener("click", function () {
                            document.querySelectorAll(".time-box").forEach(t => t.classList.remove("active"));
                            this.classList.add("active");
                            selectedTime = this.textContent;
                        });
                    }

                    timeContainer.appendChild(timeDiv);
                });
            });
        });

        // Close popup function
        function closePopup() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "";
        }

        // Close popup on clicking the close button
        document.getElementById("close").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // Modified confirm button - now shows patient details form
        document.getElementById("confirm-btn").addEventListener("click", function () {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot!");
                return;
            }

            // Hide the appointment selection content and show patient details form
            popup.innerHTML = `
                <span id='close-details' class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </span>
                <h2 style="text-align: center; color: #0f346c; margin-bottom: 20px;">Patient Details</h2>
                
                <div style="padding: 20px;">
                    <p style="text-align: center; margin-bottom: 20px; color: #666;">
                        <strong>Appointment:</strong> ${selectedDoc.name} on ${selectedDate} at ${selectedTime}
                    </p>
                    
                    <form id="patient-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Patient Name *</label>
                            <input type="text" id="patient-name" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Gender *</label>
                            <select id="patient-gender" required 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="patient-phone" required 
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter 10-digit phone number">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Age *</label>
                            <input type="number" id="patient-age" required min="1" max="120"
                                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"
                                   placeholder="Enter age">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Blood Group</label>
                            <select id="patient-blood-group" 
                                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Address *</label>
                            <textarea id="patient-address" required rows="3"
                                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; resize: vertical;"
                                      placeholder="Enter complete address"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="button" id="back-btn" 
                                    style="flex: 1; padding: 12px; background-color: #ccc; border: none; color: #333; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Back
                            </button>
                            <button type="submit" id="final-confirm-btn" 
                                    style="flex: 2; padding: 12px; background-color: #0f346c; border: none; color: white; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Close button for patient details form
            document.getElementById("close-details").addEventListener("click", closePopup);

            // Back button - return to appointment selection
            document.getElementById("back-btn").addEventListener("click", function() {
                // Recreate the original appointment selection popup
                location.reload(); // Simple way to reset, you can implement a more elegant solution
            });

            // Handle form submission
            document.getElementById("patient-form").addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get patient details
                const patientName = document.getElementById("patient-name").value.trim();
                const patientGender = document.getElementById("patient-gender").value;
                const patientPhone = document.getElementById("patient-phone").value.trim();
                const patientAge = document.getElementById("patient-age").value;
                const patientBloodGroup = document.getElementById("patient-blood-group").value;
                const patientAddress = document.getElementById("patient-address").value.trim();
                
                // Validate phone number
                if (!/^\d{10}$/.test(patientPhone)) {
                    alert("Please enter a valid 10-digit phone number!");
                    return;
                }
                
                // Create comprehensive appointment object with patient details
                const appointment = {
                    doctorName: selectedDoc.name,
                    doctorDepartment: selectedDoc.dep,
                    doctorImage: selectedDoc.image,
                    doctorExperience: selectedDoc.experience,
                    doctorLanguages: selectedDoc.languages,
                    date: selectedDate,
                    time: selectedTime,
                    patientDetails: {
                        name: patientName,
                        gender: patientGender,
                        phone: patientPhone,
                        age: parseInt(patientAge),
                        bloodGroup: patientBloodGroup,
                        address: patientAddress
                    },
                    bookedAt: new Date().toISOString(),
                    appointmentId: Date.now() + Math.random() // Simple unique ID
                };
                
                // Store in local storage
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push(appointment);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Show success message
                alert(`Appointment successfully booked!\n\nPatient: ${patientName}\nDoctor: ${selectedDoc.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                closePopup();
            });
        });
    });
});


     

     

     

     

     

     

     

     
     

     

     

     