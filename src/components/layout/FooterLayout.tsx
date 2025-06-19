
const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 text-sm py-4 mt-12 border-t border-gray-300">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} FIP Gym. All rights reserved.</p>
        <p>Established 1986</p>
      </div>
    </footer>
  );
};

export default Footer;
