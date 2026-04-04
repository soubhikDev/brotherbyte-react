import React, { useEffect, useState } from 'react'
import './Payment.css'
import PageHero from '../../Components/PageHeros/PageHero'
import ChickenLolipop from '../../assets/ChickenLolipop.png'
import { useLocation, useNavigate } from 'react-router-dom'

// ── 1. USER DETAILS COMPONENT ──────────────────────────────────────────────
function UserDetails() {
  return (
    <div className="payment-card userDetails">
      <div className="card__header">
        <div className="card__title">
          <div className="card__icon">👤</div>
          <h2>User Details</h2>
        </div>
      </div>

      <div className="card__body">
        {/* First Name */}
        <div className="form-group full-width">
          <label htmlFor="firstName">Name</label>
          <input id="firstName" type="text" placeholder="Rahul Sharma" />
        </div>

        {/* Email */}
        <div className="form-group full-width">
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" placeholder="rahul@example.com" />
        </div>

        {/* Phone */}
        <div className="form-group full-width">
          <label htmlFor="phone">Phone Number</label>
          <div className="phone-input-wrap">
            <select className="country-code">
              <option>🇮🇳 +91</option>
              <option>🇺🇸 +1</option>
              <option>🇬🇧 +44</option>
            </select>
            <input id="phone" type="tel" placeholder="98765 43210" />
          </div>
        </div>

        {/* Address Line 1 */}
        <div className="form-group full-width">
          <label htmlFor="BusNumber">Bus Number (Optional)</label>
          <input id="BusNumber" type="text" placeholder="PB 01K 1234" />
        </div>

        {/* Notes */}
        <div className="form-group full-width">
          <label htmlFor="notes">Order Notes (Optional)</label>
          <textarea
            id="notes"
            placeholder="Special instructions for delivery or order..."
          />
        </div>
      </div>
    </div>
  )
}

// ── 2. ORDER DETAILS COMPONENT ─────────────────────────────────────────────

