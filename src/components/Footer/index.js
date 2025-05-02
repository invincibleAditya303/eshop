import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We are a leading company providing top-notch services to our clients.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="text-sm hover:underline">Home</li>
              <li className="text-sm hover:underline">Services</li>
              <li className="text-sm hover:underline">About</li>
              <li className="text-sm hover:underline">Contact</li>
            </ul>
          </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center">
          <p className="text-sm">&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
    </footer>
  )
}

export default Footer