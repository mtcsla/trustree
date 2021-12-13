import { useWindowSize } from "../hooks/windowSize";

const YouTube = ({ url, style }: { url: string, style?: any }) => {

  return (
    <iframe
      width={style.width}
      height={style.height}

      src={url}
      style={style}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default YouTube;
