const Loading = () => {
  return (
    <div className="text-5xl flex items-center bg-primary text-white justify-center fixed top-0 w-full h-full z-40">
      <div className="preloader">
        <div className="loader">
          <div className="shadow"></div>
          <div className="box"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
