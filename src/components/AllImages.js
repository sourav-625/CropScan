import React, { useState, useEffect } from "react";
import ImageItem from "./Imageitem"; // Importing ImageItem component

export default function AllImages() {
  const [images, setImages] = useState([]);
  const host = "http://localhost:5000"; // Backend URL

  // Fetch images from API when component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${host}/api/images/fetchallimages`);
        const data = await response.json();
        setImages(data); // Store images in state
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${host}/api/images/deleteimage/${id}`, {
        method: "DELETE",
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setImages((prevImages) => prevImages.filter((image) => image._id !== id));
        console.log(result.success); // Log success message
      } else {
        console.error("Error deleting image:", result.error);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  

  // Handle analyze functionality (Modify this as per your analysis logic)
  const handleAnalyze = (id) => {
    console.log(`Analyzing image with ID: ${id}`);
    // Add your analysis logic here
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">All Images from Database</h1>
      <div className="row">
        {images.length > 0 ? (
          images.map((image) => (
            <div className="col-md-4 mb-3" key={image._id}>
              <ImageItem
                imageUrl={`data:${image.type};base64,${image.image}`} // Convert base64 string to image source
                onDelete={() => handleDelete(image._id)}
                onAnalyze={() => handleAnalyze(image._id)}
              />
            </div>
          ))
        ) : (
          <p className="text-center">No images found.</p>
        )}
      </div>
    </div>
  );
}
