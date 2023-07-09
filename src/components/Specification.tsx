import React from "react";
import TypeOfSpec from "./TypeOfSpec";

function Specification({ details,quantity,size }: { details: any;quantity:number; size:any }) {
  return (
    <div className="h-[100%] w-[100%] bg-white flex flex-col justify-start  items-center">
      <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col justify-start lg:items-center items-start">
        <TypeOfSpec Spec="Type" SpecDetails={details?.neckType} />
        <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>

        {
          size && <TypeOfSpec Spec="Size" SpecDetails={size} />
        }
      </div>
      <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col  justify-start lg:items-center items-start">
        <TypeOfSpec Spec="Sleeve" SpecDetails={details?.sleeveType} />
        <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
        <TypeOfSpec Spec="Fabric Care" SpecDetails={details?.fabricCare} />
      </div>
      <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex  lg:flex-row flex-col  justify-start lg:items-center items-start">
        <TypeOfSpec Spec="Fit" SpecDetails={details?.fit} />
        <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
        <TypeOfSpec Spec="Net Quantity" SpecDetails={quantity} />
      </div>
      <div className="lg:h-[25%] h-[15%] w-[100%] border-y-[1px] border-[#00000025] flex  lg:flex-row flex-col  justify-start lg:items-center items-start">
        <TypeOfSpec Spec="Fabric" SpecDetails={details?.fabric} />
      </div>
    </div>
  );
}

export default Specification;
