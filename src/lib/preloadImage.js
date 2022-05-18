const preloadImage = imageSrc => {
  if (!imageSrc) return null;

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = e => reject(e);
    image.src = imageSrc;
  });
};

export default preloadImage;
