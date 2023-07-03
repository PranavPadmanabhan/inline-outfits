import React from "react";
import TypeOfSpec from "./TypeOfSpec";

function Specification({ details }: { details: any }) {
  return (
    <div className="h-[100%] w-[100%] bg-white flex flex-col justify-start  items-center">
      <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col justify-start lg:items-center items-start">
        <TypeOfSpec Spec="Type" SpecDetails="Round Neck" />
        <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>

        <TypeOfSpec Spec="Size" SpecDetails="L" />
      </div>
      <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col  justify-start lg:items-center items-start">
        <TypeOfSpec Spec="Sleeve" SpecDetails="Half Sleeve" />
        <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
        <TypeOfSpec Spec="Fabric Care" SpecDetails="Gentle Machine Wash" />
      </div>
      <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex  lg:flex-row flex-col  justify-start lg:items-center items-start">
        <TypeOfSpec Spec="Fit" SpecDetails="Slim" />
        <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
        <TypeOfSpec Spec="Net Quantity" SpecDetails={1} />
      </div>
      <div className="lg:h-[25%] h-[15%] w-[100%] border-y-[1px] border-[#00000025] flex  lg:flex-row flex-col  justify-start lg:items-center items-start">
        <TypeOfSpec Spec="Fabric" SpecDetails="Cotton" />
      </div>
    </div>
  );
}

export default Specification;
