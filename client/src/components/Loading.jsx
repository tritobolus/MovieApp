import { ThreeDot } from "react-loading-indicators";

const Loading = ({position}) => {
  return (
  <div className={`flex justify-center items-center ${position ? position : 'min-h-screen'}  `}>
  <ThreeDot
    variant="pulsate"
    color="#2e9dff"
    size="large"
    text="Loading"
    textColor=""
  />
</div>

  );
};

export default Loading;
