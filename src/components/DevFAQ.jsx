import React from "react";
import FAQList from "../faqcomponents/FAQList";

const DevFAQ = () => {
  return (
    <div
      className="min-h-screen bg-linear-to-br bg-[#f5f5f5] transition-colors duration-500"
    >
      <div className="container mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1
            className="text-4xl md:text-5xl font-extrabold font-heading mb-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 inline-block text-transparent bg-clip-text"
          >
            Developer FAQ
          </h1>
          <p
            className="text-lg text-gray-600 max-w-2xl font-body mx-auto transition-colors duration-500"
          >
            Built for students. Designed with logic. Explained by the developer.
          </p>
        </header>
      </div>
      <FAQList />
    </div>
  );
};

export default DevFAQ; 
