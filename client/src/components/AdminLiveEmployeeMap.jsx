import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


// ==========================================
// MAP CONTROLLER
// ==========================================
// Selected employee ko follow karega.
// Agar koi employee selected nahi hai,
// to saare employees ko map me fit karega.
// ==========================================

const MapController = ({
  selectedEmployee,
  employees,
}) => {
  const map = useMap();

  useEffect(() => {

    // ======================================
    // SINGLE EMPLOYEE TRACKING
    // ======================================

    if (selectedEmployee) {

      // IMPORTANT:
      // selectedEmployee purana object ho sakta hai.
      // Isliye latest employees array se employee
      // dobara find kar rahe hain.

      const latestEmployee = employees.find(
        (employee) =>
          employee.employeeId ===
          selectedEmployee.employeeId
      );

      if (latestEmployee?.location) {

        map.flyTo(
          [
            latestEmployee.location.latitude,
            latestEmployee.location.longitude,
          ],
          16,
          {
            animate: true,
            duration: 1,
          }
        );
      }

      return;
    }


    // ======================================
    // VIEW ALL EMPLOYEES
    // ======================================

    const employeesWithLocation =
      employees.filter(
        (employee) => employee.location
      );


    if (employeesWithLocation.length === 0) {
      return;
    }


    const bounds =
      employeesWithLocation.map(
        (employee) => [
          employee.location.latitude,
          employee.location.longitude,
        ]
      );


    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 15,
    });

  }, [
    selectedEmployee,
    employees,
    map,
  ]);


  return null;
};


// ==========================================
// MAIN COMPONENT
// ==========================================

