(function () {

    var interfacesSelect = $('#interfaces');
    var instancesSelect = $('#instances');
    var interfacesSelectToggle = interfacesSelect.parent().find('.dropdown-toggle');
    var instancesSelectToggle = instancesSelect.parent().find('.dropdown-toggle');

    function select_interface($el) {
        var instanceId = $el.data("interface-id");
        interfacesSelect.find('.active').removeClass('active');
        $el.parent().addClass('active');
        interfacesSelectToggle.text($el.text());
    }

    function select_instance($el) {
        var instanceId = $el.data("instance-id");
        instancesSelect.find('.active').removeClass('active');
        $el.parent().addClass('active');

        instancesSelectToggle.text($el.text());
        $.getJSON('/api/config/instance/' + instanceId + '/interfaces').done(function (data) {
            var items = $.map(data, function (val) {
                var item = $('<a class="dropdown-item" href="#" data-interface-id="' + val.id + '">' + val.name + '</a>');
                item.on('click', function () { select_interface($(this)); })
                return item;
            });
            interfacesSelect.empty().append(items);
            interfacesSelect.closest('.disabled').removeClass('disabled');
        });
    }

    $.getJSON('/api/config/instance').done(function (data) {
        var items = $.map(data, function (val) {
            var item = $('<a class="dropdown-item" href="#" data-instance-id="' + val.id + '">' + val.name + '</a>');
            item.on('click', function () { select_instance($(this)); })
            return item;
        });
        instancesSelect.empty().append(items);
    });

})();