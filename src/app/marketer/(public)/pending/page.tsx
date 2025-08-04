function Pending() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <svg
          className="mx-auto mb-6 w-16 h-16 text-yellow-400 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">در حال بررسی</h1>
        <p className="text-gray-600">
          درخواست شما در حال بررسی است. لطفاً شکیبا باشید، به زودی نتیجه اعلام خواهد شد.
        </p>
      </div>
    </div>
  );
}

export default Pending;
