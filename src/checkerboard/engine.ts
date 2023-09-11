import axios, { AxiosError } from 'axios';

export default class Engine {
    isReady: boolean;
  
    constructor() {
      console.log("constructor");
      this.isReady = false;
      this.init();
    }
    
    async init() {
      try {
        const response = await axios.post("https://raven-1-j8079958.deta.app/create_session", {},
                                          { headers: {"Access-Control-Allow-Origin": "*"}});
        console.log("create_session: " + response.status.toString());
        this.isReady = true;
      } 
      catch (err) {
        const error = err as AxiosError;
        console.error(error.toJSON());
      }
    }
    
    async getCheckerboardState() {
      try 
      {
        const response = await axios.get('https://raven-1-j8079958.deta.app/cb_state',
                                         { headers: {"Access-Control-Allow-Origin": "*"}});
        let data: string = response.data['fen'];
        return data;                        
      } 
      catch (err) {
        const error = err as AxiosError;
        console.error(error.toJSON());
      }
    }
  
    async legalMoves(fen: string) {
      try {
        const response = await axios.get('https://raven-1-j8079958.deta.app/cb_state',
                                         { headers: {"Access-Control-Allow-Origin": "*"}});
        let data: string = response.data['fen'];
        return data;                        
      }
      catch (err) {
        const error = err as AxiosError;
        console.error(error.toJSON());
      }
    }
  
    async makeMove(startSquare: number, endSquare: number) {
      try {
        const response = await axios.post('https://raven-1-j8079958.deta.app/make_move', 
                                          {startSq: startSquare.toString(), endSq: endSquare.toString()},
                                          { headers: {"Access-Control-Allow-Origin": "*"}});
        console.log("make_move: " + response.status.toString());
      }
      catch (err) {
        const error = err as AxiosError;
        console.error(error.toJSON());
      }
    }
    async terminate() {
      try {
        this.isReady = false;
        const response = await axios.post('https://raven-1-j8079958.deta.app/end_session', {},
                                          { headers: {"Access-Control-Allow-Origin": "*"}});
        console.log("end_session: " + response.status.toString());
      }
      catch (err) {
        const error = err as AxiosError;
        console.error(error.toJSON());
      }
    }
  }
  