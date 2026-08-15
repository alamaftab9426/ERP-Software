import React, { useEffect, useRef, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ==========================================
// EMPLOYEE MARKER ICON
// ==========================================

const employeeMarkerIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,

  iconSize: [25, 41],
  iconAnchor: [12, 41],

  popupAnchor: [1, -34],

  shadowSize: [41, 41],
});

// ==========================================
// KEEP MAP CENTERED ON EMPLOYEE
// ==========================================

const RecenterMap = ({ latitude, longitude }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude != null && longitude != null) {
      map.setView(
        [latitude, longitude],
        map.getZoom()
      );
    }
  }, [latitude, longitude, map]);

  return null;
};

// ==========================================
// EMPLOYEE LOCATION MAP
// ==========================================

const EmployeeLocationMap = ({ onLocationUpdate }) => {
  const [location, setLocation] = useState(null);

  const [locationError, setLocationError] =
    useState("");

  const [isTracking, setIsTracking] =
    useState(false);

  const watchIdRef = useRef(null);

  // ==========================================
  // START GPS TRACKING
  // ==========================================

  const handleEnableLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Your browser does not support location tracking."
      );

      return;
    }

    // Agar pehle se watcher chal raha hai
    // to duplicate watcher mat banao
    if (watchIdRef.current !== null) {
      return;
    }

    setLocationError("");

    watchIdRef.current =
      navigator.geolocation.watchPosition(
        // ======================================
        // SUCCESS
        // ======================================
        (position) => {
          const {
            latitude,
            longitude,
            accuracy,
            speed,
            heading,
          } = position.coords;

          const newLocation = {
            latitude,
            longitude,
            accuracy,
            speed,
            heading,
            timestamp: new Date().toISOString(),
          };

          console.log(
            "GPS LOCATION:",
            newLocation
          );

          // Employee map marker update
          setLocation(newLocation);

          // Live status
          setIsTracking(true);

          // Parent Dashboard ko location bhejo
          if (onLocationUpdate) {
            onLocationUpdate(newLocation);
          }
        },

        // ======================================
        // ERROR
        // ======================================
        (error) => {
          console.error(
            "GPS Error:",
            error
          );

          if (
            error.code ===
            error.PERMISSION_DENIED
          ) {
            setLocationError(
              "Location permission denied. Please allow location access."
            );
          } else if (
            error.code ===
            error.POSITION_UNAVAILABLE
          ) {
            setLocationError(
              "Location information is unavailable."
            );
          } else if (
            error.code ===
            error.TIMEOUT
          ) {
            setLocationError(
              "Location request timed out."
            );
          } else {
            setLocationError(
              "Unable to get your location."
            );
          }

          setIsTracking(false);
        },

        // ======================================
        // GPS OPTIONS
        // ======================================
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 10000,
        }
      );
  };

  // ==========================================
  // CLEANUP GPS WATCHER
  // ==========================================

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(
          watchIdRef.current
        );

        watchIdRef.current = null;
      }
    };
  }, []);

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="rounded-lg overflow-hidden border border-slate-200">

      {/* =====================================
          LOCATION NOT ENABLED
      ====================================== */}

      {!location && (
        <div className="h-72 bg-slate-50 flex flex-col items-center justify-center">

          <p className="text-sm text-slate-500 mb-4">
            Enable location to see your live position
          </p>

          <button
            onClick={handleEnableLocation}
            className="px-5 py-2.5 rounded-lg bg-[#1E8FA6] text-white text-sm font-medium hover:bg-[#187f94] transition"
          >
            Enable Location
          </button>

          {locationError && (
            <p className="text-xs text-red-500 mt-3 text-center px-4">
              {locationError}
            </p>
          )}

        </div>
      )}

      {/* =====================================
          LOCATION AVAILABLE
      ====================================== */}

      {location && (
        <div className="relative">

          {/* LIVE STATUS */}

          <div className="absolute top-3 left-3 z-[1000] bg-white rounded-lg shadow-md px-3 py-2">

            <div className="flex items-center gap-2">

              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isTracking
                    ? "bg-emerald-500"
                    : "bg-slate-400"
                }`}
              />

              <span className="text-xs font-semibold text-slate-700">
                {isTracking
                  ? "Live Location"
                  : "Location Off"}
              </span>

            </div>

          </div>

          {/* MAP */}

          <MapContainer
            center={[
              location.latitude,
              location.longitude,
            ]}
            zoom={16}
            scrollWheelZoom={true}
            className="h-72 w-full"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* EMPLOYEE CURRENT LOCATION */}

            <Marker
              position={[
                location.latitude,
                location.longitude,
              ]}
              icon={employeeMarkerIcon}
            >

              <Popup>

                <div className="text-sm">

                  <strong>
                    You are here
                  </strong>

                  <div className="mt-2">

                    <div>
                      Latitude:{" "}
                      {location.latitude.toFixed(6)}
                    </div>

                    <div>
                      Longitude:{" "}
                      {location.longitude.toFixed(6)}
                    </div>

                    <div>
                      Accuracy:{" "}
                      {location.accuracy != null
                        ? `${Math.round(
                            location.accuracy
                          )} m`
                        : "N/A"}
                    </div>

                    <div>
                      Speed:{" "}
                      {location.speed != null
                        ? `${location.speed}`
                        : "N/A"}
                    </div>

                  </div>

                </div>

              </Popup>

            </Marker>

            {/* KEEP MAP FOLLOWING EMPLOYEE */}

            <RecenterMap
              latitude={location.latitude}
              longitude={location.longitude}
            />

          </MapContainer>

        </div>
      )}

    </div>
  );
};

export default EmployeeLocationMap;