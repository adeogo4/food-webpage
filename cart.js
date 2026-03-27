// Shared cart using localStorage
const Cart = {
  get() {
    return JSON.parse(localStorage.getItem('favspeedycart') || '[]');
  },
  save(cart) {
    localStorage.setItem('favspeedycart', JSON.stringify(cart));
  },
  add(name, price) {
    const cart = this.get();
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    this.save(cart);
    this.updateBadge();
    this.showToast(name);
  },
  total() {
    return this.get().reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },
  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.count();
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  },
  showToast(name) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cart-toast';
      toast.style.cssText = `
        position:fixed; bottom:30px; left:50%; transform:translateX(-50%);
        background:#ff6a00; color:#fff; padding:12px 24px; border-radius:30px;
        font-weight:600; font-size:0.95rem; z-index:999999;
        box-shadow:0 4px 20px rgba(0,0,0,0.3); transition:opacity 0.4s;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = `✅ ${name} added to cart!`;
    toast.style.opacity = '1';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
  }
};

// Run on every page load
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
});
