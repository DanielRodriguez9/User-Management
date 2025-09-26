import React from "react";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6 sm:p-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl border-t-4 border-green-500">
       
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
