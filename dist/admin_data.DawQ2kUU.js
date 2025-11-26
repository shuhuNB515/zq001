import { defineComponent, useSSRContext, mergeProps, withCtx, createVNode, renderSlot, resolveDynamicComponent, createBlock, openBlock, Fragment, createTextVNode, toDisplayString, computed, ref, onMounted, renderList } from "vue";
import { cva } from "class-variance-authority";
import { _ as _export_sfc, c as cn } from "./_plugin-vue_export-helper.C7D2g9-_.js";
import { a as SheetContent, b as Sheet, B as Button, S as SafeIcon } from "./CommonHeader.u0BIjTIh.js";
import { createContext, Primitive, useForwardPropsEmits, TooltipRoot, TooltipPortal, TooltipContent as TooltipContent$1, TooltipProvider, TooltipTrigger as TooltipTrigger$1, Separator as Separator$1 } from "reka-ui";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderVNode, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { I as Input } from "./Input.CXETapsl.js";
import { reactiveOmit, useMediaQuery, useVModel, useEventListener, defaultDocument } from "@vueuse/core";
import { PanelLeft } from "lucide-vue-next";
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const [useSidebar, provideSidebarContext] = createContext("Sidebar");
const _sfc_main$w = defineComponent({ inheritAttrs: false, __name: "Sidebar", props: { side: { default: "left" }, variant: { default: "sidebar" }, collapsible: { default: "offcanvas" }, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, { isMobile, state, openMobile, setOpenMobile } = useSidebar(), __returned__ = { props, isMobile, state, openMobile, setOpenMobile, get cn() {
    return cn;
  }, get Sheet() {
    return Sheet;
  }, get SheetContent() {
    return SheetContent;
  }, get SIDEBAR_WIDTH_MOBILE() {
    return SIDEBAR_WIDTH_MOBILE;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$v(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  $props.collapsible === "none" ? (_push(`<div${ssrRenderAttrs(mergeProps({ class: $setup.cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", $setup.props.class) }, _ctx.$attrs, _attrs, { "data-source-file": "src/components/ui/sidebar/Sidebar.vue", "data-source-line-start": "21", "data-source-line-end": "27" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>")) : $setup.isMobile ? _push(ssrRenderComponent($setup.Sheet, mergeProps({ open: $setup.openMobile }, _ctx.$attrs, { "onUpdate:open": $setup.setOpenMobile }, _attrs, { "data-source-file": "src/components/ui/sidebar/Sidebar.vue", "data-source-line-start": "29", "data-source-line-end": "43" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.SheetContent, { "data-sidebar": "sidebar", "data-mobile": "true", side: $props.side, class: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden", style: { "--sidebar-width": $setup.SIDEBAR_WIDTH_MOBILE }, "data-source-file": "src/components/ui/sidebar/Sidebar.vue", "data-source-line-start": "30", "data-source-line-end": "42" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) _push3(`<div class="flex h-full w-full flex-col" data-source-file="src/components/ui/sidebar/Sidebar.vue" data-source-line-start="39" data-source-line-end="41"${_scopeId2}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2), _push3("</div>");
      else return [createVNode("div", { class: "flex h-full w-full flex-col", "data-source-file": "src/components/ui/sidebar/Sidebar.vue", "data-source-line-start": "39", "data-source-line-end": "41" }, [renderSlot(_ctx.$slots, "default")])];
    }), _: 3 }, _parent2, _scopeId));
    else return [createVNode($setup.SheetContent, { "data-sidebar": "sidebar", "data-mobile": "true", side: $props.side, class: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden", style: { "--sidebar-width": $setup.SIDEBAR_WIDTH_MOBILE }, "data-source-file": "src/components/ui/sidebar/Sidebar.vue", "data-source-line-start": "30", "data-source-line-end": "42" }, { default: withCtx(() => [createVNode("div", { class: "flex h-full w-full flex-col", "data-source-file": "src/components/ui/sidebar/Sidebar.vue", "data-source-line-start": "39", "data-source-line-end": "41" }, [renderSlot(_ctx.$slots, "default")])]), _: 3 }, 8, ["side", "style"])];
  }), _: 3 }, _parent)) : (_push(`<div${ssrRenderAttrs(mergeProps({ class: "group peer hidden md:block", "data-state": $setup.state, "data-collapsible": $setup.state === "collapsed" ? $props.collapsible : "", "data-variant": $props.variant, "data-side": $props.side }, _attrs, { "data-source-file": "src/components/ui/sidebar/Sidebar.vue", "data-source-line-start": "45", "data-source-line-end": "84" }))}><div class="${ssrRenderClass($setup.cn("duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", $props.variant === "floating" || $props.variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"))}" data-source-file="src/components/ui/sidebar/Sidebar.vue" data-source-line-start="53" data-source-line-end="62"></div><div${ssrRenderAttrs(mergeProps({ class: $setup.cn("duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex", $props.side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", $props.variant === "floating" || $props.variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+_2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l", $setup.props.class) }, _ctx.$attrs, { "data-source-file": "src/components/ui/sidebar/Sidebar.vue", "data-source-line-start": "63", "data-source-line-end": "83" }))}><div data-sidebar="sidebar" class="flex h-full w-full flex-col text-sidebar-foreground bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow" data-source-file="src/components/ui/sidebar/Sidebar.vue" data-source-line-start="77" data-source-line-end="82">`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div></div></div>"));
}
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/Sidebar.vue"), _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const Sidebar = _export_sfc(_sfc_main$w, [["ssrRender", _sfc_ssrRender$v]]);
const _sfc_main$v = defineComponent({ __name: "SidebarContent", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$u(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ "data-sidebar": "content", class: $setup.cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarContent.vue", "data-source-line-start": "11", "data-source-line-end": "16" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>");
}
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarContent.vue"), _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const SidebarContent = _export_sfc(_sfc_main$v, [["ssrRender", _sfc_ssrRender$u]]);
const _sfc_main$u = defineComponent({ __name: "SidebarFooter", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$t(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ "data-sidebar": "footer", class: $setup.cn("flex flex-col gap-2 p-2", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarFooter.vue", "data-source-line-start": "11", "data-source-line-end": "16" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>");
}
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarFooter.vue"), _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const SidebarFooter = _export_sfc(_sfc_main$u, [["ssrRender", _sfc_ssrRender$t]]);
const _sfc_main$t = defineComponent({ __name: "SidebarGroup", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$s(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ "data-sidebar": "group", class: $setup.cn("relative flex w-full min-w-0 flex-col p-2", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarGroup.vue", "data-source-line-start": "11", "data-source-line-end": "16" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>");
}
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroup.vue"), _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const SidebarGroup = _export_sfc(_sfc_main$t, [["ssrRender", _sfc_ssrRender$s]]);
const _sfc_main$s = defineComponent({ __name: "SidebarGroupAction", props: { asChild: { type: Boolean }, as: {}, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get Primitive() {
    return Primitive;
  }, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$r(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Primitive, mergeProps({ "data-sidebar": "group-action", as: $props.as, "as-child": $props.asChild, class: $setup.cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarGroupAction.vue", "data-source-line-start": "13", "data-source-line-end": "25" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroupAction.vue"), _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
_export_sfc(_sfc_main$s, [["ssrRender", _sfc_ssrRender$r]]);
const _sfc_main$r = defineComponent({ __name: "SidebarGroupContent", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$q(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ "data-sidebar": "group-content", class: $setup.cn("w-full text-sm", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarGroupContent.vue", "data-source-line-start": "11", "data-source-line-end": "16" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>");
}
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroupContent.vue"), _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const SidebarGroupContent = _export_sfc(_sfc_main$r, [["ssrRender", _sfc_ssrRender$q]]);
const _sfc_main$q = defineComponent({ __name: "SidebarGroupLabel", props: { asChild: { type: Boolean }, as: {}, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get Primitive() {
    return Primitive;
  }, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$p(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Primitive, mergeProps({ "data-sidebar": "group-label", as: $props.as, "as-child": $props.asChild, class: $setup.cn("duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarGroupLabel.vue", "data-source-line-start": "13", "data-source-line-end": "23" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroupLabel.vue"), _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const SidebarGroupLabel = _export_sfc(_sfc_main$q, [["ssrRender", _sfc_ssrRender$p]]);
const _sfc_main$p = defineComponent({ __name: "SidebarHeader", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$o(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ "data-sidebar": "header", class: $setup.cn("flex flex-col gap-2 p-2", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarHeader.vue", "data-source-line-start": "11", "data-source-line-end": "16" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>");
}
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarHeader.vue"), _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const SidebarHeader = _export_sfc(_sfc_main$p, [["ssrRender", _sfc_ssrRender$o]]);
const _sfc_main$o = defineComponent({ __name: "SidebarInput", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  }, get Input() {
    return Input;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$n(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Input, mergeProps({ "data-sidebar": "input", class: $setup.cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarInput.vue", "data-source-line-start": "12", "data-source-line-end": "20" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarInput.vue"), _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
_export_sfc(_sfc_main$o, [["ssrRender", _sfc_ssrRender$n]]);
const _sfc_main$n = defineComponent({ __name: "SidebarInset", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$m(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<main${ssrRenderAttrs(mergeProps({ class: $setup.cn("relative flex min-h-svh flex-1 flex-col bg-background", "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarInset.vue", "data-source-line-start": "11", "data-source-line-end": "19" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</main>");
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarInset.vue"), _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const SidebarInset = _export_sfc(_sfc_main$n, [["ssrRender", _sfc_ssrRender$m]]);
const _sfc_main$m = defineComponent({ __name: "SidebarMenu", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$l(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<ul${ssrRenderAttrs(mergeProps({ "data-sidebar": "menu", class: $setup.cn("flex w-full min-w-0 flex-col gap-1", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenu.vue", "data-source-line-start": "11", "data-source-line-end": "16" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</ul>");
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenu.vue"), _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const SidebarMenu = _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$l]]);
const _sfc_main$l = defineComponent({ __name: "SidebarMenuAction", props: { asChild: { type: Boolean }, as: { default: "button" }, showOnHover: { type: Boolean }, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get Primitive() {
    return Primitive;
  }, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$k(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Primitive, mergeProps({ "data-sidebar": "menu-action", class: $setup.cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", $props.showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", $setup.props.class), as: $props.as, "as-child": $props.asChild }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenuAction.vue", "data-source-line-start": "16", "data-source-line-end": "33" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuAction.vue"), _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
_export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$k]]);
const _sfc_main$k = defineComponent({ __name: "SidebarMenuBadge", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$j(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ "data-sidebar": "menu-badge", class: $setup.cn("absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenuBadge.vue", "data-source-line-start": "11", "data-source-line-end": "24" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>");
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuBadge.vue"), _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
_export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$j]]);
const _sfc_main$j = defineComponent({ __name: "Tooltip", props: { defaultOpen: { type: Boolean }, open: { type: Boolean }, delayDuration: {}, disableHoverableContent: { type: Boolean }, disableClosingTrigger: { type: Boolean }, disabled: { type: Boolean }, ignoreNonKeyboardFocus: { type: Boolean } }, emits: ["update:open"], setup(__props, { expose: __expose, emit: __emit }) {
  __expose();
  const props = __props, emits = __emit, forwarded = useForwardPropsEmits(props, emits), __returned__ = { props, emits, forwarded, get TooltipRoot() {
    return TooltipRoot;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$i(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.TooltipRoot, mergeProps($setup.forwarded, _attrs, { "data-source-file": "src/components/ui/tooltip/Tooltip.vue", "data-source-line-start": "12", "data-source-line-end": "14" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/Tooltip.vue"), _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const Tooltip = _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$i]]);
const _sfc_main$i = defineComponent({ inheritAttrs: false, __name: "TooltipContent", props: { forceMount: { type: Boolean }, ariaLabel: {}, asChild: { type: Boolean }, as: {}, side: {}, sideOffset: { default: 4 }, align: {}, alignOffset: {}, avoidCollisions: { type: Boolean }, collisionBoundary: {}, collisionPadding: {}, arrowPadding: {}, sticky: {}, hideWhenDetached: { type: Boolean }, positionStrategy: {}, updatePositionStrategy: {}, class: {} }, emits: ["escapeKeyDown", "pointerDownOutside"], setup(__props, { expose: __expose, emit: __emit }) {
  __expose();
  const props = __props, emits = __emit, delegatedProps = reactiveOmit(props, "class"), forwarded = useForwardPropsEmits(delegatedProps, emits), __returned__ = { props, emits, delegatedProps, forwarded, get TooltipContent() {
    return TooltipContent$1;
  }, get TooltipPortal() {
    return TooltipPortal;
  }, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.TooltipPortal, mergeProps(_attrs, { "data-source-file": "src/components/ui/tooltip/TooltipContent.vue", "data-source-line-start": "24", "data-source-line-end": "28" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.TooltipContent, mergeProps({ ...$setup.forwarded, ..._ctx.$attrs }, { class: $setup.cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", $setup.props.class), "data-source-file": "src/components/ui/tooltip/TooltipContent.vue", "data-source-line-start": "25", "data-source-line-end": "27" }), { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
      else return [renderSlot(_ctx.$slots, "default")];
    }), _: 3 }, _parent2, _scopeId));
    else return [createVNode($setup.TooltipContent, mergeProps({ ...$setup.forwarded, ..._ctx.$attrs }, { class: $setup.cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", $setup.props.class), "data-source-file": "src/components/ui/tooltip/TooltipContent.vue", "data-source-line-start": "25", "data-source-line-end": "27" }), { default: withCtx(() => [renderSlot(_ctx.$slots, "default")]), _: 3 }, 16, ["class"])];
  }), _: 3 }, _parent));
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipContent.vue"), _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const TooltipContent = _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$h]]);
const _sfc_main$h = defineComponent({ __name: "TooltipProvider", props: { delayDuration: {}, skipDelayDuration: {}, disableHoverableContent: { type: Boolean }, disableClosingTrigger: { type: Boolean }, disabled: { type: Boolean }, ignoreNonKeyboardFocus: { type: Boolean } }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get TooltipProvider() {
    return TooltipProvider;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.TooltipProvider, mergeProps($setup.props, _attrs, { "data-source-file": "src/components/ui/tooltip/TooltipProvider.vue", "data-source-line-start": "9", "data-source-line-end": "11" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipProvider.vue"), _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
_export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$g]]);
const _sfc_main$g = defineComponent({ __name: "TooltipTrigger", props: { reference: {}, asChild: { type: Boolean }, as: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get TooltipTrigger() {
    return TooltipTrigger$1;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.TooltipTrigger, mergeProps($setup.props, _attrs, { "data-source-file": "src/components/ui/tooltip/TooltipTrigger.vue", "data-source-line-start": "9", "data-source-line-end": "11" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipTrigger.vue"), _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const TooltipTrigger = _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$f]]);
const _sfc_main$f = defineComponent({ __name: "SidebarMenuButtonChild", props: { variant: { default: "default" }, size: { default: "default" }, isActive: { type: Boolean }, class: {}, asChild: { type: Boolean }, as: { default: "button" } }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get Primitive() {
    return Primitive;
  }, get cn() {
    return cn;
  }, get sidebarMenuButtonVariants() {
    return sidebarMenuButtonVariants;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Primitive, mergeProps({ "data-sidebar": "menu-button", "data-size": $props.size, "data-active": $props.isActive, class: $setup.cn($setup.sidebarMenuButtonVariants({ variant: $props.variant, size: $props.size }), $setup.props.class), as: $props.as, "as-child": $props.asChild }, _ctx.$attrs, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenuButtonChild.vue", "data-source-line-start": "24", "data-source-line-end": "34" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuButtonChild.vue"), _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const SidebarMenuButtonChild = _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$e]]);
const _sfc_main$e = defineComponent({ inheritAttrs: false, __name: "SidebarMenuButton", props: { variant: { default: "default" }, size: { default: "default" }, isActive: { type: Boolean }, class: {}, asChild: { type: Boolean }, as: { default: "button" }, tooltip: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, { isMobile, state } = useSidebar(), delegatedProps = reactiveOmit(props, "tooltip"), __returned__ = { props, isMobile, state, delegatedProps, get Tooltip() {
    return Tooltip;
  }, get TooltipContent() {
    return TooltipContent;
  }, get TooltipTrigger() {
    return TooltipTrigger;
  }, SidebarMenuButtonChild };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  $props.tooltip ? _push(ssrRenderComponent($setup.Tooltip, mergeProps(_attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "31", "data-source-line-end": "47" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.TooltipTrigger, { "as-child": "", "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "32", "data-source-line-end": "36" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) _push3(ssrRenderComponent($setup.SidebarMenuButtonChild, mergeProps({ ...$setup.delegatedProps, ..._ctx.$attrs }, { "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "33", "data-source-line-end": "35" }), { default: withCtx((_3, _push4, _parent4, _scopeId3) => {
        if (_push4) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
        else return [renderSlot(_ctx.$slots, "default")];
      }), _: 3 }, _parent3, _scopeId2));
      else return [createVNode($setup.SidebarMenuButtonChild, mergeProps({ ...$setup.delegatedProps, ..._ctx.$attrs }, { "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "33", "data-source-line-end": "35" }), { default: withCtx(() => [renderSlot(_ctx.$slots, "default")]), _: 3 }, 16)];
    }), _: 3 }, _parent2, _scopeId)), _push2(ssrRenderComponent($setup.TooltipContent, { side: "right", align: "center", hidden: $setup.state !== "collapsed" || $setup.isMobile, "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "37", "data-source-line-end": "46" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) typeof $props.tooltip == "string" ? _push3(`<!--[-->${ssrInterpolate($props.tooltip)}<!--]-->`) : ssrRenderVNode(_push3, createVNode(resolveDynamicComponent($props.tooltip), { "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "45", "data-source-line-end": "45" }, null), _parent3, _scopeId2);
      else return [typeof $props.tooltip == "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString($props.tooltip), 1)], 64)) : (openBlock(), createBlock(resolveDynamicComponent($props.tooltip), { key: 1, "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "45", "data-source-line-end": "45" }))];
    }), _: 1 }, _parent2, _scopeId));
    else return [createVNode($setup.TooltipTrigger, { "as-child": "", "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "32", "data-source-line-end": "36" }, { default: withCtx(() => [createVNode($setup.SidebarMenuButtonChild, mergeProps({ ...$setup.delegatedProps, ..._ctx.$attrs }, { "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "33", "data-source-line-end": "35" }), { default: withCtx(() => [renderSlot(_ctx.$slots, "default")]), _: 3 }, 16)]), _: 3 }), createVNode($setup.TooltipContent, { side: "right", align: "center", hidden: $setup.state !== "collapsed" || $setup.isMobile, "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "37", "data-source-line-end": "46" }, { default: withCtx(() => [typeof $props.tooltip == "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString($props.tooltip), 1)], 64)) : (openBlock(), createBlock(resolveDynamicComponent($props.tooltip), { key: 1, "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "45", "data-source-line-end": "45" }))]), _: 1 }, 8, ["hidden"])];
  }), _: 3 }, _parent)) : _push(ssrRenderComponent($setup.SidebarMenuButtonChild, mergeProps({ ...$setup.delegatedProps, ..._ctx.$attrs }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenuButton.vue", "data-source-line-start": "27", "data-source-line-end": "29" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuButton.vue"), _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const SidebarMenuButton = _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$d]]);
const _sfc_main$d = defineComponent({ __name: "SidebarMenuItem", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<li${ssrRenderAttrs(mergeProps({ "data-sidebar": "menu-item", class: $setup.cn("group/menu-item relative", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenuItem.vue", "data-source-line-start": "11", "data-source-line-end": "16" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</li>");
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuItem.vue"), _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const SidebarMenuItem = _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$c]]);
const _sfc_main$c = defineComponent({ __name: "Skeleton", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: $setup.cn("animate-pulse rounded-md bg-muted", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/skeleton/Skeleton.vue", "data-source-line-start": "13", "data-source-line-end": "13" }))}></div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/skeleton/Skeleton.vue"), _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const Skeleton = _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$b]]);
const _sfc_main$b = defineComponent({ __name: "SidebarMenuSkeleton", props: { showIcon: { type: Boolean }, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, width = computed(() => `${Math.floor(Math.random() * 40) + 50}%`), __returned__ = { props, width, get cn() {
    return cn;
  }, get Skeleton() {
    return Skeleton;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ "data-sidebar": "menu-skeleton", class: $setup.cn("rounded-md h-8 flex gap-2 px-2 items-center", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenuSkeleton.vue", "data-source-line-start": "18", "data-source-line-end": "33" }))}>`), $props.showIcon ? _push(ssrRenderComponent($setup.Skeleton, { class: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon", "data-source-file": "src/components/ui/sidebar/SidebarMenuSkeleton.vue", "data-source-line-start": "22", "data-source-line-end": "26" }, null, _parent)) : _push("<!---->"), _push(ssrRenderComponent($setup.Skeleton, { class: "h-4 flex-1 max-w-[--skeleton-width]", "data-sidebar": "menu-skeleton-text", style: { "--skeleton-width": $setup.width }, "data-source-file": "src/components/ui/sidebar/SidebarMenuSkeleton.vue", "data-source-line-start": "28", "data-source-line-end": "32" }, null, _parent)), _push("</div>");
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSkeleton.vue"), _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
_export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$a]]);
const _sfc_main$a = defineComponent({ __name: "SidebarMenuSub", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<ul${ssrRenderAttrs(mergeProps({ "data-sidebar": "menu-badge", class: $setup.cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenuSub.vue", "data-source-line-start": "11", "data-source-line-end": "20" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</ul>");
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSub.vue"), _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
_export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$9]]);
const _sfc_main$9 = defineComponent({ __name: "SidebarMenuSubButton", props: { asChild: { type: Boolean }, as: { default: "a" }, size: { default: "md" }, isActive: { type: Boolean }, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get Primitive() {
    return Primitive;
  }, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Primitive, mergeProps({ "data-sidebar": "menu-sub-button", as: $props.as, "as-child": $props.asChild, "data-size": $props.size, "data-active": $props.isActive, class: $setup.cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", $props.size === "sm" && "text-xs", $props.size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarMenuSubButton.vue", "data-source-line-start": "18", "data-source-line-end": "34" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSubButton.vue"), _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
_export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$8 = {};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSubItem.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = defineComponent({ __name: "SidebarProvider", props: { defaultOpen: { type: Boolean, default: !defaultDocument?.cookie.includes(`${SIDEBAR_COOKIE_NAME}=false`) }, open: { type: Boolean, default: void 0 }, class: {} }, emits: ["update:open"], setup(__props, { expose: __expose, emit: __emit }) {
  __expose();
  const props = __props, emits = __emit, isMobile = useMediaQuery("(max-width: 768px)"), openMobile = ref(false), open = useVModel(props, "open", emits, { defaultValue: props.defaultOpen ?? false, passive: props.open === void 0 });
  function setOpen(value) {
    open.value = value, document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }
  function setOpenMobile(value) {
    openMobile.value = value;
  }
  function toggleSidebar() {
    return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
  }
  useEventListener("keydown", (event) => {
    event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey) && (event.preventDefault(), toggleSidebar());
  });
  const state = computed(() => open.value ? "expanded" : "collapsed");
  provideSidebarContext({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar });
  const __returned__ = { props, emits, isMobile, openMobile, open, setOpen, setOpenMobile, toggleSidebar, state, get TooltipProvider() {
    return TooltipProvider;
  }, get cn() {
    return cn;
  }, get SIDEBAR_WIDTH() {
    return SIDEBAR_WIDTH;
  }, get SIDEBAR_WIDTH_ICON() {
    return SIDEBAR_WIDTH_ICON;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.TooltipProvider, mergeProps({ "delay-duration": 0 }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarProvider.vue", "data-source-line-start": "69", "data-source-line-end": "80" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(`<div${ssrRenderAttrs(mergeProps({ style: { "--sidebar-width": $setup.SIDEBAR_WIDTH, "--sidebar-width-icon": $setup.SIDEBAR_WIDTH_ICON }, class: $setup.cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", $setup.props.class) }, _ctx.$attrs, { "data-source-file": "src/components/ui/sidebar/SidebarProvider.vue", "data-source-line-start": "70", "data-source-line-end": "79" }))}${_scopeId}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId), _push2("</div>");
    else return [createVNode("div", mergeProps({ style: { "--sidebar-width": $setup.SIDEBAR_WIDTH, "--sidebar-width-icon": $setup.SIDEBAR_WIDTH_ICON }, class: $setup.cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", $setup.props.class) }, _ctx.$attrs, { "data-source-file": "src/components/ui/sidebar/SidebarProvider.vue", "data-source-line-start": "70", "data-source-line-end": "79" }), [renderSlot(_ctx.$slots, "default")], 16)];
  }), _: 3 }, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarProvider.vue"), _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const SidebarProvider = _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$6 = defineComponent({ __name: "SidebarRail", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, { toggleSidebar } = useSidebar(), __returned__ = { props, toggleSidebar, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(mergeProps({ "data-sidebar": "rail", "aria-label": "Toggle Sidebar", tabindex: -1, title: "Toggle Sidebar", class: $setup.cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarRail.vue", "data-source-line-start": "14", "data-source-line-end": "31" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</button>");
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarRail.vue"), _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
_export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$5 = defineComponent({ __name: "Separator", props: { orientation: { default: "horizontal" }, decorative: { type: Boolean, default: true }, asChild: { type: Boolean }, as: {}, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, delegatedProps = reactiveOmit(props, "class"), __returned__ = { props, delegatedProps, get Separator() {
    return Separator$1;
  }, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Separator, mergeProps($setup.delegatedProps, { class: $setup.cn("shrink-0 bg-border", $setup.props.orientation === "horizontal" ? "h-px w-full" : "w-px h-full", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/separator/Separator.vue", "data-source-line-start": "19", "data-source-line-end": "28" }), null, _parent));
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/separator/Separator.vue"), _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Separator = _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$4 = defineComponent({ __name: "SidebarSeparator", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  }, get Separator() {
    return Separator;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Separator, mergeProps({ "data-sidebar": "separator", class: $setup.cn("mx-2 w-auto bg-sidebar-border", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarSeparator.vue", "data-source-line-start": "12", "data-source-line-end": "17" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarSeparator.vue"), _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$3 = defineComponent({ __name: "SidebarTrigger", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, { toggleSidebar } = useSidebar(), __returned__ = { props, toggleSidebar, get PanelLeft() {
    return PanelLeft;
  }, get cn() {
    return cn;
  }, get Button() {
    return Button;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Button, mergeProps({ "data-sidebar": "trigger", variant: "ghost", size: "icon", class: $setup.cn("h-7 w-7", $setup.props.class), onClick: $setup.toggleSidebar }, _attrs, { "data-source-file": "src/components/ui/sidebar/SidebarTrigger.vue", "data-source-line-start": "16", "data-source-line-end": "25" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.PanelLeft, { "data-source-file": "src/components/ui/sidebar/SidebarTrigger.vue", "data-source-line-start": "23", "data-source-line-end": "23" }, null, _parent2, _scopeId)), _push2(`<span class="sr-only" data-source-file="src/components/ui/sidebar/SidebarTrigger.vue" data-source-line-start="24" data-source-line-end="24"${_scopeId}>Toggle Sidebar</span>`);
    else return [createVNode($setup.PanelLeft, { "data-source-file": "src/components/ui/sidebar/SidebarTrigger.vue", "data-source-line-start": "23", "data-source-line-end": "23" }), createVNode("span", { class: "sr-only", "data-source-file": "src/components/ui/sidebar/SidebarTrigger.vue", "data-source-line-start": "24", "data-source-line-end": "24" }, "Toggle Sidebar")];
  }), _: 1 }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarTrigger.vue"), _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$2 = defineComponent({ __name: "AdminSidebar", setup(__props, { expose: __expose }) {
  __expose();
  const currentPath = ref("");
  onMounted(() => {
    typeof window < "u" && (currentPath.value = window.location.pathname);
  });
  const __returned__ = { currentPath, menuItems: [{ title: "概览", items: [{ name: "管理台主页", href: "./admin-dashboard.html", icon: "LayoutDashboard" }] }, { title: "核心功能", items: [{ name: "快件管理", href: "./admin-package-management.html", icon: "Package" }, { name: "设备监控", href: "./admin-device-monitoring.html", icon: "Monitor" }, { name: "用户管理", href: "./admin-user-management.html", icon: "Users" }, { name: "基础设置", href: "./admin-settings.html", icon: "Settings" }] }], handleLogout: () => {
    typeof window < "u" && (window.location.href = "./homepage.html");
  }, get Sidebar() {
    return Sidebar;
  }, get SidebarContent() {
    return SidebarContent;
  }, get SidebarGroup() {
    return SidebarGroup;
  }, get SidebarGroupContent() {
    return SidebarGroupContent;
  }, get SidebarGroupLabel() {
    return SidebarGroupLabel;
  }, get SidebarMenu() {
    return SidebarMenu;
  }, get SidebarMenuItem() {
    return SidebarMenuItem;
  }, get SidebarMenuButton() {
    return SidebarMenuButton;
  }, get SidebarHeader() {
    return SidebarHeader;
  }, get SidebarFooter() {
    return SidebarFooter;
  }, SafeIcon, get Button() {
    return Button;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Sidebar, mergeProps({ class: "top-[--header-height] h-[calc(100vh-var(--header-height))]", variant: "inset" }, _attrs, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "53", "data-source-line-end": "97" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.SidebarHeader, { class: "border-b border-sidebar-border p-4", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "57", "data-source-line-end": "64" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) _push3(`<div class="flex items-center space-x-2" data-source-file="src/components/common/AdminSidebar.vue" data-source-line-start="58" data-source-line-end="63"${_scopeId2}><div class="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center" data-source-file="src/components/common/AdminSidebar.vue" data-source-line-start="59" data-source-line-end="61"${_scopeId2}>`), _push3(ssrRenderComponent($setup.SafeIcon, { name: "Shield", size: 18, color: "white", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "60", "data-source-line-end": "60" }, null, _parent3, _scopeId2)), _push3(`</div><span class="font-semibold text-sidebar-foreground" data-source-file="src/components/common/AdminSidebar.vue" data-source-line-start="62" data-source-line-end="62"${_scopeId2}>管理后台</span></div>`);
      else return [createVNode("div", { class: "flex items-center space-x-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "58", "data-source-line-end": "63" }, [createVNode("div", { class: "w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "59", "data-source-line-end": "61" }, [createVNode($setup.SafeIcon, { name: "Shield", size: 18, color: "white", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "60", "data-source-line-end": "60" })]), createVNode("span", { class: "font-semibold text-sidebar-foreground", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "62", "data-source-line-end": "62" }, "管理后台")])];
    }), _: 1 }, _parent2, _scopeId)), _push2(ssrRenderComponent($setup.SidebarContent, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "66", "data-source-line-end": "85" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) _push3("<!--[-->"), ssrRenderList($setup.menuItems, (group) => {
        _push3(ssrRenderComponent($setup.SidebarGroup, { key: group.title, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "67", "data-source-line-end": "84" }, { default: withCtx((_3, _push4, _parent4, _scopeId3) => {
          if (_push4) _push4(ssrRenderComponent($setup.SidebarGroupLabel, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "68", "data-source-line-end": "68" }, { default: withCtx((_4, _push5, _parent5, _scopeId4) => {
            if (_push5) _push5(`${ssrInterpolate(group.title)}`);
            else return [createTextVNode(toDisplayString(group.title), 1)];
          }), _: 2 }, _parent4, _scopeId3)), _push4(ssrRenderComponent($setup.SidebarGroupContent, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "69", "data-source-line-end": "83" }, { default: withCtx((_4, _push5, _parent5, _scopeId4) => {
            if (_push5) _push5(ssrRenderComponent($setup.SidebarMenu, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "70", "data-source-line-end": "82" }, { default: withCtx((_5, _push6, _parent6, _scopeId5) => {
              if (_push6) _push6("<!--[-->"), ssrRenderList(group.items, (item) => {
                _push6(ssrRenderComponent($setup.SidebarMenuItem, { key: item.name, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "71", "data-source-line-end": "81" }, { default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                  if (_push7) _push7(ssrRenderComponent($setup.SidebarMenuButton, { "as-child": "", "is-active": $setup.currentPath.includes(item.href.replace(".html", "")), "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "72", "data-source-line-end": "80" }, { default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                    if (_push8) _push8(`<a${ssrRenderAttr("href", item.href)} class="flex items-center" data-source-file="src/components/common/AdminSidebar.vue" data-source-line-start="76" data-source-line-end="79"${_scopeId7}>`), _push8(ssrRenderComponent($setup.SafeIcon, { name: item.icon, size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "77", "data-source-line-end": "77" }, null, _parent8, _scopeId7)), _push8(`<span data-source-file="src/components/common/AdminSidebar.vue" data-source-line-start="78" data-source-line-end="78"${_scopeId7}>${ssrInterpolate(item.name)}</span></a>`);
                    else return [createVNode("a", { href: item.href, class: "flex items-center", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "76", "data-source-line-end": "79" }, [createVNode($setup.SafeIcon, { name: item.icon, size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "77", "data-source-line-end": "77" }, null, 8, ["name"]), createVNode("span", { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "78", "data-source-line-end": "78" }, toDisplayString(item.name), 1)], 8, ["href"])];
                  }), _: 2 }, _parent7, _scopeId6));
                  else return [createVNode($setup.SidebarMenuButton, { "as-child": "", "is-active": $setup.currentPath.includes(item.href.replace(".html", "")), "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "72", "data-source-line-end": "80" }, { default: withCtx(() => [createVNode("a", { href: item.href, class: "flex items-center", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "76", "data-source-line-end": "79" }, [createVNode($setup.SafeIcon, { name: item.icon, size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "77", "data-source-line-end": "77" }, null, 8, ["name"]), createVNode("span", { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "78", "data-source-line-end": "78" }, toDisplayString(item.name), 1)], 8, ["href"])]), _: 2 }, 1032, ["is-active"])];
                }), _: 2 }, _parent6, _scopeId5));
              }), _push6("<!--]-->");
              else return [(openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => (openBlock(), createBlock($setup.SidebarMenuItem, { key: item.name, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "71", "data-source-line-end": "81" }, { default: withCtx(() => [createVNode($setup.SidebarMenuButton, { "as-child": "", "is-active": $setup.currentPath.includes(item.href.replace(".html", "")), "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "72", "data-source-line-end": "80" }, { default: withCtx(() => [createVNode("a", { href: item.href, class: "flex items-center", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "76", "data-source-line-end": "79" }, [createVNode($setup.SafeIcon, { name: item.icon, size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "77", "data-source-line-end": "77" }, null, 8, ["name"]), createVNode("span", { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "78", "data-source-line-end": "78" }, toDisplayString(item.name), 1)], 8, ["href"])]), _: 2 }, 1032, ["is-active"])]), _: 2 }, 1024))), 128))];
            }), _: 2 }, _parent5, _scopeId4));
            else return [createVNode($setup.SidebarMenu, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "70", "data-source-line-end": "82" }, { default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => (openBlock(), createBlock($setup.SidebarMenuItem, { key: item.name, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "71", "data-source-line-end": "81" }, { default: withCtx(() => [createVNode($setup.SidebarMenuButton, { "as-child": "", "is-active": $setup.currentPath.includes(item.href.replace(".html", "")), "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "72", "data-source-line-end": "80" }, { default: withCtx(() => [createVNode("a", { href: item.href, class: "flex items-center", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "76", "data-source-line-end": "79" }, [createVNode($setup.SafeIcon, { name: item.icon, size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "77", "data-source-line-end": "77" }, null, 8, ["name"]), createVNode("span", { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "78", "data-source-line-end": "78" }, toDisplayString(item.name), 1)], 8, ["href"])]), _: 2 }, 1032, ["is-active"])]), _: 2 }, 1024))), 128))]), _: 2 }, 1024)];
          }), _: 2 }, _parent4, _scopeId3));
          else return [createVNode($setup.SidebarGroupLabel, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "68", "data-source-line-end": "68" }, { default: withCtx(() => [createTextVNode(toDisplayString(group.title), 1)]), _: 2 }, 1024), createVNode($setup.SidebarGroupContent, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "69", "data-source-line-end": "83" }, { default: withCtx(() => [createVNode($setup.SidebarMenu, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "70", "data-source-line-end": "82" }, { default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => (openBlock(), createBlock($setup.SidebarMenuItem, { key: item.name, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "71", "data-source-line-end": "81" }, { default: withCtx(() => [createVNode($setup.SidebarMenuButton, { "as-child": "", "is-active": $setup.currentPath.includes(item.href.replace(".html", "")), "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "72", "data-source-line-end": "80" }, { default: withCtx(() => [createVNode("a", { href: item.href, class: "flex items-center", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "76", "data-source-line-end": "79" }, [createVNode($setup.SafeIcon, { name: item.icon, size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "77", "data-source-line-end": "77" }, null, 8, ["name"]), createVNode("span", { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "78", "data-source-line-end": "78" }, toDisplayString(item.name), 1)], 8, ["href"])]), _: 2 }, 1032, ["is-active"])]), _: 2 }, 1024))), 128))]), _: 2 }, 1024)]), _: 2 }, 1024)];
        }), _: 2 }, _parent3, _scopeId2));
      }), _push3("<!--]-->");
      else return [(openBlock(), createBlock(Fragment, null, renderList($setup.menuItems, (group) => createVNode($setup.SidebarGroup, { key: group.title, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "67", "data-source-line-end": "84" }, { default: withCtx(() => [createVNode($setup.SidebarGroupLabel, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "68", "data-source-line-end": "68" }, { default: withCtx(() => [createTextVNode(toDisplayString(group.title), 1)]), _: 2 }, 1024), createVNode($setup.SidebarGroupContent, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "69", "data-source-line-end": "83" }, { default: withCtx(() => [createVNode($setup.SidebarMenu, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "70", "data-source-line-end": "82" }, { default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => (openBlock(), createBlock($setup.SidebarMenuItem, { key: item.name, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "71", "data-source-line-end": "81" }, { default: withCtx(() => [createVNode($setup.SidebarMenuButton, { "as-child": "", "is-active": $setup.currentPath.includes(item.href.replace(".html", "")), "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "72", "data-source-line-end": "80" }, { default: withCtx(() => [createVNode("a", { href: item.href, class: "flex items-center", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "76", "data-source-line-end": "79" }, [createVNode($setup.SafeIcon, { name: item.icon, size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "77", "data-source-line-end": "77" }, null, 8, ["name"]), createVNode("span", { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "78", "data-source-line-end": "78" }, toDisplayString(item.name), 1)], 8, ["href"])]), _: 2 }, 1032, ["is-active"])]), _: 2 }, 1024))), 128))]), _: 2 }, 1024)]), _: 2 }, 1024)]), _: 2 }, 1024)), 64))];
    }), _: 1 }, _parent2, _scopeId)), _push2(ssrRenderComponent($setup.SidebarFooter, { class: "border-t border-sidebar-border p-4", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "87", "data-source-line-end": "96" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) _push3(ssrRenderComponent($setup.Button, { variant: "ghost", class: "w-full justify-start", onClick: $setup.handleLogout, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "88", "data-source-line-end": "95" }, { default: withCtx((_3, _push4, _parent4, _scopeId3) => {
        if (_push4) _push4(ssrRenderComponent($setup.SafeIcon, { name: "LogOut", size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "93", "data-source-line-end": "93" }, null, _parent4, _scopeId3)), _push4(" 退出登录 ");
        else return [createVNode($setup.SafeIcon, { name: "LogOut", size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "93", "data-source-line-end": "93" }), createTextVNode(" 退出登录 ")];
      }), _: 1 }, _parent3, _scopeId2));
      else return [createVNode($setup.Button, { variant: "ghost", class: "w-full justify-start", onClick: $setup.handleLogout, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "88", "data-source-line-end": "95" }, { default: withCtx(() => [createVNode($setup.SafeIcon, { name: "LogOut", size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "93", "data-source-line-end": "93" }), createTextVNode(" 退出登录 ")]), _: 1 })];
    }), _: 1 }, _parent2, _scopeId));
    else return [createVNode($setup.SidebarHeader, { class: "border-b border-sidebar-border p-4", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "57", "data-source-line-end": "64" }, { default: withCtx(() => [createVNode("div", { class: "flex items-center space-x-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "58", "data-source-line-end": "63" }, [createVNode("div", { class: "w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "59", "data-source-line-end": "61" }, [createVNode($setup.SafeIcon, { name: "Shield", size: 18, color: "white", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "60", "data-source-line-end": "60" })]), createVNode("span", { class: "font-semibold text-sidebar-foreground", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "62", "data-source-line-end": "62" }, "管理后台")])]), _: 1 }), createVNode($setup.SidebarContent, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "66", "data-source-line-end": "85" }, { default: withCtx(() => [(openBlock(), createBlock(Fragment, null, renderList($setup.menuItems, (group) => createVNode($setup.SidebarGroup, { key: group.title, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "67", "data-source-line-end": "84" }, { default: withCtx(() => [createVNode($setup.SidebarGroupLabel, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "68", "data-source-line-end": "68" }, { default: withCtx(() => [createTextVNode(toDisplayString(group.title), 1)]), _: 2 }, 1024), createVNode($setup.SidebarGroupContent, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "69", "data-source-line-end": "83" }, { default: withCtx(() => [createVNode($setup.SidebarMenu, { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "70", "data-source-line-end": "82" }, { default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => (openBlock(), createBlock($setup.SidebarMenuItem, { key: item.name, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "71", "data-source-line-end": "81" }, { default: withCtx(() => [createVNode($setup.SidebarMenuButton, { "as-child": "", "is-active": $setup.currentPath.includes(item.href.replace(".html", "")), "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "72", "data-source-line-end": "80" }, { default: withCtx(() => [createVNode("a", { href: item.href, class: "flex items-center", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "76", "data-source-line-end": "79" }, [createVNode($setup.SafeIcon, { name: item.icon, size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "77", "data-source-line-end": "77" }, null, 8, ["name"]), createVNode("span", { "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "78", "data-source-line-end": "78" }, toDisplayString(item.name), 1)], 8, ["href"])]), _: 2 }, 1032, ["is-active"])]), _: 2 }, 1024))), 128))]), _: 2 }, 1024)]), _: 2 }, 1024)]), _: 2 }, 1024)), 64))]), _: 1 }), createVNode($setup.SidebarFooter, { class: "border-t border-sidebar-border p-4", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "87", "data-source-line-end": "96" }, { default: withCtx(() => [createVNode($setup.Button, { variant: "ghost", class: "w-full justify-start", onClick: $setup.handleLogout, "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "88", "data-source-line-end": "95" }, { default: withCtx(() => [createVNode($setup.SafeIcon, { name: "LogOut", size: 18, class: "mr-2", "data-source-file": "src/components/common/AdminSidebar.vue", "data-source-line-start": "93", "data-source-line-end": "93" }), createTextVNode(" 退出登录 ")]), _: 1 })]), _: 1 })];
  }), _: 1 }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/AdminSidebar.vue"), _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AdminSidebar = _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = defineComponent({ __name: "AdminLayout", props: { headerHeight: { default: "80px" } }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get SidebarProvider() {
    return SidebarProvider;
  }, get SidebarInset() {
    return SidebarInset;
  }, AdminSidebar };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.SidebarProvider, mergeProps({ style: { "--header-height": $props.headerHeight } }, _attrs, { "data-source-file": "src/components/common/AdminLayout.vue", "data-source-line-start": "16", "data-source-line-end": "25" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.AdminSidebar, { "data-source-file": "src/components/common/AdminLayout.vue", "data-source-line-start": "21", "data-source-line-end": "21" }, null, _parent2, _scopeId)), _push2(ssrRenderComponent($setup.SidebarInset, { class: "flex flex-col min-h-[calc(100vh-var(--header-height))]", "data-source-file": "src/components/common/AdminLayout.vue", "data-source-line-start": "22", "data-source-line-end": "24" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
      else return [renderSlot(_ctx.$slots, "default")];
    }), _: 3 }, _parent2, _scopeId));
    else return [createVNode($setup.AdminSidebar, { "data-source-file": "src/components/common/AdminLayout.vue", "data-source-line-start": "21", "data-source-line-end": "21" }), createVNode($setup.SidebarInset, { class: "flex flex-col min-h-[calc(100vh-var(--header-height))]", "data-source-file": "src/components/common/AdminLayout.vue", "data-source-line-start": "22", "data-source-line-end": "24" }, { default: withCtx(() => [renderSlot(_ctx.$slots, "default")]), _: 3 })];
  }), _: 3 }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/AdminLayout.vue"), _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminLayout = _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = defineComponent({ __name: "Badge", props: { variant: {}, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  }, get badgeVariants() {
    return badgeVariants;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: $setup.cn($setup.badgeVariants({ variant: $props.variant }), $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/badge/Badge.vue", "data-source-line-start": "14", "data-source-line-end": "16" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>");
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/badge/Badge.vue"), _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Badge = _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const badgeVariants = cva(
  "inline-flex gap-1 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const MOCK_PACKAGE_RECORDS = [
  {
    trackingNumber: "ZYWK20251124001",
    status: "AwaitingPickup",
    entryTime: "2025-11-23 15:30",
    exitTime: null,
    sortingStatus: "完成分拣",
    shelfLocation: "A-5-12A",
    customerName: "张三"
  },
  {
    trackingNumber: "ZYWK20251124002",
    status: "Sorting",
    entryTime: "2025-11-24 09:10",
    exitTime: null,
    sortingStatus: "分拣中",
    shelfLocation: "传送带-3",
    customerName: "李四"
  },
  {
    trackingNumber: "ZYWK20251124003",
    status: "Delivered",
    entryTime: "2025-11-23 11:45",
    exitTime: "2025-11-23 16:05",
    sortingStatus: "完成分拣",
    shelfLocation: "已出库",
    customerName: "王五"
  },
  {
    trackingNumber: "ZYWK20251124004",
    status: "Inbound",
    entryTime: "2025-11-24 10:05",
    exitTime: null,
    sortingStatus: "待分拣",
    shelfLocation: "入口扫描区",
    customerName: "赵六"
  }
];
const MOCK_DEVICE_STATUS = [
  {
    deviceId: "CV001",
    name: "主分拣传送带",
    type: "智能传送带",
    status: "Normal",
    location: "分拣区中央",
    criticalAlerts: 0,
    lastUpdated: "2025-11-24 10:50"
  },
  {
    deviceId: "RB003",
    name: "ROS机器人-Alpha",
    type: "ROS机器人",
    status: "Fault",
    location: "货架区 B-12",
    criticalAlerts: 1,
    lastUpdated: "2025-11-24 10:35"
  },
  {
    deviceId: "SH010",
    name: "智能货架-10",
    type: "智能货架",
    status: "Normal",
    location: "存储区东",
    criticalAlerts: 0,
    lastUpdated: "2025-11-24 10:55"
  }
];
const MOCK_USER_MANAGEMENT_DATA = [
  {
    userId: "U001",
    name: "张三",
    phone: "138****1234",
    pickupCount: 15,
    deliveryCount: 3,
    lastVerificationType: "Face",
    lastVerificationTime: "2025-11-24 10:30"
  },
  {
    userId: "U002",
    name: "李四",
    phone: "139****5678",
    pickupCount: 8,
    deliveryCount: 1,
    lastVerificationType: "Code",
    lastVerificationTime: "2025-11-23 18:45"
  },
  {
    userId: "U003",
    name: "王五",
    phone: "135****9012",
    pickupCount: 22,
    deliveryCount: 5,
    lastVerificationType: "Phone",
    lastVerificationTime: "2025-11-22 09:20"
  }
];
const MOCK_SERVICE_RULES = [
  {
    key: "delivery_price_standard",
    description: "标准寄件起步价格",
    value: "12.00",
    unit: "元/首重",
    iconName: "DollarSign"
  },
  {
    key: "max_storage_days",
    description: "快件最长免费存储天数",
    value: "7",
    unit: "天",
    iconName: "CalendarDays"
  },
  {
    key: "face_verification_retry",
    description: "人脸识别失败重试次数上限",
    value: "3",
    unit: "次",
    iconName: "UsersRound"
  }
];
const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "设备维护通知：分拣机器人RB003临时停机",
    content: "因机器人RB003突发故障，我们将于今日11:00-14:00进行紧急维护。在此期间，部分快件分拣速度可能略有延迟。",
    releaseDate: "2025-11-24 10:40",
    isUrgent: true
  },
  {
    id: 2,
    title: "寄件服务价格调整公告",
    content: "为提升服务质量，标准快递服务价格将从下月1日起上调1元。",
    releaseDate: "2025-11-15 09:00",
    isUrgent: false
  }
];
const MOCK_DEVICE_MONITORING_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/396ba4dd-1ef8-43f9-bd9b-1d93a34f0ccf.png"
};
export {
  AdminLayout as A,
  Badge as B,
  MOCK_DEVICE_STATUS as M,
  MOCK_DEVICE_MONITORING_IMAGE as a,
  MOCK_PACKAGE_RECORDS as b,
  MOCK_SERVICE_RULES as c,
  MOCK_ANNOUNCEMENTS as d,
  MOCK_USER_MANAGEMENT_DATA as e
};
