import { Auth } from "../components/Auth";

export function Signin() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-slate-200">
        <div className="hidden lg:block">
          <div className="flex justify-center items-center h-full">
            <div>
              <p className="text-2xl font-bold text-gray-800 mt-4 uppercase">
                "WELL ,{" "}
              </p>
              <p className="text-2xl font-bold text-gray-800 uppercase">
                I THINK IF YOU want future to be good ,
              </p>
              <p className="text-2xl font-bold text-gray-800 uppercase ">
                you must make it so.
              </p>
              <p className="text-2xl font-bold text-gray-800 uppercase ">
                Take action to make it good ,
              </p>
              <p className="text-2xl font-bold text-gray-800 uppercase">
                and it will be."
              </p>
              <p className="text-md font-medium text-gray-500 mb-2 mt-2 uppercase">
                —Elon Musk
              </p>
            </div>
          </div>
        </div>
        <div>
          <Auth type="signin" />
        </div>
      </div>
    </>
  );
}
