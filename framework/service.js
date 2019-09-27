import config from './config'

let service = {};

for (let i in config.services) {
  let file = config.services[i];

  Object.defineProperty(service, i, {
    get() {
      return Reflect.construct(require('../services/' + file).default, []);
    }
  });

}
export default service;
