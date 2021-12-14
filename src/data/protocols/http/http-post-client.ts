import { HttpResponse } from ".";

export type HttpPostParams<T> = {
  url: string;
  body: T;
};

//T - tipo do body da requisição
//R - tipo da resposta
export interface HttpPostClient<T, R> {
  post(params: HttpPostParams<T>): Promise<HttpResponse<R>>;
}
