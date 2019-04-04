var EtlCfg = EtlCfg || {};
EtlCfg.UI = EtlCfg.UI || {};
(function () {
    this.ToolView = joint.dia.ElementView.extend({
        propertiesView: null,
        initialize: function (options) {
            joint.dia.ElementView.prototype.initialize.apply(this, arguments);
            var propViewClass = joint.util.getByPath(EtlCfg.UI, this.model.get('type') + 'PropertiesView', '.');
            this.propertiesView = new propViewClass({ model: this.model });
        },
        render: function () {
            joint.dia.ElementView.prototype.render.apply(this, arguments);
            this.renderTools();
            this.renderPropertiesView();
            this.update();
            return this;
        },
        remove: function () {
            joint.dia.ElementView.prototype.remove.apply(this, arguments);
            if (this.propertiesView) {
                this.propertiesView.remove();
            }
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
            var targetParentEvent = evt.target.parentNode.getAttribute('event');
            if (targetParentEvent) {
                // `remove` event is built-in. Other custom events are triggered on the paper.
                switch (targetParentEvent) {
                    case 'remove':
                        this.model.remove();
                        break;
                    case 'element:properties':
                        this.toggleProperties();
                        break;
                    default:
                        this.notify(targetParentEvent, evt, x, y);
                        break;
                }
            } else {
                joint.dia.ElementView.prototype.pointerclick.apply(this, arguments);
            }
        },
        renderPropertiesView: function () {
            if (this.propertiesView) {
                this.propertiesView.render();
                this.propertiesView.delegateEvents();
            }
        },
        toggleProperties: function () {
            if (this.propertiesView) {
                this.propertiesView.show();
            }
        },
    });

    this.Tool = joint.shapes.devs.Model.extend({
        defaults: joint.util.deepSupplement({
            type: 'Tool',
            attrs: {}
        }, joint.shapes.devs.Model.prototype.defaults),
        toolMarkup: ['<g class="element-tools" transform="translate(95,-15)">',
            '<g class="element-tool-properties" event="element:properties">',
            '<circle style="fill:green;" r="11"/>',
            '<path fill="white" transform="scale(.55) translate(-16, -16)" d="M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z"/>',
            '<title>Element properties.</title>',
            '</g>',
            '<g class="element-tool-remove" event="remove">',
            '<circle style="fill:red;" r="11" transform="translate(25)"/>',
            '<path transform="scale(.8) translate(15, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
            '<title>Remove this element from the model</title>',
            '</g>',
            '</g>'].join('')

    });

    this.ToolPropertiesView = Backbone.View.extend({
        id: 'propertiesModal',
        className: 'modal fade',
        template: _.template([
            '<div class="modal-dialog" role="document">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
            '<h4 class="modal-title">Modal title</h4>',
            '</div>',
            '<div class="modal-body">',
            '<p>One fine body...</p>',
            '</div>',
            '<div class="modal-footer">',
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
            '<button type="button" class="btn btn-primary">Save changes</button>',
            '</div>',
            '</div>',
            '</div>',
        ].join('')),

        events: {
            'hidden': 'teardown'
        },

        initialize: function () {
            _.bindAll(this, 'show', 'teardown', 'render');
            this.childView
            this.render();
        },

        show: function () {
            this.$el.modal('show');
        },

        teardown: function () {
            this.$el.data('modal', null);
            this.remove();
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            this.$el.modal({ show: false }); // dont show modal on instantiation
            return this;
        },

    });
}).apply(EtlCfg.UI);