import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
export {
  _export_sfc as _,
  cn as c
};
