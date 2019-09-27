import Vue from 'vue'
import service from './service.js'
import utils from './utils.js'
import constant from './constant.js'
export default {
    install: function (Vue, options) {
      Vue.prototype.service = service;
      Vue.prototype.utils = utils;
      Vue.prototype.constant = constant;
	  }
  };
