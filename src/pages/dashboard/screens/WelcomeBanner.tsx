const WelcomeBanner = ({ name }: { name: string }) => {
  const currentDate = new Date().toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="">
      <h3 className="text-lg font-extrabold text-gray-800">Welcome Back, {name}</h3>
      <p className="text-gray-600 mt-2">{currentDate}</p>
    </div>
  );
};

export default WelcomeBanner;
