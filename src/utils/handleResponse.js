import * as loader from '../actionCreator/loader';
import store from '../store';
const dispatch = store.dispatch;

const handleResponse = (error, response, body, cb) => {
  dispatch(loader.hideLoader());
  if (error || !response) {
    console.log('UNKNOWN ERROR: Contact administrator');
  }
  else if (response.statusCode === 200) {
    try {
      cb();
    } catch (e) {
        console.log('UNKNOWN ERROR: Contact administrator');
    }
  }
  else {
    try {
      body = JSON.parse(body)
      if(!body.display_message) throw new Error("No display message");
      console.log(body.display_message);
    } catch (e) {
        console.log('UNKNOWN ERROR: Contact administrator');
    }
  }
}

export default handleResponse;