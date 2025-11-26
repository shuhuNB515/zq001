import { defineComponent, useSSRContext, mergeProps } from "vue";
import { useVModel } from "@vueuse/core";
import { _ as _export_sfc, c as cn } from "./_plugin-vue_export-helper.C7D2g9-_.js";
import { ssrRenderAttrs, ssrGetDynamicModelProps } from "vue/server-renderer";
const _sfc_main = defineComponent({ __name: "Input", props: { defaultValue: {}, modelValue: {}, class: {} }, emits: ["update:modelValue"], setup(__props, { expose: __expose, emit: __emit }) {
  __expose();
  const props = __props, emits = __emit, modelValue = useVModel(props, "modelValue", emits, { passive: true, defaultValue: props.defaultValue }), __returned__ = { props, emits, modelValue, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({ class: $setup.cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/input/Input.vue", "data-source-line-start": "23", "data-source-line-end": "23" }), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, $setup.modelValue))))}>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/input/Input.vue"), _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Input = _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Input as I
};
