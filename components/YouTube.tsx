import { useWindowSize } from "../hooks/windowSize";

const YouTube = ({ url }) => {
  const { width } = useWindowSize();

  return (
    <iframe
      width={width < 800 ? "240" : "400"}
      height={width < 800 ? "150" : "250"}
      className="m-auto"
      src={url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default YouTube;
