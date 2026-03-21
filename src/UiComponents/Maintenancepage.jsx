export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 font-inter">
      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md px-10 py-12 text-center">
        {/* Icon */}
        <div className="w-14 h-14 bg-[#8B2635]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-7 h-7 text-[#8B2635]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>

        {/* Parish name */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          SS Peter &amp; Paul Catholic Parish
        </p>

        {/* Divider */}
        <div className="w-8 h-px bg-[#8B2635]/30 mx-auto mb-6" />

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Under Maintenance
        </h1>

        {/* Message */}
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          We're currently making improvements to better serve our parish
          community. We apologize for the inconvenience and will be back
          shortly.
        </p>

        {/* Contact pill */}
        <a
          href="mailto:parish@sspeterandpaul.org"
          className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-sm text-gray-600 hover:border-[#8B2635]/40 hover:text-[#8B2635] transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          parish@sspeterandpaul.org
        </a>
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs text-gray-400">
        Thank you for your patience. ✝
      </p>
    </div>
  );
}
