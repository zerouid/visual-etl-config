var EtlCfg = EtlCfg || {};
EtlCfg.UI = EtlCfg.UI || {};
(function () {
    this.Store = EtlCfg.UI.Tool.extend({
        defaults: joint.util.deepSupplement({
            type: 'Store',
            attrs: {}
        }, joint.shapes.devs.Model.prototype.defaults),
    });
    this.StoreView = EtlCfg.UI.ToolView.extend({});
    this.StorePropertiesView = EtlCfg.UI.ToolPropertiesView.extend({});
}).apply(EtlCfg.UI);