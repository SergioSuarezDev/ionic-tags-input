import { Component, ChangeDetectorRef, Input, Output, EventEmitter, HostListener, ViewChild, forwardRef, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Platform, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@ionic/angular';
import * as ɵngcc2 from '@angular/common';
import * as ɵngcc3 from '@angular/forms';

const _c0 = ["tagsInput"];
function IonTagsInput_ion_tag_1_Template(rf, ctx) { if (rf & 1) {
    const _r307 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ion-tag", 4);
    ɵngcc0.ɵɵlistener("onClear", function IonTagsInput_ion_tag_1_Template_ion_tag_onClear_0_listener() { ɵngcc0.ɵɵrestoreView(_r307); const $index_r305 = ctx.index; const ctx_r306 = ɵngcc0.ɵɵnextContext(); return ctx_r306.btnRemoveTag($index_r305); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const tag_r304 = ctx.$implicit;
    const ctx_r302 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("tag", tag_r304)("mode", ctx_r302.mode)("color", ctx_r302.cssColor)("allowClear", !ctx_r302.hideRemove && !ctx_r302.readonly);
} }
const TAG_COLORS = {
    "default": "#4a8bfc",
    "secondary": "#32db64",
    "danger": "#f53d3d",
    "warn": "#ffc125",
    "gray": "#767676",
    "purple": "#7e60ff",
    "dark": "#222",
    "light": "#bcbcbc"
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const CITY_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IonTagsInput),
    multi: true
};
class IonTagsInput {
    /**
     * @param {?} plt
     * @param {?} ref
     */
    constructor(plt, ref) {
        this.plt = plt;
        this.ref = ref;
        this._once = false;
        this.mode = '';
        this.readonly = false;
        this.hideRemove = false;
        this.maxTags = -1;
        this.placeholder = '+Tag';
        this.type = 'text';
        this.separatorStr = ',';
        this.canEnterAdd = true;
        this.canBackspaceRemove = true;
        this.onChange = new EventEmitter();
        this.ionFocus = new EventEmitter();
        this.ionBlur = new EventEmitter();
        this._editTag = '';
        this._tags = [];
        this._isFocus = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        if (TAG_COLORS.hasOwnProperty(value)) {
            this.cssColor = (/** @type {?} */ (TAG_COLORS[value]));
        }
        else {
            this.cssColor = value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set once(value) {
        if (typeof value === 'string') {
            this._once = true;
        }
        else {
            this._once = value;
        }
    }
    /**
     * @return {?}
     */
    get once() {
        return this._once;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.mode === '') {
            this.plt.ready().then(() => {
                this.initMode();
            });
        }
    }
    /**
     * @return {?}
     */
    keyAddTag() {
        let /** @type {?} */ tagStr = this._editTag.trim();
        if (!this.canEnterAdd)
            return;
        if (!this.verifyTag(tagStr))
            return;
        if (this.once && !this.isOnce(tagStr)) {
            this._editTag = '';
            return;
        }
        this.pushTag(tagStr);
    }
    /**
     * @return {?}
     */
    separatorStrAddTag() {
        const /** @type {?} */ lastIndex = this._editTag.length - 1;
        let /** @type {?} */ tagStr = '';
        if (!this.separatorStr)
            return;
        if (this._editTag[lastIndex] === this.separatorStr) {
            tagStr = this._editTag.split(this.separatorStr)[0].trim();
            if (this.verifyTag(tagStr) && this.isOnce(tagStr)) {
                this.pushTag(tagStr);
            }
            else {
                this._editTag = '';
            }
        }
    }
    /**
     * @return {?}
     */
    keyRemoveTag() {
        if (!this.canBackspaceRemove)
            return;
        if (this._editTag === '') {
            this.removeTag(-1);
            this._editTag = '';
        }
    }
    /**
     * @param {?} $index
     * @return {?}
     */
    btnRemoveTag($index) {
        this.removeTag($index);
    }
    /**
     * @param {?} tagStr
     * @return {?}
     */
    verifyTag(tagStr) {
        if (typeof this.verifyMethod === 'function') {
            if (!this.verifyMethod(tagStr)) {
                this._editTag = '';
                return false;
            }
            else {
                return true;
            }
        }
        if (!tagStr.trim()) {
            this._editTag = '';
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @param {?} tagStr
     * @return {?}
     */
    pushTag(tagStr) {
        if (this.maxTags !== -1 && this._tags.length >= this.maxTags) {
            this._editTag = '';
            return;
        }
        this._tags.push(tagStr.trim());
        this.ref.detectChanges();
        this.onChange.emit(this._tags);
        this._editTag = '';
    }
    /**
     * @param {?} $index
     * @return {?}
     */
    removeTag($index) {
        if (this._tags.length > 0) {
            if ($index === -1) {
                this._tags.pop();
                this.onChange.emit(this._tags);
            }
            else if ($index > -1) {
                this._tags.splice($index, 1);
                this.onChange.emit(this._tags);
            }
        }
    }
    /**
     * @param {?} tagStr
     * @return {?}
     */
    isOnce(tagStr) {
        const /** @type {?} */ tags = this._tags;
        return tags.every((e) => {
            return e !== tagStr;
        });
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    _click(ev) {
        if (!this._isFocus) {
        }
        this.focus();
        ev.preventDefault();
        ev.stopPropagation();
    }
    /**
     * @return {?}
     */
    blur() {
        if (this._isFocus) {
            this._isFocus = false;
            this.ionBlur.emit(this._tags);
        }
    }
    /**
     * @return {?}
     */
    focus() {
        if (!this._isFocus) {
            this._isFocus = true;
            this.input.nativeElement.focus();
            this.ionFocus.emit(this._tags);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    writeValue(val) {
        this._tags = val;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChanged = fn;
        this.setValue(this._tags);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setValue(val) {
        this._tags = val;
        if (this._tags) {
            this._onChanged(this._tags);
        }
    }
    /**
     * @return {?}
     */
    initMode() {
        this.mode = this.plt.is('ios') ? 'ios' : this.plt.is('android') ? 'md' : this.plt.is('windows') ? 'mp' : 'md';
    }
}
IonTagsInput.ɵfac = function IonTagsInput_Factory(t) { return new (t || IonTagsInput)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Platform), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
IonTagsInput.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: IonTagsInput, selectors: [["ion-tags-input"]], viewQuery: function IonTagsInput_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.input = _t.first);
    } }, hostAttrs: [1, "tit-border-color", "ion-tags-input"], hostVars: 6, hostBindings: function IonTagsInput_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function IonTagsInput_click_HostBindingHandler($event) { return ctx._click($event); });
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("border-bottom-color", ctx._isFocus ? ctx.cssColor : null);
        ɵngcc0.ɵɵclassProp("active", ctx._isFocus)("readonly", ctx.readonly);
    } }, inputs: { mode: "mode", readonly: "readonly", hideRemove: "hideRemove", maxTags: "maxTags", placeholder: "placeholder", type: "type", separatorStr: "separatorStr", canEnterAdd: "canEnterAdd", canBackspaceRemove: "canBackspaceRemove", color: "color", once: "once", verifyMethod: "verifyMethod" }, outputs: { onChange: "onChange", ionFocus: "ionFocus", ionBlur: "ionBlur" }, features: [ɵngcc0.ɵɵProvidersFeature([CITY_PICKER_VALUE_ACCESSOR])], decls: 4, vars: 6, consts: [[1, "iti-tags-wrap"], [3, "tag", "mode", "color", "allowClear", "onClear", 4, "ngFor", "ngForOf"], [1, "iti-input", 3, "hidden", "disabled", "type", "placeholder", "ngModel", "ngModelChange", "blur", "keyup.backspace", "keyup", "keyup.enter"], ["tagsInput", ""], [3, "tag", "mode", "color", "allowClear", "onClear"]], template: function IonTagsInput_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, IonTagsInput_ion_tag_1_Template, 1, 4, "ion-tag", 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(2, "input", 2, 3);
        ɵngcc0.ɵɵlistener("ngModelChange", function IonTagsInput_Template_input_ngModelChange_2_listener($event) { return ctx._editTag = $event; })("blur", function IonTagsInput_Template_input_blur_2_listener() { return ctx.blur(); })("keyup.backspace", function IonTagsInput_Template_input_keyup_backspace_2_listener($event) { ctx.keyRemoveTag($event); return false; })("keyup", function IonTagsInput_Template_input_keyup_2_listener() { return ctx.separatorStrAddTag(); })("keyup.enter", function IonTagsInput_Template_input_keyup_enter_2_listener() { return ctx.keyAddTag(); });
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx._tags);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("hidden", ctx.readonly)("disabled", ctx.readonly)("type", ctx.type)("placeholder", ctx.placeholder)("ngModel", ctx._editTag);
    } }, directives: function () { return [ɵngcc2.NgForOf, ɵngcc3.DefaultValueAccessor, ɵngcc3.NgControlStatus, ɵngcc3.NgModel, IonTag]; }, styles: [".ion-tags-input{border-bottom:1px solid #e5e5e5;-webkit-transition:border-bottom-color .15s ease;transition:border-bottom-color .15s ease;padding:5px;display:block}.ion-tags-input .iti-tag-color{background-color:#4a8bfc;color:#fff}.ion-tags-input.active{border-bottom-color:#4a8bfc}.ion-tags-input .iti-tag{display:block;float:left;font-family:sans-serif;font-size:1.3rem;font-weight:400;margin-right:5px;margin-bottom:5px;padding:4px 10px;max-height:30px;border-radius:0}.ion-tags-input .iti-tag.iti-tag-ios{border-radius:13px}.ion-tags-input .iti-tag.iti-tag-md{border-radius:4px}.ion-tags-input .iti-input{background:0 0;border:0;color:#777;font-family:sans-serif;font-size:13px;font-weight:400;outline:0;padding:5px;width:80px}.ion-tags-input a.iti-tag-rm::before{content:\" x\";cursor:pointer;font-weight:700;color:#fff}.ion-tags-input.active.tit-border-color.readonly,.ion-tags-input.tit-border-color.readonly{border:none}"], encapsulation: 2 });
