import { defineComponent, useSSRContext, mergeProps, withCtx, renderSlot, computed, defineAsyncComponent, createVNode, resolveDynamicComponent, ref, onMounted, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString } from "vue";
import { cva } from "class-variance-authority";
import { Primitive, useForwardPropsEmits, DialogRoot, DialogClose, DialogPortal, DialogOverlay, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "reka-ui";
import { _ as _export_sfc, c as cn } from "./_plugin-vue_export-helper.C7D2g9-_.js";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Circle, X } from "lucide-vue-next";
import { reactiveOmit } from "@vueuse/core";
const _sfc_main$a = defineComponent({ __name: "Button", props: { variant: {}, size: {}, class: {}, asChild: { type: Boolean }, as: { default: "button" } }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get Primitive() {
    return Primitive;
  }, get cn() {
    return cn;
  }, get buttonVariants() {
    return buttonVariants;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.Primitive, mergeProps({ as: $props.as, "as-child": $props.asChild, class: $setup.cn($setup.buttonVariants({ variant: $props.variant, size: $props.size }), $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/button/Button.vue", "data-source-line-start": "21", "data-source-line-end": "27" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/button/Button.vue"), _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const Button = _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$a]]);
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        "default": "h-10 px-4 py-2",
        "sm": "h-9 rounded-md px-3",
        "lg": "h-11 rounded-md px-8",
        "icon": "h-10 w-10",
        "icon-sm": "size-9",
        "icon-lg": "size-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$9 = defineComponent({ __name: "SafeIcon", props: { name: {}, size: { default: 24 }, color: {}, strokeWidth: { default: 2 }, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, IconComponent = computed(() => {
    try {
      return defineAsyncComponent(() => import("lucide-vue-next").then((module) => {
        const icon = module[props.name];
        return icon || (console.warn(`Icon "${props.name}" not found in lucide-vue-next, using fallback`), Circle);
      }).catch(() => (console.warn(`Failed to load icon "${props.name}", using fallback`), Circle)));
    } catch {
      return Circle;
    }
  }), __returned__ = { props, IconComponent };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent($setup.IconComponent), mergeProps({ size: $props.size, color: $props.color, "stroke-width": $props.strokeWidth, class: $setup.props.class }, _attrs, { "data-source-file": "src/components/common/SafeIcon.vue", "data-source-line-start": "43", "data-source-line-end": "49" }), null), _parent);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/SafeIcon.vue"), _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const SafeIcon = _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9]]);
