var EtlCfg = EtlCfg || {};
EtlCfg.UI = EtlCfg.UI || {};
(function () {
    this.Transform = EtlCfg.UI.Tool.extend({
        defaults: joint.util.deepSupplement({
            type: 'Transform',
            attrs: {}
        }, joint.shapes.devs.Model.prototype.defaults),
    });
    this.TransformView = EtlCfg.UI.ToolView.extend({});
    this.TransformPropertiesView = EtlCfg.UI.ToolPropertiesView.extend({});
}).apply(EtlCfg.UI);