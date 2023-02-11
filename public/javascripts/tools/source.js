var EtlCfg = EtlCfg || {};
EtlCfg.UI = EtlCfg.UI || {};
(function () {
    this.CsvSource = EtlCfg.UI.Tool.extend({
        defaults: joint.util.deepSupplement({
            type: 'CsvSource',
            attrs: {}
        }, joint.shapes.devs.Model.prototype.defaults),
    });
    this.CsvSourceView = EtlCfg.UI.ToolView.extend({});
    this.CsvSourcePropertiesView = EtlCfg.UI.ToolPropertiesView.extend({});
}).apply(EtlCfg.UI);