/** @nocollapse */
IonTagsInput.ctorParameters = () => [
    { type: Platform, },
    { type: ChangeDetectorRef, },
];
IonTagsInput.propDecorators = {
    "mode": [{ type: Input },],
    "readonly": [{ type: Input },],
    "hideRemove": [{ type: Input },],
    "maxTags": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "type": [{ type: Input },],
    "separatorStr": [{ type: Input },],
    "canEnterAdd": [{ type: Input },],
    "canBackspaceRemove": [{ type: Input },],
    "verifyMethod": [{ type: Input },],
    "color": [{ type: Input },],
    "once": [{ type: Input },],
    "onChange": [{ type: Output },],
    "ionFocus": [{ type: Output },],
    "ionBlur": [{ type: Output },],
    "input": [{ type: ViewChild, args: ['tagsInput',] },],
    "_click": [{ type: HostListener, args: ['click', ['$event'],] },],
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(IonTagsInput, [{
        type: Component,
        args: [{
                selector: 'ion-tags-input',
                providers: [CITY_PICKER_VALUE_ACCESSOR],
                template: `
  <div class="iti-tags-wrap">
    <ion-tag  *ngFor="let tag of _tags; let $index = index;"
              [tag]="tag"
              [mode]="mode"
              [color]="cssColor"
              [allowClear]="!hideRemove && !readonly"
              (onClear)="btnRemoveTag($index)">
    </ion-tag>
  </div>
  <input #tagsInput
         [hidden]="readonly"
         [disabled]="readonly"
         class="iti-input" [type]="type"
         [placeholder]="placeholder"
         [(ngModel)]="_editTag"
         (blur)="blur()"
         (keyup.backspace)="keyRemoveTag($event); false"
         (keyup)="separatorStrAddTag()"
         (keyup.enter)="keyAddTag()">
  `,
                host: {
                    'class': 'tit-border-color ion-tags-input',
                    '[style.border-bottom-color]': '_isFocus ? cssColor : null',
                    '[class.active]': '_isFocus',
                    '[class.readonly]': 'readonly'
                },
                encapsulation: ViewEncapsulation.None,
                styles: [`.ion-tags-input{border-bottom:1px solid #e5e5e5;-webkit-transition:border-bottom-color .15s ease;transition:border-bottom-color .15s ease;padding:5px;display:block}.ion-tags-input .iti-tag-color{background-color:#4a8bfc;color:#fff}.ion-tags-input.active{border-bottom-color:#4a8bfc}.ion-tags-input .iti-tag{display:block;float:left;font-family:sans-serif;font-size:1.3rem;font-weight:400;margin-right:5px;margin-bottom:5px;padding:4px 10px;max-height:30px;border-radius:0}.ion-tags-input .iti-tag.iti-tag-ios{border-radius:13px}.ion-tags-input .iti-tag.iti-tag-md{border-radius:4px}.ion-tags-input .iti-input{background:0 0;border:0;color:#777;font-family:sans-serif;font-size:13px;font-weight:400;outline:0;padding:5px;width:80px}.ion-tags-input a.iti-tag-rm::before{content:" x";cursor:pointer;font-weight:700;color:#fff}.ion-tags-input.active.tit-border-color.readonly,.ion-tags-input.tit-border-color.readonly{border:none}`]
            }]
    }], function () { return [{ type: ɵngcc1.Platform }, { type: ɵngcc0.ChangeDetectorRef }]; }, { mode: [{
            type: Input
        }], readonly: [{
            type: Input
        }], hideRemove: [{
            type: Input
        }], maxTags: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], type: [{
            type: Input
        }], separatorStr: [{
            type: Input
        }], canEnterAdd: [{
            type: Input
        }], canBackspaceRemove: [{
            type: Input
        }], onChange: [{
            type: Output
        }], ionFocus: [{
            type: Output
        }], ionBlur: [{
            type: Output
        }], color: [{
            type: Input
        }], once: [{
            type: Input
        }], _click: [{
            type: HostListener,
            args: ['click', ['$event']]
        }], verifyMethod: [{
            type: Input
        }], input: [{
            type: ViewChild,
            args: ['tagsInput']
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IonTag {
    constructor() {
        this._color = TAG_COLORS['default'];
        this.allowClear = true;
        this.onClear = new EventEmitter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        if (value !== 'random') {
            this._color = value;
        }
        else {
            const /** @type {?} */ keys = Object.keys(TAG_COLORS);
            const /** @type {?} */ max = keys.length + 1;
            let /** @type {?} */ index = Math.floor(Math.random() * max);
            this._color = (/** @type {?} */ (TAG_COLORS[keys[index]]));
        }
    }
    ;
}
IonTag.ɵfac = function IonTag_Factory(t) { return new (t || IonTag)(); };
IonTag.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: IonTag, selectors: [["ion-tag"]], hostAttrs: [1, "iti-tag", "iti-tag-color"], hostVars: 8, hostBindings: function IonTag_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("background-color", ctx._color);
        ɵngcc0.ɵɵclassProp("iti-tag-md", ctx.mode === "md")("iti-tag-ios", ctx.mode === "ios")("iti-tag-wp", ctx.mode === "wp");
    } }, inputs: { allowClear: "allowClear", color: "color", tag: "tag", mode: "mode" }, outputs: { onClear: "onClear" }, decls: 3, vars: 2, consts: [[1, "iti-tag-rm", 3, "hidden", "click"]], template: function IonTag_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "span");
        ɵngcc0.ɵɵtext(1);
        ɵngcc0.ɵɵelementStart(2, "a", 0);
        ɵngcc0.ɵɵlistener("click", function IonTag_Template_a_click_2_listener() { return ctx.onClear.emit(ctx.tag); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵtextInterpolate1(" ", ctx.tag, " ");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("hidden", !ctx.allowClear);
    } }, encapsulation: 2 });
