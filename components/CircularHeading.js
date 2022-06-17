import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
function Heading({ text, arc, radius }) {
  const characters = text.split("");
  const isMobile = useMediaQuery("(max-width:600px)");
  // lower the radius if the screen is small or medium size
  let radiusAdjustment = useMediaQuery("(max-width:800px)")
    ? radius * 0.8
    : radius;
  radiusAdjustment = useMediaQuery("(max-width:550px)")
    ? radiusAdjustment * 0.7
    : radiusAdjustment;
  arc = useMediaQuery("(max-width:550px)") ? 300 : arc;
  const degree = arc / characters.length;

  return (
    <Typography
      variant="h1"
      fontSize={{
        lg: 300,
        md: 100,
        sm: 30,
        xs: 30,
      }}
      sx={{ fontWeight: isMobile ? null : "bold" }}
    >
      {characters.map((char, i) => (
        <span
          data-aos="fade-up"
          data-aos-delay={(i % (characters.length / 2)) * 100}
          data-aos-anchor-placement="bottom-bottom"
          key={`heading-span-${i}`}
          style={{
            height: `${radiusAdjustment}px`,
            transform: `rotate(${degree * i - arc / 2}deg)`,
            transformOrigin: `0 ${radiusAdjustment}px 0`,
          }}
        >
          {char}
        </span>
      ))}
    </Typography>
  );
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  arc: PropTypes.number, // how curved do you want the text
  radius: PropTypes.number, // how big do you want the curve
};

Heading.defaultProps = {
  arc: 120,
  radius: 400,
};

export default Heading;
