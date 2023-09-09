import axios from 'axios';

export default class Engine {
    isReady: boolean;
  
    constructor() {
      console.log("constructor");
      this.isReady = false;
      this.init();
    }
    
    async init() {
        const response = await axios.post("https://raven-1-j8079958.deta.app/create_session/")
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        this.isReady = true;
    }
    
    getCheckerboardState() {
      return "barf";
      const response = axios.get('https://raven-1-j8079958.deta.app/cb_state/')
      let data: string = response.data;
      return data;
    }
  
    async terminate() {
      this.isReady = false;
      const response = await axios.post('https://raven-1-j8079958.deta.app/end_session/');
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    }
  }
  