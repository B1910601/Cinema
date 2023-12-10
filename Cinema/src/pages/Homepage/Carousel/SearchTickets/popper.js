import React, { useEffect, useState } from "react";
import Popper from "@material-ui/core/Popper";
import { useHistory } from "react-router-dom";
export default function CustomPopper(props) {
  const { phim, setNewPhim, currentPhimPopup, rootElementPopup } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPopper, setShowPopper] = useState(false);
  const [widthImage, setwidthImage] = useState(200);
  const temporaryAnchorEl = React.useRef(null);
  const history = useHistory();
  const [imagePage404, setImagePage404] = useState(false);
  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.src = phim.hinhAnh;
    img.onload = function () {
      if (this.width > this.height && mounted) {
        setwidthImage(350);
      } else if (this.width === this.height && mounted) {
        setwidthImage(250);
      }
    };
    setAnchorEl(temporaryAnchorEl.current);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (phim.maPhim !== currentPhimPopup && currentPhimPopup) {
      setShowPopper(false);
    }
  }, [currentPhimPopup, phim.maPhim]);
  const handleMouseEnter = (element) => {
    setNewPhim(phim.maPhim); 
    setShowPopper(true);
    setAnchorEl(rootElementPopup);
  };

  return (
    <div
      className=""
      onMouseEnter={handleMouseEnter}
      ref={temporaryAnchorEl}
    >
      <p>{phim.tenPhim}</p>
      
    </div>
  );
}
