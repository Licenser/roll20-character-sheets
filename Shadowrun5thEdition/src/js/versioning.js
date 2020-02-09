const versioning = version => {
  	console.log(`%c Shadowrun 5th Edition versioning, ${version}`, "color: darkblue; font-weight:bold");

    switch(true) {
        case version < 1.35:
            onepointthreefive();
            setAttrs({version: 1.35}, () => versioning(1.35));
            break;
        case version < 1.41:
            onepointfour();
            setAttrs({version: 1.41}, () => versioning(1.41));
            break;
        case version < 4.0:
            fourpointzero();
            setAttrs({version: 4.0}, () => versioning(4.0));;
            break;
        default:
            console.log(`%c Shadowrun 5th Edition is update to date. Version ${version}`, "color: green; font-weight:bold");
    }
};

const fourpointzero = () => {
    const attributes = ['physical', 'physical_damage', 'stun', 'stun_damage', 'sheet_type', 'matrix_con'];
    getAttrs(attributes, value => {
        let update = {};
        update["physical"] = value.physical_damage || 0;
        update["stun"] = value.stun_damage || 0;
        update["matrix"] = value.matrix_con || 0;
        setAttrs(update);
    });   
};

const onepointfour = () => {
    const toggles = [`wound_toggle`, `edge_toggle`, `modifier_toggle`];
    getAttrs(toggles, (v) => {
        let set = {};
        toggles.forEach(attr => {
            const name = attr.split("_")[0], value = v[`${attr}`].toString();
            value != "0" || !value.includes(name) ? set[`${attr}`] = 0 : false;
        });
        setAttrs(set);
    });
};

const onepointthreefive = () => {
    getAttrs(["sheet_type"], (v) => {
        let update = {};
        v.sheet_type === "goon" ? update["sheet_type"] = "grunt" : false;
        setAttrs(update);
    });  
};