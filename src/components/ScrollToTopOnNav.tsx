import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnNav = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  // Also scroll to top on initial page load / refresh
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return null;
};

export default ScrollToTopOnNav;
