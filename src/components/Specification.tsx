import React from "react";
import TypeOfSpec from "./TypeOfSpec";

function Specification({ details }:{details:any}) {
  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-start items-center">
      <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex justify-start items-center">
        <TypeOfSpec Spec="Type" SpecDetails="Round Neck" />
        <TypeOfSpec Spec="Size" SpecDetails="L" />
      </div>
      <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex justify-start items-center">
        <TypeOfSpec Spec="Sleeve" SpecDetails="Half Sleeve" />
        <TypeOfSpec Spec="Fabric Care" SpecDetails="Gentle Machine Wash" />
      </div>
      <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex justify-start items-center">
        <TypeOfSpec Spec="Fit" SpecDetails="Slim" />
        <TypeOfSpec Spec="Net Quantity" SpecDetails={1} />
      </div>
      <div className="h-[25%] w-[100%] border-y-[1px] border-[#00000025] flex justify-start items-center">
        <TypeOfSpec Spec="Fabric" SpecDetails="Cotton" />
        
      </div>
    </div>
  );
}

export default Specification;
