import React from "react";

export default function About() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About Our Project</h1>
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src="https://media.infratec.eu/thermography-agriculture-header-plants-individual?mp_enc=YXV0bz1jb21wcmVzcyZmaXQ9bWF4JmZtPXdlYnAmaD00NzAmdz03MDUmbXBfZGlyPTY1MTY3Jm1wX2lkPTE2NjYyNjgzMTYmbXBfZmlsZW5hbWU9dGhlcm1vZ3JhcGh5LWFncmljdWx0dXJlLWhlYWRlci1wbGFudHMtaW5kaXZpZHVhbC5qcGc="
            alt="Plant Health Analysis"
            className="img-fluid rounded border shadow"
            style={{ width: "100%", maxWidth: "450px", height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <p className="lead">
            Our project leverages cutting-edge <strong>thermal imaging technology</strong> and <strong>AI-powered analysis</strong> to assess plant health conditions. By capturing thermal images of plants, our system can detect signs of:
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">🌱 Nutrient deficiencies</li>
            <li className="list-group-item">🔥 Heat and water stress</li>
            <li className="list-group-item">🦠 Early disease detection</li>
            <li className="list-group-item">🌿 Overall plant vitality</li>
          </ul>
          <p className="mt-3">
            Our goal is to help farmers and researchers make **data-driven decisions** to optimize crop health, reduce losses, and improve sustainability. 🌍
          </p>
        </div>
      </div>
    </div>
  );
}
