import React from 'react';

function ImageItem({ imageUrl, onDelete, onAnalyze }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={imageUrl} alt="Uploaded" className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} />
      <div className="card-body d-flex justify-content-between">
        <button onClick={onDelete} className="btn btn-danger">
          Delete
        </button>
        <button onClick={onAnalyze} className="btn btn-primary">
          Analyze
        </button>
      </div>
    </div>
  );
}

export default ImageItem;
