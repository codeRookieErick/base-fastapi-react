const baseUrl:string = import.meta.env.VITE_API_BASE_URL;

export default class BaseHttpService{
    
    protected baseUrl:string = baseUrl;

    protected async get<TResult>(url:string):Promise<TResult>{
        return new Promise<TResult>((resolve, reject) => {
            fetch(`${baseUrl}/${url}`, {
                method: "get"
            }).then(response => {
                
                response.json()
                    .then(result => resolve(result as TResult))
                    .catch(reject);
            }).catch(reject);
        });
    }
    
    protected async getRaw(url:string):Promise<string>{
        return new Promise<string>((resolve, reject) => {
            fetch(`${baseUrl}/${url}`, {
                method: "get"
            }).then(response => {
                
                response.text()
                    .then(result => resolve(result))
                    .catch(reject);
            }).catch(reject);
        });
    }

    protected post<T, TResult>(url:string, parameter:string|T, forceJson:boolean = false):Promise<TResult>{
        return new Promise<TResult>((resolve, reject) => {
            const requestInit:RequestInit = {
                method: "post",
                body: !forceJson && typeof parameter === "string" ? parameter :  JSON.stringify(parameter)
            }

            if(typeof parameter !== "string"){
                requestInit.headers = {
                    "Content-Type": "application/json"
                }
            }

            fetch(`${baseUrl}/${url}`, requestInit).then(response => {
                response.json()
                    .then(result => resolve(result as TResult))
                    .catch(reject);
            }).catch(reject);
        });
    }
    

    protected put<T, TResult>(url:string, parameter:string|T, forceJson:boolean = false):Promise<TResult>{
        return new Promise<TResult>((resolve, reject) => {
            fetch(`${baseUrl}/${url}`, {
                method: "put",
                body: !forceJson && typeof parameter === "string" ? parameter :  JSON.stringify(parameter)
            }).then(response => {
                response.json()
                    .then(result => resolve(result as TResult))
                    .catch(reject);
            }).catch(reject);
        });
    }
    
    protected delete<TResult>(url:string):Promise<TResult>{
        return new Promise<TResult>((resolve, reject) => {
            fetch(`${baseUrl}/${url}`, {
                method: "delete"
            }).then(response => {
                response.json()
                    .then(result => resolve(result as TResult))
                    .catch(reject);
            }).catch(reject);
        });
    }

    protected listen(url:string):EventSource{
        return new EventSource(`${baseUrl}/${url}`);
    }
}