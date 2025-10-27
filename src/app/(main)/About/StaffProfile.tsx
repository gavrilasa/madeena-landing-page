"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- Data (tidak berubah) ---
const departments = [
  {
    id: "leadership",
    name: "Leadership Team",
    chalkColor: "text-yellow-300"
  },
  {
    id: "teachers",
    name: "Teaching Staff",
    chalkColor: "text-green-300"
  },
  {
    id: "administration",
    name: "Administration",
    chalkColor: "text-blue-300"
  },
  {
    id: "support",
    name: "Support Staff",
    chalkColor: "text-orange-300"
  }
];

const staffData = [
  {
    id: 1,
    name: "Dr. Ahmad Fauzi",
    role: "Principal",
    department: "leadership",
    email: "ahmad.fauzi@almadeena.sch.id",
    instagram: "@ahmad.fauzi",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop",
    pronouns: "He/Him",
    quote: "Leading with compassion and Islamic values",
    nip: "2023-00001"
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    role: "Vice Principal",
    department: "leadership",
    email: "siti.nurhaliza@almadeena.sch.id",
    instagram: "@siti.nurhaliza",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop",
    pronouns: "She/Her",
    quote: "Empowering students through education",
    nip: "2023-00002"
  },
  {
    id: 3,
    name: "Muhammad Rizki",
    role: "Math Teacher",
    department: "teachers",
    email: "m.rizki@almadeena.sch.id",
    instagram: "@m.rizki",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
    pronouns: "He/Him",
    quote: "Making math fun and easy",
    nip: "2023-00003"
  },
  {
    id: 4,
    name: "Fatimah Zahra",
    role: "English Teacher",
    department: "teachers",
    email: "f.zahra@almadeena.sch.id",
    instagram: "@f.zahra",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop",
    pronouns: "She/Her",
    quote: "Opening doors through language",
    nip: "2023-00004"
  },
  {
    id: 5,
    name: "Hasan Abdullah",
    role: "Finance Manager",
    department: "administration",
    email: "h.abdullah@almadeena.sch.id",
    instagram: "@h.abdullah",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
    pronouns: "He/Him",
    quote: "Managing resources with integrity",
    nip: "2023-00005"
  },
  {
    id: 6,
    name: "Aisyah Putri",
    role: "IT Support",
    department: "support",
    email: "a.putri@almadeena.sch.id",
    instagram: "@a.putri",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop",
    pronouns: "She/Her",
    quote: "Supporting innovation and technology",
    nip: "2023-00006"
  }
];
// --- Akhir Data ---

// 1. Definisikan transisi cepat dengan 'as const'
const fastTween = { type: "tween", duration: 0.3, ease: "easeInOut" } as const;

