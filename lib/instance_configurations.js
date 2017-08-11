var configs = [
    {
        id: 1,
        name: 'Instance1',
        interfaces: [
            { id: 11, name: 'test import 1', mappings: {} },
            { id: 12, name: 'test import 2', mappings: {} },
            { id: 13, name: 'test import 3', mappings: {} },
        ]
    },
    {
        id: 2,
        name: 'Instance2',
        interfaces: [
            { id: 21, name: 'test instance2 import 1', mappings: {} },
            { id: 22, name: 'test instance2 import 2', mappings: {} },
            { id: 23, name: 'test instance2 import 3', mappings: {} },
        ]
    },
    {
        id: 3,
        name: 'Instance3',
        interfaces: [
            { id: 31, name: 'test instance3 import 1', mappings: {} },
            { id: 32, name: 'test instance3 import 2', mappings: {} },
            { id: 33, name: 'test instance3 import 3', mappings: {} },
        ]
    }
];

exports.get_instances = function () {
    return configs.map(x => ({ id: x.id, name: x.name }));
}

exports.get_instance_interface_configs = function (id) {
    var result = null;
    var cfg = configs.find(x => x.id == id);
    if (cfg) {
        result = cfg.interfaces;
    }
    return result;
}