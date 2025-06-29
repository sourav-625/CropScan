import React from 'react';
import { ShoppingCart } from "lucide-react";

export default function Rent() {

    const devices = [
        {
          id: 1,
          name: "Thermal Imaging Camera",
          price: "Rs 500/day",
          image: "https://dam-assets.fluke.com/s3fs-public/F-ti480-pro-Fluke-Connect_03b_h_0.jpg",
        },
        {
          id: 2,
          name: "Drone",
          price: "Rs 1000/day",
          image: "https://static.vecteezy.com/system/resources/previews/049/514/997/non_2x/aerial-drone-with-camera-hovering-in-clear-blue-sky-during-daytime-cut-out-transparent-png.png",
        },
        {
          id: 3,
          name: "Samsung Galaxy Tab S8",
          price: "$25/day",
          image: "https://via.placeholder.com/150",
        },
      ];

  return (
    <>
         <div className="container mt-4">
      <div className="row">
        {devices.map((device) => (
          <div key={device.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img
                src={device.image}
                alt={device.name}
                className="card-img-top"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{device.name}</h5>
                <p className="card-text text-muted">{device.price}</p>
                <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                  <ShoppingCart size={16} /> Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
