import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/Bannersmall.css'; // Import a CSS file for styling the banner

const Bannersmall = ({ imageUrl, altText }) => {
  return (
    <div className="small-banner">
      <img src={imageUrl} alt={altText} className="small-banner-image" />
    </div>
  );
};

Bannersmall.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

Bannersmall.defaultProps = {
  altText: 'Banner Image',
};

export default Bannersmall;
