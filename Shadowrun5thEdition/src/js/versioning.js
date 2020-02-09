const versioning = version => {
  	console.log(`%c Shadowrun 5th Edition versioning. Started at version ${version}`, "color: darkblue; font-weight:bold");

    switch(version) {
        case version < 1.35:
            onepointthreefive();
            setAttrs({version: 1.35}, () => versioning(1.35));
            break;
        case version < 1.41:
            onepointfour();
            setAttrs({version: 1.41}, () => versioning(1.41));
            break;
        case version < 3.04:
            threepointzerofour();
            setAttrs({version: 3.04}, () => versioning(3.04));
            break;
        default:
            console.log(`%c Shadowrun 5th Edition is update to date. Version ${version}`, "color: darkgreen; font-weight:bold");
    }
};

const threepointzerofour = () => {
    const attributes = ['physical', 'physical_damage', 'stun', 'stun_damage', 'sheet_type', 'matrix_con'];
    getAttrs(attributes, value => {
        let update = {};

        if ('sheet_type' === 'pc') {
            update["physical"] = value.physical_damage || 0;
            update["stun"] = value.stun_damage || 0;
            update["matrix"] = value.matrix_con || 0;
        }

        setAttrs(update);
    });   
}

const onepointfour = () => {
    const toggles = [`wound_toggle`, `edge_toggle`, `modifier_toggle`];
    getAttrs(toggles, (v) => {
        let set = {};
        toggles.forEach(attr => {
            const name = attr.split("_")[0], value = v[`${attr}`].toString();
            (value != "0" || !value.includes(name)) ? set[`${attr}`] = 0 : false;
        });
        setAttrs(set);
    });
}

const onepointthreefive = () => {
    getAttrs(["sheet_type"], (v) => {
        let update = {};
        v.sheet_type === "goon" ? update["sheet_type"] = "grunt" : false;
        setAttrs(update);
    });  
}