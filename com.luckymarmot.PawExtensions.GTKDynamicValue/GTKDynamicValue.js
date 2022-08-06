let GTK_DynamicValue = function () {
    this.evaluate = function () {
        console.log("algorithm", this.algorithm);
        console.log("input", this.input);
        console.log("salt", this.salt);
        if (this.input) {
            const skey = this.input;
            let hash = 0;
            if (this.salt) {
                hash = 5381
            } else {
                hash = 0
            }
            if (this.algorithm === "time33" || this.algorithm === "") {
                for (var i = 0, len = skey.length; i < len; ++i) {
                    hash += (hash << 5) + skey.charCodeAt(i);
                }
                return hash & 2147483647;
            } else if (this.algorithm === "hash33") {
                for (var i = 0, len = skey.length; i < len; ++i) {
                    hash += (33 * hash + skey.charCodeAt(i)) % 4294967296;
                }
                return hash;
            }

        }
    };
    this.title = function () {
        return "g_tk";
    };
    this.text = function () {
        return this.input;
    };
};

GTK_DynamicValue.identifier = "com.luckymarmot.PawExtensions.GTKDynamicValue";
GTK_DynamicValue.title = "g_tk";
GTK_DynamicValue.inputs = [
    InputField("input", "Key", "String", {
        persisted: true,
        defaultValue: "",
        placeholder: "skey p_skey ..."
    }),
    InputField("salt", "带盐(5381)", "Checkbox", {persisted: true, defaultValue: true}),
    InputField("algorithm", "算法", "Radio", {
        choices: {"time33": "time33(常用)", "hash33": "hash33"},
        persisted: true,
        defaultValue: "time33"
    })
];
registerDynamicValueClass(GTK_DynamicValue);
