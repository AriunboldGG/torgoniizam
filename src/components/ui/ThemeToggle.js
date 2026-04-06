"use client"

import { useTheme } from "@/contexts/ThemeContext"

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, mounted } = useTheme()
  const isDark = theme === "dark"

  // Render a static placeholder before mount to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`p-2 rounded-lg bg-gray-100 text-gray-600 ${className}`}
      >
        <span className="block w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Гэрлэлт горим руу шилжих" : "Харанхуй горим руу шилжих"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`relative p-2 rounded-lg transition-colors duration-200
        bg-gray-100 hover:bg-gray-200 dark:bg-[#252840] dark:hover:bg-[#2d3450]
        text-gray-600 dark:text-yellow-300 ${className}`}
    >
      <div className="relative w-5 h-5">
        {/* Sun — visible in dark mode */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="4" />
          <path
            strokeLinecap="round"
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          />
        </svg>

        {/* Moon — visible in light mode */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      </div>
    </button>
  )
}
