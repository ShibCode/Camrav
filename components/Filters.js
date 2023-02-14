const filter_type_gap = "ml-[2rem]";
const filter_input_gap = "ml-[3.5rem]";

const Filters = () => {
  return (
    <div className="px-6 w-1/4 py-12">
      <h1 className="font-semibold text-4xl pb-4 border-b-2 border-black">
        Filters
      </h1>

      <div className="mt-4 flex flex-col gap-4">
        <h1 className={`text-xl font-semibold ${filter_type_gap}`}>Size</h1>

        <div className="flex flex-col gap-1">
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />S
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />
            SM
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />M
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />L
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />
            XL
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />
            XXL
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <h1 className={`text-xl font-semibold ${filter_type_gap}`}>Size</h1>

        <div className="flex flex-col gap-1">
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />S
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />
            SM
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />M
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />L
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />
            XL
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />
            XXL
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <h1 className={`text-xl font-semibold ${filter_type_gap}`}>Size</h1>

        <div className="flex flex-col gap-1">
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />S
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />
            SM
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />M
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />L
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />
            XL
          </div>
          <div className={`flex gap-2 items-center ${filter_input_gap}`}>
            <input type="checkbox" />
            XXL
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
