export function getLogoutButtonClass(darkMode: boolean) {
  return darkMode
    ? "flex items-center space-x-1 text-red-400 hover:text-red-300 hover:bg-red-950/40 px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer font-semibold border border-transparent hover:border-red-900/50"
    : "flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer font-semibold border border-transparent hover:border-red-100";
}

export function getLogoutMobileButtonClass(darkMode: boolean) {
  return darkMode
    ? "w-full flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 py-3 rounded-lg transition duration-200 cursor-pointer font-bold text-sm border border-red-900/40"
    : "w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 py-3 rounded-lg transition duration-200 cursor-pointer font-bold text-sm bg-red-50/50 border border-red-100";
}
