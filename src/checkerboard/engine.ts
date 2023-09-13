import axios, { AxiosError } from 'axios';

export default class Engine {
    isReady: boolean;
  
    constructor() {
      this.isReady = false;
      console.log("constructor");
    }
    
    async init() {
      let data: string = "";
      try {
        const response = await axios.post("https://raven-1-j8079958.deta.app/create_session", {},
                                          { headers: {"Access-Control-Allow-Origin": "*"}});
        console.log("create_session: " + response.status.toString());
        data = response.data["fen"];
        this.isReady = true;
      } 
      catch (err) {
        const error = err as AxiosError;
        console.error(error.toJSON());
      }
      return data;
    }
    
    async getCheckerboardState() {
      try 
      {
        const response = await axios.get('https://raven-1-j8079958.deta.app/cb_state',
                                         { headers: {"Access-Control-Allow-Origin": "*"}});
        return response.data;                        
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
        return response.data;                        
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
  