function OrderDetails({ cartItems, updateQty }) {
  return (
    <div className="payment-card orderDetails">
      <div className="card__header">
        <div className="card__title">
          <div className="card__icon">🛍️</div>
          <h2>Order Details ({cartItems.length} items)</h2>
        </div>
      </div>

      <div className="card__body">
        {cartItems.map(item => (
          <div className="orderItem" key={item.id}>
            <div className="orderItem__img"><img src={item.img} alt={item.name} /></div>

            <div className="orderItem__info">
              <div className="orderItem__name">{item.MenuName}</div>
              <div className="orderItem__meta">
                <span className="orderItem__tag">{item.time}</span>
              </div>
              <div className="orderItem__qty-price">
                {/* <div className="qty-control">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span className="qty-num">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                </div> */}
                <div className="orderItem__price">
                  <span className="price-original">₹{(item.price).toLocaleString()}</span>
                  <span className="price-final">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


// ── 4. ORDER SUMMARY COMPONENT ─────────────────────────────────────────────
const availableCoupons = [
  { code: 'FIRST10', label: '10% OFF', off: 10 },
  { code: 'SAVE200', label: '₹200 OFF', off: 200 },
  { code: 'PREMIUM', label: '15% OFF', off: 15 },
]

function OrderSummary({cartItems}) {
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const discount    = 0
  const gstRate     = 0.05
  const deliveryFee = 0
  const couponDiscount = appliedCoupon
    ? typeof appliedCoupon.off === 'string' && appliedCoupon.off.includes('%')
      ? Math.round((subtotal - discount) * (parseInt(appliedCoupon.off) / 100))
      : appliedCoupon.off
    : 0

  const afterDiscount = subtotal - discount - couponDiscount
  const gstAmount = Math.round(afterDiscount * gstRate)
  const grandTotal = afterDiscount + gstAmount + deliveryFee

  const handleApply = () => {
    const found = availableCoupons.find(c => c.code === couponInput.toUpperCase())
    if (found) {
      setAppliedCoupon(found)
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code. Try FIRST10, SAVE200 or PREMIUM.')
    }
  }

  const handleChipApply = (chip) => {
    setAppliedCoupon(chip)
    setCouponInput(chip.code)
    setCouponError('')
  }

  return (
    <>
      {/* Coupon Card */}
      <div className="payment-card couponSection">
        <div className="card__header">
          <div className="card__title">
            <div className="card__icon">🏷️</div>
            <h2>Coupons & Offers</h2>
          </div>
        </div>

        <div className="card__body">
          {appliedCoupon ? (
            <div className="coupon-applied-banner">
              <div className="check-icon">✓</div>
              <p>"{appliedCoupon.code}" applied — {appliedCoupon.label} saved!</p>
              <span
                className="remove-link"
                onClick={() => { setAppliedCoupon(null); setCouponInput('') }}
              >
                Remove
              </span>
            </div>
          ) : (
            <>
              <div className="coupon-input-wrap">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={e => { setCouponInput(e.target.value); setCouponError('') }}
                />
                <button className="apply-btn" onClick={handleApply}>Apply</button>
              </div>

              {couponError && (
                <p style={{ fontSize: '0.78rem', color: 'var(--accent-red)', marginTop: '-4px' }}>
                  {couponError}
                </p>
              )}

              <div className="coupon-list">
                {availableCoupons.map(c => (
                  <button
                    key={c.code}
                    className="coupon-chip"
                    onClick={() => handleChipApply(c)}
                  >
                    {c.code}
                    <span className="chip-off">{c.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary Card */}
      <div className="payment-card orderSummary">
        <div className="card__header">
          <div className="card__title">
            <div className="card__icon">📋</div>
            <h2>Order Summary</h2>
          </div>
        </div>

        <div className="card__body">
          <div className="summary-row">
            <span className="label">Subtotal ({totalItems} items)</span>
            <span className="value">₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span className="label">Product Discount</span>
            <span className="value discount">− ₹{discount.toLocaleString()}</span>
          </div>

          {appliedCoupon && (
            <div className="summary-row">
              <span className="label">Coupon ({appliedCoupon.code})</span>
              <span className="value discount">− ₹{couponDiscount.toLocaleString()}</span>
            </div>
          )}

          <div className="summary-row">
            <span className="label">
              GST (5%)
              <span className="info-tip">i</span>
            </span>
            <span className="value gst">+ ₹{gstAmount.toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span className="label">Delivery Charges</span>
            <span className="value discount">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-total-row">
            <span className="total-label">Grand Total</span>
            <span className="total-value">₹{grandTotal.toLocaleString()}</span>
          </div>

          {/* Savings Banner */}
          <div className="summary-savings">
            <span>🎉</span>
            <span>
              You're saving ₹{(discount + couponDiscount).toLocaleString()} on this order!
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <div className="pay-btn-wrap">
          <button className="pay-btn">
            {/* <span className="lock-icon">🔒</span> */}
            Pay COD
            <span className="btn-amount">₹{grandTotal.toLocaleString()}</span>
          </button>

          {/* <div className="secure-badges">
            <div className="secure-badge"><span className="s-icon">🔐</span> SSL Secured</div>
            <div className="secure-badge"><span className="s-icon">💳</span> PCI Compliant</div>
            <div className="secure-badge"><span className="s-icon">↩️</span> Easy Returns</div>
          </div> */}
        </div>
      </div>
    </>
  )
}

// ── MAIN PAYMENT PAGE ──────────────────────────────────────────────────────
export default function Payment() {
          useEffect(() => {
            window.scrollTo(0, 0);
          }, []);
    const location = useNavigate();
    const locationData = useLocation()
    const [cartItems, setCartItems] = useState(locationData.state?.cartItems || [])

    const updateQty = (id, delta) => {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
      )
    }

    
    const PageHeroData = {
            title: 'Order Process',
            img: ChickenLolipop
          }
  return (
    <div className="paymentPage">
        <PageHero PageHeroData={PageHeroData} />
        <div className="common_width paymentPageSub">
      {/* Page Header */}
      <div className="paymentPage__header">
        <button className="back-btn" onClick={() => location('/menu')}>←</button>
        <h1>Checkout</h1>
      </div>

      {/* Main Grid */}
      <div className="paymentPage__grid">

        {/* Left Column */}
        <div className="paymentPage__left">
          <UserDetails />
          <OrderDetails  cartItems={cartItems} updateQty={updateQty}/>
          {/* <DeliveryPoints /> */}
        </div>

        {/* Right Column */}
        <div className="paymentPage__right">
          <OrderSummary cartItems={cartItems} />
        </div>

      </div>
      </div>
    </div>
  )
}