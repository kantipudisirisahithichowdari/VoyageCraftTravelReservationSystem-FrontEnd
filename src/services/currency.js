const formatINR = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

export default formatINR;