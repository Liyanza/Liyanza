import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="flex items-center justify-center gap-2.5 rounded-full border border-[#e4e4e7] bg-white py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa]"
      >
        <FcGoogle className="size-[18px]" aria-hidden="true" />
        Google
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2.5 rounded-full border border-[#e4e4e7] bg-white py-3 text-sm font-semibold text-[#3f3f46] transition hover:bg-[#fafafa]"
      >
        <FaFacebook className="size-[18px] text-[#1877f2]" aria-hidden="true" />
        Facebook
      </button>
    </div>
  );
}
