import { Link, useParams } from "react-router-dom";
import "../css/CardsVol.css";
import { useEffect, useState } from "react";
import urlAxios from "../config/urlAxios";
import Loading from "./Loading";

const CardsVol = () => {
  const [volumen, setVolumen] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams();
  const { clave } = params;
  // console.log(clave)
  useEffect(() => {
    const peticion = async () => {
      try {
        const respuesta = await urlAxios(`/paginas/novela/volumen/${clave}`);
        // console.log(respuesta);
        setVolumen(respuesta.data);
        setLoader(false);
      } catch (error) {
        setVolumen([]);
      }
      setLoader(false);
    };
    peticion();
  }, [clave]);
  // if (loader) return <Loading />;
  return (
    <>
      {volumen && volumen.length > 0 ? (
        <section className="volumes">
          {volumen
            .sort((a, b) => Number(a.volumen) - Number(b.volumen))
            .map((vol) => (
              <figure className="volumes_content" key={vol.id}>
                <img src={vol.imagen} alt="" />
                <div className="vol">
                  <h4 className="w-full text-center h-5">
                    Volumen {vol.volumen}
                  </h4>
                  {vol.captiuloActive && (
                    <div className="flex items-center justify-center flex-wrap">
                      <p>{vol.capitulo}</p>
                      <Link
                        to={`/capitulo/${vol.clave}/1`}
                        className="link-url"
                      >
                        Leer
                      </Link>
                    </div>
                  )}
                  {vol.mega && (
                    <a
                      href={`${vol.mega}`}
                      className="link-url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mega
                    </a>
                  )}
                  {vol.mediafire && (
                    <a
                      href={`${vol.mediafire}`}
                      className="link-url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mediafire
                    </a>
                  )}
                  {vol.megaEpub && (
                    <a
                      href={`${vol.megaEpub}`}
                      className="link-url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mega Epub
                    </a>
                  )}
                  {vol.mediafireEpub && (
                    <a
                      href={`${vol.mediafireEpub}`}
                      className="link-url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mediafire Epub
                    </a>
                  )}
                </div>
              </figure>
            ))}
        </section>
      ) : (
        <h1 className="font-bold text-3xl text-center m-3">No hay Volumenes</h1>
      )}
    </>
  );
};

export default CardsVol;
