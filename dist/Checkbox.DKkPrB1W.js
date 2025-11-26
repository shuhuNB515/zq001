import { defineComponent, useSSRContext, mergeProps, withCtx, renderSlot, createVNode } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { Check } from "lucide-vue-next";
import { useForwardPropsEmits, CheckboxRoot, CheckboxIndicator } from "reka-ui";
import { _ as _export_sfc, c as cn } from "./_plugin-vue_export-helper.C7D2g9-_.js";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = defineComponent({ __name: "Checkbox", props: { defaultValue: { type: [Boolean, String] }, modelValue: { type: [Boolean, String, null] }, disabled: { type: Boolean }, value: {}, id: {}, asChild: { type: Boolean }, as: {}, name: {}, required: { type: Boolean }, class: {} }, emits: ["update:modelValue"], setup(__props, { expose: __expose, emit: __emit }) {
  __expose();
  const props = __props, emits = __emit, delegatedProps = reactiveOmit(props, "class"), forwarded = useForwardPropsEmits(delegatedProps, emits), __returned__ = { props, emits, delegatedProps, forwarded, get Check() {
    return Check;
  }, get CheckboxIndicator() {
    return CheckboxIndicator;
  }, get CheckboxRoot() {
    return CheckboxRoot;
  }, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.CheckboxRoot, mergeProps($setup.forwarded, { class: $setup.cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/checkbox/Checkbox.vue", "data-source-line-start": "18", "data-source-line-end": "29" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.CheckboxIndicator, { class: "grid place-content-center text-current", "data-source-file": "src/components/ui/checkbox/Checkbox.vue", "data-source-line-start": "24", "data-source-line-end": "28" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push3(ssrRenderComponent($setup.Check, { class: "h-4 w-4", "data-source-file": "src/components/ui/checkbox/Checkbox.vue", "data-source-line-start": "26", "data-source-line-end": "26" }, null, _parent3, _scopeId2));
      }, _push3, _parent3, _scopeId2);
      else return [renderSlot(_ctx.$slots, "default", {}, () => [createVNode($setup.Check, { class: "h-4 w-4", "data-source-file": "src/components/ui/checkbox/Checkbox.vue", "data-source-line-start": "26", "data-source-line-end": "26" })])];
    }), _: 3 }, _parent2, _scopeId));
    else return [createVNode($setup.CheckboxIndicator, { class: "grid place-content-center text-current", "data-source-file": "src/components/ui/checkbox/Checkbox.vue", "data-source-line-start": "24", "data-source-line-end": "28" }, { default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createVNode($setup.Check, { class: "h-4 w-4", "data-source-file": "src/components/ui/checkbox/Checkbox.vue", "data-source-line-start": "26", "data-source-line-end": "26" })])]), _: 3 })];
  }), _: 3 }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/checkbox/Checkbox.vue"), _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Checkbox = _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Checkbox as C
};
