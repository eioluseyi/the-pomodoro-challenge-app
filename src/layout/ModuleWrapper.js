import OptionsModal from "./OptionsModal";

function ModuleWrapper({ children, instruction, actionContent, options }) {
  return (
    <div className="module-wrapper">
      <div className="top-content">{children}</div>
      <div className="instruction">{instruction}</div>
      {actionContent && <div className="action-content">{actionContent}</div>}
      <OptionsModal {...{ options }} />
    </div>
  );
}

export default ModuleWrapper;
