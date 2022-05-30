export const getOffersByType = (offersСatalog, type) => offersСatalog.find((offer) => offer.type.toLowerCase() === type.toLowerCase());
