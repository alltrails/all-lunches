const preloadImage = (imageSrc, name, map) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      map.addImage(name, image);
      resolve();
    };
    image.src = imageSrc;
  });

export default preloadImage;
