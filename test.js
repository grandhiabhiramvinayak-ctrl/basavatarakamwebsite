
// ------------------------------
const productdetails = [
   {
        id: 1,
        name: 'CBC (Complete Blood Count) Test',
        details: "A CBC test measures key blood components to assess overall health and detect conditions like anemia, infections, and blood disorders Includes .<br>🔴 RBC Tests – Hemoglobin, Hematocrit, RBC Count, MCV, MCH, MCHC, RDW <br> ⚪ WBC Tests – Total WBC, Neutrophils, Lymphocytes, Monocytes, Eosinophils, <br>Basophils.<br> 🩸 Platelet Tests – Platelet Count, MPV, PDW, PCT, IPF.<br> 🔬 Others – nRBC, Immature Granulocytes, Large Unstained Cells.",
        Requirements: "No fasting required. Blood sample is drawn from a vein. Results help diagnose various health conditions.",
        img: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364796/cbc_gzt24q.webp",
        price: 478,
        originalPrice: 673,
        discount: 25
    },
    {
        id: 2,
        name: 'HbA1c Test (Hemoglobin A1c)',
        details: "Includes:<br>1️⃣ HbA1c (%) – Average blood sugar control.<br> 2️⃣ Estimated Average Glucose (eAG) – Converts HbA1c to an estimated glucose level.<br> 3️⃣ Blood Glucose Level – Checks current sugar levels.",
        Requirements: "No fasting required. Blood sample is drawn from a vein. Results help diagnose diabetes and monitor blood sugar control.",
        img: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364807/Diabetes_tye3mx.webp",
        price: 1000,
        originalPrice: 1033,
        discount: 25
    },
    {
        id: 3,
        name: 'FBS (Fasting Blood Sugar) Test',
        details: "Includes:<br>1️⃣ Fasting Blood Sugar (FBS) – Blood sugar levels after fasting for 8-12 hours.",
        Requirements: "Fasting for 8-12 hours before the test. Blood sample is drawn from a vein. Results help diagnose diabetes and monitor blood sugar levels.",
        img: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364807/Diabetes_tye3mx.webp",
        price: 763,
        originalPrice: 1017,
        discount: 25,
    },
    {
        id: 4,
        name: 'Lipid Profile Test (Heart)',
        details: "Includes:<br>1️⃣ Total Cholesterol – Total cholesterol levels.<br> 2️⃣ HDL Cholesterol – Good cholesterol levels.<br> 3️⃣ LDL Cholesterol – Bad cholesterol levels. <br>4️⃣ Triglycerides – Fatty substances in the blood.",
        Requirements: "Fasting for 9-12 hours before the test. Blood sample is drawn from a vein. Results help diagnose heart diseases and monitor cholesterol levels.",
        img: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364886/Heart_m4yyav.webp",
        price: 1000,
        originalPrice: 1033,
        discount: 25,
    },
    {
        id: 5,
        name: 'LFT (Liver Function Test)',
        details: "Includes:<br>1️⃣ Total Protein – Total protein levels.<br> 2️⃣ Albumin – Albumin levels. <br>3️⃣ Globulin – Globulin levels.<br> <br>4️⃣ A/G Ratio – Albumin to Globulin ratio.<br> 5️⃣ Bilirubin – Bilirubin levels.<br> 6️⃣ SGOT (AST) – Liver enzyme levels.<br> 7️⃣ SGPT (ALT) – Liver enzyme levels.<br> 8️⃣ Alkaline Phosphatase – Liver enzyme levels.",
        Requirements: "No fasting required. Blood sample is drawn from a vein. Results help diagnose liver diseases and monitor liver function.",
        img: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364924/Liver_jgoone.webp",
        price: 1000,
        originalPrice: 1033,
        discount: 25
    },
    {
        id: 6,
        name: 'Lipid Profile Test (Kidney)',
        details: "Includes:<br>1️⃣ Urea – Urea levels.<br> 2️⃣ Creatinine – Creatinine levels.<br> 3️⃣ Uric Acid – Uric acid levels.<br> 4️⃣ BUN – Blood Urea Nitrogen.<br> 5️⃣ eGFR – Estimated Glomerular Filtration Rate.<br> 6️⃣ Sodium – Sodium levels.<br> 7️⃣ Potassium – Potassium levels.<br> 8️⃣ Chloride – Chloride levels.<br> 9️⃣ Calcium – Calcium levels.<br> 1️⃣0️⃣ Phosphorus – Phosphorus levels.<br> 1️⃣1️⃣ Albumin – Albumin levels.<br> 1️⃣2️⃣ Total Protein – Total protein levels.",
        Requirements: "No fasting required. Blood sample is drawn from a vein. Results help diagnose kidney diseases and monitor kidney function.",
        img: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364915/Kidney_rimznp.webp",
        price: 388,
        originalPrice: 517,
        discount: 25
    },
    {
        id: 7,
        name: 'Glucose Fasting & PP Test',
        details: "This test measures blood sugar levels before and after a meal to diagnose diabetes and glucose metabolism disorders. Includes (2 Tests):<br> 1️⃣ Fasting Blood Sugar (FBS) – Measures glucose after 8-12 hours of fasting.<br> 2️⃣ Postprandial Blood Sugar (PPBS) – Measures glucose 2 hours after a meal.",
        Requirements: "Fasting required for FBS. Blood samples are taken twice (before and after a meal).",
        img: "https://res.cloudinary.com/dnevq4wek/image/upload/v1742364801/Default_oqkswb.webp",
        price: 194,
        originalPrice: 258,
        discount: 25
    },
    {
        id: 8,
        name: 'Thyroid Profile (T3, T4, TSH) Test',
        details: "This test evaluates thyroid function to diagnose conditions like hypothyroidism and hyperthyroidism. Includes (4 Tests):<br> 1️⃣ Total Triiodothyronine (T3) – Measures T3 hormone levels.<br> 2️⃣ Total Thyroxine (T4) – Measures T4 hormone levels. <br>3️⃣ Thyroid-Stimulating Hormone (TSH) – Regulates thyroid activity. <br>4️⃣ Free T4 (FT4) – Measures the active form of Thyroxine.",
        Requirements: "No fasting required. Blood sample is drawn from a vein. Results help diagnose thyroid disorders and monitor thyroid function.",
        img: "Thyroid.webp",
        price: 755,
        originalPrice: 1033,
        discount: 25,
    }
];

