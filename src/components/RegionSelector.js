import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const RegionSelector = ({ region, regionList, setActiveRegion, mobile }) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = (locale) => {
    setOpen(false);
    if (locale) setActiveRegion(locale);
  };

  return (
    <div>
      <div className="dropdown">
        <button
          className={mobile ? "btn region-btn mobile" : "btn region-btn"}
          onClick={() => setOpen(!isOpen)}
        >
          <span className={mobile ? "region-text mobile" : "region-text"}>
            {region}
          </span>
        </button>
        {isOpen ? (
          <AnimatePresence>
            <motion.div
              layout
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 10, opacity: 1 }}
              exit={{ opacity: 0 }}
              className={mobile ? "dropdown-menu mobile" : "dropdown-menu"}
            >
              <ul className="dropdown-ul">
                {regionList.map((locale, idx) => {
                  return (
                    <li
                      className="dropdown-li"
                      key={idx}
                      onClick={() => handleClick(locale)}
                    >
                      {locale}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>
      <div
        className={isOpen ? "click-catcher open" : "click-catcher"}
        onClick={() => handleClick(null)}
      ></div>
    </div>
  );
};

export default RegionSelector;