/** @nocollapse */
IonTag.ctorParameters = () => [];
IonTag.propDecorators = {
    "tag": [{ type: Input },],
    "allowClear": [{ type: Input },],
    "mode": [{ type: Input },],
    "onClear": [{ type: Output },],
    "color": [{ type: Input },],
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(IonTag, [{
        type: Component,
        args: [{
                selector: 'ion-tag',
                template: `
  <span>
    {{tag}}
    <a class="iti-tag-rm"
       [hidden]="!allowClear"
       (click)="onClear.emit(tag)"></a>
 </span>
  `,
                host: {
                    'class': 'iti-tag iti-tag-color',
                    '[class.iti-tag-md]': 'mode === "md"',
                    '[class.iti-tag-ios]': 'mode === "ios"',
                    '[class.iti-tag-wp]': 'mode === "wp"',
                    '[style.background-color]': '_color'
                },
                styles: []
            }]
    }], function () { return []; }, { allowClear: [{
            type: Input
        }], onClear: [{
            type: Output
        }], color: [{
            type: Input
        }], tag: [{
            type: Input
        }], mode: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Created by hsuanlee on 2017/4/10.
 */
class IonTagsInputModule {
}
IonTagsInputModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: IonTagsInputModule });
IonTagsInputModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function IonTagsInputModule_Factory(t) { return new (t || IonTagsInputModule)(); }, imports: [[
            IonicModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule
        ]] });
/** @nocollapse */
IonTagsInputModule.ctorParameters = () => [];
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(IonTagsInputModule, { declarations: function () { return [IonTagsInput,
        IonTag]; }, imports: function () { return [IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule]; }, exports: function () { return [IonTagsInput,
        IonTag]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(IonTagsInputModule, [{
        type: NgModule,
        args: [{
                imports: [
                    IonicModule,
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule
                ],
                declarations: [IonTagsInput, IonTag],
                exports: [IonTagsInput, IonTag],
                entryComponents: [IonTagsInput, IonTag]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Created by hsuanlee on 2017/4/12.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { IonTagsInputModule, IonTagsInput, IonTag, TAG_COLORS, CITY_PICKER_VALUE_ACCESSOR as ɵa };

//# sourceMappingURL=ionic-tags-input.js.map