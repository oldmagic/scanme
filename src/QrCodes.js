// src/QrCodes.js
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import PropTypes from 'prop-types';

const QrCodes = ({ coins }) => {
  const [selectedCoin, setSelectedCoin] = useState(coins[0] || {});
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    // Generate QR code data URL when selected coin changes
    if (selectedCoin.wallet) {
      QRCode.toDataURL(selectedCoin.wallet, { errorCorrectionLevel: 'H' })
        .then(url => setQrUrl(url))
        .catch(err => console.error(err));
    }
  }, [selectedCoin]);

  const handleChange = (e) => {
    const coin = coins.find(c => c.name === e.target.value);
    setSelectedCoin(coin);
  };

  return (
    <div>
      <select onChange={handleChange} value={selectedCoin.name || ''}>
        {coins.map((coin, index) => (
          <option key={index} value={coin.name}>
            {coin.name}
          </option>
        ))}
      </select>

      {qrUrl && (
        <div style={{ marginTop: '20px' }}>
          <img src={qrUrl} alt={`${selectedCoin.name} QR Code`} />
        </div>
      )}
    </div>
  );
};

QrCodes.propTypes = {
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      wallet: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default QrCodes;
