// Get DOM elements
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeButton = document.querySelector('.close-button');
const downloadButton = document.getElementById('downloadBtn');
const carouselItems = document.querySelectorAll('.banner .slider .item');

let currentImageSrc = '';
let currentImageAlt = '';

// Add click event listeners to all carousel items
carouselItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const fullSrc = img.getAttribute('data-full-src');
        const alt = img.getAttribute('alt');
        
        openLightbox(fullSrc, alt, index + 1);
    });
    
    // Add hover effect enhancement
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '25';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '';
    });
});

// Function to open lightbox
function openLightbox(imageSrc, imageAlt, imageIndex) {
    currentImageSrc = imageSrc;
    currentImageAlt = imageAlt;
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Show lightbox with fade-in effect
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);
}

// Function to close lightbox
function closeLightbox() {
    lightbox.classList.remove('show');
    
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentImageSrc = '';
        currentImageAlt = '';
    }, 300);
}

// Close button event listener
closeButton.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Download button event listener
downloadButton.addEventListener('click', function() {
    if (currentImageSrc) {
        downloadImage(currentImageSrc, currentImageAlt);
    }
});

// Function to download image
async function downloadImage(imageUrl, imageName) {
    try {
        // Show loading state
        downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        downloadButton.disabled = true;
        
        // Fetch the image
        const response = await fetch(imageUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Generate filename
        const filename = `${imageName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
        link.download = filename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(url);
        
        // Reset button state
        downloadButton.innerHTML = '<i class="fas fa-download"></i> Download Image';
        downloadButton.disabled = false;
        
        // Show success message briefly
        downloadButton.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        setTimeout(() => {
            downloadButton.innerHTML = '<i class="fas fa-download"></i> Download Image';
        }, 2000);
        
    } catch (error) {
        console.error('Download failed:', error);
        
        // Reset button state
        downloadButton.innerHTML = '<i class="fas fa-download"></i> Download Image';
        downloadButton.disabled = false;
        
        // Show error message briefly
        downloadButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Download Failed';
        setTimeout(() => {
            downloadButton.innerHTML = '<i class="fas fa-download"></i> Download Image';
        }, 2000);
        
        // Fallback: open image in new tab
        window.open(currentImageSrc, '_blank');
    }
}

// Keyboard event listeners
document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (currentImageSrc) {
                downloadImage(currentImageSrc, currentImageAlt);
            }
        }
    }
});

// Prevent right-click context menu on images (optional)
carouselItems.forEach(item => {
    const img = item.querySelector('img');
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});

// Add loading states for images
carouselItems.forEach(item => {
    const img = item.querySelector('img');
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        console.error('Failed to load image:', this.src);
        this.style.opacity = '0.5';
    });
});

// Preload full-size images for better performance
function preloadImages() {
    carouselItems.forEach(item => {
        const img = item.querySelector('img');
        const fullSrc = img.getAttribute('data-full-src');
        
        if (fullSrc) {
            const preloadImg = new Image();
            preloadImg.src = fullSrc;
        }
    });
}

// Start preloading after page load
window.addEventListener('load', preloadImages);