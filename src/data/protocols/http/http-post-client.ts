import { HttpResponse } from ".";

export type HttpPostParams = {
  url: string;
  body?: any;
};

//T - tipo do body da requisição
//R - tipo da resposta
export interface HttpPostClient<R> {
  post(params: HttpPostParams): Promise<HttpResponse<R>>;
}