const AdminLiveEmployeeMap = ({
  employees = [],
}) => {

  const [
    selectedEmployee,
    setSelectedEmployee,
  ] = useState(null);


  // ==========================================
  // EMPLOYEES HAVING GPS LOCATION
  // ==========================================

  const employeesWithLocation =
    employees.filter(
      (employee) => employee.location
    );


  // ==========================================
  // IF SELECTED EMPLOYEE NO LONGER EXISTS
  // ==========================================

  useEffect(() => {

    if (!selectedEmployee) {
      return;
    }


    const stillExists =
      employees.some(
        (employee) =>
          employee.employeeId ===
          selectedEmployee.employeeId
      );


    if (!stillExists) {
      setSelectedEmployee(null);
    }

  }, [
    employees,
    selectedEmployee,
  ]);


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">


      {/* =====================================
          HEADER
      ====================================== */}

      <div className="flex items-center justify-between mb-4">

        <div>

          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">

            <span>📍</span>

            Live Fleet Tracker

          </h2>


          <p className="text-xs text-slate-400 mt-0.5">

            Real-time monitoring and route control

          </p>

        </div>


        {/* =================================
            LIVE COUNT
        ================================== */}

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">

          <span className="relative flex h-2.5 w-2.5">

            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />

            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />

          </span>


          <span className="text-xs font-bold text-emerald-700">

            {employeesWithLocation.length} /{" "}

            {employees.length} Active

          </span>

        </div>

      </div>


      {/* =====================================
          MAIN GRID
      ====================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">


        {/* ===================================
            MAP
        ==================================== */}

        <div className="lg:col-span-8 xl:col-span-9 relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-200 z-0 bg-slate-100">


          <MapContainer

            center={[
              28.6139,
              77.209,
            ]}

            zoom={12}

            scrollWheelZoom={true}

            className="h-full w-full"

            style={{
              zIndex: 0,
            }}

          >

            {/* ===============================
                OPEN STREET MAP
            ================================ */}

            <TileLayer

              attribution="&copy; OpenStreetMap contributors"

              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />


            {/* ===============================
                MAP CONTROLLER
            ================================ */}

            <MapController

              selectedEmployee={
                selectedEmployee
              }

              employees={employees}

            />


            {/* ===============================
                EMPLOYEE MARKERS
            ================================ */}

            {employeesWithLocation.map(
              (employee) => {

                const isSelected =
                  selectedEmployee?.employeeId ===
                  employee.employeeId;


                return (

                  <CircleMarker

                    key={
                      employee.employeeId
                    }

                    center={[
                      employee.location.latitude,
                      employee.location.longitude,
                    ]}

                    radius={
                      isSelected
                        ? 12
                        : 8
                    }

                    pathOptions={{
                      color:
                        isSelected
                          ? "#10b981"
                          : "#ffffff",

                      fillColor:
                        isSelected
                          ? "#059669"
                          : "#16a34a",

                      fillOpacity: 1,

                      weight:
                        isSelected
                          ? 4
                          : 2,
                    }}

                  >

                    {/* =====================
                        POPUP
                    ====================== */}

                    <Popup>

                      <div className="min-w-[180px] p-1">

                        <h3 className="font-bold text-slate-800 text-sm">

                          {employee.name}

                        </h3>


                        <p className="text-xs text-slate-500">

                          {employee.employeeCode}

                        </p>


                        <p className="text-xs text-slate-500 mb-2">

                          {employee.designation ||
                            "Staff"}

                        </p>


                        <div className="border-t border-slate-100 pt-2 space-y-1 text-[11px] text-slate-600">


                          <div>

                            <strong>
                              Speed:
                            </strong>{" "}

                            {employee.location.speed ??
                              0}{" "}
                            km/h

                          </div>


                          <div>

                            <strong>
                              Accuracy:
                            </strong>{" "}

                            {employee.location.accuracy ??
                              "-"}{" "}
                            m

                          </div>


                          <div>

                            <strong>
                              Latitude:
                            </strong>{" "}

                            {employee.location.latitude.toFixed(
                              6
                            )}

                          </div>


                          <div>

                            <strong>
                              Longitude:
                            </strong>{" "}

                            {employee.location.longitude.toFixed(
                              6
                            )}

                          </div>


                          <div>

                            <strong>
                              Last Update:
                            </strong>{" "}

                            {employee.location.timestamp
                              ? new Date(
                                  employee.location.timestamp
                                ).toLocaleTimeString()
                              : "-"}

                          </div>

                        </div>

                      </div>

                    </Popup>

                  </CircleMarker>

                );

              }
            )}

          </MapContainer>

        </div>


        {/* ===================================
            SIDEBAR
        ==================================== */}

        <div className="lg:col-span-4 xl:col-span-3 h-[520px] flex flex-col bg-slate-50 rounded-xl border border-slate-200 p-3">


          {/* ================================
              SIDEBAR HEADER
          ================================= */}

          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 shrink-0">

            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">

              Employees ({employees.length})

            </span>


            {/* VIEW ALL */}

            <button

              onClick={() =>
                setSelectedEmployee(null)
              }

              className={`text-xs font-bold px-2.5 py-1 rounded-md transition-all ${
                selectedEmployee === null
                  ? "bg-[#1E8FA6] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
              }`}

            >

              🌐 View All

            </button>

          </div>


          {/* ================================
              EMPLOYEE LIST
          ================================= */}

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">

            <AnimatePresence>

              {employees.map(
                (employee) => {

                  const isSelected =
                    selectedEmployee?.employeeId ===
                    employee.employeeId;


                  const hasLocation =
                    Boolean(
                      employee.location
                    );


                  return (

                    <motion.div

                      key={
                        employee.employeeId
                      }

                      initial={{
                        opacity: 0,
                        y: 10,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        scale: 0.95,
                      }}

                      transition={{
                        duration: 0.2,
                      }}

                      className={`p-3 rounded-lg transition-all border ${
                        isSelected
                          ? "bg-white border-[#1E8FA6] ring-2 ring-[#1E8FA6]/20 shadow-md"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}

                    >

                      <div className="flex items-start justify-between gap-2">


                        {/* EMPLOYEE INFO */}

                        <div className="min-w-0">

                          <div className="flex items-center gap-1.5">

                            <span

                              className={`h-2 w-2 rounded-full shrink-0 ${
                                hasLocation
                                  ? "bg-emerald-500"
                                  : "bg-slate-300"
                              }`}

                            />


                            <h4 className="text-xs font-bold text-slate-800 truncate">

                              {employee.name}

                            </h4>

                          </div>


                          <p className="text-[10px] text-slate-400 mt-0.5 ml-3">

                            {employee.employeeCode}

                            {" · "}

                            {employee.designation ||
                              "Staff"}

                          </p>

                        </div>


                        {/* =====================
                            TRACK BUTTON
                        ====================== */}

                        {hasLocation ? (

                          <button

                            onClick={() =>
                              setSelectedEmployee(
                                employee
                              )
                            }

                            className={`text-[11px] font-bold px-2.5 py-1 rounded transition-all shrink-0 ${
                              isSelected
                                ? "bg-emerald-600 text-white"
                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            }`}

                          >

                            {isSelected
                              ? "Tracking"
                              : "Track 🎯"}

                          </button>

                        ) : (

                          <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">

                            No GPS

                          </span>

                        )}

                      </div>


                      {/* =====================
                          LIVE GPS INFORMATION
                      ====================== */}

                      {hasLocation &&
                        isSelected && (

                          <motion.div

                            initial={{
                              opacity: 0,
                              height: 0,
                            }}

                            animate={{
                              opacity: 1,
                              height: "auto",
                            }}

                            className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500"

                          >

                            <span>

                              Speed:{" "}

                              {employee.location.speed ??
                                0}{" "}
                              km/h

                            </span>


                            <span>

                              Acc:{" "}

                              {employee.location.accuracy ??
                                0}
                              m

                            </span>

                          </motion.div>

                        )}

                    </motion.div>

                  );

                }
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>

    </div>

  );
};


export default AdminLiveEmployeeMap;