const productdetails1 = [
  
     {
        id: 9,
        name: 'Dengue Rapid Test',
        details: "The Dengue Rapid Test detects dengue virus antigens in the blood, helping diagnose dengue fever quickly.",
        Requirements: "No fasting required. A blood sample is taken from a vein.",
        img: 'https://res.cloudinary.com/dnevq4wek/image/upload/v1742364796/cbc_gzt24q.webp', 
        price: 1280,
        originalPrice: 1728,
        discount: 25
    },
    {
        id: 10,
        name: 'HIV Test',
        details: "The HIV test detects antibodies or antigens in the blood to check for HIV infection.",
        Requirements: "No fasting required. A blood sample is taken from a vein.",
        img: 'https://res.cloudinary.com/dnevq4wek/image/upload/v1742364796/cbc_gzt24q.webp', 
        price: 963,
        originalPrice: 1150,
        discount: 25
    },
    {
        id: 11,
        name: 'HBsAg Test (Hepatitis B Surface Antigen)',
        details: "The HBsAg test detects the presence of the hepatitis B virus in the blood, helping diagnose hepatitis B infection.",
        Requirements: "No fasting required. A blood sample is taken from a vein.",
        img: 'https://res.cloudinary.com/dnevq4wek/image/upload/v1742364796/cbc_gzt24q.webp', 
        price: 975,
        originalPrice: 1300,
        discount: 25
    },
    {
        id: 12,
        name: 'Widal Test',
        details: "The Widal test is used to diagnose typhoid fever by detecting antibodies against Salmonella bacteria.",
        Requirements: "No fasting required. A blood sample is taken from a vein.",
        img: 'https://res.cloudinary.com/dnevq4wek/image/upload/v1742364796/cbc_gzt24q.webp', 
        price: 399,
        originalPrice: 532,
        discount: 25
    }
];

// ====== PROFILE MODAL ======

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

// ====== UNIFIED CART SYSTEM ======
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
