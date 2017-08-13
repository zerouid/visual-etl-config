var EtlCfg = EtlCfg || {};
EtlCfg.UI = EtlCfg.UI || {};
(function () {
    this.ToolElementView = joint.dia.ElementView.extend({
        render: function () {
            joint.dia.ElementView.prototype.render.apply(this, arguments);
            this.renderTools();
            this.update();
            return this;
        },
        renderTools: function () {

            var toolMarkup = this.model.toolMarkup || this.model.get('toolMarkup');

            if (toolMarkup) {
                var nodes = V(toolMarkup);
                V(this.el).append(nodes);
            }
            return this;
        },
        pointerclick: function (evt, x, y) {
            this._dx = x;
            this._dy = y;
            this._action = '';
            var className = evt.target.parentNode.getAttribute('class');
            switch (className) {

                case 'element-tool-remove':
                    this.model.remove();
                    return;
                    break;

                default:
            }
            joint.dia.CellView.prototype.pointerclick.apply(this, arguments);
        },
    });

    this.ToolModel = joint.shapes.devs.Model.extend({
        toolMarkup: ['<g class="element-tools" transform="translate(90,0)">',
            '<g class="element-tool-remove" style="cursor:not-allowed !important;"><circle style="fill:red;" r="11"/>',
            '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
            '<title>Remove this element from the model</title>',
            '</g>',
            '</g>'].join(''),
    });

}).apply(EtlCfg.UI);