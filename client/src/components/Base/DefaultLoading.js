import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./style.scss";
// Loading indicator
const DefaultLoading = (props) => {
  const {
    // isNotLoginScreen,
    opacity,
    target,
  } = props;

  const { totalLoadingProcess } = useSelector((state) => state.app);

  // Except login screen
  // TODO: Need to consider this case after implement login feature
  // if (!isNotLoginScreen) {
  if (totalLoadingProcess === 0) {
    // This is no on-going loading, disable loading indicator
    return "";
  }
  // }

  let gridContent = document.querySelector(target);
  if (!gridContent) {
    gridContent = document.querySelector("#root");
  }

  const loadingPanel = (
    <div className="loader">
      <div />
      <div />
      <div />
      <div />
    </div>
  );

  return ReactDOM.createPortal(loadingPanel, gridContent);
};

export default DefaultLoading;
