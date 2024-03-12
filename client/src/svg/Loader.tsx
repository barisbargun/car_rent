import { _useContext } from "@/context/Context";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Loader = ({ width = 30, height = 30 }) => {

  const [gradientColor, setGradientColor] = useState("#FFFFFF");
  const [circleStrokeColor, setCircleStrokeColor] = useState("#FFFFFF");
  const { theme } = _useContext();
  const location = useLocation();

  useEffect(() => {
    if (theme == "dark" && location.pathname.includes("admin")) {
      setGradientColor("#FFFFFF");
      setCircleStrokeColor("#FFFFFF");
    } else {
      setGradientColor("#000");
      setCircleStrokeColor("#000");
    }
  }, [theme]);


  return (
    <div>
      {/* Render the SVG loader with dynamic colors */}
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 200 200">
        <radialGradient id="a3" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
          <stop offset="0" stopColor={gradientColor} data-darkreader-inline-stopcolor=""
            className="--darkreader-inline-stopcolor: #620062;"></stop>
          <stop offset=".3" stopColor={gradientColor} stopOpacity=".9" data-darkreader-inline-stopcolor=""
            className="--darkreader-inline-stopcolor: #620062;"></stop>
          <stop offset=".6" stopColor={gradientColor} stopOpacity=".6" data-darkreader-inline-stopcolor=""
            className="--darkreader-inline-stopcolor: #620062;"></stop>
          <stop offset=".8" stopColor={gradientColor} stopOpacity=".3" data-darkreader-inline-stopcolor=""
            className="--darkreader-inline-stopcolor: #620062;"></stop>
          <stop offset="1" stopColor={gradientColor} stopOpacity="0" data-darkreader-inline-stopcolor=""
            className="--darkreader-inline-stopcolor: #620062;"></stop>
        </radialGradient>
        <circle transform-origin="center" fill="none" stroke="url(#a3)" strokeWidth="15" strokeLinecap="round"
          strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70">
          <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="0.9" values="360;0" keyTimes="0;1"
            keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
        </circle>
        <circle transform-origin="center" fill="none" opacity=".2" stroke={circleStrokeColor} strokeWidth="15" strokeLinecap="round"
          cx="100" cy="100" r="70" data-darkreader-inline-stroke="" className="--darkreader-inline-stroke: #e662e6;"></circle>
      </svg>

    </div>
  );
}

export default Loader