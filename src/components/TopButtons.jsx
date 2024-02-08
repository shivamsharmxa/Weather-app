import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Delhi",
    },
    {
      id: 2,
      title: "Mumbai",
    },
    {
      id: 3,
      title: "Chennai",
    },
    {
      id: 4,
      title: "Bangalore",
    },
    {
      id: 5,
      title: "Pune",
    },
  ];

  return (
    <div className="sm:flex items-center justify-around my-6">
  {cities.map((city) => (
    <button
      key={city.id}
      className="text-white text-lg font-medium mb-2 sm:mb-0"
      onClick={() => setQuery({ q: city.title })}
    >
      {city.title}
    </button>
  ))}
</div>
    
  );
}

export default TopButtons;