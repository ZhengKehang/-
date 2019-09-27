import { request,context,storage} from '@/utils'
export default class AbstractService {
	constructor() {
	    this.request = request;
	    this.storage = storage;
	    this.context = context;
	}
  output (promise) {
    return new Promise((resolve, reject) => {
      promise.then((resp) => {
        let data = resp
        if(data.statusCode == 200){
          data = data.data;
        }
        if (data) {
          if (data.code==1) {
            resolve(data.data || data.datalist || data.list)
          } else {
            reject(data.message)
          }
        }
      }, (resp) => {
        reject(resp)
      })
    })
  }


}
