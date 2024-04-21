import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../Data/Suggetion";
import logo from "../../assets/logo.svg";
import location_icon from "../../assets/location.svg";
import search_icon from "../../assets/search.svg";
import Noresult from "../../assets/result.png";

const endPoint = "https://back.qb.com";

function Header() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log(latitude, longitude);
              console.log(position);
              const response = await axios.post(`${endPoint}/location/get`, {
                long: longitude,
                lati: latitude,
              });
              setLocation(response.data.data);
              console.log(response);
            },
            (error) => {
              console.error("Error getting user location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getLocation();
  }, []);

  const fixedText = "Search for ";
  const dynamicTexts = [
    "Laptop repair (at home)",
    "Quick Book",
    "Desktop repair",
    "Apple Devices",
    "Gadgets Repair",
    "Upgrade Service",
  ];
  const [TextIndex, setTextIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let timeoutId;
    let charIndex = 0;
    const typeNextChar = () => {
      setTypedText((prevText) =>
        dynamicTexts[TextIndex].slice(0, charIndex + 1)
      );
      charIndex += 1;

      if (charIndex <= dynamicTexts[TextIndex].length) {
        timeoutId = setTimeout(typeNextChar, 80);
      } else {
        charIndex = 0;
        setTextIndex((prevIndex) => (prevIndex + 1) % dynamicTexts.length);
        timeoutId = setTimeout(typeNextChar, 1500);
      }
    };
    timeoutId = setTimeout(typeNextChar, 1000);
    return () => clearTimeout(timeoutId);
  }, [TextIndex, dynamicTexts.length]);

  const placeholderText = `${fixedText}'${typedText}'`;

  const [inputValue, setInputValue] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setShowClearButton(value.length > 0);

    const filteredSuggestions = data.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleClearInput = () => {
    setInputValue("");
    setShowClearButton(false);
    setSuggestions([]);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion.label);
    setShowClearButton(true);
    setSuggestions([]);
    const whatsappMessage = encodeURIComponent(
      `Hello, I'm interested in '${suggestion.label}'`
    );
    const whatsappUrl = `https://wa.me/${suggestion.phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <div>
      <header id="BackTop" className="shadow sticky inset-0 z-50 top-0 left-0">
        <nav className="bg-white  shadow border-gray-200 px-4 lg:px-[30px] xl:px-[40px] py-3 lg:py-1">
          <div className="flex  lg:flex-wrap flex-col lg:flex-row gap-2 lg:justify-between items-center mx-auto  lg:max-w-screen-xl">
            <Link
              to="/"
              className="hidden lg:flex gap-[2px] lg:gap-1 xl:gap-2 items-center"
            >
              <div className="flex items-center w-[40px] lg:w-[60px] xl:w-[70px]">
                <img src={logo} alt="" />
              </div>
              <div className="flex flex-col items-start">
                <div className="flex flex-col items-start">
                  <h4
                    className="text-[15px] lg:text-[20px] font-semibold
                                  leading-4 lg:leading-[24px]"
                  >
                    Q-Byte
                  </h4>
                  <h4 className="text-[15px] lg:text-[20px] font-semibold leading-[24px]">
                    Technologies
                  </h4>
                </div>
                <p className="text-[9px] font-[400] ml-[4px]">
                  Repair | Resell | Manufacture
                </p>
              </div>
            </Link>

            <div className="w-full flex items-center justify-center px-[20px]  lg:hidden">
              <Link
                to="/"
                className="lg:hidden flex gap-[2px] lg:gap-1 xl:gap-2 items-center"
              >
                <a
                  href="#"
                  className="flex items-center w-[40px] lg:w-[60px] xl:w-[70px]"
                >
                  <img src={logo} alt="" />
                </a>
                <div className="flex flex-col items-start">
                  <div className="flex flex-col items-start">
                    <h4
                      className="text-[13px] lg:text-[20px] font-semibold
                                  leading-4 lg:leading-[24px]"
                    >
                      Q-Byte
                    </h4>
                    <h4 className="text-[13px] lg:text-[20px] font-semibold leading-[14px]">
                      Technologies
                    </h4>
                  </div>
                  <p className="text-[8px] font-[400]">
                    Repair | Resell | Manufacture
                  </p>
                </div>
              </Link>
            </div>

            {location ? (
              <div className="hidden relative lg:flex items-center ">
                <img
                  src={location_icon}
                  className="absolute ml-3 w-[15px] lg:w-[18px]"
                  alt=""
                />
                <div className="border-[1px] flex items-center justify-start   border-[#cecece]  lg:border-[#E3E3E3] rounded-md py-[5px] outline-none pr-1 pl-10 text-[13px] text-[#757575] w-[300px] lg:max-w-[320px] lg:h-[40px]  whitespace-nowrap overflow-hidden  text-ellipsis">
                  {location}
                </div>
              </div>
            ) : (
              <div className="hidden relative lg:flex items-center ">
                <img
                  src={location_icon}
                  className="absolute ml-3 w-[15px] lg:w-[18px]"
                  alt=""
                />
                <div className="border-[1px] flex items-center justify-start   border-[#cecece]  lg:border-[#E3E3E3] rounded-md py-[5px] outline-none pr-1 pl-10 text-[13px] text-[#757575] w-[300px] lg:w-[270px] lg:h-[40px]">
                  {" "}
                  Allow your location
                </div>
              </div>
            )}

            <div className="relative">
              <div className="relative flex items-center ">
                <img
                  className="absolute ml-3 w-[15px] lg:w-[18px]"
                  src={search_icon}
                  alt=""
                />
                <input
                  type="text"
                  onChange={handleInputChange}
                  placeholder={placeholderText}
                  className=" border-[1px]  border-[#cecece] lg:border-[#e3e3e3] rounded-md py-[5px] outline-none pr-1 pl-10  placeholder:text-[#5b5b5b] focus:border-black focus: placeholder:text-[14px] w-[280px] lg:w-[330px] lg:h-[40px] grow-1"
                />
                {showClearButton && (
                  <span
                    className="clear-icon cursor-pointer   py-[5px] lg:h-[40px] flex items-center justify-center grow-1 "
                    onClick={handleClearInput}
                  >
                    <XCircle className="h-[20px] w-[20px] " />
                  </span>
                )}
              </div>
              <div className="absolute top-[93%]  rounded-lg px-[30px]  mt-[1px] w-[280px] lg:w-[330px] max-h-[400px] overflow-y-auto bg-[#fdfdfd4f] bg-white  shadow-[-2px_4px_24px_0px_rgba(0,0,0,0.25)] z-10">
                {(suggestions.length === 0 || inputValue.length > 0) && (
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        <div className="suggestion-item flex justify-start items-center gap-3 m-[10px] cursor-pointer">
                          <img
                            src={suggestion.image}
                            alt={suggestion.label}
                            className="suggestion-image w-[50px] h-[50px]  md:w-[60px] md:h-[60px] object-cover object-center rounded-lg"
                          />
                          <span className="suggestion-text text-[14px] font-[400] md:font-[400] md:text-[15px] ">
                            {suggestion.label}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {suggestions.length === 0 && inputValue.length > 0 && (
                  <div className="no-suggestions flex flex-col items-center justify-center py-[20px] ">
                    <img
                      className="md:w-[80px] w-[60px] object-cover object-center"
                      src={Noresult}
                      alt=""
                    />
                    <h1 className="text-[17px] md:text-[20px] font-[600] leading-[22px] py-[10px]">
                      No results found
                    </h1>
                    <div className="text-[12px] md:text-[13px] font-[400] leading-[14px] md:leading-[16px] tracking-wide">
                      We couldn’t find what you were looking for. Please check
                      your keywords again!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
