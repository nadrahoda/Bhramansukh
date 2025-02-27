import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

const Loader = () => {
  return (
    <div className="sweet-loading flex flex-col items-center justify-center">
      <ClipLoader
        color={"#3B82F6"}
        loading={true}
        cssOverride={override}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
