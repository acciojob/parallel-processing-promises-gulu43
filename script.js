const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${image.url}`);
  });
}

// Function to download all images
function downloadImages() {
  // Clear previous content
  output.innerHTML = "";
  errorDiv.innerHTML = "";
  loadingDiv.style.display = "block";

  const downloadPromises = images.map(downloadImage);

  Promise.all(downloadPromises)
    .then((loadedImages) => {
      loadingDiv.style.display = "none";
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((error) => {
      loadingDiv.style.display = "none";
      errorDiv.innerText = error;
    });
}

// Attach event listener to button
btn.addEventListener("click", downloadImages);
