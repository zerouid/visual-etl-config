(function () {
    var editor = $('#editor');
    var toolbox = $('#toolbox');
    var sections = { numOfSections: 0 };
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: editor,
        width: 1000,
        height: 700,
        model: graph,
        cellViewNamespace: EtlCfg.UI,
        background: {
            color: '#eff0f1'
        }
    });

    // paper.on('cell:mouseenter', function (cellView) {
    //     cellView.highlight();
    // });

    // paper.on('cell:mouseleave', function (cellView) {
    //     cellView.unhighlight();
    // });

    function buildToolModel(toolCfg) {
        // return new joint.shapes.devs.Model({
        var modelType = joint.util.getByPath(EtlCfg.UI, toolCfg.editor_type, '.') || EtlCfg.UI.Tool;
        return new modelType({
            position: { x: 5, y: 5 },
            size: { width: 90, height: 90 },
            inPorts: toolCfg.inputs,
            outPorts: toolCfg.outputs,
            ports: {
                groups: {
                    'in': {
                        attrs: { '.port-body': { fill: '#16A085' } }
                    },
                    'out': {
                        attrs: { '.port-body': { fill: '#E74C3C' } }
                    }
                }
            },
            attrs: {
                '.label': { text: joint.util.breakText(toolCfg.caption, { width: 80 }), 'ref-x': .5, 'ref-y': .2 },
                rect: { fill: '#2ECC71' }
            }
        });
    }

    function getSection(sectionName) {
        if (!sections[sectionName]) {
            var sectionId = 'toolbox-section-' + sections.numOfSections++;
            var section = $('<div class="panel panel-default">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title">' +
                '<a data-toggle="collapse" data-parent="#toolbox" href="#' + sectionId + '">' +
                sectionName +
                '</a>' +
                '</h4>' +
                '</div>' +
                '</div>');
            var jointPan = $('<div></div>');
            toolbox.append(section.append(
                $('<div id="' + sectionId + '" class="panel-collapse collapse"></div>').append(
                    $('<div class="panel-body"></div>').append(
                        jointPan))));

            var sectionGraph = new joint.dia.Graph;

            var sectionPaper = new joint.dia.Paper({
                el: jointPan,
                width: toolbox.width(),
                height: 100,
                model: sectionGraph,
                interactive: false,
                gridSize: 1
            });
            sectionPaper.on('cell:pointerdown', function (cellView, e, x, y) {
                $('body').append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;background-color:rgba(255, 255, 255, 0);"></div>');
                var flyGraph = new joint.dia.Graph,
                    flyPaper = new joint.dia.Paper({
                        el: $('#flyPaper'),
                        model: flyGraph,
                        interactive: false
                    }),
                    flyShape = cellView.model.clone(),
                    pos = cellView.model.position(),
                    offset = {
                        x: x - pos.x,
                        y: y - pos.y
                    };
                flyShape.position(0, 0);
                flyGraph.addCell(flyShape);
                flyPaper.fitToContent({ padding: 2, allowNewOrigin: 'any' });
                $("#flyPaper").offset({
                    left: e.pageX - offset.x,
                    top: e.pageY - offset.y
                });
                $('body').on('mousemove.fly', function (e) {
                    $("#flyPaper").offset({
                        left: e.pageX - offset.x,
                        top: e.pageY - offset.y
                    });
                });
                $('body').on('mouseup.fly', function (e) {
                    var x = e.pageX,
                        y = e.pageY,
                        target = paper.$el.offset();

                    // Dropped over paper ?
                    if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
                        var s = flyShape.clone();
                        s.position(x - target.left - offset.x, y - target.top - offset.y);
                        graph.addCell(s);
                    }
                    $('body').off('mousemove.fly').off('mouseup.fly');
                    flyShape.remove();
                    $('#flyPaper').remove();
                });
            });

            sections[sectionName] = { graph: sectionGraph, paper: sectionPaper, numOfTools: 0 };

        }
        return sections[sectionName];
    }

    $.getJSON('/api/config/tools').done(function (models) {
        $.each(models, function (i, v) {
            var s = getSection(v.tool_type);
            s.graph.addCells(buildToolModel(v).translate((s.paper.options.width - 100) / 2, 100 * s.numOfTools++));
            s.paper.setDimensions(s.paper.options.width, 100 * s.numOfTools);
        });
    });
    //$.getJSON('/api/config').done(function (models) { graph.addCells(models); });
})();