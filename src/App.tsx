import React, { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <div className="bg-gray-100 py-16 w-screen h-screen ">
        <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="col-span-6">
              <h1 className=" font-bold text-4xl md:text-5xl max-w-xl text-gray-900 leading-tight">
                08:11
              </h1>
              <h1 className=" font-bold text-3xl max-w-xl text-gray-900 leading-tight">
                Martedì, 22 Giugno
              </h1>
              <p className="text-gray-800 text-base leading-relaxed mt-8 font-semibold">
                calendar
              </p>
            </div>

            <div className="col-span-6">
              <h1 className=" font-bold text-3xl max-w-xl text-gray-900 leading-tight">
                right column
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
