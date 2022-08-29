// import { IoIosAdd } from "react-icons/io";
import "./buttonStyle.css";
const Button = ({
  onClick,
  type,
  icon,
  alignLabel,
  buttonStyle,
  label = null,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`button ${buttonStyle ? buttonStyle : null}`}
    >
      {icon ? <div className="button-icon">{icon}</div> : null}
      <div
        className={`button-label ${alignLabel === "center" ? "center" : "end"}`}
      >
        {label === null ? children : label}
      </div>
    </button>
  );
};

export default Button;
