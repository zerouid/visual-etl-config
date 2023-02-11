var express = require('express');
var instancecfg = require('../../lib/instance_configurations');
var router = express.Router();


router.get('/instance', (req, res, next) => {
    var insts = instancecfg.get_instances();
    if (insts) {
        res.json(insts);
    } else {
        res.status(404).end();
    }
});

router.get('/instance/:id/interfaces', (req, res, next) => {
    var cfgs = instancecfg.get_instance_interface_configs(req.params.id);
    if (cfgs) {
        res.json(cfgs);
    } else {
        res.status(404).end();
    }
});

router.get('/tools', (req, res, next) => {
    var cfgs = require('../../lib/toolbox_modules').get_toolbox_modules();
    if (cfgs) {
        res.json(cfgs);
    } else {
        res.status(404).end();
    }
});

module.exports = router;
