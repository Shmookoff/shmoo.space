import _ from "lodash";

interface LoDashMixins extends _.LoDashStatic {
  pascalCase(string?: string): string;
}

_.mixin({ pascalCase: _.flow(_.camelCase, _.upperFirst) });

export default _ as unknown as LoDashMixins;
