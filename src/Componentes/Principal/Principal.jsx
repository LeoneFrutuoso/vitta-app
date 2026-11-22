import { Link } from "react-router-dom";
import "./Principal.css";
import { IoArrowBackCircle } from "react-icons/io5";

function Principal(props) {
  const classeRoot = props.semBorda
    ? "Principal_root Principal_semBorda"
    : "Principal_root";

  return (
    <main className={classeRoot}>
      <div className="Principal_titulo">
        {props.voltarPara && (
          <Link to={props.voltarPara}>
            <IoArrowBackCircle size={24} color="#0b4628" />
          </Link>
        )}

        <h2>{props.titulo}</h2>
      </div>

      {props.children}
    </main>
  );
}

export default Principal;