const Logo = "./logo.BKLvjirH.jpg";
const _sfc_main$8 = defineComponent({ __name: "Sheet", props: { open: { type: Boolean }, defaultOpen: { type: Boolean }, modal: { type: Boolean } }, emits: ["update:open"], setup(__props, { expose: __expose, emit: __emit }) {
  __expose();
  const props = __props, emits = __emit, forwarded = useForwardPropsEmits(props, emits), __returned__ = { props, emits, forwarded, get DialogRoot() {
    return DialogRoot;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.DialogRoot, mergeProps($setup.forwarded, _attrs, { "data-source-file": "src/components/ui/sheet/Sheet.vue", "data-source-line-start": "12", "data-source-line-end": "14" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/Sheet.vue"), _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const Sheet = _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$7 = defineComponent({ __name: "SheetClose", props: { asChild: { type: Boolean }, as: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get DialogClose() {
    return DialogClose;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.DialogClose, mergeProps($setup.props, _attrs, { "data-source-file": "src/components/ui/sheet/SheetClose.vue", "data-source-line-start": "9", "data-source-line-end": "11" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetClose.vue"), _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
_export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$6 = defineComponent({ inheritAttrs: false, __name: "SheetContent", props: { class: {}, side: {}, forceMount: { type: Boolean }, disableOutsidePointerEvents: { type: Boolean }, asChild: { type: Boolean }, as: {} }, emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"], setup(__props, { expose: __expose, emit: __emit }) {
  __expose();
  const props = __props, emits = __emit, delegatedProps = reactiveOmit(props, "class", "side"), forwarded = useForwardPropsEmits(delegatedProps, emits), __returned__ = { props, emits, delegatedProps, forwarded, get X() {
    return X;
  }, get DialogClose() {
    return DialogClose;
  }, get DialogContent() {
    return DialogContent;
  }, get DialogOverlay() {
    return DialogOverlay;
  }, get DialogPortal() {
    return DialogPortal;
  }, get cn() {
    return cn;
  }, get sheetVariants() {
    return sheetVariants;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.DialogPortal, mergeProps(_attrs, { "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "37", "data-source-line-end": "53" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.DialogOverlay, { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "38", "data-source-line-end": "40" }, null, _parent2, _scopeId)), _push2(ssrRenderComponent($setup.DialogContent, mergeProps({ class: $setup.cn($setup.sheetVariants({ side: $props.side }), $setup.props.class) }, { ...$setup.forwarded, ..._ctx.$attrs }, { "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "41", "data-source-line-end": "52" }), { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2), _push3(ssrRenderComponent($setup.DialogClose, { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "47", "data-source-line-end": "51" }, { default: withCtx((_3, _push4, _parent4, _scopeId3) => {
        if (_push4) _push4(ssrRenderComponent($setup.X, { class: "w-4 h-4 text-muted-foreground", "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "50", "data-source-line-end": "50" }, null, _parent4, _scopeId3));
        else return [createVNode($setup.X, { class: "w-4 h-4 text-muted-foreground", "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "50", "data-source-line-end": "50" })];
      }), _: 1 }, _parent3, _scopeId2));
      else return [renderSlot(_ctx.$slots, "default"), createVNode($setup.DialogClose, { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "47", "data-source-line-end": "51" }, { default: withCtx(() => [createVNode($setup.X, { class: "w-4 h-4 text-muted-foreground", "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "50", "data-source-line-end": "50" })]), _: 1 })];
    }), _: 3 }, _parent2, _scopeId));
    else return [createVNode($setup.DialogOverlay, { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "38", "data-source-line-end": "40" }), createVNode($setup.DialogContent, mergeProps({ class: $setup.cn($setup.sheetVariants({ side: $props.side }), $setup.props.class) }, { ...$setup.forwarded, ..._ctx.$attrs }, { "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "41", "data-source-line-end": "52" }), { default: withCtx(() => [renderSlot(_ctx.$slots, "default"), createVNode($setup.DialogClose, { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "47", "data-source-line-end": "51" }, { default: withCtx(() => [createVNode($setup.X, { class: "w-4 h-4 text-muted-foreground", "data-source-file": "src/components/ui/sheet/SheetContent.vue", "data-source-line-start": "50", "data-source-line-end": "50" })]), _: 1 })]), _: 3 }, 16, ["class"])];
  }), _: 3 }, _parent));
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetContent.vue"), _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const SheetContent = _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$5 = defineComponent({ __name: "SheetDescription", props: { asChild: { type: Boolean }, as: {}, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, delegatedProps = reactiveOmit(props, "class"), __returned__ = { props, delegatedProps, get DialogDescription() {
    return DialogDescription;
  }, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.DialogDescription, mergeProps({ class: $setup.cn("text-sm text-muted-foreground", $setup.props.class) }, $setup.delegatedProps, _attrs, { "data-source-file": "src/components/ui/sheet/SheetDescription.vue", "data-source-line-start": "14", "data-source-line-end": "19" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetDescription.vue"), _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
_export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$4 = defineComponent({ __name: "SheetFooter", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: $setup.cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sheet/SheetFooter.vue", "data-source-line-start": "9", "data-source-line-end": "18" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>");
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetFooter.vue"), _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$3 = defineComponent({ __name: "SheetHeader", props: { class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: $setup.cn("flex flex-col gap-y-2 text-center sm:text-left", $setup.props.class) }, _attrs, { "data-source-file": "src/components/ui/sheet/SheetHeader.vue", "data-source-line-start": "9", "data-source-line-end": "15" }))}>`), ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent), _push("</div>");
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetHeader.vue"), _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = defineComponent({ __name: "SheetTitle", props: { asChild: { type: Boolean }, as: {}, class: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, delegatedProps = reactiveOmit(props, "class"), __returned__ = { props, delegatedProps, get DialogTitle() {
    return DialogTitle;
  }, get cn() {
    return cn;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.DialogTitle, mergeProps({ class: $setup.cn("text-lg font-semibold text-foreground", $setup.props.class) }, $setup.delegatedProps, _attrs, { "data-source-file": "src/components/ui/sheet/SheetTitle.vue", "data-source-line-start": "14", "data-source-line-end": "19" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetTitle.vue"), _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = defineComponent({ __name: "SheetTrigger", props: { asChild: { type: Boolean }, as: {} }, setup(__props, { expose: __expose }) {
  __expose();
  const __returned__ = { props: __props, get DialogTrigger() {
    return DialogTrigger;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup.DialogTrigger, mergeProps($setup.props, _attrs, { "data-source-file": "src/components/ui/sheet/SheetTrigger.vue", "data-source-line-start": "9", "data-source-line-end": "11" }), { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
    else return [renderSlot(_ctx.$slots, "default")];
  }), _: 3 }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetTrigger.vue"), _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SheetTrigger = _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const _sfc_main = defineComponent({ __name: "CommonHeader", props: { variant: { default: "default" }, showNav: { type: Boolean, default: true }, currentUser: { default: null } }, setup(__props, { expose: __expose }) {
  __expose();
  const props = __props, isMenuOpen = ref(false), isMounted = ref(false);
  onMounted(() => {
    isMounted.value = true;
  });
  const __returned__ = { props, isMenuOpen, isMounted, navLinks: [{ name: "取件服务", href: "./client-pickup-service-entry.html" }, { name: "寄件服务", href: "./client-delivery-entry.html" }, { name: "快件查询", href: "./placeholder.html" }, { name: "网点信息", href: "./placeholder.html" }], handleLogout: () => {
    typeof window < "u" && (window.location.href = "./homepage.html");
  }, get Button() {
    return Button;
  }, SafeIcon, get Logo() {
    return Logo;
  }, get Sheet() {
    return Sheet;
  }, get SheetContent() {
    return SheetContent;
  }, get SheetTrigger() {
    return SheetTrigger;
  } };
  return Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true }), __returned__;
} });
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" }, _attrs, { "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "47", "data-source-line-end": "111" }))}><div class="container mx-auto flex h-20 items-center justify-between px-4" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="48" data-source-line-end="110"><a href="./homepage.html" class="flex items-center space-x-3 hover:opacity-80 transition-opacity" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="50" data-source-line-end="57"><div class="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="51" data-source-line-end="53"><img${ssrRenderAttr("src", $setup.Logo)} alt="智取未来" class="w-full h-full rounded-xl object-cover" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="52" data-source-line-end="52"></div><span class="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="54" data-source-line-end="56"> 智取未来 </span></a>`), $props.showNav && $props.variant === "default" ? (_push('<nav class="hidden md:flex items-center space-x-1" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="60" data-source-line-end="69"><!--[-->'), ssrRenderList($setup.navLinks, (link) => {
    _push(`<a${ssrRenderAttr("href", link.href)} class="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="61" data-source-line-end="68">${ssrInterpolate(link.name)}</a>`);
  }), _push("<!--]--></nav>")) : _push("<!---->"), _push('<div class="flex items-center space-x-2" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="72" data-source-line-end="109">'), $props.currentUser && $setup.isMounted ? (_push(`<div class="hidden md:flex items-center space-x-3" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="73" data-source-line-end="79"><span class="text-sm text-muted-foreground" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="74" data-source-line-end="74">${ssrInterpolate($props.currentUser)}</span>`), _push(ssrRenderComponent($setup.Button, { variant: "outline", size: "sm", onClick: $setup.handleLogout, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "75", "data-source-line-end": "78" }, { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.SafeIcon, { name: "LogOut", size: 16, class: "mr-2", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "76", "data-source-line-end": "76" }, null, _parent2, _scopeId)), _push2(" 退出登录 ");
    else return [createVNode($setup.SafeIcon, { name: "LogOut", size: 16, class: "mr-2", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "76", "data-source-line-end": "76" }), createTextVNode(" 退出登录 ")];
  }), _: 1 }, _parent)), _push("</div>")) : _push("<!---->"), $props.showNav && $props.variant === "default" ? _push(ssrRenderComponent($setup.Sheet, { open: $setup.isMenuOpen, "onUpdate:open": ($event) => $setup.isMenuOpen = $event, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "82", "data-source-line-end": "108" }, { default: withCtx((_, _push2, _parent2, _scopeId) => {
    if (_push2) _push2(ssrRenderComponent($setup.SheetTrigger, { "as-child": "", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "83", "data-source-line-end": "87" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) _push3(ssrRenderComponent($setup.Button, { variant: "ghost", size: "icon", class: "md:hidden", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "84", "data-source-line-end": "86" }, { default: withCtx((_3, _push4, _parent4, _scopeId3) => {
        if (_push4) _push4(ssrRenderComponent($setup.SafeIcon, { name: "Menu", size: 24, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "85", "data-source-line-end": "85" }, null, _parent4, _scopeId3));
        else return [createVNode($setup.SafeIcon, { name: "Menu", size: 24, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "85", "data-source-line-end": "85" })];
      }), _: 1 }, _parent3, _scopeId2));
      else return [createVNode($setup.Button, { variant: "ghost", size: "icon", class: "md:hidden", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "84", "data-source-line-end": "86" }, { default: withCtx(() => [createVNode($setup.SafeIcon, { name: "Menu", size: 24, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "85", "data-source-line-end": "85" })]), _: 1 })];
    }), _: 1 }, _parent2, _scopeId)), _push2(ssrRenderComponent($setup.SheetContent, { side: "right", class: "w-64", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "88", "data-source-line-end": "107" }, { default: withCtx((_2, _push3, _parent3, _scopeId2) => {
      if (_push3) _push3(`<nav class="flex flex-col space-y-4 mt-8" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="89" data-source-line-end="106"${_scopeId2}><!--[-->`), ssrRenderList($setup.navLinks, (link) => {
        _push3(`<a${ssrRenderAttr("href", link.href)} class="px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-md transition-colors" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="90" data-source-line-end="98"${_scopeId2}>${ssrInterpolate(link.name)}</a>`);
      }), _push3("<!--]-->"), $props.currentUser && $setup.isMounted ? (_push3(`<div class="pt-4 border-t" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="99" data-source-line-end="105"${_scopeId2}><p class="px-4 py-2 text-sm text-muted-foreground" data-source-file="src/components/common/CommonHeader.vue" data-source-line-start="100" data-source-line-end="100"${_scopeId2}>${ssrInterpolate($props.currentUser)}</p>`), _push3(ssrRenderComponent($setup.Button, { variant: "outline", size: "sm", class: "w-full", onClick: $setup.handleLogout, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "101", "data-source-line-end": "104" }, { default: withCtx((_3, _push4, _parent4, _scopeId3) => {
        if (_push4) _push4(ssrRenderComponent($setup.SafeIcon, { name: "LogOut", size: 16, class: "mr-2", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "102", "data-source-line-end": "102" }, null, _parent4, _scopeId3)), _push4(" 退出登录 ");
        else return [createVNode($setup.SafeIcon, { name: "LogOut", size: 16, class: "mr-2", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "102", "data-source-line-end": "102" }), createTextVNode(" 退出登录 ")];
      }), _: 1 }, _parent3, _scopeId2)), _push3("</div>")) : _push3("<!---->"), _push3("</nav>");
      else return [createVNode("nav", { class: "flex flex-col space-y-4 mt-8", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "89", "data-source-line-end": "106" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.navLinks, (link) => createVNode("a", { key: link.name, href: link.href, class: "px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-md transition-colors", onClick: ($event) => $setup.isMenuOpen = false, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "90", "data-source-line-end": "98" }, toDisplayString(link.name), 9, ["href", "onClick"])), 64)), $props.currentUser && $setup.isMounted ? (openBlock(), createBlock("div", { key: 0, class: "pt-4 border-t", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "99", "data-source-line-end": "105" }, [createVNode("p", { class: "px-4 py-2 text-sm text-muted-foreground", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "100", "data-source-line-end": "100" }, toDisplayString($props.currentUser), 1), createVNode($setup.Button, { variant: "outline", size: "sm", class: "w-full", onClick: $setup.handleLogout, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "101", "data-source-line-end": "104" }, { default: withCtx(() => [createVNode($setup.SafeIcon, { name: "LogOut", size: 16, class: "mr-2", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "102", "data-source-line-end": "102" }), createTextVNode(" 退出登录 ")]), _: 1 })])) : createCommentVNode("", true)])];
    }), _: 1 }, _parent2, _scopeId));
    else return [createVNode($setup.SheetTrigger, { "as-child": "", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "83", "data-source-line-end": "87" }, { default: withCtx(() => [createVNode($setup.Button, { variant: "ghost", size: "icon", class: "md:hidden", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "84", "data-source-line-end": "86" }, { default: withCtx(() => [createVNode($setup.SafeIcon, { name: "Menu", size: 24, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "85", "data-source-line-end": "85" })]), _: 1 })]), _: 1 }), createVNode($setup.SheetContent, { side: "right", class: "w-64", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "88", "data-source-line-end": "107" }, { default: withCtx(() => [createVNode("nav", { class: "flex flex-col space-y-4 mt-8", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "89", "data-source-line-end": "106" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.navLinks, (link) => createVNode("a", { key: link.name, href: link.href, class: "px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-md transition-colors", onClick: ($event) => $setup.isMenuOpen = false, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "90", "data-source-line-end": "98" }, toDisplayString(link.name), 9, ["href", "onClick"])), 64)), $props.currentUser && $setup.isMounted ? (openBlock(), createBlock("div", { key: 0, class: "pt-4 border-t", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "99", "data-source-line-end": "105" }, [createVNode("p", { class: "px-4 py-2 text-sm text-muted-foreground", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "100", "data-source-line-end": "100" }, toDisplayString($props.currentUser), 1), createVNode($setup.Button, { variant: "outline", size: "sm", class: "w-full", onClick: $setup.handleLogout, "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "101", "data-source-line-end": "104" }, { default: withCtx(() => [createVNode($setup.SafeIcon, { name: "LogOut", size: 16, class: "mr-2", "data-source-file": "src/components/common/CommonHeader.vue", "data-source-line-start": "102", "data-source-line-end": "102" }), createTextVNode(" 退出登录 ")]), _: 1 })])) : createCommentVNode("", true)])]), _: 1 })];
  }), _: 1 }, _parent)) : _push("<!---->"), _push("</div></div></header>");
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  return (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/CommonHeader.vue"), _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CommonHeader = _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Button as B,
  CommonHeader as C,
  Logo as L,
  SafeIcon as S,
  SheetContent as a,
  Sheet as b
};