export default function StaffProfile() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);

  const filteredStaff = selectedDepartment === "all"
    ? staffData
    : staffData.filter(staff => staff.department === selectedDepartment);

  const handleCardClick = (id: number) => {
    setSelectedStaff(id);
  };

  const handleCloseModal = () => {
    setSelectedStaff(null);
  };

  const selectedStaffData = staffData.find(s => s.id === selectedStaff);

  return (
    <section className="relative bg-linear-to-br from-[#0398C9] via-[#0398C9] to-[#0279a1] py-16 md:py-24 px-6 md:px-12 lg:px-16 min-h-screen">

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header (tidak berubah) */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block relative">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-chalk relative">
              <span className="relative inline-block">
                Meet The Team
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-300 opacity-70 transform -rotate-1"></div>
              </span>
            </h1>
            <div className="absolute -top-6 -right-8 text-yellow-300 text-3xl transform rotate-12">★</div>
            <div className="absolute -bottom-4 -left-6 text-[#FE7D01] text-2xl">♥</div>
          </div>
          <p className="text-white/90 text-lg md:text-xl mt-6 font-handwriting">
            Our Dedicated Educators & Staff
          </p>
        </div>

        {/* Filter (tidak berubah) */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          <button
            onClick={() => setSelectedDepartment("all")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
              selectedDepartment === "all"
                ? "bg-white text-[#0398C9] border-white shadow-lg"
                : "bg-[#0398C9]/50 text-white border-white/50 hover:bg-[#0398C9]/70"
            }`}
          >
            All Staff
          </button>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                selectedDepartment === dept.id
                  ? "bg-white text-[#0398C9] border-white shadow-lg"
                  : "bg-[#0398C9]/50 text-white border-white/50 hover:bg-[#0398C9]/70"
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence>
            {filteredStaff.map((staff) => (
              <motion.div
                key={staff.id}
                layoutId={`staff-card-container-${staff.id}`}
                transition={fastTween} // 2. Gunakan transisi cepat
                onClick={() => handleCardClick(staff.id)}
                className="group relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                {/* 3. Hole punch di z-20 (di atas card) */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 z-20 bg-[#0398C9] border-4 border-gray-200 rounded-full shadow-inner"></div>

                {/* 3. ID Card Container di z-10 (di bawah hole punch) */}
                <motion.div
                  layoutId={`staff-card-body-${staff.id}`}
                  transition={fastTween} // 2. Gunakan transisi cepat
                  className="relative bg-linear-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-6 border-4 border-gray-200 z-10"
                >
                  {/* Orange background header */}
                  <motion.div
                    layoutId={`staff-card-header-${staff.id}`}
                    transition={fastTween} // 2. Gunakan transisi cepat
                    className="relative bg-linear-to-r from-[#FE7D01] to-[#FE7D01] rounded-2xl p-6 mb-4"
                  >
                    <div className="absolute top-2 right-2 w-8 h-8 bg-blue-300 rounded-full opacity-50"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-[#FE7D01] rounded-full opacity-50"></div>

                    {/* Photo */}
                    <motion.div
                      layoutId={`staff-image-${staff.id}`}
                      transition={fastTween} // 2. Gunakan transisi cepat
                      className="flex justify-center mb-4"
                    >
                      <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={staff.image}
                          alt={staff.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Team Badge */}
                    <div className="text-center">
                      <p className="text-white font-bold text-lg tracking-wider drop-shadow-md">
                        TEAM
                      </p>
                      <p className="text-white font-black text-2xl tracking-wide drop-shadow-md">
                        Al Madeena
                      </p>
                    </div>
                  </motion.div>

                  {/* Staff Info */}
                  <motion.div
                    layoutId={`staff-card-info-${staff.id}`}
                    transition={fastTween} // 2. Gunakan transisi cepat
                    className="space-y-3 text-center"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                      {staff.name}
                    </h3>
                    <div className="border-t-2 border-gray-300 my-2"></div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center px-2">
                        <span className="text-gray-500 font-semibold uppercase text-xs">Name</span>
                        <span className="text-gray-700 font-medium">{staff.pronouns}</span>
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <span className="text-gray-500 font-semibold uppercase text-xs">Pronouns</span>
                        <span className="text-gray-700 font-medium uppercase">{staff.role}</span>
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <span className="text-gray-500 font-semibold uppercase text-xs">Department</span>
                        <span className="text-gray-700 font-medium">{departments.find(d => d.id === staff.department)?.name}</span>
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <span className="text-gray-500 font-semibold uppercase text-xs">NIP</span>
                        <span className="text-gray-700 font-medium">{staff.nip}</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-[#FE7D01]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <span>{staff.email}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-[#FE7D01]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                        </svg>
                        <span>{staff.instagram}</span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-1 mt-4 mb-2">
                      <div className="w-1 h-8 bg-gray-700"></div>
                      <div className="w-0.5 h-8 bg-gray-700"></div>
                      <div className="w-1.5 h-8 bg-gray-700"></div>
                      <div className="w-0.5 h-8 bg-gray-700"></div>
                      <div className="w-1 h-8 bg-gray-700"></div>
                      <div className="w-2 h-8 bg-gray-700"></div>
                      <div className="w-0.5 h-8 bg-gray-700"></div>
                      <div className="w-1 h-8 bg-gray-700"></div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 mt-3">
                      <p className="text-gray-700 italic text-xs leading-relaxed">
                        "{staff.quote}"
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedStaff && selectedStaffData && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} // Transisi backdrop cepat
          >
            <motion.div
              layoutId={`staff-card-container-${selectedStaffData.id}`}
              transition={fastTween} // 2. Gunakan transisi cepat
              className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >

              <motion.div
                layoutId={`staff-card-body-${selectedStaffData.id}`}
                transition={fastTween} // 2. Gunakan transisi cepat
                className="relative bg-linear-to-br from-gray-50 to-white rounded-3xl p-6 border-4 border-gray-200 z-10"
              >
                <button
                  onClick={handleCloseModal}
                  // 3. Tombol close di z-50 (paling atas di modal)
                  className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <motion.div
                  layoutId={`staff-card-header-${selectedStaffData.id}`}
                  transition={fastTween} // 2. Gunakan transisi cepat
                  className="relative bg-linear-to-r from-[#FE7D01] to-[#FE7D01] rounded-2xl p-6 mb-4"
                >
                  <div className="absolute top-2 right-2 w-8 h-8 bg-blue-300 rounded-full opacity-50"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-[#FE7D01] rounded-full opacity-50"></div>
                  <motion.div
                    layoutId={`staff-image-${selectedStaffData.id}`}
                    transition={fastTween} // 2. Gunakan transisi cepat
                    className="flex justify-center mb-4"
                  >
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={selectedStaffData.image}
                        alt={selectedStaffData.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg tracking-wider drop-shadow-md">
                      TEAM
                    </p>
                    <p className="text-white font-black text-2xl tracking-wide drop-shadow-md">
                      Al Madeena
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  layoutId={`staff-card-info-${selectedStaffData.id}`}
                  transition={fastTween} // 2. Gunakan transisi cepat
                  className="space-y-3 text-center"
                >
                  <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                    {selectedStaffData.name}
                  </h3>
                  <div className="border-t-2 border-gray-300 my-2"></div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-gray-500 font-semibold uppercase text-xs">Name</span>
                      <span className="text-gray-700 font-medium">{selectedStaffData.pronouns}</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-gray-500 font-semibold uppercase text-xs">Pronouns</span>
                      <span className="text-gray-700 font-medium uppercase">{selectedStaffData.role}</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-gray-500 font-semibold uppercase text-xs">Department</span>
                      <span className="text-gray-700 font-medium">{departments.find(d => d.id === selectedStaffData.department)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-gray-500 font-semibold uppercase text-xs">NIP</span>
                      <span className="text-gray-700 font-medium">{selectedStaffData.nip}</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 text-[#FE7D01]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <span>{selectedStaffData.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 text-[#FE7D01]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                      </svg>
                      <span>{selectedStaffData.instagram}</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-1 mt-4 mb-2">
                    <div className="w-1 h-8 bg-gray-700"></div>
                    <div className="w-0.5 h-8 bg-gray-700"></div>
                    <div className="w-1.5 h-8 bg-gray-700"></div>
                    <div className="w-0.5 h-8 bg-gray-700"></div>
                    <div className="w-1 h-8 bg-gray-700"></div>
                    <div className="w-2 h-8 bg-gray-700"></div>
                    <div className="w-0.5 h-8 bg-gray-700"></div>
                    <div className="w-1 h-8 bg-gray-700"></div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 mt-3">
                    <p className="text-gray-700 italic text-xs leading-relaxed">
                      "{selectedStaffData.quote}"
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}