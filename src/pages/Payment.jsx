import React, { useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import paymentService from '../services/paymentService';
import formatINR from '../services/currency';

const Payment = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Booking data passed from booking page via navigation state or fallback params
  const bookingData = location.state?.booking || {
    bookingId: bookingId,
    packageName: 'Travel Package Reservation',
    totalPrice: 699,
  };

  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null); // 'SUCCESS' | 'FAILED'
  const [errorMessage, setErrorMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handlePayNow = async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      // Payment request payload for Payment microservice
      const paymentPayload = {
        bookingId: String(bookingId),
        amount: bookingData.totalPrice || 699,
        paymentMethod: 'DEMO_PAYMENT',
        paymentStatus: 'COMPLETED',
        paymentDate: new Date().toISOString(),
      };

      const response = await paymentService.processPayment(paymentPayload);

      // Verify backend response status
      const isSuccess =
        response.status === 'SUCCESS' ||
        response.status === 'COMPLETED' ||
        response.paymentStatus === 'SUCCESS' ||
        response.paymentStatus === 'COMPLETED' ||
        response.success === true ||
        response.id ||
        response.paymentId;

      if (isSuccess) {
        setPaymentResult('SUCCESS');
        setTransactionId(
          response.transactionId ||
          response.paymentId ||
          response.id ||
          `TXN-${Math.floor(100000 + Math.random() * 900000)}`
        );
      } else {
        setPaymentResult('FAILED');
        setErrorMessage(response.message || 'Payment was declined by the Payment Service.');
      }
    } catch (err) {
      console.error('Payment execution error:', err);
      setPaymentResult('FAILED');
      setErrorMessage(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card" style={{ maxWidth: '540px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '2.5rem' }}>💳</span>
          <h1 className="form-title" style={{ marginTop: '8px' }}>VoyageCraft Demo Payment</h1>
          <p className="form-subtitle">Complete your transaction to finalize your reservation</p>
        </div>

        {/* Successful Payment Screen */}
        {paymentResult === 'SUCCESS' ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 16px'
            }}>
              ✓
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#065f46', marginBottom: '8px' }}>
              Payment Successful!
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px' }}>
              Your reservation has been confirmed. A receipt has been generated.
            </p>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '24px', textAlign: 'left', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: '#64748b' }}>Booking ID:</span>
                <strong>#{bookingId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: '#64748b' }}>Transaction ID:</span>
                <strong>{transactionId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#64748b' }}>Amount Paid:</span>
                <strong style={{ color: '#0284c7' }}>{formatINR(bookingData.totalPrice)}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/my-bookings" className="btn btn-primary btn-block">
                View My Bookings
              </Link>
              <Link to="/" className="btn btn-outline btn-block">
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Payment Processing Screen */
          <div>
            {paymentResult === 'FAILED' && (
              <div className="alert alert-error" style={{ marginBottom: '20px' }}>
                <div>
                  <strong>Payment Failed:</strong> {errorMessage}
                </div>
              </div>
            )}

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#64748b' }}>Booking Reference:</span>
                <strong style={{ color: '#1e293b' }}>#{bookingId}</strong>
              </div>
              {bookingData.packageName && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#64748b' }}>Package:</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{bookingData.packageName}</span>
                </div>
              )}
              {bookingData.numTravelers && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#64748b' }}>Travelers:</span>
                  <span style={{ fontWeight: 600 }}>{bookingData.numTravelers}</span>
                </div>
              )}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Total Amount:</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284c7' }}>
                  {formatINR(bookingData.totalPrice)}
                </span>
              </div>
            </div>

            <div style={{ backgroundColor: '#e0f2fe', padding: '12px 16px', borderRadius: '6px', fontSize: '0.85rem', color: '#0369a1', marginBottom: '24px' }}>
              💡 <strong>Demo Mode:</strong> Instant simulated payment authorization with live receipt generation and confirmed booking status.
            </div>

            <button
              onClick={handlePayNow}
              className="btn btn-teal btn-lg btn-block"
              disabled={loading}
            >
              {loading ? 'Processing Payment...' : `Pay Now (${formatINR(bookingData.totalPrice)})`}
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link to="/my-bookings" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Cancel and view my bookings
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
