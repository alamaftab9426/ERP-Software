import {
  FiDollarSign,
  FiTag,
} from "react-icons/fi";

import { HiOutlineSwitchHorizontal } from "react-icons/hi";
const SuperAdminHeader = ({sidebarWidth}) => {
  return (
    <div>
        <header
          className="h-[76px] bg-[#0B1220] fixed top-0 right-0 z-10 flex items-center justify-end gap-6 px-8 transition-all duration-300"
          style={{ left: sidebarWidth }}
        >
          <button className="text-slate-400 hover:text-white">
            <FiDollarSign size={20} />
          </button>
          <button className="text-slate-400 hover:text-white">
            <FiTag size={20} />
          </button>
          <button className="text-slate-400 hover:text-white">
            <HiOutlineSwitchHorizontal size={20} />
          </button>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 rounded-full border border-slate-700"
          />
        </header>

    </div>
  )
}

export default SuperAdminHeader